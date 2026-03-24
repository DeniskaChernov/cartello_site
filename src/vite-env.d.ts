/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_API_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_LEAD_API_PATH?: string;
  readonly VITE_API_AUTH_TOKEN?: string;
  /** Продакшен-URL без слэша в конце, напр. https://cartello.uz */
  readonly VITE_SITE_URL?: string;
  /** Код из Google Search Console → Настройки → Подтверждение владения → HTML-тег */
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  /** Полный URL картинки для Open Graph / JSON-LD, напр. https://cartello.uz/og.jpg */
  readonly VITE_OG_IMAGE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
