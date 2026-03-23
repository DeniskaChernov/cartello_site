import { motion } from "motion/react";
import { Play, Instagram, ExternalLink } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const reels = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1674632917668-6237bad1347d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    title: "Авлт 12 — полная оклейка PPF",
    subtitle: "Кузов + панорама + лобовое",
    tag: "PPF защита",
    link: "https://www.instagram.com/reel/C_vQzMKorOK/",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1753722928860-3b79d1f7aaca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    title: "G63 на СПА процедурах",
    subtitle: "Cartello — нам доверяют",
    tag: "Детейлинг",
    link: "https://www.instagram.com/reel/C-ufS5HoXbn/",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1629055666341-5e505c77d49b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    title: "Mercedes GLE 450",
    subtitle: "Качество и доверие",
    tag: "Полировка",
    link: "https://www.instagram.com/reel/C9hs5VUoUYe/",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1759428132279-ce620fa51047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    title: "BMW i5 — комплекс услуг",
    subtitle: "С душой к каждому автомобилю",
    tag: "Комплекс",
    link: "https://www.instagram.com/reel/C8oQm7RoqMM/",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1711512972494-09b38ed4916f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    title: "Антигравийная защита",
    subtitle: "Своевременная защита кузова",
    tag: "Антигравий",
    link: "https://www.instagram.com/reel/C87O77Co3mP/",
  },
];

export function VideoSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth + 48);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    const timeout = setTimeout(updateWidth, 500);
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="video" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ backgroundColor: "#100000" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-[#830E10]/40 bg-[#830E10]/10"
          >
            <Instagram className="w-4 h-4 text-[#DBC19F]" />
            <span className="text-sm font-medium text-[#DBC19F] tracking-widest uppercase">
              @cartello.uz
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t("videoSection.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBC19F] to-[#e8d5b5]">
              {t("videoSection.titleHighlight")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-400"
          >
            {t("videoSection.subtitle")}
          </motion.p>
        </div>

        {/* Reels Carousel */}
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
                className="relative flex-shrink-0 w-[260px] md:w-[300px]"
                style={{ aspectRatio: "9/16" }}
              >
                {/* Card */}
                <a
                  href={reel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onClick={(e) => e.stopPropagation()}
                  className="group block w-full h-full rounded-2xl overflow-hidden relative border border-white/8"
                  style={{ background: "#0d0404" }}
                >
                  {/* Thumbnail */}
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                    draggable={false}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/95 pointer-events-none" />

                  {/* Top — tag + Instagram icon */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span
                      className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(131,14,16,0.75)",
                        color: "#DBC19F",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(219,193,159,0.2)",
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

                  {/* Center — play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(131,14,16,0.85)",
                        border: "2px solid rgba(219,193,159,0.4)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 0 40px rgba(131,14,16,0.5)",
                      }}
                    >
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Bottom — title + CTA */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <h3 className="text-white font-bold text-base leading-tight mb-1 drop-shadow-md">
                      {reel.title}
                    </h3>
                    <p className="text-zinc-400 text-xs mb-4 leading-snug">{reel.subtitle}</p>

                    <div
                      className="flex items-center justify-between rounded-xl px-4 py-2.5 transition-all duration-300 group-hover:brightness-110"
                      style={{
                        background: "rgba(131,14,16,0.6)",
                        border: "1px solid rgba(219,193,159,0.15)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <span className="text-xs font-semibold text-[#DBC19F] tracking-wide">
                        Смотреть рилс
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#DBC19F]" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Drag hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-zinc-600 text-sm mt-8 tracking-wide"
        >
          ← листайте →
        </motion.p>
      </div>
    </section>
  );
}
