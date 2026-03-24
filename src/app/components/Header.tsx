import { motion, useScroll, useTransform } from "motion/react";
import { Phone, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { SITE_IMAGES } from "../../lib/siteImages";
import { useLightMotion } from "../../lib/useLightMotion";

const logo = SITE_IMAGES.logoCompact;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const lightMotion = useLightMotion();
  
  // Language hook
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = ["services", "benefits", "media", "contact"];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("header.services"), href: "#services" },
    { name: t("header.gallery"), href: "#media" },
    { name: t("header.contact"), href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        style={{ opacity: lightMotion ? 1 : headerOpacity }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-900 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              type="button"
              onClick={scrollToTop}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center cursor-pointer group"
              aria-label={t("header.logoAria")}
            >
              <img
                src={logo}
                alt=""
                width={140}
                height={40}
                className="h-9 w-auto max-w-[140px] object-contain sm:h-10"
                decoding="async"
              />
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all relative group ${
                    activeSection === item.href.replace("#", "") ? "text-white bg-zinc-900/30" : ""
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-900 to-cartello-beige group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:flex items-center gap-4"
            >
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-zinc-900/50 rounded-xl p-1 border border-zinc-800">
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    language === 'ru' 
                      ? 'bg-red-900 text-white' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage('uz')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    language === 'uz' 
                      ? 'bg-red-900 text-white' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  UZ
                </button>
              </div>
              
              <a
                href="tel:+998958350110"
                className="flex items-center gap-2 px-4 xl:px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl transition-all shadow-lg shadow-red-900/20 hover:shadow-red-900/40 text-sm xl:text-base"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold">95 835 01 10</span>
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? 0 : -20,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        className="fixed top-20 left-0 right-0 z-40 lg:hidden"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="bg-zinc-950/98 backdrop-blur-xl border border-zinc-900 rounded-2xl p-6 shadow-2xl">
            {/* Language Switcher - Mobile */}
            <div className="flex items-center gap-1 bg-zinc-900/50 rounded-xl p-1 border border-zinc-800 mb-6">
              <button
                onClick={() => setLanguage('ru')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  language === 'ru' 
                    ? 'bg-red-900 text-white' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('uz')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  language === 'uz' 
                    ? 'bg-red-900 text-white' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                UZ
              </button>
            </div>
            
            <nav className="flex flex-col gap-4 mb-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{ delay: index * 0.05 }}
                  className="text-left text-zinc-300 hover:text-white py-3 px-4 rounded-xl hover:bg-zinc-900 transition-all"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            <a
              href="tel:+998958350110"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl font-semibold shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span>95 835 01 10</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}