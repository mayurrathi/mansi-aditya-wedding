import { useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { couple, labels, venue } from "../data/weddingData";
import { copyTextToClipboard } from "../lib/clipboard";
import RouteMapSvg from "../components/RouteMapSvg";
import RevealOnScroll from "../components/RevealOnScroll";

export default function VenueSection() {
  const { lang, t } = useTranslation();
  const [addressCopied, setAddressCopied] = useState(false);

  const handleCopyAddress = async () => {
    const text = `${t(venue.name)}, ${t(venue.address)}`;
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setAddressCopied(true);
      window.setTimeout(() => setAddressCopied(false), 2400);
    }
  };

  const hostWhatsappUrl = `https://wa.me/${couple.whatsappNumber}?text=${encodeURIComponent(
    lang === "hi"
      ? "नमस्ते! मानसी एवं आदित्य के विवाह (आशीर्वाद गार्डन, पिपरिया) में पहुँचने व ठहरने से संबंधित जानकारी के लिए संपर्क कर रहे हैं।"
      : "Warm regards! Reaching out regarding arrival & directions for Mansi & Aditya's wedding at Aashirwad Garden, Pipariya."
  )}`;

  return (
    <section id="venue" className="section">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header">
            <p className="eyebrow-tag">{t(labels.venueEyebrow)}</p>
            <h2 className="section-title">{t(labels.venueHeading)}</h2>
            <p className="section-lede">{t(venue.address)}</p>
          </div>
        </RevealOnScroll>

        <div className="venue-grid">
          <RevealOnScroll>
            <div className="venue-details">
              <RouteMapSvg />
              <div className="venue-action-row">
                <a
                  href={venue.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  {t(labels.openMaps)}
                </a>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCopyAddress}
                >
                  {addressCopied ? t(labels.addressCopiedBtn) : `📋 ${t(labels.copyAddressBtn)}`}
                </button>
              </div>
              <div className="venue-host-row">
                <a
                  href={`tel:+${couple.whatsappNumber}`}
                  className="chip-action"
                >
                  📞 {t(labels.callHostBtn)} ({couple.whatsappDisplay})
                </a>
                <a
                  href={hostWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="chip-action chip-accent"
                >
                  💬 {t(labels.whatsappHostBtn)}
                </a>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <iframe
              title={t(venue.name)}
              src={venue.mapEmbed}
              className="venue-map-frame"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </RevealOnScroll>
        </div>

        <div className="travel-grid">
          {venue.travel.map((item) => (
            <RevealOnScroll key={item.id}>
              <article className="travel-card">
                <h3>
                  <span aria-hidden="true">{item.icon}</span> {t(item.title)}
                </h3>
                <p>{t(item.text)}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
