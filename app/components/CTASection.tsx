"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

function OrbitalRingsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1200 600" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for rings */}
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.6)" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="orbitalGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Particle gradient */}
          <radialGradient id="particleGrad">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 1)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </radialGradient>
        </defs>

        {/* Central energy core */}
        <motion.circle
          cx="600"
          cy="300"
          r="20"
          fill="url(#particleGrad)"
          filter="url(#orbitalGlow)"
          animate={{
            r: [15, 25, 15],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Orbital rings - 3D perspective effect */}
        {[
          { rx: 150, ry: 50, duration: 12, delay: 0 },
          { rx: 250, ry: 80, duration: 18, delay: 1 },
          { rx: 350, ry: 110, duration: 24, delay: 2 },
          { rx: 450, ry: 140, duration: 30, delay: 3 },
        ].map((ring, i) => (
          <motion.g key={`ring-${i}`}>
            {/* Main ring */}
            <motion.ellipse
              cx="600"
              cy="300"
              rx={ring.rx}
              ry={ring.ry}
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="1.5"
              filter="url(#orbitalGlow)"
              opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                rotate: 360,
              }}
              transition={{
                pathLength: { duration: 2, delay: i * 0.3 },
                rotate: { 
                  duration: ring.duration, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: ring.delay
                }
              }}
              style={{ originX: "600px", originY: "300px" }}
            />

            {/* Orbiting particles on each ring */}
            <motion.circle
              r="5"
              fill="rgba(139, 92, 246, 0.9)"
              filter="url(#orbitalGlow)"
              animate={{
                cx: [
                  600 + ring.rx,
                  600,
                  600 - ring.rx,
                  600,
                  600 + ring.rx
                ],
                cy: [
                  300,
                  300 - ring.ry,
                  300,
                  300 + ring.ry,
                  300
                ]
              }}
              transition={{
                duration: ring.duration,
                repeat: Infinity,
                ease: "linear",
                delay: ring.delay
              }}
            />

            {/* Secondary particle (opposite side) */}
            <motion.circle
              r="4"
              fill="rgba(59, 130, 246, 0.7)"
              filter="url(#orbitalGlow)"
              animate={{
                cx: [
                  600 - ring.rx,
                  600,
                  600 + ring.rx,
                  600,
                  600 - ring.rx
                ],
                cy: [
                  300,
                  300 + ring.ry,
                  300,
                  300 - ring.ry,
                  300
                ]
              }}
              transition={{
                duration: ring.duration,
                repeat: Infinity,
                ease: "linear",
                delay: ring.delay
              }}
            />
          </motion.g>
        ))}

        {/* Energy streams connecting particles */}
        {[0, 120, 240].map((angle, i) => (
          <motion.line
            key={`stream-${i}`}
            x1="600"
            y1="300"
            x2={600 + Math.cos(angle * Math.PI / 180) * 500}
            y2={300 + Math.sin(angle * Math.PI / 180) * 150}
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="1"
            strokeDasharray="5,10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ 
              strokeDashoffset: -100,
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              strokeDashoffset: {
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }
            }}
          />
        ))}

        {/* Floating data nodes */}
        {[
          { x: 300, y: 150 },
          { x: 900, y: 180 },
          { x: 250, y: 450 },
          { x: 950, y: 420 }
        ].map((node, i) => (
          <motion.g key={`node-${i}`}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="rgba(139, 92, 246, 0.3)"
              filter="url(#orbitalGlow)"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill="rgba(139, 92, 246, 0.9)"
              animate={{
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-weaveit-500/5 to-transparent opacity-60"></div>
    </div>
  );
}

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-r from-weaveit-500/10 to-weaveit-600/10">
      {/* Orbital Rings Background */}
      <OrbitalRingsBackground />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2
            }}
            style={{ display: "inline-block" }}
          >
            Ready to Transform Your Content?
          </motion.span>
        </motion.h2>

        <motion.p 
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Join creators who are already using WeaveIt to create amazing tutorial videos
        </motion.p>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: 0.5,
            type: "spring",
            stiffness: 200
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/studio"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-5 h-5 mr-2 relative z-10" />
              </motion.div>
              <span className="relative z-10">Start Creating Now</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 ml-2 relative z-10" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating particles around button */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-weaveit-400 rounded-full"
            style={{
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: [
                0,
                Math.cos((i * 60) * Math.PI / 180) * 100,
                0
              ],
              y: [
                0,
                Math.sin((i * 60) * Math.PI / 180) * 100,
                0
              ],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
}