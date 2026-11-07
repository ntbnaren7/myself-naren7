import { sections } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";

export function SectionIndex() {
  const active = useActiveSection();
  return (
    <nav className="section-index" aria-label="Page sections">
      <h2>Index</h2>
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? "active" : ""}
          aria-current={active === id ? "location" : undefined}
        >
          <span />
          {label}
        </a>
      ))}
    </nav>
  );
}
