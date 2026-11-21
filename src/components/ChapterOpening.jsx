import { useEffect, useRef } from "react";
import { useTranslation } from "../context/LanguageContext";
import { chapterOpening, couple, labels } from "../data/weddingData";
import InstagramIcon from "./InstagramIcon";

const OPEN_MS = 1150;

function RoyalWaxSealSvg() {
  return (
    <svg
      viewBox="0 0 220 220"
      className="royal-wax-seal-svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="waxBodyGrad" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#D6604D" />
          <stop offset="48%" stopColor="#9E2F24" />
          <stop offset="85%" stopColor="#6E1C14" />
          <stop offset="100%" stopColor="#4A100B" />
        </radialGradient>
        <radialGradient id="waxInnerWell" cx="55%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#7A2118" />
          <stop offset="70%" stopColor="#5D1610" />
          <stop offset="100%" stopColor="#9B3227" />
        </radialGradient>
        <linearGradient id="antiqueGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5D1" />
          <stop offset="45%" stopColor="#E4BD70" />
          <stop offset="100%" stopColor="#A67C2E" />
        </linearGradient>
        <filter id="waxDropShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* Outer scalloped wax edge with realistic 3D organic silhouette */}
      <g filter="url(#waxDropShadow)">
        <path
          d="M110 12 C124 10, 134 19, 147 21 C160 23, 174 28, 181 40 C189 52, 198 62, 200 76 C203 90, 209 102, 205 116 C201 130, 203 144, 194 156 C185 168, 179 181, 166 188 C153 195, 141 203, 126 204 C112 206, 98 209, 84 203 C70 198, 56 196, 46 185 C35 174, 24 165, 20 150 C16 136, 11 122, 15 107 C18 93, 17 78, 26 66 C35 54, 41 40, 54 32 C67 24, 80 17, 94 15 C100 14, 105 13, 110 12 Z"
          fill="url(#waxBodyGrad)"
          stroke="rgba(255, 240, 200, 0.35)"
          strokeWidth="1.5"
        />
      </g>

      {/* Raised outer wax rim highlight */}
      <circle
        cx="110"
        cy="110"
        r="78"
        fill="url(#waxInnerWell)"
        stroke="url(#antiqueGoldGrad)"
        strokeWidth="2.4"
      />

      {/* Delicate beaded antique gold inner ring */}
      <circle
        cx="110"
        cy="110"
        r="69"
        fill="none"
        stroke="url(#antiqueGoldGrad)"
        strokeWidth="1.3"
        strokeDasharray="2.5 5.5"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Top & bottom lotus / diamond crest accents */}
      <path
        d="M110 47 L115 54 L110 61 L105 54 Z"
        fill="url(#antiqueGoldGrad)"
      />
      <path
        d="M110 159 L115 166 L110 173 L105 166 Z"
        fill="url(#antiqueGoldGrad)"
      />
      <circle cx="96" cy="54" r="1.8" fill="#E4BD70" opacity="0.85" />
      <circle cx="124" cy="54" r="1.8" fill="#E4BD70" opacity="0.85" />
      <circle cx="96" cy="166" r="1.8" fill="#E4BD70" opacity="0.85" />
      <circle cx="124" cy="166" r="1.8" fill="#E4BD70" opacity="0.85" />

      {/* Embossed M × A Monogram */}
      <text
        x="110"
        y="112"
        textAnchor="middle"
        fill="url(#antiqueGoldGrad)"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="44"
        fontWeight="700"
        letterSpacing="2"
      >
        M × A
      </text>

      {/* Delicate Infinity Flourish underneath monogram */}
      <path
        d="M89 133 C89 126, 97 126, 104 133 C111 140, 119 140, 126 133 C133 126, 141 126, 141 133 C141 140, 133 140, 126 133 C119 126, 111 126, 104 133 C97 140, 89 140, 89 133 Z"
        fill="none"
        stroke="url(#antiqueGoldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(-5 0)"
      />

      {/* Subtle top-left specular wax highlight */}
      <path
        d="M52 58 Q74 36 104 34"
        fill="none"
        stroke="rgba(255, 245, 220, 0.35)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GateSunIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2.5V5M12 19V21.5M4.22 4.22L6 6M18 18L19.78 19.78M2.5 12H5M19 12H21.5M4.22 19.78L6 18M18 6L19.78 4.22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GateMoonIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ChapterOpening({
  stage,
  guestName,
  theme = "am",
  onToggleTheme,
  onOpen,
  onSkip,
}) {
  const { lang, toggleLang, t } = useTranslation();
  const doneRef = useRef(false);
  const isClosed = stage === "closed";
  const isOpening = stage === "opening";

  useEffect(() => {
    if (!isOpening) {
      doneRef.current = false;
      return undefined;
    }
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      onSkip?.(true);
    }, reduced ? 180 : OPEN_MS);
    return () => window.clearTimeout(id);
  }, [isOpening, onSkip]);

  if (stage === "complete") return null;

  const handleTrigger = () => {
    if (!isClosed) return;
    onOpen?.();
  };

  return (
    <div
      className={`gate-overlay ${isOpening ? "is-opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={t(couple.chapterTitle)}
    >
      {/* Top Language & Sun/Moon A.M.–P.M. Pills on Gate Screen */}
      {isClosed && (
        <div className="gate-top-bar">
          {onToggleTheme && (
            <button
              type="button"
              className={`gate-lang-pill gate-theme-flip ${theme === "pm" ? "is-pm" : "is-am"}`}
              onClick={onToggleTheme}
              aria-label={
                theme === "am"
                  ? "Switch to P.M. Dark Mode"
                  : "Switch to A.M. Light Mode"
              }
            >
              <span className="theme-flip-inner">
                {theme === "am" ? (
                  <>
                    <GateSunIcon size={14} />
                    <span className="is-on">A.M.</span>
                  </>
                ) : (
                  <>
                    <GateMoonIcon size={13} />
                    <span className="is-on">P.M.</span>
                  </>
                )}
              </span>
            </button>
          )}

          <button
            type="button"
            className="gate-lang-pill"
            onClick={toggleLang}
            aria-label={lang === "hi" ? "Switch to English" : "हिंदी में पढ़ें"}
          >
            <span className={lang === "en" ? "is-on" : ""}>English</span>
            <span className="gate-lang-sep" aria-hidden="true">·</span>
            <span className={lang === "hi" ? "is-on" : ""}>हिन्दी</span>
          </button>
        </div>
      )}

      {/* Seamless 3D Chapter Card — zero center vertical seam line */}
      <div
        className={`gate-stage ${isOpening ? "is-opening" : ""}`}
        onClick={handleTrigger}
      >
        <div className="gate-spotlight" aria-hidden="true" />

        {/* Single unified 3D velvet & gold border panel (no vertical split line) */}
        <div className="gate-doors" aria-hidden="true" />

        {/* Center Front Invitation Typography & Clean Ghibli Medallion */}
        <div className="gate-front-content">
          <p className="gate-ganesh">{t(labels.blessingHeading)}</p>

          {guestName && (
            <div className="gate-guest-pill">
              <span>{t(chapterOpening.guestPrefix)}:</span>
              <strong>{guestName}</strong>
            </div>
          )}

          <p className="gate-kicker">
            {t(couple.chapterTitle)} · {couple.monogram} {couple.infinitySymbol}
          </p>

          <h1 className="gate-couple-title">
            {t(couple.bride.first)} <span>&amp;</span> {t(couple.groom.first)}
          </h1>

          <p className="gate-quote">“{t(chapterOpening.quote)}”</p>

          <button
            type="button"
            className="gate-medallion-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleTrigger();
            }}
            aria-label={t(chapterOpening.openBtn)}
          >
            <span className="medallion-pulse-ring" aria-hidden="true" />
            <RoyalWaxSealSvg />
            <span className="gate-tap-badge">
              {t(chapterOpening.openBtn)}
            </span>
          </button>

          <p className="gate-date-venue">{t(labels.datesLocationLine)}</p>

          <a
            href={couple.combinedInstagram}
            target="_blank"
            rel="noreferrer"
            className="gate-ig-chip"
            onClick={(e) => e.stopPropagation()}
          >
            <InstagramIcon size={14} />
            <span>{couple.combinedHandle}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
