export type SurveyPoint = { x: number; y: number; delay: number };

export function getVisibleSurveyPoints(): SurveyPoint[] {
  const column = document.querySelector<HTMLElement>(".portfolio-column");
  if (!column) return [];

  const { left, right } = column.getBoundingClientRect();
  const dividers = Array.from(document.querySelectorAll<HTMLElement>(".full-divider"))
    .map((element) => element.getBoundingClientRect().bottom);
  const sectionTops = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".profile-header, .experience-section, .skills-section, .blog-section, .highlights-section",
    ),
  ).map((element) => element.getBoundingClientRect().top);

  const rows = [...dividers, ...sectionTops]
    .filter((y) => y > 4 && y < window.innerHeight - 4)
    .sort((a, b) => a - b)
    .filter((y, index, sorted) => index === 0 || y - sorted[index - 1] > 4)
    .slice(0, 4);

  return rows.flatMap((y, row) =>
    [left, right].map((x, rail) => ({ x, y, delay: row * 65 + rail * 35 })),
  );
}

export function ThemeSurveyPoints({ points }: { points: SurveyPoint[] }) {
  if (points.length === 0) return null;

  return (
    <div className="theme-survey-points" aria-hidden="true">
      {points.map(({ x, y, delay }, index) => (
        <span
          key={index}
          style={{ left: x, top: y, animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
