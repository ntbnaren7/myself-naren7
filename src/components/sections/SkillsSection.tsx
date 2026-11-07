import { skills } from "../../data/portfolio";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" className="portfolio-section skills-section">
      <SectionHeading>Skills &amp; Technologies</SectionHeading>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-tile">
            <Icon name={skill.icon} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
