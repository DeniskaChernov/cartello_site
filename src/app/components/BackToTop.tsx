import { motion, useScroll, useTransform } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
      }}
      className={`fixed bottom-8 left-8 z-40 w-14 h-14 rounded-full bg-zinc-900 border-2 border-zinc-800 hover:border-red-900 flex items-center justify-center transition-all shadow-2xl group ${
        !isVisible && "pointer-events-none"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ChevronUp className="w-6 h-6 text-zinc-400 group-hover:text-cartello-beige transition-colors" />
    </motion.button>
  );
}