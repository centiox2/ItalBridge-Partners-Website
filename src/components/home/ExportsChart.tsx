"use client";

import { useEffect, useRef, useState } from "react";

// Bars grow over 0.9s (CSS); each figure fades in and counts up as its bar
// fill reaches it. Keep in sync with the delays in globals.css.
const COUNT_MS = 700;
const TOTAL_DELAY = 500;
const LATE_DELAY = 800;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Scale the first number in a label like "$154M" by t (0..1).
function countTo(value: string, t: number) {
  return value.replace(/\d+/, (n) => String(Math.round(Number(n) * t)));
}

// idle: rendered as-is (no JS, reduced motion, or on screen at load).
// armed: bars collapsed, waiting to scroll into view.
// play: bars grow and figures count up; replays after leaving view.
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
    if (el.getBoundingClientRect().top < innerHeight * 0.9) return;

    let frame = 0;
    const arm = () => {
      cancelAnimationFrame(frame);
      setPhase("armed");
      setElapsed(0);
    };
    const play = () => {
      setPhase("play");
      const start = performance.now();
      const tick = (now: number) => {
        const ms = now - start;
        setElapsed(ms);
        if (ms < LATE_DELAY + COUNT_MS) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    arm();
    let playing = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.25 && !playing) {
          playing = true;
          play();
        } else if (!entry.isIntersecting && playing) {
          playing = false;
          arm();
        }
      },
      { threshold: [0, 0.25] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const progress = (delay: number) =>
    elapsed === null
      ? 1
      : easeOut(Math.min(Math.max(elapsed - delay, 0) / COUNT_MS, 1));

  const bar = "bar relative flex flex-wrap items-baseline justify-between gap-4";

  return (
    <div ref={ref} data-chart={phase}>
      <div className={`${bar} px-7 py-6 text-cream`}>
        <span aria-hidden className="bar-fill absolute inset-0 bg-navy" />
        <span className="bar-text relative text-lg">{totalLabel}</span>
        <span className="bar-text relative font-serif text-[clamp(48px,6vw,88px)] leading-none tabular-nums">
          {countTo(totalValue, progress(TOTAL_DELAY))}
        </span>
      </div>
      <div
        style={{ width: `${(machineryShare * 100).toFixed(1)}%` }}
        className={`${bar} bar-late min-w-[min(300px,100%)] px-7 py-5`}
      >
        <span aria-hidden className="bar-fill absolute inset-0 bg-gold" />
        <span className="bar-text relative text-lg font-semibold">{machineryLabel}</span>
        <span className="bar-text relative font-serif text-[clamp(40px,4.4vw,64px)] leading-none tabular-nums">
          {countTo(machineryValue, progress(LATE_DELAY))}
        </span>
      </div>
    </div>
  );
}
