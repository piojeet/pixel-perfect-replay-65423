import { describe, expect, it } from "vitest";
import { ALL_ITEMS, componentItems, backgroundItems, effectItems, paramsFor } from "@/lib/catalog";

describe("catalog", () => {
  it("ships 16 components, 12 backgrounds and 12 effects", () => {
    expect(componentItems).toHaveLength(16);
    expect(backgroundItems).toHaveLength(12);
    expect(effectItems).toHaveLength(12);
  });

  it("has unique slugs per kind", () => {
    const keys = ALL_ITEMS.map((i) => i.kind + ":" + i.slug);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("generated code reflects the chosen primary color", () => {
    for (const item of ALL_ITEMS.filter((i) => i.controls.includes("primary"))) {
      const b = item.build({ ...paramsFor(item), primary: "#123456" });
      expect(b.css + b.html + (b.js ?? ""), item.slug).toContain("#123456");
    }
  });
});
