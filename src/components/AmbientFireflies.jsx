import { useEffect, useRef, useState } from "react";

const COLORS = ["#E4BD70", "#C8DEC2", "#8BB17E", "#A63A2E", "#FFF6D6"];
const PETAL_PALETTE = [
  { fill: "#E4BD70", stroke: "#B68B3C" }, // Marigold Gold
  { fill: "#C8DEC2", stroke: "#8BB17E" }, // Pistachio Silk
  { fill: "#D96B52", stroke: "#A63A2E" }, // Sindoor Rose
  { fill: "#F3D99B", stroke: "#C99E48" }, // Kundan Cream
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
  const bgRef = useRef(null);
  const [bursts, setBursts] = useState([]);

  /* Parallax 3D depth response on window scroll */
  useEffect(() => {
    if (!active) return undefined;
    const onScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  /* 3D Tumbling Petals + Depth-Sorted Golden Fireflies Canvas */
  useEffect(() => {
    if (!active) return undefined;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let rafId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const pointer = { x: width * 0.5, y: height * 0.35, active: false };
    const seedCount = width < 640 ? 18 : 30;
    const petalCount = width < 640 ? 10 : 18;

    const seeds = Array.from({ length: seedCount }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: 0.4 + Math.random() * 1.2, // 3D depth plane
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.28 - 0.08,
      r: 1.5 + Math.random() * 2.4,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[i % COLORS.length],
    }));

    const petals = Array.from({ length: petalCount }).map((_, i) => {
      const shade = PETAL_PALETTE[i % PETAL_PALETTE.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.55 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0.32 + Math.random() * 0.45,
        size: 7 + Math.random() * 6,
        pitch: Math.random() * Math.PI * 2,
        roll: Math.random() * Math.PI * 2,
        yaw: Math.random() * Math.PI * 2,
        vPitch: 0.012 + Math.random() * 0.018,
        vRoll: 0.01 + Math.random() * 0.015,
        vYaw: (Math.random() - 0.5) * 0.014,
        fill: shade.fill,
        stroke: shade.stroke,
      };
    });

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onMove = (e) => {
      const pt = e.touches?.[0] || e;
      if (!pt) return;
      pointer.x = pt.clientX;
      pointer.y = pt.clientY;
      pointer.active = true;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    const tick = (now) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing 3D depth-scaled fireflies
      for (let i = 0; i < seeds.length; i += 1) {
        const s = seeds[i];
        if (pointer.active) {
          const dx = pointer.x - s.x;
          const dy = pointer.y - s.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 18 && dist < 240) {
            s.vx += (dx / dist) * 0.008 * s.z;
            s.vy += (dy / dist) * 0.008 * s.z;
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

        const alpha = (0.24 + 0.48 * (0.5 + 0.5 * Math.sin(now * 0.002 + s.phase))) * Math.min(1, s.z);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // 2. Draw 3D tumbling marigold & pistachio silk petals
      for (let i = 0; i < petals.length; i += 1) {
        const p = petals[i];
        p.pitch += p.vPitch;
        p.roll += p.vRoll;
        p.yaw += p.vYaw;

        p.x += (p.vx + Math.sin(now * 0.001 + i) * 0.25) * p.z;
        p.y += p.vy * p.z;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 10 && dist < 130) {
            p.x += (dx / dist) * 0.7;
          }
        }

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const scaleX = Math.max(0.22, Math.abs(Math.cos(p.pitch))) * p.z;
        const scaleY = Math.max(0.28, Math.abs(Math.sin(p.roll))) * p.z;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.yaw);
        ctx.scale(scaleX, scaleY);
        ctx.globalAlpha = 0.52;

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.5, p.size * 0.75, p.size * 0.7, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.7, -p.size * 0.85, -p.size * 0.5, 0, -p.size);
        ctx.fillStyle = p.fill;
        ctx.fill();
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = p.stroke;
        ctx.stroke();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [active]);

  const handlePopLantern = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const id = Date.now() + Math.random();
    const particles = Array.from({ length: 14 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 14;
      const dist = 36 + (i % 3) * 18;
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
      {/* 3D Architectural & Mandala Parallax Background Layer */}
      <div ref={bgRef} className="bg-3d-stage" aria-hidden="true">
        <div className="bg-3d-mandala bg-3d-mandala--top-left" />
        <div className="bg-3d-mandala bg-3d-mandala--mid-right" />
        <div className="bg-3d-mandala bg-3d-mandala--bottom-left" />
        <div className="bg-3d-arch-halo bg-3d-arch-halo--left" />
        <div className="bg-3d-arch-halo bg-3d-arch-halo--right" />
      </div>

      {/* 3D Tumbling Petals & Fireflies Canvas */}
      <canvas ref={canvasRef} className="seed-fireflies" aria-hidden="true" />

      {/* 3D Floating Brass Kandil Lanterns */}
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
            title="Tap lantern for #iAMinlove sparkle"
          >
            <BrassLantern3DSvg />
          </button>
        ))}
      </div>

      {bursts.map((f) => (
        <div key={f.id} className="lantern-firework" style={{ left: f.x, top: f.y }}>
          <span className="lantern-firework__tag">♾️ #iAMinlove</span>
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
