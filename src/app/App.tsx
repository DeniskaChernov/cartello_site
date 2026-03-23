import { HeroNew } from "./components/HeroNew";
import { ServicesNew } from "./components/ServicesNew";
import { Benefits } from "./components/Benefits";
import { MediaGallery } from "./components/MediaGallery";
import { ContactNew } from "./components/ContactNew";
import { FooterNew } from "./components/FooterNew";
import { FloatingCTA } from "./components/FloatingCTA";
import { Header } from "./components/Header";
import { BackToTop } from "./components/BackToTop";
import { CookieBanner } from "./components/CookieBanner";
import { CookiePolicy } from "./components/CookiePolicy";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { CookieConsentProvider } from "./components/CookieConsent";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "./components/ui/sonner";
import { useState } from "react";

export default function App() {
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <LanguageProvider>
      <CookieConsentProvider>
        {/* Main App Container */}
        <div className="min-h-screen noise relative">
          <Header />
          <HeroNew />
          <div style={{ backgroundColor: '#1c0a0a' }}>
            <ServicesNew />
            <Benefits />
            <MediaGallery />
            <ContactNew onOpenPrivacyPolicy={() => setShowPrivacyPolicy(true)} />
            <FooterNew 
              onOpenCookiePolicy={() => setShowCookiePolicy(true)}
              onOpenPrivacyPolicy={() => setShowPrivacyPolicy(true)}
            />
          </div>
          <FloatingCTA />
          <BackToTop />
          <CookieBanner onOpenPolicy={() => setShowCookiePolicy(true)} />
          {showCookiePolicy && <CookiePolicy onClose={() => setShowCookiePolicy(false)} />}
          {showPrivacyPolicy && <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />}
          <Toaster position="top-right" />
        </div>
      </CookieConsentProvider>
    </LanguageProvider>
  );
}