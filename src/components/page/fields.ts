import type { Dictionary } from "@/dictionaries";
import type { Field } from "./InquiryForm";

// The standard inquiry fields, labelled from the shared `form` copy.
export function inquiryFields(form: Dictionary["form"], withCountry = false): Field[] {
  return [
    { name: "name", label: form.name, required: true, autoComplete: "name" },
    { name: "email", label: form.email, type: "email", required: true, autoComplete: "email" },
    { name: "company", label: form.company, required: true, autoComplete: "organization" },
    { name: "phone", label: form.phone, type: "tel", autoComplete: "tel" },
    ...(withCountry
      ? [{ name: "country", label: form.country, full: true, autoComplete: "country-name" }]
      : []),
    { name: "message", label: form.message, type: "textarea", required: true },
  ];
}
