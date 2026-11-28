import { useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { couple, labels } from "../data/weddingData";
import { buildPersonalizedUrl, buildPersonalizedWhatsappUrl } from "../lib/guest";
import { copyTextToClipboard } from "../lib/clipboard";
import AmFoilLogo from "../components/AmFoilLogo";
import InstagramIcon from "../components/InstagramIcon";

export default function FooterSection() {
  const { lang, t } = useTranslation();
  const [guestInput, setGuestInput] = useState("");
  const [inviteLang, setInviteLang] = useState(() => lang);
  const [copied, setCopied] = useState(false);

  const personalizedLink = buildPersonalizedUrl(guestInput, inviteLang);
  const whatsappInviteUrl = buildPersonalizedWhatsappUrl({
    guestName: guestInput,
    inviteLang,
    url: personalizedLink,
  });

  const handleCopy = async () => {
    const ok = await copyTextToClipboard(personalizedLink);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${t(couple.chapterTitle)} · Mansi & Aditya`,
          text: `${t(couple.bioLineOne)} ${couple.hashtag}`,
          url: personalizedLink,
        });
        return;
      } catch {
        // User cancelled or share unsupported; fallback to copy
      }
    }
    handleCopy();
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="personalize-box">
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "1.45rem",
              fontWeight: 600,
            }}
          >
            {t(labels.personalizeTitle)}
          </h2>

          <div className="personalize-lang-row">
            <span className="personalize-lang-label">{t(labels.personalizeLangLabel)}</span>
            <div className="personalize-lang-pills" role="group" aria-label={t(labels.personalizeLangLabel)}>
              <button
                type="button"
                className={`personalize-lang-chip ${inviteLang === "en" ? "is-active" : ""}`}
                onClick={() => setInviteLang("en")}
              >
                English
              </button>
              <button
                type="button"
                className={`personalize-lang-chip ${inviteLang === "hi" ? "is-active" : ""}`}
                onClick={() => setInviteLang("hi")}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="personalize-box__row">
            <input
              type="text"
              className="rsvp-input"
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value)}
              placeholder={t(labels.personalizePh)}
              aria-label={t(labels.personalizeTitle)}
            />
            <a
              href={whatsappInviteUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary btn-compact"
            >
              💬 {t(labels.personalizeWhatsappBtn)}
            </a>
            <button type="button" className="btn-secondary btn-compact" onClick={handleCopy}>
              {copied ? t(labels.copiedLinkBtn) : t(labels.copyLinkBtn)}
            </button>
            <button type="button" className="btn-secondary btn-compact" onClick={handleShare}>
              {t(labels.shareInviteBtn)}
            </button>
          </div>
          {(guestInput.trim() || inviteLang === "hi") && (
            <p className="personalize-box__preview">
              <a href={personalizedLink} target="_blank" rel="noreferrer">
                {personalizedLink}
              </a>
            </p>
          )}
        </div>

        <div className="footer-crest-wrap">
          <div className="footer-modern-medallion">
            <AmFoilLogo className="footer-am-foil" label="AM Official Wedding Monogram" />
          </div>
          <p className="footer-host-sig">{t(couple.hostSignature)}</p>
        </div>

        <div className="footer-handles">
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
            <InstagramIcon size={16} />
            <span>{couple.bride.handle}</span>
          </a>
          <a
            href={couple.groom.instagram}
            target="_blank"
            rel="noreferrer"
            className="ig-pill-badge"
          >
            <InstagramIcon size={16} />
            <span>{couple.groom.handle}</span>
          </a>
        </div>

        <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--ink-muted)" }}>
          {t(labels.madeWith)}
        </p>
      </div>
    </footer>
  );
}
