"use client";

// Link removed; enterprise card will use mailto link
import { ArrowRight, CheckCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { purchaseWithUsdc, USE_TOKEN_2022, awardCredits } from "../../lib/payments";

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

function SuccessNotification({ notification, onClose }: { notification: any; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="fixed top-6 right-6 z-50 max-w-md"
    >
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <CheckCircle className="w-6 h-6 text-green-500" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white mb-1">{notification.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{notification.message}</p>
            {notification.txHash && (
              <div className="text-xs text-gray-400 mt-2 p-2 bg-gray-900/40 rounded border border-gray-700/50">
                <a
                  href={`https://solscan.io/tx/${notification.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono break-all text-green-200 hover:underline"
                >
                  {notification.txHash}
                </a>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const enterpriseTier = {
    id: "enterprise",
    price: null,
    title: "Enterprise",
    credits: null,
    monthly: false,
    description: "Custom pricing for organizations",
    features: [
      "Unlimited generation",
      "Unlimited ingestion",
      "Custom voice cloning",
      "60+ languages",
      "Fastest GPU priority",
      "Admin dashboard",
      "SSO integration",
      "API access",
      "SLA guarantees",
      "Dedicated support",
    ],
    best_for: "Enterprises, dev teams",
  } as const;
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [successNotification, setSuccessNotification] = useState<{ title: string; message: string; txHash?: string } | null>(null);
  const [notificationVisible, setNotificationVisible] = useState(true);

  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (successNotification && notificationVisible) {
      const timer = setTimeout(() => setNotificationVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [successNotification, notificationVisible]);

  const openModal = (tier: any) => {
    setSelected(tier);
    setMessage(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected(null);
    setProcessing(false);
  };

  const handleConfirm = async () => {
    if (!selected || selected.price === null || selected.credits === null) return;
    setProcessing(true);
    setMessage(null);

    if (!wallet || !wallet.publicKey) {
      setMessage("Please connect your wallet to proceed");
      setProcessing(false);
      return;
    }

    try {
      if (selected.price === 0) {
        setSuccessNotification({
          title: "Free Trial Activated! 🎉",
          message: `${selected.credits} credits have been awarded to your account. Start creating videos now!`
        });
        setNotificationVisible(true);
        closeModal();
        return;
      }

      const sig = await purchaseWithUsdc(wallet, selected.price, connection, { useToken2022: USE_TOKEN_2022 });
      await awardCredits(wallet.publicKey.toString(), selected.credits, selected.id, sig);
      setSuccessNotification({
        title: "Payment Successful! 🎉",
        message: `${selected.credits} credits have been added to your account. You can now start creating videos!`,
        txHash: sig
      });
      setNotificationVisible(true);
      closeModal();
    } catch (err: any) {
      console.error("Purchase failed", err);
      setMessage(err?.message || "Purchase failed");
    } finally {
      setProcessing(false);
    }
  };

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
                <button
                  onClick={() => openModal({ id: "free-trial", price: 0, title: "Free Trial", credits: 28 })}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white rounded-lg font-medium transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                <button
                  onClick={() => openModal({ id: "starter", price: 5, title: "Starter", credits: 30 })}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700"
                >
                  Select Plan
                </button>
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
                <button
                  onClick={() => openModal({ id: "growth", price: 10, title: "Growth", credits: 80 })}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white rounded-lg font-medium transition-all"
                >
                  Select Plan
                </button>
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
                <button
                  onClick={() => openModal({ id: "pro", price: 20, title: "Pro", credits: 150 })}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700"
                >
                  Select Plan
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="w-full">
            <div className="rounded-2xl p-6 bg-gradient-to-br from-weaveit-500/10 to-weaveit-600/5 border border-weaveit-500/30">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{enterpriseTier.title}</h3>
                  <p className="text-gray-400 mt-1">{enterpriseTier.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Best for</div>
                  <div className="text-white font-medium">{enterpriseTier.best_for}</div>
                </div>
              </div>

              <ul className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-gray-300">
                {enterpriseTier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-weaveit-400 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3 justify-end">
                <a
                  href="mailto:weaveitagent@gmail.com?subject=Enterprise%20Pricing%20Inquiry"
                  className="inline-flex items-center px-6 py-3 bg-weaveit-500 hover:bg-weaveit-600 text-white rounded-lg font-medium transition-all border border-weaveit-600"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Modal */}
        {modalOpen && selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
            <div className="relative bg-gray-900/80 border border-gray-800 rounded-2xl p-6 max-w-md w-full">
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <h2 className="text-xl font-semibold text-white mb-2">Confirm Purchase</h2>
              <p className="text-gray-300 mb-6">You're about to purchase <span className="font-medium text-white">{selected.credits ?? 0} credits</span> for <span className="font-semibold text-white">{selected.price === 0 ? "Free" : selected.price === null ? "Custom" : `\u0024${selected.price}`}</span></p>

              <div className="mb-6 p-4 bg-gray-900/60 rounded-xl">
                {!wallet.publicKey ? (
                  <div className="space-y-3 text-center">
                    <p className="text-sm text-gray-300">Connect your wallet to continue</p>
                    <WalletMultiButton className="!bg-weaveit-500 !rounded-xl" />
                  </div>
                ) : (
                  <div className="text-sm text-gray-300">Wallet: <span className="font-medium text-white">{wallet.publicKey.toString().slice(0,6)}...{wallet.publicKey.toString().slice(-4)}</span></div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button onClick={handleConfirm} className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold bg-weaveit-500 text-white" disabled={processing || selected.price === null}>
                  {processing ? "Processing..." : selected.price === 0 ? "Activate Trial" : `Pay \u0024${selected.price}`}
                </button>
                <button onClick={closeModal} className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold border border-gray-700 text-white bg-transparent">Cancel</button>
              </div>

              {message && <p className="mt-4 text-sm text-center text-gray-300 break-all whitespace-pre-wrap">{message}</p>}
            </div>
          </div>
        )}

        {/* Success Notification */}
        {successNotification && notificationVisible && (
          <SuccessNotification 
            notification={successNotification} 
            onClose={() => setNotificationVisible(false)}
          />
        )}

      </div>
    </section>
  );
}
