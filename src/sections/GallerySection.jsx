import { useTranslation } from "../context/LanguageContext";
import { couple, labels, polaroidBranches } from "../data/weddingData";
import RevealOnScroll from "../components/RevealOnScroll";
import InstagramIcon from "../components/InstagramIcon";

export default function GallerySection({ onOpenLightbox }) {
  const { t } = useTranslation();

  const branchesWithOffsets = polaroidBranches.reduce((acc, branch) => {
    const prev = acc[acc.length - 1];
    const startIdx = prev ? prev.startIdx + prev.items.length : 0;
    acc.push({ ...branch, startIdx });
    return acc;
  }, []);

  return (
    <section id="gallery" className="section section--tinted">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header section-header--center">
            <p className="eyebrow-tag">{t(labels.galleryEyebrow)}</p>
            <h2 className="section-title">{t(labels.galleryHeading)}</h2>
            <p className="section-lede">{t(labels.galleryLede)}</p>
          </div>
        </RevealOnScroll>

        <div className="polaroid-branches">
          {branchesWithOffsets.map((branch) => {
            const { startIdx } = branch;

            return (
              <div key={branch.id} className="branch-group">
                <div className="branch-head">
                  <h3>{t(branch.title)}</h3>
                  <span>{t(branch.subtitle)}</span>
                </div>

                <div className="polaroid-rail">
                  {branch.items.map((item, idx) => {
                    const albumIdx = startIdx + idx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className="polaroid-card"
                        style={{ "--tilt": item.tilt }}
                        onClick={() => onOpenLightbox?.(albumIdx)}
                        aria-label={t(item.caption)}
                      >
                        <span className="polaroid-pin" aria-hidden="true" />
                        {item.badge && (
                          <span className="polaroid-slot-tag">{t(item.badge)}</span>
                        )}
                        <div
                          className={`polaroid-img-wrap ${
                            item.isCircular ? "polaroid-img-wrap--circle" : ""
                          }`}
                        >
                          <img src={item.src} alt={t(item.caption)} loading="lazy" />
                        </div>
                        <span className="polaroid-caption">{t(item.caption)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Live Instagram Profile Embed for @_theamchapter */}
          <RevealOnScroll>
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
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
