export type NoteFields = {
  name: string;
  about: string;
  message: string;
};

/** A desk note, ready to paste into a letter. */
export function composeNote(fields: NoteFields): string {
  const lines = [fields.name.trim(), fields.about.trim(), fields.message.trim()].filter(Boolean);
  return lines.join("\n\n");
}

/** `mailto:` link. Set `NEXT_PUBLIC_CONTACT_EMAIL` to choose the recipient. */
export function noteMailto(email: string, fields: NoteFields): string {
  const subject = fields.about.trim() || fields.name.trim() || "Jagua.jpg";
  const body = composeNote(fields);
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
