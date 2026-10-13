"use client";

import { useState, type FormEvent } from "react";
import { useDictionary } from "@/i18n/LocaleProvider";
import { composeNote, noteMailto, type NoteFields } from "@/lib/note";
import { paragraphs } from "@/lib/paragraphs";

const emptyNote: NoteFields = { name: "", about: "", message: "" };

export function AboutSection() {
  const dictionary = useDictionary();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";
  const [fields, setFields] = useState<NoteFields>(emptyNote);
  const [status, setStatus] = useState<"idle" | "copied" | "opened">("idle");

  function update(key: keyof NoteFields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fields.message.trim()) return;
    if (email) {
      window.location.href = noteMailto(email, fields);
      setStatus("opened");
      return;
    }
    try {
      await navigator.clipboard.writeText(composeNote(fields));
      setStatus("copied");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="min-h-[calc(100svh-var(--header-h))] bg-pink"
    >
      <div className="max-w-[710px] px-8 py-24 md:pl-[108px]">
        <h2 id="about-title" className="text-[40px] leading-[1.2] tracking-[0.02em]">
          {dictionary.about.title}
        </h2>
        <p className="font-script mt-2 text-[28px] leading-[1.2]">{dictionary.about.lead}</p>
        <div className="mt-12 space-y-[35px] text-[clamp(18px,1.6vw,22px)] leading-[1.6] tracking-[0.01em]">
          {paragraphs(dictionary.about.bio).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <h3 className="mt-16 text-[30px] leading-[1.3] tracking-[0.02em]">{dictionary.about.practiceTitle}</h3>
        <p className="mt-5 text-[clamp(18px,1.6vw,22px)] leading-[1.6] tracking-[0.01em]">
          {dictionary.about.practice}
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-16 max-w-[32rem] border-2 border-navy bg-cream px-6 py-8 shadow-card"
        >
          <h3 className="text-[30px] leading-[1.3] tracking-[0.02em]">{dictionary.about.noteTitle}</h3>
          <p className="font-script mt-2 text-[22px] leading-[1.2]">{dictionary.about.noteLead}</p>
          <label className="mt-8 block">
            <span className="font-script text-[22px]">{dictionary.about.name}</span>
            <input
              type="text"
              name="name"
              value={fields.name}
              onChange={(e) => update("name", e.target.value)}
              autoComplete="name"
              aria-label={dictionary.about.nameLabel}
              className="mt-1 w-full border-b-2 border-navy bg-transparent py-2 text-[18px] outline-none"
            />
          </label>
          <label className="mt-6 block">
            <span className="font-script text-[22px]">{dictionary.about.aboutField}</span>
            <input
              type="text"
              name="about"
              value={fields.about}
              onChange={(e) => update("about", e.target.value)}
              aria-label={dictionary.about.aboutLabel}
              className="mt-1 w-full border-b-2 border-navy bg-transparent py-2 text-[18px] outline-none"
            />
          </label>
          <label className="mt-6 block">
            <span className="font-script text-[22px]">{dictionary.about.message}</span>
            <textarea
              name="message"
              required
              rows={4}
              value={fields.message}
              onChange={(e) => update("message", e.target.value)}
              aria-label={dictionary.about.messageLabel}
              className="mt-1 w-full resize-y border-b-2 border-navy bg-transparent py-2 text-[18px] leading-[1.5] outline-none"
            />
          </label>
          <button
            type="submit"
            className="mt-8 cursor-pointer border-2 border-navy bg-transparent px-5 py-2 text-[22px]"
          >
            {email ? dictionary.about.send : dictionary.about.copy}
          </button>
          {status !== "idle" && (
            <p className="font-script mt-4 text-[22px]" role="status">
              {status === "copied" ? dictionary.about.copied : dictionary.about.opened}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
