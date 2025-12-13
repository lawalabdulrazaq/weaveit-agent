"use client";

import { motion } from "framer-motion";
import { Code, Video, Download } from "lucide-react";

function ParticleNetworkBackground() {
  // Generate random particle positions
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Glow effect for particles */}
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Gradient for connections */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.3)" />
          </linearGradient>
        </defs>

        {/* Connection lines between nearby particles */}
        {particles.map((p1, i) => 
          particles.slice(i + 1).map((p2, j) => {
            const distance = Math.sqrt(
              Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
            );
            
            // Only draw lines between nearby particles
            if (distance < 25) {
              return (
                <motion.line
                  key={`line-${i}-${j}`}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: (i + j) * 0.2,
                    ease: "easeInOut"
                  }}
                />
              );
            }
            return null;
          })
        )}

        {/* Animated particles */}
        {particles.map((particle) => (
          <motion.g key={particle.id}>
            {/* Particle glow */}
            <motion.circle
              cx={`${particle.x}%`}
              cy={`${particle.y}%`}
              r={particle.size * 2}
              fill="rgba(139, 92, 246, 0.2)"
              filter="url(#particleGlow)"
              animate={{
                cx: [
                  `${particle.x}%`,
                  `${(particle.x + 5) % 100}%`,
                  `${(particle.x - 3) % 100}%`,
                  `${particle.x}%`
                ],
                cy: [
                  `${particle.y}%`,
                  `${(particle.y - 4) % 100}%`,
                  `${(particle.y + 6) % 100}%`,
                  `${particle.y}%`
                ],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
            
            {/* Core particle */}
            <motion.circle
              cx={`${particle.x}%`}
              cy={`${particle.y}%`}
              r={particle.size}
              fill="rgba(139, 92, 246, 0.8)"
              animate={{
                cx: [
                  `${particle.x}%`,
                  `${(particle.x + 5) % 100}%`,
                  `${(particle.x - 3) % 100}%`,
                  `${particle.x}%`
                ],
                cy: [
                  `${particle.y}%`,
                  `${(particle.y - 4) % 100}%`,
                  `${(particle.y + 6) % 100}%`,
                  `${particle.y}%`
                ],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}

        {/* Floating data streams */}
        {[...Array(4)].map((_, i) => (
          <motion.path
            key={`stream-${i}`}
            d={`M ${20 + i * 25} 0 Q ${30 + i * 25} 50 ${20 + i * 25} 100`}
            stroke="rgba(59, 130, 246, 0.15)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -100 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          />
        ))}
      </svg>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-weaveit-500/5 to-transparent opacity-60"></div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-20 bg-gray-900 overflow-hidden"
    >
      {/* Particle Network Background */}
      <ParticleNetworkBackground />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Teach technical{" "}
            <span className="block bg-gradient-to-r from-weaveit-500 to-weaveit-600 bg-clip-text text-transparent">
              concepts efficiently
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            blending code comprehension, AI narration, and dynamic visuals to
            turn complex material into simple, engaging tutorials.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Code,
              title: "Smart Code Analysis",
              description:
                "AI automatically analyzes your code structure and creates logical explanations for each section.",
              iconColor: "text-blue-400",
              delay: 0.1,
            },
            {
              icon: Video,
              title: "Automatic Video Creation",
              description:
                "Generate human-like narration and combine code slides, narration, and visuals into tutorials.",
              iconColor: "text-weaveit-400",
              delay: 0.2,
            },
            {
              icon: Download,
              title: "Multiple Formats",
              description:
                "Export in various formats and resolutions. Perfect for YouTube, courses, or documentation.",
              iconColor: "text-purple-400",
              delay: 0.3,
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: f.delay }}
              whileHover={{ 
                scale: 1.04,
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/60 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 
              rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(139,92,246,0.2)]
              hover:shadow-[0_0_60px_-5px_rgba(139,92,246,0.4)]
              hover:border-weaveit-500/30
              transition-all duration-300"
            >
              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
              
              <motion.div 
                className={`w-16 h-16 mb-6 ${f.iconColor}`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <f.icon className="w-full h-full" />
              </motion.div>

              <h3 className="text-xl font-semibold text-white mb-4 relative">
                {f.title}
              </h3>
              <p className="text-gray-300 leading-relaxed relative">
                {f.description}
              </p>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)"
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}