import { motion } from "motion/react";
import { Shield, Award, Clock, ThumbsUp, Users, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { SITE_IMAGES } from "../../lib/siteImages";

const logo = SITE_IMAGES.logoCompact;

const benefits = [
  {
    id: 'experienced-masters',
    icon: Users,
    titleKey: "benefits.experiencedMasters",
    descKey: "benefits.experiencedMastersDesc"
  },
  {
    id: 'guarantee',
    icon: Shield,
    titleKey: "benefits.guarantee",
    descKey: "benefits.guaranteeDesc"
  },
  {
    id: 'professional-equipment',
    icon: Clock,
    titleKey: "benefits.professionalEquipment",
    descKey: "benefits.professionalEquipmentDesc"
  },
  {
    id: 'quality-materials',
    icon: Award,
    titleKey: "benefits.qualityMaterials",
    descKey: "benefits.qualityMaterialsDesc"
  },
  {
    id: 'individual-approach',
    icon: Sparkles,
    titleKey: "benefits.individualApproach",
    descKey: "benefits.individualApproachDesc"
  },
  {
    id: 'satisfied-clients',
    icon: ThumbsUp,
    titleKey: "benefits.satisfiedClients",
    descKey: "benefits.satisfiedClientsDesc"
  }
];

export function Benefits() {
  const { t } = useLanguage();

  return (
    <section id="benefits" className="relative py-24 overflow-hidden">
      {/* Background */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <img 
              src={logo} 
              alt="Cartello" 
              className="w-56 sm:w-64 md:w-80 h-auto mx-auto opacity-80" 
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-zinc-400 px-4"
          >
            {t("benefits.subtitle")}
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-red-900/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-7 h-7 text-cartello-beige" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 break-words">
                {t(benefit.titleKey)}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {t(benefit.descKey)}
              </p>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 to-cartello-beige scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}