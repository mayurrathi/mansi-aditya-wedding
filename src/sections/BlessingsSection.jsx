import { useState } from "react";
import confetti from "canvas-confetti";
import { useTranslation } from "../context/LanguageContext";
import { blessingKeepsakes, labels } from "../data/weddingData";
import RevealOnScroll from "../components/RevealOnScroll";

function burstFromElement(el) {
  let shapes = ["circle", "star"];
  try {
    const scalar = 1.9;
    shapes = [
      confetti.shapeFromText({ text: "💐", scalar }),
      confetti.shapeFromText({ text: "✨", scalar }),
      confetti.shapeFromText({ text: "♾️", scalar }),
      "circle",
    ];
  } catch {
    // Fallback if shapeFromText is unsupported
  }

  let origin = { x: 0.5, y: 0.65 };
  if (el?.getBoundingClientRect) {
    const rect = el.getBoundingClientRect();
    origin = {
      x: Math.min(0.92, Math.max(0.08, (rect.left + rect.width / 2) / window.innerWidth)),
      y: Math.min(0.88, Math.max(0.15, (rect.top + rect.height / 2) / window.innerHeight)),
    };
  }

  confetti({
    particleCount: 48,
    spread: 74,
    startVelocity: 34,
    origin,
    shapes,
    colors: ["#E4BD70", "#C8DEC2", "#8BB17E", "#A63A2E"],
    disableForReducedMotion: true,
  });
}

export default function BlessingsSection() {
  const { t } = useTranslation();
  const [flippedIds, setFlippedIds] = useState([]);
  const [sentIds, setSentIds] = useState([]);
  const [totalShowered, setTotalShowered] = useState(108);

  const toggleFlip = (id) => {
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendBlessing = (e, id) => {
    e.stopPropagation();
    burstFromElement(e.currentTarget);
    setTotalShowered((n) => n + 1);
    setSentIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleShowerAll = (e) => {
    setFlippedIds(blessingKeepsakes.map((c) => c.id));
    setSentIds(blessingKeepsakes.map((c) => c.id));
    setTotalShowered((n) => n + blessingKeepsakes.length);
    burstFromElement(e.currentTarget);
  };

  return (
    <section id="blessings" className="section section--tinted">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header section-header--center">
            <p className="eyebrow-tag">{t(labels.blessingsEyebrow)}</p>
            <h2 className="section-title">{t(labels.blessingsHeading)}</h2>
            <p className="section-lede">{t(labels.blessingsLede)}</p>
          </div>

          <div className="blessing-counter-wrap">
            <span className="blessing-counter-pill" aria-live="polite">
              🎉 <strong className="tabular-nums">{totalShowered}</strong>{" "}
              {t(labels.blessingCounterLabel)}
            </span>
          </div>

          <div className="blessing-cards-grid">
            {blessingKeepsakes.map((card) => {
              const isFlipped = flippedIds.includes(card.id);
              const isSent = sentIds.includes(card.id);

              return (
                <div
                  key={card.id}
                  className={`blessing-flip tone-${card.tone} ${isFlipped ? "is-flipped" : ""} ${isSent ? "is-sent-card" : ""}`}
                >
                  <div className="blessing-flip-inner">
                    {/* FRONT — Shagun Envelope Seal Card */}
                    <button
                      type="button"
                      className="blessing-face blessing-front"
                      onClick={() => toggleFlip(card.id)}
                      aria-expanded={isFlipped}
                    >
                      <span className="shagun-seal-tag">{t(card.seal)}</span>
                      <span className="blessing-emoji" aria-hidden="true">
                        {card.emoji}
                      </span>
                      <h3>{t(card.frontTitle)}</h3>
                      <p>{t(card.frontSub)}</p>
                      <span className="blessing-tap-cue" aria-hidden="true">↻</span>
                    </button>

                    {/* BACK — Wish + Couple Reply + Confetti Button */}
                    <div
                      className="blessing-face blessing-back"
                      onClick={() => toggleFlip(card.id)}
                    >
                      <p className="blessing-wish-text">“{t(card.wish)}”</p>
                      <p className="blessing-reply-bubble">{t(card.reply)}</p>
                      <button
                        type="button"
                        className={`btn-primary btn-compact blessing-send-btn ${isSent ? "is-sent" : ""}`}
                        onClick={(e) => handleSendBlessing(e, card.id)}
                      >
                        {isSent ? t(labels.blessingSentBtn) : t(labels.blessingSendBtn)}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="blessing-all-row">
            <button type="button" className="btn-secondary" onClick={handleShowerAll}>
              {t(labels.blessingAllBtn)}
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
