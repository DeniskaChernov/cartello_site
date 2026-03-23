import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Gift, Percent, Star } from "lucide-react";

const offers = [
  {
    icon: Percent,
    title: "Скидка 12% на комплекс",
    description: "Детейлинг мойка арок + днища + подкапотного пространства",
    badge: "Выгода до 300 000 сум",
    color: "orange",
  },
  {
    icon: Gift,
    title: "Подарок при оклейке кузова",
    description: "При оклейке всего кузова — защита пластиковых элементов салона ламинацией в подарок",
    badge: "Экономия до 500 000 сум",
    color: "blue",
  },
  {
    icon: Star,
    title: "Озонация в подарок",
    description: "При химчистке салона — озонация салона в подарок",
    badge: "Бесплатно",
    color: "green",
  },
];

const leadMagnets = [
  "Бесплатная диагностика ЛКП",
  "Бесплатная консультация специалиста",
  "Бесплатный осмотр автомобиля",
  "Прозрачный расчет стоимости за 2 минуты",
];

export function SpecialOffers() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-40 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
            <span className="text-orange-500 text-sm">Выгодные предложения</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl mb-6 text-white">
            Специальные предложения
          </h2>
          <motion.div 
            className="h-1.5 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Выгодные пакеты услуг и акции для наших клиентов
          </p>
        </motion.div>

        {/* Акции */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 p-8 h-full hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 relative overflow-hidden group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-0 right-0 m-4">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-4 py-2 rounded-full shadow-lg">
                    {offer.badge}
                  </div>
                </div>
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <offer.icon className="w-10 h-10 text-orange-500" />
                  </div>
                  <h3 className="text-2xl text-white mb-4 group-hover:text-orange-500 transition-colors">{offer.title}</h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">{offer.description}</p>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all"
                    onClick={scrollToContact}
                  >
                    Воспользоваться
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Лид-магниты */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-600 border-0 p-10 md:p-16 overflow-hidden relative">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-4xl md:text-5xl mb-6 text-white">
                  Бесплатно для всех клиентов
                </h3>
                <p className="text-xl text-orange-50">
                  Получите профессиональную консультацию и оценку без обязательств
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {leadMagnets.map((magnet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/15 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/25 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/25 flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white">{magnet}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-zinc-100 px-12 py-7 text-lg shadow-2xl hover:shadow-white/20 transition-all"
                  onClick={scrollToContact}
                >
                  Записаться на бесплатную консультацию
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}