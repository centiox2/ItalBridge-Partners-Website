"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

const selector = ".reveal, .draw, .reveal-img, .grow-bar";

// Arms the scroll-in animations in globals.css. Elements already on screen are
// marked as shown before arming, so only content below the fold starts hidden;
// the rest animates in as it enters the viewport. Runs again after each page
// change, for the new page's content, and fades that page in.
export default function Motion() {
  const pathname = usePathname();
  const firstPage = useRef(true);

  // Layout effect: runs before paint (and before a page-change snapshot), so
  // on-screen content is never captured in its hidden state.
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // A Web Animation on <main> rather than React's <ViewTransition>: that one
    // made every update on the page (each frame of a counting figure, say)
    // restyle the whole document, roughly 10x the style work after load.
    if (firstPage.current) firstPage.current = false;
    else
      document.querySelector("main")?.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 320, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );

    const fold = window.innerHeight * 0.92;
    const pending = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((el) => {
      if (el.classList.contains("is-in")) return false;
      if (el.getBoundingClientRect().top < fold) {
        el.classList.add("is-in");
        return false;
      }
      return true;
    });
    document.documentElement.dataset.motion = "";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
