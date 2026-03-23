/** Порядок карточек «остальных» услуг (не featured). Совпадает с `public/services-order.json`. */
export const DEFAULT_OTHER_SERVICE_IDS: readonly string[] = [
  "ceramic-coating",
  "detailing-wash",
  "interior-cleaning",
  "soundproofing",
  "pdr",
  "interior-ceramic",
  "engine-wash",
  "wheel-arch-wash",
  "undercarriage-wash",
  "auto-electric",
  "ev-repair",
  "audio-install",
  "bodywork",
  "windshield-protection",
  "plastic-protection",
  "atelier",
] as const;

export function sortServicesByOrder<T extends { id: string }>(
  items: T[],
  orderIds: string[],
): T[] {
  const map = new Map(items.map((s) => [s.id, s]));
  const ordered: T[] = [];
  const seen = new Set<string>();
  for (const id of orderIds) {
    const item = map.get(id);
    if (item) {
      ordered.push(item);
      seen.add(id);
    }
  }
  for (const s of items) {
    if (!seen.has(s.id)) ordered.push(s);
  }
  return ordered;
}

export function mergeOrderWithKnownIds(
  incoming: string[],
  fallback: readonly string[],
): string[] {
  const set = new Set(fallback);
  const out: string[] = [];
  for (const id of incoming) {
    if (set.has(id) && !out.includes(id)) out.push(id);
  }
  for (const id of fallback) {
    if (!out.includes(id)) out.push(id);
  }
  return out;
}
