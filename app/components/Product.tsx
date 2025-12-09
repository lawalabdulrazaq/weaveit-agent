"use client";

import {
  Code,
  Video,
  Sparkles,
  Zap,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { ThunderIcon } from "@/components/icons/ThunderIcon";
import { PeepIcon } from "@/components/icons/PeepIcon";

function HexagonalMeshBackground() {
  // Generate hexagonal grid positions
  const hexSize = 80;
  const rows = 12;
  const cols = 15;
  const hexagons = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexSize * 1.5;
      const y = row * hexSize * Math.sqrt(3) + (col % 2 ? hexSize * Math.sqrt(3) / 2 : 0);
      hexagons.push({ 
        id: `hex-${row}-${col}`, 
        x, 
        y, 
        delay: (row + col) * 0.05,
        duration: 3 + Math.random() * 2
      });
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1200 1000" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for hexagons */}
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6"/>
          </linearGradient>

          {/* Glow filter */}
          <filter id="hexGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Hexagon path definition */}
          <path
            id="hexagon"
            d="M 30,0 L 60,17.32 L 60,51.96 L 30,69.28 L 0,51.96 L 0,17.32 Z"
          />
        </defs>

        {/* Render hexagons */}
        {hexagons.map((hex, index) => (
          <motion.use
            key={hex.id}
            href="#hexagon"
            x={hex.x}
            y={hex.y}
            stroke="url(#hexGradient)"
            strokeWidth="1"
            fill="none"
            filter="url(#hexGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0.5, 0.8],
              scale: [0.8, 1, 0.9, 1],
            }}
            transition={{
              duration: hex.duration,
              repeat: Infinity,
              delay: hex.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Flowing energy lines through hexagons */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={`flow-${i}`}
            d={`M ${i * 250} 0 Q ${i * 250 + 100} 500 ${i * 250} 1000`}
            stroke="rgba(139, 92, 246, 0.3)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,20"
            filter="url(#hexGlow)"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={{ 
              strokeDashoffset: 200,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              strokeDashoffset: {
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }
            }}
          />
        ))}

        {/* Pulsing center highlight */}
        <motion.circle
          cx="600"
          cy="500"
          r="200"
          fill="none"
          stroke="rgba(139, 92, 246, 0.4)"
          strokeWidth="2"
          filter="url(#hexGlow)"
          animate={{
            r: [180, 220, 180],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-weaveit-500/5 via-transparent to-blue-500/5"></div>
    </div>
  );
}

export default function Products() {
  return (
    <section id="product" className="relative py-20 overflow-hidden">
      {/* Hexagonal Mesh Background */}
      <HexagonalMeshBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            What WeaveIt Actually Delivers
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transforming complex technical content into clear, engaging learning experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {[
            {
              icon: Code,
              title: "Convert Content",
              description: "Code, docs, and scripts into AI-narrated tutorial videos",
              color: "text-blue-400",
              gradient: "from-blue-500/10 to-blue-600/10",
              border: "border-blue-500/20",
              delay: 0.1,
            },
            {
              icon: Sparkles,
              title: "Auto-Generate Explanations",
              description: "Clean, easy-to-understand technical explanations powered by AI",
              color: "text-weaveit-400",
              gradient: "from-weaveit-500/10 to-weaveit-600/10",
              border: "border-weaveit-500/20",
              delay: 0.2,
            },
            {
              icon: Users,
              title: "Speed Up Onboarding",
              description: "Accelerate learning for teams, dev communities, and creators",
              color: "text-purple-400",
              gradient: "from-purple-500/10 to-purple-600/10",
              border: "border-purple-500/20",
              delay: 0.3,
            },
            {
              icon: Video,
              title: "Scale Content Production",
              description: "Produce consistent, high-quality educational content at scale",
              color: "text-pink-400",
              gradient: "from-pink-500/10 to-pink-600/10",
              border: "border-pink-500/20",
              delay: 0.4,
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: item.delay }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className={`bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-2xl p-8 border ${item.border} hover:border-opacity-100 transition-all duration-300 group cursor-pointer`}
            >
              <motion.div 
                className={`w-14 h-14 ${item.color} mb-6`}
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6 }}
              >
                <item.icon className="w-full h-full" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed text-lg">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-gradient-to-r from-weaveit-500/10 to-weaveit-600/10 backdrop-blur-sm rounded-3xl p-12 border border-weaveit-500/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-8">
            <motion.h3 
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Token Utility
            </motion.h3>
            <motion.p 
              className="text-xl text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Applies to $10 Tiers and Above
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: ThunderIcon,
                title: "Discounted Purchases with Tokens",
                description: "Anyone using the WeaveIt Token to pay for subscriptions at the $10 tier or above receives",
                highlight: "30% off",
                delay: 0.5,
              },
              {
                icon: PeepIcon,
                title: "Governance Participation",
                description: "Token holders can vote on product features, suggest improvements, and influence the roadmap. Give users a",
                highlight: "direct voice",
                highlightEnd: " in shaping WeaveIt's future",
                delay: 0.6,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-weaveit-500/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <motion.div 
                    className="w-12 h-12 bg-weaveit-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-weaveit-500/30 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-weaveit-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-300">
                      {item.description} <span className="font-semibold text-weaveit-400">{item.highlight}</span>
                      {item.highlightEnd}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}