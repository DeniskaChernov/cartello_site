import { lazy, Suspense, useState } from "react";
import { SeoHead } from "./components/SeoHead";
import { HeroNew } from "./components/HeroNew";
import { FloatingCTA } from "./components/FloatingCTA";
import { Header } from "./components/Header";
import { BackToTop } from "./components/BackToTop";
import { CookieBanner } from "./components/CookieBanner";
import { CookiePolicy } from "./components/CookiePolicy";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { CookieConsentProvider } from "./components/CookieConsent";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "./components/ui/sonner";

const BelowFold = lazy(() =>
  import("./components/BelowFold").then((m) => ({ default: m.BelowFold })),
);

function BelowFoldFallback() {
  return <div className="min-h-[50vh] w-full bg-[#1c0a0a]" aria-hidden />;
}

export default function App() {
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <LanguageProvider>
      <CookieConsentProvider>
        {/* Main App Container */}
        <div className="min-h-screen noise relative">
          <SeoHead />
          <Header />
          <main id="main-content">
            <HeroNew />
            <div style={{ backgroundColor: "#1c0a0a" }} className="content-below-fold">
              <Suspense fallback={<BelowFoldFallback />}>
                <BelowFold
                  onOpenPrivacyPolicy={() => setShowPrivacyPolicy(true)}
                  onOpenCookiePolicy={() => setShowCookiePolicy(true)}
                />
              </Suspense>
            </div>
          </main>
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