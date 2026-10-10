import type { Dictionary } from "@/dictionaries";
import { container, h2 } from "../ui";
import ExportsChart from "./ExportsChart";

// $55M of $154M, so the machinery bar is drawn to scale.
const machineryShare = 55 / 154;

export default function Exports({ exports }: { exports: Dictionary["exports"] }) {
  return (
    <section className="bg-cream py-26 text-ink">
      <div className={container}>
        <h2 className={`${h2} reveal mb-3 max-w-[900px] text-navy`}>{exports.title}</h2>
        <p className="reveal mb-10 max-w-[640px] text-lg text-slate">{exports.note}</p>
        <ExportsChart
          totalLabel={exports.totalLabel}
          totalValue={exports.totalValue}
          machineryLabel={exports.machineryLabel}
          machineryValue={exports.machineryValue}
          machineryShare={machineryShare}
        />
        <p className="reveal mt-8 mb-0 font-serif text-[30px] text-navy">{exports.markets}</p>
      </div>
    </section>
  );
}
