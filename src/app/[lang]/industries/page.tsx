import Link from "next/link";
import { notFound } from "next/navigation";
import { getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/site";
import CtaBand from "@/components/page/CtaBand";
import Filmstrip from "@/components/page/Filmstrip";
import PageHero from "@/components/page/PageHero";
import SectionIntro from "@/components/page/SectionIntro";
import { buttonInk, container, h2Cream } from "@/components/ui";

export const generateMetadata = ({ params }: PageProps<"/[lang]/industries">) =>
  pageMetadata(params, "industries");

const images = [
  "/images/milling.jpg",
  "/images/bottling-line.jpg",
  "/images/robotic-arm.jpg",
  "/images/cnc-machining.jpg",
  "/images/conveyor-line.jpg",
  "/images/port-terminal.jpg",
  "/images/workshop.jpg",
];

export default async function Industries({ params }: PageProps<"/[lang]/industries">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { hero, strip, suppliers, cta } = await getPage(lang, "industries");

  return (
    <>
      <PageHero
        title={hero.title}
        text={hero.text}
        image="/images/bottling-line.jpg"
        imageAlt={hero.imageAlt}
      />

      <section className="bg-navy pt-24 pb-20">
        <SectionIntro title={strip.title} text={strip.intro} />
        <Filmstrip
          label={strip.label}
          frames={strip.items.map((item, i) => ({
            title: item.title,
            text: item.text,
            image: images[i],
            number: String(i + 1).padStart(2, "0"),
            footnote: `${strip.sourceLabel}: ${item.source}`,
          }))}
        />
      </section>

      <section className="bg-cream text-ink">
        <div className={`${container} py-24`}>
          <h2 className={`${h2Cream} reveal mb-3`}>{suppliers.title}</h2>
          <p className="reveal mb-9 max-w-[640px] text-lg">{suppliers.text}</p>
          <dl className="m-0 border-b border-navy">
            {strip.items.map((item) => (
              <div key={item.title} className="reveal flex flex-wrap gap-x-8 gap-y-1.5 border-t border-navy py-4.5">
                <dt className="flex-[1_1_320px] font-serif text-2xl text-navy">{item.title}</dt>
                <dd className="m-0 flex-[1_1_320px] text-slate">{item.source}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand title={cta.title} text={cta.text}>
        <Link href={href(lang, "contact")} className={buttonInk}>
          {cta.button}
        </Link>
      </CtaBand>
    </>
  );
}
