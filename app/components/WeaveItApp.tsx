"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import {
  Download,
  Play,
  Pause,
  AlertCircle,
  CheckCircle,
  FileText,
  ArrowRight,
  Video,
  Sparkles,
  LogOut,
  Volume2,
  VolumeX,
  Maximize,
  Zap,
  Shield,
  Plus,
  Upload,
  X,
  Loader2,
  Mic,
  Film,
  Settings,
} from "lucide-react"

// Dynamic imports for libraries (to handle SSR compatibility)
let pdfjsLib: any
let mammoth: any

const initializeLibraries = async () => {
  if (typeof window !== "undefined" && !pdfjsLib) {
    pdfjsLib = await import("pdfjs-dist")
    mammoth = await import("mammoth")
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
  }
}

const getBackendUrl = (path: string) => {
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
  if (!path || typeof path !== 'string') {
    return backendBaseUrl
  }
  if (!path.startsWith("http")) {
    // Remove trailing slash if present
    return backendBaseUrl.replace(/\/$/, "") + path
  }
  return path
}

// ============================================
// File Content Extraction Helpers (Client-side)
// ============================================

const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    await initializeLibraries()
    if (!pdfjsLib) return ""
    
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let text = ""
    
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str || "")
        .join(" ")
      text += pageText + "\n"
    }
    
    return text.trim()
  } catch (error) {
    console.error("PDF extraction failed:", error)
    return ""
  }
}

const extractTextFromDOCX = async (file: File): Promise<string> => {
  try {
    await initializeLibraries()
    if (!mammoth) return ""
    
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value.trim()
  } catch (error) {
    console.error("DOCX extraction failed:", error)
    return ""
  }
}

const extractTextFromFile = async (file: File): Promise<string> => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    console.warn(`File ${file.name} exceeds 5MB limit`)
    return ""
  }
  
  // Handle PDF
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    return await extractTextFromPDF(file)
  }
  
  // Handle DOCX
  if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  ) {
    return await extractTextFromDOCX(file)
  }
  
  // Handle plain text files
  if (
    file.type.startsWith("text/") ||
    file.name.endsWith(".txt") ||
    file.name.endsWith(".md") ||
    file.name.endsWith(".json") ||
    file.name.endsWith(".csv")
  ) {
    return await file.text()
  }
  
  // Unsupported file type
  return ""
}

// ============================================
// GitHub Repo Import Helpers (Frontend-only)
// ============================================

// Map of known docs sites to their GitHub repositories
const DOCS_REPO_MAP: Record<string, string> = {
  "docs.solana.com": "https://github.com/solana-labs/solana-docs",
  "nextjs.org/docs": "https://github.com/vercel/next.js",
  "tailwindcss.com/docs": "https://github.com/tailwindlabs/tailwindcss.com",
  "docs.astro.build": "https://github.com/withastro/astro/tree/main/packages/astro/docs",
  "react.dev": "https://github.com/facebook/react/tree/main/docs",
  "typescript.org": "https://github.com/microsoft/TypeScript-Website",
}

// Detect URL type and normalize
interface URLDetectionResult {
  type: "github" | "docs" | "unknown"
  url: string
  message?: string
}

const detectURLType = (url: string): URLDetectionResult => {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname

    // Check if it's a docs site mapping
    for (const [docsHost, repoUrl] of Object.entries(DOCS_REPO_MAP)) {
      if (hostname.includes(docsHost.split("/")[0])) {
        return {
          type: "docs",
          url: repoUrl,
          message: "Imported from GitHub source for best results.",
        }
      }
    }

    // Check if it's GitHub
    if (hostname === "github.com") {
      return { type: "github", url }
    }

    return { type: "unknown", url }
  } catch {
    return { type: "unknown", url }
  }
}

// Parse GitHub URL to get owner and repo
const parseGitHubURL = (url: string): { owner: string; repo: string } | null => {
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\.git)?(?:\/)?$/)
    if (match) {
      return { owner: match[1], repo: match[2] }
    }
    return null
  } catch {
    return null
  }
}

// Supported file extensions for import
const SUPPORTED_EXTENSIONS = [".md", ".mdx", ".txt", ".json", ".js", ".ts", ".tsx", ".jsx"]
const MAX_FILE_SIZE = 500 * 1024 // 500KB per file
const MAX_TOTAL_FILES = 100
const MAX_CONTENT_LENGTH = 100 * 1024 // 100KB total content

interface GitHubFileNode {
  name: string
  path: string
  type: "file" | "dir"
  size?: number
}

interface GitHubTreeResponse {
  tree: GitHubFileNode[]
  truncated: boolean
}

// Fetch GitHub repository tree recursively
const fetchGitHubTree = async (
  owner: string,
  repo: string,
  path: string = ""
): Promise<GitHubFileNode[]> => {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents${path ? "/" + path : ""}`
    const response = await fetch(url, {
      headers: { Accept: "application/vnd.github.v3+json" },
    })

    if (response.status === 404) {
      throw new Error("Repository not found")
    }
    if (response.status === 403) {
      throw new Error("Rate limit exceeded. Please try again in a few minutes.")
    }
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()

    // Handle single file vs directory listing
    if (!Array.isArray(data)) {
      return []
    }

    return data as GitHubFileNode[]
  } catch (error) {
    console.error("Error fetching GitHub tree:", error)
    throw error
  }
}

// Fetch content of a specific file from GitHub
const fetchGitHubFileContent = async (
  owner: string,
  repo: string,
  path: string
): Promise<string> => {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    const response = await fetch(url, {
      headers: { Accept: "application/vnd.github.raw+json" },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`)
    }

    const text = await response.text()
    return text
  } catch (error) {
    console.error(`Error fetching ${path}:`, error)
    return ""
  }
}

// Recursively extract supported files from GitHub repo
const extractGitHubContent = async (
  owner: string,
  repo: string,
  basePath: string = "",
  depth: number = 0
): Promise<Array<{ path: string; name: string; content: string }>> => {
  const maxDepth = 5
  if (depth > maxDepth) return []

  try {
    const tree = await fetchGitHubTree(owner, repo, basePath)
    const results: Array<{ path: string; name: string; content: string }> = []

    // Process items in parallel with Promise.allSettled
    const promises = tree.map(async (item) => {
      // Skip hidden files and unwanted directories
      if (
        item.name.startsWith(".") ||
        ["node_modules", "dist", "build", ".git", "coverage"].includes(item.name)
      ) {
        return null
      }

      // If it's a directory, recurse
      if (item.type === "dir") {
        const newPath = basePath ? `${basePath}/${item.name}` : item.name
        const nestedResults = await extractGitHubContent(owner, repo, newPath, depth + 1)
        return nestedResults
      }

      // If it's a supported file type and under size limit
      const isSupportedExt = SUPPORTED_EXTENSIONS.some((ext) => item.name.endsWith(ext))
      if (isSupportedExt && item.size && item.size <= MAX_FILE_SIZE) {
        const content = await fetchGitHubFileContent(owner, repo, item.path)
        if (content) {
          return [{ path: item.path, name: item.name, content }]
        }
      }

      return null
    })

    const settledResults = await Promise.allSettled(promises)

    // Flatten results and filter nulls
    for (const settled of settledResults) {
      if (settled.status === "fulfilled" && settled.value) {
        if (Array.isArray(settled.value)) {
          results.push(...settled.value)
        } else {
          results.push(settled.value)
        }
      }
    }

    return results.slice(0, MAX_TOTAL_FILES)
  } catch (error) {
    console.error("Error extracting GitHub content:", error)
    throw error
  }
}

// Combine imported files into Studio sources
const combineImportedFiles = (
  files: Array<{ path: string; name: string; content: string }>,
  repoUrl: string
): Array<{ name: string; type: "repo"; content: string; originUrl: string }> => {
  const grouped: Record<string, string> = {}

  // Group files by directory
  for (const file of files) {
    const dir = file.path.substring(0, file.path.lastIndexOf("/")) || "root"
    const key = dir
    if (!grouped[key]) {
      grouped[key] = ""
    }
    // Add file content with separator
    grouped[key] += `\n\n--- File: ${file.name} ---\n${file.content}`
  }

  // Convert to Studio sources
  const sources: Array<{ name: string; type: "repo"; content: string; originUrl: string }> =
    Object.entries(grouped).map(([dir, content]) => ({
      name: dir === "root" ? "Repository Root" : `Folder: ${dir.split("/").pop()}`,
      type: "repo",
      content: content.slice(0, MAX_CONTENT_LENGTH), // Limit content size
      originUrl: repoUrl,
    }))

  return sources
}

const generateProjectName = async (content: string): Promise<string> => {
  try {
    const response = await fetch("/api/generate-name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content.slice(0, 500) }),
    })
    if (response.ok) {
      const data = await response.json()
      return data.name || "Untitled Project"
    }
  } catch (error) {
    console.error("Failed to generate name:", error)
  }
  // Fallback: extract first meaningful words
  const words = content.trim().split(/\s+/).slice(0, 4).join(" ")
  return words || "Untitled Project"
}

// Enhanced Video Display Component
interface VideoDisplayProps {
  videoUrl: string
  title?: string
  onClose?: () => void
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ videoUrl, title = "Generated Video", onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Always use absolute backend URL for video
  const absoluteVideoUrl = getBackendUrl(videoUrl)

  const handleDownload = async () => {
    try {
      const response = await fetch(absoluteVideoUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(percent)
    }
  }

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between p-2 border-b border-slate-700">
        <span className="text-sm font-medium truncate">{title}</span>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          src={absoluteVideoUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          muted={isMuted}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2">
          <div className="h-1 bg-slate-600 rounded-full mb-2">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="p-1.5 bg-white/20 rounded-full hover:bg-white/30">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 hover:bg-white/20 rounded-full">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleDownload} className="p-1.5 hover:bg-white/20 rounded-full">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-white/20 rounded-full">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Script Form Component with Payment Integration
interface ScriptFormProps {
  onVideoGenerated: (videoUrl: string, title: string) => void
  generationType: "video" | "audio"
  setGenerationType: React.Dispatch<React.SetStateAction<"video" | "audio">>
  // optional props so parent can control helper CTA visibility and wire handlers
  videosLength?: number
  hasCurrentVideo?: boolean
  onImportRepo?: () => void
  onUploadClick?: () => void
  onCreditsUpdate?: (credits: number) => void
  currentPoints?: number | null
}

const ScriptForm: React.FC<ScriptFormProps> = ({
  onVideoGenerated,
  generationType,
  setGenerationType,
  videosLength = 0,
  hasCurrentVideo = false,
  onImportRepo,
  onUploadClick,
  onCreditsUpdate,
  currentPoints,
}) => {
  const [script, setScript] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loadingStep, setLoadingStep] = useState("")
  const wallet = useWallet()
  const { connection } = useConnection()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!script.trim()) {
      setError("Please enter a script for your tutorial")
      return
    }

    if (!title.trim()) {
      setError("Please enter a title for your video")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (!wallet || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setLoadingStep("Generating " + generationType + "...")

      const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"

      // Choose endpoint based on generation type
      const endpoint = generationType === "audio" ? "/api/generate/audio" : "/api/generate"

      const response = await fetch(`${backendBaseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          script,
          title,
          walletAddress: wallet.publicKey?.toBase58(),
        }),
      })

      // Handle insufficient credits (402 Payment Required)
      if (response.status === 402) {
        const errorData = await response.json().catch(() => ({}))
        const required = errorData.required || (generationType === "video" ? 2 : 1)
        setError(
          `Insufficient credits. You need ${required} credits to generate ${generationType}. Current balance: ${currentPoints || 0}`,
        )
        setLoading(false)
        setLoadingStep("")
        return
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("Backend error:", errorData)
        throw new Error(errorData.error || `Failed to start ${generationType} generation`)
      }

      const videoData = await response.json()
      console.log("Generation response:", videoData)

      // Update remaining credits if provided by backend
      if (videoData.remainingCredits !== undefined && onCreditsUpdate) {
        onCreditsUpdate(videoData.remainingCredits)
      }

      // Construct URL based on generation type and response data
      let contentUrl: string | null = null

      if (generationType === "audio") {
        // For audio generation, use audio-specific endpoint
        const audioId = videoData.audioId
        if (audioId) {
          contentUrl = `${backendBaseUrl}/api/audio/${audioId}`
        }
      } else {
        // For video generation, use video endpoint
        const contentId = videoData.contentId || videoData.videoId
        if (contentId) {
          contentUrl = `${backendBaseUrl}/api/videos/${contentId}`
        }
      }

      if (!contentUrl) {
        throw new Error(`No ${generationType} URL or content ID received from backend`)
      }

      console.log("Content URL constructed:", contentUrl)
      onVideoGenerated(contentUrl, videoData.title || title)
      setSuccess(`${generationType === "video" ? "Video" : "Audio"} generated successfully!`)
      setScript("")
      setTitle("")
    } catch (err: any) {
      console.error("Generation failed:", err)
      if (err.message?.includes("Wallet not connected")) {
        setError("Please connect your wallet to generate videos")
      } else if (err.message?.includes("insufficient funds")) {
        setError("Insufficient SOL balance for payment")
      } else {
        setError("Failed to generate video. Please try again.")
      }
    } finally {
      setLoading(false)
      setLoadingStep("")
    }
  }

  const pollVideoStatus = async (contentId: string, videoTitle: string) => {
    if (!contentId) {
      console.error("No content ID provided for polling")
      setError("Missing video ID")
      return
    }

    const steps = [
      "Analyzing your script...",
      "Generating AI narration...",
      "Creating visual elements...",
      "Rendering video...",
      "Finalizing output...",
    ]

    let stepIndex = 0
    const maxAttempts = 60 // 5 minutes max
    let attempts = 0

    const poll = async () => {
      try {
        // const statusResponse = await fetch(`/api/videos/status/${contentId}`)
        const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
        const statusResponse = await fetch(`${backendBaseUrl}/api/videos/status/${contentId}`)
        const statusData = await statusResponse.json()

        console.log("Status response:", statusData)

        if (statusData.ready && statusData.contentUrl) {
          // console.log("Video ready with URL:", statusData.contentUrl)
          const videoUrl = `${backendBaseUrl}${statusData.contentUrl}`
          console.log("Video ready with URL:", videoUrl)
          setSuccess("Video generated successfully! 🎉")
          onVideoGenerated(videoUrl, videoTitle)
          // onVideoGenerated(statusData.contentUrl, videoTitle)
          setScript("")
          setTitle("")
          return
        }

        // Update loading step
        if (stepIndex < steps.length - 1) {
          setLoadingStep(steps[stepIndex])
          stepIndex++
        }

        attempts++
        if (attempts >= maxAttempts) {
          throw new Error("Video generation timed out")
        }

        // Continue polling
        setTimeout(poll, 5000) // Check every 5 seconds
      } catch (error) {
        console.error("Status polling error:", error)
        throw error
      }
    }

    await poll()
  }

  const estimateVideoLength = (text: string) => {
    const words = text.trim().split(/\s+/).length
    const avgWordsPerMinute = 150
    const minutes = Math.ceil(words / avgWordsPerMinute)
    return minutes
  }

  const getScriptQuality = (text: string) => {
    const wordCount = text.trim().split(/\s+/).length
    if (wordCount < 50) return { quality: "Too short", color: "text-red-400" }
    if (wordCount < 150) return { quality: "Good", color: "text-amber-400" }
    if (wordCount < 500) return { quality: "Excellent", color: "text-violet-400" }
    return { quality: "Very long", color: "text-blue-400" }
  }

  const scriptQuality = getScriptQuality(script)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Helper CTA: show when no sources, no current video, and user hasn't typed anything yet */}
      {(!videosLength || videosLength === 0) && !hasCurrentVideo && !script.trim() && (
        <div className="border border-slate-800 rounded-lg p-6 text-center text-slate-400">
          <div className="text-sm font-medium mb-2">Add a source to get started</div>
          <div className="text-xs mb-4">Upload documents or import a repository to feed the assistant.</div>
          <div className="flex flex-col items-center justify-center space-y-3">
            <button
              type="button"
              onClick={onUploadClick}
              className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition font-medium"
            >
              Upload a source
            </button>
            <div className="text-sm text-slate-400">or</div>
            <button
              type="button"
              onClick={onImportRepo}
              className="px-4 py-2 rounded-lg bg-slate-800/40 hover:bg-slate-800/60"
            >
              Import repository
            </button>
          </div>
        </div>
      )}

      {/* Generation type control moved to the right sidebar */}

      {/* Title Input */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-semibold text-white">
          Video Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title for your tutorial video..."
          className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          disabled={loading}
        />
      </div>

      {/* Script Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="script" className="block text-sm font-semibold text-white">
            Tutorial Script
          </label>
          <div className="flex items-center space-x-4 text-xs">
            {script.trim() && (
              <>
                <span className="text-gray-400">~{estimateVideoLength(script)} min video</span>
                <span className={`${scriptQuality.color} font-medium`}>{scriptQuality.quality}</span>
              </>
            )}
          </div>
        </div>
        <textarea
          id="script"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Enter your tutorial script here. Explain your code, concepts, or step-by-step instructions that you want to turn into a video tutorial..."
          rows={12}
          className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-vertical backdrop-blur-sm"
          disabled={loading}
        />
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>
            {script.length} characters •{" "}
            {
              script
                .trim()
                .split(/\s+/)
                .filter((word) => word.length > 0).length
            }{" "}
            words
          </span>
          {script.length > 5000 && (
            <span className="text-amber-400 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              Very long script may take more time to process
            </span>
          )}
        </div>
      </div>

      {/* Generation Button */}
      <button
        type="submit"
        disabled={loading || !script.trim() || !title.trim()}
        className={`relative overflow-hidden w-full py-4 px-6 rounded-xl font-semibold text-base flex items-center justify-center space-x-3 ${loading ? "bg-gray-700/50 cursor-not-allowed" : generationType === "video" ? "bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600" : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"} text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 border ${generationType === "video" ? "border-violet-600/20" : "border-purple-500/20"}`}
      >
        {loading ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
              <span>Generating Your {generationType === "video" ? "Video" : "Audio"}...</span>
            </div>
            {loadingStep && <span className="text-sm text-violet-200">{loadingStep}</span>}
          </div>
        ) : (
          <>
            <Zap className="w-6 h-6" />
            <span>
              Generate {generationType === "video" ? "Tutorial Video" : "Audio Narration"} (
              {generationType === "video" ? "2" : "1"} credits)
            </span>
            <ArrowRight className="w-6 h-6" />
          </>
        )}
      </button>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center space-x-3 backdrop-blur-sm">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span className="text-red-400">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-violet-600/10 border border-violet-600/30 rounded-xl p-4 flex items-center space-x-3 backdrop-blur-sm">
          <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0" />
          <span className="text-violet-400">{success}</span>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">💡 Tips for Better Videos</h4>
            <p className="text-sm text-gray-400">Optimize your script for best results</p>
          </div>
        </div>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-violet-600 rounded-full"></div>
            <span>Be clear and specific in your explanations</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-violet-600 rounded-full"></div>
            <span>Include step-by-step instructions</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-violet-600 rounded-full"></div>
            <span>Mention specific code examples or concepts</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-violet-600 rounded-full"></div>
            <span>Keep sections organized with clear transitions</span>
          </li>
        </ul>
      </div>
    </form>
  )
}

// Enhanced Wallet Connect Component
const WalletConnect: React.FC<{ onConnect: () => void }> = ({ onConnect }) => {
  const { connected, connecting } = useWallet()

  if (connected) {
    onConnect()
    return null
  }

  return (
    <div className="space-y-6">
      {connecting && (
        <div className="bg-violet-600/10 border border-violet-600/30 rounded-xl p-4 flex items-center space-x-3 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-violet-600 border-t-transparent"></div>
          <span className="text-white">Connecting to wallet...</span>
        </div>
      )}

      <div className="flex justify-center">
        <WalletMultiButton
          style={{
            background: "linear-gradient(to right, rgb(124, 58, 202), rgb(79, 70, 229))",
            borderRadius: "0.75rem",
            fontWeight: "600",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            transition: "all 200ms",
            transform: "scale(1)",
          }}
        />
      </div>

      {/* Security Features */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-5 h-5 text-violet-400" />
            <h4 className="font-semibold text-white">Secure Connection</h4>
          </div>
          <p className="text-sm text-gray-400">
            Your wallet connection is encrypted and secure. We never store your private keys.
          </p>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-5 h-5 text-violet-400" />
            <h4 className="font-semibold text-white">Fast & Easy</h4>
          </div>
          <p className="text-sm text-gray-400">
            Connect in seconds and start generating videos immediately. No complex setup required.
          </p>
        </div>
      </div>
    </div>
  )
}

// Main WeaveIt App Component
export default function WeaveItApp() {
  const { connected, disconnect, publicKey } = useWallet()
  const { connection } = useConnection() // Not used, but kept for context
  const [currentVideo, setCurrentVideo] = useState<{ url: string; title: string } | null>(null)
  const [videos, setVideos] = useState<Array<{ id: string; title: string; url: string; createdAt: string; type: "video" | "audio" }>>([])
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [points, setPoints] = useState<number | null>(null)
  const [trialExpiresAt, setTrialExpiresAt] = useState<string | null>(null)
  const [generationType, setGenerationType] = useState<"video" | "audio">("video")

  // Project state
  const [projectName, setProjectName] = useState("Untitled Project")
  const [isEditingName, setIsEditingName] = useState(false)

  // Content state - merged upload + script
  const [content, setContent] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string; content?: string }[]>([])
  const [selectedSource, setSelectedSource] = useState<{ name: string; content: string } | null>(null)
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([])

  // Impromptu question state
  const [impromptuQuestion, setImpromptuQuestion] = useState("")
  const [impromptuMode, setImpromptuMode] = useState<"audio" | "video">("video")
  const [impromptuLoading, setImpromptuLoading] = useState(false)

  // Import state
  const [importUrl, setImportUrl] = useState("")
  const [importLoading, setImportLoading] = useState(false)
  const [importError, setImportError] = useState("")
  const [importSuccess, setImportSuccess] = useState("")

  // Generation state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [backendError, setBackendError] = useState<string | null>(null)

  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const unifiedTextareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Import repo handler
  const handleImportRepo = async () => {
    if (!importUrl.trim()) {
      setImportError("Please enter a repository or documentation URL")
      return
    }

    setImportLoading(true)
    setImportError("")
    setImportSuccess("")

    try {
      // Detect URL type
      const detection = detectURLType(importUrl)

      if (detection.type === "unknown") {
        setImportError("Direct docs extraction not supported yet. Paste a GitHub repo instead.")
        setImportLoading(false)
        return
      }

      // Parse GitHub URL
      const parsed = parseGitHubURL(detection.url)
      if (!parsed) {
        setImportError("Invalid GitHub repository URL. Use format: https://github.com/owner/repo")
        setImportLoading(false)
        return
      }

      // Fetch and extract content
      const files = await extractGitHubContent(parsed.owner, parsed.repo)

      if (files.length === 0) {
        setImportError("No supported files found in this repository")
        setImportLoading(false)
        return
      }

      // Combine files into sources
      const sources = combineImportedFiles(files, detection.url)

      // Add to uploaded files
      setUploadedFiles((prev) => [...prev, ...sources])

      // Show success message
      let successMsg = `Repository imported successfully! (${files.length} files)`
      if (detection.message) {
        successMsg = detection.message + ` Imported ${files.length} files.`
      }
      setImportSuccess(successMsg)

      // Clear input
      setImportUrl("")

      // Clear success message after 5 seconds
      setTimeout(() => setImportSuccess(""), 5000)
    } catch (err) {
      console.error("Import error:", err)
      const errorMsg =
        err instanceof Error && err.message.includes("Rate limit")
          ? "GitHub API rate limit exceeded. Please try again in a few minutes."
          : err instanceof Error
            ? err.message
            : "Unable to extract content from this source"
      setImportError(errorMsg)
    } finally {
      setImportLoading(false)
    }
  }
  useEffect(() => {
    if (!publicKey) {
      setVideos([])
      setPoints(null)
      setTrialExpiresAt(null)
      return
    }

    const walletAddress = publicKey.toString()

    // Fetch credits (try multiple possible backend routes for compatibility)
    setBackendError(null)
    const tryFetchUser = async () => {
      const attempts = [
        getBackendUrl(`/api/user/${walletAddress}`),
        getBackendUrl(`/api/users/${encodeURIComponent(walletAddress)}/points`),
      ]

      for (const url of attempts) {
        try {
          const res = await fetch(url)
          if (!res.ok) {
            // try next
            continue
          }
          const data = await res.json()
          // Support different response shapes
          const pointsVal = data.points ?? data.pointsAvailable ?? data.points_total ?? data.points_total ?? data.points ?? null
          const trial = data.trial_expires_at ?? data.trialExpiresAt ?? null
          setPoints(pointsVal ?? null)
          setTrialExpiresAt(trial ?? null)
          return
        } catch (err) {
          // continue to next attempt
          continue
        }
      }
      console.error("Failed to fetch user from backend: all attempts failed")
      setPoints(null)
    }

    tryFetchUser()

    // Fetch videos
    setLoadingVideos(true)
    const tryFetchVideos = async () => {
      const attempts = [
        getBackendUrl(`/api/videos?wallet=${walletAddress}`),
        getBackendUrl(`/api/wallet/${encodeURIComponent(walletAddress)}/content`),
        getBackendUrl(`/api/users/${encodeURIComponent(walletAddress)}/content`),
      ]

      for (const url of attempts) {
        try {
          const res = await fetch(url)
          if (!res.ok) continue
          const data = await res.json()
          // Accept either an array or an object containing array
          if (Array.isArray(data)) {
            setVideos(data)
          } else if (Array.isArray(data.items)) {
            setVideos(data.items)
          } else {
            setVideos([])
          }
          setLoadingVideos(false)
          return
        } catch (err) {
          continue
        }
      }
      console.error("Failed to fetch videos from backend: all attempts failed")
      setVideos([])
      setLoadingVideos(false)
    }

    tryFetchVideos()
  }, [publicKey])

  const handleDisconnect = () => {
    disconnect()
    window.location.href = "/"
  }

  // REFACTORED: Client-side text extraction for PDF, DOCX, and text files
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles: { name: string; type: string; content?: string }[] = []

    for (const file of Array.from(files)) {
      try {
        // Extract text client-side from supported file types
        const extractedText = await extractTextFromFile(file)
        
        newFiles.push({
          name: file.name,
          type: file.type,
          content: extractedText || undefined, // undefined if extraction failed or unsupported
        })

        // Auto-generate project name from first non-empty file content
        if (projectName === "Untitled Project" && extractedText && extractedText.trim()) {
          const generatedName = await generateProjectName(extractedText)
          setProjectName(generatedName)
        }
      } catch (error) {
        console.error(`Failed to process file ${file.name}:`, error)
        // Still add file to list but without content
        newFiles.push({ name: file.name, type: file.type })
      }
    }

    setUploadedFiles((prev) => [...prev, ...newFiles])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // MERGED removeFile
  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    if (selectedSource && uploadedFiles[index]?.name === selectedSource.name) {
      setSelectedSource(null)
      setSuggestedQuestions([])
    }
  }

  const handleSelectSource = async (file: { name: string; type?: string; content?: string; contentUrl?: string }) => {
    // Resolve the latest file object from state (by name) to avoid stale references
    const latest = uploadedFiles.find((f) => f.name === file.name) || file

    // Use only local content for preview — no backend calls for preview.
    let contentText: string | undefined = latest.content

    // Generate appropriate preview message based on content availability
    let contentPreview: string
    if (contentText && contentText.trim().length > 0) {
      contentPreview = contentText
    } else if ((latest.type && latest.type.startsWith("text/")) || latest.name.match(/\.(txt|md|json|csv|pdf|docx)$/i)) {
      // Supported format but no content extracted
      contentPreview = "This document contains little or no extractable text."
    } else {
      // Unsupported format
      contentPreview = "Preview not available. Content will be processed during generation."
    }

    setSelectedSource({ name: latest.name, content: contentPreview })
    setSuggestedQuestions([])

    // Only call question-generation when there is real content to analyze (explicit AI action).
    if (!contentText || contentText.trim().length === 0) return

    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: contentText.substring(0, 2000) }),
      })
      if (res.ok) {
        const data = await res.json()
        setSuggestedQuestions(data.questions || [])
      }
    } catch {
      setSuggestedQuestions([])
    }
  }

  const handleExplainSelection = (format: "video" | "audio") => {
    const selection = window.getSelection()?.toString()
    if (selection && selection.trim()) {
      setContent(`Explain this in detail:\n\n"${selection.trim()}"`)
      setGenerationType(format)
      setSelectedSource(null)
    }
  }

  const handleContentChange = async (newContent: string) => {
    setContent(newContent)

    // Auto-generate name if still untitled and content is substantial
    if (projectName === "Untitled Project" && newContent.trim().length > 50) {
      const generatedName = await generateProjectName(newContent)
      setProjectName(generatedName)
    }
  }

  // Generate video/audio
  const handleGenerate = async () => {
    // Derive unified preview content: script takes priority, otherwise combine uploaded sources
    const previewContent =
      content.trim().length > 0
        ? content
        : uploadedFiles
            .map((f) => f.content)
            .filter(Boolean)
            .join("\n\n---\n\n")

    if (!previewContent || previewContent.trim().length === 0) {
      setError("Please add content or upload a source file")
      return
    }

    if (!publicKey) {
      setError("Please connect your wallet")
      return
    }

    const creditCost = generationType === "video" ? 2 : 1
    if (points !== null && points < creditCost) {
      setError(`Not enough credits. You need ${creditCost} credits for ${generationType} generation.`)
      return
    }

    setLoading(true)
    setError("")

    try {
      const payload = {
        type: "full",
        mode: generationType,
        content: previewContent,
        sources: uploadedFiles.map((f) => ({ name: f.name })),
        title: projectName,
        wallet: publicKey.toString(),
      }

      const response = await fetch(getBackendUrl("/api/generate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Generation failed")
      }

      const data = await response.json()

      // Update credits if provided
      if (data.remainingCredits !== undefined) {
        setPoints(data.remainingCredits)
      }

      // Add to videos list
      const newVideo = {
        id: Date.now().toString(),
        url: data.url,
        title: projectName,
        type: generationType,
        createdAt: new Date().toISOString(),
      }
      setVideos((prev) => [newVideo, ...prev])
      setCurrentVideo({ url: data.url, title: projectName })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed")
    } finally {
      setLoading(false)
    }
  }

  // Impromptu question generation
  const handleImpromptuGenerate = async (mode: "audio" | "video") => {
    if (!impromptuQuestion.trim()) {
      return
    }

    // Derive preview content (script takes priority, then sources)
    const previewContent =
      content.trim().length > 0
        ? content
        : uploadedFiles
            .map((f) => f.content)
            .filter(Boolean)
            .join("\n\n---\n\n")

    if (!previewContent.trim()) {
      setError("No content available to answer questions about")
      return
    }

    if (!publicKey) {
      setError("Please connect your wallet")
      return
    }

    setImpromptuLoading(true)
    setError("")

    try {
      const response = await fetch(getBackendUrl("/api/generate/impromptu"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "question",
          mode: mode,
          context: previewContent,
          question: impromptuQuestion,
          wallet: publicKey.toString(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Impromptu ${mode} generation failed`)
      }

      const data = await response.json()

      // Update credits if provided
      if (data.remainingCredits !== undefined) {
        setPoints(data.remainingCredits)
      }

      // Add to videos list
      const newVideo = {
        id: Date.now().toString(),
        url: data.url,
        title: impromptuQuestion.substring(0, 50),
        type: mode,
        createdAt: new Date().toISOString(),
      }
      setVideos((prev) => [newVideo, ...prev])
      setCurrentVideo({ url: data.url, title: impromptuQuestion.substring(0, 50) })

      // Clear question input
      setImpromptuQuestion("")
    } catch (err) {
      setError(err instanceof Error ? err.message : `Impromptu ${mode} generation failed`)
    } finally {
      setImpromptuLoading(false)
    }
  }

  // Wallet not connected - show connect prompt
  if (!publicKey) {
    return (
      <div className="h-screen bg-[#0a0510] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Connect Wallet to Access Studio</h1>
          <p className="text-slate-400 max-w-md">
            Connect your Solana wallet to start creating AI-powered videos and audio content.
          </p>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#0a0510] text-white overflow-hidden">
      {/* Header - Fixed */}
      <header className="flex-shrink-0 bg-[#0d0815]/90 backdrop-blur-sm border-b border-slate-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => (window.location.href = "/")} className="text-sm text-slate-400 hover:text-white">
            ← Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {/* Editable Project Name */}
            {isEditingName ? (
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
                className="bg-transparent border-b border-purple-500 text-lg font-semibold focus:outline-none"
                autoFocus
              />
            ) : (
              <button onClick={() => setIsEditingName(true)} className="text-lg font-semibold hover:text-purple-400">
                {projectName}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <div className="text-slate-300">
              {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
            </div>
            <div className="text-xs text-purple-400">Credits: {points ?? "—"}</div>
          </div>
          <button onClick={handleDisconnect} className="p-2 rounded-lg border border-slate-700 hover:bg-slate-800">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {backendError && (
        <div className="bg-red-600/10 border-t border-b border-red-500/20 text-red-300 text-sm px-4 py-2">
          {backendError}
        </div>
      )}

      {/* Main 3-Panel Layout - Fills remaining height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Sources */}
        <aside className="w-72 flex-shrink-0 border-r border-slate-800 bg-[#0d0815] flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Sources</span>
              <button onClick={() => fileInputRef.current?.click()} className="p-1.5 rounded-lg hover:bg-slate-800">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-lg border border-dashed border-slate-600 text-sm text-slate-400 hover:border-purple-500 hover:text-purple-400 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add sources
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept=".txt,.md,.json,.csv,.pdf,.docx"
            />

            {/* Import Repo / Docs Section */}
            <div className="mt-3 pt-3 border-t border-slate-700">
              {/* <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Import Repo / Docs
              </label> */}
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !importLoading) {
                      handleImportRepo()
                    }
                  }}
                  placeholder="Paste repo or docs URL"
                  className="flex-1 px-2 py-2 bg-slate-900/50 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  disabled={importLoading}
                />
                <button
                  onClick={handleImportRepo}
                  disabled={importLoading || !importUrl.trim()}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded text-xs font-medium text-white transition"
                >
                  {importLoading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Upload className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Import Status Messages */}
              {importError && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded p-2 mb-2">
                  {importError}
                </div>
              )}
              {importSuccess && (
                <div className="text-xs text-green-400 bg-green-500/10 border border-green-500/30 rounded p-2 mb-2">
                  {importSuccess}
                </div>
              )}
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="px-4 py-2 border-b border-slate-800">
              <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded bg-slate-700 border-slate-600" />
                Select all sources
              </label>
            </div>
          )}

          {/* Uploaded Files List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {uploadedFiles.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Saved sources will appear here</p>
                <p className="text-xs mt-1">Upload PDFs, text files, or documents</p>
              </div>
            ) : (
              uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectSource(file)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                    selectedSource?.name === file.name
                      ? "bg-purple-600/20 border border-purple-500/50"
                      : "bg-slate-800/50 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    className="p-1 hover:bg-slate-700 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Center Panel - Unified Content */}
        <main className="flex-1 flex flex-col bg-[#0a0510]">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="font-semibold">Chat</span>
            <button className="p-1.5 rounded-lg hover:bg-slate-800">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Unified Preview Session - Always present */}
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
              {/* Unified Canvas: editable script at top, sources appended below inside one scrollable surface */}
              <div className="flex-1 overflow-y-auto mb-4 min-h-[300px] p-4 bg-slate-900/10 border border-slate-700/50 rounded-xl">
                {/* Show only one view at a time: script OR sources. If neither, show a read-only overlay hint. */}
                {content.trim().length === 0 && uploadedFiles.length === 0 ? (
                  <div className="h-full relative">
                    <textarea
                      ref={unifiedTextareaRef}
                      value={content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder=""
                      className="w-full h-full min-h-[300px] max-h-[80vh] bg-transparent p-6 text-white placeholder-transparent resize-none focus:outline-none"
                    />

                    {/* Centered, non-interactive placeholder overlay (unclickable write-up) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                      <div className="text-lg text-slate-500 mb-4 select-none">Start typing your script here...</div>
                      <div className="text-sm text-slate-400 select-none">Paste your script or add sources from the left panel</div>
                    </div>
                  </div>
                ) : content.trim().length > 0 ? (
                  // Script-only view: textarea fills remaining canvas, non-resizable and scrollable
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-semibold text-white mb-2">Your Script</label>
                    <textarea
                      value={content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Start typing your script here..."
                      className="w-full flex-1 bg-transparent border border-slate-800/40 rounded-xl p-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 overflow-auto"
                    />
                  </div>
                ) : (
                  // Sources-only view: combine available extracted text into one continuous block (no separators or script area)
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Source Content</label>
                    <pre className="whitespace-pre-wrap text-sm text-slate-300 bg-transparent p-3 rounded w-full">{uploadedFiles.map((f) => f.content || "").filter(Boolean).join("\n\n") || "(No extractable text)"}</pre>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Question Bar + Impromptu Generation */}
              <div className="flex items-center gap-2 p-3 bg-slate-900/80 rounded-xl border border-slate-700 mb-4">
                <input
                  type="text"
                  value={impromptuQuestion}
                  onChange={(e) => setImpromptuQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && impromptuQuestion.trim() && !impromptuLoading) {
                      handleImpromptuGenerate(impromptuMode)
                    }
                  }}
                  placeholder="Ask a question about the content..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
                  disabled={impromptuLoading}
                />
                <button
                  onClick={() => handleImpromptuGenerate("audio")}
                  disabled={!impromptuQuestion.trim() || impromptuLoading}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-1.5 transition"
                >
                  {impromptuLoading && impromptuMode === "audio" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Mic className="w-3 h-3" />
                  )}
                  Audio
                </button>
                <button
                  onClick={() => handleImpromptuGenerate("video")}
                  disabled={!impromptuQuestion.trim() || impromptuLoading}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-1.5 transition"
                >
                  {impromptuLoading && impromptuMode === "video" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Video className="w-3 h-3" />
                  )}
                  Video
                </button>
              </div>

              {/* Bottom Action Bar - Main Generation */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-700">
                <div className="text-xs text-slate-500 flex items-center gap-3">
                  {uploadedFiles.length > 0 && <span>{uploadedFiles.length} source(s)</span>}
                  {content.trim().length > 0 && (
                    <span>
                      ~{Math.ceil(content.trim().split(/\s+/).length / 150)} min video
                    </span>
                  )}
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={loading || (content.trim().length === 0 && uploadedFiles.length === 0)}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition ${
                    loading
                      ? "bg-slate-700 cursor-not-allowed"
                      : generationType === "video"
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
                        : "bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      {generationType === "video" ? <Video className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      Generate Full ({generationType === "video" ? 2 : 1} credits)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel - Studio Output */}
        <aside className="w-80 flex-shrink-0 border-l border-slate-800 bg-[#0d0815] flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="font-semibold">Studio</span>
          </div>

          <div className="p-4 border-b border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGenerationType("audio")}
                className={`flex items-center gap-2 p-3 rounded-lg text-sm transition ${
                  generationType === "audio"
                    ? "bg-purple-600/20 border border-purple-500/50 text-purple-300"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Audio Overview</span>
              </button>
              <button
                onClick={() => setGenerationType("video")}
                className={`flex items-center gap-2 p-3 rounded-lg text-sm transition ${
                  generationType === "video"
                    ? "bg-purple-600/20 border border-purple-500/50 text-purple-300"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Video Overview</span>
              </button>
            </div>
          </div>

          {/* Current Video Preview */}
          {currentVideo && (
            <div className="p-4 border-b border-slate-800">
              <VideoDisplay
                videoUrl={currentVideo.url}
                title={currentVideo.title}
                onClose={() => setCurrentVideo(null)}
              />
            </div>
          )}

          {/* Generated Content List - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-xs text-slate-500 mb-3">Generated Content</div>
            {loadingVideos ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50 text-purple-400" />
                <p className="text-sm text-purple-400">Studio output will be saved here</p>
                <p className="text-xs mt-2">
                  After adding sources, click to add Audio Overview, Video Overview, and more!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {videos.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setCurrentVideo({ url: v.url, title: v.title })}
                    className="w-full p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-left transition"
                  >
                    <div className="flex items-center gap-2">
                      {v.type === "video" ? (
                        <Film className="w-4 h-4 text-purple-400" />
                      ) : (
                        <Mic className="w-4 h-4 text-pink-400" />
                      )}
                      <span className="text-sm font-medium truncate">{v.title || "Untitled"}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{new Date(v.createdAt).toLocaleDateString()}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-800">
            <button className="w-full py-2 px-3 rounded-lg border border-slate-600 text-sm text-slate-400 hover:border-purple-500 hover:text-purple-400 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Add note
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

function StudioCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-3 p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition group">
      <div className="text-slate-400 group-hover:text-slate-300 transition">{icon}</div>
      <span className="text-xs font-medium text-slate-300">{label}</span>
    </button>
  )
}
