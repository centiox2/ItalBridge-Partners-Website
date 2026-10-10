import type { Dictionary } from "@/dictionaries";
import { container, h2 } from "../ui";

// $55M of $154M, so the machinery bar is drawn to scale.
const machineryShare = 55 / 154;

export default function Exports({ exports }: { exports: Dictionary["exports"] }) {
  return (
    <section className="bg-cream py-26 text-ink">
      <div className={container}>
        <h2 className={`${h2} mb-3 max-w-[900px] text-navy`}>{exports.title}</h2>
        <p className="mb-10 max-w-[640px] text-lg text-slate">{exports.note}</p>
        <div className="flex flex-wrap items-baseline justify-between gap-4 bg-navy px-7 py-6 text-cream">
          <span className="text-lg">{exports.totalLabel}</span>
          <span className="font-serif text-[clamp(48px,6vw,88px)] leading-none">
            {exports.totalValue}
          </span>
        </div>
        <div
          style={{ width: `${(machineryShare * 100).toFixed(1)}%` }}
          className="flex min-w-[min(300px,100%)] flex-wrap items-baseline justify-between gap-4 bg-gold px-7 py-5"
        >
          <span className="text-lg font-semibold">{exports.machineryLabel}</span>
          <span className="font-serif text-[clamp(40px,4.4vw,64px)] leading-none">
            {exports.machineryValue}
          </span>
        </div>
        <p className="mt-8 mb-0 font-serif text-[30px] text-navy">{exports.markets}</p>
      </div>
    </section>
  );
}
