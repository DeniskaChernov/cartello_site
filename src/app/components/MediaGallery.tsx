import { motion } from "motion/react";
import { Play, Instagram, ExternalLink, ArrowRight, MoveHorizontal, Sparkles } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { SITE_IMAGES } from "../../lib/siteImages";

export function MediaGallery() {
  const [activeTab, setActiveTab] = useState<"videos" | "gallery">("videos");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  
  // Gallery states
  const [sliderPositions, setSliderPositions] = useState<SliderPositions>({});
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const draggingIndexRef = useRef<number | null>(null);

  const { t } = useLanguage();

  const reels = [
    {
      id: 1,
      thumbnail: SITE_IMAGES.videoReel1,
      title: "Авлт 12 — полная оклейка PPF",
      subtitle: "Кузов + панорама + лобовое",
      tag: "PPF защита",
      link: "https://www.instagram.com/reel/C_vQzMKorOK/",
    },
    {
      id: 2,
      thumbnail: SITE_IMAGES.videoReel2,
      title: "G63 на СПА процедурах",
      subtitle: "Cartello — нам доверяют",
      tag: "Детейлинг",
      link: "https://www.instagram.com/reel/C-ufS5HoXbn/",
    },
    {
      id: 3,
      thumbnail: SITE_IMAGES.videoReel3,
      title: "Mercedes GLE 450",
      subtitle: "Качество и доверие",
      tag: "Полировка",
      link: "https://www.instagram.com/reel/C9hs5VUoUYe/",
    },
    {
      id: 4,
      thumbnail: SITE_IMAGES.videoReel4,
      title: "BMW i5 — комплекс услуг",
      subtitle: "С душой к каждому автомобилю",
      tag: "Комплекс",
      link: "https://www.instagram.com/reel/C8oQm7RoqMM/",
    },
    {
      id: 5,
      thumbnail: SITE_IMAGES.videoReel5,
      title: "Антигравийная защита",
      subtitle: "Своевременная защита кузова",
      tag: "Антигравий",
      link: "https://www.instagram.com/reel/C87O77Co3mP/",
    },
  ];

  // Gallery data
  const galleryItems = [
    {
      before: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800",
      after: "https://images.unsplash.com/photo-1708805282676-0c15476eb8a2?w=800",
      title: "Mercedes-Benz S-Class",
      service: "Полировка + Керамика",
      featured: true,
    },
    {
      before: "https://images.unsplash.com/photo-1552519507-b4a90ae729eb?w=800",
      after: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
      title: "BMW X5",
      service: "PPF оклейка",
    },
    {
      before: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800",
      after: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800",
      title: "Audi A8",
      service: "Химчистка салона",
    },
    {
      before: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      after: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800",
      title: "Porsche Cayenne",
      service: "Тонировка стекол",
    },
    {
      before: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",
      after: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800",
      title: "Range Rover",
      service: "Полная защита",
    },
  ];

interface SliderPositions {
  [key: number]: number;
}

  // Video carousel width calculation
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const offsetWidth = carouselRef.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth + 48);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    const timeout = setTimeout(updateWidth, 500);
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timeout);
    };
  }, [activeTab]);

  // Gallery slider initialization
  useEffect(() => {
    const initial: SliderPositions = {};
    galleryItems.forEach((_, index) => {
      initial[index] = 50;
    });
    setSliderPositions(initial);
  }, []);

  // Gallery slider handlers
  const handleMouseDown = (index: number) => {
    setDraggingIndex(index);
    draggingIndexRef.current = index;
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingIndexRef.current === null) return;

    const container = containerRefs.current[draggingIndexRef.current];
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    setSliderPositions((prev) => ({
      ...prev,
      [draggingIndexRef.current!]: percentage,
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setDraggingIndex(null);
    draggingIndexRef.current = null;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (draggingIndexRef.current === null) return;

    const container = containerRefs.current[draggingIndexRef.current];
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    setSliderPositions((prev) => ({
      ...prev,
      [draggingIndexRef.current!]: percentage,
    }));
  }, []);

  useEffect(() => {
    if (draggingIndex !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [draggingIndex, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section id="media" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-zinc-400 mb-8 px-4"
          >
            {t("mediaGallery.header")}
          </motion.p>
        </div>

        {/* Content */}
        <div className="relative min-h-[500px]">
          {/* Videos Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              ref={carouselRef}
              className="relative cursor-grab active:cursor-grabbing overflow-hidden -mx-4 px-4 md:-mx-8 md:px-8"
            >
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                whileTap={{ cursor: "grabbing" }}
                className="flex gap-5 relative select-none"
              >
                {reels.map((reel, index) => (
                  <motion.div
                    key={reel.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex-shrink-0 w-[240px] md:w-[280px]"
                    style={{ aspectRatio: "9/16" }}
                  >
                    <a
                      href={reel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      draggable={false}
                      onClick={(e) => e.stopPropagation()}
                      className="group block w-full h-full rounded-2xl overflow-hidden relative border border-white/8"
                      style={{ background: "#0d0404" }}
                    >
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/95 pointer-events-none" />

                      {/* Top tag + IG icon */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span
                          className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(136,0,0,0.75)",
                            color: "#AE7528",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(174,117,40,0.2)",
                          }}
                        >
                          {reel.tag}
                        </span>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                          }}
                        >
                          <Instagram className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Center play */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: "rgba(136,0,0,0.85)",
                            border: "2px solid rgba(174,117,40,0.4)",
                            backdropFilter: "blur(8px)",
                            boxShadow: "0 0 40px rgba(136,0,0,0.5)",
                          }}
                        >
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Bottom info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <h3 className="text-white font-bold text-sm leading-tight mb-1 drop-shadow-md">
                          {reel.title}
                        </h3>
                        <p className="text-zinc-400 text-xs mb-3 leading-snug">{reel.subtitle}</p>
                        <div
                          className="flex items-center justify-between rounded-xl px-3 py-2 transition-all duration-300 group-hover:brightness-110"
                          style={{
                            background: "rgba(136,0,0,0.6)",
                            border: "1px solid rgba(174,117,40,0.15)",
                            backdropFilter: "blur(12px)",
                          }}
                        >
                          <span className="text-xs font-semibold text-[#AE7528] tracking-wide">
                            Смотреть рилс
                          </span>
                          <ExternalLink className="w-3 h-3 text-[#AE7528]" />
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Gallery Tab Content */}
          {activeTab === "gallery" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {galleryItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      relative group
                      ${item.featured ? "lg:col-span-2 lg:row-span-2" : ""}
                    `}
                  >
                    {/* Card Container */}
                    <div
                      ref={(el) => (containerRefs.current[index] = el)}
                      className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 h-full min-h-[400px] select-none"
                    >
                      {/* Image Container */}
                      <div className="absolute inset-0">
                        {/* Before Image */}
                        <img
                          src={item.before}
                          alt={`${item.title} - До`}
                          className="absolute inset-0 w-full h-full object-cover"
                          draggable={false}
                        />

                        {/* After Image with Clip Path */}
                        <div
                          className="absolute inset-0"
                          style={{
                            clipPath: `inset(0 ${100 - (sliderPositions[index] || 50)}% 0 0)`,
                          }}
                        >
                          <img
                            src={item.after}
                            alt={`${item.title} - После`}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </div>

                      {/* Slider Line */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white/30 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.3)] z-30 cursor-ew-resize"
                        style={{ left: `${sliderPositions[index] || 50}%` }}
                        onMouseDown={() => handleMouseDown(index)}
                        onTouchStart={() => handleMouseDown(index)}
                      >
                        {/* Slider Handle */}
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full glass backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-2xl cursor-ew-resize">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center shadow-lg">
                            <MoveHorizontal className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Labels */}
                      <div className="absolute top-6 left-6 right-6 flex justify-between z-20 pointer-events-none">
                        <div className="px-4 py-2 rounded-full glass-dark backdrop-blur-xl border-zinc-700">
                          <span className="text-sm text-white font-medium">{t('mediaGallery.before')}</span>
                        </div>
                        <div className="px-4 py-2 rounded-full glass-dark backdrop-blur-xl border-zinc-700">
                          <span className="text-sm text-white font-medium">{t('mediaGallery.after')}</span>
                        </div>
                      </div>

                      {/* Info Card */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 pointer-events-none">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          className="glass-dark backdrop-blur-xl rounded-2xl p-6 border-zinc-800"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className={`text-white font-bold mb-2 ${item.featured ? 'text-3xl' : 'text-2xl'}`}>
                                {item.title}
                              </h3>
                              <p className={`text-cartello-beige ${item.featured ? 'text-base' : 'text-sm'}`}>
                                {item.service}
                              </p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-red-900/20 flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-cartello-beige" />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Instagram CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 text-center"
              >
                <div className="inline-block p-8 rounded-3xl glass border-zinc-800">
                  <p className="text-xl text-zinc-300 mb-4">
                    {t('mediaGallery.moreWorks')}
                  </p>
                  <a
                    href="https://instagram.com/cartello.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-2xl font-semibold hover:scale-105 transition-transform"
                  >
                    @cartello.uz
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}