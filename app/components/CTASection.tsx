"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Zap
} from "lucide-react";

export default function CTASection() {
  return (
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
  );
}