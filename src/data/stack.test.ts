import { describe, expect, it } from "vitest";
import { stack } from "./stack";

describe("stack", () => {
  it("has unique, non-empty group labels", () => {
    const labels = stack.map((group) => group.label);
    expect(labels.every(Boolean)).toBe(true);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it.each(stack.map((group) => [group.label, group] as const))(
    "%s has unique items with icons",
    (_, group) => {
      const names = group.items.map((item) => item.name);
      expect(names.length).toBeGreaterThan(0);
      expect(new Set(names).size).toBe(names.length);
      for (const { icon } of group.items) {
        // Brand logos carry SVG path data; Lucide fallbacks are components.
        if ("path" in icon) expect(icon.path.length).toBeGreaterThan(0);
        else expect(icon).toBeTruthy();
      }
    },
  );
});
