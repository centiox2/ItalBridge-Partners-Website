import type { Dictionary } from "@/dictionaries";
import { sections } from "@/site";
import { buttonGold, container, h2Small, ruleRow } from "../ui";

export default function Network({ network }: { network: Dictionary["network"] }) {
  return (
    <section
      id={sections.manufacturers}
      className={`${container} flex flex-wrap gap-x-20 gap-y-10 pt-30`}
    >
      <div className="reveal flex-[1_1_min(420px,100%)]">
        <h2 className={`${h2Small} mb-5`}>{network.title}</h2>
        <p className="mb-7 text-lg text-sand">{network.text}</p>
        <a href={`#${sections.contact}`} className={buttonGold}>
          {network.cta}
        </a>
      </div>
      <ul className="m-0 flex-[1.2_1_min(520px,100%)] list-none p-0">
        {network.items.map((item) => (
          <li key={item.title} className={`reveal py-3.5 ${ruleRow}`}>
            <b className="text-[19px]">{item.title}</b>
            <div className="text-sand">{item.text}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
