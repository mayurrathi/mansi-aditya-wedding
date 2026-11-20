import { useEffect, useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { labels } from "../data/weddingData";

export default function VineNav() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const sections = labels.navSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-38% 0px -48% 0px", threshold: 0.01 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
