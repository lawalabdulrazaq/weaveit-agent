import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import mammoth from 'mammoth'

// Simple polyfills for Node.js environment to prevent DOMMatrix errors
if (typeof global !== 'undefined') {
  if (typeof global.DOMMatrix === 'undefined') {
    global.DOMMatrix = class DOMMatrix {
      constructor(values?: any) { }
    } as any
  }
  if (typeof global.ImageData === 'undefined') {
    global.ImageData = class ImageData {
      constructor(data: any, width: number, height?: number) { }
    } as any
  }
  if (typeof global.Path2D === 'undefined') {
    global.Path2D = class Path2D {
      constructor(path?: any) { }
    } as any
  }
}

// Use the legacy build of pdfjs for Node.js runtime (avoids DOMMatrix/browser APIs)
let pdfjsLib: any
try {
  pdfjsLib = require('pdfjs-dist/legacy/build/pdf')
  
  // Disable worker usage in Node.js environment to avoid pdf.worker imports
  if (typeof pdfjsLib.GlobalWorkerOptions !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = ''
    pdfjsLib.GlobalWorkerOptions.disableWorker = true
  }
} catch (e) {
  console.warn('PDF.js library not available, PDF extraction will be skipped')
  pdfjsLib = null
}

// ===== Limits (easy to adjust) =====
const MAX_FILE_SIZE_MB = 5 // per-file
const MAX_TOTAL_SIZE_MB = 20 // per-request
const MAX_TOTAL_WORDS = 20000
const MAX_PER_SOURCE_WORDS = 5000
const MAX_GENERATION_WORDS = 5000
// ===================================

const maxFileBytes = MAX_FILE_SIZE_MB * 1024 * 1024
const maxTotalBytes = MAX_TOTAL_SIZE_MB * 1024 * 1024

// Note: We don't write files to disk anymore to support Vercel serverless environment
// Files are processed in memory only

function countWords(text?: string) {
  if (!text) return 0
  const m = text.trim().match(/\S+/g)
  return m ? m.length : 0
}

function truncateWords(text: string, limit: number) {
  const words = text.trim().match(/\S+/g) || []
  if (words.length <= limit) return text
  return words.slice(0, limit).join(' ')
}

async function extractTextFromFile(fileBuffer: Buffer, originalName: string) {
  const ext = path.extname(originalName).toLowerCase()
  try {
    if (['.txt', '.md', '.json', '.csv', '.js', '.ts', '.jsx', '.tsx'].includes(ext)) {
      return fileBuffer.toString('utf-8')
    }

    if (ext === '.docx' || ext === '.doc') {
      try {
        const result = await mammoth.extractRawText({ buffer: fileBuffer })
        return result.value || ''
      } catch (e) {
        console.error('DOCX extraction failed', e)
        return ''
      }
    }

    if (ext === '.pdf') {
      try {
        if (!pdfjsLib) {
          console.warn('PDF.js not available, skipping PDF extraction')
          return ''
        }
        const data = new Uint8Array(fileBuffer)
        const doc = await pdfjsLib.getDocument({ data }).promise
        let full = ''
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i)
          const content = await page.getTextContent()
          const texts = content.items.map((t: any) => t.str)
          full += texts.join(' ') + '\n\n'
        }
        return full
      } catch (e) {
        console.error('PDF extraction failed', e)
        return ''
      }
    }

    return ''
  } catch (err) {
    console.error('Extraction error', err)
    return ''
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const fileList: { file: File; size: number }[] = []
    let totalBytes = 0

    for (const file of files) {
      const size = file.size
      if (size > maxFileBytes) {
        return NextResponse.json(
          { error: `File too large. Max ${MAX_FILE_SIZE_MB} MB per file.` },
          { status: 413 }
        )
      }
      totalBytes += size
      fileList.push({ file, size })
    }

    if (totalBytes > maxTotalBytes) {
      return NextResponse.json(
        { error: `Total upload size exceeds ${MAX_TOTAL_SIZE_MB} MB` },
        { status: 413 }
      )
    }

    const results: any[] = []
    let remainingTotalWords = MAX_TOTAL_WORDS

    for (const { file } of fileList) {
      const buffer = await file.arrayBuffer()
      const fileBuffer = Buffer.from(buffer)

      let extracted = await extractTextFromFile(fileBuffer, file.name)

      let words = countWords(extracted)
      if (words > 0) {
        if (words > MAX_PER_SOURCE_WORDS) {
          extracted = truncateWords(extracted, MAX_PER_SOURCE_WORDS)
          words = countWords(extracted)
        }

        if (remainingTotalWords <= 0) {
          extracted = ''
          words = 0
        } else if (words > remainingTotalWords) {
          extracted = truncateWords(extracted, remainingTotalWords)
          words = countWords(extracted)
        }

        remainingTotalWords -= words
      }

      results.push({
        filename: file.name,
        name: file.name,
        size: file.size,
        extracted_text: extracted || null,
        content: extracted || null,
        words,
      })
    }

    return NextResponse.json(results.length === 1 ? results[0] : results)
  } catch (e) {
    console.error('Upload handler error', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
