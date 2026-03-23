/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_API_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_LEAD_API_PATH?: string;
  readonly VITE_API_AUTH_TOKEN?: string;
  readonly VITE_SUPABASE_PROJECT_ID?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
