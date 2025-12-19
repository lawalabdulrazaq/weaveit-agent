// import Link from "next/link"
// import {
//   ArrowRight,
//   CheckCircle
// } from "lucide-react"

export default function Partnerships() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Trusted Partnerships</h2>
        </div>

        {/* Animated Carousel - smooth continuous cinematic scroll */}
        <style>{`
          @keyframes carousel-loop {
            0% { transform: translate3d(0,0,0); }
            100% { transform: translate3d(-50%,0,0); }
          }
          .carousel-container {
            display: flex;
            gap: 2rem;
            will-change: transform;
            animation: carousel-loop 20s linear infinite;
            align-items: center;
          }
          .carousel-container:hover {
            animation-play-state: paused;
          }
          .carousel-item { flex: 0 0 auto; }
        `}</style>

        <div className="relative overflow-hidden bg-gradient-to-r from-gray-900/20 via-transparent to-gray-900/20 rounded-3xl p-8 border border-gray-800/50">
          <div className="carousel-container">
            {/* Slide set A */}
            <div className="carousel-item flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-8 hover:border-blue-500/50 transition-all">
              <div className="w-48 h-48 flex items-center justify-center mb-6">
                <img src="/partnerships/solana.png" alt="Solana" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Solana</h3>
              <p className="text-sm text-gray-400 text-center">High-performance blockchain infrastructure</p>
            </div>

            <div className="carousel-item flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 p-8 hover:border-purple-500/50 transition-all">
              <div className="w-48 h-48 flex items-center justify-center mb-6">
                <img src="/partnerships/cyrene.png" alt="Cyrene AI" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Cyrene AI</h3>
              <p className="text-sm text-gray-400 text-center">Fair launchpad for early-stage projects on Solana</p>
            </div>

            <div className="carousel-item flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 p-8 hover:border-cyan-500/50 transition-all">
              <div className="w-48 h-48 flex items-center justify-center mb-6">
                <img src="/partnerships/dcodeblock.png" alt="Dcodeblock" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Dcodeblock</h3>
              <p className="text-sm text-gray-400 text-center">Powering the Builder Economy</p>
            </div>

            {/* Slide set B (duplicate for seamless loop) */}
            <div className="carousel-item flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-8 hover:border-blue-500/50 transition-all">
              <div className="w-48 h-48 flex items-center justify-center mb-6">
                <img src="/partnerships/solana.png" alt="Solana" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Solana</h3>
              <p className="text-sm text-gray-400 text-center">High-performance blockchain infrastructure</p>
            </div>

            <div className="carousel-item flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 p-8 hover:border-purple-500/50 transition-all">
              <div className="w-48 h-48 flex items-center justify-center mb-6">
                <img src="/partnerships/cyrene.png" alt="Cyrene AI" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Cyrene AI</h3>
              <p className="text-sm text-gray-400 text-center">Fair launchpad for early-stage projects on Solana</p>
            </div>

            <div className="carousel-item flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 p-8 hover:border-cyan-500/50 transition-all">
              <div className="w-48 h-48 flex items-center justify-center mb-6">
                <img src="/partnerships/dcodeblock.png" alt="Dcodeblock" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Dcodeblock</h3>
              <p className="text-sm text-gray-400 text-center">Powering the Builder Economy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}