import { container, h2 } from "../ui";

// Heading with a short side note, used above strips and lists on navy.
export default function SectionIntro({
  title,
  text,
  className = "pb-11",
}: {
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`${container} flex flex-wrap items-end gap-x-16 gap-y-5 ${className}`}>
      <h2 className={`${h2} reveal flex-[1_1_min(520px,100%)]`}>{title}</h2>
      <p className="reveal m-0 flex-[1_1_320px] text-lg text-sand">{text}</p>
    </div>
  );
}
