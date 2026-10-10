import type { Dictionary } from "@/dictionaries";
import { contact as site, sections } from "@/site";
import { buttonInk, container } from "../ui";

export default function Contact({ contact }: { contact: Dictionary["contact"] }) {
  return (
    <section id={sections.contact} className="mt-30 bg-gold text-ink">
      <div
        className={`${container} flex flex-wrap items-end gap-x-16 gap-y-8 py-28`}
      >
        <h2 className="m-0 flex-[2_1_min(560px,100%)] font-serif text-[clamp(42px,6vw,96px)] leading-none font-normal">
          {contact.title}
        </h2>
        <div className="flex flex-[1_1_300px] flex-col items-start gap-5">
          <p className="m-0 text-[19px]">{contact.text}</p>
          <a href={`mailto:${site.emails[0]}`} className={buttonInk}>
            {contact.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
