import { useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { labels, saptapadiVows, scheduleDays, venue } from "../data/weddingData";
import { buildEventCalendarUrl, downloadEventIcs } from "../lib/calendar";
import PistachioPaletteSwatch from "../components/PistachioPaletteSwatch";
import RevealOnScroll from "../components/RevealOnScroll";

export default function CelebrationsSection({ onOpenEventLightbox }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [activeVow, setActiveVow] = useState(0);

  const allEvents = scheduleDays.flatMap((d) => d.events);

  const visibleDays =
    filter === "all"
      ? scheduleDays
      : scheduleDays.filter((day) => day.dayId === filter);

  const handleDownloadIcs = (ev) => {
    downloadEventIcs({
      uid: `am-chapter-${ev.id}-2026@invite`,
      title: `${ev.title.en} · Mansi & Aditya Wedding`,
      startUtc: ev.calStart,
      endUtc: ev.calEnd,
      description: `${ev.note.en} #iAMinlove`,
      filename: `Mansi-Aditya-${ev.id}.ics`,
    });
  };

  return (
    <section id="celebrations" className="section section--tinted">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header section-header--center">
            <p className="eyebrow-tag">{t(labels.eventsEyebrow)}</p>
            <h2 className="section-title">{t(labels.eventsHeading)}</h2>
            <p className="section-lede">{t(labels.eventsLede)}</p>
          </div>
        </RevealOnScroll>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="day-filter" role="tablist" aria-label="Filter ceremonies by day">
            <button
              type="button"
              role="tab"
              aria-selected={filter === "all"}
              className={`day-filter__btn ${filter === "all" ? "is-active" : ""}`}
              onClick={() => setFilter("all")}
            >
              {t(labels.filterAll)}
            </button>
            {scheduleDays.map((day) => (
              <button
                key={day.dayId}
                type="button"
                role="tab"
                aria-selected={filter === day.dayId}
                className={`day-filter__btn ${filter === day.dayId ? "is-active" : ""}`}
                onClick={() => setFilter(day.dayId)}
              >
                {t(day.shortLabel)}
              </button>
            ))}
          </div>
        </div>

        {visibleDays.map((day) => (
          <div key={day.dayId} className="day-group">
            <div className="day-ribbon">
              <span>✦ {t(day.dayLabel)} ✦</span>
            </div>

            <div className="events-grid">
              {day.events.map((ev) => {
                const eventIdx = allEvents.findIndex((item) => item.id === ev.id);

                return (
                  <article
                    key={ev.id}
                    className={`event-card accent-${ev.accent || "gold"}`}
                  >
                    <button
                      type="button"
                      className="event-card__media event-card__media-btn"
                      onClick={() => onOpenEventLightbox?.(eventIdx)}
                      aria-label={`${t(ev.title)} Ghibli illustration preview`}
                    >
                      <img src={ev.image} alt={t(ev.title)} loading="lazy" />
                      <span className="event-day-badge">
                        {ev.emoji} {t(ev.dateShort)}
                      </span>
                      <span className="event-zoom-hint">🔍</span>
                    </button>

                    <div className="event-card__body">
                      <h3 className="event-card__title">
                        {ev.poeticSub ? t(ev.poeticSub) : t(ev.title)}
                      </h3>
                      {ev.poeticSub && (
                        <p className="event-card__poetic">{t(ev.title)}</p>
                      )}
                      <p className="event-card__time">🕒 {t(ev.time)}</p>
                      <p className="event-card__venue">📍 {t(venue.name)}, Pipariya</p>
                      <p className="event-card__note">{t(ev.note)}</p>

                      {ev.dressCode && (
                        <p className="event-card__dress">🌿 {t(ev.dressCode)}</p>
                      )}

                      {ev.hasPistachioSwatch && <PistachioPaletteSwatch />}

                      {ev.hasSaptapadi && (
                        <div className="saptapadi-box">
                          <p className="saptapadi-box__heading">
                            {t(labels.saptapadiHeading)}
                          </p>
                          <div className="saptapadi-box__pills" role="tablist" aria-label={t(labels.saptapadiHeading)}>
                            {saptapadiVows.map((vow, idx) => (
                              <button
                                key={vow.no}
                                type="button"
                                role="tab"
                                aria-selected={activeVow === idx}
                                className={`vow-btn ${activeVow === idx ? "is-active" : ""}`}
                                onClick={() => setActiveVow(idx)}
                              >
                                <span aria-hidden="true">{vow.icon}</span>{" "}
                                <span>{t(vow.title)}</span>
                              </button>
                            ))}
                          </div>
                          <p className="saptapadi-box__text">
                            <strong>{saptapadiVows[activeVow].icon} {t(saptapadiVows[activeVow].title)}:</strong>{" "}
                            {t(saptapadiVows[activeVow].text)}
                          </p>
                        </div>
                      )}

                      <div className="event-card__actions">
                        <a
                          href={buildEventCalendarUrl(ev)}
                          target="_blank"
                          rel="noreferrer"
                          className="chip-action"
                        >
                          📅 {t(labels.googleCal)}
                        </a>
                        <button
                          type="button"
                          className="chip-action"
                          onClick={() => handleDownloadIcs(ev)}
                        >
                          ⬇ {t(labels.appleIcs)}
                        </button>
                        <a
                          href={venue.mapLink}
                          target="_blank"
                          rel="noreferrer"
                          className="chip-action chip-accent"
                        >
                          📍 {t(labels.directions)}
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
