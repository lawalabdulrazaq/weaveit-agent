"use client";

import { motion } from "framer-motion";

function MagneticFieldBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
      <svg className="w-full h-full" viewBox="0 0 800 1200" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Neon teal glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Gradient for mesh lines */}
          <linearGradient id="meshGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#0891b2" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
        
        {/* Funnel mesh grid - vertical lines */}
        {Array.from({ length: 15 }).map((_, i) => {
          const x = 100 + i * 50;
          const curvature = Math.abs(7 - i) * 15;
          
          return (
            <motion.path
              key={`v-${i}`}
              d={`M ${x} 0 Q ${x + curvature} 300 ${x} 600 Q ${x - curvature} 900 ${x} 1200`}
              stroke="url(#meshGradient)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                d: [
                  `M ${x} 0 Q ${x + curvature} 300 ${x} 600 Q ${x - curvature} 900 ${x} 1200`,
                  `M ${x} 0 Q ${x - curvature * 0.5} 300 ${x} 600 Q ${x + curvature * 0.5} 900 ${x} 1200`,
                  `M ${x} 0 Q ${x + curvature} 300 ${x} 600 Q ${x - curvature} 900 ${x} 1200`,
                ]
              }}
              transition={{ 
                pathLength: { duration: 2, delay: i * 0.1 },
                opacity: { duration: 1, delay: i * 0.1 },
                d: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.2 
                }
              }}
            />
          );
        })}
        
        {/* Funnel mesh grid - horizontal lines */}
        {Array.from({ length: 25 }).map((_, i) => {
          const y = i * 50;
          const compression = Math.sin((i / 25) * Math.PI) * 100;
          
          return (
            <motion.path
              key={`h-${i}`}
              d={`M ${200 - compression} ${y} Q 400 ${y} ${600 + compression} ${y}`}
              stroke="url(#meshGradient)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                d: [
                  `M ${200 - compression} ${y} Q 400 ${y} ${600 + compression} ${y}`,
                  `M ${200 - compression * 0.7} ${y} Q 400 ${y + 5} ${600 + compression * 0.7} ${y}`,
                  `M ${200 - compression} ${y} Q 400 ${y} ${600 + compression} ${y}`,
                ]
              }}
              transition={{ 
                pathLength: { duration: 2, delay: i * 0.05 },
                opacity: { duration: 1, delay: i * 0.05 },
                d: { 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.1 
                }
              }}
            />
          );
        })}
        
        {/* Center glow effect */}
        <motion.circle
          cx="400"
          cy="600"
          r="150"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3], 
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>
      
      {/* Soft neon overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-teal-500/10 to-cyan-500/5"></div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-20 bg-gray-900/50 overflow-hidden">
      {/* Animated Magnetic Field Background */}
      <MagneticFieldBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Roadmap</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A clear, outcome-driven roadmap that shows how WeaveIt is evolving from core automation to advanced intelligence and enterprise-level learning tools.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-weaveit-500 via-purple-500 to-pink-500 transform -translate-x-1/2"></div>

          <div className="space-y-24 lg:space-y-32">
            {/* Q4 2025 - LEFT */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
                <motion.div 
                  className="lg:pr-20"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="bg-gradient-to-br from-blue-500/15 to-blue-600/5 rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 shadow-lg">
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
                        <motion.div 
                          key={index} 
                          className="flex items-start space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <span className="text-blue-400 mt-1">•</span>
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Q4 Checkpoint - Completed */}
              <motion.div 
                className="hidden lg:block absolute left-1/2 top-12 transform -translate-x-1/2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[#0a0e17] shadow-xl hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Q1 2026 - RIGHT */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
                <div className="hidden lg:block"></div>
                <motion.div 
                  className="lg:pl-20"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="bg-gradient-to-br from-weaveit-500/15 to-weaveit-600/5 rounded-2xl p-8 border border-weaveit-500/30 hover:border-weaveit-500/50 transition-all duration-300 shadow-lg">
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
                        <motion.div 
                          key={index} 
                          className="flex items-start space-x-2 text-gray-300 hover:text-weaveit-400 transition-colors"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <span className="text-weaveit-400 mt-1">•</span>
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Q1 Checkpoint - In Progress */}
              <motion.div 
                className="hidden lg:block absolute left-1/2 top-12 transform -translate-x-1/2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="w-10 h-10 bg-weaveit-500 rounded-full border-4 border-[#0a0e17] shadow-xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Q2 2026 - LEFT */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
                <motion.div 
                  className="lg:pr-20"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="bg-gradient-to-br from-purple-500/15 to-purple-600/5 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 shadow-lg">
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
                        <motion.div 
                          key={index} 
                          className="flex items-start space-x-2 text-gray-300 hover:text-purple-400 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <span className="text-purple-400 mt-1">•</span>
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Q2 Checkpoint - Upcoming */}
              <motion.div 
                className="hidden lg:block absolute left-1/2 top-12 transform -translate-x-1/2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-full border-4 border-[#0a0e17] shadow-xl"></div>
                </div>
              </motion.div>
            </div>

            {/* Q3-Q4 2026 - RIGHT */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
                <div className="hidden lg:block"></div>
                <motion.div 
                  className="lg:pl-20"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="bg-gradient-to-br from-pink-500/15 to-pink-600/5 rounded-2xl p-8 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 shadow-lg">
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
                        <motion.div 
                          key={index} 
                          className="flex items-start space-x-2 text-gray-300 hover:text-pink-400 transition-colors"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <span className="text-pink-400 mt-1">•</span>
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Q3-Q4 Checkpoint - Future */}
              <motion.div 
                className="hidden lg:block absolute left-1/2 top-12 transform -translate-x-1/2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-full border-4 border-[#0a0e17] shadow-xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}