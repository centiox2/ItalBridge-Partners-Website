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
import { buttonGold, buttonInk, container, h2Cream } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/manufacturers">) =>
  pageMetadata(params, "manufacturers");

const stepImages = [
  images.engineer,
  images.workshop,
  images.nairobi,
  images.containerPort,
];

export default async function Manufacturers({ params }: PageProps<"/[lang]/manufacturers">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ form }, { hero, reasons, band, steps, inquiry }] = await Promise.all([
    getDictionary(lang),
    getPage(lang, "manufacturers"),
  ]);

  return (
    <>
      <PageHero title={hero.title} text={hero.text} image={images.milling} imageAlt={hero.imageAlt}>
        <a href="#inquiry" className={buttonGold}>
          {hero.cta}
        </a>
      </PageHero>

      <section className="bg-cream text-ink">
        <div className={`${container} py-24`}>
          <h2 className={`${h2Cream} reveal mb-9 max-w-[860px]`}>{reasons.title}</h2>
          <div className="border-b border-navy">
            {reasons.items.map((item) => (
              <div key={item.title} className="reveal flex flex-wrap gap-x-12 gap-y-2 border-t border-navy py-6.5">
                <h3 className="m-0 flex-[1_1_340px] font-serif text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-normal text-navy">
                  {item.title}
                </h3>
                <p className="m-0 flex-[1.3_1_min(420px,100%)] text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={band.title} text={band.text}>
        <a href="#inquiry" className={buttonInk}>
          {band.button}
        </a>
      </CtaBand>

      <section className="bg-navy pt-24 pb-20">
        <SectionIntro title={steps.title} text={steps.intro} />
        <Filmstrip
          label={steps.label}
          fluid
          frames={steps.items.map((item, i) => ({ ...item, image: stepImages[i], number: String(i + 1) }))}
        />
      </section>

      <section id="inquiry" className="scroll-mt-4 bg-cream text-ink">
        <div className={`${container} flex flex-wrap gap-x-18 gap-y-12 py-24`}>
          <div className="flex-[1.6_1_min(560px,100%)]">
            <h2 className={`${h2Cream} mb-3.5`}>{inquiry.title}</h2>
            <p className="mb-8 max-w-[620px] text-lg">{inquiry.text}</p>
            <InquiryForm
              id="manufacturer"
              fields={inquiryFields(form, true)}
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
