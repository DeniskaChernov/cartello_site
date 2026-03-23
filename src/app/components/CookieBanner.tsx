import { motion, AnimatePresence } from "motion/react";
import { X, Cookie } from "lucide-react";
import { useState, useEffect } from "react";
import { useCookieConsent } from "./CookieConsent";
import { useLanguage } from "../contexts/LanguageContext";

interface CookieBannerProps {
  onOpenPolicy: () => void;
}

export function CookieBanner({ onOpenPolicy }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { hasConsent, acceptAll, declineAll } = useCookieConsent();
  const { t } = useLanguage();

  useEffect(() => {
    if (!hasConsent) {
      // Показываем баннер через 1 секунду после загрузки
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, [hasConsent]);

  const handleAccept = () => {
    acceptAll();
    setIsVisible(false);
  };

  const handleDecline = () => {
    declineAll();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-700 shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleDecline}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              {/* Icon */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold mb-1">
                    Файлы cookies
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Мы используем cookies для улучшения работы сайта, анализа посещаемости и персонализации контента.{" "}
                    <button
                      onClick={onOpenPolicy}
                      className="text-cartello-beige hover:underline"
                    >
                      Подробнее
                    </button>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-red-900/20"
                >
                  Принять
                </button>
                <button
                  onClick={handleDecline}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-all border border-zinc-700"
                >
                  Отклонить
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}