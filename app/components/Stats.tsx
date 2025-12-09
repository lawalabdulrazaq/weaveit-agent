"use client";

import {
  PlayCircle,
  Zap,
  TrendingUp,
  Globe2
} from "lucide-react";
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

export default function Stats() {
  const stats = [
    { 
      number: "10K+", 
      label: "Videos Created", 
      icon: PlayCircle,
      color: "from-blue-500 to-cyan-500",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
    },
    { 
      number: "5M+", 
      label: "Minutes Saved", 
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      iconBg: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20"
    },
    { 
      number: "98%", 
      label: "User Satisfaction", 
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      iconBg: "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
    },
    { 
      number: "50+", 
      label: "Languages Supported", 
      icon: Globe2,
      color: "from-purple-500 to-pink-500",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Orbital Rings Background */}
      <OrbitalRingsBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="text-center group"
            >
              {/* Icon container with gradient */}
              <motion.div
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 360,
                  transition: { duration: 0.6, type: "spring" }
                }}
                className="relative mx-auto mb-6"
                style={{ width: "80px", height: "80px" }}
              >
                {/* Outer glow ring */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl ${stat.iconBg} blur-xl`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                />
                
                {/* Icon background */}
                <div className={`relative w-20 h-20 ${stat.iconBg} rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm`}>
                  {/* Animated icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    <stat.icon className={`w-10 h-10 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} 
                      style={{ 
                        filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))',
                        stroke: 'url(#iconGradient)',
                        strokeWidth: 0.5
                      }}
                    />
                  </motion.div>
                </div>

                {/* Orbiting dots around icon */}
                {[0, 120, 240].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-weaveit-400 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    animate={{
                      x: [
                        Math.cos(angle * Math.PI / 180) * 45,
                        Math.cos((angle + 360) * Math.PI / 180) * 45,
                      ],
                      y: [
                        Math.sin(angle * Math.PI / 180) * 45,
                        Math.sin((angle + 360) * Math.PI / 180) * 45,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.3
                    }}
                  />
                ))}
              </motion.div>

              {/* Number with counter animation */}
              <motion.div
                className="text-5xl font-bold text-white mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <span className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  {stat.number}
                </span>
              </motion.div>

              {/* Label */}
              <motion.div
                className="text-gray-400 text-lg font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1 + 0.5
                }}
              >
                {stat.label}
              </motion.div>

              {/* Hover underline effect */}
              <motion.div
                className={`h-1 mx-auto mt-3 rounded-full bg-gradient-to-r ${stat.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}