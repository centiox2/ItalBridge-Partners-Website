import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/site";
import CtaBand from "@/components/page/CtaBand";
import PageHero from "@/components/page/PageHero";
import SectionIntro from "@/components/page/SectionIntro";
import { buttonInk, eyebrow } from "@/components/ui";

export const generateMetadata = ({ params }: PageProps<"/[lang]/services">) =>
  pageMetadata(params, "services");

const images = [
  "/images/nairobi.jpg",
  "/images/workshop.jpg",
  "/images/conveyor-line.jpg",
  "/images/cnc-machining.jpg",
  "/images/port-terminal.jpg",
  "/images/robotic-arm.jpg",
];

export default async function Services({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { hero, list, cta } = await getPage(lang, "services");

  return (
    <>
      <PageHero
        title={hero.title}
        text={hero.text}
        image="/images/container-port.jpg"
        imageAlt={hero.imageAlt}
        objectPosition="40% center"
      />

      <section className="bg-navy pt-24">
        <SectionIntro title={list.title} text={list.intro} />
        <ol className="m-0 list-none p-0">
          {list.items.map((item, i) => (
            <li key={item.title} className={i % 2 === 0 ? "bg-ink" : "bg-navy"}>
              <div
                className={`mx-auto flex max-w-[1344px] flex-wrap ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className="group relative min-h-[380px] flex-[1_1_min(440px,100%)] overflow-hidden">
                  <Image src={images[i]} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="zoom object-cover" />
                </div>
                <div className="reveal flex flex-[1.2_1_min(520px,100%)] flex-col justify-center gap-3.5 px-4 py-14 sm:px-14">
                  <div className="font-serif text-[64px] leading-none text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="m-0 font-serif text-[34px] leading-[1.1] font-normal">{item.title}</h3>
                  <p className="m-0 max-w-[560px] text-lg text-sand">{item.text}</p>
                  <div className={`${eyebrow} mt-1.5 text-gold`}>{list.deliverLabel}</div>
                  <ul className="m-0 max-w-[460px] list-none p-0">
                    {item.deliverables.map((d) => (
                      <li key={d} className="border-t border-cream/25 py-2.5">{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand title={cta.title} text={cta.text}>
        <Link href={href(lang, "contact")} className={buttonInk}>
          {cta.button}
        </Link>
      </CtaBand>
    </>
  );
}
