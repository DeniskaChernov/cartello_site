import { motion, AnimatePresence } from "motion/react";
import { Phone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-toggle between icon and number every 4 seconds
  useEffect(() => {
    if (!isVisible || isExpanded) return;
    
    const interval = setInterval(() => {
      setShowNumber((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, isExpanded]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setIsExpanded(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed z-50 max-w-[calc(100vw-1.5rem)] sm:max-w-none"
          style={{
            right: "max(1rem, env(safe-area-inset-right, 0px))",
            bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          {/* Main Button */}
          {!isExpanded ? (
            <motion.a
              href="tel:+998958350110"
              onClick={(e) => {
                if (!showNumber) {
                  e.preventDefault();
                  setIsExpanded(true);
                }
              }}
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center h-16 bg-gradient-to-r from-red-900 to-red-800 rounded-full shadow-2xl shadow-red-900/50 overflow-hidden"
              style={{
                width: showNumber ? "min(220px, calc(100vw - 2rem))" : "64px",
                transition: "width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Pulse Effect */}
              <span className="absolute inset-0 rounded-full bg-red-900 opacity-20 md:animate-ping" aria-hidden />
              
              {/* Content Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Phone Number */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: showNumber ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: showNumber ? 0.6 : 0,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="text-white font-semibold text-[17px] tracking-wider whitespace-nowrap"
                  style={{
                    pointerEvents: showNumber ? 'auto' : 'none',
                    lineHeight: '1'
                  }}
                >
                  95 835 01 10
                </motion.span>

                {/* Phone Icon */}
                <motion.div
                  animate={{
                    opacity: showNumber ? 0 : 1,
                  }}
                  transition={{
                    duration: showNumber ? 0.5 : 0.7,
                    delay: showNumber ? 0 : 0.4,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    pointerEvents: showNumber ? 'none' : 'auto'
                  }}
                >
                  <Phone className="w-7 h-7 text-white" />
                </motion.div>
              </div>
            </motion.a>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border-2 border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:w-80 sm:p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-bold text-lg">{t("contact.contactTitle")}</h4>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={scrollToContact}
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
                >
                  <Phone className="w-4 h-4" />
                  {t("floatingCTA.bookFull")}
                </button>

                <a
                  href="tel:+998958350110"
                  className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-cartello-beige" />
                  <span className="text-cartello-beige">95 835 01 10</span>
                </a>

                <a
                  href="https://t.me/Cartellouz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Telegram
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}