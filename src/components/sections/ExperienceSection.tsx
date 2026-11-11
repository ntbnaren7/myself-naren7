import { useState } from "react";
import { experiences } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
// import { ViewAllLink } from "../ui/ViewAllLink";

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  return (
    <section id="experience" className="portfolio-section experience-section">
      <SectionHeading>Experiences</SectionHeading>
      <div>
        {experiences.map((experience) => {
          const hasDetails =
            experience.stats.length > 0 ||
            experience.description.length > 0 ||
            experience.tags.length > 0;
          const isExpanded = Boolean(expanded[experience.id]);
          const Header = hasDetails ? "button" : "div";
          return (
            <article
              key={experience.id}
              className="experience-row local-divider"
              data-expanded={isExpanded}
            >
              <Header
                className="experience-summary"
                {...(hasDetails
                  ? {
                      type: "button" as const,
                      "aria-expanded": isExpanded,
                      "aria-controls": `experience-${experience.id}`,
                      onClick: () =>
                        setExpanded((current) => ({
                          ...current,
                          [experience.id]: !current[experience.id],
                        })),
                    }
                  : {})}
              >
                <div className="experience-identity">
                  <span className="company-logo">
                    <img
                      src={experience.image}
                      alt=""
                      width={32}
                      height={32}
                      loading="lazy"
                    />
                  </span>
                  <div className="experience-main">
                    <h3>
                      {experience.title}
                      {experience.id === "3" && (
                        <>
                          <span className="collaboration-x">x</span>
                          <span className="company-logo collaborator-logo">
                            <img
                              src="/images/experience/vengence-ui.png"
                              alt=""
                            />
                          </span>
                          VengenceUI
                        </>
                      )}
                    </h3>
                    <p>{experience.role}</p>
                  </div>
                </div>
                <div className="experience-meta">
                  <span>
                    {experience.date}
                    {hasDetails && (
                      <svg
                        viewBox="0 0 24 24"
                        width={14}
                        height={14}
                        className="experience-chevron"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </span>
                  <p>{experience.location}</p>
                </div>
              </Header>
              {hasDetails && (
                <div
                  id={`experience-${experience.id}`}
                  className="experience-collapse"
                  aria-hidden={!isExpanded}
                  inert={!isExpanded}
                >
                  <div className="experience-collapse-inner">
                    <div className="experience-details">
                      {experience.stats.length > 0 && (
                        <div className="experience-stats">
                          {experience.stats.map((stat) => (
                            <div key={stat.label}>
                              <strong>{stat.value}</strong>
                              <span>{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <ul>
                        {experience.description.map((line) => (
                          <li key={line}>
                            {line
                              .split("**")
                              .map((part, index) =>
                                index % 2 === 1 ? (
                                  <strong key={index}>{part}</strong>
                                ) : (
                                  part
                                ),
                              )}
                          </li>
                        ))}
                      </ul>
                      <div className="experience-tags">
                        {experience.tags.map((tag) => (
                          <span className="tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
      {/* <ViewAllLink href="https://www.ashutoshx7.me/experience" /> */}
    </section>
  );
}
