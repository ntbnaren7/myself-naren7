type IconProps = { name: string; size?: number; className?: string };

export function Icon({ name, size = 14, className = "" }: IconProps) {
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
