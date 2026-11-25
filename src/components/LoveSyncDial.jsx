import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import confetti from "canvas-confetti";
import { useTranslation } from "../context/LanguageContext";
import { loveSyncDialData } from "../data/weddingData";
import RevealOnScroll from "./RevealOnScroll";

const HOUSE_COLORS = [
  "#E6B45A",
  "#DF6C98",
  "#9DB76B",
  "#F7EBDC",
  "#B87924",
  "#E6B45A",
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
        const palette = ["#E6B45A", "#DF6C98", "#9DB76B", "#6E1A24", "#FDF6EC"];
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
        <RevealOnScroll>
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
              <circle cx="170" cy="170" r="158" fill="none" stroke="#DF6C98" strokeWidth="1.6" strokeDasharray="3 7" />

              {/* Top Fixed Golden Pointer */}
              <polygon points="170,22 162,4 178,4" fill="#E6B45A" stroke="#2A1217" strokeWidth="1.5" />

              {/* Outer Spinning 12-House AM Ring */}
              <g ref={outerWheelRef}>
                <circle cx="170" cy="170" r="144" fill="#2A1217" stroke="#E6B45A" strokeWidth="2.4" />
                <circle cx="170" cy="170" r="102" fill="#3D1A21" stroke="#DF6C98" strokeWidth="1.5" />
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
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FDF6EC" strokeOpacity="0.35" strokeWidth="1.2" />
                      <circle cx={gx} cy={gy} r="13" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="1.4" />
                      <text
                        x={gx}
                        y={gy + 4}
                        textAnchor="middle"
                        fill="#FDF6EC"
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
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E6B45A" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="2 3" />
                      <circle cx={px} cy={py} r="4.5" fill={i % 2 === 0 ? "#E6B45A" : "#9DB76B"} />
                    </g>
                  );
                })}
              </g>

              {/* Center Score Hub */}
              <circle cx="170" cy="170" r="64" fill="#1A0B0E" stroke="#DF6C98" strokeWidth="1.6" />
              <circle
                cx="170"
                cy="170"
                r="56"
                fill="none"
                stroke="#E6B45A"
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
        </RevealOnScroll>
      </div>
    </section>
  );
}
