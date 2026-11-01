import clsx, { type ClassValue } from "clsx";
import { SCHOOL_WHATSAPP } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** "11ªA" -> "11ª Classe - Turma A" ; "10ª" -> "10ª Classe" */
export function formatClassLabel(group: string): string {
  const match = group.match(/^(\d+)ª\s*([A-Za-z])?$/);
  if (!match) return group;
  const [, n, letter] = match;
  return letter ? `${n}ª Classe - Turma ${letter.toUpperCase()}` : `${n}ª Classe`;
}

export function whatsappLink(phone: string, text?: string): string {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function schoolWhatsappLink(text?: string): string {
  return whatsappLink(SCHOOL_WHATSAPP, text);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}
