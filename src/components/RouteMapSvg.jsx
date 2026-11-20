import { useTranslation } from "../context/LanguageContext";
import { venue } from "../data/weddingData";

export default function RouteMapSvg() {
  const { lang, t } = useTranslation();

  return (
    <div className="route-card">
      <svg
        viewBox="0 0 560 220"
        fill="none"
        role="img"
        aria-label={t(venue.routeSummary)}
      >
        <rect width="560" height="220" rx="14" fill="var(--bg-surface)" />
        {/* Gentle Satpura Hills silhouette */}
        <path
          d="M280 185 Q340 120 405 155 Q465 102 535 170 L535 196 L280 196 Z"
          fill="var(--accent-pistachio-soft)"
        />
        {/* Connecting Wedding Journey Route */}
        <path
          d="M78 135 C 165 55, 225 145, 295 112 C 365 80, 420 125, 482 78"
          stroke="var(--accent-gold)"
          strokeWidth="3"
          strokeDasharray="7 6"
          strokeLinecap="round"
        />

        {/* Sagar Node */}
        <circle cx="78" cy="135" r="11" fill="var(--accent-primary)" />
        <circle cx="78" cy="135" r="18" stroke="var(--accent-primary)" strokeOpacity="0.3" strokeWidth="2" />
        <text
          x="78"
          y="169"
          textAnchor="middle"
          fill="var(--ink-primary)"
          fontSize="14"
          fontWeight="700"
        >
          {lang === "hi" ? "सागर" : "Sagar"}
        </text>
        <text
          x="78"
          y="188"
          textAnchor="middle"
          fill="var(--ink-muted)"
          fontSize="12"
        >
          {lang === "hi" ? "बारात प्रस्थान" : "Baraat Origin"}
        </text>

        {/* Pipariya / Aashirwad Garden Center Node */}
        <circle cx="295" cy="112" r="14" fill="var(--accent-gold)" />
        <circle cx="295" cy="112" r="23" stroke="var(--accent-gold)" strokeOpacity="0.35" strokeWidth="2.5" />
        <text
          x="295"
          y="153"
          textAnchor="middle"
          fill="var(--ink-primary)"
          fontSize="15"
          fontWeight="700"
        >
          {lang === "hi" ? "पिपरिया (आशीर्वाद गार्डन)" : "Pipariya · Aashirwad Garden"}
        </text>
        <text
          x="295"
          y="172"
          textAnchor="middle"
          fill="var(--accent-primary)"
          fontSize="12"
          fontWeight="600"
        >
          {lang === "hi" ? "4 व 5 दिसम्बर 2026" : "4 & 5 Dec 2026"}
        </text>

        {/* Pachmarhi Getaway Node */}
        <circle cx="482" cy="78" r="10" fill="var(--accent-pistachio)" />
        <circle cx="482" cy="78" r="16" stroke="var(--accent-pistachio)" strokeOpacity="0.4" strokeWidth="2" />
        <text
          x="482"
          y="54"
          textAnchor="middle"
          fill="var(--ink-primary)"
          fontSize="14"
          fontWeight="700"
        >
          {lang === "hi" ? "पचमढ़ी" : "Pachmarhi"}
        </text>
        <text
          x="482"
          y="112"
          textAnchor="middle"
          fill="var(--ink-muted)"
          fontSize="12"
        >
          {lang === "hi" ? "सतपुड़ा सैर (~1 घंटा)" : "Satpura Hills (~1 hr)"}
        </text>
      </svg>
      <p className="route-card__caption">{t(venue.routeSummary)}</p>
    </div>
  );
}
