import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { container, h1Page } from "../ui";

// Sub-page opener: headline and summary beside a tall photo.
export default function PageHero({
  title,
  text,
  image,
  imageAlt,
  objectPosition = "center",
  children,
}: {
  title: string;
  text: string;
  image: StaticImageData;
  imageAlt: string;
  objectPosition?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`${container} flex flex-wrap items-center gap-x-18 gap-y-10 pt-10 pb-22`}
    >
      <div className="flex flex-[1.3_1_min(540px,100%)] flex-col gap-6.5">
        <h1 className={`${h1Page} enter`}>{title}</h1>
        <p className="enter m-0 max-w-[600px] text-[21px] text-sand [--d:80ms]">{text}</p>
        {children && <div className="enter flex flex-wrap gap-3 [--d:160ms]">{children}</div>}
      </div>
      <Image
        src={image}
        alt={imageAlt}
        preload
        fetchPriority="high"
        placeholder="blur"
        sizes="(min-width: 1024px) 500px, 100vw"
        style={{ objectPosition }}
        className="enter-image h-[min(560px,110vw)] w-full max-w-[500px] flex-[1_1_380px] object-cover"
      />
    </section>
  );
}
