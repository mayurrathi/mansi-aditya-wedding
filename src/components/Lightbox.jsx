import { useEffect, useRef } from "react";
import { useTranslation } from "../context/LanguageContext";
import { labels } from "../data/weddingData";

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  const { t } = useTranslation();
  const touchStartX = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusRef = useRef(null);
  const isOpen = Boolean(item);

  useEffect(() => {
    if (!isOpen) return undefined;
    lastFocusRef.current = document.activeElement;
    document.body.classList.add("lb-open");
    closeBtnRef.current?.focus();

    return () => {
      document.body.classList.remove("lb-open");
      if (lastFocusRef.current instanceof HTMLElement && lastFocusRef.current.isConnected) {
        lastFocusRef.current.focus();
      }
      lastFocusRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    [item?.prevSrc, item?.nextSrc].filter(Boolean).forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, item?.prevSrc, item?.nextSrc, onClose, onPrev, onNext]);

  if (!item) return null;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 42) return;
    if (dx > 0) onPrev?.();
    else onNext?.();
  };

  return (
    <div
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || "Photo preview"}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        ref={closeBtnRef}
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label={t(labels.lightboxClose)}
      >
        ✕
      </button>

      {onPrev && (
        <button
          type="button"
          className="lightbox-nav prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label={t(labels.lightboxPrev)}
        >
          ‹
        </button>
      )}

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img
          key={item.src}
          src={item.src}
          alt={item.caption || "Mansi & Aditya"}
          className="lightbox-img"
        />
        {(item.caption || typeof item.total === "number") && (
          <figcaption>
            {typeof item.index === "number" && typeof item.total === "number" && (
              <span className="lightbox-counter">
                {item.index + 1} / {item.total}
              </span>
            )}
            {item.caption && <span>{item.caption}</span>}
          </figcaption>
        )}
      </figure>

      {onNext && (
        <button
          type="button"
          className="lightbox-nav next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label={t(labels.lightboxNext)}
        >
          ›
        </button>
      )}
    </div>
  );
}
