import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import mammoth from 'mammoth'
// Use the legacy build of pdfjs for Node.js runtime (avoids DOMMatrix/browser APIs)
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'

// Disable worker usage in Node.js environment to avoid pdf.worker imports
if (typeof (pdfjsLib as any).GlobalWorkerOptions !== 'undefined') {
  ;(pdfjsLib as any).GlobalWorkerOptions.workerSrc = ''
  ;(pdfjsLib as any).GlobalWorkerOptions.disableWorker = true
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

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

async function ensureUploadDir() {
  await fs.mkdir(uploadDir, { recursive: true })
}

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

async function extractTextFromFile(filePath: string, originalName: string) {
  const ext = path.extname(originalName).toLowerCase()
  try {
    if (['.txt', '.md', '.json', '.csv', '.js', '.ts', '.jsx', '.tsx'].includes(ext)) {
      return await fs.readFile(filePath, 'utf-8')
    }

    if (ext === '.docx' || ext === '.doc') {
      try {
        const result = await mammoth.extractRawText({ path: filePath })
        return result.value || ''
      } catch (e) {
        console.error('DOCX extraction failed', e)
        return ''
      }
    }

    if (ext === '.pdf') {
      try {
        const data = new Uint8Array(await fs.readFile(filePath))
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
    await ensureUploadDir()

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
      const savedName = `${Date.now()}_${file.name}`
      const savedPath = path.join(uploadDir, savedName)

      await fs.writeFile(savedPath, Buffer.from(buffer))

      const publicUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${'/uploads/' + savedName}`

      let extracted = await extractTextFromFile(savedPath, file.name)

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
        savedAs: savedName,
        url: publicUrl,
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
