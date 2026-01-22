"use client"

import type React from "react"
import { useState, useEffect, useRef, startTransition } from "react"
import { useRouter } from 'next/navigation'
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import {
  Download,
  Play,
  Pause,
  Share2,
  AlertCircle,
  CheckCircle,
  FileText,
  Video,
  Sparkles,
  LogOut,
  Volume2,
  VolumeX,
  Maximize,
  Plus,
  Settings,
  X,
  Upload,
  Loader2,
  Film,
  Mic,
} from "lucide-react"
import Pricing from "./Pricing"

const getBackendUrl = (path: string) => {
  // Prefer same-origin API routes when path is an /api route so the app
  // can run with a single Next.js server. If an explicit NEXT_PUBLIC_BACKEND_URL
  // is provided (non-empty), it will be used for external endpoints.
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ""
  if (!path || typeof path !== 'string') {
    return backendBaseUrl || ''
  }
  // Keep relative API routes on the same origin
  if (path.startsWith('/api')) return path

  if (!path.startsWith('http')) {
    return (backendBaseUrl || 'http://localhost:3001').replace(/\/$/, '') + path
  }
  return path
}

// Map of known docs sites to their GitHub repositories
const DOCS_REPO_MAP: Record<string, string> = {
  "docs.solana.com": "https://github.com/solana-labs/solana-docs",
  "nextjs.org/docs": "https://github.com/vercel/next.js",
  "tailwindcss.com/docs": "https://github.com/tailwindlabs/tailwindcss.com",
  "docs.astro.build": "https://github.com/withastro/astro/tree/main/packages/astro/docs",
  "react.dev": "https://github.com/facebook/react/tree/main/docs",
  "typescript.org": "https://github.com/microsoft/TypeScript-Website",
}

interface URLDetectionResult {
  type: "github" | "docs" | "unknown"
  url: string
  message?: string
}

const detectURLType = (url: string): URLDetectionResult => {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname

    for (const [docsHost, repoUrl] of Object.entries(DOCS_REPO_MAP)) {
      if (hostname.includes(docsHost.split("/")[0])) {
        return {
          type: "docs",
          url: repoUrl,
          message: "Imported from GitHub source for best results.",
        }
      }
    }

    if (hostname === "github.com") {
      return { type: "github", url }
    }

    return { type: "unknown", url }
  } catch {
    return { type: "unknown", url }
  }
}

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

  const getGitHubHeaders = () => {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || localStorage.getItem("github_token")
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    }
    if (token) {
      headers.Authorization = `token ${token}`
    }
    return headers
  }

const SUPPORTED_EXTENSIONS = [".md", ".mdx", ".txt", ".json", ".js", ".ts", ".tsx", ".jsx"]
const MAX_FILE_SIZE = 500 * 1024
const MAX_TOTAL_FILES = 100
const MAX_CONTENT_LENGTH = 100 * 1024

interface GitHubFileNode {
  name: string
  path: string
  type: "file" | "dir"
  size?: number
}

const fetchGitHubTree = async (
  owner: string,
  repo: string,
  path: string = ""
): Promise<GitHubFileNode[]> => {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents${path ? "/" + path : ""}`
    const response = await fetch(url, {
      headers: getGitHubHeaders(),
    })

    if (response.status === 404) {
      throw new Error("Repository not found")
    }
    if (response.status === 403) {
      throw new Error("Rate limit exceeded. Please try again in a few minutes. You can also add a GitHub token to increase your limit.")
    }
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      return []
    }

    return data as GitHubFileNode[]
  } catch (error) {
    console.error("Error fetching GitHub tree:", error)
    throw error
  }
}

const fetchGitHubFileContent = async (
  owner: string,
  repo: string,
  path: string
): Promise<string> => {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    const response = await fetch(url, {
      headers: getGitHubHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`)
    }

    const data = await response.json()
    // GitHub API returns content as base64 encoded string
    if (data.content) {
      return atob(data.content)
    }
    return ""
  } catch (error) {
    console.error(`Error fetching ${path}:`, error)
    return ""
  }
}

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

    const promises = tree.map(async (item) => {
      if (
        item.name.startsWith(".") ||
        ["node_modules", "dist", "build", ".git", "coverage"].includes(item.name)
      ) {
        return null
      }

      if (item.type === "dir") {
        const newPath = basePath ? `${basePath}/${item.name}` : item.name
        const nestedResults = await extractGitHubContent(owner, repo, newPath, depth + 1)
        return nestedResults
      }

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

const combineImportedFiles = (
  files: Array<{ path: string; name: string; content: string }>,
  repoUrl: string
): Array<{ name: string; type: "repo"; content: string; originUrl: string }> => {
  // Create a separate entry for each file instead of grouping by directory
  const sources: Array<{ name: string; type: "repo"; content: string; originUrl: string }> =
    files.map((file) => ({
      name: file.name,
      type: "repo",
      content: file.content.slice(0, MAX_CONTENT_LENGTH),
      originUrl: repoUrl,
    }))

  return sources
}

function countWords(text?: string) {
  if (!text) return 0
  const m = text.trim().match(/\S+/g)
  return m ? m.length : 0
}

interface WordCountStatus {
  count: number
  category: "bad" | "good" | "better" | "outrageous"
  label: string
  color: string
  bgColor: string
  percentage: number
  isValid: boolean
}

function analyzeWordCount(content: string, uploadedFiles: { name: string; type: string; content?: string }[]): WordCountStatus {
  const contentWords = countWords(content)
  const uploadedWords = uploadedFiles.reduce((sum, f) => sum + countWords(f.content), 0)
  const totalWords = contentWords + uploadedWords

  // Categories based on optimal range for main generation
  let category: "bad" | "good" | "better" | "outrageous"
  let label: string
  let isValid: boolean

  // If no content, show neutral state (require at least some content)
  if (totalWords === 0) {
    category = "good"
    label = "Add content"
    isValid = false
  } else if (totalWords < 1500) {
    // Low counts are allowed — no "Too short" warnings
    category = "good"
    label = "Adequate"
    isValid = true
  } else if (totalWords < 5000) {
    category = "better"
    label = "Optimal"
    isValid = true
  } else {
    // Only warn/block when content is excessive
    category = "outrageous"
    label = "Excessive"
    isValid = false
  }

  const color = {
    bad: "text-red-400",
    good: totalWords === 0 ? "text-slate-400" : "text-yellow-400",
    better: "text-green-400",
    outrageous: "text-red-400",
  }[category]

  const bgColor = {
    bad: "bg-red-500/10 border-red-500/30",
    good: totalWords === 0 ? "bg-slate-500/10 border-slate-500/30" : "bg-yellow-500/10 border-yellow-500/30",
    better: "bg-green-500/10 border-green-500/30",
    outrageous: "bg-red-500/10 border-red-500/30",
  }[category]

  const percentage = Math.min((totalWords / 5000) * 100, 100)

  return { count: totalWords, category, label, color, bgColor, percentage, isValid }
}

function analyzeImpromptuWordCount(content: string, uploadedFiles: { name: string; type: string; content?: string }[]): WordCountStatus {
  const contentWords = countWords(content)
  const uploadedWords = uploadedFiles.reduce((sum, f) => sum + countWords(f.content), 0)
  const totalWords = contentWords + uploadedWords

  // Stricter limits for impromptu (lightweight, quick generation)
  let category: "bad" | "good" | "better" | "outrageous"
  let label: string
  let isValid: boolean

  // If no content, show neutral state (require at least some content)
  if (totalWords === 0) {
    category = "good"
    label = "Good"
    isValid = false
  } else if (totalWords < 1000) {
    // Low counts are acceptable for impromptu/quick help
    category = "good"
    label = "Good"
    isValid = true
  } else if (totalWords < 2000) {
    category = "better"
    label = "Optimal"
    isValid = true
  } else {
    // Only warn/block when content is excessive for quick help
    category = "outrageous"
    label = "Too much"
    isValid = false
  }

  const color = {
    bad: "text-red-400",
    good: totalWords === 0 ? "text-slate-400" : "text-yellow-400",
    better: "text-green-400",
    outrageous: "text-red-400",
  }[category]

  const bgColor = {
    bad: "bg-red-500/10 border-red-500/30",
    good: totalWords === 0 ? "bg-slate-500/10 border-slate-500/30" : "bg-yellow-500/10 border-yellow-500/30",
    better: "bg-green-500/10 border-green-500/30",
    outrageous: "bg-red-500/10 border-red-500/30",
  }[category]

  const percentage = Math.min((totalWords / 2000) * 100, 100)

  return { count: totalWords, category, label, color, bgColor, percentage, isValid }
}

interface VideoDisplayProps {
  videoUrl: string
  title?: string
  onClose?: () => void
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ videoUrl, title = "Generated Tutorial Video", onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const absoluteVideoUrl = getBackendUrl(videoUrl)

  useEffect(() => {
    console.log("Video URL in display component:", absoluteVideoUrl)
  }, [absoluteVideoUrl])

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: "Check out this AI-generated tutorial video!",
          url: absoluteVideoUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(absoluteVideoUrl)
        const toast = document.createElement("div")
        toast.className = "fixed top-4 right-4 bg-violet-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        toast.textContent = "Video URL copied to clipboard!"
        document.body.appendChild(toast)
        setTimeout(() => document.body.removeChild(toast), 3000)
      } catch (error) {
        console.error("Failed to copy URL:", error)
      }
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-lg flex items-center justify-center">
            <Play className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm text-slate-400">AI-generated tutorial video</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="bg-gray-800/50 hover:bg-violet-600/20 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-gray-700/50"
            title="Share video"
          >
            <Share2 className="w-5 h-5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-800/50 hover:bg-red-500/20 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-gray-700/50"
              title="Close video"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group border border-gray-800/50"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={absoluteVideoUrl}
          className="w-full h-auto max-h-[60vh] object-contain"
          preload="metadata"
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => {
            if (videoRef.current) {
              setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100)
              setCurrentTime(videoRef.current.currentTime)
            }
          }}
          onLoadedMetadata={(e) => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration)
            }
          }}
        >
          Your browser does not support the video tag.
        </video>

        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-all duration-300 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className="w-full bg-gray-700/50 rounded-full h-1 mb-4">
            <div
              className="bg-gradient-to-r from-violet-600 to-indigo-500 h-1 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="bg-violet-600 hover:bg-indigo-500 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleMute}
                className="bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-200"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-200"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleDownload}
          className="flex-1 min-w-[200px] bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
        >
          <Download className="w-5 h-5" />
          <span>Download Video</span>
        </button>

        <button
          onClick={handleShare}
          className="flex-1 min-w-[200px] bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold py-3 px-5 rounded-xl border border-gray-700/50 transition-all duration-200 flex items-center justify-center space-x-3 backdrop-blur-sm"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Video</span>
        </button>
      </div>
    </div>
  )
}

export default function WeaveItApp() {
  const { connected, disconnect, publicKey } = useWallet()
  const router = useRouter()
  const [currentVideo, setCurrentVideo] = useState<{ url: string; title: string } | null>(null)
  const [videos, setVideos] = useState<Array<{
    [x: string]: string; id: string; title: string; url: string; createdAt: string 
  }>>([])
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [points, setPoints] = useState<number | null>(null)
  const [_, setTrialExpiresAt] = useState<string | null>(null)
  const [generationType, setGenerationType] = useState<"video" | "audio">("video")
  const [selectedModel, setSelectedModel] = useState<"mona" | "dona">("dona")
  const [loadingStep, setLoadingStep] = useState("")
  const [progressPct, setProgressPct] = useState(0)

  const [projectName, setProjectName] = useState("Untitled Project")
  const [isEditingName, setIsEditingName] = useState(false)

  const [content, setContent] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string; content?: string; selected?: boolean }[]>([])
  const [selectedSource, setSelectedSource] = useState<{ name: string; content: string } | null>(null)
  const [selectedFileIndices, setSelectedFileIndices] = useState<Set<number>>(new Set())

  const [impromptuQuestion, setImpromptuQuestion] = useState("")
  const [impromptuLoading, setImpromptuLoading] = useState(false)
  
  const [importUrl, setImportUrl] = useState("")
  const [importLoading, setImportLoading] = useState(false)
  const [importError, setImportError] = useState("")
  const [importSuccess, setImportSuccess] = useState("")

    const [githubToken, setGithubToken] = useState("")
    const [showTokenInput, setShowTokenInput] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [backendError, setBackendError] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showPricing, setShowPricing] = useState(false)

  const showComingSoon = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  // Auto-dismiss errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Auto-dismiss success after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  // CRITICAL FIX: Only fetch user content AFTER initial render
  // This prevents blocking the page load with API calls
  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false)

    // Load GitHub token from localStorage on mount
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const savedToken = localStorage.getItem("github_token") || ""
        setGithubToken(savedToken)
      }
    }, [])

  useEffect(() => {
    // Don't fetch immediately - wait for user interaction or a delay
    if (!connected || !publicKey || hasInitiallyFetched) return

    // Delay the fetch to allow page to render first
    const timer = setTimeout(() => {
      fetchUserContent()
    }, 500) // Half second delay allows page to be interactive first

    return () => clearTimeout(timer)
  }, [connected, publicKey, hasInitiallyFetched])

  const fetchUserContent = async () => {
    if (!connected || !publicKey) {
      setVideos([])
      setPoints(null)
      setTrialExpiresAt(null)
      return
    }

    setLoadingVideos(true)
    setHasInitiallyFetched(true)

    try {
      const walletAddress = publicKey.toBase58()

      try {
        // @ts-ignore - dynamic import
        const backendModule = await import("../../lib/backend")
        const data = await backendModule.fetchUserContent(walletAddress)
        console.log("Fetched content:", data)

        const backendBaseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001").replace(/\/$/, "")

        const fetchedContent = (data?.content || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          url: `${backendBaseUrl}${item.url}`,
          createdAt: item.created_at,
          contentType: item.content_type,
          type: item.content_type && typeof item.content_type === 'string' && item.content_type.includes('audio') ? 'audio' : 'video',
        }))

        console.log("Transformed content:", fetchedContent)
        setVideos(fetchedContent)

        try {
          const pointsData = await backendModule.fetchUserPoints(walletAddress)
          setPoints(typeof pointsData.points === 'number' ? pointsData.points : null)
          setTrialExpiresAt(pointsData.trial_expires_at || null)
        } catch (err) {
          console.warn('Failed to fetch points (this is non-critical):', err)
          setPoints(null)
          setTrialExpiresAt(null)
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err)
        console.error("Failed to fetch content:", errorMsg)
        // Don't set videos to empty on error - keep existing state
        // User will see a warning but won't lose their data
        setToastMessage(`Unable to load content: ${errorMsg}`)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      console.error("Error fetching content:", errorMsg)
      setToastMessage(`Error: ${errorMsg}`)
    } finally {
      setLoadingVideos(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setCurrentVideo(null)
  }

    const handleSaveGitHubToken = () => {
      if (githubToken.trim()) {
        localStorage.setItem("github_token", githubToken)
        setShowTokenInput(false)
        showComingSoon("GitHub token saved successfully!")
      }
    }

    const handleClearGitHubToken = () => {
      localStorage.removeItem("github_token")
      setGithubToken("")
      setShowTokenInput(false)
      showComingSoon("GitHub token cleared")
    }

  const handleVideoGenerated = (videoUrl: string, title: string, type: "video" | "audio" = "video") => {
    console.log("Content generated with URL:", videoUrl)
    
    const contentIdMatch = videoUrl.match(/\/api\/(?:videos|audio)\/([a-f0-9-]+)/i)
    // Use crypto.randomUUID() for better hydration-safe ID generation, fallback to crypto.getRandomValues if needed
    const contentId = contentIdMatch ? contentIdMatch[1] : `local-${typeof crypto !== 'undefined' ? Math.random().toString(36).substring(2, 11) : 'unknown'}`
    
    const newContent = {
      id: contentId,
      title,
      url: videoUrl,
      type,
      createdAt: new Date().toISOString(),
    }
    
    setVideos((prev) => {
      const existingIndex = prev.findIndex(v => v.id === contentId)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = newContent
        return updated
      }
      return [newContent, ...prev]
    })
    
    setCurrentVideo({ url: videoUrl, title })
    console.log("Current content set to:", { url: videoUrl, title })
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const unifiedTextareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
    // Also remove from selected indices
    setSelectedFileIndices((prev) => {
      const newSet = new Set(prev)
      newSet.delete(index)
      // Adjust indices for items after the removed one
      const adjusted = new Set<number>()
      newSet.forEach((i) => {
        if (i > index) adjusted.add(i - 1)
        else adjusted.add(i)
      })
      return adjusted
    })
  }

  const toggleFileSelection = (index: number) => {
    setSelectedFileIndices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const selectAllFiles = () => {
    if (uploadedFiles.length === 0) return
    const allIndices = new Set(uploadedFiles.map((_, i) => i))
    setSelectedFileIndices(allIndices)
  }

  const deselectAllFiles = () => {
    setSelectedFileIndices(new Set())
  }

  const handleSelectSource = (file: any) => {
    setSelectedSource(file)
  }

  const handleContentChange = (value: string) => {
    setContent(value)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    try {
      const supportedTextExt = [
        '.txt', '.md', '.mdx', '.json', '.csv', '.js', '.ts', '.jsx', '.tsx'
      ]

      const toAdd: { name: string; type: string; content?: string; originUrl?: string }[] = []

      const uploads: File[] = []

      for (const f of Array.from(files)) {
        const lower = f.name.toLowerCase()
        const ext = lower.includes('.') ? lower.substring(lower.lastIndexOf('.')) : ''

        if (supportedTextExt.includes(ext)) {
          try {
            const text = await f.text()
            toAdd.push({ name: f.name, type: 'file', content: text })
          } catch (e) {
            // fallback to upload if reading fails
            uploads.push(f)
          }
        } else if (ext === '.pdf' || ext === '.docx' || ext === '.doc') {
          // attempt server-side extraction for binaries
          uploads.push(f)
        } else {
          // unknown binary - upload to backend so user can still ingest or download later
          uploads.push(f)
        }
      }

      // Add client-read files to state first
      if (toAdd.length > 0) {
        setUploadedFiles((prev) => [...prev, ...toAdd.map(t => ({ name: t.name, type: t.type, content: t.content }))])
      }

      // If there are binary files, upload them to the local Next.js API
      if (uploads.length > 0) {
        const form = new FormData()
        uploads.forEach((f) => form.append('files', f))
        // const resp = await fetch(getBackendUrl('/api/upload'), {
        //   method: 'POST',
        //   body: form,
        // })
        const resp = await fetch('/api/upload', {
          method: 'POST',
          body: form,
        })
        if (!resp.ok) {
          // Read response body for better diagnostics
          let bodyText = ''
          try {
            bodyText = await resp.text()
          } catch (e) {
            /* ignore */
          }
          let parsedBody: any = null
          try {
            parsedBody = JSON.parse(bodyText)
          } catch (e) {
            parsedBody = bodyText
          }
          console.error('Upload failed', { status: resp.status, statusText: resp.statusText, body: parsedBody })
          setImportError(`Upload failed: ${parsedBody?.error || parsedBody || resp.statusText || resp.status}`)
        } else {
          const data = await resp.json()
          const items = Array.isArray(data) ? data : [data]
          for (const uploaded of items) {
            // backend may return extracted text in `content` or `extracted_text` or similar
            const extracted = uploaded.content || uploaded.extracted_text || uploaded.text || null
            const name = uploaded.filename || uploaded.name || (uploaded.url ? uploaded.url.split('/').pop() : 'Uploaded')
            if (extracted) {
              setUploadedFiles((prev) => [...prev, { name, type: 'file', content: extracted }])
            } else if (uploaded.url) {
              // fallback: store a reference so user can see the source
              setUploadedFiles((prev) => [...prev, { name: name, type: 'file', content: `Uploaded file available at ${uploaded.url}` }])
            }
          }
        }
      }
    } catch (err) {
      console.error('Upload error', err)
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleImportRepo = async () => {
    if (!importUrl.trim()) {
      setImportError("Please enter a repository or documentation URL")
      return
    }

    setImportLoading(true)
    setImportError("")
    setImportSuccess("")

    try {
      const detection = detectURLType(importUrl)

      if (detection.type === "unknown") {
        setImportError("Direct docs extraction not supported yet. Paste a GitHub repo instead.")
        setImportLoading(false)
        return
      }

      const parsed = parseGitHubURL(detection.url)
      if (!parsed) {
        setImportError("Invalid GitHub repository URL. Use format: https://github.com/owner/repo")
        setImportLoading(false)
        return
      }

      const files = await extractGitHubContent(parsed.owner, parsed.repo)

      if (files.length === 0) {
        setImportError("No supported files found in this repository")
        setImportLoading(false)
        return
      }

      const sources = combineImportedFiles(files, detection.url)

      setUploadedFiles((prev) => [...prev, ...sources])

      let successMsg = `Repository imported successfully! (${files.length} files)`
      if (detection.message) {
        successMsg = detection.message + ` Imported ${files.length} files.`
      }
      setImportSuccess(successMsg)

      setImportUrl("")

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
    
  const handleDeleteVideo = async (videoId: string) => {
    if (!publicKey) return

    try {
      const walletAddress = publicKey.toBase58()
      const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"

      const response = await fetch(`${backendBaseUrl}/api/wallet/${walletAddress}/videos/${videoId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete video")
      }

      // Remove from state
      setVideos((prev) => prev.filter((v) => v.id !== videoId))
      
      // Close current video if it was the one deleted
      if (currentVideo?.url.includes(videoId)) {
        setCurrentVideo(null)
      }

      showComingSoon("Video deleted successfully")
    } catch (err) {
      console.error("Error deleting video:", err)
      setError("Failed to delete video")
    }
  }

  const handleImpromptuGenerate = async () => {
    if (!impromptuQuestion.trim()) return

    // Use only selected files
    const selectedFiles = uploadedFiles.filter((_, index) => selectedFileIndices.has(index))
    const previewContent = content.trim() || selectedFiles.map((f) => f.content || "").filter(Boolean).join("\n\n")

    if (!previewContent.trim()) {
      setError("No content available to answer questions about")
      return
    }

    // Check impromptu word count validity (only block if empty or too large)
    const impromptuStatus = analyzeImpromptuWordCount(content, selectedFiles)
    if (!impromptuStatus.isValid) {
      if (impromptuStatus.count === 0) {
        setError("No content available to answer questions about");
        return;
      }
      if (impromptuStatus.category === "outrageous") {
        setError(`Content is too long (${impromptuStatus.count.toLocaleString()} words). Limit: 2,000 words. Use main generation for longer content.`);
        return;
      }
    }

    if (!publicKey) {
      setError("Please connect your wallet")
      return
    }

    setImpromptuLoading(true)
    setError("")

    setTimeout(() => {
      setImpromptuLoading(false)
      setImpromptuQuestion("")
      const newVideo = {
        id: `temp-${Math.random().toString(36).substring(2, 11)}`,
        title: impromptuQuestion.slice(0, 30) + "...",
        url: "https://example.com/video.mp4",
        type: generationType,
        createdAt: new Date().toISOString()
      }
      setVideos([newVideo, ...videos])
      setCurrentVideo({ url: newVideo.url, title: newVideo.title })
    }, 2000)
  }

  const handleGenerate = async (explicitGenType?: "video" | "audio") => {
    const genType = explicitGenType ?? generationType;

    // Use only selected files
    const selectedFiles = uploadedFiles.filter((_, index) => selectedFileIndices.has(index))

    const scriptContent =
      content.trim() ||
      selectedFiles.map((f) => f.content || "").filter(Boolean).join("\n\n");

    if (!scriptContent) {
      setError("Please add content or sources");
      return;
    }

    // Check word count validity (only block if empty or too large)
    const currentWordCountStatus = analyzeWordCount(content, selectedFiles)
    if (!currentWordCountStatus.isValid) {
      if (currentWordCountStatus.count === 0) {
        setError("Please add content or sources");
        return;
      }
      if (currentWordCountStatus.category === "outrageous") {
        setError(`Content exceeds 5,000 word limit (${currentWordCountStatus.count.toLocaleString()} words). Please reduce content.`);
        return;
      }
    }

    if (!publicKey) {
      setError("Wallet not connected");
      return;
    }

    setLoading(true);
    setProgressPct(0);
    setLoadingStep("Starting generation...");
    setError("");
    setSuccess("");

    try {
      const autoTitle =
        scriptContent.slice(0, 50).trim() +
        (scriptContent.length > 50 ? "..." : "");

      const endpoint = genType === "audio" ? "/api/generate/audio" : "/api/generate";

      const backendBaseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

      const renderVersion = selectedModel === "mona" ? "v1" : selectedModel === "dona" ? "v3" : "v3";

      const response = await fetch(`${backendBaseUrl}${endpoint}?renderVersion=${renderVersion}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: scriptContent,
          prompt: impromptuQuestion.trim() || null,
          walletAddress: publicKey.toBase58(),
        }),
      });

      if (response.status === 402) {
        const errorData = await response.json().catch(() => ({}));
        setError(
          `Insufficient credits. You need ${
            errorData.required || 2
          } credits.`
        );
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to start generation");
      }

      const { jobId, title } = await response.json();

      const ws = new WebSocket(backendBaseUrl.replace(/^http/, "ws"));

      ws.onopen = () => {
        ws.send(JSON.stringify({ action: "subscribe", jobId }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "progress") {
          setProgressPct(data.progress ?? 0);
          setLoadingStep(data.message || "Processing...");
        }

        if (data.type === "completed") {
          setProgressPct(100);

          const contentId = data.videoId || data.audioId;
          const contentUrl = genType === "audio" ? `${backendBaseUrl}/api/audio/${contentId}` : `${backendBaseUrl}/api/videos/${contentId}`;

          handleVideoGenerated(contentUrl, title, genType);
          setSuccess("Completed!");
          setLoading(false);
          setLoadingStep("");

          // Update points locally after generation
          setPoints(prev => typeof prev === 'number' ? prev - (genType === "video" ? 2 : 1) : prev);

          ws.close();
        }

        if (data.type === "error") {
          setError(data.error || "Generation failed");
          setProgressPct(0);
          setLoading(false);
          setLoadingStep("");
          ws.close();
        }
      };

      ws.onerror = () => {
        setError("WebSocket connection failed");
        setLoading(false);
        setLoadingStep("");
      };
    } catch (err: any) {
      setError(err.message || "Generation failed");
      setLoading(false);
      setLoadingStep("");
    }
  };

  // Calculate word count for display - use only selected files
  const selectedFiles = uploadedFiles.filter((_, index) => selectedFileIndices.has(index))
  const wordCountStatus = analyzeWordCount(content, selectedFiles)
  const impromptuStatus = analyzeImpromptuWordCount(content, selectedFiles)


  // Wallet not connected - show connect prompt
  if (!connected) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Connect Wallet to Access Studio</h1>
          <p className="text-slate-400 max-w-md">
            Connect your Solana wallet to start creating AI-powered videos and audio content.
          </p>
          <WalletMultiButton style={{
            background: "linear-gradient(to right, rgb(124, 58, 202), rgb(79, 70, 229))",
            borderRadius: "0.75rem",
            fontWeight: "600",
            padding: "0.75rem 1.5rem",
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Header - Fixed */}
      <header className="flex-shrink-0 bg-slate-900/70 backdrop-blur-sm border-b border-slate-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => startTransition(() => router.push('/'))} className="text-sm text-slate-400 hover:text-white">
            ← Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {isEditingName ? (
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
                className="bg-transparent border-b border-violet-500 text-lg font-semibold focus:outline-none"
                autoFocus
              />
            ) : (
              <button onClick={() => setIsEditingName(true)} className="text-lg font-semibold hover:text-violet-400">
                {projectName}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <div className="text-slate-300">
              {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-violet-400">Credits: {points ?? "—"}</div>
              <button
                onClick={() => setShowPricing(true)}
                title="Buy credits"
                className="text-xs px-2 py-1 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 rounded transition"
              >
                Buy
              </button>
            </div>
          </div>
          <button onClick={handleDisconnect} className="p-2 rounded-lg border border-slate-700 hover:bg-slate-800">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {showPricing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowPricing(false)}
        >
          <div
            className="max-w-4xl w-full bg-slate-900 rounded-xl shadow-xl overflow-auto max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPricing(false)}
              aria-label="Close pricing"
              className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 overflow-auto">
              <Pricing
                onClose={() => setShowPricing(false)}
                onPurchase={(credits) => {
                  setPoints((prev) => (typeof prev === "number" ? prev + credits : credits))
                  setShowPricing(false)
                }}
              />
            </div>
          </div>
        </div>
      )}

      {backendError && (
        <div className="bg-red-600/10 border-t border-b border-red-500/20 text-red-300 text-sm px-4 py-2">
          {backendError}
        </div>
      )}

      {toastMessage && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-violet-600 text-white px-4 py-2 rounded-lg shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Main 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Sources */}
        <aside className="w-72 flex-shrink-0 border-r border-slate-800 bg-slate-900/50 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Sources</span>
              <button onClick={() => fileInputRef.current?.click()} className="p-1.5 rounded-lg hover:bg-slate-800">
                {/* <Plus className="w-4 h-4" /> */}
              </button>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-lg border border-dashed border-slate-600 text-sm text-slate-400 hover:border-violet-500 hover:text-violet-400 flex items-center justify-center gap-2"
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

            <div className="mt-3 pt-3 border-t border-slate-700">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !importLoading) {
                      handleImportRepo();
                    }
                  }}
                  placeholder="Paste repo or docs URL"
                  className="flex-1 px-2 py-2 bg-slate-900/50 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  disabled={importLoading}
                />
                <button
                  onClick={handleImportRepo}
                  disabled={importLoading || !importUrl.trim()}
                  className="px-3 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded text-xs font-medium text-white transition"
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
                {/* GitHub Token Section */}
                <div className="mt-2 pt-2 border-t border-slate-700">
                  <button
                    onClick={() => setShowTokenInput(!showTokenInput)}
                    className="text-xs text-slate-400 hover:text-violet-400 transition"
                  >
                    {githubToken ? "✓ " : ""}GitHub Token {showTokenInput ? "▼" : "▶"}
                  </button>
                
                  {showTokenInput && (
                    <div className="mt-2 space-y-2">
                      <input
                        type="password"
                        value={githubToken}
                        onChange={(e) => setGithubToken(e.target.value)}
                        placeholder="Paste your GitHub token (PAT)"
                        className="w-full px-2 py-1 bg-slate-900/50 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                      />
                      <p className="text-xs text-slate-500 leading-tight">
                        Create a token at{" "}
                        <a
                          href="https://github.com/settings/tokens"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:underline"
                        >
                          github.com/settings/tokens
                        </a>
                        {" "}(Increases API limit to 5,000 requests/hour)
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveGitHubToken}
                          className="flex-1 px-2 py-1 bg-violet-600 hover:bg-violet-700 rounded text-xs font-medium text-white transition"
                        >
                          Save
                        </button>
                        {githubToken && (
                          <button
                            onClick={handleClearGitHubToken}
                            className="flex-1 px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs font-medium text-white transition"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="px-4 py-2 border-b border-slate-800 space-y-2">
              <button
                onClick={selectedFileIndices.size === uploadedFiles.length ? deselectAllFiles : selectAllFiles}
                className="w-full flex items-center justify-center gap-2 text-sm px-3 py-2 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 rounded border border-violet-500/30 transition"
              >
                {selectedFileIndices.size === uploadedFiles.length ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    All Selected
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 border-2 border-violet-400 rounded-full" />
                    Select All
                  </>
                )}
              </button>
              <div className="text-xs text-slate-500 text-center">
                {selectedFileIndices.size} of {uploadedFiles.length} selected
              </div>
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
              uploadedFiles.map((file, index) => {
                const isSelected = selectedFileIndices.has(index)
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-2 rounded-lg transition ${
                      isSelected
                        ? "bg-violet-600/20 border border-violet-500/50"
                        : "bg-slate-800/50 hover:bg-slate-800 border border-transparent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFileSelection(index)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 cursor-pointer rounded bg-slate-700 border-slate-600 accent-violet-600"
                    />
                    <div
                      onClick={() => {
                        toggleFileSelection(index)
                        handleSelectSource(file)
                      }}
                      className="flex-1 flex items-center gap-2 truncate cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="p-1 hover:bg-slate-700 rounded flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </aside>

        {/* Center Panel - Unified Content */}
        <main className="flex-1 flex flex-col bg-slate-950 min-w-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="font-semibold">Chat</span>
            <button onClick={() => showComingSoon('Settings coming soon')} className="p-1.5 rounded-lg hover:bg-slate-800">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
              {/* Unified Canvas - Content Area */}
              <div className="flex-1 overflow-y-auto mb-4 min-h-[300px] p-4 bg-slate-900/10 border border-slate-700/50 rounded-xl min-w-0">
                {content.trim().length === 0 && uploadedFiles.length === 0 ? (
                  <div className="h-full relative">
                    <textarea
                      ref={unifiedTextareaRef}
                      value={content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder=""
                      className="w-full h-full min-h-[300px] max-h-[80vh] bg-transparent p-6 text-white placeholder-transparent resize-none focus:outline-none"
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                      <div className="text-lg text-slate-500 mb-4 select-none">Start typing your script here...</div>
                      <div className="text-sm text-slate-400 select-none">Paste your script or add sources from the left panel</div>
                    </div>
                  </div>
                ) : content.trim().length > 0 ? (
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-semibold text-white mb-2">Your Script</label>
                    <textarea
                      value={content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Start typing your script here..."
                      className="w-full flex-1 bg-transparent border border-slate-800/40 rounded-xl p-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 overflow-auto"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Source Content {selectedFiles.length > 0 && `(${selectedFiles.length} selected)`}</label>
                    <pre className="whitespace-pre-wrap break-words text-sm text-slate-300 bg-transparent p-3 rounded w-full max-w-full overflow-x-auto">{selectedFiles.map((f) => f.content || "").filter(Boolean).join("\n\n") || "(No extractable text)"}</pre>
                  </div>
                )}
              </div>

              {/* Error Message - Fixed Position, Dismissible */}
              {error && (
                <div className="fixed top-20 right-4 max-w-sm z-40 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2 text-red-400 text-sm shadow-lg animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 pr-2">{error}</div>
                  <button
                    onClick={() => setError("")}
                    className="flex-shrink-0 p-0.5 hover:bg-red-500/20 rounded transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Success Message - Fixed Position, Dismissible */}
              {success && (
                <div className="fixed top-20 right-4 max-w-sm z-40 p-3 bg-violet-600/10 border border-violet-600/30 rounded-lg flex items-start gap-2 text-violet-400 text-sm shadow-lg animate-in fade-in duration-200">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 pr-2">{success}</div>
                  <button
                    onClick={() => setSuccess("")}
                    className="flex-shrink-0 p-0.5 hover:bg-violet-500/20 rounded transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Question Bar + Impromptu Generation */}
              <div className="flex items-center gap-2 p-3 bg-slate-900/80 rounded-xl border border-slate-700 mb-4">
                <input
                  type="text"
                  value={impromptuQuestion}
                  onChange={(e) => setImpromptuQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && impromptuQuestion.trim() && !impromptuLoading && impromptuStatus.isValid) {
                      handleImpromptuGenerate();
                    }
                  }}
                  placeholder="Ask a question about the content..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
                  disabled={impromptuLoading}
                />
                <button
                  onClick={() => {
                    const t: "audio" | "video" = "audio";
                    setGenerationType(t);
                    if (impromptuQuestion.trim()) handleImpromptuGenerate();
                  }}
                  disabled={impromptuLoading || !impromptuStatus.isValid}
                  title={!impromptuStatus.isValid ? (impromptuStatus.category === "outrageous" ? "Content too long for Quick Help (max 2,000 words)" : "Add content") : ""}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-1.5 transition"
                >
                  {impromptuLoading && generationType === "audio" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Mic className="w-3 h-3" />
                  )}
                  Audio
                </button>
                <button
                  onClick={() => {
                    const t: "audio" | "video" = "video";
                    setGenerationType(t);
                    if (impromptuQuestion.trim()) handleImpromptuGenerate();
                  }}
                  disabled={impromptuLoading || !impromptuStatus.isValid}
                  title={!impromptuStatus.isValid ? (impromptuStatus.category === "outrageous" ? "Content too long for Quick Help (max 2,000 words)" : "Add content") : ""}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-1.5 transition"
                >
                  {impromptuLoading && generationType === "video" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Video className="w-3 h-3" />
                  )}
                  Video
                </button>
              </div>

              {/* Bottom Action Bar - Main Generation */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-700">
                <div className="flex-1 flex items-center gap-3">
                  <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${wordCountStatus.bgColor} ${wordCountStatus.color}`}>
                    <div className="flex items-center gap-1">
                      <span>{wordCountStatus.count.toLocaleString()} words</span>
                      <span>•</span>
                      <span>{wordCountStatus.label}</span>
                    </div>
                  </div>
                  {uploadedFiles.length > 0 && <span className="text-xs text-slate-500">{uploadedFiles.length} source(s)</span>}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-slate-400">Model:</span>
                    <button
                      onClick={() => setSelectedModel("mona")}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                        selectedModel === "mona"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      Mona
                    </button>
                    <button
                      onClick={() => setSelectedModel("dona")}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                        selectedModel === "dona"
                          ? "bg-pink-600 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      Dona
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleGenerate()}
                  disabled={loading || (content.trim().length === 0 && uploadedFiles.length === 0) || !wordCountStatus.isValid}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition ${
                    loading
                      ? "bg-gray-700/50 cursor-not-allowed"
                      : !wordCountStatus.isValid
                        ? "bg-gray-700/50 cursor-not-allowed"
                      : generationType === "video"
                        ? "bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600"
                        : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <>
                      {generationType === "video" ? <Video className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      Generating...
                    </>
                  ) : (
                    <>
                      {generationType === "video" ? <Video className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      Generate ({generationType === "video" ? 2 : 1} credits)
                    </>
                  )}
                </button>

                {loading && loadingStep && (
                  <div className="w-full mt-3">
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-violet-600 to-indigo-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 text-center flex items-center justify-center gap-1.5">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      {loadingStep.split(' - ')[1] || loadingStep}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel - Studio Output */}
        <aside className="w-80 flex-shrink-0 border-l border-slate-800 bg-slate-900/50 flex flex-col min-w-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="font-semibold">Studio</span>
          </div>

          {currentVideo && (
            <div className="p-4 border-b border-slate-800">
              <VideoDisplay
                videoUrl={currentVideo.url}
                title={currentVideo.title}
                onClose={() => setCurrentVideo(null)}
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-xs text-slate-500 mb-3">Generated Content</div>
            {loadingVideos ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50 text-violet-400" />
                <p className="text-sm text-violet-400">Studio output will be saved here</p>
                <p className="text-xs mt-2">
                  After adding sources, generate content!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {videos.map((v) => (
                  <div
                    key={v.id}
                    className="group w-full p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition"
                  >
                    <button
                      onClick={() => setCurrentVideo({ url: v.url, title: v.title })}
                      className="w-full text-left"
                    >
                      <div className="flex items-center gap-2">
                        {v.type === "video" ? (
                          <Film className="w-4 h-4 text-violet-400" />
                        ) : (
                          <Mic className="w-4 h-4 text-pink-400" />
                        )}
                        <span className="text-sm font-medium truncate">{v.title || "Untitled"}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{new Date(v.createdAt).toLocaleDateString()}</div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteVideo(v.id)
                      }}
                      className="mt-2 w-full p-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded border border-red-500/30 hover:border-red-500/50 transition flex items-center justify-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-800">
            <button onClick={() => showComingSoon('Add note coming soon')} className="w-full py-2 px-3 rounded-lg border border-slate-600 text-sm text-slate-400 hover:border-violet-500 hover:text-violet-400 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Add note
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}