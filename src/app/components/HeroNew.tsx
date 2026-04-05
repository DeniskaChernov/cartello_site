import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Phone, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { SITE_IMAGES } from "../../lib/siteImages";
import { useLightMotion } from "../../lib/useLightMotion";

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
  const lightMotion = useLightMotion();
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
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  /** Предзагрузка следующего кадра слайдера — меньше рывков при смене */
  useEffect(() => {
    const next = (currentSlide + 1) % heroSlides.length;
    const img = new Image();
    img.src = heroSlides[next];
  }, [currentSlide]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[100dvh] min-h-screen overflow-x-clip pt-20"
      ref={containerRef}
      style={{
        paddingBottom: "max(6rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Орб за курсором — только md+, на телефоне убирает лишний слой и артефакты */}
      <motion.div
        className="pointer-events-none hidden md:block absolute w-[min(100vw,800px)] h-[min(100vw,800px)] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-20 md:opacity-26"
        style={{
          background: "radial-gradient(circle, #880000 0%, transparent 70%)",
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
      />
      <div className="pointer-events-none absolute top-0 right-0 hidden h-[min(100vw,600px)] w-[min(100vw,600px)] bg-gradient-to-br from-red-900/20 to-transparent blur-3xl md:block" />
      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-[min(100vw,500px)] w-[min(100vw,500px)] bg-gradient-to-tr from-red-800/20 to-transparent blur-3xl md:block" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1400px] flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-10 pt-6 sm:gap-12 sm:pt-10 lg:grid-cols-2 lg:gap-14 lg:pt-12 xl:gap-16">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: lightMotion ? 0 : y1, opacity: lightMotion ? 1 : opacity }}
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
              <h1 className="text-balance text-center text-lg font-light leading-snug text-zinc-300 sm:text-left sm:text-xl md:text-2xl lg:text-3xl">
                {t("hero.title")}
              </h1>
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
                className="group relative min-h-[48px] w-full appearance-none overflow-hidden rounded-2xl bg-gradient-to-r from-red-900 to-red-800 px-6 py-3.5 text-base font-semibold text-white shadow-2xl shadow-red-900/30 transition-[box-shadow] duration-300 hover:shadow-red-900/50 sm:w-auto sm:px-8 sm:py-4"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("hero.bookNow")}
                  <ArrowRight className="h-5 w-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-800 to-red-700 opacity-0 transition-opacity group-hover:opacity-100" />
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

          {/* Right Side — слайдер + статистика внизу карточки (как в первой версии) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: lightMotion ? 0 : y2 }}
            className="relative mx-auto w-full max-w-lg min-h-0 lg:max-w-none lg:mx-0 lg:min-h-[min(560px,90vh)] lg:max-h-[min(90vh,640px)]"
          >
            <div className="flex min-h-0 w-full flex-col items-end gap-4 sm:gap-5 md:gap-6 lg:h-full lg:min-h-[560px]">
              {/* Карточка слайдера + сразу под ней статистика (не прижата к низу колонки) */}
              <motion.div
                animate={lightMotion ? { y: 0 } : { y: [0, -20, 0] }}
                transition={
                  lightMotion
                    ? { duration: 0 }
                    : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative aspect-[4/3] min-h-[11rem] w-[88%] max-w-[420px] shrink-0 overflow-hidden rounded-2xl border-zinc-800 bg-zinc-900 shadow-2xl glass-dark sm:min-h-[13rem] sm:w-[80%] sm:max-w-none sm:rounded-3xl md:aspect-[16/10] lg:aspect-auto lg:h-[min(52vh,420px)] lg:min-h-[280px] lg:max-h-[70%]"
                style={{ opacity: lightMotion ? 1 : opacity }}
              >
                <div className="relative h-full w-full">
                  <AnimatePresence>
                    <motion.img
                      key={currentSlide}
                      src={heroSlides[currentSlide]}
                      alt="Cartello Detailing"
                      className="absolute inset-0 h-full w-full object-cover"
                      sizes="(max-width: 1024px) min(88vw, 420px) 420px"
                      decoding="async"
                      fetchPriority={currentSlide === 0 ? "high" : "low"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.65, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <motion.div
                  animate={lightMotion ? { y: 0 } : { y: [0, -15, 0] }}
                  transition={
                    lightMotion
                      ? { duration: 0 }
                      : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }
                  className="absolute left-2 top-10 z-[5] rounded-xl border border-zinc-700 bg-zinc-900/40 p-2.5 backdrop-blur-2xl sm:left-6 sm:top-16 sm:p-3 md:left-10 md:top-20 md:p-4"
                  style={{ opacity: lightMotion ? 1 : opacity }}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-cartello-beige sm:text-xl md:text-2xl">5.0</div>
                    <div className="mt-0.5 text-[10px] leading-none text-zinc-400 sm:text-xs">⭐⭐⭐⭐⭐</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative z-0 w-[88%] max-w-[420px] shrink-0 bg-transparent px-1 py-0 sm:w-[80%] sm:max-w-none sm:px-2 md:px-3"
                style={{ opacity: lightMotion ? 1 : statsOpacity }}
              >
                <div className="flex w-full flex-nowrap items-start justify-center gap-x-3 min-[360px]:gap-x-4 sm:gap-x-5 md:gap-x-6">
                  {[
                    { value: "700+", label: t("hero.clients") },
                    { value: "40+", label: t("hero.services") },
                    { value: "100%", label: t("hero.guarantee") },
                  ].map((stat, i) => (
                    <div key={i} className="flex min-w-0 shrink flex-col items-center justify-center px-1 text-center">
                      <div className="bg-gradient-to-r from-cartello-beige to-cartello-beige-light bg-clip-text text-[clamp(1rem,4.2vw,1.65rem)] font-bold leading-none text-transparent sm:text-2xl md:text-[1.75rem] lg:text-3xl">
                        {stat.value}
                      </div>
                      <div
                        className="hero-stat-label mt-1 max-w-[11rem] text-[10px] leading-tight text-zinc-400 min-[360px]:text-[11px] sm:mt-1.5 sm:max-w-none sm:text-xs md:text-sm"
                        lang="ru"
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator — safe-area снизу, не перекрывает контент */}
      <motion.div
        className="absolute left-1/2 z-20 -translate-x-1/2 max-sm:bottom-[max(5.5rem,env(safe-area-inset-bottom,0px))] bottom-[max(2rem,env(safe-area-inset-bottom,0px))] sm:bottom-10"
        animate={lightMotion ? { y: 0 } : { y: [0, 10, 0] }}
        transition={lightMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
        aria-hidden
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-zinc-700 p-2">
          <motion.div
            className="h-2 w-1 rounded-full bg-red-900"
            animate={lightMotion ? { y: 0 } : { y: [0, 12, 0] }}
            transition={lightMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
