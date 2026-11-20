import { useTranslation } from "../context/LanguageContext";
import { couple, labels } from "../data/weddingData";
import RoyalJharokhaHeroSvg from "../components/RoyalJharokhaHeroSvg";
import InfinityEmblemSvg from "../components/InfinityEmblemSvg";
import InstagramIcon from "../components/InstagramIcon";

export default function HeroSection({ guestName }) {
  const { t } = useTranslation();

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-layout">
        {guestName && (
          <p className="hero-guest-pill">
            <span>{t({ en: "Cordially Invited", hi: "सस्नेह आमंत्रण" })} ·</span>{" "}
            <strong>{guestName}</strong>
          </p>
        )}

        <p className="hero-blessing">{t(labels.blessingHeading)}</p>

        <RoyalJharokhaHeroSvg />

        <div className="hero-monogram-line">
          <InfinityEmblemSvg size={82} />
          <span className="hero-chapter-badge">
            {t(couple.chapterTitle)} · {couple.monogram} {couple.infinitySymbol}
          </span>
        </div>

        <h1 className="hero-title">{t(labels.invitationHeroTitle)}</h1>

        <p className="hero-bio-quote">
          {t(couple.bioLineOne)} · {t(couple.bioLineTwo)}{" "}
          <strong className="hero-hashtag-inline">{couple.hashtag}</strong>
        </p>

        <div className="hero-ig-row">
          <a
            href={couple.combinedInstagram}
            target="_blank"
            rel="noreferrer"
            className="ig-pill-badge ig-pill-badge--featured"
          >
            <InstagramIcon size={16} />
            <span>{couple.combinedHandle}</span>
          </a>
          <a
            href={couple.bride.instagram}
            target="_blank"
            rel="noreferrer"
            className="ig-pill-badge"
          >
            <InstagramIcon size={15} />
            <span>{couple.bride.handle}</span>
          </a>
          <a
            href={couple.groom.instagram}
            target="_blank"
            rel="noreferrer"
            className="ig-pill-badge"
          >
            <InstagramIcon size={15} />
            <span>{couple.groom.handle}</span>
          </a>
        </div>

        <p className="hero-date-banner">{t(labels.datesLocationLine)}</p>

        <div className="hero-cta-row">
          <a href="#celebrations" className="btn-primary">
            {t(labels.exploreCta)}
          </a>
          <a href="#kundli" className="hero-scroll-cue">
            <span>{t({ en: "Spin 36/36 Destiny Wheel", hi: "36/36 कुंडली चक्र घुमाएँ" })}</span>
            <span className="cue-arrow" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
