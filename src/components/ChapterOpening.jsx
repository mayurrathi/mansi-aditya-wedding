import { useEffect, useId, useRef } from "react";
import { useTranslation } from "../context/LanguageContext";
import { brand, chapterOpening, couple, labels } from "../data/weddingData";
import AmFoilLogo from "./AmFoilLogo";
import InstagramIcon from "./InstagramIcon";

const OPEN_MS = 820;

function GateModernOrbitRing() {
  const uid = useId().replace(/:/g, "");
  const ringId = `gateModernOrbit-${uid}`;

  return (
    <svg viewBox="0 0 220 220" className="gate-modern-orbit-svg" aria-hidden="true">
      <defs>
        <path
          id={ringId}
          d="M 110,110 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0"
        />
      </defs>
      <circle
        cx="110"
        cy="110"
        r="102"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.26"
        strokeWidth="0.9"
      />
      <g className="gate-modern-orbit-spin">
        <text
          fill="currentColor"
          fillOpacity="0.78"
          fontSize="8.6"
          fontWeight="600"
          letterSpacing="3.35"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
        >
          <textPath href={`#${ringId}`} startOffset="0%">
            THE AM CHAPTER • 04 &amp; 05 DEC 2026 • PIPARIYA •
          </textPath>
        </text>
      </g>
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
      {/* Ambient warm peach-lily & honey-gold aura */}
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

      {/* Official Physical-Card-Synced Stationery Cover */}
      <div
        className={`gate-stage ${isOpening ? "is-opening" : ""}`}
        onClick={handleTrigger}
      >
        <div className="gate-doors" aria-hidden="true">
          <div className="editorial-card-frame" />
          <img
            src={brand.lilyTl}
            alt=""
            className="gate-lily gate-lily--tl"
            decoding="async"
          />
          <img
            src={brand.lilyBr}
            alt=""
            className="gate-lily gate-lily--br"
            decoding="async"
          />
        </div>

        <div className="gate-front-content">
          <p className="gate-ganesh">{t(labels.blessingHeading)}</p>

          {guestName && (
            <div className="gate-guest-pill">
              <span>{t(chapterOpening.guestPrefix)}:</span>
              <strong>{guestName}</strong>
            </div>
          )}

          <button
            type="button"
            className="gate-crest-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleTrigger();
            }}
            aria-label={t(chapterOpening.openBtn)}
          >
            <span className="seal-unseal-burst" aria-hidden="true" />
            <GateModernOrbitRing />
            <span className="gate-modern-medallion">
              <AmFoilLogo
                className="gate-am-foil"
                label="AM Official Wedding Monogram"
              />
            </span>
          </button>

          <h1 className="gate-couple-title">
            {t(couple.bride.first)} <span>&amp;</span> {t(couple.groom.first)}
          </h1>

          <p className="gate-hashtag">{couple.hashtag}</p>
          <p className="gate-quote">“{t(chapterOpening.quote)}”</p>

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
            <p className="gate-host-family">{t(couple.hostSignature)}</p>
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
