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
          className="fixed z-50 w-auto max-md:left-4 max-md:right-4 md:left-auto md:right-6 md:max-w-md"
          style={{
            bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-2xl backdrop-blur-xl">
            <button
              onClick={handleDecline}
              className="absolute right-3 top-3 z-10 text-zinc-400 transition-colors hover:text-white sm:right-4 sm:top-4"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain p-4 pr-12 sm:p-6 sm:pr-14">
              <div className="mb-4 flex items-start gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-900 to-red-800 sm:h-12 sm:w-12">
                  <Cookie className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="mb-1 text-base font-bold text-white sm:text-lg">
                    {t("cookieBanner.stickyTitle")}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {t("cookieBanner.stickyDescription")}{" "}
                    <button
                      onClick={onOpenPolicy}
                      type="button"
                      className="text-cartello-beige hover:underline"
                    >
                      {t("cookieBanner.stickyMore")}
                    </button>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <button
                  onClick={handleAccept}
                  type="button"
                  className="flex-1 rounded-lg bg-gradient-to-r from-red-900 to-red-800 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/20 transition-all hover:from-red-800 hover:to-red-700"
                >
                  {t("cookieBanner.accept")}
                </button>
                <button
                  onClick={handleDecline}
                  type="button"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 sm:flex-initial sm:px-5"
                >
                  {t("cookieBanner.decline")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
