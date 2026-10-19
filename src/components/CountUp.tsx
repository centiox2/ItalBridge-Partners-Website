"use client";

import { useEffect, useRef, useState } from "react";

const duration = 1400;

// Counts the number inside a figure ("€117M", "+94,8%", "KSh 139.1B") up from
// zero when it scrolls into view, keeping its prefix, suffix, decimals and
// decimal separator. Screen readers get the final figure only.
export default function CountUp({ value }: { value: string }) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const match = /\d+(?:[.,]\d+)?/.exec(value);
    const el = ref.current;
    if (!match || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [whole, fraction = ""] = match[0].split(/[.,]/);
    const separator = match[0].includes(",") ? "," : ".";
    const target = Number(`${whole}.${fraction || 0}`);
    const before = value.slice(0, match.index);
    const after = value.slice(match.index + match[0].length);
    const format = (n: number) => before + n.toFixed(fraction.length).replace(".", separator) + after;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        setShown(format(target * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    setShown(format(0));
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
