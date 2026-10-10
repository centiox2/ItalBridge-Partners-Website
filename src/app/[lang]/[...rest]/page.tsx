import { notFound } from "next/navigation";

// Any unknown path under a locale renders the branded [lang]/not-found page.
export default function CatchAll() {
  notFound();
}
