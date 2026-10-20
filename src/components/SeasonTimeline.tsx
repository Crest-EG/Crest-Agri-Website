type SeasonWindow = { start: number; end: number };

type SeasonTimelineProps = {
  windows: SeasonWindow[];
  months: string[];
  title: string;
};

export function SeasonTimeline({ windows, months, title }: SeasonTimelineProps) {
  const activeMonths = months.filter((_, index) => {
    const monthNumber = index + 1;
    return windows.some(({ start, end }) => start <= end
      ? monthNumber >= start && monthNumber <= end
      : monthNumber >= start || monthNumber <= end);
  });
  return (
    <div className="season-timeline">
      <h3>{title}</h3>
      <div className="season-months" role="img" aria-label={`${title}: ${activeMonths.join(", ")}`}>
        {months.map((month) => {
          const active = activeMonths.includes(month);
          return <span key={month} className={active ? "season-month is-active" : "season-month"}>{month}</span>;
        })}
      </div>
    </div>
  );
}
