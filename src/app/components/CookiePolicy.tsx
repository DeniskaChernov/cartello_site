import { motion } from "motion/react";
import { X, CheckCircle2, BarChart3, Settings, Megaphone, Phone, Instagram, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface CookiePolicyProps {
  onClose: () => void;
}

export function CookiePolicy({ onClose }: CookiePolicyProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-black/95 backdrop-blur-2xl border border-zinc-800/50 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-cartello-red/5"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cartello-beige/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cartello-red/20 to-transparent" />

        {/* Header */}
        <div className="relative bg-gradient-to-br from-zinc-900/98 via-zinc-900/95 to-zinc-950/98 backdrop-blur-xl border-b border-zinc-800/50 p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cartello-red/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cartello-beige/5 rounded-full blur-3xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-1">
                <h4 className="text-white text-lg md:text-xl font-bold font-serif mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {t("cookiePolicy.title")}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige" />
                  <p className="text-cartello-beige/80 text-sm font-medium tracking-wide">{t("cookiePolicy.brand")}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm group"
            >
              <X className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 border border-zinc-800/30 backdrop-blur-sm">
            <p className="text-zinc-300 text-base leading-relaxed">{t("cookiePolicy.intro")}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t("cookiePolicy.s1Title")}
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">{t("cookiePolicy.s1Body")}</p>
          </div>

          <div className="space-y-5">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t("cookiePolicy.s2Title")}
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">{t("cookiePolicy.s2Body")}</p>

            <div className="space-y-4 pl-13">
              {[
                { Icon: CheckCircle2, title: t("cookiePolicy.s2_1Title"), body: t("cookiePolicy.s2_1Body") },
                { Icon: BarChart3, title: t("cookiePolicy.s2_2Title"), body: t("cookiePolicy.s2_2Body") },
                { Icon: Settings, title: t("cookiePolicy.s2_3Title"), body: t("cookiePolicy.s2_3Body") },
                { Icon: Megaphone, title: t("cookiePolicy.s2_4Title"), body: t("cookiePolicy.s2_4Body") },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="p-5 rounded-xl bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 border border-zinc-800/30 backdrop-blur-sm hover:border-zinc-700/40 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-cartello-beige mt-0.5 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-base mb-2">{title}</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t("cookiePolicy.s3Title")}
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">{t("cookiePolicy.s3Body")}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t("cookiePolicy.s4Title")}
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed mb-3">{t("cookiePolicy.s4Lead")}</p>
            <div className="space-y-3 pl-13">
              {[t("cookiePolicy.s4_1"), t("cookiePolicy.s4_2"), t("cookiePolicy.s4_3")].map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                  <span className="text-zinc-300 text-base">{item}</span>
                </div>
              ))}
            </div>
            <div className="pl-13 mt-4 p-4 rounded-xl bg-amber-900/10 border border-amber-800/20">
              <p className="text-zinc-400 text-sm leading-relaxed">{t("cookiePolicy.s4Note")}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t("cookiePolicy.s5Title")}
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">{t("cookiePolicy.s5Body")}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t("cookiePolicy.s6Title")}
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">{t("cookiePolicy.s6Body")}</p>
          </div>

          {/* Contact */}
          <div className="relative rounded-2xl bg-gradient-to-br from-cartello-red/10 via-zinc-900/40 to-zinc-900/60 border border-cartello-red/20 p-8 overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cartello-beige/5 rounded-full blur-3xl" />

            <div className="relative space-y-5">
              <h3 className="text-white font-bold text-xl font-serif mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {t("cookiePolicy.s7Title")}
              </h3>

              <p className="text-zinc-300 text-base leading-relaxed">{t("cookiePolicy.s7Lead")}</p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-cartello-beige to-transparent rounded-full" />
                  <p className="text-cartello-beige font-bold text-lg tracking-wide">{t("cookiePolicy.brand")}</p>
                </div>

                <div className="space-y-3 pl-4">
                  <a href="tel:+998958350110" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/30 transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-700/50 transition-colors">
                      <Phone className="w-4 h-4 text-cartello-beige" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">{t("cookiePolicy.phoneLabel")}</p>
                      <p className="text-white font-medium group-hover:text-cartello-beige transition-colors">+998 95 835 01 10</p>
                    </div>
                  </a>

                  <a href="tel:+998909077910" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/30 transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-700/50 transition-colors">
                      <Phone className="w-4 h-4 text-cartello-beige" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">{t("cookiePolicy.phoneLabel")}</p>
                      <p className="text-white font-medium group-hover:text-cartello-beige transition-colors">+998 90 907 79 10</p>
                    </div>
                  </a>

                  <a href="https://instagram.com/cartello.uz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/30 transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-700/50 transition-colors">
                      <Instagram className="w-4 h-4 text-cartello-beige" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">{t("cookiePolicy.instagramLabel")}</p>
                      <p className="text-white font-medium group-hover:text-cartello-beige transition-colors">@cartello.uz</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-xl">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-cartello-beige" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">{t("cookiePolicy.addressLabel")}</p>
                      <p className="text-white font-medium">{t("cookiePolicy.address")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative bg-gradient-to-t from-zinc-900/98 to-zinc-900/95 backdrop-blur-xl border-t border-zinc-800/50 p-6">
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-cartello-red via-red-900 to-red-950 hover:from-red-800 hover:via-red-850 hover:to-red-900 text-white text-base font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-cartello-red/20 hover:shadow-cartello-red/30 hover:scale-[1.02] border border-cartello-red/20"
          >
            {t("cookiePolicy.close")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
