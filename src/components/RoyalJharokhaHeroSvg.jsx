import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { photos } from "../data/weddingData";

export default function RoyalJharokhaHeroSvg() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const paths = svg.querySelectorAll(".jharokha-draw-path");
    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength?.() || 280;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 1.65,
          ease: "power2.out",
          delay: 0.15,
        });
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="jharokha-hero-stage">
      <div className="amber-cones" aria-hidden="true" />

      <svg
        ref={svgRef}
        className="jharokha-svg-frame"
        viewBox="0 0 600 420"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="pistachioHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E6B45A" stopOpacity="0.28" />
            <stop offset="65%" stopColor="#DF6C98" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#3B1914" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="300" cy="210" r="185" fill="url(#pistachioHalo)" />

        {/* Clean outer halo ring framing the circular medallion without intersecting it */}
        <circle
          cx="300"
          cy="210"
          r="166"
          fill="none"
          stroke="#B87924"
          strokeOpacity="0.58"
          strokeWidth="1.4"
          strokeDasharray="4 8"
        />

        {/* Outer Royal Jharokha Archway cleanly framing around the medallion */}
        <path
          className="jharokha-draw-path"
          d="M84 378 L84 185 Q84 115 156 92 Q220 48 300 20 Q380 48 444 92 Q516 115 516 185 L516 378"
          fill="none"
          stroke="#B87924"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Hanging Brass Lanterns on Left & Right Columns (well outside the medallion) */}
        <g className="lantern-sway-left">
          <line x1="126" y1="112" x2="126" y2="174" stroke="#B87924" strokeWidth="1.5" />
          <polygon points="116,174 136,174 141,192 126,208 111,192" fill="#E6B45A" fillOpacity="0.88" stroke="#B87924" strokeWidth="1.3" />
          <circle cx="126" cy="188" r="4.5" fill="#FFF6D6" />
        </g>
        <g className="lantern-sway-right">
          <line x1="474" y1="112" x2="474" y2="174" stroke="#B87924" strokeWidth="1.5" />
          <polygon points="464,174 484,174 489,192 474,208 459,192" fill="#E6B45A" fillOpacity="0.88" stroke="#B87924" strokeWidth="1.3" />
          <circle cx="474" cy="188" r="4.5" fill="#FFF6D6" />
        </g>
      </svg>

      {/* Couple Portrait Medallion */}
      <div className="hero-couple-medallion">
        <img
          src={photos.gatefoldCouple}
          alt="Mansi & Aditya Portrait"
          className="medallion-art"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </div>
  );
}
