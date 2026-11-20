import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import confetti from "canvas-confetti";
import { useTranslation } from "../context/LanguageContext";
import { loveSyncDialData } from "../data/weddingData";

const HOUSE_COLORS = [
  "#E4BD70",
  "#A63A2E",
  "#8BB17E",
  "#C8DEC2",
  "#D97F54",
  "#E4BD70",
];

const HOUSE_GLYPHS = ["♾️", "🎬", "🏎️", "🎳", "🌿", "🪔", "🎶", "💍", "⛰️", "🌸", "✨", "❤️"];
const HUB_CIRCUMFERENCE = 2 * Math.PI * 56;

export default function LoveSyncDial() {
  const { t } = useTranslation();
  const [matched, setMatched] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [score, setScore] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const outerWheelRef = useRef(null);
  const innerWheelRef = useRef(null);
  const resultsRef = useRef(null);
  const outerRotRef = useRef(0);
  const innerRotRef = useRef(0);

  useEffect(() => {
    const outerEl = outerWheelRef.current;
    const innerEl = innerWheelRef.current;
    return () => {
      gsap.killTweensOf([outerEl, innerEl]);
    };
  }, []);

  useEffect(() => {
    if (!matched || !resultsRef.current) return undefined;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(".kundli-stagger", {
        y: 16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "back.out(1.6)",
      });
    }, resultsRef);
    return () => ctx.revert();
  }, [matched]);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setMatched(false);
    setScore(0);
    setStepIdx(0);

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScore(36);
      setMatched(true);
      setSpinning(false);
      return;
    }

    outerRotRef.current += 900;
    innerRotRef.current -= 720;
    const counter = { val: 0 };

    gsap.to(outerWheelRef.current, {
      rotation: outerRotRef.current,
      duration: 2.35,
      ease: "power3.out",
      transformOrigin: "50% 50%",
    });

    gsap.to(innerWheelRef.current, {
      rotation: innerRotRef.current,
      duration: 2.35,
      ease: "power2.out",
      transformOrigin: "50% 50%",
    });

    gsap.to(counter, {
      val: 36,
      duration: 2.25,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.round(counter.val);
        setScore(rounded);
        const nextStep = Math.min(
          loveSyncDialData.spinSteps.length - 1,
          Math.floor((rounded / 36) * loveSyncDialData.spinSteps.length)
        );
        setStepIdx(nextStep);
      },
      onComplete: () => {
        setScore(36);
        setMatched(true);
        setSpinning(false);
        const palette = ["#E4BD70", "#C8DEC2", "#8BB17E", "#A63A2E", "#F5F8F3"];
        confetti({
          particleCount: 46,
          angle: 65,
          spread: 62,
          origin: { x: 0.22, y: 0.68 },
          colors: palette,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 46,
          angle: 115,
          spread: 62,
          origin: { x: 0.78, y: 0.68 },
          colors: palette,
          disableForReducedMotion: true,
        });
      },
    });
  };

  const progressDashOffset = HUB_CIRCUMFERENCE * (1 - score / 36);

  return (
    <section id="kundli" className="section kundli-section">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="eyebrow-tag">{t(loveSyncDialData.eyebrow)}</p>
          <h2 className="section-title">{t(loveSyncDialData.heading)}</h2>
          <p className="section-lede">{t(loveSyncDialData.lede)}</p>
        </div>

        <div className="kundli-widget">
          <button
            type="button"
            className={`kundli-wheel-wrap kundli-wheel-btn ${spinning ? "is-spinning" : ""} ${matched ? "is-matched" : ""}`}
            onClick={handleSpin}
            disabled={spinning}
            aria-label={t(loveSyncDialData.spinBtn)}
          >
            <svg viewBox="0 0 340 340" className="kundli-svg" role="img" aria-label={t(loveSyncDialData.heading)}>
              <circle cx="170" cy="170" r="158" fill="none" stroke="#8BB17E" strokeWidth="1.6" strokeDasharray="3 7" />

              {/* Top Fixed Golden Pointer */}
              <polygon points="170,22 162,4 178,4" fill="#E4BD70" stroke="#13261C" strokeWidth="1.5" />

              {/* Outer Spinning 12-House M x A Ring */}
              <g ref={outerWheelRef}>
                <circle cx="170" cy="170" r="144" fill="#13261C" stroke="#E4BD70" strokeWidth="2.4" />
                <circle cx="170" cy="170" r="102" fill="#1B3527" stroke="#8BB17E" strokeWidth="1.5" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const midAngle = ((i * 30 + 15) * Math.PI) / 180;
                  const x1 = 170 + Math.cos(angle) * 102;
                  const y1 = 170 + Math.sin(angle) * 102;
                  const x2 = 170 + Math.cos(angle) * 144;
                  const y2 = 170 + Math.sin(angle) * 144;
                  const gx = 170 + Math.cos(midAngle) * 123;
                  const gy = 170 + Math.sin(midAngle) * 123;
                  const color = HOUSE_COLORS[i % HOUSE_COLORS.length];
                  return (
                    <g key={i}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F2F6EF" strokeOpacity="0.35" strokeWidth="1.2" />
                      <circle cx={gx} cy={gy} r="13" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="1.4" />
                      <text
                        x={gx}
                        y={gy + 4}
                        textAnchor="middle"
                        fill="#F2F6EF"
                        fontSize="12"
                        fontWeight="700"
                      >
                        {HOUSE_GLYPHS[i]}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Inner Counter-Rotating Lotus Mandala Ring */}
              <g ref={innerWheelRef}>
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const x1 = 170 + Math.cos(angle) * 62;
                  const y1 = 170 + Math.sin(angle) * 62;
                  const x2 = 170 + Math.cos(angle) * 98;
                  const y2 = 170 + Math.sin(angle) * 98;
                  const px = 170 + Math.cos(angle + Math.PI / 8) * 84;
                  const py = 170 + Math.sin(angle + Math.PI / 8) * 84;
                  return (
                    <g key={i}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E4BD70" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="2 3" />
                      <circle cx={px} cy={py} r="4.5" fill={i % 2 === 0 ? "#E4BD70" : "#8BB17E"} />
                    </g>
                  );
                })}
              </g>

              {/* Center Score Hub */}
              <circle cx="170" cy="170" r="64" fill="#0B1510" stroke="#8BB17E" strokeWidth="1.6" />
              <circle
                cx="170"
                cy="170"
                r="56"
                fill="none"
                stroke="#E4BD70"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={HUB_CIRCUMFERENCE}
                strokeDashoffset={progressDashOffset}
                transform="rotate(-90 170 170)"
              />
            </svg>

            <div className="kundli-center-readout">
              {score === 0 && !spinning && !matched ? (
                <span className="kundli-ready">{t(loveSyncDialData.readyLabel)}</span>
              ) : (
                <>
                  <span className="kundli-score tabular-nums">{score}</span>
                  <span className="kundli-suffix">{loveSyncDialData.scoreSuffix}</span>
                </>
              )}
            </div>
          </button>

          {spinning && (
            <p className="kundli-live-drama" aria-live="polite">
              ✨ {t(loveSyncDialData.spinSteps[stepIdx])}
            </p>
          )}

          <button
            type="button"
            className="btn-primary kundli-btn"
            onClick={handleSpin}
            disabled={spinning}
          >
            {matched ? t(loveSyncDialData.respinBtn) : t(loveSyncDialData.spinBtn)}
          </button>

          {matched && (
            <div ref={resultsRef} className="kundli-results" aria-live="polite">
              <p className="kundli-perfect-tag kundli-stagger">{t(loveSyncDialData.perfectTag)}</p>

              <div className="kundli-meter-bars kundli-stagger">
                {loveSyncDialData.breakdown.map((item) => (
                  <div key={item.label.en} className="kundli-bar-item">
                    <div className="kundli-bar-top">
                      <span>{t(item.label)}</span>
                      <strong className="tabular-nums">{item.score}</strong>
                    </div>
                    <div className="kundli-bar-track">
                      <div className="kundli-bar-fill" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="kundli-verdicts">
                {loveSyncDialData.verdicts.map((v) => (
                  <div key={v.label.en} className={`verdict-chip tone-${v.tone} kundli-stagger`}>
                    <span className="verdict-planet">{t(v.label)}</span>
                    <span className="verdict-status">{t(v.status)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
