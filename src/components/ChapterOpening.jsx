import { useEffect, useId, useRef } from "react";
import { useTranslation } from "../context/LanguageContext";
import { chapterOpening, couple, labels } from "../data/weddingData";
import InstagramIcon from "./InstagramIcon";

const OPEN_MS = 820;

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

function ModernEditorialStampSvg() {
  const uid = useId().replace(/:/g, "");
  const ringId = `editorialRing-${uid}`;

  return (
    <svg viewBox="0 0 200 200" className="editorial-stamp-svg" aria-hidden="true">
      <defs>
        <path
          id={ringId}
          d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
        />
      </defs>

      {/* Slow-orbiting modern editorial date & chapter typography ring */}
      <g className="editorial-stamp-orbit">
        <circle
          cx="100"
          cy="100"
          r="91"
          fill="none"
          stroke="rgba(166, 58, 46, 0.22)"
          strokeWidth="1"
        />
        <text
          fill="#6d5c50"
          fontSize="9.6"
          fontWeight="600"
          letterSpacing="3.4"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
        >
          <textPath href={`#${ringId}`} startOffset="0%">
            THE AM CHAPTER • 04 &amp; 05 DEC 2026 • PIPARIYA •
          </textPath>
        </text>
      </g>

      {/* Frosted porcelain inner medallion */}
      <circle
        cx="100"
        cy="100"
        r="56"
        fill="rgba(255, 253, 249, 0.96)"
        stroke="rgba(28, 43, 34, 0.14)"
        strokeWidth="1.2"
      />
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="none"
        stroke="rgba(166, 58, 46, 0.22)"
        strokeWidth="0.9"
        strokeDasharray="2 4"
      />

      {/* Minimal editorial M & A serif crest */}
      <text
        x="100"
        y="107"
        textAnchor="middle"
        fill="#1c2b22"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="30"
        fontWeight="600"
        letterSpacing="2"
      >
        M <tspan fill="#a63a2e" fontStyle="italic" fontSize="24">×</tspan> A
      </text>

      {/* Ultra-minimal botanical leaf flourish below monogram */}
      <path
        d="M84 123 Q100 116 116 123"
        fill="none"
        stroke="#8bb17e"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="100" cy="120" r="2" fill="#a63a2e" />
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
      {/* Ambient soft modern botanical mesh aura */}
      <div className="gate-ambient-orb gate-ambient-orb--left" aria-hidden="true" />
      <div className="gate-ambient-orb gate-ambient-orb--right" aria-hidden="true" />

      {/* Top Language & Sun/Moon A.M.–P.M. Pills on Landing Screen */}
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

      {/* Modern Editorial Stationery Cover Card */}
      <div
        className={`gate-stage ${isOpening ? "is-opening" : ""}`}
        onClick={handleTrigger}
      >
        <div className="gate-doors" aria-hidden="true">
          <div className="editorial-arch-frame" />
        </div>

        <div className="gate-front-content">
          <p className="gate-ganesh">{t(labels.blessingHeading)}</p>

          {guestName && (
            <div className="gate-guest-pill">
              <span>{t(chapterOpening.guestPrefix)}:</span>
              <strong>{guestName}</strong>
            </div>
          )}

          <p className="gate-kicker">
            {t(couple.chapterTitle)} · {couple.hashtag}
          </p>

          <h1 className="gate-couple-title">
            {t(couple.bride.first)} <span>&amp;</span> {t(couple.groom.first)}
          </h1>

          <p className="gate-quote">“{t(chapterOpening.quote)}”</p>

          <button
            type="button"
            className="gate-editorial-stamp-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleTrigger();
            }}
            aria-label={t(chapterOpening.openBtn)}
          >
            <span className="seal-unseal-burst" aria-hidden="true" />
            <ModernEditorialStampSvg />
          </button>

          <button
            type="button"
            className="gate-open-cta"
            onClick={(e) => {
              e.stopPropagation();
              handleTrigger();
            }}
          >
            <span>{t({ en: "Open Invitation", hi: "निमंत्रण खोलें" })}</span>
            <span className="gate-open-cta__arrow" aria-hidden="true">→</span>
          </button>

          <div className="gate-bottom-meta">
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
    </div>
  );
}
