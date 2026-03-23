import { motion } from "motion/react";
import { Sparkles, ArrowRight, MoveHorizontal } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

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

export function GalleryNew() {
  const [sliderPositions, setSliderPositions] = useState<SliderPositions>({});
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const draggingIndexRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize all sliders at 50%
    const initial: SliderPositions = {};
    galleryItems.forEach((_, index) => {
      initial[index] = 50;
    });
    setSliderPositions(initial);
  }, []);

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
    <section id="gallery" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white mb-6"
          >
            Наши работы —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cartello-beige to-cartello-beige-light">
              впечатляющая трансформация
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-zinc-400"
          >
            Перетащите ползунок, чтобы увидеть трансформацию
          </motion.p>
        </div>

        {/* Masonry Grid */}
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
                    <span className="text-sm text-white font-medium">До</span>
                  </div>
                  <div className="px-4 py-2 rounded-full glass-dark backdrop-blur-xl border-zinc-700">
                    <span className="text-sm text-white font-medium">После</span>
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
              Больше работ в нашем Instagram
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
      </div>
    </section>
  );
}