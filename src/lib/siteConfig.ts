/** Продакшен-URL без слэша в конце. Подставьте свой домен в VITE_SITE_URL. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "https://cartello.uz"
).replace(/\/$/, "");

export const SITE_NAME = "Cartello Detailing Centre";
export const SITE_NAME_LEGAL = "CARTELLO GROUP";

export const SITE_DESCRIPTION =
  "Детейлинг-центр в Ташкенте: полировка, PPF, керамика, тонировка, химчистка, шумоизоляция и другие услуги. Cartello Detailing Centre — адрес: ул. Баку 179А.";

/** Короткий заголовок для og:title / соцсетей (без дублирования юр. названия в конце). */
export const SITE_OG_TITLE = `${SITE_NAME} — детейлинг в Ташкенте`;

/** Краткое описание для Open Graph (может отличаться от meta description на 10–20 символов). */
export const SITE_OG_DESCRIPTION =
  "Полировка, PPF, керамика, тонировка, химчистка салона и другие услуги автодетейлинга. ул. Баку 179А. Запись онлайн и по телефону.";

export const SITE_CITY = "Ташкент";
export const SITE_REGION = "Ташкент";
export const SITE_COUNTRY = "UZ";
export const SITE_STREET = "ул. Баку 179А";

/** Координаты точки на Яндекс.Картах (блок контактов). */
export const SITE_GEO = {
  lat: 41.28803,
  lng: 69.306121,
} as const;

export const SITE_PHONES = ["+998958350110", "+998909077910"] as const;
export const SITE_INSTAGRAM = "https://instagram.com/cartello.uz";
export const SITE_TELEGRAM = "https://t.me/Cartellouz";

/** Карточка организации (как в ссылке «Адрес» на сайте). */
export const SITE_MAPS_URL =
  "https://yandex.uz/maps/10335/tashkent/?ll=69.306111%2C41.287925&mode=poi&poi%5Bpoint%5D=69.306121%2C41.288030&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D4770057567&z=20.65";

/** Файл превью в public/ (если не задан VITE_OG_IMAGE_URL). */
export const SITE_OG_IMAGE_PATH = "/og.png" as const;

export function getDefaultOgImageUrl(): string {
  return `${SITE_URL}${SITE_OG_IMAGE_PATH}`;
}
