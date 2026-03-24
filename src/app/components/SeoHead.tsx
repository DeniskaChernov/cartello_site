import { useEffect } from "react";
import {
  SITE_CITY,
  SITE_COUNTRY,
  SITE_DESCRIPTION,
  SITE_GEO,
  SITE_INSTAGRAM,
  SITE_MAPS_URL,
  SITE_NAME,
  SITE_NAME_LEGAL,
  SITE_OG_DESCRIPTION,
  SITE_OG_TITLE,
  SITE_PHONES,
  SITE_REGION,
  SITE_STREET,
  SITE_TELEGRAM,
  SITE_URL,
  getDefaultOgImageUrl,
} from "../../lib/siteConfig";

const GSC = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
const OG_IMAGE_OVERRIDE = import.meta.env.VITE_OG_IMAGE_URL?.trim();

function setMeta(property: string, content: string, isProperty = true) {
  const sel = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
  let m = document.querySelector<HTMLMetaElement>(sel);
  if (!m) {
    m = document.createElement("meta");
    if (isProperty) m.setAttribute("property", property);
    else m.setAttribute("name", property);
    document.head.appendChild(m);
  }
  m.content = content;
}

/**
 * Канонический URL, проверка GSC, Open Graph / Twitter, hreflang, JSON-LD (@graph: WebSite + AutomotiveBusiness).
 */
export function SeoHead() {
  useEffect(() => {
    document.title = `${SITE_NAME} — детейлинг ${SITE_CITY} | ${SITE_NAME_LEGAL}`;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${SITE_URL}/`;
    else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = `${SITE_URL}/`;
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

    const ogImage = OG_IMAGE_OVERRIDE || getDefaultOgImageUrl();

    setMeta("og:type", "website");
    setMeta("og:site_name", SITE_NAME);
    setMeta("og:locale", "ru_UZ");
    setMeta("og:title", SITE_OG_TITLE);
    setMeta("og:description", SITE_OG_DESCRIPTION);
    setMeta("og:url", `${SITE_URL}/`);
    setMeta("og:image", ogImage);
    setMeta("og:image:alt", `${SITE_NAME} — фасад в ${SITE_CITY}`);

    setMeta("twitter:card", "summary_large_image", false);
    setMeta("twitter:title", SITE_OG_TITLE, false);
    setMeta("twitter:description", SITE_OG_DESCRIPTION, false);
    setMeta("twitter:image", ogImage, false);

    setMeta("description", SITE_DESCRIPTION, false);
    setMeta("robots", "index, follow, max-image-preview:large", false);

    const homeUrl = `${SITE_URL}/`;
    for (const lang of ["ru", "uz", "x-default"]) {
      let link = document.querySelector<HTMLLinkElement>(
        `link[rel="alternate"][hreflang="${lang}"]`,
      );
      if (!link) {
        link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = lang;
        document.head.appendChild(link);
      }
      link.href = homeUrl;
    }

    const businessId = `${SITE_URL}/#business`;
    const websiteId = `${SITE_URL}/#website`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": websiteId,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: ["ru-UZ", "uz"],
          publisher: { "@id": businessId },
        },
        {
          "@type": "AutomotiveBusiness",
          "@id": businessId,
          name: SITE_NAME,
          alternateName: SITE_NAME_LEGAL,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
          telephone: SITE_PHONES,
          hasMap: SITE_MAPS_URL,
          image: [ogImage],
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
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "10:00",
            closes: "19:00",
          },
          areaServed: {
            "@type": "City",
            name: SITE_CITY,
            containedInPlace: {
              "@type": "Country",
              name: "Узбекистан",
            },
          },
          sameAs: [SITE_INSTAGRAM, SITE_TELEGRAM],
        },
      ],
    };

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
