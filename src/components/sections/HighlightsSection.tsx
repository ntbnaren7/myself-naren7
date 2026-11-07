import { useEffect, useRef, useState } from "react";
import { highlights } from "../../data/portfolio";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { ViewAllLink } from "../ui/ViewAllLink";

const orderedHighlights = [...highlights.slice(-2), ...highlights.slice(0, -2)];

export function HighlightsSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
    if (selected === null) dialog.current?.close();
  }, [selected]);
  const current = selected === null ? null : orderedHighlights[selected];

  return (
    <section id="highlights" className="portfolio-section highlights-section">
      <SectionHeading>Highlights</SectionHeading>
      <div className="highlights-window" aria-label="Highlights gallery">
        <div className="highlights-track">
          {[0, 1].map((copy) => (
            <div
              className="highlights-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {orderedHighlights.map((highlight, i) => (
                <button
                  key={`${copy}-${highlight.title}`}
                  tabIndex={copy === 1 ? -1 : 0}
                  className="highlight-card"
                  style={{ width: highlight.width }}
                  onClick={() => setSelected(i)}
                  aria-label={`View ${highlight.title}`}
                >
                  <div className="highlight-image">
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="highlight-caption">
                    <span className="highlight-label">{highlight.label}</span>
                    {highlight.label === "Podcast" && (
                      <Icon name="arrow-up-right" className="highlight-arrow" />
                    )}
                    <p>{highlight.title}</p>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ViewAllLink href="https://www.ashutoshx7.me/highlights" />
      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
        aria-label={current?.title || "Highlight"}
      >
        {current && (
          <>
            <button
              className="dialog-close"
              onClick={() => setSelected(null)}
              aria-label="Close highlight"
            >
              ×
            </button>
            <img src={current.image} alt={current.title} />
            <p>{current.title}</p>
          </>
        )}
      </dialog>
    </section>
  );
}
