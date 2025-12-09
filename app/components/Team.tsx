import {
  Globe
} from "lucide-react"
export default function Team() {
  return (
    <section id="team" className="py-20 bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">The strength of WeaveIt comes from a team that has actually built, shipped, and lived inside developer ecosystems.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Founder 1 */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-8 border border-gray-700/40">
              <div className="flex items-start space-x-6">
                <div className="w-36 h-36 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-gray-700/50">
                  <img src="/team/lawal.jpg" alt="Lawal Abdulrazaq" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Lawal Abdulrazaq — Founder</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <a href="https://x.com/loganthewise" target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-300 hover:text-weaveit-400">
                      {/* X logo */}
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23 3.01c-.8.35-1.66.6-2.56.7.92-.55 1.63-1.42 1.96-2.46-.86.51-1.8.88-2.8 1.08A4.5 4.5 0 0012 7.5v.57A12.8 12.8 0 013 5.15a4.48 4.48 0 001.39 6 4.41 4.41 0 01-2.04-.56v.06a4.5 4.5 0 003.6 4.4c-.52.14-1.06.17-1.6.06.45 1.4 1.75 2.42 3.3 2.45A9.03 9.03 0 012 19.54a12.73 12.73 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83v-.58A9.2 9.2 0 0023 3.01z"/></svg>
                      <span className="text-sm">@loganthewise</span>
                    </a>
                    <a href="https://dev-logan-portfolio.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-300 hover:text-weaveit-400">
                      <Globe className="w-4 h-4 mr-2" />
                      <span className="text-sm">Portfolio</span>
                    </a>
                  </div>
                  <p className="text-gray-300 mt-3">A full-stack engineer and AI builder with experience creating developer tools, leading tech bootcamps, and building production-ready systems. Passionate about making technical learning faster and more accessible.</p>
                </div>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-8 border border-gray-700/40">
              <div className="flex items-start space-x-6">
                <div className="w-36 h-36 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-gray-700/50">
                  <img src="/team/orkar.jpg" alt="Orkar A. Melch. Fabian" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Orkar Fabian —  Co-Founder</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <a href="https://x.com/OfficialBenFab1" target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-300 hover:text-weaveit-400">
                      {/* X logo */}
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23 3.01c-.8.35-1.66.6-2.56.7.92-.55 1.63-1.42 1.96-2.46-.86.51-1.8.88-2.8 1.08A4.5 4.5 0 0012 7.5v.57A12.8 12.8 0 013 5.15a4.48 4.48 0 001.39 6 4.41 4.41 0 01-2.04-.56v.06a4.5 4.5 0 003.6 4.4c-.52.14-1.06.17-1.6.06.45 1.4 1.75 2.42 3.3 2.45A9.03 9.03 0 012 19.54a12.73 12.73 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83v-.58A9.2 9.2 0 0023 3.01z"/></svg>
                      <span className="text-sm">@OfficialBenFab1</span>
                    </a>
                    <a href="https://dev-orkarfabian.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-300 hover:text-weaveit-400">
                      <Globe className="w-4 h-4 mr-2" />
                      <span className="text-sm">Portfolio</span>
                    </a>
                  </div>
                  <p className="text-gray-300 mt-3">Software engineer and systems architect focused on scalable products and developer experience. Experienced in building API-driven platforms and engineering workflows from the ground up.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}