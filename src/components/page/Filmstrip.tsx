import Image from "next/image";

export type Frame = {
  title: string;
  text: string;
  image: string;
  number?: string;
  footnote?: string;
};

// Frames cycle navy, slate, cream; image heights alternate tall and short.
const palettes = [
  { frame: "bg-navy text-cream", number: "text-gold", text: "text-sand" },
  { frame: "bg-slate text-cream", number: "text-gold", text: "text-sand" },
  { frame: "bg-cream text-ink", number: "text-navy", text: "text-slate" },
];

// Horizontally scrolling strip of photo cards. `fluid` frames share the
// row width instead of keeping a fixed 420px.
export default function Filmstrip({
  label,
  frames,
  fluid = false,
  heights = ["h-[340px]", "h-[240px]"],
}: {
  label: string;
  frames: Frame[];
  fluid?: boolean;
  heights?: [string, string];
}) {
  return (
    <ol
      aria-label={label}
      tabIndex={0}
      className={`strip m-0 flex list-none items-start gap-5 overflow-x-auto px-4 pb-7 sm:px-12 ${fluid ? "" : "snap-x snap-mandatory"}`}
    >
      {frames.map((frame, i) => {
        const palette = palettes[i % 3];
        return (
          <li
            key={frame.title}
            className={`group frame snap-start ${palette.frame} ${fluid ? "min-w-[min(300px,85vw)] flex-[1_1_300px]" : "w-[min(420px,85vw)] flex-none"}`}
          >
            <div className="overflow-hidden">
              <Image
                src={frame.image}
                alt=""
                width={840}
                height={i % 2 === 0 ? 680 : 480}
                sizes="420px"
                className={`zoom w-full object-cover ${heights[i % 2]}`}
              />
            </div>
            <div className="px-6.5 pt-6 pb-7.5">
              {frame.number && (
                <div className={`font-serif text-[44px] leading-none ${palette.number}`}>
                  {frame.number}
                </div>
              )}
              <h3 className="my-2 font-serif text-[25px] leading-[1.2] font-normal">{frame.title}</h3>
              <p className={`m-0 ${palette.text}`}>{frame.text}</p>
              {frame.footnote && (
                <div
                  className={`mt-3.5 border-t border-gold/60 pt-3 text-[13px] font-semibold ${palette.number}`}
                >
                  {frame.footnote}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
