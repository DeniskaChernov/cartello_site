import { useEffect } from "react";
import {
  SITE_CITY,
  SITE_COUNTRY,
  SITE_DESCRIPTION,
  SITE_GEO,
  SITE_INSTAGRAM,
  SITE_NAME,
  SITE_NAME_LEGAL,
  SITE_PHONES,
  SITE_REGION,
  SITE_STREET,
  SITE_URL,
} from "../../lib/siteConfig";

const GSC = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
const OG_IMAGE = import.meta.env.VITE_OG_IMAGE_URL?.trim();

/**
 * Канонический URL, проверка Google Search Console, JSON-LD (локальный бизнес, Ташкент).
 */
export function SeoHead() {
  useEffect(() => {
    document.title = `${SITE_NAME} — детейлинг ${SITE_CITY} | ${SITE_NAME_LEGAL}`;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = SITE_URL + "/";
    else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = SITE_URL + "/";
      document.head.appendChild(link);
    }

    if (GSC) {
      let meta = document.querySelector<HTMLMetaElement>(
        'meta[name="google-site-verification"]',
      );
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "google-site-verification");
        document.head.appendChild(meta);
      }
      meta.content = GSC;
    }

    const setMeta = (property: string, content: string, isProperty = true) => {
      const sel = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let m = document.querySelector<HTMLMetaElement>(sel);
      if (!m) {
        m = document.createElement("meta");
        if (isProperty) m.setAttribute("property", property);
        else m.setAttribute("name", property);
        document.head.appendChild(m);
      }
      m.content = content;
    };
    setMeta("og:url", `${SITE_URL}/`);
    if (OG_IMAGE) {
      setMeta("og:image", OG_IMAGE);
      setMeta("twitter:image", OG_IMAGE);
    }

    const jsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "AutomotiveBusiness",
      name: SITE_NAME,
      alternateName: SITE_NAME_LEGAL,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      telephone: SITE_PHONES,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_STREET,
        addressLocality: SITE_CITY,
        addressRegion: SITE_REGION,
        addressCountry: SITE_COUNTRY,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE_GEO.lat,
        longitude: SITE_GEO.lng,
      },
      areaServed: {
        "@type": "City",
        name: SITE_CITY,
        containedInPlace: {
          "@type": "Country",
          name: "Узбекистан",
        },
      },
      sameAs: [SITE_INSTAGRAM],
    };
    if (OG_IMAGE) jsonLd.image = [OG_IMAGE];

    let script = document.getElementById("cartello-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "cartello-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
}
