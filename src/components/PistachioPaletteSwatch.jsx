import { useState } from "react";
import { useTranslation } from "../context/LanguageContext";
import { labels, pistachioSwatches } from "../data/weddingData";

export default function PistachioPaletteSwatch() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(pistachioSwatches[1].id);
  const current =
    pistachioSwatches.find((s) => s.id === selectedId) || pistachioSwatches[1];

  return (
    <div className="pistachio-guide">
      <p className="pistachio-guide__heading">{t(labels.pistachioHeading)}</p>
      <div className="pistachio-guide__swatches" role="radiogroup" aria-label={t(labels.pistachioHeading)}>
        {pistachioSwatches.map((swatch) => {
          const selected = swatch.id === current.id;
          return (
            <button
              key={swatch.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={t(swatch.name)}
              title={t(swatch.name)}
              className={`swatch-btn ${selected ? "is-selected" : ""}`}
              style={{ backgroundColor: swatch.hex }}
              onClick={() => setSelectedId(swatch.id)}
            />
          );
        })}
      </div>
      <div className="pistachio-guide__detail">
        <span
          className="pistachio-guide__dot"
          style={{ backgroundColor: current.hex }}
          aria-hidden="true"
        />
        <span>
          <strong>{t(current.name)}</strong> · {t(current.tip)}
        </span>
      </div>
    </div>
  );
}
