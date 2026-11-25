import { useEffect, useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { labels, weddingStartDate } from "../data/weddingData";
import { downloadFullWeddingIcs, fullWeddingCalendarUrl } from "../lib/calendar";
import RevealOnScroll from "../components/RevealOnScroll";

function computeTimeState(nowMs) {
  const diff = weddingStartDate.getTime() - nowMs;
  if (diff > 0) {
    const totalSec = Math.floor(diff / 1000);
    return {
      mode: "counting",
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      mins: Math.floor((totalSec % 3600) / 60),
      secs: totalSec % 60,
    };
  }

  const day1Phulwari = new Date("2026-12-04T13:30:00+05:30").getTime();
  const day1Sangeet = new Date("2026-12-04T19:00:00+05:30").getTime();
  const day2Start = new Date("2026-12-05T08:00:00+05:30").getTime();
  const weddingEnd = new Date("2026-12-05T23:00:00+05:30").getTime();

  if (nowMs < day1Phulwari) return { mode: "live", messageKey: "liveDay1Morning" };
  if (nowMs < day1Sangeet) return { mode: "live", messageKey: "livePhulwari" };
  if (nowMs < day2Start) return { mode: "live", messageKey: "liveSangeet" };
  if (nowMs < weddingEnd) return { mode: "live", messageKey: "liveWeddingDay" };
  return { mode: "live", messageKey: "liveDone" };
}

export default function CountdownSection() {
  const { lang, t } = useTranslation();
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const state = computeTimeState(nowMs);
  const unitNames = labels.units[lang] || labels.units.en;
  const maxCaps = [30, 24, 60, 60];
  const r = 46;
  const circ = 2 * Math.PI * r;

  return (
    <section id="countdown" className="section">
      <div className="container">
        <RevealOnScroll>
          <div className="countdown-box" aria-live="polite">
            <p className="eyebrow-tag" style={{ color: "#e4bd70" }}>
              {t(labels.countdownEyebrow)}
            </p>
            <h2 className="section-title">{t(labels.countdownHeading)}</h2>
            <p className="section-lede" style={{ marginInline: "auto" }}>
              {t(labels.datesLocationLine)}
            </p>

            {state.mode === "counting" ? (
              <div className="dot-ring-countdown">
                {[state.days, state.hours, state.mins, state.secs].map((val, idx) => {
                  const ratio = Math.min(1, Math.max(0.05, val / maxCaps[idx]));
                  const dashOffset = circ * (1 - ratio);
                  return (
                    <div key={unitNames[idx]} className="dot-ring-unit">
                      <div className="dot-ring-svg-wrap">
                        <svg viewBox="0 0 112 112" className="dot-ring-svg" aria-hidden="true">
                          <circle
                            cx="56"
                            cy="56"
                            r="52"
                            fill="none"
                            stroke="rgba(240, 178, 198, 0.28)"
                            strokeWidth="1.4"
                            strokeDasharray="2 6"
                          />
                          <circle
                            cx="56"
                            cy="56"
                            r={r}
                            fill="rgba(24, 11, 14, 0.55)"
                            stroke="rgba(230, 180, 90, 0.22)"
                            strokeWidth="4"
                          />
                          <circle
                            cx="56"
                            cy="56"
                            r={r}
                            fill="none"
                            stroke="#E6B45A"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={circ}
                            strokeDashoffset={dashOffset}
                            transform="rotate(-90 56 56)"
                          />
                        </svg>
                        <div className="dot-ring-readout">
                          <span className="countdown-unit__val">
                            {String(val).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                      <span className="countdown-unit__label">{unitNames[idx]}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p
                style={{
                  margin: "2rem auto",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  color: "#e4bd70",
                }}
              >
                {t(labels[state.messageKey])}
              </p>
            )}

            <div className="countdown-actions">
              <a
                href={fullWeddingCalendarUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                📅 {t(labels.saveFullGoogle)}
              </a>
              <button
                type="button"
                className="btn-secondary"
                onClick={downloadFullWeddingIcs}
              >
                ⬇ {t(labels.saveFullIcs)}
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
