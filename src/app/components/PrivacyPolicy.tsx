import { motion } from "motion/react";
import { X, Shield, CheckCircle2, Phone, Instagram, MapPin, Lock, FileText, UserCheck, Database, Eye, AlertCircle } from "lucide-react";

interface PrivacyPolicyProps {
  onClose: () => void;
}

export function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
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
                  Политика конфиденциальности
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
              Настоящая Политика конфиденциальности определяет порядок сбора, хранения, обработки и защиты персональных данных пользователей, которые предоставляются при использовании сайта, социальных сетей и сервисов компании Cartello Group (далее — Компания).
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              1. Общие положения
            </h3>
            <div className="space-y-3 pl-4">
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">1.1.</span>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Компания уважает право пользователей на неприкосновенность личной информации и обеспечивает защиту персональных данных в соответствии с законодательством Республики Узбекистан.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">1.2.</span>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Используя сайт, социальные сети или иные сервисы Компании, пользователь выражает согласие с условиями настоящей Политики конфиденциальности.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">1.3.</span>
                <p className="text-zinc-300 text-base leading-relaxed">
                  В случае несогласия с условиями Политики пользователь должен прекратить использование сервисов Компании.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-5">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              2. Персональные данные, которые мы собираем
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              Компания может собирать следующие данные:
            </p>
            
            <div className="space-y-3 pl-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">имя и фамилия;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">номер телефона;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">данные мессенджеров и социальных сетей (Instagram, Telegram, WhatsApp и др.);</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">информация об автомобиле (марка, модель, год выпуска) при обращении за услугами;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">иные данные, добровольно предоставленные пользователем через формы, сообщения или звонки.</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-5">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              3. Цели обработки персональных данных
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              Персональные данные используются исключительно для:
            </p>
            
            <div className="space-y-3 pl-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">обработки заявок и обращений;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">связи с пользователем и предоставления консультаций;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">оказания услуг автодетейлинга;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">улучшения качества сервиса;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">информирования об акциях, услугах и специальных предложениях (при согласии пользователя).</span>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-5">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              4. Правовые основания обработки
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              Обработка персональных данных осуществляется на основании:
            </p>
            
            <div className="space-y-3 pl-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">добровольного согласия пользователя;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">необходимости исполнения обязательств перед пользователем;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">требований законодательства Республики Узбекистан.</span>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              5. Условия хранения и защиты данных
            </h3>
            <div className="space-y-3 pl-4">
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">5.1.</span>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Компания принимает все разумные технические и организационные меры для защиты персональных данных от утраты, неправомерного доступа, изменения или раскрытия.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">5.2.</span>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Доступ к персональным данным имеют только уполномоченные сотрудники Компании.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">5.3.</span>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Персональные данные хранятся не дольше, чем это необходимо для целей их обработки.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              6. Передача персональных данных третьим лицам
            </h3>
            <div className="space-y-4 pl-4">
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">6.1.</span>
                <div className="flex-1">
                  <p className="text-zinc-300 text-base leading-relaxed mb-3">
                    Компания не передает персональные данные третьим лицам, за исключением случаев:
                  </p>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-800/20 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                      <span className="text-zinc-300 text-base">когда это необходимо для оказания услуг пользователю;</span>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-800/20 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                      <span className="text-zinc-300 text-base">по требованию уполномоченных государственных органов в рамках законодательства;</span>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-800/20 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                      <span className="text-zinc-300 text-base">при наличии согласия пользователя.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">6.2.</span>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Компания не осуществляет продажу или обмен персональных данных.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              7. Использование файлов cookie и аналитики
            </h3>
            <div className="space-y-3 pl-4">
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">7.1.</span>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Сайт может использовать файлы cookie и инструменты аналитики для улучшения работы сервиса и пользовательского опыта.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-zinc-400 font-medium min-w-[2.5rem]">7.2.</span>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Пользователь может изменить настройки cookie в своем браузере.
                </p>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div className="space-y-5">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              8. Права пользователя
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              Пользователь имеет право:
            </p>
            
            <div className="space-y-3 pl-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">получать информацию о своих персональных данных;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">требовать их уточнения, обновления или удаления;</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cartello-beige mt-2" />
                <span className="text-zinc-300 text-base">отозвать согласие на обработку персональных данных, направив запрос Компании.</span>
              </div>
            </div>
          </div>

          {/* Section 9 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              9. Изменения политики конфиденциальности
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              Компания вправе вносить изменения в настоящую Политику без предварительного уведомления. Актуальная версия всегда доступна на сайте Компании.
            </p>
          </div>

          {/* Section 10 - Contact Info */}
          <div className="relative rounded-2xl bg-gradient-to-br from-cartello-red/10 via-zinc-900/40 to-zinc-900/60 border border-cartello-red/20 p-8 overflow-hidden backdrop-blur-sm">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cartello-beige/5 rounded-full blur-3xl" />
            
            <div className="relative space-y-5">
              <h3 className="text-white font-bold text-xl font-serif mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                10. Контактная информация
              </h3>

              <p className="text-zinc-300 text-base leading-relaxed">
                По вопросам, связанным с обработкой персональных данных, пользователь может обратиться к Компании:
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
