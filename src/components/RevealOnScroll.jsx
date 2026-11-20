import { useEffect, useRef, useState } from "react";

export default function RevealOnScroll({ children, className = "" }) {
  const ref = useRef(null);
  const [state, setState] = useState("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96) {
      return undefined;
    }

    let active = true;
    const raf = window.requestAnimationFrame(() => {
      if (active) setState("pending");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState("visible");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => {
      active = false;
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${state === "visible" ? "is-visible" : "is-pending"} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
