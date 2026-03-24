import { motion } from "motion/react";
import {
  Shield, 
  Sparkles, 
  Sun, 
  Droplet, 
  ArrowRight, 
  Zap, 
  SprayCan, 
  Umbrella, 
  Eye, 
  Layers,
  VolumeX,
  Star,
  Car,
  Wrench,
  Battery,
  Radio,
  Paintbrush,
  Hammer,
  Wind,
  CircleDot,
  Shirt,
  Cog,
  Disc,
  Smartphone,
  Palette,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { BookingModal } from "./BookingModal";
import { SITE_IMAGES } from "../../lib/siteImages";
import {
  DEFAULT_OTHER_SERVICE_IDS,
  mergeOrderWithKnownIds,
  sortServicesByOrder,
} from "../../lib/servicesOrder";

const polishingImage = SITE_IMAGES.polishing;
const ceramicImage = SITE_IMAGES.ceramic;
const ppfImage = SITE_IMAGES.ppf;
const interiorCleaningImage = SITE_IMAGES.interiorCleaning;
const tintingImage = SITE_IMAGES.tinting;
const autoElectricImage = SITE_IMAGES.autoElectric;
const engineWashImage = SITE_IMAGES.engineWash;
const wheelArchImage = SITE_IMAGES.wheelArch;
const undercarriageImage = SITE_IMAGES.undercarriage;
const pdrImage = SITE_IMAGES.pdr;
const detailingWashImage = SITE_IMAGES.detailingWash;
const windshieldImage = SITE_IMAGES.windshield;
const serviceSoundproofingImage = SITE_IMAGES.serviceSoundproofing;
const serviceInteriorCeramicImage = SITE_IMAGES.serviceInteriorCeramic;
const serviceEvRepairImage = SITE_IMAGES.serviceEvRepair;
const serviceAudioInstallImage = SITE_IMAGES.serviceAudioInstall;
const serviceBodyworkImage = SITE_IMAGES.serviceBodywork;
const servicePlasticProtectionImage = SITE_IMAGES.servicePlasticProtection;
const serviceAtelierImage = SITE_IMAGES.serviceAtelier;

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: LucideIcon;
  image: string;
  featured: boolean;
  badge?: string;
  priceOnRequest?: boolean;
};

export function ServicesNew() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const services: ServiceItem[] = [
    {
      id: "polishing",
      title: t("services.polishing"),
      description: t("services.polishingDesc"),
      price: t("services.polishingPrice"),
      icon: Sparkles,
      image: polishingImage,
      featured: true,
    },
    {
      id: "ppf",
      title: t("services.ppf"),
      description: t("services.ppfDesc"),
      price: t("services.ppfPrice"),
      icon: Layers,
      image: ppfImage,
      featured: true,
      badge: t("services.badge"),
    },
    {
      id: "tinting",
      title: t("services.tinting"),
      description: t("services.tintingDesc"),
      price: t("services.tintingPrice"),
      icon: Sun,
      image: tintingImage,
      featured: true,
    },
    {
      id: "ceramic-coating",
      title: t("services.ceramicCoating"),
      description: t("services.ceramicCoatingDesc"),
      price: t("services.ceramicCoatingPrice"),
      icon: Shield,
      image: ceramicImage,
      featured: false,
    },
    {
      id: "detailing-wash",
      title: t("services.detailingWash"),
      description: t("services.detailingWashDesc"),
      price: t("services.detailingWashPrice"),
      icon: Droplet,
      image: detailingWashImage,
      featured: false,
    },
    {
      id: "interior-cleaning",
      title: t("services.interiorCleaning"),
      description: t("services.interiorCleaningDesc"),
      price: t("services.interiorCleaningPrice"),
      icon: SprayCan,
      image: interiorCleaningImage,
      featured: false,
    },
    {
      id: "soundproofing",
      title: t("services.soundproofing"),
      description: t("services.soundproofingDesc"),
      price: t("services.soundproofingPrice"),
      icon: VolumeX,
      image: serviceSoundproofingImage,
      featured: false,
    },
    {
      id: "pdr",
      title: t("services.pdrService"),
      description: t("services.pdrServiceDesc"),
      price: t("services.pdrServicePrice"),
      icon: Hammer,
      image: pdrImage,
      featured: false,
    },
    {
      id: "interior-ceramic",
      title: t("services.interiorCeramic"),
      description: t("services.interiorCeramicDesc"),
      price: t("services.interiorCeramicPrice"),
      icon: ShieldCheck,
      image: serviceInteriorCeramicImage,
      featured: false,
      priceOnRequest: false,
    },
    {
      id: "engine-wash",
      title: t("services.engineWash"),
      description: t("services.engineWashDesc"),
      price: t("services.engineWashPrice"),
      icon: Cog,
      image: engineWashImage,
      featured: false,
      priceOnRequest: false,
    },
    {
      id: "wheel-arch-wash",
      title: t("services.wheelArchWash"),
      description: t("services.wheelArchWashDesc"),
      price: t("services.wheelArchWashPrice"),
      icon: CircleDot,
      image: wheelArchImage,
      featured: false,
      priceOnRequest: false,
    },
    {
      id: "undercarriage-wash",
      title: t("services.undercarriageWash"),
      description: t("services.undercarriageWashDesc"),
      price: t("services.undercarriageWashPrice"),
      icon: Car,
      image: undercarriageImage,
      featured: false,
      priceOnRequest: false,
    },
    {
      id: "auto-electric",
      title: t("services.autoElectric"),
      description: t("services.autoElectricDesc"),
      price: t("services.priceOnRequest"),
      icon: Zap,
      image: autoElectricImage,
      featured: false,
      priceOnRequest: true,
    },
    {
      id: "ev-repair",
      title: t("services.evRepair"),
      description: t("services.evRepairDesc"),
      price: t("services.priceOnRequest"),
      icon: Battery,
      image: serviceEvRepairImage,
      featured: false,
      priceOnRequest: true,
    },
    {
      id: "audio-install",
      title: t("services.audioInstall"),
      description: t("services.audioInstallDesc"),
      price: t("services.priceOnRequest"),
      icon: Radio,
      image: serviceAudioInstallImage,
      featured: false,
      priceOnRequest: true,
    },
    {
      id: "bodywork",
      title: t("services.bodywork"),
      description: t("services.bodyworkDesc"),
      price: t("services.priceOnRequest"),
      icon: Paintbrush,
      image: serviceBodyworkImage,
      featured: false,
      priceOnRequest: true,
    },
    {
      id: "windshield-protection",
      title: t("services.windshieldProtection"),
      description: t("services.windshieldProtectionDesc"),
      price: t("services.priceOnRequest"),
      icon: Eye,
      image: windshieldImage,
      featured: false,
      priceOnRequest: true,
    },
    {
      id: "plastic-protection",
      title: t("services.plasticProtection"),
      description: t("services.plasticProtectionDesc"),
      price: t("services.priceOnRequest"),
      icon: Smartphone,
      image: servicePlasticProtectionImage,
      featured: false,
      priceOnRequest: true,
    },
    {
      id: "atelier",
      title: t("services.atelierService"),
      description: t("services.atelierServiceDesc"),
      price: t("services.priceOnRequest"),
      icon: Shirt,
      image: serviceAtelierImage,
      featured: false,
      priceOnRequest: true,
    },
  ];

  const featuredServices = services.filter((s) => s.featured);
  const otherServices = services.filter((s) => !s.featured);

  const [otherOrderIds, setOtherOrderIds] = useState<string[]>(() => [
    ...DEFAULT_OTHER_SERVICE_IDS,
  ]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/services-order.json", { cache: "no-store" });
        if (!r.ok) return;
        const j = (await r.json()) as { order?: unknown };
        if (!Array.isArray(j.order)) return;
        const merged = mergeOrderWithKnownIds(
          j.order.filter((x): x is string => typeof x === "string"),
          DEFAULT_OTHER_SERVICE_IDS,
        );
        if (!cancelled) setOtherOrderIds(merged);
      } catch {
        /* нет файла или сеть — остаётся дефолт */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const orderedOtherServices = sortServicesByOrder(
    otherServices,
    otherOrderIds,
  );

  const openBooking = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="relative py-24 overflow-hidden" ref={containerRef}>
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-[20%] w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t("services.title").split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cartello-beige via-cartello-beige-light to-cartello-beige">{t("services.title").split(' ')[1]}</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed px-4"
          >
            {t("services.subtitle")}
          </motion.p>
        </div>

        {/* Featured Services (Top 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => openBooking(service)}
              className="group relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 cursor-pointer"
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              
              {/* Badge "Хит" */}
              {service.badge && (
                <div className="absolute top-6 right-6 z-20">
                  <div className="bg-cartello-red px-4 py-2 rounded-full border border-cartello-beige/30">
                    <span className="text-cartello-beige font-bold text-sm tracking-wider uppercase">
                      {service.badge}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="min-h-[4rem] md:min-h-[4.5rem] flex flex-col justify-start mb-3 md:mb-2">
                    <h3 className="text-3xl font-bold text-white leading-tight break-words">{service.title}</h3>
                  </div>
                  <p className="text-zinc-300 mb-6 transition-all duration-300 max-md:opacity-100 max-md:max-h-none max-md:overflow-visible md:opacity-0 md:max-h-0 md:overflow-hidden md:mb-0 md:group-hover:opacity-100 md:group-hover:max-h-[12rem] md:group-hover:mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-lg font-semibold text-cartello-beige">{service.price}</span>
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Остальные услуги: порядок из public/services-order.json, сетка 4 колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orderedOtherServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.21, 0.45, 0.27, 0.9],
              }}
              whileHover={{ y: -5 }}
              onClick={() => openBooking(service)}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/50 hover:border-red-900/30 transition-all duration-500 min-h-[350px] flex flex-col cursor-pointer"
            >
              <div className="absolute inset-0 opacity-[0.42] group-hover:opacity-50 transition-opacity duration-700">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
              </div>

              {service.priceOnRequest && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-zinc-900/80 border border-cartello-beige/40 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    <span className="text-cartello-beige font-medium text-[10px] tracking-wider uppercase">
                      {t("services.badgeOnRequest")}
                    </span>
                  </div>
                </div>
              )}

              <div className="relative flex-1 p-6 md:p-8 flex flex-col z-10 min-h-0">
                <div className="flex items-start justify-end min-h-[24px] shrink-0">
                  {!service.priceOnRequest && (
                    <span className="text-sm font-medium transition-colors text-zinc-500 group-hover:text-cartello-beige">
                      {service.price}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-2">
                  <div className="min-h-[4.5rem] sm:min-h-[5.25rem] md:min-h-[6rem] flex flex-col justify-start w-full">
                    <h3 className="text-2xl font-bold text-white leading-tight break-words group-hover:translate-x-1 transition-transform">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-sm md:text-base transition-all duration-300 max-md:opacity-100 max-md:max-h-none md:opacity-0 md:max-h-0 md:overflow-hidden md:group-hover:opacity-100 md:group-hover:max-h-[16rem] md:group-hover:text-zinc-300">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
}