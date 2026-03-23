import { motion } from "motion/react";
import { Card } from "./ui/card";
import { useState } from "react";

const galleryImages = [
  {
    before: "https://images.unsplash.com/photo-1708805282676-0c15476eb8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZXRhaWxpbmclMjBwb2xpc2hpbmd8ZW58MXx8fHwxNzY3NDUzNTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    after: "https://images.unsplash.com/photo-1572359249699-5ced96364f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBjZXJhbWljJTIwY29hdGluZ3xlbnwxfHx8fDE3Njc0NDk1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Полировка и керамика",
    description: "Восстановление блеска и защита кузова",
  },
  {
    before: "https://images.unsplash.com/photo-1765603712436-fd067ff74f70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBpbnRlcmlvciUyMGNsZWFuaW5nfGVufDF8fHx8MTc2NzQ1MzU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    after: "https://images.unsplash.com/photo-1760827797819-4361cd5cd353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYXIlMjB3YXNofGVufDF8fHx8MTc2NzQ1MzU1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Химчистка салона",
    description: "Глубокая очистка и свежесть",
  },
  {
    before: "https://images.unsplash.com/photo-1606235994317-b517abfd89cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBwYWludCUyMHByb3RlY3Rpb24lMjBmaWxtfGVufDF8fHx8MTc2NzQyMjY5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    after: "https://images.unsplash.com/photo-1646531840695-62810bcd1171?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3aW5kb3clMjB0aW50aW5nfGVufDF8fHx8MTc2NzQ1MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Антигравийная пленка",
    description: "Надежная защита от повреждений",
  },
];

export function Gallery() {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const toggleImage = (index: number) => {
    setActiveIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6"
          >
            <span className="text-orange-500 text-sm">Портфолио работ</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl mb-6 text-white">
            Наши работы
          </h2>
          <motion.div
            className="h-1.5 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Результаты до и после — убедитесь в качестве наших работ
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 overflow-hidden hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group">
                <div
                  className="relative aspect-video cursor-pointer overflow-hidden"
                  onClick={() => toggleImage(index)}
                >
                  <motion.img
                    src={
                      activeIndexes.includes(index) ? item.after : item.before
                    }
                    alt={item.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-zinc-900/90 backdrop-blur-md rounded-xl px-4 py-3 text-center border border-zinc-700/50 group-hover:border-orange-500/50 transition-colors">
                      <span className="text-white">
                        {activeIndexes.includes(index) ? "✨ После" : "📸 До"}
                      </span>
                    </div>
                  </div>

                  {/* Hint Badge */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-2 rounded-full shadow-lg">
                      Нажмите
                    </div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-white mb-2 group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">{item.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700">
            <p className="text-zinc-300 mb-3">
              Хотите увидеть больше работ? Следите за нами в Instagram
            </p>
            <a
              href="https://instagram.com/cartello.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-400 transition-colors text-lg"
            >
              @cartello.uz
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}