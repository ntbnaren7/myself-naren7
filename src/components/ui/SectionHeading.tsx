import type { ReactNode } from "react";

export function SectionHeading({
  children,
  trailing,
}: {
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className="section-heading full-divider">
      <h2>{children}</h2>
      {trailing}
    </div>
  );
}
