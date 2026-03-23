/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_API_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_LEAD_API_PATH?: string;
  readonly VITE_API_AUTH_TOKEN?: string;
  /** true — показать drag-and-drop редактор порядка карточек услуг (после настройки уберите) */
  readonly VITE_ENABLE_SERVICES_GRID_EDITOR?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
