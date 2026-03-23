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
  /** Мягче и дольше, чем раньше [0,250], чтобы на мобильных успели прочитать блок */
  const opacity = useTransform(scrollY, [0, 320, 720], [1, 0.45, 0]);
  /** Статистика остаётся читаемой: полная непрозрачность до ~600px прокрутки, затем плавное исчезновение */
  const statsOpacity = useTransform(scrollY, [0, 600, 1100], [1, 1, 0]);
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
    <section
      className="relative min-h-[100dvh] min-h-screen overflow-x-hidden overflow-y-visible pt-20"
      ref={containerRef}
      style={{
        paddingBottom: "max(6rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated Gradient Orbs — на мобильных без тяжёлого spring от курсора */}
      <motion.div
        className="pointer-events-none absolute w-[min(100vw,800px)] h-[min(100vw,800px)] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-20 md:opacity-26"
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
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1400px] flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-10 pt-6 sm:gap-12 sm:pt-10 lg:grid-cols-2 lg:gap-14 lg:pt-12 xl:gap-16">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: y1, opacity }}
            className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <img
                src={logo}
                alt="Cartello Detailing Centre"
                className="mx-auto h-auto w-full max-w-[min(92vw,280px)] object-contain sm:mx-0 sm:max-w-[min(90vw,390px)] md:max-w-[min(95vw,650px)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6 space-y-3 sm:mb-8 sm:space-y-4"
            >
              <p className="text-balance text-center text-lg font-light leading-snug text-zinc-300 sm:text-left sm:text-xl md:text-2xl lg:text-3xl">
                {t("hero.title")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <button
                type="button"
                onClick={scrollToContact}
                className="group relative min-h-[48px] w-full rounded-2xl bg-gradient-to-r from-red-900 to-red-800 px-6 py-3.5 text-base font-semibold text-white shadow-2xl shadow-red-900/30 transition-all duration-300 hover:shadow-red-900/50 sm:w-auto sm:px-8 sm:py-4"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("hero.bookNow")}
                  <ArrowRight className="h-5 w-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-700 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              <a
                href="tel:+998958350110"
                className="group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-cartello-beige/30 hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4"
              >
                <Phone className="h-5 w-5 shrink-0 text-cartello-beige" />
                95 835 01 10
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side — карточка со слайдером (статистика вынесена под сетку) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: y2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none lg:mx-0 min-h-[min(65svh,22rem)] h-[min(65svh,22rem)] sm:min-h-[min(62svh,24rem)] sm:h-[min(62svh,24rem)] md:min-h-[28rem] md:h-[28rem] lg:h-[520px] lg:min-h-[500px] lg:max-h-[min(88vh,580px)]"
          >
            <div className="relative h-full min-h-[inherit] w-full">

              {/* Main Image Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-0 h-[68%] min-h-[12rem] w-[88%] max-w-[420px] rounded-2xl sm:h-[70%] sm:min-h-[14rem] sm:max-w-none sm:rounded-3xl md:h-[72%] lg:h-[74%] overflow-hidden glass-dark border-zinc-800 bg-zinc-900 shadow-2xl sm:w-[80%]"
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
                className="absolute left-2 top-10 z-[5] rounded-xl border border-zinc-700 bg-zinc-900/40 p-2.5 backdrop-blur-2xl sm:left-6 sm:top-16 sm:p-3 md:left-10 md:top-20 md:p-4"
                style={{ opacity }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-cartello-beige sm:text-xl md:text-2xl">5.0</div>
                  <div className="mt-0.5 text-[10px] leading-none text-zinc-400 sm:text-xs">⭐⭐⭐⭐⭐</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Статистика — отдельная полоса по центру под колонками (как раньше) */}
        <motion.div
          className="mt-10 flex w-full justify-center px-2 sm:mt-12 lg:mt-14"
          style={{ opacity: statsOpacity }}
        >
          <div className="w-full max-w-[min(100%,40rem)] rounded-full border border-zinc-600/80 bg-zinc-900/70 px-3 py-3 shadow-2xl backdrop-blur-xl sm:px-8 sm:py-4 md:max-w-3xl md:px-10 md:py-5">
            <div className="grid w-full grid-cols-3 gap-x-2 sm:gap-x-6 md:gap-x-10">
              {[
                { value: "700+", label: t("hero.clients") },
                { value: "40+", label: t("hero.services") },
                { value: "100%", label: t("hero.guarantee") },
              ].map((stat, i) => (
                <div key={i} className="flex min-w-0 flex-col items-center justify-center text-center">
                  <div className="text-[clamp(1.1rem,3.5vw,1.875rem)] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-cartello-beige to-cartello-beige-light sm:text-2xl md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[9px] leading-tight text-zinc-400 min-[360px]:text-[10px] sm:mt-1.5 sm:text-xs md:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator — safe-area снизу, не перекрывает контент */}
      <motion.div
        className="absolute left-1/2 z-20 -translate-x-1/2 max-sm:bottom-[max(5.5rem,env(safe-area-inset-bottom,0px))] bottom-[max(2rem,env(safe-area-inset-bottom,0px))] sm:bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-zinc-700 p-2">
          <motion.div
            className="h-2 w-1 rounded-full bg-red-900"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
