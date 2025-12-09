"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

function FloatingDotsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="rgba(139, 92, 246, 0.4)" />
          </pattern>
          
          <linearGradient id="dotFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
          </linearGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#dots)" />
        
        {/* Animated circles */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            r={i % 2 === 0 ? 100 : 150}
            fill="none"
            stroke="url(#dotFade)"
            strokeWidth="1"
            initial={{ 
              cx: `${20 + i * 12}%`, 
              cy: `${30 + (i % 3) * 20}%`,
              opacity: 0 
            }}
            animate={{ 
              cx: [`${20 + i * 12}%`, `${25 + i * 12}%`, `${20 + i * 12}%`],
              cy: [`${30 + (i % 3) * 20}%`, `${35 + (i % 3) * 20}%`, `${30 + (i % 3) * 20}%`],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 overflow-hidden">
      {/* Minimal Floating Dots Background */}
      <FloatingDotsBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 overflow-hidden">
            <motion.h2
                className="text-4xl md:text-6xl font-bold text-white mb-4 relative overflow-hidden"
            >
                <motion.span
                    className="block"
                    initial={{ y: "100%" }}       // start below
                    whileInView={{ y: "0%" }}     // slide up to normal
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    Simple, Transparent Pricing
                </motion.span>
            </motion.h2>
            <motion.p 
                className="text-xl text-gray-400 max-w-3xl mx-auto"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3
                }}
            >
                <motion.span
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                whileInView={{ clipPath: "inset(0 0 0 0%)" }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 1, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.5
                }}
                style={{ display: "inline-block" }}
                >
                Purchase credits based on your needs. Each video generation costs credits depending on length and quality settings.
                </motion.span>
            </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Free Trial */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="rounded-2xl p-6 bg-gray-900/60 border border-gray-800 flex flex-col justify-between h-full hover:border-gray-700 transition-all">
              <div>
                <div className="text-sm text-weaveit-400 font-semibold mb-2">7-Day Free Trial</div>
                <div className="text-4xl font-bold mb-1">$0</div>
                <div className="text-sm text-gray-400 mb-4">All new users</div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm font-medium text-white">28 credits</div>
                  <div className="text-xs text-gray-400">4 credits/day</div>
                </div>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  {[
                    "4 credits per day",
                    "Documentation import",
                    "Code → video generation",
                    "Basic voice library"
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
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
          </motion.div>

          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="rounded-2xl p-6 bg-gray-900/60 border border-gray-800 flex flex-col justify-between h-full hover:border-gray-700 transition-all">
              <div>
                <div className="text-sm text-weaveit-400 font-semibold mb-2">Starter Plan</div>
                <div className="text-4xl font-bold mb-1">$5</div>
                <div className="text-sm text-gray-400 mb-4">Individuals & learners</div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm font-medium text-white">30 credits</div>
                  <div className="text-xs text-gray-400">per month</div>
                </div>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  {[
                    "Generate 15 videos",
                    "Basic voices",
                    "English generation",
                    "Community support"
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
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
          </motion.div>

          {/* Growth Plan - Popular */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="rounded-2xl p-6 bg-gradient-to-br from-weaveit-500/15 to-weaveit-600/5 border border-weaveit-500/30 flex flex-col justify-between h-full ring-1 ring-weaveit-500/20 hover:ring-2 hover:ring-weaveit-500/40 transition-all">
              <div>
                <motion.div 
                  className="inline-block px-3 py-1 bg-weaveit-500/20 border border-weaveit-500/30 rounded-full text-weaveit-400 text-xs font-semibold mb-3"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  Most Popular
                </motion.div>
                <div className="text-sm text-weaveit-400 font-semibold mb-2">Growth Plan</div>
                <div className="text-4xl font-bold mb-1">$10</div>
                <div className="text-sm text-gray-400 mb-4">Content creators</div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm font-medium text-white">80 credits</div>
                  <div className="text-xs text-gray-400">per month</div>
                </div>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  {[
                    "Generate 40 videos",
                    "Premium voices",
                    "Multi-language support",
                    "Faster rendering"
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
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
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="rounded-2xl p-6 bg-gray-900/60 border border-gray-800 flex flex-col justify-between h-full hover:border-gray-700 transition-all">
              <div>
                <div className="text-sm text-weaveit-400 font-semibold mb-2">Pro Plan</div>
                <div className="text-4xl font-bold mb-1">$20</div>
                <div className="text-sm text-gray-400 mb-4">Professional creators</div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm font-medium text-white">150 credits</div>
                  <div className="text-xs text-gray-400">per month</div>
                </div>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  {[
                    "Generate 75 videos",
                    "Full voice library",
                    "Regional dialects",
                    "API early access"
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
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
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-400 mb-4">Need a custom solution?</p>
          <Link
            href="/pricing"
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700"
          >
            View Enterprise Plans
          </Link>
        </motion.div>
      </div>
    </section>
  );
}