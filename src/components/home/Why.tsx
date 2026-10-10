import type { Dictionary } from "@/dictionaries";
import { container, h2Small, ruleRow } from "../ui";

export default function Why({ why }: { why: Dictionary["why"] }) {
  return (
    <section className={`${container} pt-30`}>
      <h2 className={`${h2Small} mb-8`}>{why.title}</h2>
      <ul className="m-0 flex list-none flex-wrap gap-x-16 p-0">
        {why.items.map((item) => (
          <li
            key={item.title}
            className={`flex-[1_1_min(520px,100%)] py-4 ${ruleRow}`}
          >
            <b className="text-[19px]">{item.title}</b>
            <div className="text-sand">{item.text}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
