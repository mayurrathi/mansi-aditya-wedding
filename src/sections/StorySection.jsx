import { useRef, useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { labels, storyChapters } from "../data/weddingData";
import RevealOnScroll from "../components/RevealOnScroll";

export default function StorySection({ onPreview }) {
  const { t } = useTranslation();
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 340;
    const gap = 22;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIdx(Math.min(storyChapters.length - 1, Math.max(0, idx)));
  };

  const scrollToChapter = (idx) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.min(storyChapters.length - 1, Math.max(0, idx));
    const card = el.children[clamped];
    if (!card) return;
    const targetLeft = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
    el.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    setActiveIdx(clamped);
  };

  return (
    <section id="story" className="section story-section">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header section-header--center">
            <p className="eyebrow-tag">{t(labels.storyEyebrow)}</p>
            <h2 className="section-title">{t(labels.storyHeading)}</h2>
            <p className="section-lede">{t(labels.storyLede)}</p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="story-rail-wrap">
        <div
          ref={trackRef}
          className="story-rail"
          onScroll={handleScroll}
          role="region"
          aria-label={t(labels.storyHeading)}
        >
          {storyChapters.map((ch, idx) => (
            <article key={ch.id} className="story-panel" style={{ "--stack-idx": idx }}>
              <div className="story-panel-head">
                <span className="story-chapter-no">{t(ch.chapter)}</span>
                <span className="story-jharokha-dots" aria-hidden="true">✦ • ✦</span>
              </div>

              <button
                type="button"
                className="story-art-btn"
                onClick={() => onPreview?.({ album: "story", index: idx })}
                aria-label={t(ch.title)}
              >
                <img src={ch.art} alt={t(ch.title)} loading="eager" decoding="async" />
                <span className="story-zoom-pill">🎨 Ghibli Scene · 🔍</span>
              </button>

              <h3 className="story-panel-title">{t(ch.title)}</h3>
              <p className="story-panel-caption">{t(ch.text)}</p>

              {ch.reelBadge && (
                <div className="story-reel-quote-box">
                  <span className="reel-quote-tag">{t(ch.reelBadge.tag)}</span>
                  <p className="reel-quote-text">“{t(ch.reelBadge.quote)}”</p>
                </div>
              )}

              {ch.tapedPhoto && (
                <button
                  type="button"
                  className="taped-photo-btn"
                  style={{ "--tilt": ch.tapedPhoto.tilt }}
                  onClick={() =>
                    onPreview?.({
                      src: ch.tapedPhoto.src,
                      caption: t(ch.tapedPhoto.caption),
                    })
                  }
                >
                  <span className="washi-tape" aria-hidden="true" />
                  <img
                    src={ch.tapedPhoto.src}
                    alt={t(ch.tapedPhoto.caption)}
                    loading="eager"
                    decoding="async"
                  />
                  <span className="taped-photo-caption">📸 {t(ch.tapedPhoto.caption)}</span>
                </button>
              )}
            </article>
          ))}
        </div>

        <div className="story-controls">
          <button
            type="button"
            className="story-nav-btn"
            onClick={() => scrollToChapter(activeIdx - 1)}
            disabled={activeIdx === 0}
            aria-label="Previous chapter"
          >
            ←
          </button>
          <div className="story-dots" role="tablist" aria-label="Story chapters">
            {storyChapters.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                role="tab"
                className={`story-dot ${idx === activeIdx ? "is-active" : ""}`}
                onClick={() => scrollToChapter(idx)}
                aria-label={`${ch.no} ${t(ch.title)}`}
                aria-selected={idx === activeIdx}
              />
            ))}
          </div>
          <button
            type="button"
            className="story-nav-btn"
            onClick={() => scrollToChapter(activeIdx + 1)}
            disabled={activeIdx === storyChapters.length - 1}
            aria-label="Next chapter"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
