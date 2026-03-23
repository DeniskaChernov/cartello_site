import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  preferences: CookiePreferences;
  updatePreferences: (prefs: CookiePreferences) => void;
  hasConsent: boolean;
  acceptAll: () => void;
  declineAll: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Всегда включены
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    // Загружаем сохраненные настройки
    const savedConsent = localStorage.getItem("cartello_cookie_consent");
    if (savedConsent) {
      setHasConsent(true);
      const savedPrefs = localStorage.getItem("cartello_cookie_preferences");
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  useEffect(() => {
    // Загружаем скрипты аналитики согласно настройкам
    if (hasConsent) {
      if (preferences.analytics) {
        // Загружаем аналитику только если указаны реальные ID
        // Раскомментируйте и укажите ваши ID:
        // loadYandexMetrica();
        // loadGoogleAnalytics();
        console.log("✅ Аналитика разрешена (но не загружена - укажите ID в CookieConsent.tsx)");
      } else {
        removeAnalyticsScripts();
      }

      if (preferences.marketing) {
        // Здесь можно добавить маркетинговые скрипты (Facebook Pixel и т.д.)
      }
    }
  }, [hasConsent, preferences]);

  const updatePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs);
    setHasConsent(true);
    localStorage.setItem("cartello_cookie_consent", "custom");
    localStorage.setItem("cartello_cookie_preferences", JSON.stringify(prefs));
  };

  const acceptAll = () => {
    const allPrefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allPrefs);
    setHasConsent(true);
    localStorage.setItem("cartello_cookie_consent", "accepted");
    localStorage.setItem("cartello_cookie_preferences", JSON.stringify(allPrefs));
  };

  const declineAll = () => {
    const minimalPrefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    setPreferences(minimalPrefs);
    setHasConsent(true);
    localStorage.setItem("cartello_cookie_consent", "declined");
    localStorage.setItem("cartello_cookie_preferences", JSON.stringify(minimalPrefs));
  };

  return (
    <CookieConsentContext.Provider
      value={{ preferences, updatePreferences, hasConsent, acceptAll, declineAll }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

// Функции загрузки скриптов аналитики
function loadYandexMetrica() {
  if (document.getElementById("yandex-metrica")) return;

  // Yandex.Metrica
  const script = document.createElement("script");
  script.id = "yandex-metrica";
  script.innerHTML = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(YOUR_COUNTER_ID, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true
    });
  `;
  document.head.appendChild(script);

  // Noscript для Yandex
  const noscript = document.createElement("noscript");
  noscript.innerHTML = '<div><img src="https://mc.yandex.ru/watch/YOUR_COUNTER_ID" style="position:absolute; left:-9999px;" alt="" /></div>';
  document.body.appendChild(noscript);

  console.log("✅ Yandex.Metrica загружена");
}

function loadGoogleAnalytics() {
  if (document.getElementById("google-analytics")) return;

  // Google Analytics 4
  const script1 = document.createElement("script");
  script1.id = "google-analytics";
  script1.async = true;
  script1.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `;
  document.head.appendChild(script2);

  console.log("✅ Google Analytics загружен");
}

function removeAnalyticsScripts() {
  // Удаляем скрипты аналитики
  const ymScript = document.getElementById("yandex-metrica");
  if (ymScript) ymScript.remove();

  const gaScript = document.getElementById("google-analytics");
  if (gaScript) gaScript.remove();

  console.log("🚫 Скрипты аналитики удалены");
}