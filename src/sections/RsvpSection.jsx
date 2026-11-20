import { useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { couple, labels } from "../data/weddingData";
import { copyTextToClipboard } from "../lib/clipboard";
import RevealOnScroll from "../components/RevealOnScroll";

export default function RsvpSection({ initialGuest = "" }) {
  const { lang, t } = useTranslation();
  const [name, setName] = useState(() => initialGuest);
  const [guests, setGuests] = useState(2);
  const [dayChoice, setDayChoice] = useState("both");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedDayObj =
    labels.rsvpDayOptions.find((d) => d.id === dayChoice) || labels.rsvpDayOptions[0];

  const buildMessage = () => {
    const cleanName = name.trim() || (lang === "hi" ? "शुभचिंतक परिवार" : "Dear Family");
    const dayText = t(selectedDayObj.label);
    const noteLine = note.trim() ? `\nNote / Song: ${note.trim()}` : "";

    if (lang === "hi") {
      return `नमस्ते! ${cleanName} की ओर से मानसी एवं आदित्य के शुभ विवाह (#iAMinlove · 4 व 5 दिसम्बर 2026, आशीर्वाद गार्डन, पिपरिया) में ${guests} अतिथियों की उपस्थिति पक्की है।\nकार्यक्रम: ${dayText}${noteLine}`;
    }
    return `Warm regards! ${cleanName} (${guests} ${guests === 1 ? "guest" : "guests"}) is delighted to attend Mansi & Aditya's wedding (#iAMinlove · 4 & 5 Dec 2026 at Aashirwad Garden, Pipariya).\nAttending: ${dayText}${noteLine}`;
  };

  const whatsappUrl = `https://wa.me/${couple.whatsappNumber}?text=${encodeURIComponent(
    buildMessage()
  )}`;

  const handleCopy = async () => {
    const ok = await copyTextToClipboard(buildMessage());
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section id="rsvp" className="section">
      <div className="container">
        <RevealOnScroll>
          <div className="rsvp-card">
            <div className="section-header" style={{ marginBottom: "1.75rem" }}>
              <p className="eyebrow-tag">{t(labels.rsvpEyebrow)}</p>
              <h2 className="section-title">{t(labels.rsvpHeading)}</h2>
              <p className="section-lede">{t(labels.rsvpLede)}</p>
            </div>

            <form
              className="rsvp-form"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");
              }}
            >
              <div className="rsvp-field">
                <label htmlFor="rsvp-name">{t(labels.rsvpNameLabel)}</label>
                <input
                  id="rsvp-name"
                  type="text"
                  className="rsvp-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t(labels.rsvpNamePlaceholder)}
                />
              </div>

              <div className="rsvp-field">
                <label>{t(labels.rsvpGuestsLabel)}</label>
                <div className="rsvp-stepper">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    aria-label="Decrease guests"
                  >
                    −
                  </button>
                  <span className="tabular-nums" style={{ minWidth: "2ch", textAlign: "center", fontWeight: 700 }}>
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(12, g + 1))}
                    aria-label="Increase guests"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="rsvp-field">
                <label>{t(labels.rsvpDaysLabel)}</label>
                <div className="rsvp-day-radios" role="radiogroup" aria-label={t(labels.rsvpDaysLabel)}>
                  {labels.rsvpDayOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`rsvp-day-opt ${dayChoice === opt.id ? "is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="rsvp-day"
                        value={opt.id}
                        checked={dayChoice === opt.id}
                        onChange={() => setDayChoice(opt.id)}
                      />
                      <span>{t(opt.label)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rsvp-field">
                <label htmlFor="rsvp-note">{t(labels.rsvpNoteLabel)}</label>
                <textarea
                  id="rsvp-note"
                  rows={3}
                  className="rsvp-textarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t(labels.rsvpNotePlaceholder)}
                />
              </div>

              <div className="rsvp-actions">
                <button type="submit" className="btn-primary">
                  {t(labels.rsvpWhatsappBtn)}
                </button>
                <button type="button" className="btn-secondary" onClick={handleCopy}>
                  {copied ? t(labels.rsvpCopied) : t(labels.rsvpCopyBtn)}
                </button>
              </div>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
