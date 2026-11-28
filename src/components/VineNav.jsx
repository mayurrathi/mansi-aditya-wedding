import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { labels } from "../data/weddingData";

export default function VineNav() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState("hero");
  const maxScrollRef = useRef(1);

  useEffect(() => {
    const sections = labels.navSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    const measureMaxScroll = () => {
      maxScrollRef.current = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };

    let rafId = 0;
    const updateOnFrame = () => {
      rafId = 0;
      const y = window.scrollY;
      if (y >= maxScrollRef.current - 60) {
        setActiveId((prev) => (prev === "rsvp" ? prev : "rsvp"));
      } else if (y < 140) {
        setActiveId((prev) => (prev === "hero" ? prev : "hero"));
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateOnFrame);
      }
    };

    measureMaxScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureMaxScroll, { passive: true });

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      resizeObserver = new ResizeObserver(measureMaxScroll);
      resizeObserver.observe(document.body);
    }

    let observer;
    if (sections.length && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (window.scrollY >= maxScrollRef.current - 60) {
            setActiveId((prev) => (prev === "rsvp" ? prev : "rsvp"));
            return;
          }
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              setActiveId((prev) => (prev === id ? prev : id));
            }
          });
        },
        { rootMargin: "-38% 0px -48% 0px", threshold: 0.01 }
      );
      sections.forEach((el) => observer.observe(el));
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureMaxScroll);
      resizeObserver?.disconnect();
      observer?.disconnect();
    };
  }, []);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="vine-nav" aria-label="Section Navigation">
      <div className="vine-stem" aria-hidden="true" />
      <ul className="vine-list">
        {labels.navSections.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={isActive ? "is-active" : ""}>
              <button
                type="button"
                className="vine-leaf-btn"
                onClick={() => jumpTo(item.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={t(item.label)}
              >
                <span className="vine-label">{t(item.label)}</span>
                <span className="vine-leaf-node" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
