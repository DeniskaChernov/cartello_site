export type Lead = {
  name: string;
  phone: string;
  service?: string;
  email?: string;
  comment?: string;
  source: string;
};

export function parseLead(value: unknown): Lead | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  const limits = { name: 150, phone: 64, service: 300, email: 254, comment: 2000, source: 100 };
  const clean: Record<string, string> = {};
  for (const [field, limit] of Object.entries(limits)) {
    const raw = body[field];
    if (raw === undefined) continue;
    if (typeof raw !== "string" || raw.length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(raw)) return null;
    clean[field] = raw.trim();
  }
  if (!clean.name || !clean.phone) return null;
  return {
    name: clean.name, phone: clean.phone, service: clean.service,
    email: clean.email, comment: clean.comment, source: clean.source || "website",
  };
}
