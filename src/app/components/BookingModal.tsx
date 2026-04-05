import { motion, AnimatePresence } from "motion/react";
import { X, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { getLeadAuthHeader, getLeadSubmissionUrl } from "../../lib/leadApi";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    price: string;
    priceOnRequest?: boolean;
  } | null;
}

export function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(getLeadSubmissionUrl(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getLeadAuthHeader(),
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            service: `${service?.title} (${service?.price})`,
            email: formData.email,
            comment: formData.comment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send request");
      }

      toast.success(t('contact.successTitle'), {
        description: t('contact.successMessage'),
      });

      setFormData({ name: "", phone: "", email: "", comment: "" });
      onClose();
    } catch (error) {
      console.error("Error sending form:", error);
      toast.error(t('contact.errorTitle'), {
        description: t('contact.errorMessageAlt'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+998958350110";
  };

  const handleTelegram = () => {
    window.open("https://t.me/Cartellouz", "_blank");
  };

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain p-4 pt-8 sm:pt-12 md:items-center md:pt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative my-auto max-h-[min(90dvh,900px)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-[2.5rem] border border-white/10 bg-zinc-900 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Title */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">{t('bookingModal.title')}</h2>
                <p className="text-zinc-400">
                  {service?.title} • <span className="text-cartello-beige">{service?.price}</span>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div>
                  <input
                    type="text"
                    placeholder={t('bookingModal.name')}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-cartello-beige/50 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder={t('bookingModal.phone')}
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-cartello-beige/50 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder={t('bookingModal.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-cartello-beige/50 transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    placeholder={t('bookingModal.comment')}
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-cartello-beige/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full appearance-none overflow-hidden rounded-2xl bg-gradient-to-r from-cartello-red to-red-800 py-4 font-semibold text-white transition-colors hover:from-red-800 hover:to-red-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? t('bookingModal.sending') : t('bookingModal.send')}
                </button>
              </form>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCall}
                  className="group flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 font-semibold text-white transition-colors hover:border-green-500/30 hover:bg-white/10"
                >
                  <Phone className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                  {t('bookingModal.call')}
                </button>

                <button
                  type="button"
                  onClick={handleTelegram}
                  className="group flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 font-semibold text-white transition-colors hover:border-blue-400/30 hover:bg-white/10"
                >
                  <Send className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  {t('bookingModal.telegram')}
                </button>
              </div>

              <p className="text-center text-zinc-500 text-sm mt-6">
                {t('bookingModal.privacyText')}
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}