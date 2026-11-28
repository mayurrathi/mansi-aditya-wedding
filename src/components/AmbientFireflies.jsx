import { useEffect, useRef, useState } from "react";

const COLORS = ["#E6B45A", "#DF6C98", "#9DB76B", "#6E1A24", "#FDF6EC"];
const PETAL_PALETTE = [
  { fill: "#DF6C98" }, // Pink Stargazer Lily
  { fill: "#E6B45A" }, // Burnished Honey Gold
  { fill: "#9DB76B" }, // Olive Sage Leaf
  { fill: "#FBEBD8" }, // Peach Ivory Silk
];

const FLOATING_3D_LANTERNS = [
  { id: 0, left: "2.2%", top: "18%", dur: "16s", delay: "0s", scale: 1 },
  { id: 1, left: "93.5%", top: "16%", dur: "18s", delay: "2.2s", scale: 0.92 },
  { id: 2, left: "2.6%", top: "70%", dur: "19s", delay: "4.1s", scale: 0.88 },
  { id: 3, left: "93%", top: "66%", dur: "15s", delay: "1.4s", scale: 0.96 },
];

function BrassLantern3DSvg() {
  return (
    <svg width="34" height="48" viewBox="0 0 34 48" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="lanternGlow3d" cx="50%" cy="52%" r="50%">
          <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#E4BD70" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#B68B3C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="17" cy="25" r="16" fill="url(#lanternGlow3d)" />
      <line x1="17" y1="0" x2="17" y2="9" stroke="#E4BD70" strokeWidth="1.6" />
      <path d="M11 9H23L26 14H8L11 9Z" fill="#B68B3C" stroke="#FFF6D6" strokeWidth="0.9" />
      <path d="M8 14H26L23 34H11L8 14Z" fill="#E4BD70" fillOpacity="0.88" stroke="#B68B3C" strokeWidth="1.2" />
      <line x1="14" y1="14" x2="14" y2="34" stroke="#B68B3C" strokeWidth="0.9" strokeOpacity="0.7" />
      <line x1="20" y1="14" x2="20" y2="34" stroke="#B68B3C" strokeWidth="0.9" strokeOpacity="0.7" />
      <circle cx="17" cy="24" r="4.2" fill="#FFFDF5" />
      <path d="M11 34H23L19 39H15L11 34Z" fill="#B68B3C" />
      <circle cx="17" cy="42" r="1.8" fill="#E4BD70" />
    </svg>
  );
}

export default function AmbientFireflies({ active = true }) {
  const canvasRef = useRef(null);
  const [bursts, setBursts] = useState([]);

  /* Throttled ~30fps Tumbling Petals + Golden Fireflies Canvas */
  useEffect(() => {
    if (!active) return undefined;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let rafId = 0;
    let lastFrame = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const pointer = { x: width * 0.5, y: height * 0.35, active: false };
    const isMobile = width < 640;
    const seedCount = isMobile ? 8 : 14;
    const petalCount = isMobile ? 5 : 9;

    const seeds = Array.from({ length: seedCount }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: 0.5 + Math.random() * 1.0,
      vx: (Math.random() - 0.5) * 0.48,
      vy: (Math.random() - 0.5) * 0.38 - 0.12,
      r: 1.6 + Math.random() * 2.2,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[i % COLORS.length],
    }));

    const petals = Array.from({ length: petalCount }).map((_, i) => {
      const shade = PETAL_PALETTE[i % PETAL_PALETTE.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.6 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 0.55,
        vy: 0.45 + Math.random() * 0.6,
        size: 7 + Math.random() * 5,
        pitch: Math.random() * Math.PI * 2,
        roll: Math.random() * Math.PI * 2,
        yaw: Math.random() * Math.PI * 2,
        vPitch: 0.02 + Math.random() * 0.024,
        vRoll: 0.018 + Math.random() * 0.02,
        vYaw: (Math.random() - 0.5) * 0.02,
        fill: shade.fill,
      };
    });

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const tick = (now) => {
      if (document.hidden) {
        rafId = 0;
        return;
      }

      if (now - lastFrame < 32) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing golden fireflies
      for (let i = 0; i < seeds.length; i += 1) {
        const s = seeds[i];
        if (pointer.active) {
          const dx = pointer.x - s.x;
          const dy = pointer.y - s.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 18 && dist < 220) {
            s.vx += (dx / dist) * 0.01 * s.z;
            s.vy += (dy / dist) * 0.01 * s.z;
          }
        }
        s.vx *= 0.99;
        s.vy *= 0.99;
        s.x += s.vx * s.z;
        s.y += s.vy * s.z;

        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        if (s.y > height + 10) s.y = -10;

        const alpha =
          (0.24 + 0.46 * (0.5 + 0.5 * Math.sin(now * 0.002 + s.phase))) * Math.min(1, s.z);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // 2. Draw soft silk & marigold petals (fill-only for crisp fast rendering)
      for (let i = 0; i < petals.length; i += 1) {
        const p = petals[i];
        p.pitch += p.vPitch;
        p.roll += p.vRoll;
        p.yaw += p.vYaw;

        p.x += (p.vx + Math.sin(now * 0.001 + i) * 0.32) * p.z;
        p.y += p.vy * p.z;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const scaleX = Math.max(0.24, Math.abs(Math.cos(p.pitch))) * p.z;
        const scaleY = Math.max(0.3, Math.abs(Math.sin(p.roll))) * p.z;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.yaw);
        ctx.scale(scaleX, scaleY);
        ctx.globalAlpha = 0.5;

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.5, p.size * 0.75, p.size * 0.7, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.7, -p.size * 0.85, -p.size * 0.5, 0, -p.size);
        ctx.fillStyle = p.fill;
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      rafId = window.requestAnimationFrame(tick);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else if (!rafId) {
        lastFrame = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (!document.hidden) {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [active]);

  const handlePopLantern = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const id = Date.now() + Math.random();
    const particles = Array.from({ length: 12 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 12;
      const dist = 36 + (i % 3) * 16;
      return {
        dx: Math.cos(a) * dist,
        dy: Math.sin(a) * dist,
        c: COLORS[i % COLORS.length],
      };
    });
    setBursts((prev) => [...prev, { id, x, y, particles }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((item) => item.id !== id));
    }, 900);
  };

  if (!active) return null;

  return (
    <>
      {/* Static Lightweight Architectural & Mandala Background Stage */}
      <div className="bg-3d-stage" aria-hidden="true">
        <div className="bg-3d-mandala bg-3d-mandala--top-left" />
        <div className="bg-3d-mandala bg-3d-mandala--mid-right" />
        <div className="bg-3d-mandala bg-3d-mandala--bottom-left" />
        <div className="bg-3d-arch-halo bg-3d-arch-halo--left" />
        <div className="bg-3d-arch-halo bg-3d-arch-halo--right" />
      </div>

      {/* ~30fps Tumbling Petals & Fireflies Canvas */}
      <canvas ref={canvasRef} className="seed-fireflies" aria-hidden="true" />

      {/* Floating Brass Kandil Lanterns */}
      <div className="floating-lanterns-layer" aria-hidden="true">
        {FLOATING_3D_LANTERNS.map((item) => (
          <button
            key={item.id}
            type="button"
            tabIndex={-1}
            className="floating-lantern-btn"
            style={{
              left: item.left,
              top: item.top,
              "--dur": item.dur,
              "--delay": item.delay,
              "--scale": item.scale,
            }}
            onClick={handlePopLantern}
            title="Tap lantern for #iAMinLove sparkle"
          >
            <BrassLantern3DSvg />
          </button>
        ))}
      </div>

      {bursts.map((f) => (
        <div key={f.id} className="lantern-firework" style={{ left: f.x, top: f.y }}>
          <span className="lantern-firework__tag">♾️ #iAMinLove</span>
          {f.particles.map((p, i) => (
            <span
              key={i}
              className="fw-particle"
              style={{
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                backgroundColor: p.c,
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}
