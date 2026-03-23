import { motion } from "motion/react";
import { Card } from "./ui/card";
import {
  Award,
  Shield,
  Heart,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Качество работ",
    description:
      "Профессиональные мастера с многолетним опытом. Каждая деталь выполняется с особым вниманием к качеству.",
  },
  {
    icon: Sparkles,
    title: "Премиум материалы",
    description:
      "Работаем только с материалами высокого качества от немецких, американских и итальянских производителей.",
  },
  {
    icon: Shield,
    title: "Надежные гарантии",
    description:
      "Предоставляем официальную гарантию на все виды услуг. Работаем только с официальными дистрибьюторами.",
  },
  {
    icon: CheckCircle2,
    title: "Прозрачность и честность",
    description:
      "Понятное ценообразование, детальный расчет стоимости и никаких скрытых платежей.",
  },
  {
    icon: Heart,
    title: "Комфорт для клиентов",
    description:
      "Зона ожидания с премиум кофе и чаем, Wi-Fi, онлайн трансляция работ с камер видеонаблюдения.",
  },
  {
    icon: Users,
    title: "Надежность",
    description:
      "Более 700 довольных клиентов за 2 года работы. Работаем в Ташкенте с 2024 года.",
  },
];

const materials = [
  {
    country: "Германия",
    brands: ["Koch Chemie", "Menzerna", "Sonax"],
  },
  {
    country: "США",
    brands: ["3M", "Chemical Guys", "Meguiar's"],
  },
  {
    country: "Италия",
    brands: ["Gtechniq", "IGL Coatings"],
  },
];

export function WhyUs() {
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
            Почему выбирают нас
          </h2>
          <div className="h-1 w-24 bg-orange-500 mx-auto mb-6" />
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Профессионализм, качество и забота о вашем автомобиле
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-zinc-800 border-zinc-700 p-8 h-full hover:border-orange-500 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">
                  <reason.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-xl text-white mb-3">{reason.title}</h3>
                <p className="text-zinc-400">{reason.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Materials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl mb-4 text-white">
                Работаем с лучшими брендами
              </h3>
              <p className="text-lg text-zinc-400">
                Только оригинальные материалы от официальных дистрибьюторов
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {materials.map((material, index) => (
                <div
                  key={material.country}
                  className="bg-zinc-900/50 rounded-lg p-6 text-center"
                >
                  <div className="text-2xl mb-4 text-orange-500">
                    {material.country}
                  </div>
                  <div className="space-y-2">
                    {material.brands.map((brand) => (
                      <div key={brand} className="text-zinc-300">
                        {brand}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <p className="text-center text-zinc-300">
                <span className="text-orange-500">Важно:</span> Все материалы
                сертифицированы и поставляются напрямую от официальных
                представителей на территории Узбекистана с полной гарантией
                качества
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
