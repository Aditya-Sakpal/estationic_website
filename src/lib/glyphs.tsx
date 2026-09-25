/* Icons placed inside a face's own coordinates, where one unit is one world unit. */
import type { LucideIcon } from "lucide-react";
import {
  siFacebook,
  siGmail,
  siGoogle,
  siGoogleads,
  siGooglesheets,
  siInstagram,
  siMeta,
  siWhatsapp,
  siYoutube,
} from "simple-icons";
import { INK } from "./iso";

export const E_PATH =
  "M0 0H236V126H169V274H236V385H169V536H236V663H0ZM261 0H538V161H261ZM261 242H538V412H261ZM261 492H538V663H261Z";

export const BRANDS = {
  whatsapp: siWhatsapp.path,
  instagram: siInstagram.path,
  meta: siMeta.path,
  facebook: siFacebook.path,
  google: siGoogle.path,
  googleads: siGoogleads.path,
  youtube: siYoutube.path,
  gmail: siGmail.path,
  sheets: siGooglesheets.path,
};
export type Brand = keyof typeof BRANDS;

export function Glyph({
  icon: Icon,
  x,
  y,
  size,
  color = INK,
  sw = 1.8,
}: {
  icon: LucideIcon;
  x: number;
  y: number;
  size: number;
  color?: string;
  sw?: number;
}) {
  return <Icon x={x} y={y} size={size} color={color} strokeWidth={sw} aria-hidden />;
}

export function BrandGlyph({
  brand,
  x,
  y,
  size,
  color = INK,
}: {
  brand: Brand;
  x: number;
  y: number;
  size: number;
  color?: string;
}) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d={BRANDS[brand]} fill={color} />
    </svg>
  );
}

/** The Estationic E, centred in a w by h box. */
export function EGlyph({
  x,
  y,
  h,
  color = "#fff",
}: {
  x: number;
  y: number;
  h: number;
  color?: string;
}) {
  const w = (h * 538) / 663;
  return (
    <svg x={x - w / 2} y={y - h / 2} width={w} height={h} viewBox="0 0 538 663" aria-hidden>
      <path d={E_PATH} fill={color} fillRule="evenodd" />
    </svg>
  );
}
