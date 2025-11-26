import { Github, Twitter, Mail, FileText, Users, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0a0e17] border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-3">
              <img className="h-10 w-10 rounded-xl" src="/assets/weav12.jpg" alt="WeaveIt" />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-weaveit-500 to-weaveit-600 bg-clip-text text-transparent">
                  WeaveIt
                </h3>
                <p className="text-xs text-gray-400">AI Video Generator</p>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              Transform your code explanations into professional tutorial videos with AI-powered narration and visual
              generation.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://x.com/weaveItAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-weaveit-500 transition-colors duration-200"
              >
                <span className="sr-only">X (Twitter)</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/lawalabdulrazaq/weaveit-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-weaveit-500 transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a
                href="mailto:weaveitagent@gmail.com"
                className="text-gray-400 hover:text-weaveit-500 transition-colors duration-200"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-weaveit-500 tracking-wider uppercase mb-4">Product</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#features"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200"
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="/studio"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200"
                    >
                      Launch Studio
                    </a>
                  </li>
                  <li>
                    <a
                      href="#demo"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200"
                    >
                      Demo
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-weaveit-500 tracking-wider uppercase mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://docs.weaveit.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200 flex items-center"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/weaveit-ai/examples"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200"
                    >
                      Examples
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-weaveit-500 tracking-wider uppercase mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/about"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200 flex items-center"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:temitopelawal925@gmail.com"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200 flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-weaveit-500 tracking-wider uppercase mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/privacy"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="/cookies"
                      className="text-base text-gray-300 hover:text-weaveit-500 transition-colors duration-200"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a
                href="https://x.com/weaveItAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-weaveit-500 transition-colors duration-200"
              >
                <span className="sr-only">X (Twitter)</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/lawalabdulrazaq/weaveit-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-weaveit-500 transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:weaveitagent@gmail.com"
                className="text-gray-400 hover:text-weaveit-500 transition-colors duration-200"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-base text-gray-400">&copy; 2025 WeaveIt AI, Inc. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-800/30">
          <div className="text-center">
            <p className="text-sm text-gray-500">Built with ❤️ for developers and content creators worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
