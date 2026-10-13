import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  describeDay,
  fetchContributions,
  toWeeks,
} from "../lib/contributions";
import type {
  ContributionCalendar,
  ContributionLevel,
  ContributionWeek,
} from "../lib/contributions";

const LEVEL_CLASSES: Record<ContributionLevel, string> = {
  0: "bg-textSecondary/10",
  1: "bg-accent/30",
  2: "bg-accent/55",
  3: "bg-accent/80",
  4: "bg-accent",
};

// Placeholder grid shown while loading, sized like a year so nothing shifts.
const PLACEHOLDER_WEEKS: ContributionWeek[] = Array.from({ length: 53 }, () =>
  Array<null>(7).fill(null),
);

type Status = "loading" | "ready" | "error";

type GitHubActivityProps = {
  username: string;
};

/** Past-year GitHub contribution grid. Renders nothing if the data can't be loaded. */
const GitHubActivity = ({ username }: GitHubActivityProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let active = true;
    fetchContributions(username)
      .then((data) => {
        if (!active) return;
        setCalendar(data);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [username]);

  // On narrow screens the grid scrolls horizontally; start at the most recent week.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && status === "ready") el.scrollLeft = el.scrollWidth;
  }, [status]);

  if (status === "error") return null;

  const weeks = calendar ? toWeeks(calendar.days) : PLACEHOLDER_WEEKS;
  const label = calendar
    ? `${calendar.total.toLocaleString("en-US")} GitHub contributions in the last year`
    : "Loading GitHub contributions";

  return (
    <div className="rounded-xl border border-textSecondary/35 p-3">
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
        <div
          role="img"
          aria-label={label}
          className="grid grid-flow-col gap-[3px]"
          style={{
            gridTemplateRows: "repeat(7, auto)",
            gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))`,
          }}
        >
          {weeks.flatMap((week, w) =>
            week.map((day, d) =>
              day ? (
                <div
                  key={day.date}
                  title={describeDay(day)}
                  className={`aspect-square rounded-[2px] ${LEVEL_CLASSES[day.level]}`}
                />
              ) : (
                <div
                  key={`empty-${w}-${d}`}
                  className={`aspect-square rounded-[2px] ${
                    calendar ? "" : `${LEVEL_CLASSES[0]} animate-pulse`
                  }`}
                />
              ),
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubActivity;
