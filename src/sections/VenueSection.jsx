import { useTranslation } from "../context/LanguageContext";
import { labels, venue } from "../data/weddingData";
import RouteMapSvg from "../components/RouteMapSvg";
import RevealOnScroll from "../components/RevealOnScroll";

export default function VenueSection() {
  const { t } = useTranslation();

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
              <div>
                <a
                  href={venue.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  {t(labels.openMaps)}
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
