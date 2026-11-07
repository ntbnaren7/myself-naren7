import { useEffect, useState } from "react";
import { CommandMenu } from "./components/CommandMenu";
import { SectionIndex } from "./components/SectionIndex";
import { BlogSection } from "./components/sections/BlogSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { HighlightsSection } from "./components/sections/HighlightsSection";
import { GitHubActivitySection } from "./components/sections/GitHubActivitySection";
// import { OpenSourceSection } from "./components/sections/OpenSourceSection";
import { ProfileHeader } from "./components/sections/ProfileHeader";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { profile } from "./data/portfolio";
import { ResumeDialog } from "./components/ResumeDialog";

export function App() {
  const [commandsOpen, setCommandsOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [light, setLight] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "light";
    } catch {
      return false;
    }
  });
  const toggleTheme = () => setLight((value) => !value);
  useEffect(() => {
    const theme = light ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", light ? "#ffffff" : "#000000");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Theme still works without storage. */
    }
  }, [light]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandsOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#experience">
        Skip to experience
      </a>
      <SectionIndex />
      <main className="portfolio-column">
        <ProfileHeader
          onOpenCommands={() => setCommandsOpen(true)}
          light={light}
          onToggleTheme={toggleTheme}
          onOpenResume={() => setResumeOpen(true)}
        />
        <ExperienceSection />
        <ProjectsSection />
        <GitHubActivitySection />
        {/* <OpenSourceSection /> */}
        <SkillsSection />
        <BlogSection />
        <HighlightsSection />
        <footer>
          <div className="quote full-divider">
            <blockquote>"{profile.quote}"</blockquote>
            <p>
              <span />
              {profile.quoteAuthor}
              <span />
            </p>
          </div>
          <div className="footer-dots" aria-hidden="true" />
        </footer>
      </main>
      <CommandMenu
        open={commandsOpen}
        onClose={() => setCommandsOpen(false)}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
      />
      <ResumeDialog open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
