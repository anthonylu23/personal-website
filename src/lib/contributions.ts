export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  /** Calendar date as `YYYY-MM-DD`. */
  date: string;
  count: number;
  level: ContributionLevel;
};

export type ContributionCalendar = {
  total: number;
  days: ContributionDay[];
};

/** A week column, Sunday first. `null` pads days outside the range. */
export type ContributionWeek = (ContributionDay | null)[];

const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isLevel = (value: unknown): value is ContributionLevel =>
  value === 0 || value === 1 || value === 2 || value === 3 || value === 4;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validates the `?y=last` response from github-contributions-api.jogruber.de:
 * `{ total: { lastYear: number }, contributions: { date, count, level }[] }`.
 */
export function parseContributionsResponse(json: unknown): ContributionCalendar {
  if (!isRecord(json) || !Array.isArray(json.contributions)) {
    throw new Error("Unexpected contributions response");
  }

  const days = json.contributions.map((entry): ContributionDay => {
    if (
      !isRecord(entry) ||
      typeof entry.date !== "string" ||
      !DATE_PATTERN.test(entry.date) ||
      typeof entry.count !== "number" ||
      !isLevel(entry.level)
    ) {
      throw new Error("Unexpected contribution entry");
    }
    return { date: entry.date, count: entry.count, level: entry.level };
  });

  const reportedTotal = isRecord(json.total) ? json.total.lastYear : undefined;
  const total =
    typeof reportedTotal === "number"
      ? reportedTotal
      : days.reduce((sum, day) => sum + day.count, 0);

  return { total, days };
}

/** Day of week (0 = Sunday) for a `YYYY-MM-DD` date, independent of local time zone. */
const weekdayOf = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay();

/** Groups days into Sunday-first week columns, padding the first and last weeks. */
export function toWeeks(days: ContributionDay[]): ContributionWeek[] {
  if (days.length === 0) return [];

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const cells: ContributionWeek = [
    ...Array<null>(weekdayOf(sorted[0].date)).fill(null),
    ...sorted,
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: ContributionWeek[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

/** Tooltip text, e.g. "3 contributions on Oct 12, 2025". */
export function describeDay({ date, count }: ContributionDay): string {
  const formatted = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const noun = count === 1 ? "contribution" : "contributions";
  return `${count === 0 ? "No" : count} ${noun} on ${formatted}`;
}

// One request per username per page load, shared across remounts/navigation.
const cache = new Map<string, Promise<ContributionCalendar>>();

export function fetchContributions(username: string): Promise<ContributionCalendar> {
  const cached = cache.get(username);
  if (cached) return cached;

  const request = fetch(
    `${CONTRIBUTIONS_API}/${encodeURIComponent(username)}?y=last`,
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Contributions request failed: ${res.status}`);
      return res.json() as Promise<unknown>;
    })
    .then(parseContributionsResponse);

  // Allow a retry on the next mount if this one fails.
  request.catch(() => cache.delete(username));
  cache.set(username, request);
  return request;
}
