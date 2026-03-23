/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_API_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_LEAD_API_PATH?: string;
  readonly VITE_API_AUTH_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
