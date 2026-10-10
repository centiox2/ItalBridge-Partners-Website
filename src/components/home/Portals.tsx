import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { href, sections } from "@/site";
import { buttonCream, buttonGold, container } from "../ui";

const card =
  "reveal flex flex-[1_1_min(480px,100%)] flex-col items-start gap-4.5 p-8 sm:p-12";
const cardTitle = "m-0 font-serif text-[32px] leading-[1.15] font-normal";

export default function Portals({
  lang,
  portals,
}: {
  lang: Locale;
  portals: Dictionary["portals"];
}) {
  return (
    <section id={sections.buyers} className={`${container} flex flex-wrap gap-6 pt-30`}>
      <div className={`${card} bg-navy`}>
        <h3 className={cardTitle}>{portals.manufacturers.title}</h3>
        <Link href={href(lang, "manufacturers")} className={buttonGold}>
          {portals.manufacturers.cta}
        </Link>
      </div>
      <div className={`${card} bg-slate`}>
        <h3 className={cardTitle}>{portals.buyers.title}</h3>
        <Link href={href(lang, "buyers")} className={buttonCream}>
          {portals.buyers.cta}
        </Link>
      </div>
    </section>
  );
}
