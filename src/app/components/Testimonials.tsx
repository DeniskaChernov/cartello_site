import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Алишер М.",
    car: "Mercedes-Benz S-Class",
    rating: 5,
    text: "Делал полировку и керамику на свой Mercedes. Результат превзошёл все ожидания! Машина выглядит как новая. Ребята профессионалы своего дела, все объяснили, показали материалы. Зона ожидания на высоте — кофе, Wi-Fi, даже за работой наблюдал онлайн. Рекомендую!",
    date: "2 недели назад",
  },
  {
    name: "Дмитрий К.",
    car: "BMW X5",
    rating: 5,
    text: "Оклеивал весь кузов антигравийной пленкой. Работа заняла 4 дня, но оно того стоило. Качество материалов и работы на высшем уровне. Плюс в подарок сделали ламинацию пластика в салоне — приятный бонус. Цены адекватные, гарантия есть. Буду обращаться ещё.",
    date: "1 месяц назад",
  },
  {
    name: "Равшан Т.",
    car: "Toyota Land Cruiser",
    rating: 5,
    text: "Сделал химчистку салона и детейлинг мойку днища с арками. Салон стал как новый, запахи ушли полностью, озонацию сделали в подарок. Мойка днища тоже порадовала — теперь не переживаю за коррозию. Честные ребята, все прозрачно объяснили, цену не завышали. Спасибо!",
    date: "3 недели назад",
  },
  {
    name: "Сергей П.",
    car: "Lexus RX",
    rating: 5,
    text: "Обратился за тонировкой. Работу выполнили за день, качество отличное — никаких пузырей, все ровно. Материалы использовали сертифицированные, показали документы. Мастера вежливые, все объяснили про уход. Цена справедливая. Очень доволен!",
    date: "2 месяца назад",
  },
  {
    name: "Азиз Ш.",
    car: "Audi A6",
    rating: 5,
    text: "Делал комплекс: полировка + керамика + химчистка. Получил скидку на комплекс, что приятно удивило. Результат шикарный — машина сияет! В зоне ожидания было комфортно, чай, кофе, можно было наблюдать за работой на экране. Профессионально и качественно. Советую всем!",
    date: "1 месяц назад",
  },
  {
    name: "Владимир Н.",
    car: "Range Rover Sport",
    rating: 5,
    text: "Впервые делал детейлинг мойку подкапотного пространства. Думал, что это лишнее, но теперь понимаю, как это важно. Под капотом чисто, красиво, механикам теперь удобно работать. Ребята работают качественно, материалы хорошие, немецкая химия. Гарантию дали. Рекомендую!",
    date: "3 недели назад",
  },
];

export function Testimonials() {
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
            Отзывы клиентов
          </h2>
          <div className="h-1 w-24 bg-orange-500 mx-auto mb-6" />
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Более 700 довольных клиентов доверили нам свои автомобили
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-zinc-800 border-zinc-700 p-6 h-full hover:border-orange-500 transition-colors relative">
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-12 h-12 text-orange-500" />
                </div>

                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-orange-500 text-orange-500"
                      />
                    ))}
                  </div>

                  <p className="text-zinc-300 mb-6 italic">
                    "{testimonial.text}"
                  </p>

                  <div className="pt-4 border-t border-zinc-700">
                    <div className="text-white mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-zinc-400 mb-1">
                      {testimonial.car}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {testimonial.date}
                    </div>
                  </div>
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
          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0 p-8 inline-block">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              <div className="text-white text-center sm:text-left">
                <div className="text-3xl mb-1">4.9 / 5.0</div>
                <div className="text-orange-100">
                  Средняя оценка от наших клиентов
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
