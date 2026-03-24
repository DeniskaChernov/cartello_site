/** Продакшен-URL без слэша в конце. Подставьте свой домен в VITE_SITE_URL. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "https://cartello.uz"
).replace(/\/$/, "");

export const SITE_NAME = "Cartello Detailing Centre";
export const SITE_NAME_LEGAL = "CARTELLO GROUP";

export const SITE_DESCRIPTION =
  "Детейлинг-центр в Ташкенте: полировка, PPF, керамика, тонировка, химчистка, шумоизоляция и другие услуги. Cartello Detailing Centre — адрес: ул. Баку 179А.";

export const SITE_CITY = "Ташкент";
export const SITE_REGION = "Ташкент";
export const SITE_COUNTRY = "UZ";
export const SITE_STREET = "ул. Баку 179А";
export const SITE_GEO = {
  lat: 41.2995,
  lng: 69.2401,
} as const;

export const SITE_PHONES = ["+998958350110", "+998909077910"] as const;
export const SITE_INSTAGRAM = "https://instagram.com/cartello.uz";
