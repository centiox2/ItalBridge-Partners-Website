import Image from "next/image";
import type { Dictionary } from "@/dictionaries";
import { sections } from "@/site";
import { container, h2, ruleRow } from "../ui";

const images = [
  "/images/bottling-line.jpg",
  "/images/robotic-arm.jpg",
  "/images/milling.jpg",
  "/images/conveyor-line.jpg",
  "/images/workshop.jpg",
  "/images/cnc-machining.jpg",
];

export default function Sectors({ sectors }: { sectors: Dictionary["sectors"] }) {
  return (
    <section id={sections.industries} className={`${container} pt-26`}>
      <h2 className={`${h2} mb-10 max-w-[860px]`}>{sectors.title}</h2>
      <ul className="m-0 flex list-none flex-wrap gap-x-16 p-0">
        {sectors.items.map((item, i) => (
          <li
            key={item.title}
            className={`flex flex-[1_1_min(560px,100%)] items-center gap-5 py-4.5 ${ruleRow}`}
          >
            <Image
              src={images[i]}
              alt=""
              width={224}
              height={168}
              className="h-21 w-28 flex-none object-cover"
            />
            <div>
              <h3 className="m-0 font-serif text-2xl font-normal">{item.title}</h3>
              <p className="mt-0.5 mb-0 text-sand">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
