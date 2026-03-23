import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Phone, MessageCircle, Send, ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src="https://images.unsplash.com/photo-1708805282676-0c15476eb8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZXRhaWxpbmclMjBwb2xpc2hpbmd8ZW58MXx8fHwxNzY3NDUzNTU0fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Car Detailing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-500 text-sm">Премиум детейлинг в Ташкенте</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl mb-6 text-white tracking-tight">
              CARTELLO
            </h1>
            <motion.div
              className="h-1.5 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mb-8 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.p
              className="text-2xl md:text-4xl mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Ваш автомобиль заслуживает{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                лучшего
              </span>
            </motion.p>
            <motion.p
              className="text-lg md:text-xl mb-12 text-zinc-400 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Профессиональная защита и уход за вашим автомобилем. Работаем только с материалами премиум-класса от ведущих немецких, американских и итальянских производителей.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-10 py-7 text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all"
                onClick={scrollToContact}
              >
                Получить консультацию
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white hover:text-zinc-950 px-10 py-7 text-lg backdrop-blur-sm"
                onClick={scrollToContact}
              >
                Рассчитать стоимость
              </Button>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a
                href="tel:+998958350110"
                className="flex items-center gap-3 hover:text-orange-500 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg">95 835 01 10</span>
              </a>
              <a
                href="https://wa.me/998958350110"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-orange-500 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-lg">WhatsApp</span>
              </a>
              <a
                href="https://t.me/Cartellouz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-orange-500 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-lg">Telegram</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="container mx-auto px-4 py-10">
          <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              <div className="text-center group cursor-pointer">
                <motion.div
                  className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  700+
                </motion.div>
                <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">Обслужено автомобилей</div>
              </div>
              <div className="text-center group cursor-pointer">
                <motion.div
                  className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  2+
                </motion.div>
                <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">Года на рынке</div>
              </div>
              <div className="text-center group cursor-pointer">
                <motion.div
                  className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  10+
                </motion.div>
                <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">Видов услуг</div>
              </div>
              <div className="text-center group cursor-pointer">
                <motion.div
                  className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  100%
                </motion.div>
                <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">Гарантия качества</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/60 hover:text-white transition-colors"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}