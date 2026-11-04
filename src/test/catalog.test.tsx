import { describe, expect, it } from "vitest";
import { ALL_ITEMS, CATEGORIES, componentItems, backgroundItems, effectItems, findItem, paramsFor } from "@/lib/catalog";

describe("catalog", () => {
  it("ships 81 components, 12 backgrounds and 12 effects", () => {
    expect(componentItems).toHaveLength(81);
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

  it("adds Ripple Fill Nav to Navigation Bars", () => {
    const item = findItem("component", "ripple-fill-nav");
    expect(item?.category).toBe("navigation");
    if (!item) throw new Error("Ripple Fill Nav is missing from the catalog");

    const built = item.build({ ...paramsFor(item), primary: "#123456", secondary: "#ABCDEF", radius: 18 });
    expect(built.html).toContain('aria-label="Favorites"');
    expect(built.css).toContain("--uf-ripple-v: #123456");
    expect(built.css).toContain("--uf-ripple-c: #ABCDEF");
    expect(built.css).toContain("border-radius: 18px");
    expect(built.js).toContain("ArrowRight");
    expect(built.js).toContain("uf-ripple-leave");
  });

  it("adds Jelly Icon Nav to Navigation Bars", () => {
    const item = findItem("component", "jelly-icon-nav");
    expect(item?.category).toBe("navigation");
    if (!item) throw new Error("Jelly Icon Nav is missing from the catalog");

    const built = item.build({ ...paramsFor(item), primary: "#123456", bg: "#ABCDEF", radius: 18, animation: false });
    expect(built.html).toContain('aria-label="Favorites"');
    expect(built.css).toContain("--uf-jelly-fill: #123456");
    expect(built.css).toContain("border-radius: 18px");
    expect(built.js).toContain("var reduce=true");
    expect(built.js).toContain("ArrowRight");
    expect(built.js).toContain("svg.animate(BODY");
  });

  it("adds Badge Pop Nav to Navigation Bars", () => {
    const item = findItem("component", "badge-pop-nav");
    expect(item?.category).toBe("navigation");
    if (!item) throw new Error("Badge Pop Nav is missing from the catalog");

    const built = item.build({ ...paramsFor(item), primary: "#123456", secondary: "#ABCDEF", bg: "#121212", radius: 18, animation: false });
    expect(built.html).toContain('data-n="5"');
    expect(built.css).toContain("--uf-badge-ind1: #123456");
    expect(built.css).toContain("--uf-badge-ind2: #ABCDEF");
    expect(built.css).toContain("border-radius: 18px");
    expect(built.js).toContain("var reduce=true");
    expect(built.js).toContain("function pop(tab)");
    expect(built.js).toContain("ArrowRight");
  });

  it("adds Walking Toggle to Toggles", () => {
    const item = findItem("component", "walking-toggle");
    expect(item?.category).toBe("toggles");
    expect(CATEGORIES.component.some((category) => category.slug === "toggles" && category.label === "Toggles")).toBe(true);
    if (!item) throw new Error("Walking Toggle is missing from the catalog");

    const built = item.build({ ...paramsFor(item), primary: "#123456", bg: "#ABCDEF", radius: 18, animation: false });
    expect(built.html).toContain('aria-label="Wi-Fi"');
    expect(built.html).toContain('aria-label="Notifications"');
    expect(built.html).toContain('aria-label="Auto-save" checked');
    expect(built.css).toContain("--uf-walk-bg: #ABCDEF");
    expect(built.css).toContain("--uf-walk-on: #123456");
    expect(built.css).toContain("border-radius: 18px");
    expect(built.css).toContain("animation: none !important");
    expect(built.js).toContain("var reduce=true");
    expect(built.js).toContain("state.textContent=input.checked?'On':'Off'");
  });

  it("registers all 52 modern buttons as separate components", () => {
    const buttons = componentItems.filter((item) => item.slug.startsWith("modern-button-"));
    expect(buttons).toHaveLength(52);
    expect(buttons.every((item) => item.category === "buttons")).toBe(true);
    expect(new Set(buttons.map((item) => item.name)).size).toBe(52);
    for (const item of buttons) {
      const { html, css } = item.build(paramsFor(item));
      expect(html).toContain("uf-modern-button");
      expect(html).not.toMatch(/<small>\d{2} ·/);
      expect(css).toContain("background:transparent");
      expect(css).not.toContain("radial-gradient(500px circle");
    }
  });

  it("adds Frutiger Aero Button to Buttons", () => {
    const item = findItem("component", "frutiger-aero-button");
    expect(item?.category).toBe("buttons");
    if (!item) throw new Error("Frutiger Aero Button is missing from the catalog");

    const built = item.build({ ...paramsFor(item), primary: "#123456", animation: false });
    expect(built.html).toContain(">Primary</button>");
    expect(built.css).toContain("background-color:#123456");
    expect(built.css).toContain("#12345699");
    expect(built.css).toContain("border-radius:9999px");
    expect(built.css).toContain("transition:none");
  });

  it("adds the Geo Orbit Button without unrelated page or font-link markup", () => {
    const item = findItem("component", "geo-orbit-button");
    expect(item?.category).toBe("buttons");
    if (!item) throw new Error("Geo Orbit Button is missing from the catalog");

    const built = item.build({ ...paramsFor(item), animation: false });
    expect(built.html).toContain(">Contact Us</span>");
    expect(built.html).not.toContain("<body");
    expect(built.html).not.toContain("<link");
    expect(built.css).toContain('@import url("https://fonts.googleapis.com/css2?family=Geo&display=swap")');
    expect(built.css).toContain("conic-gradient(#fff 0%,#000 3%,#409 60%,#fff 100%)");
    expect(built.css).toContain("font:700 28px/1 \"Geo\",monospace");
    expect(built.css).not.toContain("animation:uf-geo");
    expect(built.js).toBeUndefined();
  });

  it("adds Hamburger Morph Button to Menu with a scoped accessible toggle", () => {
    const item = findItem("component", "hamburger-morph-button");
    expect(item?.category).toBe("menu");
    expect(CATEGORIES.component.some((category) => category.slug === "menu" && category.label === "Menu")).toBe(true);
    if (!item) throw new Error("Hamburger Morph Button is missing from the catalog");

    const built = item.build({ ...paramsFor(item), animation: false });
    expect(built.html).toContain('aria-expanded="false" aria-label="Menu"');
    expect(built.html).not.toContain("<body");
    expect(built.css).toContain(".uf-hamburger-morph-button[aria-expanded=\"true\"]");
    expect(built.css).not.toContain("transition:box-shadow");
    expect(built.js).toContain("aria-expanded");
    expect(built.js).toContain("addEventListener('click'");
  });

  it("adds Flip Knob Toggle to Toggles without page-level markup", () => {
    const item = findItem("component", "flip-knob-toggle");
    expect(item?.category).toBe("toggles");
    if (!item) throw new Error("Flip Knob Toggle is missing from the catalog");

    const built = item.build({ ...paramsFor(item), animation: false });
    expect(built.html).toContain('role="switch" aria-checked="false" aria-label="Toggle"');
    expect(built.html).not.toContain("<body");
    expect(built.css).toContain("rotateY(180deg)");
    expect(built.css).toContain(".uf-flip-knob[aria-checked=\"true\"]");
    expect(built.css).not.toContain("@keyframes uf-flip-knob-lift");
    expect(built.js).toContain("aria-checked");
    expect(built.js).not.toContain("animationend");
  });

  it("adds Neon Glow Toggle to Toggles with an accessible SVG switch", () => {
    const item = findItem("component", "neon-glow-toggle");
    expect(item?.category).toBe("toggles");
    if (!item) throw new Error("Neon Glow Toggle is missing from the catalog");

    const animated = item.build({ ...paramsFor(item), animation: true });
    expect(animated.html).toContain('role="switch" aria-checked="false" aria-label="Toggle"');
    expect(animated.html).toContain("uf-neon-glow-gradient");
    expect(animated.html).not.toContain("<body");
    expect(animated.css).toContain("stroke:url(#uf-neon-glow-gradient)");
    expect(animated.css).toContain("@keyframes uf-neon-glow-race");
    expect(animated.js).toContain("aria-checked");
    expect(animated.js).toContain("uf-neon-glow-running");

    const staticBuild = item.build({ ...paramsFor(item), animation: false });
    expect(staticBuild.css).not.toContain("@keyframes uf-neon-glow-race");
    expect(staticBuild.js).not.toContain("toggle.offsetWidth");
  });
});
