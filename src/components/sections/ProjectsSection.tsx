import { projects } from "../../data/portfolio";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { ViewAllLink } from "../ui/ViewAllLink";

export function ProjectsSection() {
  return (
    <section id="projects" className="portfolio-section projects-section">
      <SectionHeading>Projects</SectionHeading>
      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="project-preview"
              aria-label={`Open ${project.name}`}
            >
              {project.directLink && (
                <span className="project-direct-link" aria-hidden="true">
                  <Icon name="arrow-up-right" size={16} />
                </span>
              )}
              <img
                className="project-hover-image"
                src={project.hoverImage}
                alt=""
                loading="lazy"
              />
              <div className="project-screen">
                <img
                  src={project.image}
                  alt={`${project.name} preview`}
                  loading="lazy"
                />
              </div>
              <span className="project-hover-label">
                Explore project <Icon name="arrow-up-right" />
              </span>
            </a>
            <div className="project-copy">
              <div className="project-title">
                <h3>{project.name}</h3>
                <span
                  className={`status status-${project.status.toLowerCase().replaceAll(" ", "-")}`}
                >
                  <i />
                  {project.status}
                </span>
              </div>
              <p>{project.description}</p>
              <div className="project-footer">
                <div className="technology-icons" aria-label="Technologies">
                  {project.technologies.map((technology) => (
                    <span key={technology} title={technology}>
                      <Icon name={technology} />
                    </span>
                  ))}
                </div>
                <a href={project.url} target="_blank" rel="noreferrer">
                  View Project <Icon name="arrow-up-right" size={12} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <ViewAllLink href="https://www.ashutoshx7.me/projects" />
    </section>
  );
}
