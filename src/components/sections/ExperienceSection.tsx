import { experiences } from "../../data/portfolio";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
// import { ViewAllLink } from "../ui/ViewAllLink";

export function ExperienceSection() {
  return (
    <section id="experience" className="portfolio-section experience-section">
      <SectionHeading>Experiences</SectionHeading>
      <div>
        {experiences.map((experience) => {
          const hasDetails =
            experience.stats.length > 0 ||
            experience.description.length > 0 ||
            experience.tags.length > 0;
          const Row = hasDetails ? "details" : "article";
          const Header = hasDetails ? "summary" : "div";
          return (
            <Row key={experience.id} className="experience-row local-divider">
              <Header className="experience-summary">
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
                      <Icon
                        name="chevron-down"
                        size={13}
                        className="experience-chevron"
                      />
                    )}
                  </span>
                  <p>{experience.location}</p>
                </div>
              </Header>
              {hasDetails && (
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
                      <li key={line}>{line}</li>
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
              )}
            </Row>
          );
        })}
      </div>
      {/* <ViewAllLink href="https://www.ashutoshx7.me/experience" /> */}
    </section>
  );
}
