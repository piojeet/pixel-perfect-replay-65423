import { describe, expect, it } from "vitest";
import { ALL_ITEMS, CATEGORIES, componentItems, backgroundItems, effectItems, findItem, paramsFor } from "@/lib/catalog";

describe("catalog", () => {
  it("ships 20 components, 12 backgrounds and 12 effects", () => {
    expect(componentItems).toHaveLength(20);
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

  it("adds Worm Underline Tabs to the Tabs category", () => {
    const item = findItem("component", "worm-underline-tabs");
    expect(item?.category).toBe("tabs");
    expect(item?.name).toBe("Worm Underline Tabs");
    if (!item) throw new Error("Worm Underline Tabs is missing from the catalog");

    const built = item.build({ ...paramsFor(item), primary: "#123456", secondary: "#ABCDEF" });
    expect(built.html).toContain('role="tablist"');
    expect(built.css).toContain("--uf-worm-a: #123456");
    expect(built.css).toContain("--uf-worm-b: #ABCDEF");
    expect(built.js).toContain("ArrowRight");
  });

  it("adds Hopping Dot Nav to Navigation Bars", () => {
    const item = findItem("component", "hopping-dot-nav");
    expect(item?.category).toBe("navigation");
    if (!item) throw new Error("Hopping Dot Nav is missing from the catalog");

    const built = item.build({ ...paramsFor(item), primary: "#123456", bg: "#ABCDEF", radius: 18, animation: false });
    expect(built.html).toContain('aria-label="Favorites"');
    expect(built.css).toContain("--uf-hop-dot: #123456");
    expect(built.css).toContain("border-radius: 18px");
    expect(built.js).toContain("var reduce=true");
    expect(built.js).toContain("ArrowRight");
  });

  it("adds Spotlight Nav to Navigation Bars", () => {
    const item = findItem("component", "spotlight-nav");
    expect(item?.category).toBe("navigation");
    if (!item) throw new Error("Spotlight Nav is missing from the catalog");

    const built = item.build({ ...paramsFor(item), primary: "#123456", bg: "#ABCDEF", radius: 18, animation: false });
    expect(built.html).toContain('id="uf-spot-nav"');
    expect(built.css).toContain("--uf-spot-beam: #123456");
    expect(built.css).toContain("border-radius: 18px");
    expect(built.js).toContain("var reduce=true");
    expect(built.js).toContain("swing.animate");
  });
});
