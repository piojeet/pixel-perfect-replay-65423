import { describe, expect, it } from "vitest";
import { ALL_ITEMS, CATEGORIES, componentItems, backgroundItems, effectItems, findItem, paramsFor } from "@/lib/catalog";

describe("catalog", () => {
  it("ships 17 components, 12 backgrounds and 12 effects", () => {
    expect(componentItems).toHaveLength(17);
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

  it("applies Gooey Drop Toast customization controls", () => {
    const item = findItem("component", "gooey-drop-toast");
    expect(item?.category).toBe("toasts");
    expect(CATEGORIES.component.some((category) => category.slug === "toasts" && category.label === "Toasts")).toBe(true);
    expect(item?.controls).toEqual(["primary", "bg", "radius"]);
    if (!item) throw new Error("Gooey Drop Toast is missing from the catalog");

    const built = item.build({ ...paramsFor(item), primary: "#123456", bg: "#ABCDEF", radius: 10 });
    expect(built.css).toContain("--bg: #ABCDEF");
    expect(built.css).toContain("--goo: #123456");
    expect(built.js).toContain("borderRadius:'10px'");
    expect(built.js).toContain("document.documentElement.clientWidth||window.innerWidth||320");
    expect(built.js).toContain("[drop,toast,content].concat(bits,drips)");
    expect(built.js).toContain("await wait(5000)");
    expect(built.js).toContain("translateY(520px)");
  });
});
