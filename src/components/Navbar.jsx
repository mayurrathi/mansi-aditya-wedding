import { useEffect, useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { couple, labels } from "../data/weddingData";

function SunIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="theme-svg-icon theme-svg-sun"
      aria-hidden="true"
    >
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

function MoonIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="theme-svg-icon theme-svg-moon"
      aria-hidden="true"
    >
      <path
        d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar({ theme, onToggleTheme, playing, onToggleMusic }) {
  const { lang, toggleLang, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""} ${drawerOpen ? "is-drawer-open" : ""}`}>
      <div className="container site-nav__inner">
        <a href="#hero" className="site-nav__brand">
          <span>{couple.monogram}</span>
        </a>

        <nav className="site-nav__links" aria-label="Invitation sections">
          {labels.navSections.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="site-nav__link">
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="site-nav__controls">
          <button
            type="button"
            className="nav-pill-btn"
            onClick={() => {
              toggleLang();
              setDrawerOpen(false);
            }}
            aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
          >
            {lang === "en" ? "हिन्दी" : "English"}
          </button>

          <button
            type="button"
            className={`nav-pill-btn nav-theme-flip ${theme === "pm" ? "is-pm is-active" : "is-am"}`}
            onClick={() => {
              onToggleTheme();
              setDrawerOpen(false);
            }}
            aria-label={
              theme === "am"
                ? "Switch to P.M. Dark mode"
                : "Switch to A.M. Light mode"
            }
            title={
              theme === "am"
                ? "A.M. Light Mode · Tap to flip to P.M. Dark Mode"
                : "P.M. Dark Mode · Tap to flip to A.M. Light Mode"
            }
          >
            <span className="theme-flip-inner">
              {theme === "am" ? (
                <>
                  <SunIcon size={15} />
                  <span>A.M.</span>
                </>
              ) : (
                <>
                  <MoonIcon size={14} />
                  <span>P.M.</span>
                </>
              )}
            </span>
          </button>

          <button
            type="button"
            className={`nav-pill-btn ${playing ? "is-active" : ""}`}
            onClick={onToggleMusic}
            aria-label={playing ? "Pause wedding music" : "Play wedding music"}
          >
            {playing ? "♪ On" : "♪ Off"}
          </button>

          <button
            type="button"
            className="nav-pill-btn site-nav__menu-btn"
            onClick={() => setDrawerOpen((o) => !o)}
            aria-expanded={drawerOpen}
            aria-label="Toggle navigation menu"
          >
            {drawerOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {drawerOpen && (
        <nav className="mobile-drawer" aria-label="Mobile sections">
          {labels.navSections.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setDrawerOpen(false)}
            >
              {t(item.label)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
