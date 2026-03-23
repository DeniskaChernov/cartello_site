import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Layers,
  Zap,
  Wrench,
  Droplets as DropletsIcon,
  Car,
  Wind,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function AllServices() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const { t } = useLanguage();

  const additionalServices = [
    {
      icon: Layers,
      title: t("additionalServices.ceramicBodyTitle"),
      description: t("additionalServices.ceramicBodyDesc"),
      details: [
        t("additionalServices.ceramicBodyDetail1"),
        t("additionalServices.ceramicBodyDetail2"),
        t("additionalServices.ceramicBodyDetail3"),
        t("additionalServices.ceramicBodyDetail4"),
      ],
      time: t("additionalServices.ceramicBodyTime"),
      price: "1 650 000 сум",
    },
    {
      icon: Zap,
      title: t("additionalServices.autoElectricianTitle"),
      description: t("additionalServices.autoElectricianDesc"),
      details: [
        t("additionalServices.autoElectricianDetail1"),
        t("additionalServices.autoElectricianDetail2"),
        t("additionalServices.autoElectricianDetail3"),
        t("additionalServices.autoElectricianDetail4"),
      ],
      time: t("additionalServices.autoElectricianTime"),
      price: "от 100 000 сум",
    },
    {
      icon: Wrench,
      title: t("additionalServices.detailingWashEngineTitle"),
      description: t("additionalServices.detailingWashEngineDesc"),
      details: [
        t("additionalServices.detailingWashEngineDetail1"),
        t("additionalServices.detailingWashEngineDetail2"),
        t("additionalServices.detailingWashEngineDetail3"),
        t("additionalServices.detailingWashEngineDetail4"),
      ],
      time: t("additionalServices.detailingWashEngineTime"),
      price: "700 000 сум",
    },
    {
      icon: DropletsIcon,
      title: t("additionalServices.detailingWashArchesTitle"),
      description: t("additionalServices.detailingWashArchesDesc"),
      details: [
        t("additionalServices.detailingWashArchesDetail1"),
        t("additionalServices.detailingWashArchesDetail2"),
        t("additionalServices.detailingWashArchesDetail3"),
        t("additionalServices.detailingWashArchesDetail4"),
      ],
      time: t("additionalServices.detailingWashArchesTime"),
      price: "800 000 сум",
    },
    {
      icon: Car,
      title: t("additionalServices.detailingWashBottomTitle"),
      description: t("additionalServices.detailingWashBottomDesc"),
      details: [
        t("additionalServices.detailingWashBottomDetail1"),
        t("additionalServices.detailingWashBottomDetail2"),
        t("additionalServices.detailingWashBottomDetail3"),
        t("additionalServices.detailingWashBottomDetail4"),
      ],
      time: t("additionalServices.detailingWashBottomTime"),
      price: "1 000 000 сум",
    },
  ];

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
            {t("additionalServices.title")}
          </h2>
          <div className="h-1 w-24 bg-orange-500 mx-auto mb-6" />
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {t("additionalServices.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-zinc-900 border-zinc-800 p-6 h-full flex flex-col hover:border-orange-500 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-xl text-white mb-3">{service.title}</h3>
                <p className="text-zinc-400 mb-4">{service.description}</p>

                <div className="mb-6 flex-grow">
                  <ul className="space-y-2">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">{t("additionalServices.time")}:</span>
                    <span className="text-white">{service.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">{t("additionalServices.price")}:</span>
                    <span className="text-orange-500">{service.price}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  onClick={scrollToContact}
                >
                  {t("additionalServices.getConsultation")}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}