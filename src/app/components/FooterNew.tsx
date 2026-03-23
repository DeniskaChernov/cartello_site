import { motion } from "motion/react";
import { Instagram, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { SITE_IMAGES } from "../../lib/siteImages";

const logo = SITE_IMAGES.logoWide;

interface FooterNewProps {
  onOpenCookiePolicy: () => void;
  onOpenPrivacyPolicy: () => void;
}

export function FooterNew({ onOpenCookiePolicy, onOpenPrivacyPolicy }: FooterNewProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-zinc-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <img 
                src={logo} 
                alt="Cartello Detailing" 
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto mb-6"
              />
              <p className="text-zinc-500 mb-6">
                {t('footer.description')}<br />
                {t('footer.founded')}
              </p>
              <div className="flex gap-3">
                <a
                  href="https://t.me/Cartellouz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-900 hover:bg-zinc-800 flex items-center justify-center transition-all"
                >
                  <Phone className="w-5 h-5 text-zinc-400" />
                </a>
                <a
                  href="https://instagram.com/cartello.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-900 hover:bg-zinc-800 flex items-center justify-center transition-all"
                >
                  <Instagram className="w-5 h-5 text-zinc-400" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{t('footer.servicesTitle')}</h4>
              <ul className="space-y-3">
                {[
                  t('footer.service1'),
                  t('footer.service2'),
                  t('footer.service3'),
                  t('footer.service4'),
                  t('footer.service5'),
                  t('footer.service6'),
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="text-zinc-500 hover:text-cartello-beige transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4">{t('footer.contactTitle')}</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+998958350110"
                    className="flex items-center gap-2 text-zinc-500 hover:text-cartello-beige transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    95 835 01 10
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/Cartellouz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-500 hover:text-cartello-beige transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    @Cartellouz
                  </a>
                </li>
                <li className="flex items-start gap-2 text-zinc-500">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{t('footer.address')}</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Hours */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4">{t('footer.scheduleTitle')}</h4>
              <ul className="space-y-3 text-zinc-500">
                <li className="flex justify-between">
                  <span>{t('footer.scheduleDays')}</span>
                </li>
                <li className="text-white font-semibold">{t('footer.scheduleTime')}</li>
                <li className="flex justify-between">
                  <span>{t('footer.scheduleSunday')}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="pt-8 border-t border-zinc-900"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <span>{t('footer.rights')}</span>
            <button
              onClick={onOpenCookiePolicy}
              className="hover:text-cartello-beige transition-colors"
            >
              {t('footer.cookiePolicy')}
            </button>
            <button
              onClick={onOpenPrivacyPolicy}
              className="hover:text-cartello-beige transition-colors"
            >
              {t('footer.privacyPolicy')}
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}