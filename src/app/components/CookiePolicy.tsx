import { motion } from "motion/react";
import { X, Cookie, Shield, CheckCircle2, BarChart3, Settings, Megaphone, Phone, Instagram, MapPin } from "lucide-react";
import { SITE_IMAGES } from "../../lib/siteImages";

const logo = SITE_IMAGES.logoCompact;

interface CookiePolicyProps {
  onClose: () => void;
}

export function CookiePolicy({ onClose }: CookiePolicyProps) {
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
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cartello-beige/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cartello-red/20 to-transparent" />
        
        {/* Header */}
        <div className="relative bg-gradient-to-br from-zinc-900/98 via-zinc-900/95 to-zinc-950/98 backdrop-blur-xl border-b border-zinc-800/50 p-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cartello-red/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cartello-beige/5 rounded-full blur-3xl" />
          
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-1">
                <h4 className="text-white text-lg md:text-xl font-bold font-serif mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Политика использования файлов cookies
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige" />
                  <p className="text-cartello-beige/80 text-sm font-medium tracking-wide">CARTELLO GROUP</p>
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
          {/* Introduction */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 border border-zinc-800/30 backdrop-blur-sm">
            <p className="text-zinc-300 text-base leading-relaxed">
              Настоящая Политика использования файлов cookies объясняет, какие cookies используются на сайте Cartello Group, для каких целей и каким образом пользователь может управлять их использованием.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              1. Что такое cookies
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              Cookies — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя при посещении сайта. Они позволяют сайту корректно работать, запоминать настройки пользователя и улучшать качество сервиса.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-5">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              2. Какие cookies мы используем
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              На сайте Cartello Group могут использоваться следующие виды cookies:
            </p>
            
            <div className="space-y-4 pl-13">
              {/* 2.1 */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 border border-zinc-800/30 backdrop-blur-sm hover:border-zinc-700/40 transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cartello-beige mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-base mb-2">2.1. Обязательные cookies</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Необходимы для корректной работы сайта и его функций. Без них сайт может работать некорректно.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2.2 */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 border border-zinc-800/30 backdrop-blur-sm hover:border-zinc-700/40 transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-cartello-beige mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-base mb-2">2.2. Аналитические cookies</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Используются для сбора обезличенной статистики о посещении сайта (страницы, время пребывания, источники перехода). Это помогает улучшать структуру и контент сайта.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2.3 */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 border border-zinc-800/30 backdrop-blur-sm hover:border-zinc-700/40 transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-cartello-beige mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-base mb-2">2.3. Функциональные cookies</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Позволяют запоминать выборы пользователя (язык, настройки, предпочтения) для более удобного использования сайта.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2.4 */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 border border-zinc-800/30 backdrop-blur-sm hover:border-zinc-700/40 transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <Megaphone className="w-5 h-5 text-cartello-beige mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-base mb-2">2.4. Маркетинговые cookies</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Могут использоваться для показа релевантной рекламы и оценки эффективности рекламных кампаний (в том числе через сторонние сервисы).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              3. Использование сторонних сервисов
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              На сайте могут ��рименяться сторонние инструменты аналитики и рекламы, которые также используют cookies в соответствии со своими политиками конфиденциальности.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              4. Управление cookies
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed mb-3">Пользователь может:</p>
            <div className="space-y-3 pl-13">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">изменить настройки cookies в браузере;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">удалить ранее сохранённые cookies;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">полностью отключить использование cookies.</span>
              </div>
            </div>
            <div className="pl-13 mt-4 p-4 rounded-xl bg-amber-900/10 border border-amber-800/20">
              <p className="text-zinc-400 text-sm leading-relaxed">
                ⚠️ Обратите внимание, что отключение cookies может повлиять на корректность работы сайта.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              5. Согласие пользователя
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              Продолжая использовать сайт Cartello Group, пользователь подтверждает согласие на использование файлов cookies в соотв��тствии с настоящей Политикой.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              6. Изменения политики cookies
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              Компания вправе вносить изменения в настоящую Политику без предварительного уведомления. Актуальная версия всегда доступна на сайте.
            </p>
          </div>

          {/* Section 7 - Contact Info */}
          <div className="relative rounded-2xl bg-gradient-to-br from-cartello-red/10 via-zinc-900/40 to-zinc-900/60 border border-cartello-red/20 p-8 overflow-hidden backdrop-blur-sm">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cartello-beige/5 rounded-full blur-3xl" />
            
            <div className="relative space-y-5">
              <h3 className="text-white font-bold text-xl font-serif mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                7. Контактная информация
              </h3>

              <p className="text-zinc-300 text-base leading-relaxed">
                По вопросам, связанным с использованием cookies, пользователь может обратиться:
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-cartello-beige to-transparent rounded-full" />
                  <p className="text-cartello-beige font-bold text-lg tracking-wide">CARTELLO GROUP</p>
                </div>

                <div className="space-y-3 pl-4">
                  <a href="tel:+998958350110" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/30 transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-700/50 transition-colors">
                      <Phone className="w-4 h-4 text-cartello-beige" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">Телефон</p>
                      <p className="text-white font-medium group-hover:text-cartello-beige transition-colors">+998 95 835 01 10</p>
                    </div>
                  </a>

                  <a href="tel:+998909077910" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/30 transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-700/50 transition-colors">
                      <Phone className="w-4 h-4 text-cartello-beige" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">Телефон</p>
                      <p className="text-white font-medium group-hover:text-cartello-beige transition-colors">+998 90 907 79 10</p>
                    </div>
                  </a>

                  <a href="https://instagram.com/cartello.uz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/30 transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-700/50 transition-colors">
                      <Instagram className="w-4 h-4 text-cartello-beige" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">Instagram</p>
                      <p className="text-white font-medium group-hover:text-cartello-beige transition-colors">@cartello.uz</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-xl">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-cartello-beige" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">Адрес</p>
                      <p className="text-white font-medium">г. Ташкент, ул. Баку 179А</p>
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
            Понятно
          </button>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(39, 39, 42, 0.3);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #830E10, #6b0b0d);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #a01113, #830E10);
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}