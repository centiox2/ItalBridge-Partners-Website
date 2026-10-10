"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600;
const LATE_DELAY = 500;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Scale the first number in a label like "$154M" by t (0..1).
function countTo(value: string, t: number) {
  return value.replace(/\d+/, (n) => String(Math.round(Number(n) * t)));
}

type Phase = "idle" | "armed" | "play";

export default function ExportsChart({
  totalLabel,
  totalValue,
  machineryLabel,
  machineryValue,
  machineryShare,
}: {
  totalLabel: string;
  totalValue: string;
  machineryLabel: string;
  machineryValue: string;
  machineryShare: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: leave the chart as rendered.
    if (el.getBoundingClientRect().top < innerHeight * 0.9) return;

    setPhase("armed");
    setElapsed(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setPhase("play");
        const start = performance.now();
        const tick = (now: number) => {
          const ms = now - start;
          setElapsed(ms);
          if (ms < DURATION + LATE_DELAY) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const progress = (delay: number) =>
    elapsed === null ? 1 : easeOut(Math.min(Math.max(elapsed - delay, 0) / DURATION, 1));

  return (
    <div ref={ref} data-chart={phase}>
      <div className="bar flex flex-wrap items-baseline justify-between gap-4 bg-navy px-7 py-6 text-cream">
        <span className="text-lg">{totalLabel}</span>
        <span className="font-serif text-[clamp(48px,6vw,88px)] leading-none tabular-nums">
          {countTo(totalValue, progress(0))}
        </span>
      </div>
      <div
        style={{ width: `${(machineryShare * 100).toFixed(1)}%` }}
        className="bar bar-late flex min-w-[min(300px,100%)] flex-wrap items-baseline justify-between gap-4 bg-gold px-7 py-5"
      >
        <span className="text-lg font-semibold">{machineryLabel}</span>
        <span className="font-serif text-[clamp(40px,4.4vw,64px)] leading-none tabular-nums">
          {countTo(machineryValue, progress(LATE_DELAY))}
        </span>
      </div>
    </div>
  );
}
