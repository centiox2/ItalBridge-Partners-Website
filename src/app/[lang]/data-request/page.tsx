import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { contact, href } from "@/site";
import Filmstrip from "@/components/page/Filmstrip";
import InquiryForm from "@/components/page/InquiryForm";
import SectionIntro from "@/components/page/SectionIntro";
import { container, eyebrow, h1Page, h2Cream } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/data-request">) =>
  pageMetadata(params, "dataRequest");

const photos = [images.engineer, images.cncMachining, images.workshop];

export default async function DataRequest({ params }: PageProps<"/[lang]/data-request">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ form }, page] = await Promise.all([getDictionary(lang), getPage(lang, "dataRequest")]);
  const { rights, form: request } = page;

  return (
    <>
      <section className={`${container} pt-10 pb-18`}>
        <div className={`${eyebrow} enter mb-3 text-gold`}>{page.eyebrow}</div>
        <h1 className={`${h1Page} enter mb-5`}>{page.title}</h1>
        <p className="enter m-0 max-w-[760px] text-[21px] text-sand [--d:80ms]">{page.intro}</p>
      </section>

      <section className="bg-navy pt-24 pb-20">
        <SectionIntro title={rights.title} text={rights.text} />
        <Filmstrip
          label={rights.label}
          frames={rights.items.map((item, i) => ({ ...item, image: photos[i] }))}
        />
      </section>

      <section className="bg-cream text-ink">
        <div className={`${container} flex flex-wrap gap-x-18 gap-y-10 py-24`}>
          <h2 className={`${h2Cream} flex-[1_1_min(360px,100%)]`}>{request.title}</h2>
          <div className="flex-[1.6_1_min(560px,100%)]">
            <InquiryForm
              id="data-request"
              fields={[
                { name: "name", label: form.name, required: true, autoComplete: "name" },
                { name: "email", label: form.email, type: "email", required: true, autoComplete: "email" },
                { name: "type", label: request.requestType, type: "select", required: true, options: request.options, full: true },
                { name: "details", label: request.details, type: "textarea" },
              ]}
              to={contact.emails[0]}
              subject={request.subject}
              submitLabel={request.submit}
              note={request.note}
              consent={form.consent}
              privacyLabel={form.privacy}
              privacyHref={href(lang, "privacy")}
              requiredLabel={form.required}
              sentText={form.sent}
            />
          </div>
        </div>
      </section>
    </>
  );
}
