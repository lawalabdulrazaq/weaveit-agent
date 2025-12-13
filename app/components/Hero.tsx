"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle
} from "lucide-react";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function GridBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const gridSize = 50;
  const gridCols = Math.ceil(typeof window !== 'undefined' ? window.innerWidth / gridSize : 20);
  const gridRows = Math.ceil(typeof window !== 'undefined' ? window.innerHeight / gridSize : 20);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <svg className="w-full h-full">
        <defs>
          <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Interactive ripple effect circles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            r={150 - i * 30}
            fill="none"
            stroke={`rgba(139, 92, 246, ${0.3 - i * 0.05})`}
            strokeWidth="2"
            cx={smoothMouseX}
            cy={smoothMouseY}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">

      {/* ==== DIGITAL GRID BACKGROUND + GRADIENT ==== */}
      <div className="absolute inset-0">
        <GridBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-weaveit-500/10 via-transparent to-weaveit-600/10"></div>
      </div>

      {/* ==== CONTENT ==== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-12">

          {/* Top Section */}
          <motion.div 
            className="w-full text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <motion.div 
                className="inline-flex items-center px-4 py-2 bg-weaveit-500/10 border border-weaveit-500/20 rounded-full text-weaveit-400 text-sm font-medium"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Generator
              </motion.div>

              <motion.h1 
                className="text-6xl lg:text-8xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Simplifying Technical
                <span className="block bg-gradient-to-r from-weaveit-500 to-weaveit-600 bg-clip-text text-transparent">
                  Learning
                </span>
              </motion.h1>

              <motion.p 
                className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                AI-narrated video tutorials, faster onboarding, clearer explanations, zero manual editing.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/studio"
                  className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <img src="/icons/thund.svg" alt="Start Icon" className="w-7 h-7" />
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Section - Video Demo */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 rounded-3xl p-8 border border-gray-600/30 shadow-2xl">
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-weaveit-500/15 via-transparent to-weaveit-600/10 rounded-3xl"></div>
              
              <div className="relative space-y-6">
                
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 bg-red-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-yellow-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-weaveit-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                  <span className="text-gray-400 text-sm ml-4">WeaveIt Studio</span>
                </div>

                <motion.div 
                  className="mt-4 flex items-center justify-center space-x-10 text-base md:text-lg text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
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
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-xl p-4 border border-gray-700/40 shadow-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  {/* Inner glass shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none"></div>
                  
                  <div className="relative flex items-center justify-between mb-3">
                    <span className="text-white font-medium">Studio</span>
                    <div className="flex items-center space-x-2">
                      <motion.div 
                        className="w-2 h-2 bg-weaveit-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-weaveit-400 text-xs">Ready</span>
                    </div>
                  </div>

                  <div className="aspect-video flex items-center justify-center overflow-hidden rounded-lg">
                    <video
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    >
                      <source src="/demo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                </motion.div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}