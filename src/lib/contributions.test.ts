import { afterEach, describe, expect, it, vi } from "vitest";
import {
  describeDay,
  fetchContributions,
  parseContributionsResponse,
  toWeeks,
} from "./contributions";
import type { ContributionDay } from "./contributions";

const day = (date: string, count = 0, level: ContributionDay["level"] = 0) => ({
  date,
  count,
  level,
});

/** Consecutive days starting at `start` (YYYY-MM-DD). */
const range = (start: string, length: number): ContributionDay[] =>
  Array.from({ length }, (_, i) => {
    const d = new Date(`${start}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + i);
    return day(d.toISOString().slice(0, 10));
  });

describe("parseContributionsResponse", () => {
  it("parses the API shape", () => {
    const result = parseContributionsResponse({
      total: { lastYear: 5 },
      contributions: [day("2025-10-12", 2, 1), day("2025-10-13", 3, 2)],
    });
    expect(result).toEqual({
      total: 5,
      days: [day("2025-10-12", 2, 1), day("2025-10-13", 3, 2)],
    });
  });

  it("sums counts when the total is missing", () => {
    const result = parseContributionsResponse({
      contributions: [day("2025-10-12", 2, 1), day("2025-10-13", 3, 2)],
    });
    expect(result.total).toBe(5);
  });

  it.each([
    ["non-object", null],
    ["missing contributions", { total: { lastYear: 1 } }],
    ["bad level", { contributions: [{ date: "2025-10-12", count: 1, level: 7 }] }],
    ["bad date", { contributions: [{ date: "10/12/2025", count: 1, level: 1 }] }],
    ["bad count", { contributions: [{ date: "2025-10-12", count: "1", level: 1 }] }],
  ])("rejects %s", (_, input) => {
    expect(() => parseContributionsResponse(input)).toThrow();
  });
});

describe("toWeeks", () => {
  it("returns no weeks for no days", () => {
    expect(toWeeks([])).toEqual([]);
  });

  it("pads the first week so each column starts on Sunday", () => {
    // 2025-10-15 is a Wednesday.
    const weeks = toWeeks(range("2025-10-15", 4));
    expect(weeks).toHaveLength(1);
    expect(weeks[0].slice(0, 3)).toEqual([null, null, null]);
    expect(weeks[0][3]?.date).toBe("2025-10-15");
    expect(weeks[0][6]?.date).toBe("2025-10-18");
  });

  it("pads the last week to seven days", () => {
    // 2025-10-12 is a Sunday.
    const weeks = toWeeks(range("2025-10-12", 9));
    expect(weeks).toHaveLength(2);
    expect(weeks[1].map((d) => d?.date ?? null)).toEqual([
      "2025-10-19",
      "2025-10-20",
      null,
      null,
      null,
      null,
      null,
    ]);
  });

  it("sorts unordered input", () => {
    const [first, second] = range("2025-10-12", 2);
    const weeks = toWeeks([second, first]);
    expect(weeks[0][0]).toBe(first);
    expect(weeks[0][1]).toBe(second);
  });

  it("fits a year into 53 or 54 full weeks", () => {
    const weeks = toWeeks(range("2025-10-12", 366));
    expect(weeks.length).toBeGreaterThanOrEqual(53);
    expect(weeks.length).toBeLessThanOrEqual(54);
    expect(weeks.every((week) => week.length === 7)).toBe(true);
  });
});

describe("describeDay", () => {
  it.each([
    [0, "No contributions on Oct 12, 2025"],
    [1, "1 contribution on Oct 12, 2025"],
    [4, "4 contributions on Oct 12, 2025"],
  ])("describes %i contributions", (count, expected) => {
    expect(describeDay(day("2025-10-12", count, 1))).toBe(expected);
  });
});

describe("fetchContributions", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const okResponse = () =>
    new Response(
      JSON.stringify({
        total: { lastYear: 1 },
        contributions: [day("2025-10-12", 1, 1)],
      }),
    );

  it("requests the last year and reuses the result", async () => {
    const fetchMock = vi.fn(async () => okResponse());
    vi.stubGlobal("fetch", fetchMock);

    const first = await fetchContributions("cache-user");
    const second = await fetchContributions("cache-user");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://github-contributions-api.jogruber.de/v4/cache-user?y=last",
    );
    expect(second).toBe(first);
  });

  it("does not cache failures", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("nope", { status: 500 }))
      .mockResolvedValueOnce(okResponse());
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchContributions("retry-user")).rejects.toThrow("500");
    await expect(fetchContributions("retry-user")).resolves.toMatchObject({
      total: 1,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
