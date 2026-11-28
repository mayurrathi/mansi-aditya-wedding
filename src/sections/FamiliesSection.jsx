import { useTranslation } from "../context/LanguageContext";
import { couple, labels } from "../data/weddingData";
import RevealOnScroll from "../components/RevealOnScroll";
import InstagramIcon from "../components/InstagramIcon";

export default function FamiliesSection() {
  const { t } = useTranslation();

  return (
    <section id="families" className="section section--tinted">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header section-header--center">
            <p className="eyebrow-tag">{t(labels.familiesEyebrow)}</p>
            <h2 className="section-title">{t(labels.familiesHeading)}</h2>
            <p className="section-lede">{t(labels.familiesLede)}</p>
          </div>

          {/* Bride & Groom Interactive Profile Nest Cards */}
          <div className="families-nests">
            {[couple.bride, couple.groom].map((side) => (
              <article key={side.handle} className="family-nest-card">
                <a
                  href={side.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="nest-avatar-link"
                  aria-label={`${t(side.full)} Instagram`}
                >
                  <img
                    src={side.avatar}
                    alt={t(side.full)}
                    className="nest-avatar"
                    loading="eager"
                    decoding="async"
                  />
                </a>
                <span className="nest-role">{t(side.role)}</span>
                <h3 className="nest-person">{t(side.full)}</h3>
                <p className="nest-parents">{t(side.parentLine)}</p>
                <p className="nest-family-tag">{t(side.familyTitle)}</p>
                <a
                  href={side.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="nest-insta-chip"
                >
                  <InstagramIcon size={16} />
                  <span>{side.handle}</span>
                </a>
              </article>
            ))}
          </div>

          {/* Combined Couple Instagram Highlight Banner */}
          <div className="combined-ig-banner">
            <a
              href={couple.combinedInstagram}
              target="_blank"
              rel="noreferrer"
              className="ig-pill-badge ig-pill-badge--featured"
            >
              <InstagramIcon size={17} />
              <span>
                {t(couple.chapterTitle)} · <strong>{couple.combinedHandle}</strong> · {couple.hashtag}
              </span>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
