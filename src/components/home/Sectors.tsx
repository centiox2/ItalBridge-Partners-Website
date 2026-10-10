import Image from "next/image";
import type { Dictionary } from "@/dictionaries";
import { sections } from "@/site";
import { container, h2, ruleRow } from "../ui";
import { images } from "@/images";

const photos = [
  images.bottlingLine,
  images.roboticArm,
  images.milling,
  images.conveyorLine,
  images.workshop,
  images.cncMachining,
];

export default function Sectors({ sectors }: { sectors: Dictionary["sectors"] }) {
  return (
    <section id={sections.industries} className={`${container} pt-26`}>
      <h2 className={`${h2} reveal mb-10 max-w-[860px]`}>{sectors.title}</h2>
      <ul className="m-0 flex list-none flex-wrap gap-x-16 p-0">
        {sectors.items.map((item, i) => (
          <li
            key={item.title}
            className={`group reveal flex flex-[1_1_min(560px,100%)] items-center gap-5 py-4.5 ${ruleRow}`}
          >
            <div className="flex-none overflow-hidden">
              <Image
                src={photos[i]}
                alt=""
                width={112}
                height={84}
                placeholder="blur"
                className="zoom h-21 w-28 object-cover"
              />
            </div>
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
