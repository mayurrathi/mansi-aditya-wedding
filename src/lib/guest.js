export function getGuestNameFromUrl() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("guest") || params.get("to") || params.get("invite") || "";
  return raw.trim().slice(0, 60);
}

export function buildPersonalizedUrl(name, inviteLang = "") {
  if (typeof window === "undefined") return "";
  const base = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  const clean = (name || "").trim();
  if (clean) params.set("guest", clean);
  if (inviteLang === "hi" || inviteLang === "en") params.set("lang", inviteLang);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export function buildPersonalizedWhatsappUrl({ guestName, inviteLang = "en", url }) {
  const cleanName = (guestName || "").trim();
  const text =
    inviteLang === "hi"
      ? `॥ श्री नाथजी ॥\n${cleanName ? `सस्नेह आमंत्रण: ${cleanName}\n\n` : ""}राठी एवं जैन परिवार की ओर से *मानसी एवं आदित्य* के शुभ विवाहोत्सव (#iAMinLove) में सपरिवार पधारने का हार्दिक निमंत्रण!\n\n📅 4 एवं 5 दिसम्बर 2026\n📍 आशीर्वाद गार्डन, पिपरिया (म.प्र.)\n\nनिमंत्रण खोलें:\n${url}`
      : `|| Shri Shrinathji ||\n${cleanName ? `Warm invitation for *${cleanName}* ✨\n\n` : ""}With joyful hearts, the Rathi & Jain families cordially invite you to celebrate the wedding of *Mansi & Aditya* (#iAMinLove).\n\n📅 4 & 5 December 2026\n📍 Aashirwad Garden, Pipariya (M.P.)\n\nTap to open your personal invitation:\n${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
