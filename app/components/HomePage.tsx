"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  Play,
  Pause,
  ArrowRight,
  Code,
  Video,
  Sparkles,
  Zap,
  FileText,
  Mic,
  Download,
  Star,
  Users,
  Clock,
  Globe,
  CheckCircle,
  ArrowDown,
  Volume2,
  VolumeX,
} from "lucide-react"
import Footer from "./Footer"
import Navbar from "./Navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a0e17] to-gray-900">
      {/* Navbar Section */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-weaveit-500/5 to-weaveit-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-12">
            {/* Top Section - Tags and Heading */}
            <div className="w-full text-center space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-weaveit-500/10 border border-weaveit-500/20 rounded-full text-weaveit-400 text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Generator
                </div>
                <h1 className="text-6xl lg:text-8xl font-bold text-white leading-tight">
                  Automating Technical
                  <span className="block bg-gradient-to-r from-weaveit-500 to-weaveit-600 bg-clip-text text-transparent">
                    Learning
                  </span>
                </h1>
                <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-semibold">
                  WeaveIt makes technical learning effortless by converting code and docs into AI-narrated video tutorials. Faster onboarding, clearer explanations, zero manual editing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/studio"
                  className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Zap className="w-5 h-5 mr-3" />
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Link>
                {/* <button
                  onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center px-10 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold text-lg rounded-xl border border-gray-700/50 hover:border-weaveit-500/50 transition-all duration-200 backdrop-blur-sm"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Demo
                </button> */}
              </div>

              {/* feature tags moved into studio card below; removed from top */}
            </div>

            {/* Bottom Section - Video Demo */}
            <div className="w-full">
              <div className="relative bg-gray-800/50 rounded-3xl p-8 backdrop-blur-sm border border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-weaveit-500/10 to-weaveit-600/10 rounded-3xl"></div>
                <div className="relative space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-weaveit-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">WeaveIt Studio</span>
                  </div>

                  {/* Feature tags: single straight line, larger font, placed at top of studio card */}
                  <div className="mt-4 flex items-center justify-center space-x-10 text-base md:text-lg text-gray-300">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-weaveit-400" />
                      <span className="font-medium">No video editing required</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-weaveit-400" />
                      <span className="font-medium">AI-powered narration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-weaveit-400" />
                      <span className="font-medium">Professional quality</span>
                    </div>
                  </div>

                    <div className="bg-gray-900/80 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Studio</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-weaveit-500 rounded-full animate-pulse"></div>
                          <span className="text-weaveit-400 text-xs">Ready</span>
                        </div>
                      </div>
                    <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                      {/* <Play className="w-12 h-12 text-weaveit-500" /> */}
                      <video
                      controls
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=400&width=600&text=Demo+Tutorial+Video"
                    >
                      <source src="/demo-video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Teach technical 
              <span className="block bg-gradient-to-r from-weaveit-500 to-weaveit-600 bg-clip-text text-transparent">
                 concepts efficiently
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              blending code comprehension, AI narration, and dynamic visuals to turn complex material into simple, engaging tutorials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Smart Code Analysis",
                description:
                  "AI automatically analyzes your code structure and creates logical explanations for each section.",
                gradient: "from-blue-500/10 to-purple-500/10",
                border: "border-blue-500/20",
                iconColor: "text-blue-400",
              },
              // {
              //   icon: Mic,
              //   title: "Natural AI Narration",
              //   description: "Generate human-like voiceovers that explain your code clearly and professionally.",
              //   gradient: "from-weaveit-500/10 to-weaveit-600/10",
              //   border: "border-weaveit-500/20",
              //   iconColor: "text-weaveit-400",
              // },
              {
                icon: Video,
                title: "Automatic Video Creation",
                description: "Generate human-like narration and automatically combine code slides, narration, and visuals into polished tutorial videos.",
                gradient: "from-weaveit-500/10 to-weaveit-600/10",
                border: "border-weaveit-500/20",
                iconColor: "text-weaveit-400",
              },
              // {
              //   icon: FileText,
              //   title: "Script to Slides",
              //   description: "Transform written explanations into visually appealing slides with syntax highlighting.",
              //   gradient: "from-orange-500/10 to-red-500/10",
              //   border: "border-orange-500/20",
              //   iconColor: "text-orange-400",
              // },
              // {
              //   icon: Zap,
              //   title: "Lightning Fast",
              //   description: "Generate professional videos in minutes, not hours. Perfect for rapid content creation.",
              //   gradient: "from-yellow-500/10 to-orange-500/10",
              //   border: "border-yellow-500/20",
              //   iconColor: "text-yellow-400",
              // },
              {
                icon: Download,
                title: "Multiple Formats",
                description:
                  "Export in various formats and resolutions. Perfect for YouTube, courses, or documentation.",
                gradient: "from-purple-500/10 to-pink-500/10",
                border: "border-purple-500/20",
                iconColor: "text-purple-400",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-2xl p-8 border ${feature.border} hover:border-opacity-60 transition-all duration-300 hover:transform hover:scale-105 group`}
              >
                <div
                  className={`w-16 h-16 ${feature.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Product Section */}
      <section id="product" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What WeaveIt Actually Delivers
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transforming complex technical content into clear, engaging learning experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {[
              {
                icon: Code,
                title: "Convert Content",
                description: "Code, docs, and scripts into AI-narrated tutorial videos",
                color: "text-blue-400",
                gradient: "from-blue-500/10 to-blue-600/10",
                border: "border-blue-500/20",
              },
              {
                icon: Sparkles,
                title: "Auto-Generate Explanations",
                description: "Clean, easy-to-understand technical explanations powered by AI",
                color: "text-weaveit-400",
                gradient: "from-weaveit-500/10 to-weaveit-600/10",
                border: "border-weaveit-500/20",
              },
              {
                icon: Users,
                title: "Speed Up Onboarding",
                description: "Accelerate learning for teams, dev communities, and creators",
                color: "text-purple-400",
                gradient: "from-purple-500/10 to-purple-600/10",
                border: "border-purple-500/20",
              },
              {
                icon: Video,
                title: "Scale Content Production",
                description: "Produce consistent, high-quality educational content at scale",
                color: "text-pink-400",
                gradient: "from-pink-500/10 to-pink-600/10",
                border: "border-pink-500/20",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-2xl p-8 border ${item.border} hover:border-opacity-60 transition-all duration-300 hover:transform hover:scale-105 group`}
              >
                <div className={`w-14 h-14 ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-full h-full" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-weaveit-500/10 to-weaveit-600/10 backdrop-blur-sm rounded-3xl p-12 border border-weaveit-500/20">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">Token Utility</h3>
              <p className="text-xl text-gray-400">Applies to $10 Tiers and Above</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-weaveit-500/30 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-weaveit-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-weaveit-500/30 transition-colors duration-300">
                    <Zap className="w-6 h-6 text-weaveit-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Discounted Purchases with Tokens</h4>
                    <p className="text-gray-300">
                      Anyone using the WeaveIt Token to pay for subscriptions at the $10 tier or above receives <span className="font-semibold text-weaveit-400">30% off</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-weaveit-500/30 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-weaveit-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-weaveit-500/30 transition-colors duration-300">
                    <Users className="w-6 h-6 text-weaveit-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Governance Participation</h4>
                    <p className="text-gray-300">
                      Token holders can vote on product features, suggest improvements, and influence the roadmap. Give users a <span className="font-semibold text-weaveit-400">direct voice</span> in shaping WeaveIt's future
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Purchase credits based on your needs. Each video generation costs credits depending on length and quality settings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Trial */}
            <div className="rounded-2xl p-6 bg-gray-900/60 border border-gray-800 flex flex-col justify-between">
              <div>
                <div className="text-sm text-weaveit-400 font-semibold mb-2">7-Day Free Trial</div>
                <div className="text-4xl font-bold mb-1">$0</div>
                <div className="text-sm text-gray-400 mb-4">All new users</div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm font-medium text-white">28 credits</div>
                  <div className="text-xs text-gray-400">4 credits/day</div>
                </div>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>4 credits per day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Documentation import</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Code → video generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Basic voice library</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  href="/studio"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white rounded-lg font-medium transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="rounded-2xl p-6 bg-gray-900/60 border border-gray-800 flex flex-col justify-between">
              <div>
                <div className="text-sm text-weaveit-400 font-semibold mb-2">Starter Plan</div>
                <div className="text-4xl font-bold mb-1">$5</div>
                <div className="text-sm text-gray-400 mb-4">Individuals & learners</div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm font-medium text-white">30 credits</div>
                  <div className="text-xs text-gray-400">per month</div>
                </div>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Generate 15 videos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Basic voices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>English generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Community support</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  href="/pricing"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700"
                >
                  Select Plan
                </Link>
              </div>
            </div>

            {/* Growth Plan */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-weaveit-500/15 to-weaveit-600/5 border border-weaveit-500/30 flex flex-col justify-between ring-1 ring-weaveit-500/20">
              <div>
                <div className="inline-block px-3 py-1 bg-weaveit-500/20 border border-weaveit-500/30 rounded-full text-weaveit-400 text-xs font-semibold mb-3">Most Popular</div>
                <div className="text-sm text-weaveit-400 font-semibold mb-2">Growth Plan</div>
                <div className="text-4xl font-bold mb-1">$10</div>
                <div className="text-sm text-gray-400 mb-4">Content creators</div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm font-medium text-white">80 credits</div>
                  <div className="text-xs text-gray-400">per month</div>
                </div>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Generate 40 videos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Premium voices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Multi-language support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Faster rendering</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  href="/pricing"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white rounded-lg font-medium transition-all"
                >
                  Select Plan
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="rounded-2xl p-6 bg-gray-900/60 border border-gray-800 flex flex-col justify-between">
              <div>
                <div className="text-sm text-weaveit-400 font-semibold mb-2">Pro Plan</div>
                <div className="text-4xl font-bold mb-1">$20</div>
                <div className="text-sm text-gray-400 mb-4">Professional creators</div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm font-medium text-white">150 credits</div>
                  <div className="text-xs text-gray-400">per month</div>
                </div>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Generate 75 videos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Full voice library</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>Regional dialects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                    <span>API early access</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  href="/pricing"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700"
                >
                  Select Plan
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Need a custom solution?</p>
            <Link
              href="/pricing"
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700"
            >
              View Enterprise Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted Partnerships</h2>
          </div>

          {/* Animated Carousel */}
          <style>{`
            @keyframes carousel-loop {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.333%); }
            }
            .carousel-container {
              animation: carousel-loop 12s linear infinite;
            }
            .carousel-container:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="relative overflow-hidden bg-gradient-to-r from-gray-900/20 via-transparent to-gray-900/20 rounded-3xl p-8 border border-gray-800/50">
            <div className="flex gap-8 carousel-container" style={{ width: '400%' }}>
              {/* Partner 1 - Solana */}
              <div className="flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-8 hover:border-blue-500/50 transition-all">
                <div className="w-48 h-48 flex items-center justify-center mb-6">
                  <img src="/partnerships/solana.svg" alt="Solana" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Solana</h3>
                <p className="text-sm text-gray-400 text-center">High-performance blockchain infrastructure</p>
              </div>

              {/* Partner 2 - Cyrene AI */}
              <div className="flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 p-8 hover:border-purple-500/50 transition-all">
                <div className="w-48 h-48 flex items-center justify-center mb-6">
                  <img src="/partnerships/cyrene-ai.svg" alt="Cyrene AI" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Cyrene AI</h3>
                <p className="text-sm text-gray-400 text-center">Fair launchpad for early-stage projects on Solana</p>
              </div>

              {/* Partner 3 - Dcodeblock */}
              <div className="flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 p-8 hover:border-cyan-500/50 transition-all">
                <div className="w-48 h-48 flex items-center justify-center mb-6">
                  <img src="/partnerships/dcodeblock.svg" alt="Dcodeblock" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Dcodeblock</h3>
                <p className="text-sm text-gray-400 text-center">Powering the Builder Economy</p>
              </div>

              {/* Duplicate Partner 1 for seamless loop - Solana */}
              <div className="flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-8 hover:border-blue-500/50 transition-all">
                <div className="w-48 h-48 flex items-center justify-center mb-6">
                  <img src="/partnerships/solana.svg" alt="Solana" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Solana</h3>
                <p className="text-sm text-gray-400 text-center">High-performance blockchain infrastructure</p>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-2 h-2 rounded-full bg-weaveit-500 opacity-100"></div>
              <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">Roadmap</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A clear, outcome-driven roadmap that shows how WeaveIt is evolving from core automation to advanced intelligence and enterprise-level learning tools.
            </p>
          </div>

          <div className="relative">
            {/* Central Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-weaveit-500 via-purple-500 to-pink-500 transform -translate-x-1/2"></div>

            <div className="space-y-24 lg:space-y-32">
              {/* Q4 2025 - LEFT */}
              <div className="relative">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
                  <div className="lg:pr-20">
                    <div className="bg-gradient-to-br from-blue-500/15 to-blue-600/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 shadow-lg">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Core Product Foundation</h3>
                          <p className="text-blue-400 text-sm font-semibold">Q4 2025 (Now)</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          "AI Video Engine",
                          "Wallet & Token Layer",
                          "Subscription System",
                          "One-Field Input Experience",
                          "Import & Workspace",
                          "Auto-Structure Engine",
                          "Multi-Mode Output",
                        ].map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                            <span className="text-blue-400 mt-1">•</span>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Q4 Checkpoint - Completed */}
                <div className="hidden lg:block absolute left-1/2 top-12 transform -translate-x-1/2">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[#0a0e17] shadow-xl hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Q1 2026 - RIGHT */}
              <div className="relative">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
                  <div className="hidden lg:block"></div>
                  <div className="lg:pl-20">
                    <div className="bg-gradient-to-br from-weaveit-500/15 to-weaveit-600/5 backdrop-blur-sm rounded-2xl p-8 border border-weaveit-500/30 hover:border-weaveit-500/50 transition-all duration-300 shadow-lg">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 bg-weaveit-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-weaveit-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Intelligence & Advanced Presentation</h3>
                          <p className="text-weaveit-400 text-sm font-semibold">Q1 2026</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          "Multi-Document Knowledge Base",
                          "Smart Summary Builder",
                          "Cross-Document Reasoning",
                          "Multi-Mode Output",
                          "Multi-Language AI Voices",
                          "Voice Cloning (Optional)",
                          "3D Visual Learning Effects",
                        ].map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2 text-gray-300 hover:text-weaveit-400 transition-colors">
                            <span className="text-weaveit-400 mt-1">•</span>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Q1 Checkpoint - In Progress */}
                <div className="hidden lg:block absolute left-1/2 top-12 transform -translate-x-1/2">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-weaveit-500 rounded-full border-4 border-[#0a0e17] shadow-xl animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Q2 2026 - LEFT */}
              <div className="relative">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
                  <div className="lg:pr-20">
                    <div className="bg-gradient-to-br from-purple-500/15 to-purple-600/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 shadow-lg">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Advanced Understanding & Enterprise</h3>
                          <p className="text-purple-400 text-sm font-semibold">Q2 2026</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          "Highlight → Explain",
                          "Codebase Mapping",
                          "Documentation Studio",
                          "Voice System",
                          "Public Beta Launch",
                        ].map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2 text-gray-300 hover:text-purple-400 transition-colors">
                            <span className="text-purple-400 mt-1">•</span>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Q2 Checkpoint - Upcoming */}
                <div className="hidden lg:block absolute left-1/2 top-12 transform -translate-x-1/2">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-600 rounded-full border-4 border-[#0a0e17] shadow-xl"></div>
                  </div>
                </div>
              </div>

              {/* Q3-Q4 2026 - RIGHT */}
              <div className="relative">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
                  <div className="hidden lg:block"></div>
                  <div className="lg:pl-20">
                    <div className="bg-gradient-to-br from-pink-500/15 to-pink-600/5 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 shadow-lg">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 bg-pink-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a6 6 0 00-9-5.666V9a4 4 0 11-8 0v.666A6 6 0 004 18v1h12z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Enterprise & Ecosystem Expansion</h3>
                          <p className="text-pink-400 text-sm font-semibold">Q3–Q4 2026 (Later)</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          "SDK & API Platform",
                          "Token Utility Expansion",
                          "Marketplace",
                        ].map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2 text-gray-300 hover:text-pink-400 transition-colors">
                            <span className="text-pink-400 mt-1">•</span>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Q3-Q4 Checkpoint - Future */}
                <div className="hidden lg:block absolute left-1/2 top-12 transform -translate-x-1/2">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-700 rounded-full border-4 border-[#0a0e17] shadow-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">The strength of WeaveIt comes from a team that has actually built, shipped, and lived inside developer ecosystems.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Founder 1 */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-8 border border-gray-700/40">
              <div className="flex items-start space-x-6">
                <div className="w-36 h-36 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-gray-700/50">
                  <img src="/team/lawal.jpg" alt="Lawal Abdulrazaq" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Lawal Abdulrazaq — Founder</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <a href="https://x.com/loganthewise" target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-300 hover:text-weaveit-400">
                      {/* X logo */}
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23 3.01c-.8.35-1.66.6-2.56.7.92-.55 1.63-1.42 1.96-2.46-.86.51-1.8.88-2.8 1.08A4.5 4.5 0 0012 7.5v.57A12.8 12.8 0 013 5.15a4.48 4.48 0 001.39 6 4.41 4.41 0 01-2.04-.56v.06a4.5 4.5 0 003.6 4.4c-.52.14-1.06.17-1.6.06.45 1.4 1.75 2.42 3.3 2.45A9.03 9.03 0 012 19.54a12.73 12.73 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83v-.58A9.2 9.2 0 0023 3.01z"/></svg>
                      <span className="text-sm">@loganthewise</span>
                    </a>
                    <a href="https://dev-logan-portfolio.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-300 hover:text-weaveit-400">
                      <Globe className="w-4 h-4 mr-2" />
                      <span className="text-sm">Portfolio</span>
                    </a>
                  </div>
                  <p className="text-gray-300 mt-3">A full-stack engineer and AI builder with experience creating developer tools, leading tech bootcamps, and building production-ready systems. Passionate about making technical learning faster and more accessible.</p>
                </div>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-8 border border-gray-700/40">
              <div className="flex items-start space-x-6">
                <div className="w-36 h-36 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-gray-700/50">
                  <img src="/team/orkar.jpg" alt="Orkar A. Melch. Fabian" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Orkar Fabian —  Co-Founder</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <a href="https://x.com/OfficialBenFab1" target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-300 hover:text-weaveit-400">
                      {/* X logo */}
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23 3.01c-.8.35-1.66.6-2.56.7.92-.55 1.63-1.42 1.96-2.46-.86.51-1.8.88-2.8 1.08A4.5 4.5 0 0012 7.5v.57A12.8 12.8 0 013 5.15a4.48 4.48 0 001.39 6 4.41 4.41 0 01-2.04-.56v.06a4.5 4.5 0 003.6 4.4c-.52.14-1.06.17-1.6.06.45 1.4 1.75 2.42 3.3 2.45A9.03 9.03 0 012 19.54a12.73 12.73 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83v-.58A9.2 9.2 0 0023 3.01z"/></svg>
                      <span className="text-sm">@OfficialBenFab1</span>
                    </a>
                    <a href="https://dev-orkarfabian.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-300 hover:text-weaveit-400">
                      <Globe className="w-4 h-4 mr-2" />
                      <span className="text-sm">Portfolio</span>
                    </a>
                  </div>
                  <p className="text-gray-300 mt-3">Software engineer and systems architect focused on scalable products and developer experience. Experienced in building API-driven platforms and engineering workflows from the ground up.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Videos Created", icon: Video },
              { number: "5M+", label: "Minutes Saved", icon: Clock },
              { number: "98%", label: "User Satisfaction", icon: Star },
              { number: "50+", label: "Languages Supported", icon: Users },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-weaveit-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-weaveit-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-weaveit-500/10 to-weaveit-600/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Content?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join creators who are already using WeaveIt to create amazing tutorial videos
          </p>
          <div className="flex justify-center">
            <Link
              href="/studio"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Creating Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
