import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/site";
import ExportsChart from "@/components/home/ExportsChart";
import CtaBand from "@/components/page/CtaBand";
import Filmstrip from "@/components/page/Filmstrip";
import PageHero from "@/components/page/PageHero";
import SectionIntro from "@/components/page/SectionIntro";
import { buttonInk, container, h2Cream } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/about">) =>
  pageMetadata(params, "about");

const guideImages = [images.cncMachining, images.nairobi, images.conveyorLine];

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { hero, story, banner, guides, corridor, cta } = await getPage(lang, "about");

  return (
    <>
      <PageHero
        title={hero.title}
        text={hero.text}
        image={images.engineer}
        imageAlt={hero.imageAlt}
        objectPosition="28% center"
      />

      <section className="bg-cream text-ink">
        <div className={`${container} flex flex-wrap gap-x-20 gap-y-10 py-24`}>
          <h2 className={`${h2Cream} reveal flex-[1_1_min(420px,100%)]`}>{story.title}</h2>
          <div className="flex flex-[1.3_1_min(520px,100%)] flex-col gap-5 text-[19px]">
            {story.paragraphs.map((p) => (
              <p key={p} className="reveal m-0">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[560px] items-end overflow-hidden">
        <Image
          src={images.portTerminal}
          alt={banner.imageAlt}
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,21,39,.92),rgba(7,21,39,.15)_70%)]" />
        <div className={`${container} relative w-full py-16`}>
          <p className="reveal m-0 max-w-[1000px] font-serif text-[clamp(38px,5.4vw,84px)] leading-[1.02]">
            {banner.text}
          </p>
        </div>
      </section>

      <section className="bg-navy pt-24 pb-20">
        <SectionIntro title={guides.title} text={guides.intro} />
        <Filmstrip
          label={guides.title}
          frames={guides.items.map((item, i) => ({ ...item, image: guideImages[i] }))}
        />
      </section>

      <section className="bg-cream text-ink">
        <div className={`${container} flex flex-wrap items-start gap-x-18 gap-y-10 py-24`}>
          <div className="flex-[1.2_1_min(520px,100%)]">
            <h2 className={`${h2Cream} reveal mb-5`}>{corridor.title}</h2>
            {corridor.paragraphs.map((p, i) => (
              <p key={p} className={`reveal m-0 text-lg ${i === corridor.paragraphs.length - 1 ? "mb-8" : "mb-4"}`}>
                {p}
              </p>
            ))}
            <ExportsChart
              totalLabel={corridor.totalLabel}
              totalValue={corridor.totalValue}
              machineryLabel={corridor.machineryLabel}
              machineryValue={corridor.machineryValue}
              machineryShare={55 / 154}
            />
          </div>
          <div className="reveal flex-[1_1_min(380px,100%)]">
            <Image
              src={images.corridorMap}
              alt={corridor.mapAlt}
              width={1600}
              height={900}
              className="h-[340px] w-full object-cover"
            />
            <p className="mt-4 mb-0 font-serif text-[34px] leading-[1.1] text-navy">{corridor.mapTitle}</p>
            <p className="mt-1 mb-0 text-slate">{corridor.mapCaption}</p>
          </div>
        </div>
      </section>

      <CtaBand title={cta.title} text={cta.text}>
        <Link href={href(lang, "services")} className={buttonInk}>
          {cta.primary}
        </Link>
        <Link
          href={href(lang, "contact")}
          className="lift inline-flex min-h-11 items-center border-[1.5px] border-ink px-7 py-3.5 font-bold"
        >
          {cta.secondary}
        </Link>
      </CtaBand>
    </>
  );
}
