import Image from "next/image";
import type { Dictionary } from "@/dictionaries";
import { sections } from "@/site";
import { buttonGold, buttonOutline, container } from "../ui";

export default function Hero({ hero }: { hero: Dictionary["hero"] }) {
  return (
    <section
      className={`${container} flex flex-wrap items-center gap-x-18 gap-y-12 pt-12 pb-24`}
    >
      <div className="flex flex-[1.3_1_min(560px,100%)] flex-col gap-7">
        <h1 className="m-0 font-serif text-[clamp(46px,6.6vw,104px)] leading-none font-normal">
          {hero.title}
        </h1>
        <p className="m-0 max-w-[560px] text-[21px] text-sand">{hero.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <a href={`#${sections.contact}`} className={buttonGold}>
            {hero.primaryCta}
          </a>
          <a href={`#${sections.services}`} className={buttonOutline}>
            {hero.secondaryCta}
          </a>
        </div>
      </div>
      <Image
        src="/images/engineer.jpg"
        alt={hero.imageAlt}
        width={1400}
        height={931}
        priority
        sizes="(min-width: 1024px) 520px, 100vw"
        className="h-[min(640px,120vw)] w-full max-w-[520px] flex-[1_1_380px] object-cover object-[28%_center]"
      />
    </section>
  );
}
