import Image from "next/image";
import { contact } from "@/site";
import { eyebrow } from "../ui";
import { images } from "@/images";

// Direct sales email and phone beside an inquiry form.
export default function ContactAside({
  emailLabel,
  phoneLabel,
}: {
  emailLabel: string;
  phoneLabel: string;
}) {
  const email = contact.emails[1];
  const phone = contact.phones[0];
  return (
    <aside className="flex flex-[1_1_300px] flex-col gap-5.5">
      <div>
        <div className={`${eyebrow} text-[#4b5463]`}>{emailLabel}</div>
        <a href={`mailto:${email}`} className="font-serif text-[22px] break-all text-navy hover:underline">
          {email}
        </a>
      </div>
      <div>
        <div className={`${eyebrow} text-[#4b5463]`}>{phoneLabel}</div>
        <a href={`tel:${phone.tel}`} className="font-serif text-[22px] text-navy hover:underline">
          {phone.international}
        </a>
      </div>
      <Image
        src={images.engineer}
        alt=""
        placeholder="blur"
        sizes="(min-width: 1024px) 400px, 100vw"
        className="h-60 w-full object-cover object-[28%_center]"
      />
    </aside>
  );
}
