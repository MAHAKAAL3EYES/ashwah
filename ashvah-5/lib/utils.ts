import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build a WhatsApp deep link with a pre-filled message */
export function whatsappLink(phone: string, message?: string) {
  const cleanPhone = phone.replace(/\D/g, "");
  const base = `https://api.whatsapp.com/send?phone=${cleanPhone}`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
}

/** Build the tel: link from any formatted phone string */
export function telLink(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

/** Format GSM nicely for spec rows */
export function formatGsm(gsm: number | null) {
  return gsm ? `${gsm} GSM` : "Specifications available on enquiry";
}

/** Stagger delay helper for Framer Motion */
export function stagger(index: number, base = 0.08) {
  return { delay: index * base };
}
