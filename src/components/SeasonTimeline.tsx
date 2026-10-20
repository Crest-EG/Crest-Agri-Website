type SeasonDate = { month: number; day: number };
type SeasonWindow = { start: SeasonDate; end: SeasonDate };

type SeasonTimelineProps = {
  locale: "ar" | "en";
  windows: SeasonWindow[];
  months: string[];
  shortMonths: string[];
  title: string;
};

const MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_YEAR = MONTH_LENGTHS.reduce((total, days) => total + days, 0);

function dayIndex(date: SeasonDate) {
  return MONTH_LENGTHS.slice(0, date.month - 1).reduce((total, days) => total + days, 0) + date.day - 1;
}

function formatDate(date: SeasonDate, months: string[], locale: "ar" | "en") {
  const month = months[date.month - 1];
  return locale === "ar" ? `${date.day} ${month}` : `${month} ${date.day}`;
}

export function SeasonTimeline({ locale, windows, months, shortMonths, title }: SeasonTimelineProps) {
  const ranges = windows.map(({ start, end }) => ({ start: dayIndex(start), end: dayIndex(end) + 1 }));
  const accessibleRanges = windows.map(({ start, end }) => `${formatDate(start, months, locale)} – ${formatDate(end, months, locale)}`);
  const monthColumns = MONTH_LENGTHS.map((days) => `${days}fr`).join(" ");

  return (
    <div className="season-timeline">
      <div className="season-timeline-heading">
        <h3>{title}</h3>
        <p>{accessibleRanges.map((range) => <span key={range}>{range}</span>)}</p>
      </div>
      <div className="season-calendar" dir="ltr" role="img" aria-label={`${title}: ${accessibleRanges.join("; ")}`}>
        <div className="season-month-labels" style={{ gridTemplateColumns: monthColumns }}>
          {shortMonths.map((month) => <span key={month}>{month}</span>)}
        </div>
        <div className="season-track" style={{ gridTemplateColumns: monthColumns }}>
          {shortMonths.map((month) => <span className="season-track-month" key={month} />)}
          {ranges.flatMap(({ start, end }, windowIndex) => {
            const segments = end > start
              ? [{ start, end }]
              : [{ start, end: DAYS_IN_YEAR }, { start: 0, end }];
            return segments.map((segment, segmentIndex) => (
              <span
                className="season-range"
                key={`${windowIndex}-${segmentIndex}`}
                style={{ left: `${segment.start / DAYS_IN_YEAR * 100}%`, width: `${(segment.end - segment.start) / DAYS_IN_YEAR * 100}%` }}
              />
            ));
          })}
        </div>
      </div>
    </div>
  );
}
