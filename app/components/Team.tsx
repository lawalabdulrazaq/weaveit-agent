"use client";

import { Globe } from "lucide-react";
import { motion } from "framer-motion";

function RadarScanBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1000 800" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radar gradient */}
          <radialGradient id="radarGradient">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.8)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </radialGradient>

          {/* Sweep gradient */}
          <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="radarGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Concentric radar circles */}
        {[150, 250, 350, 450].map((radius, i) => (
          <motion.circle
            key={`circle-${i}`}
            cx="500"
            cy="400"
            r={radius}
            fill="none"
            stroke="rgba(139, 92, 246, 0.3)"
            strokeWidth="1"
            filter="url(#radarGlow)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.6, 0.3],
              scale: [0.8, 1, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Rotating radar sweep line */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ originX: "500px", originY: "400px" }}
        >
          <line
            x1="500"
            y1="400"
            x2="500"
            y2="0"
            stroke="url(#sweepGradient)"
            strokeWidth="2"
            filter="url(#radarGlow)"
          />
          <circle
            cx="500"
            cy="400"
            r="8"
            fill="rgba(139, 92, 246, 0.8)"
            filter="url(#radarGlow)"
          />
        </motion.g>

        {/* Scanning blips/dots */}
        {[
          { x: 380, y: 280, delay: 0 },
          { x: 620, y: 350, delay: 1 },
          { x: 450, y: 520, delay: 2 },
          { x: 580, y: 480, delay: 3 },
          { x: 420, y: 420, delay: 4 },
        ].map((blip, i) => (
          <motion.g key={`blip-${i}`}>
            {/* Blip pulse rings */}
            <motion.circle
              cx={blip.x}
              cy={blip.y}
              r="0"
              fill="none"
              stroke="rgba(139, 92, 246, 0.6)"
              strokeWidth="2"
              animate={{
                r: [0, 30],
                opacity: [1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: blip.delay,
                ease: "easeOut"
              }}
            />
            {/* Blip core */}
            <motion.circle
              cx={blip.x}
              cy={blip.y}
              r="4"
              fill="rgba(139, 92, 246, 0.9)"
              filter="url(#radarGlow)"
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: blip.delay,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}

        {/* Grid lines */}
        <line x1="500" y1="0" x2="500" y2="800" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
        <line x1="0" y1="400" x2="1000" y2="400" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />

        {/* Corner markers */}
        {[
          { x: 100, y: 100 },
          { x: 900, y: 100 },
          { x: 100, y: 700 },
          { x: 900, y: 700 }
        ].map((corner, i) => (
          <motion.g key={`corner-${i}`}>
            <line x1={corner.x - 10} y1={corner.y} x2={corner.x + 10} y2={corner.y} stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" />
            <line x1={corner.x} y1={corner.y - 10} x2={corner.x} y2={corner.y + 10} stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" />
            <motion.circle
              cx={corner.x}
              cy={corner.y}
              r="15"
              fill="none"
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="1"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-weaveit-500/5 via-transparent to-blue-500/5"></div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative py-20 bg-gray-900/50 overflow-hidden">
      {/* Radar Scan Background */}
      <RadarScanBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Team
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            The strength of WeaveIt comes from a team that has actually built, shipped, and lived inside developer ecosystems.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Founder 1 */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2 
            }}
            whileHover={{ 
              scale: 1.02,
              y: -10,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-8 border border-gray-700/50 hover:border-weaveit-500/40 transition-all duration-300 backdrop-blur-sm"
            style={{ perspective: "1000px" }}
          >
            <div className="flex items-start space-x-6">
              <motion.div 
                className="w-36 h-36 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-gray-700/50 relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src="/logan.jpg" alt="Lawal Abdulrazaq" className="w-full h-full object-cover" />
                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-weaveit-500/30 to-transparent"
                  initial={{ y: "-100%" }}
                  animate={{ y: "200%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2
                  }}
                />
              </motion.div>
              <div>
                <motion.h3 
                  className="text-2xl font-semibold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Lawal Abdulrazaq, Founder
                </motion.h3>
                <motion.div 
                  className="flex items-center space-x-3 mt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <motion.a 
                    href="https://x.com/loganthewise" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center text-gray-300 hover:text-weaveit-400 transition-colors"
                    whileHover={{ scale: 1.1, x: 5 }}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23 3.01c-.8.35-1.66.6-2.56.7.92-.55 1.63-1.42 1.96-2.46-.86.51-1.8.88-2.8 1.08A4.5 4.5 0 0012 7.5v.57A12.8 12.8 0 013 5.15a4.48 4.48 0 001.39 6 4.41 4.41 0 01-2.04-.56v.06a4.5 4.5 0 003.6 4.4c-.52.14-1.06.17-1.6.06.45 1.4 1.75 2.42 3.3 2.45A9.03 9.03 0 012 19.54a12.73 12.73 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83v-.58A9.2 9.2 0 0023 3.01z"/></svg>
                    <span className="text-sm">@loganthewise</span>
                  </motion.a>
                  <motion.a 
                    href="https://dev-logan-portfolio.vercel.app/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center text-gray-300 hover:text-weaveit-400 transition-colors"
                    whileHover={{ scale: 1.1, x: 5 }}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="text-sm">Portfolio</span>
                  </motion.a>
                </motion.div>
                <motion.p 
                  className="text-gray-300 mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  A full-stack engineer and AI builder with experience creating developer tools, leading tech bootcamps, and building production-ready systems. Passionate about making technical learning faster and more accessible.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Founder 2 */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.4 
            }}
            whileHover={{ 
              scale: 1.02,
              y: -10,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-8 border border-gray-700/50 hover:border-weaveit-500/40 transition-all duration-300 backdrop-blur-sm"
            style={{ perspective: "1000px" }}
          >
            <div className="flex items-start space-x-6">
              <motion.div 
                className="w-36 h-36 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-gray-700/50 relative"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src="/orkar.jpg" alt="Orkar A. Melch. Fabian" className="w-full h-full object-cover" />
                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-weaveit-500/30 to-transparent"
                  initial={{ y: "-100%" }}
                  animate={{ y: "200%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2,
                    delay: 1.5
                  }}
                />
              </motion.div>
              <div>
                <motion.h3 
                  className="text-2xl font-semibold text-white"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Orkar Fabian, Co-Founder
                </motion.h3>
                <motion.div 
                  className="flex items-center space-x-3 mt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <motion.a 
                    href="https://x.com/OfficialBenFab1" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center text-gray-300 hover:text-weaveit-400 transition-colors"
                    whileHover={{ scale: 1.1, x: 5 }}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23 3.01c-.8.35-1.66.6-2.56.7.92-.55 1.63-1.42 1.96-2.46-.86.51-1.8.88-2.8 1.08A4.5 4.5 0 0012 7.5v.57A12.8 12.8 0 013 5.15a4.48 4.48 0 001.39 6 4.41 4.41 0 01-2.04-.56v.06a4.5 4.5 0 003.6 4.4c-.52.14-1.06.17-1.6.06.45 1.4 1.75 2.42 3.3 2.45A9.03 9.03 0 012 19.54a12.73 12.73 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83v-.58A9.2 9.2 0 0023 3.01z"/></svg>
                    <span className="text-sm">@OfficialBenFab1</span>
                  </motion.a>
                  <motion.a 
                    href="https://dev-orkarfabian.vercel.app/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center text-gray-300 hover:text-weaveit-400 transition-colors"
                    whileHover={{ scale: 1.1, x: 5 }}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="text-sm">Portfolio</span>
                  </motion.a>
                </motion.div>
                <motion.p 
                  className="text-gray-300 mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Software engineer and systems architect focused on scalable products and developer experience. Experienced in building API-driven platforms and engineering workflows from the ground up.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}