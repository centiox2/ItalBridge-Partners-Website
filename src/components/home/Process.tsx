import Image from "next/image";
import type { Dictionary } from "@/dictionaries";
import { sections } from "@/site";
import { container, h2 } from "../ui";

const images = [
  "/images/nairobi.jpg",
  "/images/engineer.jpg",
  "/images/cnc-machining.jpg",
  "/images/conveyor-line.jpg",
  "/images/container-port.jpg",
  "/images/robotic-arm.jpg",
];

// Frames cycle navy, slate, cream; image heights alternate tall and short.
const palettes = [
  { frame: "bg-navy text-cream", number: "text-gold", text: "text-sand" },
  { frame: "bg-slate text-cream", number: "text-gold", text: "text-sand" },
  { frame: "bg-cream text-ink", number: "text-navy", text: "text-slate" },
];

export default function Process({
  process,
}: {
  process: Dictionary["process"];
}) {
  return (
    <section id={sections.services} className="bg-navy pt-24 pb-26">
      <div
        className={`${container} flex flex-wrap items-end gap-x-16 gap-y-5 pb-12`}
      >
        <h2 className={`${h2} reveal flex-[1_1_min(520px,100%)]`}>{process.title}</h2>
        <p className="reveal m-0 flex-[1_1_320px] text-lg text-sand">{process.intro}</p>
      </div>
      <ol
        aria-label={process.stripLabel}
        tabIndex={0}
        className="strip m-0 flex list-none snap-x snap-mandatory items-start gap-5 overflow-x-auto px-4 pb-7 sm:px-12"
      >
        {process.steps.map((step, i) => {
          const palette = palettes[i % 3];
          return (
            <li
              key={step.title}
              className={`group frame w-[min(440px,85vw)] flex-none snap-start ${palette.frame}`}
            >
              <div className="overflow-hidden">
                <Image
                  src={images[i]}
                  alt=""
                  width={880}
                  height={i % 2 === 0 ? 720 : 500}
                  sizes="440px"
                  className={`zoom w-full object-cover ${i % 2 === 0 ? "h-[360px]" : "h-[250px]"}`}
                />
              </div>
              <div className="px-6.5 pt-6 pb-7.5">
                <div className={`font-serif text-[44px] leading-none ${palette.number}`}>
                  {i + 1}
                </div>
                <h3 className="my-2 font-serif text-[25px] leading-[1.2] font-normal">
                  {step.title}
                </h3>
                <p className={`m-0 ${palette.text}`}>{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
