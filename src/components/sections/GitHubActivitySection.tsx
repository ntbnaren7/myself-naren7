import calendar from "../../data/github-activity.json";

export function GitHubActivitySection() {
  const days = calendar.contributions;
  const months = days.filter(
    (day, i) => i === 0 || new Date(`${day.date}T12:00:00`).getDate() === 1,
  );

  return (
    <section
      className="portfolio-section activity-section"
      aria-labelledby="activity-title"
    >
      <div className="section-heading full-divider">
        <h2 id="activity-title">GitHub Activity</h2>
        <span className="activity-total">
          {calendar.total.lastYear} GitHub activities in the last year
        </span>
      </div>
      <div className="activity-calendar">
        <div className="calendar-months">
          {months.map((month) => (
            <span key={month.date}>
              {new Date(`${month.date}T12:00:00`).toLocaleString("en", {
                month: "short",
              })}
            </span>
          ))}
        </div>
        <div
          className="calendar-grid"
          aria-label={`Daily GitHub contributions for ${calendar.username} over the last year`}
        >
          {days.map((day) => (
            <div
              className={`calendar-day level-${day.level}`}
              key={day.date}
              title={`${day.count} contributions on ${day.date}`}
            />
          ))}
        </div>
        <div className="calendar-legend">
          <span>Less active</span>
          <div>
            {[0, 1, 2, 3, 4].map((level) => (
              <i key={level} className={`level-${level}`} />
            ))}
            <span>More active</span>
          </div>
        </div>
      </div>
    </section>
  );
}
