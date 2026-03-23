import { motion } from "motion/react";
import { Card } from "./ui/card";
import {
  Phone,
  CalendarCheck,
  ClipboardList,
  Wrench,
  CheckCircle,
  Car,
} from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Связь с нами",
    description:
      "Позвоните, напишите в WhatsApp или Telegram. Опишите свои задачи и получите первичную консультацию.",
  },
  {
    icon: CalendarCheck,
    title: "Запись на удобное время",
    description:
      "Выбираете удобную дату и время. Предоплата не требуется, достаточно предварительной записи.",
  },
  {
    icon: ClipboardList,
    title: "Осмотр и диагностика",
    description:
      "Бесплатный осмотр автомобиля, диагностика состояния и точный расчет стоимости работ.",
  },
  {
    icon: Wrench,
    title: "Выполнение работ",
    description:
      "Профессиональное выполнение всех работ с использованием качественных материалов. Можете наблюдать онлайн.",
  },
  {
    icon: CheckCircle,
    title: "Приемка и гарантия",
    description:
      "Совместная приемка результата. Получаете гарантию на все выполненные работы.",
  },
  {
    icon: Car,
    title: "Забираете автомобиль",
    description:
      "Забираете автомобиль или заказываете доставку на эвакуаторе. Получаете рекомендации по уходу.",
  },
];

export function Process() {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Как мы работаем
          </h2>
          <div className="h-1 w-24 bg-orange-500 mx-auto mb-6" />
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Простой и прозрачный процесс от записи до получения результата
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="bg-zinc-900 border-zinc-800 p-8 h-full hover:border-orange-500 transition-colors">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl z-10">
                    {index + 1}
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 mt-2">
                    <step.icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-xl text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-400">{step.description}</p>
                </Card>

                {/* Connector Line (hidden on mobile, shown on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-orange-500/30 z-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h4 className="text-lg text-white mb-4">
                Время выполнения работ
              </h4>
              <p className="text-zinc-400">
                Зависит от типа и объема услуг. Автомобиль можно оставить на
                ночь при необходимости. Точные сроки обсуждаются при записи.
              </p>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h4 className="text-lg text-white mb-4">
                Доставка автомобиля
              </h4>
              <p className="text-zinc-400">
                По желанию организуем загрузку и доставку автомобиля на
                эвакуаторе. Требуются контактные данные ответственного лица и
                адрес.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
