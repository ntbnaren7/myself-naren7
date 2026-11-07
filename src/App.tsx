import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
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
import { Icon } from "./components/ui/Icon";
import {
  getVisibleSurveyPoints,
  ThemeSurveyPoints,
  type SurveyPoint,
} from "./components/ui/ThemeSurveyPoints";

export function App() {
  const [commandsOpen, setCommandsOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [surveyPoints, setSurveyPoints] = useState<SurveyPoint[]>([]);
  const surveyTimer = useRef<number | undefined>(undefined);
  const [light, setLight] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "light";
    } catch {
      return false;
    }
  });
  const toggleTheme = () => {
    if (surveyTimer.current !== undefined) return;

    const nextLight = !light;
    const theme = nextLight ? "light" : "dark";
    const updateTheme = () => {
      document.documentElement.dataset.theme = theme;
      flushSync(() => setLight(nextLight));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.theme = theme;
      setLight(nextLight);
      return;
    }

    const settleTheme = () => {
      document.documentElement.classList.add("theme-settling");
      updateTheme();
      surveyTimer.current = window.setTimeout(() => {
        document.documentElement.classList.remove("theme-settling");
        surveyTimer.current = undefined;
      }, 550);
    };
    const points = getVisibleSurveyPoints();
    if (points.length === 0) {
      settleTheme();
      return;
    }

    setSurveyPoints(points);
    surveyTimer.current = window.setTimeout(() => {
      flushSync(() => setSurveyPoints([]));
      settleTheme();
    }, 600);
  };
  useEffect(() => () => {
    window.clearTimeout(surveyTimer.current);
    document.documentElement.classList.remove("theme-settling");
  }, []);
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
          <div className="footer-dots">
            <a
              className="design-credit"
              href="https://www.ashutoshx7.me/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Design by ashutoshx7
              <Icon name="arrow-up-right" size={13} />
            </a>
          </div>
        </footer>
      </main>
      <ThemeSurveyPoints points={surveyPoints} />
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
