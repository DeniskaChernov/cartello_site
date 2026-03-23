import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Coffee, Wifi, Monitor, Battery, Cigarette, CheckCircle } from "lucide-react";

const amenities = [
  {
    icon: Coffee,
    title: "Вкусный кофе",
    description: "Свежесваренный кофе всегда к вашим услугам",
  },
  {
    icon: Coffee,
    title: "Премиум чай",
    description: "5 видов премиум чая на выбор",
  },
  {
    icon: Wifi,
    title: "Бесплатный Wi-Fi",
    description: "Высокоскоростной интернет",
  },
  {
    icon: Monitor,
    title: "Онлайн трансляция",
    description: "ТВ с онлайн трансляцией с камер видеонаблюдения",
  },
  {
    icon: Battery,
    title: "Зарядка устройств",
    description: "Зарядные устройства и power bank-и",
  },
  {
    icon: Cigarette,
    title: "Табачная продукция",
    description: "Бокс с табачной продукцией",
  },
];

export function ComfortZone() {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Зона комфорта
          </h2>
          <div className="h-1 w-24 bg-orange-500 mx-auto mb-6" />
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Пока ваш автомобиль в работе, наслаждайтесь комфортной зоной ожидания
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-zinc-800 border-zinc-700 p-6 text-center hover:border-orange-500 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-lg text-white mb-2">{amenity.title}</h3>
                  <p className="text-sm text-zinc-400">{amenity.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Highlight Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0 p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-10 h-10 text-white" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl mb-3 text-white">
                    Наблюдайте за процессом в реальном времени
                  </h3>
                  <p className="text-lg text-orange-100">
                    В зоне ожидания установлен телевизор с онлайн трансляцией с камер видеонаблюдения. 
                    Вы можете наблюдать за работой над вашим автомобилем в режиме реального времени, 
                    не покидая комфортной зоны отдыха.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
