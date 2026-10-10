import type { ReactNode } from "react";
import { container } from "../ui";

// Closing gold band with a large question and one or two actions.
export default function CtaBand({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-gold text-ink">
      <div className={`${container} flex flex-wrap items-end gap-x-16 gap-y-7 py-24`}>
        <h2 className="reveal m-0 flex-[2_1_min(520px,100%)] font-serif text-[clamp(36px,4.8vw,72px)] leading-[1.02] font-normal">
          {title}
        </h2>
        <div className="reveal flex flex-[1_1_300px] flex-col items-start gap-5">
          <p className="m-0 text-[19px]">{text}</p>
          <div className="flex flex-wrap gap-3">{children}</div>
        </div>
      </div>
    </section>
  );
}
