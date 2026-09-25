import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { E_PATH } from "../lib/glyphs";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
        <rect width="64" height="64" rx="13" fill="var(--red)" />
        <g transform="translate(20.5 17.1) scale(0.0449)">
          <path d={E_PATH} fill="#fff" fillRule="evenodd" />
        </g>
      </svg>
      <span className="logo-word">Estationic</span>
    </span>
  );
}

export function Button({
  href,
  children,
  tone = "ink",
  arrow = false,
  icon,
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "ink" | "line";
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
}) {
  // the booking calendar and the Gmail draft open beside the page, so the
  // visitor keeps their place
  const newTab = href.startsWith("http");
  return (
    <a
      href={href}
      className={`btn btn-${tone}${className ? ` ${className}` : ""}`}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
      <span>{children}</span>
      {arrow && <ArrowRight className="btn-arrow" size={16} strokeWidth={2} aria-hidden />}
    </a>
  );
}

/** A hairline across the page, with a crosshair where it meets each rail. */
export function Rule() {
  return (
    <div className="rule" aria-hidden>
      <span className="cross cross-l" />
      <span className="cross cross-r" />
    </div>
  );
}
