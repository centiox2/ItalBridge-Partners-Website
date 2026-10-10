import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { contact, href } from "@/site";
import ContactAside from "@/components/page/ContactAside";
import CtaBand from "@/components/page/CtaBand";
import Filmstrip from "@/components/page/Filmstrip";
import InquiryForm from "@/components/page/InquiryForm";
import PageHero from "@/components/page/PageHero";
import SectionIntro from "@/components/page/SectionIntro";
import { inquiryFields } from "@/components/page/fields";
import { buttonGold, buttonInk, container, h2, h2Cream } from "@/components/ui";

export const generateMetadata = ({ params }: PageProps<"/[lang]/buyers">) =>
  pageMetadata(params, "buyers");

const reasonImages = [
  "/images/nairobi.jpg",
  "/images/cnc-machining.jpg",
  "/images/container-port.jpg",
  "/images/nairobi-skyline.jpg",
  "/images/engineer.jpg",
];
const equipmentImages = ["/images/milling.jpg", "/images/robotic-arm.jpg", "/images/cnc-machining.jpg"];

export default async function Buyers({ params }: PageProps<"/[lang]/buyers">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ form }, { hero, reasons, band, equipment, inquiry }] = await Promise.all([
    getDictionary(lang),
    getPage(lang, "buyers"),
  ]);

  return (
    <>
      <PageHero title={hero.title} text={hero.text} image="/images/nairobi-skyline.jpg" imageAlt={hero.imageAlt}>
        <a href="#inquiry" className={buttonGold}>
          {hero.cta}
        </a>
      </PageHero>

      <section className="bg-navy pt-24 pb-20">
        <SectionIntro title={reasons.title} text={reasons.intro} />
        <Filmstrip
          label={reasons.label}
          frames={reasons.items.map((item, i) => ({ ...item, image: reasonImages[i] }))}
        />
      </section>

      <CtaBand title={band.title} text={band.text}>
        <a href="#inquiry" className={buttonInk}>
          {band.button}
        </a>
      </CtaBand>

      <section className="pt-24">
        <div className={`${container} flex flex-wrap items-end gap-x-16 gap-y-5 pb-10`}>
          <h2 className={`${h2} reveal flex-[1_1_min(520px,100%)]`}>{equipment.title}</h2>
          <Link
            href={href(lang, "industries")}
            className="reveal inline-flex min-h-11 items-center border-b-2 border-gold px-0.5 py-3 font-bold hover:text-gold"
          >
            {equipment.link}
          </Link>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 px-1.5 py-0">
          {equipment.items.map((item, i) => (
            <li key={item.title} className="group relative flex min-h-[520px] flex-[1_1_min(380px,100%)] items-end overflow-hidden">
              <Image src={equipmentImages[i]} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="zoom object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,21,39,.95),rgba(7,21,39,.1)_65%)]" />
              <div className="reveal relative p-8">
                <div className="font-serif text-[44px] leading-none text-gold">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="my-1.5 font-serif text-[28px] font-normal">{item.title}</h3>
                <p className="m-0">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="inquiry" className="mt-24 scroll-mt-4 bg-cream text-ink">
        <div className={`${container} flex flex-wrap gap-x-18 gap-y-12 py-24`}>
          <div className="flex-[1.6_1_min(560px,100%)]">
            <h2 className={`${h2Cream} mb-3.5`}>{inquiry.title}</h2>
            <p className="mb-8 max-w-[620px] text-lg">{inquiry.text}</p>
            <InquiryForm
              id="buyer"
              fields={inquiryFields(form)}
              to={contact.emails[1]}
              subject={inquiry.subject}
              submitLabel={form.submit}
              consent={form.consent}
              privacyLabel={form.privacy}
              privacyHref={href(lang, "privacy")}
              requiredLabel={form.required}
              sentText={form.sent}
            />
          </div>
          <ContactAside emailLabel={inquiry.salesLabel} phoneLabel={inquiry.phoneLabel} />
        </div>
      </section>
    </>
  );
}
