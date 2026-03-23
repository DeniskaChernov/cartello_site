import { motion } from "motion/react";
import { Phone, MapPin, Clock, Send, MessageCircle, Instagram, Mail, ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { getLeadAuthHeader, getLeadSubmissionUrl } from "../../lib/leadApi";
import { SITE_IMAGES } from "../../lib/siteImages";

interface ContactNewProps {
  onOpenPrivacyPolicy: () => void;
}

export function ContactNew({ onOpenPrivacyPolicy }: ContactNewProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyAccepted) {
      toast.error(t('contact.consentRequired'), {
        description: t('contact.consentMessage'),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(getLeadSubmissionUrl(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getLeadAuthHeader(),
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send request");
      }

      toast.success(t('contact.successTitle'), {
        description: t('contact.successMessage'),
      });

      setFormData({ name: "", phone: "", service: "" });
      setPrivacyAccepted(false);
    } catch (error) {
      console.error("Error sending form:", error);
      toast.error(t('contact.errorTitle'), {
        description: t('contact.errorMessageAlt'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-900/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-zinc-400 px-4"
          >
            {t('contact.formSubtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-stretch">
          {/* Left - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-6 sm:p-8 md:p-10">
              <h3 className="text-2xl sm:text-3xl text-white mb-8 sm:mb-[62px] font-bold">
                {t('contact.formTitle')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-3">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full h-[72px] px-5 py-4 bg-zinc-900/50 border-2 border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:border-red-900 focus:outline-none focus:ring-2 focus:ring-red-900/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-3">
                    {t('contact.phoneLabel')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder={t('contact.phonePlaceholder')}
                    className="w-full h-[72px] px-5 py-4 bg-zinc-900/50 border-2 border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:border-red-900 focus:outline-none focus:ring-2 focus:ring-red-900/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-zinc-300 mb-3">
                    {t('contact.serviceLabel')}
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full h-[72px] px-5 py-4 bg-zinc-900/50 border-2 border-zinc-700 rounded-xl text-white focus:border-red-900 focus:outline-none focus:ring-2 focus:ring-red-900/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">{t('contact.selectService')}</option>
                    <option value={t('contact.serviceOption1')}>{t('contact.serviceOption1')}</option>
                    <option value={t('contact.serviceOption2')}>{t('contact.serviceOption2')}</option>
                    <option value={t('contact.serviceOption3')}>{t('contact.serviceOption3')}</option>
                    <option value={t('contact.serviceOption4')}>{t('contact.serviceOption4')}</option>
                    <option value={t('contact.serviceOption5')}>{t('contact.serviceOption5')}</option>
                    <option value={t('contact.serviceOption6')}>{t('contact.serviceOption6')}</option>
                  </select>
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-2 border-zinc-700 bg-zinc-900/50 checked:bg-gradient-to-r checked:from-red-900 checked:to-red-800 focus:ring-2 focus:ring-red-900/20 cursor-pointer"
                  />
                  <label htmlFor="privacy-consent" className="text-sm text-zinc-400 leading-relaxed cursor-pointer">
                    {t('contact.privacyConsent')}{" "}
                    <button
                      type="button"
                      onClick={onOpenPrivacyPolicy}
                      className="text-cartello-beige hover:underline"
                    >
                      {t('contact.privacyPolicy')}
                    </button>
                    {" "}{t('contact.privacyLaw')}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !privacyAccepted}
                  className="group w-full py-4 px-6 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
                >
                  {isSubmitting ? (
                    t('contact.sending')
                  ) : (
                    <>
                      {t('contact.send')}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Quick Contact */}
            <div className="rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-10 h-full flex flex-col">
              <h3 className="text-3xl text-white mb-[62px] font-bold">
                {t('contact.contactTitle')}
              </h3>

              <div className="space-y-6 flex-1">
                <div>
                  <div className="block text-sm font-medium text-zinc-300 mb-3">{t('contact.phoneTitle')}</div>
                  <a
                    href="tel:+998958350110"
                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-zinc-900/50 border-2 border-zinc-700 hover:border-red-900 transition-all group h-[72px]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 mb-0.5">{t('contact.phoneTitle')}</div>
                      <div className="text-white text-base font-semibold group-hover:text-cartello-beige transition-colors">
                        95 835 01 10
                      </div>
                    </div>
                  </a>
                </div>

                <div>
                  <div className="block text-sm font-medium text-zinc-300 mb-3">{t('contact.telegram')}</div>
                  <a
                    href="https://t.me/Cartellouz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-zinc-900/50 border-2 border-zinc-700 hover:border-red-900 transition-all group h-[72px]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center flex-shrink-0">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 mb-0.5">{t('contact.telegram')}</div>
                      <div className="text-white text-base font-semibold group-hover:text-cartello-beige transition-colors">
                        @Cartellouz
                      </div>
                    </div>
                  </a>
                </div>

                <div>
                  <div className="block text-sm font-medium text-zinc-300 mb-3">{t('contact.instagram')}</div>
                  <a
                    href="https://instagram.com/cartello.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-zinc-900/50 border-2 border-zinc-700 hover:border-red-900 transition-all group h-[72px]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 mb-0.5">{t('contact.instagram')}</div>
                      <div className="text-white text-base font-semibold group-hover:text-cartello-beige transition-colors">
                        @cartello.uz
                      </div>
                    </div>
                  </a>
                </div>

                {/* Info Text */}
                <div className="pt-2">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {t('contact.infoText')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Location & Hours - Full Width Below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-7xl mx-auto"
        >
          <div className="rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-10 overflow-hidden">
            <h3 className="text-2xl text-white mb-8 font-bold">
              {t('contact.addressTitle')}
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left - Address & Hours */}
              <div className="h-[280px] flex flex-col justify-center space-y-8">
                <a
                  href="https://yandex.uz/maps/10335/tashkent/?ll=69.306111%2C41.287925&mode=poi&poi%5Bpoint%5D=69.306121%2C41.288030&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D4770057567&z=20.65"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-zinc-400 mb-2">{t('contact.address')}</div>
                    <div className="text-white text-lg mb-1 group-hover:text-cartello-beige transition-colors">
                      <span className="inline-flex items-center gap-2 underline decoration-transparent group-hover:decoration-cartello-beige decoration-1 underline-offset-4 transition-all group-hover:drop-shadow-[0_0_10px_rgba(174,117,40,0.45)]">
                        {t('contact.addressValue')}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </span>
                    </div>
                    <div className="text-sm text-zinc-500">
                      {t('contact.addressLandmark')}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400 mb-2">
                      {t('contact.schedule')}
                    </div>
                    <div className="text-white text-lg mb-1">
                      {t('contact.scheduleValue')}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {t('contact.scheduleValue2')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Photo — весь кадр без обрезки */}
              <div className="relative h-[320px] sm:h-[360px] rounded-2xl overflow-hidden bg-zinc-950">
                <img
                  src={SITE_IMAGES.contactBuilding}
                  alt="Cartello Detailing Center"
                  className="w-full h-full object-contain object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}