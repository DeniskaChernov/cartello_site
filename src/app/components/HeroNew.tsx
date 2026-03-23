import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Phone, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { SITE_IMAGES } from "../../lib/siteImages";

const logo = SITE_IMAGES.logoWide;
const polishingImage = SITE_IMAGES.polishing;
const ceramicImage = SITE_IMAGES.ceramic;
const ppfImage = SITE_IMAGES.ppf;
const interiorCleaningImage = SITE_IMAGES.interiorCleaning;
const tintingImage = SITE_IMAGES.tinting;
const pdrImage = SITE_IMAGES.pdr;
const detailingWashImage = SITE_IMAGES.detailingWash;
const windshieldImage = SITE_IMAGES.windshield;

const heroSlides = [
  polishingImage,
  ppfImage,
  tintingImage,
  ceramicImage,
  interiorCleaningImage,
  pdrImage,
  detailingWashImage,
  windshieldImage,
];

export function HeroNew() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 250], [1, 0]);
  const statsOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const { t } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-20" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-26"
        style={{
          background: "radial-gradient(circle, #880000 0%, transparent 70%)",
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-red-900/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-red-800/20 to-transparent rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: y1, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <img
                src={logo}
                alt="Cartello Detailing Centre"
                className="w-full max-w-[280px] sm:max-w-[390px] md:max-w-[650px] h-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8 space-y-4"
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 font-light">
                {t("hero.title")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button
                onClick={scrollToContact}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-2xl font-semibold overflow-hidden shadow-2xl shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("hero.bookNow")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <a
                href="tel:+998958350110"
                className="group px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 text-white rounded-2xl font-semibold hover:bg-white/10 hover:border-cartello-beige/30 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Phone className="w-5 h-5 text-cartello-beige" />
                95 835 01 10
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: y2 }}
            className="relative lg:h-[600px] h-[400px]"
          >
            <div className="relative w-full h-full">

              {/* Main Image Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[80%] h-[70%] rounded-3xl overflow-hidden glass-dark border-zinc-800 bg-zinc-900 shadow-2xl"
                style={{ opacity }}
              >
                <div className="relative w-full h-full">
                  {/* Crossfade slider — no darkening */}
                  <AnimatePresence>
                    <motion.img
                      key={currentSlide}
                      src={heroSlides[currentSlide]}
                      alt="Cartello Detailing"
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  </AnimatePresence>

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </motion.div>

              {/* Rating Badge */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-20 left-10 p-4 rounded-xl glass backdrop-blur-2xl border-zinc-700"
                style={{ opacity }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-cartello-beige mb-1">5.0</div>
                  <div className="text-xs text-zinc-400">⭐⭐⭐⭐⭐</div>
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute bottom-8 left-[60%] -translate-x-1/2 p-4 sm:p-5 md:p-6 rounded-2xl glass backdrop-blur-2xl border-zinc-700 shadow-2xl w-[90%] sm:w-auto max-w-sm"
                style={{ opacity: statsOpacity }}
              >
                <div className="grid grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {[
                    { value: "700+", label: t("hero.clients") },
                    { value: "40+", label: t("hero.services") },
                    { value: "100%", label: t("hero.guarantee") },
                  ].map((stat, i) => (
                    <div key={i} className="text-center min-w-0 flex flex-col items-center">
                      <div className="text-xl sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cartello-beige to-cartello-beige-light mb-1 overflow-visible leading-none py-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-zinc-400 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-red-900 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
