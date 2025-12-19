"use client"

import { useState, useEffect, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Home } from "lucide-react"

function ThunderIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <img
      src="/thund.svg"
      alt="Thunder"
      className={className}
      style={{ display: "inline-block" }}
    />
  )
}
function HomeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <img
      src="/home.png"
      alt="Home"
      className={className}
      style={{ display: "inline-block" }}
    />
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isNavigatingToStudio, setIsNavigatingToStudio] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Only prefetch home page, NOT studio (to avoid triggering API calls)
  useEffect(() => {
    router.prefetch("/")
  }, [router])

  // Reset navigation state when pathname changes
  useEffect(() => {
    setIsNavigatingToStudio(false)
  }, [pathname])

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false)
    startTransition(() => {
      router.push(href)
    })
  }

  const handleStudioNavigation = () => {
    setIsMenuOpen(false)
    setIsNavigatingToStudio(true)
    startTransition(() => {
      router.push("/studio")
    })
  }

  const isHomePage = pathname === "/"
  const isAppPage = pathname === "/studio"

  return (
    <>
      <nav className="bg-[#0a0e17]/95 backdrop-blur-xl fixed w-full z-50 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              onClick={() => handleNavigation("/")}
              onMouseEnter={() => router.prefetch("/")}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-110"
                    src="/assets/WeavLog.png"
                    alt="WeaveIt Logo"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-weaveit-500/20 to-weaveit-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-weaveit-500 to-weaveit-600 bg-clip-text text-transparent">
                    WeaveIt
                  </h1>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <button
                  onClick={() => handleNavigation("/")}
                  onMouseEnter={() => router.prefetch("/")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isHomePage
                      ? "text-weaveit-500 bg-weaveit-500/10 border border-weaveit-500/20"
                      : "text-gray-300 hover:text-weaveit-500 hover:bg-weaveit-500/5"
                  }`}
                >
                  <HomeIcon className="w-7 h-7 inline mr-2" />
                  Home
                </button>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-weaveit-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="#product"
                  className="text-gray-300 hover:text-weaveit-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Product
                </a>
                <a
                  href="#roadmap"
                  className="text-gray-300 hover:text-weaveit-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Roadmap
                </a>
                <a
                  href="#pricing"
                  className="text-gray-300 hover:text-weaveit-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Pricing
                </a>
                <button
                  onClick={handleStudioNavigation}
                  disabled={isPending || isNavigatingToStudio}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    isAppPage
                      ? "bg-weaveit-600 text-white"
                      : "bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white transform hover:scale-105"
                  } ${isPending || isNavigatingToStudio ? "opacity-70 cursor-wait" : ""}`}
                >
                  <ThunderIcon className="w-4 h-4" />
                  <span>{isNavigatingToStudio ? "Loading..." : "Launch Studio"}</span>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-weaveit-500 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */} 
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0a0e17]/98 backdrop-blur-xl border-t border-gray-800/50">
            <button
              onClick={() => handleNavigation("/")}
              onMouseEnter={() => router.prefetch("/")}
              className={`w-full text-left block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                isHomePage
                  ? "text-weaveit-500 bg-weaveit-500/10"
                  : "text-white hover:text-weaveit-500 hover:bg-gray-800/50"
              }`}
            >
              <HomeIcon className="w-7 h-7 inline mr-2" />
              Home
            </button>
            <a
              href="#features"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#product"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Product
            </a>
            <a
              href="#roadmap"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Roadmap
            </a>
            <button
              onClick={handleStudioNavigation}
              disabled={isPending || isNavigatingToStudio}
              className={`w-full text-left bg-gradient-to-r from-weaveit-500 to-weaveit-600 text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 mt-4 ${
                isPending || isNavigatingToStudio ? "opacity-70 cursor-wait" : ""
              }`}
            >
              <ThunderIcon className="w-4 h-4 inline mr-2" />
              {isNavigatingToStudio ? "Loading..." : "Launch Studio"}
            </button>
            <button
              onClick={() => handleNavigation("/pricing")}
              onMouseEnter={() => router.prefetch("/pricing")}
              className="w-full text-left text-gray-300 hover:text-white hover:bg-gray-800/50 block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200"
            >
              Pricing
            </button>
          </div>
        </div>
      </nav>

      {/* Loading Overlay for Studio Navigation */}
      {isNavigatingToStudio && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-[#0a0e17]/95 border border-weaveit-500/30 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-weaveit-500/30 border-t-weaveit-500 rounded-full animate-spin"></div>
                <ThunderIcon className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-lg">Launching Studio</p>
                <p className="text-gray-400 text-sm mt-1">Preparing your workspace...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}