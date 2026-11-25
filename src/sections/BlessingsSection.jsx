import { useId, useState } from "react";
import confetti from "canvas-confetti";
import { useTranslation } from "../context/LanguageContext";
import { blessingKeepsakes, couple, labels } from "../data/weddingData";
import RevealOnScroll from "../components/RevealOnScroll";

const SKY_STARS = [
  { id: 0, left: "8%", top: "18%", size: 2.5, delay: "0s" },
  { id: 1, left: "15%", top: "62%", size: 2, delay: "0.7s" },
  { id: 2, left: "24%", top: "14%", size: 3, delay: "1.4s" },
  { id: 3, left: "34%", top: "48%", size: 2, delay: "0.4s" },
  { id: 4, left: "44%", top: "22%", size: 2.5, delay: "1.1s" },
  { id: 5, left: "56%", top: "15%", size: 3, delay: "0.2s" },
  { id: 6, left: "66%", top: "55%", size: 2, delay: "1.6s" },
  { id: 7, left: "75%", top: "14%", size: 2.5, delay: "0.9s" },
  { id: 8, left: "86%", top: "46%", size: 3, delay: "0.3s" },
  { id: 9, left: "92%", top: "24%", size: 2, delay: "1.3s" },
  { id: 10, left: "49%", top: "68%", size: 2, delay: "0.6s" },
  { id: 11, left: "28%", top: "74%", size: 2.5, delay: "1.8s" },
];

const QUICK_BLESSING_PRESETS = [
  {
    en: "Wishing endless love & laughter ♾️",
    hi: "अनंत प्रेम और मुस्कान की शुभकामनाएँ ♾️",
  },
  {
    en: "Shubh Vivah & joyful Pheras ✨",
    hi: "शुभ विवाह एवं मंगल फेरे की बधाई ✨",
  },
  {
    en: "Forever blooming M × A 💛",
    hi: "सदा महकता रहे M × A का साथ 💛",
  },
];

function burstLanternSpark(el) {
  let shapes = ["circle", "star"];
  try {
    const scalar = 1.8;
    shapes = [
      confetti.shapeFromText({ text: "🏮", scalar }),
      confetti.shapeFromText({ text: "✨", scalar }),
      confetti.shapeFromText({ text: "♾️", scalar }),
      "circle",
    ];
  } catch {
    // Fallback when shapeFromText is unavailable
  }

  let origin = { x: 0.5, y: 0.62 };
  if (el?.getBoundingClientRect) {
    const rect = el.getBoundingClientRect();
    origin = {
      x: Math.min(0.92, Math.max(0.08, (rect.left + rect.width / 2) / window.innerWidth)),
      y: Math.min(0.88, Math.max(0.15, (rect.top + rect.height / 2) / window.innerHeight)),
    };
  }

  confetti({
    particleCount: 44,
    spread: 72,
    startVelocity: 34,
    origin,
    shapes,
    colors: ["#E6B45A", "#FFF3C4", "#DF6C98", "#9DB76B"],
    disableForReducedMotion: true,
  });
}

function SkyLanternSvg({ tone = "gold", size = 56 }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `skyLantern-${uid}`;
  const glowId = `skyGlow-${uid}`;

  const tones = {
    gold: { top: "#F6D587", mid: "#E4A847", edge: "#9D681B" },
    pistachio: { top: "#DDF0D6", mid: "#9DB76B", edge: "#4A6128" },
    sindoor: { top: "#F8B299", mid: "#D95F43", edge: "#8E291D" },
    emerald: { top: "#F9D0DF", mid: "#DF6C98", edge: "#7E1F3F" },
  };
  const palette = tones[tone] || tones.gold;

  return (
    <svg
      width={size}
      height={Math.round(size * 1.28)}
      viewBox="0 0 64 82"
      fill="none"
      className="sky-lantern-svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="62%" r="55%">
          <stop offset="0%" stopColor="#FFF6CF" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#E4BD70" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#E4BD70" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gradId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={palette.top} />
          <stop offset="60%" stopColor={palette.mid} />
          <stop offset="100%" stopColor={palette.edge} />
        </linearGradient>
      </defs>

      <circle cx="32" cy="40" r="30" fill={`url(#${glowId})`} />
      <path
        d="M16 14 C16 6, 48 6, 48 14 L54 32 C54 46, 46 58, 42 64 L22 64 C18 58, 10 46, 10 32 Z"
        fill={`url(#${gradId})`}
        stroke="#FFF3C8"
        strokeWidth="1.2"
      />
      <path d="M24 10 C21 26, 21 48, 26 64" stroke={palette.edge} strokeOpacity="0.45" strokeWidth="1" />
      <path d="M40 10 C43 26, 43 48, 38 64" stroke={palette.edge} strokeOpacity="0.45" strokeWidth="1" />
      <ellipse cx="32" cy="64" rx="10" ry="2.6" fill="#4A2D12" stroke="#E4BD70" strokeWidth="1" />
      <ellipse cx="32" cy="54" rx="8" ry="10" fill="#FFF8D8" fillOpacity="0.88" />
      <path d="M32 58 C29 53, 31 48, 32 45 C33 48, 35 53, 32 58 Z" fill="#FFAA3B" />
      <line x1="25" y1="65" x2="25" y2="73" stroke="#E4BD70" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="39" y1="65" x2="39" y2="73" stroke="#E4BD70" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="32" y1="66" x2="32" y2="77" stroke="#E4BD70" strokeWidth="1.2" />
      <circle cx="32" cy="78" r="2" fill="#E4BD70" />
    </svg>
  );
}

function BrassDiyaSvg({ lit }) {
  const uid = useId().replace(/:/g, "");
  const brassId = `brassBowl-${uid}`;
  const flameHaloId = `diyaHalo-${uid}`;

  return (
    <svg viewBox="0 0 88 70" className="brass-diya-svg" aria-hidden="true">
      <defs>
        <radialGradient id={flameHaloId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF7D4" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#E4BD70" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#E4BD70" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={brassId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5DC9B" />
          <stop offset="50%" stopColor="#C99B42" />
          <stop offset="100%" stopColor="#7C561B" />
        </linearGradient>
      </defs>

      {lit && <circle cx="44" cy="22" r="22" fill={`url(#${flameHaloId})`} className="diya-halo-pulse" />}

      {lit ? (
        <g className="diya-flame-group">
          <path
            d="M44 7 C50 16, 52 24, 44 30 C36 24, 38 16, 44 7 Z"
            fill="#FFAE38"
          />
          <path
            d="M44 13 C47.5 19, 48.5 24, 44 28 C39.5 24, 40.5 19, 44 13 Z"
            fill="#FFF9DA"
          />
        </g>
      ) : (
        <path
          d="M44 23 L44 30"
          stroke="#7C561B"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      )}

      {/* Sculpted Brass Bowl */}
      <ellipse cx="44" cy="34" rx="26" ry="7" fill="#5D3D13" stroke="#E4BD70" strokeWidth="1.2" />
      <path
        d="M18 34 C20 50, 32 55, 44 55 C56 55, 68 50, 70 34 Q44 42 18 34 Z"
        fill={`url(#${brassId})`}
        stroke="#F6DC9A"
        strokeWidth="1"
      />
      <path d="M34 55 L54 55 L58 61 L30 61 Z" fill={`url(#${brassId})`} stroke="#7C561B" strokeWidth="1" />
      <ellipse cx="44" cy="62" rx="16" ry="3" fill="#9A7029" stroke="#F6DC9A" strokeWidth="0.9" />
    </svg>
  );
}

export default function BlessingsSection() {
  const { lang, t } = useTranslation();
  const [litIds, setLitIds] = useState(["elders"]);
  const [customLanterns, setCustomLanterns] = useState([]);
  const [selectedId, setSelectedId] = useState("elders");
  const [totalReleased, setTotalReleased] = useState(108);
  const [senderInput, setSenderInput] = useState("");
  const [wishInput, setWishInput] = useState("");

  const activeCeremonial = blessingKeepsakes.filter((item) => litIds.includes(item.id));
  const skyLanterns = [
    ...activeCeremonial.map((item) => ({
      ...item,
      isCustom: false,
      labelText: t(item.title),
      subText: t(item.sender),
    })),
    ...customLanterns,
  ];

  const currentLantern =
    skyLanterns.find((item) => item.id === selectedId) ||
    skyLanterns[skyLanterns.length - 1] ||
    blessingKeepsakes[0];

  const handleLightDiya = (e, card) => {
    const alreadyLit = litIds.includes(card.id);
    if (!alreadyLit) {
      setLitIds((prev) => [...prev, card.id]);
      setTotalReleased((n) => n + 1);
      burstLanternSpark(e.currentTarget);
    }
    setSelectedId(card.id);
  };

  const handleLightAll = (e) => {
    const unlitCount = blessingKeepsakes.length - litIds.length;
    setLitIds(blessingKeepsakes.map((c) => c.id));
    if (unlitCount > 0) {
      setTotalReleased((n) => n + unlitCount);
    }
    setSelectedId(blessingKeepsakes[blessingKeepsakes.length - 1].id);
    burstLanternSpark(e.currentTarget);
  };

  const handleReleaseCustomLantern = (e) => {
    e.preventDefault();
    const cleanSender =
      senderInput.trim() || (lang === "hi" ? "स्नेही परिवार" : "Dear Well-Wisher");
    const cleanWish =
      wishInput.trim() || t(QUICK_BLESSING_PRESETS[0]);

    const idx = customLanterns.length;
    const xOffsets = ["26%", "50%", "72%", "18%", "64%"];
    const yOffsets = ["15%", "22%", "12%", "34%", "26%"];
    const newId = `custom-${Date.now()}`;

    const newLantern = {
      id: newId,
      isCustom: true,
      tone: "gold",
      xPos: xOffsets[idx % xOffsets.length],
      yPos: yOffsets[idx % yOffsets.length],
      title: { en: cleanSender, hi: cleanSender },
      labelText: cleanSender,
      subText: cleanWish,
      sender: { en: cleanSender, hi: cleanSender },
      wish: { en: cleanWish, hi: cleanWish },
      reply: {
        en: `Mansi & Aditya: Thank you ${cleanSender} for lighting up our Pipariya sky! 🏮♥️`,
        hi: `मानसी एवं आदित्य: ${cleanSender}, आपके इस पावन आकाश दीप और आशीर्वाद के लिए हृदय से धन्यवाद! 🏮♥️`,
      },
    };

    setCustomLanterns((prev) => [...prev, newLantern]);
    setSelectedId(newId);
    setTotalReleased((n) => n + 1);
    setWishInput("");
    burstLanternSpark(e.currentTarget);
  };

  const latestCustom = customLanterns[customLanterns.length - 1];
  const whatsappBlessingUrl = latestCustom
    ? `https://wa.me/${couple.whatsappNumber}?text=${encodeURIComponent(
        lang === "hi"
          ? `शुभाशीष 🏮 ${latestCustom.labelText} की ओर से मानसी एवं आदित्य को शुभकामना: "${latestCustom.subText}" (#iAMinLove)`
          : `Blessing Sky Lantern 🏮 from ${latestCustom.labelText} for Mansi & Aditya: "${latestCustom.subText}" (#iAMinLove)`
      )}`
    : null;

  return (
    <section id="blessings" className="section section--tinted">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header section-header--center">
            <p className="eyebrow-tag">{t(labels.blessingsEyebrow)}</p>
            <h2 className="section-title">{t(labels.blessingsHeading)}</h2>
            <p className="section-lede">{t(labels.blessingsLede)}</p>
          </div>

          <div className="lantern-courtyard-shell">
            {/* Starlit Pipariya Courtyard Night Sky Stage */}
            <div className="lantern-sky-stage">
              <svg
                className="sky-jharokha-arch"
                viewBox="0 0 800 110"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 95 Q160 15 400 72 Q640 15 800 95"
                  fill="none"
                  stroke="#E4BD70"
                  strokeOpacity="0.34"
                  strokeWidth="1.6"
                  strokeDasharray="6 6"
                />
                <circle cx="74" cy="36" r="14" fill="#FFF3C8" fillOpacity="0.88" />
                <circle cx="80" cy="32" r="12" fill="#160A0E" />
              </svg>

              {SKY_STARS.map((star) => (
                <span
                  key={star.id}
                  className="sky-star"
                  style={{
                    left: star.left,
                    top: star.top,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    animationDelay: star.delay,
                  }}
                  aria-hidden="true"
                />
              ))}

              <div className="sky-counter-pill" aria-live="polite">
                🏮 <strong className="tabular-nums">{totalReleased}</strong>{" "}
                {t(labels.blessingCounterLabel)}
              </div>

              <div className="sky-lanterns-canvas">
                {skyLanterns.map((lantern, idx) => {
                  const isSelected = currentLantern?.id === lantern.id;
                  return (
                    <button
                      key={lantern.id}
                      type="button"
                      className={`sky-lantern-node ${isSelected ? "is-selected" : ""}`}
                      style={{
                        left: lantern.xPos,
                        top: lantern.yPos,
                        "--drift-delay": `${(idx % 4) * 0.55}s`,
                      }}
                      onClick={(e) => {
                        setSelectedId(lantern.id);
                        burstLanternSpark(e.currentTarget);
                      }}
                      aria-label={lantern.labelText}
                    >
                      <SkyLanternSvg tone={lantern.tone} size={isSelected ? 54 : 46} />
                      <span className="sky-lantern-tag">
                        <strong>{lantern.labelText}</strong>
                        {lantern.isCustom && (
                          <small>{lantern.subText}</small>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Lantern Blessing & Couple Reply Readout */}
            {currentLantern && (
              <div className="lantern-readout-card" aria-live="polite">
                <div className="lantern-readout-card__wish">
                  <span className="lantern-readout-eyebrow">
                    🏮 {t(currentLantern.title)}
                  </span>
                  <p>“{t(currentLantern.wish)}”</p>
                </div>
                <p className="lantern-readout-reply">{t(currentLantern.reply)}</p>
              </div>
            )}

            {/* 4 Ceremonial Brass Diya Pillars */}
            <div className="diya-altar-grid">
              {blessingKeepsakes.map((card) => {
                const isLit = litIds.includes(card.id);
                const isSelected = currentLantern?.id === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    className={`diya-pillar-btn tone-${card.tone} ${isLit ? "is-lit" : ""} ${
                      isSelected ? "is-selected" : ""
                    }`}
                    onClick={(e) => handleLightDiya(e, card)}
                    aria-pressed={isLit}
                  >
                    <span className="diya-pillar-code">
                      {card.emoji} {card.code}
                    </span>
                    <BrassDiyaSvg lit={isLit} />
                    <h3 className="diya-pillar-title">{t(card.title)}</h3>
                    <span className="diya-pillar-status">
                      {isLit ? t(labels.blessingSentBtn) : t(card.subtitle)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Guest Personal Sky Lantern Composer */}
            <form className="custom-lantern-form" onSubmit={handleReleaseCustomLantern}>
              <div className="custom-lantern-head">
                <div>
                  <h3>{t(labels.customLanternTitle)}</h3>
                  <p>{t(labels.customLanternSub)}</p>
                </div>
                <button
                  type="button"
                  className="btn-secondary btn-compact"
                  onClick={handleLightAll}
                >
                  {t(labels.blessingAllBtn)}
                </button>
              </div>

              <div className="custom-lantern-presets" aria-label="Quick blessing ideas">
                {QUICK_BLESSING_PRESETS.map((preset) => (
                  <button
                    key={preset.en}
                    type="button"
                    className="lantern-preset-chip"
                    onClick={() => setWishInput(t(preset))}
                  >
                    + {t(preset)}
                  </button>
                ))}
              </div>

              <div className="custom-lantern-fields">
                <input
                  type="text"
                  className="rsvp-input"
                  value={senderInput}
                  onChange={(e) => setSenderInput(e.target.value)}
                  placeholder={t(labels.customLanternNamePh)}
                  aria-label={t(labels.customLanternNamePh)}
                />
                <input
                  type="text"
                  className="rsvp-input"
                  value={wishInput}
                  onChange={(e) => setWishInput(e.target.value)}
                  placeholder={t(labels.customLanternWishPh)}
                  aria-label={t(labels.customLanternWishPh)}
                />
                <button type="submit" className="btn-primary">
                  {t(labels.customLanternSubmit)}
                </button>
              </div>

              {whatsappBlessingUrl && (
                <div className="custom-lantern-wa-row">
                  <a
                    href={whatsappBlessingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="chip-action chip-accent"
                  >
                    💬 {t(labels.customLanternWhatsapp)}
                  </a>
                </div>
              )}
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
