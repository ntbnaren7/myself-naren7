import { useState } from "react";
import additionalContributions from "../../data/github-contributions.json";
import { contributions, profile } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { ViewAllLink } from "../ui/ViewAllLink";

const contributionStates = ["Merged", "Open", "Closed"] as const;
type ContributionState = (typeof contributionStates)[number];
type Contribution = {
  title: string;
  repository: string;
  state: string;
  url?: string;
};

export function OpenSourceSection() {
  const [state, setState] = useState<ContributionState>("Merged");
  const entries: Contribution[] =
    state === "Merged"
      ? contributions
      : additionalContributions[state === "Open" ? "open" : "closed"].items;
  const total =
    state === "Merged"
      ? 162
      : additionalContributions[state === "Open" ? "open" : "closed"].total;

  return (
    <>
      <section
        id="opensource"
        className="portfolio-section open-source-section"
      >
        <SectionHeading
          trailing={
            <div
              className="contribution-tabs"
              role="tablist"
              aria-label="Contribution status"
            >
              {contributionStates.map((tab) => (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  role="tab"
                  aria-controls="contribution-list"
                  aria-selected={state === tab}
                  tabIndex={state === tab ? 0 : -1}
                  className={state === tab ? "selected" : ""}
                  onClick={() => setState(tab)}
                  onKeyDown={(event) => {
                    if (
                      ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                        event.key,
                      )
                    ) {
                      event.preventDefault();
                      const index =
                        event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? 2
                            : (contributionStates.indexOf(state) +
                                (event.key === "ArrowRight" ? 1 : 2)) %
                              3;
                      setState(contributionStates[index]);
                      document
                        .getElementById(`tab-${contributionStates[index]}`)
                        ?.focus();
                    }
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          }
        >
          Open Source Contributions
        </SectionHeading>
        <div
          id="contribution-list"
          role="tabpanel"
          aria-labelledby={`tab-${state}`}
          tabIndex={0}
          className="contribution-list"
        >
          {entries.map((entry) => (
            <a
              key={entry.title}
              className="contribution-row local-divider"
              href={
                entry.url ??
                `https://github.com/${entry.repository}/pulls?q=${encodeURIComponent(entry.title)}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <i className={`contribution-dot dot-${state.toLowerCase()}`} />
                <span>{entry.title}</span>
              </div>
              <p>{entry.repository}</p>
            </a>
          ))}
          {entries.length === 0 && (
            <p className="empty-state">
              No {state.toLowerCase()} contributions.
            </p>
          )}
        </div>
        <ViewAllLink href={`${profile.githubUrl}?tab=overview`}>
          View All ({Math.max(0, total - entries.length)} more)
        </ViewAllLink>
      </section>
    </>
  );
}
