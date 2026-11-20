export function getGuestNameFromUrl() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("guest") || params.get("to") || params.get("invite") || "";
  return raw.trim().slice(0, 60);
}

export function buildPersonalizedUrl(name) {
  if (typeof window === "undefined") return "";
  const base = window.location.origin + window.location.pathname;
  const clean = (name || "").trim();
  return clean ? `${base}?guest=${encodeURIComponent(clean)}` : base;
}
