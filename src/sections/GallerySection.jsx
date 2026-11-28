import { useTranslation } from "../context/LanguageContext";
import { couple, labels } from "../data/weddingData";
import RevealOnScroll from "../components/RevealOnScroll";
import InstagramIcon from "../components/InstagramIcon";

export default function GallerySection() {
  const { t } = useTranslation();

  return (
    <section id="gallery" className="section section--tinted">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header section-header--center">
            <h2 className="section-title">
              {t({
                en: "Moments from @_theamchapter",
                hi: "@_theamchapter के अनमोल पल",
              })}
            </h2>
          </div>

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
        </RevealOnScroll>
      </div>
    </section>
  );
}
