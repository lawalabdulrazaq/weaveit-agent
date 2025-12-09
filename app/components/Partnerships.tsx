import Link from "next/link"
import {
  ArrowRight,
  CheckCircle
} from "lucide-react"

export default function Partnerships() {
  return (
    // <section className="py-20">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="text-center mb-16">
    //       <h2 className="text-4xl font-bold text-white mb-4">Trusted Partnerships</h2>
    //     </div>

    //     {/* Animated Carousel */}
    //     <style>{`
    //       @keyframes carousel-loop {
    //         0% { transform: translateX(0); }
    //         100% { transform: translateX(-33.333%); }
    //       }
    //       .carousel-container {
    //         animation: carousel-loop 12s linear infinite;
    //       }
    //       .carousel-container:hover {
    //         animation-play-state: paused;
    //       }
    //     `}</style>

    //     <div className="relative overflow-hidden bg-gradient-to-r from-gray-900/20 via-transparent to-gray-900/20 rounded-3xl p-8 border border-gray-800/50">
    //       <div className="flex gap-8 carousel-container" style={{ width: '400%' }}>
    //         {/* Partner 1 - Solana */}
    //         <div className="flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-8 hover:border-blue-500/50 transition-all">
    //           <div className="w-48 h-48 flex items-center justify-center mb-6">
    //             <img src="/partnerships/solana.svg" alt="Solana" className="w-full h-full object-contain" />
    //           </div>
    //           <h3 className="text-2xl font-bold text-white mb-2 text-center">Solana</h3>
    //           <p className="text-sm text-gray-400 text-center">High-performance blockchain infrastructure</p>
    //         </div>

    //         {/* Partner 2 - Cyrene AI */}
    //         <div className="flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 p-8 hover:border-purple-500/50 transition-all">
    //           <div className="w-48 h-48 flex items-center justify-center mb-6">
    //             <img src="/partnerships/cyrene-ai.svg" alt="Cyrene AI" className="w-full h-full object-contain" />
    //           </div>
    //           <h3 className="text-2xl font-bold text-white mb-2 text-center">Cyrene AI</h3>
    //           <p className="text-sm text-gray-400 text-center">Fair launchpad for early-stage projects on Solana</p>
    //         </div>

    //         {/* Partner 3 - Dcodeblock */}
    //         <div className="flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 p-8 hover:border-cyan-500/50 transition-all">
    //           <div className="w-48 h-48 flex items-center justify-center mb-6">
    //             <img src="/partnerships/dcodeblock.svg" alt="Dcodeblock" className="w-full h-full object-contain" />
    //           </div>
    //           <h3 className="text-2xl font-bold text-white mb-2 text-center">Dcodeblock</h3>
    //           <p className="text-sm text-gray-400 text-center">Powering the Builder Economy</p>
    //         </div>

    //         {/* Duplicate Partner 1 for seamless loop - Solana */}
    //         <div className="flex-shrink-0 w-80 h-80 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-8 hover:border-blue-500/50 transition-all">
    //           <div className="w-48 h-48 flex items-center justify-center mb-6">
    //             <img src="/partnerships/solana.svg" alt="Solana" className="w-full h-full object-contain" />
    //           </div>
    //           <h3 className="text-2xl font-bold text-white mb-2 text-center">Solana</h3>
    //           <p className="text-sm text-gray-400 text-center">High-performance blockchain infrastructure</p>
    //         </div>
    //       </div>

    //       {/* Navigation dots */}
    //       <div className="flex justify-center gap-2 mt-8">
    //         <div className="w-2 h-2 rounded-full bg-weaveit-500 opacity-100"></div>
    //         <div className="w-2 h-2 rounded-full bg-gray-600"></div>
    //         <div className="w-2 h-2 rounded-full bg-gray-600"></div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted Partnerships</h2>
            <p className="text-gray-400">We proudly partner with these organizations.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 items-center justify-center justify-items-center">
            {[
              { src: '/partnerships/Solana.jpg', name: 'Solana' },
              { src: '/partnerships/Cyrene.jpg', name: 'Cyrene AI' },
              { src: '/partnerships/Dcodeblock.jpg', name: 'Dcodeblock' },
            ].map((p) => (
              <div
                key={p.name}
                className="bg-gray-800/40 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-700/40 hover:border-weaveit-500/30 transition-all duration-200"
              >
                <div className="w-36 h-20 flex items-center justify-center mb-3">
                  <img src={p.src} alt={p.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="text-sm text-gray-300 font-semibold text-center">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}