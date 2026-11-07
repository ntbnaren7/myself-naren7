import { Icon } from "./Icon";

export function ViewAllLink({
  href,
  children = "View All",
}: {
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="view-all-row full-divider">
      <a className="framed-button" href={href} target="_blank" rel="noreferrer">
        {children}
        <Icon name="arrow-up-right" size={13} />
      </a>
    </div>
  );
}
