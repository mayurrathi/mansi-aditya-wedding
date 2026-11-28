import { useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { couple, curatedGallery, labels } from "../data/weddingData";
import RevealOnScroll from "../components/RevealOnScroll";
import InstagramIcon from "../components/InstagramIcon";

export default function GallerySection({ onOpenGalleryLightbox }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("highlights");

  return (
    <section id="gallery" className="section section--tinted">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header section-header--center">
            <p className="eyebrow-tag">{t(labels.galleryEyebrow)}</p>
            <h2 className="section-title">{t(labels.galleryHeading)}</h2>
            <p className="section-lede">{t(labels.galleryLede)}</p>
          </div>

          <div className="gallery-tab-row">
            <div className="day-filter" role="tablist" aria-label={t(labels.galleryHeading)}>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "highlights"}
                className={`day-filter__btn ${activeTab === "highlights" ? "is-active" : ""}`}
                onClick={() => setActiveTab("highlights")}
              >
                {t(labels.galleryTabHighlights)}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "instagram"}
                className={`day-filter__btn ${activeTab === "instagram" ? "is-active" : ""}`}
                onClick={() => setActiveTab("instagram")}
              >
                {t(labels.galleryTabInstagram)}
              </button>
            </div>
          </div>

          {activeTab === "highlights" ? (
            <div className="curated-gallery-shell">
              <div className="branch-head">
                <h3>{t({ en: "Curated Couple Portraits", hi: "अनमोल पलों का एल्बम" })}</h3>
                <span>{t(labels.galleryHighlightsSub)}</span>
              </div>

              <div className="polaroid-rail polaroid-rail--curated">
                {curatedGallery.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    className="polaroid-card"
                    style={{ "--tilt": item.tilt }}
                    onClick={() => onOpenGalleryLightbox?.(idx)}
                  >
                    <span className="polaroid-pin" aria-hidden="true" />
                    <span className="polaroid-slot-tag">{t(item.badge)}</span>
                    <span className="polaroid-img-wrap">
                      <img
                        src={item.src}
                        alt={t(item.caption)}
                        style={
                          item.focalPos
                            ? { objectPosition: item.focalPos }
                            : undefined
                        }
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="polaroid-caption">{t(item.caption)}</span>
                  </button>
                ))}
              </div>

              <div className="combined-ig-banner" style={{ marginTop: "2rem" }}>
                <a
                  href={couple.combinedInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="ig-pill-badge ig-pill-badge--featured"
                >
                  <InstagramIcon size={16} />
                  <span>{t({ en: "Follow @_theamchapter ↗", hi: "@_theamchapter फ़ॉलो करें ↗" })}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="ig-live-card">
              <div className="ig-live-card__head">
                <div className="ig-live-card__title-wrap">
                  <span className="ig-live-badge">
                    <InstagramIcon size={16} />
                    <span>{t({ en: "Live Instagram Feed", hi: "लाइव इंस्टाग्राम फ़ीड" })}</span>
                  </span>
                  <h3>{couple.combinedHandle}</h3>
                  <p>
                    {t({
                      en: "Auto-updated posts, Reels & countdown stories directly from Mansi & Aditya.",
                      hi: "मानसी और आदित्य के नवीनतम पोस्ट, रील्स और यादें सीधे इंस्टाग्राम से।",
                    })}
                  </p>
                </div>
                <a
                  href={couple.combinedInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="ig-pill-badge ig-pill-badge--featured"
                >
                  <InstagramIcon size={16} />
                  <span>{t({ en: "Follow @_theamchapter ↗", hi: "@_theamchapter फ़ॉलो करें ↗" })}</span>
                </a>
              </div>

              <div className="ig-embed-shell">
                <iframe
                  title={`${couple.combinedHandle} Instagram Live Feed`}
                  src="https://www.instagram.com/_theamchapter/embed"
                  className="ig-embed-frame"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="ig-embed-fallback-note">{t(labels.galleryInstagramHint)}</p>
            </div>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
