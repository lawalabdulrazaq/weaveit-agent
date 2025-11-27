"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import {
  Download,
  Play,
  Pause,
  Share2,
  AlertCircle,
  CheckCircle,
  DollarSign,
  FileText,
  ArrowRight,
  Video,
  Sparkles,
  LogOut,
  User,
  Wallet,
  Volume2,
  VolumeX,
  Maximize,
  Zap,
  Shield,
  Compass,
  Plus,
  BarChart3,
  Settings,
  Grid3x3,
  Upload,
  Music,
  Map,
  BookOpen,
  MessageCircle,
  Filter,
  Search,
  Code,
  ChevronRight,
} from "lucide-react"
// backend helpers imported dynamically inside the effect to avoid static resolution issues

// Enhanced Video Display Component
interface VideoDisplayProps {
  videoUrl: string
  title?: string
  onClose?: () => void
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

const VideoDisplay: React.FC<VideoDisplayProps> = ({ videoUrl, title = "Generated Tutorial Video", onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Always use absolute backend URL for video
  const absoluteVideoUrl = getBackendUrl(videoUrl)

  // Log when video URL changes
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
        // Show toast notification
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
      {/* Header */}
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

      {/* Video Container */}
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

        {/* Custom Controls Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-all duration-300 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {/* Progress Bar */}
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

      {/* Action Buttons */}
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

      {/* Video Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-violet-600/10 to-indigo-500/10 rounded-xl p-4 border border-violet-600/20 text-center backdrop-blur-sm">
          <div className="text-3xl mb-2">✨</div>
          <div className="text-sm text-white font-semibold">AI Generated</div>
          <div className="text-xs text-slate-400">Powered by WeaveIt</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20 text-center backdrop-blur-sm">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-sm text-white font-semibold">High Quality</div>
          <div className="text-xs text-gray-400">Professional output</div>
        </div>

        <div className="bg-gradient-to-br from-violet-600/10 to-indigo-500/10 rounded-xl p-4 border border-violet-600/20 text-center backdrop-blur-sm">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-sm text-white font-semibold">Fast Creation</div>
          <div className="text-xs text-slate-400">Generated in minutes</div>
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
        setError(`Insufficient credits. You need ${required} credits to generate ${generationType}. Current balance: ${currentPoints || 0}`)
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
            <span>Generate {generationType === "video" ? "Tutorial Video" : "Audio Narration"} ({generationType === "video" ? "2" : "1"} credits)</span>
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
        <WalletMultiButton style={{
          background: "linear-gradient(to right, rgb(124, 58, 202), rgb(79, 70, 229))",
          borderRadius: "0.75rem",
          fontWeight: "600",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          transition: "all 200ms",
          transform: "scale(1)",
        }} />
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
  const [currentVideo, setCurrentVideo] = useState<{ url: string; title: string } | null>(null)
  const [videos, setVideos] = useState<Array<{ id: string; title: string; url: string; createdAt: string }>>([])
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [points, setPoints] = useState<number | null>(null)
  const [trialExpiresAt, setTrialExpiresAt] = useState<string | null>(null)
  const [generationType, setGenerationType] = useState<"video" | "audio">("video")

  // Fetch user's videos and audio when wallet connects
  useEffect(() => {
    const fetchUserContent = async () => {
      if (!connected || !publicKey) {
        setVideos([])
        setPoints(null)
        setTrialExpiresAt(null)
        return
      }

      setLoadingVideos(true)
      try {
        const walletAddress = publicKey.toBase58()

        // Fetch content from centralized lib helper
        try {
          // @ts-ignore - dynamic import of local lib helper
          const backendModule = await import("../../lib/backend")
          const data = await backendModule.fetchUserContent(walletAddress)
          console.log("Fetched content:", data)

          const backendBaseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001").replace(/\/$/, "")

          // Transform backend response to match our content format
          const fetchedContent = (data?.content || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            url: `${backendBaseUrl}${item.url}`,
            createdAt: item.created_at,
            contentType: item.content_type,
          }))

          console.log("Transformed content:", fetchedContent)
          setVideos(fetchedContent)

          // Fetch points using centralized helper from same module
          try {
            const pointsData = await backendModule.fetchUserPoints(walletAddress)
            setPoints(typeof pointsData.points === 'number' ? pointsData.points : null)
            setTrialExpiresAt(pointsData.trial_expires_at || null)
          } catch (err) {
            console.debug('Failed to fetch points:', err)
            setPoints(null)
            setTrialExpiresAt(null)
          }
        } catch (err) {
          console.error("Failed to fetch content:", err)
          // Don't clear videos on error - user may have had content loaded before
          // Only set to empty if this is the initial load
        }
      } catch (error) {
        console.error("Error fetching content:", error)
      } finally {
        setLoadingVideos(false)
      }
    }

    fetchUserContent()
  }, [connected, publicKey])

  const handleConnect = () => {
    // Connection is handled by the wallet adapter
  }

  const handleDisconnect = () => {
    disconnect()
    setCurrentVideo(null)
  }

  const handleVideoGenerated = (videoUrl: string, title: string) => {
    console.log("Content generated with URL:", videoUrl)
    
    // Extract content ID from URL (works for both /api/videos/ and /api/audio/)
    const contentIdMatch = videoUrl.match(/\/api\/(?:videos|audio)\/([a-f0-9-]+)/i)
    const contentId = contentIdMatch ? contentIdMatch[1] : `local-${Date.now()}`
    
    const newContent = {
      id: contentId,
      title,
      url: videoUrl,
      createdAt: new Date().toISOString(),
    }
    
    // Avoid duplicates - check if content already exists
    setVideos((prev) => {
      const existingIndex = prev.findIndex(v => v.id === contentId)
      if (existingIndex >= 0) {
        // Update existing content
        const updated = [...prev]
        updated[existingIndex] = newContent
        return updated
      }
      // Add new content at the beginning
      return [newContent, ...prev]
    })
    
    setCurrentVideo({ url: videoUrl, title })
    console.log("Current content set to:", { url: videoUrl, title })
  }

  // File input ref for uploads
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    try {
      const form = new FormData()
      Array.from(files).forEach((f) => form.append('files', f))
      const resp = await fetch(getBackendUrl('/api/upload'), {
        method: 'POST',
        body: form,
      })
      if (!resp.ok) {
        console.error('Upload failed', resp.statusText)
        return
      }
      const data = await resp.json()
      // Expect backend to return { url, title }
      const uploaded = data[0] || data
      if (uploaded && uploaded.url) {
        handleVideoGenerated(uploaded.url, uploaded.title || 'Uploaded')
      }
    } catch (err) {
      console.error('Upload error', err)
    } finally {
      // reset input
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleImportRepo = async () => {
    const repoUrl = window.prompt('Enter repository URL to import (e.g. https://github.com/user/repo)')
    if (!repoUrl) return
    try {
      const resp = await fetch(getBackendUrl('/api/import-repo'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo: repoUrl }),
      })
      if (!resp.ok) {
        console.error('Import failed', await resp.text())
        return
      }
      const data = await resp.json()
      // If backend returns created content, open or add it
      if (data?.url) {
        handleVideoGenerated(data.url, data.title || 'Imported repo')
      } else {
        // Notify user import started
        console.log('Repository import started')
      }
    } catch (err) {
      console.error('Import error', err)
    }
  }

  // Show wallet connection if not connected
  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/30 shadow-2xl text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-violet-600/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-10 h-10 text-violet-300" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-8">
              Connect your Solana wallet to start creating AI-powered tutorial videos
            </p>
          </div>
          <WalletConnect onConnect={handleConnect} />
        </div>
      </div>
    )
  }

  // App View
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-900/70 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <button onClick={() => (window.location.href = '/')} className="text-sm text-slate-300 hover:text-white">← Back to Home</button>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-base font-semibold">WeaveIt Studio</div>
                <div className="text-xs text-slate-400">Create AI-powered tutorial videos...</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-sm text-slate-300 text-right">
                <div className="font-medium">{publicKey ? publicKey.toString().slice(0, 6) + '...' + publicKey.toString().slice(-4) : 'Not connected'}</div>
                <div className="text-xs text-slate-500">Wallet</div>
                <div className="text-xs text-slate-300 mt-1">
                  Credits: {points === null ? "—" : points}
                  {trialExpiresAt ? (
                    <span className="text-xs text-slate-400 block">Trial expires: {new Date(trialExpiresAt).toLocaleString()}</span>
                  ) : null}
                </div>
              </div>

              <button
                onClick={handleDisconnect}
                className="flex items-center space-x-2 px-2 py-1 rounded-md border border-slate-800 bg-slate-800/30 hover:bg-slate-800/50 text-sm"
              >
                <LogOut className="w-4 h-4 text-slate-200" />
                <span className="text-sm text-slate-200">Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} multiple />
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Sources */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold">Sources</h3>
                  <p className="text-xs text-slate-400">Add documents or repositories</p>
                </div>
                <button className="p-2 rounded-md bg-slate-800/40 hover:bg-slate-800/60">
                  <Plus className="w-4 h-4 text-slate-200" />
                </button>
              </div>

              <div className="space-y-3">
                <button onClick={handleUploadClick} className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-800 hover:bg-slate-800/60">
                  <span className="flex items-center space-x-2"><Upload className="w-4 h-4 text-slate-200"/><span className="text-sm">Upload documents</span></span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button onClick={handleImportRepo} className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-800 hover:bg-slate-800/60">
                  <span className="flex items-center space-x-2"><Code className="w-4 h-4 text-slate-200"/><span className="text-sm">Import repository</span></span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <div className="mt-4 text-xs text-slate-500">Your Content</div>
                <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                  {loadingVideos ? (
                    <div className="text-center py-6">
                      <div className="animate-spin h-8 w-8 rounded-full border-2 border-violet-500 border-t-transparent mx-auto mb-3"></div>
                      <div className="text-xs text-slate-400">Loading...</div>
                    </div>
                  ) : videos.length === 0 ? (
                    <div className="text-xs text-slate-500 py-6 text-center">No content yet</div>
                  ) : (
                    videos.map((v) => (
                      <div key={v.id} className="p-2 rounded-md hover:bg-slate-800/40 cursor-pointer" onClick={() => setCurrentVideo({ url: v.url, title: v.title })}>
                        <div className="text-sm font-medium truncate">{v.title || 'Untitled'}</div>
                        <div className="text-xs text-slate-500">{new Date(v.createdAt).toLocaleDateString()}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Center: Chat / Script / Studio */}
          <section className="col-span-12 lg:col-span-6">
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Studio</h2>
                  <p className="text-sm text-slate-400">Chat in the center, create in the studio</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-md bg-violet-600/90 text-sm">New</button>
                  <button className="px-3 py-1 rounded-md bg-slate-800/40 text-sm">History</button>
                </div>
              </div>

              {/* Chat / ScriptForm */}
              <div className="space-y-4">
                <ScriptForm
                  onVideoGenerated={handleVideoGenerated}
                  generationType={generationType}
                  setGenerationType={setGenerationType}
                  videosLength={videos.length}
                  hasCurrentVideo={!!currentVideo}
                  onImportRepo={handleImportRepo}
                  onUploadClick={handleUploadClick}
                  onCreditsUpdate={setPoints}
                  currentPoints={points}
                />

                {currentVideo && (
                  <div className="mt-2">
                    <VideoDisplay videoUrl={currentVideo.url} title={currentVideo.title} onClose={() => setCurrentVideo(null)} />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right: Tools / Studio Cards */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4 sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold">Studio</h4>
                  <div className="text-xs text-slate-500">Tools & integrations</div>
                </div>
                <button className="p-2 rounded-md bg-slate-800/40 hover:bg-slate-800/60"><Plus className="w-4 h-4"/></button>
              </div>

              <div className="space-y-3">
                {/* Generation Type moved here from ScriptForm */}
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-800">
                  <div className="mb-2">
                    <div className="text-sm font-medium">Generation Type</div>
                    <div className="text-xs text-slate-500">Choose Full Video or Audio Only</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGenerationType("video")}
                      className={`relative overflow-hidden py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                        generationType === "video"
                          ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-600/30"
                          : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50"
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span className="text-sm">Full Video</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setGenerationType("audio")}
                      className={`relative overflow-hidden py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                        generationType === "audio"
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                          : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50"
                      }`}
                    >
                      <Music className="w-4 h-4" />
                      <span className="text-sm">Audio Only</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
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
