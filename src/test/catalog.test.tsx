import { describe, expect, it } from "vitest";
import { ALL_ITEMS, CATEGORIES, componentItems, backgroundItems, effectItems, findItem, paramsFor } from "@/lib/catalog";

describe("catalog", () => {
  it("ships 92 components, 12 backgrounds and 12 effects", () => {
    expect(componentItems).toHaveLength(92);
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

  it("adds 3D Push Toggle with an accessible power control and active state", () => {
    const item = findItem("component", "3d-push-toggle");
    expect(item?.category).toBe("toggles");
    if (!item) throw new Error("3D Push Toggle is missing from the catalog");

    const animated = item.build({ ...paramsFor(item), animation: true });
    expect(animated.html).toContain('aria-pressed="false" aria-label="Power"');
    expect(animated.html).not.toContain("<body");
    expect(animated.css).toContain(".uf-3d-push-scene.uf-3d-push-on .uf-3d-push-ring");
    expect(animated.css).toContain("@keyframes uf-3d-push-pulse");
    expect(animated.js).toContain("aria-pressed");
    expect(animated.js).toContain("uf-3d-push-on");

    const staticBuild = item.build({ ...paramsFor(item), animation: false });
    expect(staticBuild.css).not.toContain("@keyframes uf-3d-push-pulse");
    expect(staticBuild.js).not.toContain("ring.offsetWidth");
  });

  it("adds Bead Line Stepper under Progress Bar with interactive progress", () => {
    const item = findItem("component", "bead-line-stepper");
    expect(item?.category).toBe("progress");
    expect(CATEGORIES.component.some((category) => category.slug === "progress" && category.label === "Progress Bar")).toBe(true);
    if (!item) throw new Error("Bead Line Stepper is missing from the catalog");

    expect(item.controls).toEqual(["primary", "secondary", "bg", "speed", "animation"]);
    const animated = item.build({ ...paramsFor(item), primary: "#123456", secondary: "#ABCDEF", bg: "#202020", speed: 900, animation: true });
    expect(animated.html).toContain("uf-bead-line-track");
    expect(animated.html).not.toContain("<body");
    expect(animated.css).toContain("--uf-bead-violet:#123456");
    expect(animated.css).toContain("--uf-bead-cyan:#ABCDEF");
    expect(animated.css).toContain("--uf-bead-bg:#202020");
    expect(animated.css).toContain("@keyframes uf-bead-line-breathe");
    expect(animated.js).toContain('["Account","Profile","Plan","Done"]');
    expect(animated.js).toContain("function go(target)");
    expect(animated.js).toContain("var segment=900");
    expect(animated.js).toContain("uf-bead-line-on");

    const staticBuild = item.build({ ...paramsFor(item), animation: false });
    expect(staticBuild.css).not.toContain("@keyframes uf-bead-line-breathe");
    expect(staticBuild.js).toContain("var reduce=window.matchMedia");
  });

  it("adds Back & Next Stepper under Progress Bar with bounded step navigation", () => {
    const item = findItem("component", "back-next-stepper");
    expect(item?.category).toBe("progress");
    if (!item) throw new Error("Back & Next Stepper is missing from the catalog");

    const built = item.build(paramsFor(item));
    expect(built.html).toContain("Step 1 of 4");
    expect(built.html).toContain('class="uf-bn-button uf-bn-back" disabled');
    expect(built.html).not.toContain("<body");
    expect(built.css).toContain(".uf-bn-segment.uf-bn-full i");
    expect(built.js).toContain('["Account","Profile","Plan","Done"]');
    expect(built.js).toContain("if(busy||target<0||target>=titles.length)return");
    expect(built.js).toContain("next.addEventListener('click'");
    expect(built.js).toContain("back.addEventListener('click'");
  });

  it("adds Level Blocks under Progress Bar with no autoplay and clickable steps", () => {
    const item = findItem("component", "level-blocks");
    expect(item?.category).toBe("progress");
    if (!item) throw new Error("Level Blocks is missing from the catalog");

    const built = item.build(paramsFor(item));
    expect(built.html).toContain('aria-label="Choose a progress step"');
    expect(built.html).not.toContain("<body");
    expect(built.js).toContain("placeBall(current)");
    expect(built.js).toContain("block.addEventListener('click',function(){go(index);})");
    expect(built.js).toContain("function go(target)");
    expect(built.js).not.toContain("run();");
    expect(built.js).not.toContain("stage.addEventListener('click'");
  });

  it("adds Big Number under Progress Bar with split-flap steps and restart", () => {
    const item = findItem("component", "big-number");
    expect(item?.category).toBe("progress");
    if (!item) throw new Error("Big Number is missing from the catalog");

    const built = item.build(paramsFor(item));
    expect(built.html).toContain(">Account</h2>");
    expect(built.html).toContain('aria-label="Next"');
    expect(built.html).not.toContain("<body");
    expect(built.css).toContain(".uf-big-number-flap-top");
    expect(built.js).toContain('["Account","Profile","Plan","Done"]');
    expect(built.js).toContain("label.textContent=isLast?'Restart':'Next'");
    expect(built.js).toContain("button.addEventListener('click'");
    expect(built.js).toContain("window.matchMedia('(prefers-reduced-motion: reduce)')");
  });

  it("adds Skill Path under Progress Bar with locked steps and trophy restart", () => {
    const item = findItem("component", "skill-path");
    expect(item?.category).toBe("progress");
    if (!item) throw new Error("Skill Path is missing from the catalog");

    expect(item.controls).toEqual(["primary", "secondary", "bg", "animation"]);
    const built = item.build({ ...paramsFor(item), primary: "#123456", secondary: "#ABCDEF", bg: "#202020" });
    expect(built.html).toContain(">Tap the glowing node</div>");
    expect(built.html).not.toContain("<body");
    expect(built.css).toContain("--uf-skill-primary:#123456");
    expect(built.css).toContain("--uf-skill-secondary:#ABCDEF");
    expect(built.css).toContain("--uf-skill-bg:#202020");
    expect(built.css).toContain("#123456");
    expect(built.js).toContain('["Account",50,168,"bottom"]');
    expect(built.js).toContain("var start=[18,52,86]");
    expect(built.js).toContain("node.disabled=state==='locked'");
    expect(built.js).toContain("if(index!==current)return");
    expect(built.js).toContain("hint.textContent='All done! Tap the trophy to restart'");
    expect(built.js).toContain("if(current===4){reset();return;}");

    const staticBuild = item.build({ ...paramsFor(item), animation: false });
    expect(staticBuild.css).not.toContain("@keyframes uf-skill-path-current-bounce");
    expect(staticBuild.js).toContain("matches||true");
  });

  it("adds Halo Trace date picker under Date Pickers with weekly navigation and selection", () => {
    const item = findItem("component", "halo-trace-date-picker");
    expect(item?.category).toBe("date-pickers");
    if (!item) throw new Error("Halo Trace Date Picker is missing from the catalog");
    expect(item.controls).toEqual(["primary", "secondary", "bg", "animation"]);

    const built = item.build(paramsFor(item));
    expect(built.html).toContain('aria-label="Previous week"');
    expect(built.html).toContain('aria-label="Next week"');
    expect(built.html).not.toContain("<body");
    expect(built.js).toContain("var base=new Date(2026,10,15),selected=1");
    expect(built.js).toContain("function changeWeek(direction)");
    expect(built.js).toContain("async function pick(index)");
    expect(built.js).toContain("slots(date)+\" slots\"");
    expect(built.js).toContain("strokeDashoffset:100");

    const customized = item.build({
      ...paramsFor(item),
      primary: "#112233",
      secondary: "#445566",
      animation: false,
    });
    expect(customized.html).toContain('stop-color="#445566"');
    expect(customized.css).toContain("linear-gradient(180deg,#112233,#445566)");
    expect(customized.js).toContain("matches||true");
  });

  it("adds Snap Brackets under Date Pickers with bracket selection animation", () => {
    const item = findItem("component", "snap-brackets-date-picker");
    expect(item?.category).toBe("date-pickers");
    if (!item) throw new Error("Snap Brackets is missing from the catalog");

    const built = item.build(paramsFor(item));
    expect(built.html).toContain('aria-label="Previous week"');
    expect(built.html).toContain('class="uf-sb-frame"');
    expect(built.css).toContain(".uf-sb-frame span:nth-child(4)");
    expect(built.js).toContain("function frameBox(index,widthDelta,heightDelta)");
    expect(built.js).toContain("async function pick(index)");
    expect(built.js).toContain("function changeWeek(direction)");
    expect(built.js).toContain("prefers-reduced-motion: reduce");
  });

  it("adds Rise & Land under Date Pickers with spring-like selection behavior", () => {
    const item = findItem("component", "rise-land-date-picker");
    expect(item?.category).toBe("date-pickers");
    if (!item) throw new Error("Rise & Land is missing from the catalog");

    const built = item.build(paramsFor(item));
    expect(built.html).toContain('class="uf-rl-shadow"');
    expect(built.html).toContain('aria-label="Next week"');
    expect(built.css).toContain("linear-gradient(180deg,#6c6cff,#3fa8ff)");
    expect(built.js).toContain("function riseLand(withOpacity)");
    expect(built.js).toContain("scale(1.18,.8)");
    expect(built.js).toContain("prefers-reduced-motion: reduce");
  });

  it("adds Side Wipe under Date Pickers with directional selection wipes", () => {
    const item = findItem("component", "side-wipe-date-picker");
    expect(item?.category).toBe("date-pickers");
    if (!item) throw new Error("Side Wipe is missing from the catalog");

    const built = item.build(paramsFor(item));
    expect(built.html).toContain('aria-label="Previous week"');
    expect(built.js).toContain("var visibleClip=");
    expect(built.js).toContain("var goneLeft=");
    expect(built.js).toContain("var goneRight=");
    expect(built.js).toContain("direction>0?goneLeft:goneRight");
    expect(built.js).toContain("setTimeout(function(){if(id===run)");
  });

  it("adds Dot Swell under Date Pickers with dot-to-capsule selection animation", () => {
    const item = findItem("component", "dot-swell-date-picker");
    expect(item?.category).toBe("date-pickers");
    if (!item) throw new Error("Dot Swell is missing from the catalog");

    const built = item.build(paramsFor(item));
    expect(built.html).toContain('class="uf-ds-pill uf-ds-ghost"');
    expect(built.js).toContain('var dotTransform="scale(.18,.11)"');
    expect(built.js).toContain("async function pick(index)");
    expect(built.js).toContain("duration:820");
    expect(built.js).toContain("prefers-reduced-motion: reduce");
  });
});
