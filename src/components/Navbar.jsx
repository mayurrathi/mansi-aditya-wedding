import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { labels } from "../data/weddingData";
import AmFoilLogo from "./AmFoilLogo";

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
  const [activeId, setActiveId] = useState("hero");
  const progressRef = useRef(null);

  useEffect(() => {
    const sections = labels.navSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);

      const docEl = document.documentElement;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, y / maxScroll));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }

      if (window.innerHeight + y >= docEl.scrollHeight - 60) {
        setActiveId("rsvp");
      } else if (y < 140) {
        setActiveId("hero");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    let observer;
    if (sections.length && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const docEl = document.documentElement;
          if (window.innerHeight + window.scrollY >= docEl.scrollHeight - 60) {
            setActiveId("rsvp");
            return;
          }
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-36% 0px -48% 0px", threshold: 0.01 }
      );
      sections.forEach((el) => observer.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  return (
    <>
      <div
        className={`mobile-drawer-backdrop ${drawerOpen ? "is-open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <header className={`site-nav ${scrolled ? "is-scrolled" : ""} ${drawerOpen ? "is-drawer-open" : ""}`}>
        <div className="container site-nav__inner">
          <a
            href="#hero"
            className="site-nav__brand"
            onClick={() => setDrawerOpen(false)}
            aria-label="AM — The AM Chapter Home"
          >
            <AmFoilLogo className="site-nav__foil-logo" label="AM — The AM Chapter" />
          </a>

          <nav className="site-nav__links" aria-label="Invitation sections">
            {labels.navSections.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`site-nav__link ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {t(item.label)}
                </a>
              );
            })}
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
              className={`nav-pill-btn site-nav__menu-btn ${drawerOpen ? "is-active" : ""}`}
              onClick={() => setDrawerOpen((o) => !o)}
              aria-expanded={drawerOpen}
              aria-label="Toggle navigation menu"
            >
              {drawerOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        <nav
          className={`mobile-drawer ${drawerOpen ? "is-open" : ""}`}
          aria-label="Mobile sections"
          aria-hidden={!drawerOpen}
        >
          <div className="mobile-drawer__grid">
            {labels.navSections.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`mobile-drawer__item ${isActive ? "is-active" : ""}`}
                  tabIndex={drawerOpen ? 0 : -1}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="mobile-drawer__num">{item.num}</span>
                  <span className="mobile-drawer__label">{t(item.label)}</span>
                </a>
              );
            })}
          </div>

          <div className="mobile-drawer__foot">
            <span className="mobile-drawer__meta">
              {t(labels.datesShort)} · {t({ en: "Aashirwad Garden, Pipariya", hi: "आशीर्वाद गार्डन, पिपरिया" })}
            </span>
            <a
              href="#rsvp"
              className="mobile-drawer__rsvp"
              tabIndex={drawerOpen ? 0 : -1}
              onClick={() => setDrawerOpen(false)}
            >
              {t({ en: "RSVP →", hi: "उपस्थिति →" })}
            </a>
          </div>
        </nav>

        <div ref={progressRef} className="site-nav__progress" aria-hidden="true" />
      </header>
    </>
  );
}
