import type { IconType } from "react-icons";
import {
  SiFastapi,
  SiGooglegemini,
  SiPydantic,
  SiRazorpay,
  SiSqlalchemy,
} from "react-icons/si";

const techIcons: Record<string, IconType> = {
  fastapi: SiFastapi,
  gemini: SiGooglegemini,
  pydantic: SiPydantic,
  razorpay: SiRazorpay,
  sqlalchemy: SiSqlalchemy,
};

type IconProps = { name: string; size?: number; className?: string };

export function Icon({ name, size = 14, className = "" }: IconProps) {
  const TechIcon = techIcons[name];
  if (TechIcon) {
    return (
      <TechIcon
        size={size}
        className={`icon ${className}`}
        aria-hidden="true"
      />
    );
  }
  return (
    <svg
      width={size}
      height={size}
      className={`icon ${className}`}
      aria-hidden="true"
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
