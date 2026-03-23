import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Shield, Sparkles, Droplets, Sun } from "lucide-react";

const mainServices = [
  {
    icon: Shield,
    title: "Антигравийная пленка",
    description: "Защита кузова полиуретановой антигравийной плёнкой от сколов, царапин и дорожных реагентов.",
    time: "3-4 дня",
    price: "от 9 600 000 сум",
    image: "https://images.unsplash.com/photo-1606235994317-b517abfd89cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBwYWludCUyMHByb3RlY3Rpb24lMjBmaWxtfGVufDF8fHx8MTc2NzQyMjY5NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Sparkles,
    title: "Полировка кузова",
    description: "Восстановление внешнего вида, удаление царапин и защита лакокрасочного покрытия.",
    time: "1-4 дня",
    price: "от 1 480 000 сум",
    image: "https://images.unsplash.com/photo-1708805282676-0c15476eb8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZXRhaWxpbmclMjBwb2xpc2hpbmd8ZW58MXx8fHwxNzY3NDUzNTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Droplets,
    title: "Химчистка салона",
    description: "Глубокая очистка салона с устранением запахов и защитой материалов.",
    time: "1-3 дня",
    price: "от 1 800 000 сум",
    image: "https://images.unsplash.com/photo-1765603712436-fd067ff74f70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBpbnRlcmlvciUyMGNsZWFuaW5nfGVufDF8fHx8MTc2NzQ1MzU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Sun,
    title: "Тонирование стёкол",
    description: "Защита от солнца и ультрафиолета качественными сертифицированными материалами.",
    time: "8 часов",
    price: "от 1 260 000 сум",
    image: "https://images.unsplash.com/photo-1646531840695-62810bcd1171?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3aW5kb3clMjB0aW50aW5nfGVufDF8fHx8MTc2NzQ1MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function MainServices() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl" />
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
            <span className="text-orange-500 text-sm">Премиум услуги</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl mb-6 text-white">Основные услуги</h2>
          <motion.div 
            className="h-1.5 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Профессиональная защита и уход за вашим автомобилем
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 overflow-hidden h-full flex flex-col group hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-14 h-14 rounded-xl bg-orange-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl text-white mb-4 group-hover:text-orange-500 transition-colors">{service.title}</h3>
                  <p className="text-zinc-400 mb-6 flex-grow leading-relaxed">{service.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-zinc-800/50">
                      <span className="text-zinc-500">Время:</span>
                      <span className="text-white">{service.time}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                      <span className="text-zinc-400">Цена:</span>
                      <span className="text-orange-500">{service.price}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all"
                    onClick={scrollToContact}
                  >
                    Записаться
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}