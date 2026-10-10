"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  full?: boolean;
  autoComplete?: string;
};

const control =
  "w-full min-h-12 rounded-none border-[1.5px] border-navy bg-[#faf7f0] px-3.5 py-3 text-ink focus:outline-3 focus:outline-offset-1 focus:outline-gold";

// Until the site has a mail service, submitting opens the visitor's email
// app with the form contents addressed to `to`.
export default function InquiryForm({
  id,
  fields,
  to,
  subject,
  submitLabel,
  note,
  consent,
  privacyLabel,
  privacyHref,
  requiredLabel,
  sentText,
}: {
  id: string;
  fields: Field[];
  to: string;
  subject: string;
  submitLabel: string;
  note?: string;
  consent: string;
  privacyLabel: string;
  privacyHref: string;
  requiredLabel: string;
  sentText: string;
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = fields
      .map((f) => `${f.label}: ${String(data.get(f.name) ?? "").trim()}`)
      .join("\n\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap gap-4.5">
      {fields.map((f) => {
        const fieldId = `${id}-${f.name}`;
        const common = {
          id: fieldId,
          name: f.name,
          required: f.required,
          autoComplete: f.autoComplete,
        };
        return (
          <div key={f.name} className={f.full || f.type === "textarea" ? "flex-[1_1_100%]" : "flex-[1_1_260px]"}>
            <label htmlFor={fieldId} className="mb-1.5 block text-sm font-semibold text-navy">
              {f.label}
              {f.required && (
                <>
                  {" "}
                  <span aria-hidden>*</span>
                  <span className="sr-only">({requiredLabel})</span>
                </>
              )}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} className={`${control} min-h-35 resize-y`} />
            ) : f.type === "select" ? (
              <select {...common} className={control}>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input {...common} type={f.type ?? "text"} className={control} />
            )}
          </div>
        );
      })}
      <div className="flex flex-[1_1_100%] flex-wrap items-center gap-x-5 gap-y-3.5">
        <button
          type="submit"
          className="lift min-h-12 cursor-pointer border-0 bg-navy px-8 py-4 font-bold text-cream hover:brightness-110"
        >
          {submitLabel}
        </button>
        <span className="text-sm text-[#4b5463]">
          {note && `${note} `}
          {consent}{" "}
          <Link href={privacyHref} className="underline">
            {privacyLabel}
          </Link>
          .
        </span>
      </div>
      <p role="status" className="m-0 flex-[1_1_100%] text-[15px] text-navy empty:hidden">
        {sent && (
          <>
            {sentText}{" "}
            <a href={`mailto:${to}`} className="font-bold underline">
              {to}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
