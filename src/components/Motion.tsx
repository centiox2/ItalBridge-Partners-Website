"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const selector = ".reveal, .draw, .reveal-img, .grow-bar";

// Arms the scroll-in animations in globals.css. Elements already on screen are
// marked as shown before arming, so only content below the fold starts hidden;
// the rest animates in as it enters the viewport. Runs again after each page
// change, for the new page's content.
export default function Motion() {
  const pathname = usePathname();

  // Layout effect: runs before paint (and before a page-change snapshot), so
  // on-screen content is never captured in its hidden state.
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
