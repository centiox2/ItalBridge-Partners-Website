import type { Dictionary } from "@/dictionaries";
import { contact, sections } from "@/site";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer({ dict }: { dict: Dictionary }) {
  const year = await currentYear();
  const { nav, footer } = dict;

  return (
    <footer className="text-sm">
      <div className="mx-auto flex max-w-[1344px] flex-wrap gap-9 px-4 pt-14 pb-5 sm:px-12">
        <div className="flex-[2_1_280px]">
          <div className="font-serif text-2xl">ItalBridge Partners</div>
          <p className="mt-2.5 max-w-[340px] opacity-85">{footer.tagline}</p>
        </div>
        <div className="flex flex-[1_1_130px] flex-col gap-2">
          <b className="text-gold">{footer.navigate}</b>
          <a href="#top" className="hover:text-gold">{nav.home}</a>
          <a href={`#${sections.services}`} className="hover:text-gold">{nav.services}</a>
          <a href={`#${sections.industries}`} className="hover:text-gold">{nav.industries}</a>
          <a href={`#${sections.manufacturers}`} className="hover:text-gold">{nav.manufacturers}</a>
        </div>
        {/* Legal pages don't exist yet; links point to top until they do. */}
        <div className="flex flex-[1_1_140px] flex-col gap-2">
          <b className="text-gold">{footer.legal}</b>
          <a href="#top" className="hover:text-gold">{footer.privacy}</a>
          <a href="#top" className="hover:text-gold">{footer.terms}</a>
          <a href="#top" className="hover:text-gold">{footer.cookies}</a>
        </div>
        <div className="flex flex-[1.4_1_220px] flex-col gap-2">
          <b className="text-gold">{footer.contact}</b>
          {contact.emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="hover:text-gold">
              {email}
            </a>
          ))}
          <span>
            {contact.phones.map((phone, i) => (
              <span key={phone.tel}>
                {i > 0 && " · "}
                <a href={`tel:${phone.tel}`} className="hover:text-gold">
                  {phone.display}
                </a>
              </span>
            ))}
          </span>
          <span>{footer.location}</span>
        </div>
      </div>
      <div className="mx-auto max-w-[1344px] px-4 pt-3 pb-7 text-[13px] opacity-80 sm:px-12">
        © {year} ItalBridge Partners. {footer.rights}
      </div>
    </footer>
  );
}
