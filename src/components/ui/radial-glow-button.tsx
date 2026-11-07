import type { ButtonHTMLAttributes } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import "../../styles/radial-glow-button.css";

export type RadialGlowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

// Registry component: CSS is loaded once; asChild keeps link usage semantic.
export function RadialGlowButton({
  children = "Get Extension",
  className,
  asChild = false,
  type = "button",
  ...props
}: RadialGlowButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      {...props}
      type={asChild ? undefined : type}
      className={cn("rg-button", className)}
      data-slot="radial-glow-button"
    >
      <span className="rg-shine" aria-hidden="true">
        <span />
      </span>
      <span className="rg-bg" aria-hidden="true" />
      {asChild ? (
        <Slottable>{children}</Slottable>
      ) : (
        <span className="rg-label">{children}</span>
      )}
    </Component>
  );
}

export default RadialGlowButton;
