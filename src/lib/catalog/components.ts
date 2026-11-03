import { alpha, SIZES, type Item, type ControlKey } from "./types";
import { frutigerAeroButtonItem, geoOrbitButtonItem, modernButtonItems } from "./modern-buttons";

const BTN: ControlKey[] = ["primary", "secondary", "bg", "size", "radius", "weight", "shadow", "animation"];

export const componentItems: Item[] = [
  {
    slug: "gradient-button",
    name: "Gradient Button",
    kind: "component",
    category: "buttons",
    description: "A modern gradient button with a soft glow and lift on hover.",
    controls: BTN,
    featured: true,
    added: 1,
    build: (p) => {
      const s = SIZES[p.size];
      return {
        html: `<button class="uf-grad-btn">Get Started <span aria-hidden="true">→</span></button>`,
        css: `.uf-grad-btn {
  padding: ${s.py}px ${s.px}px;
  font-size: ${s.fs}px;
  font-weight: ${p.weight};
  color: #fff;
  border: 0;
  border-radius: ${p.radius}px;
  background: linear-gradient(90deg, ${p.primary}, ${p.secondary});
  cursor: pointer;
  ${p.shadow ? `box-shadow: 0 10px 30px -8px ${alpha(p.primary, 0.6)};` : ""}
  ${p.animation ? "transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;" : ""}
}
.uf-grad-btn:hover {
  ${p.animation ? "transform: translateY(-2px);" : ""}
  filter: brightness(1.1);
  ${p.shadow ? `box-shadow: 0 16px 40px -8px ${alpha(p.primary, 0.75)};` : ""}
}
.uf-grad-btn:focus-visible { outline: 2px solid ${p.secondary}; outline-offset: 3px; }`,
      };
    },
  },
  {
    slug: "animated-button",
    name: "Animated Shine Button",
    kind: "component",
    category: "buttons",
    description: "A solid button with a light sweep that glides across on hover.",
    controls: BTN,
    added: 2,
    build: (p) => {
      const s = SIZES[p.size];
      return {
        html: `<button class="uf-shine-btn">Hover me</button>`,
        css: `.uf-shine-btn {
  position: relative;
  overflow: hidden;
  padding: ${s.py}px ${s.px}px;
  font-size: ${s.fs}px;
  font-weight: ${p.weight};
  color: #fff;
  background: ${p.primary};
  border: 0;
  border-radius: ${p.radius}px;
  cursor: pointer;
  ${p.shadow ? `box-shadow: 0 8px 24px -10px ${alpha(p.primary, 0.8)};` : ""}
}
.uf-shine-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, ${alpha(p.secondary, 0.55)} 50%, transparent 70%);
  transform: translateX(-120%);
  ${p.animation ? "transition: transform .7s ease;" : ""}
}
.uf-shine-btn:hover::after { transform: translateX(120%); }`,
      };
    },
  },
  {
    slug: "outline-button",
    name: "Outline Button",
    kind: "component",
    category: "buttons",
    description: "A clean outline button that fills smoothly on hover.",
    controls: ["primary", "bg", "size", "radius", "weight", "animation"],
    added: 3,
    build: (p) => {
      const s = SIZES[p.size];
      return {
        html: `<button class="uf-outline-btn">Download ↓</button>`,
        css: `.uf-outline-btn {
  padding: ${s.py}px ${s.px}px;
  font-size: ${s.fs}px;
  font-weight: ${p.weight};
  color: ${p.primary};
  background: transparent;
  border: 1.5px solid ${p.primary};
  border-radius: ${p.radius}px;
  cursor: pointer;
  ${p.animation ? "transition: background .2s ease, color .2s ease;" : ""}
}
.uf-outline-btn:hover { background: ${p.primary}; color: #fff; }`,
      };
    },
  },
  {
    slug: "glass-card",
    name: "Glassmorphism Card",
    kind: "component",
    category: "cards",
    description: "A frosted glass card with a blurred backdrop and soft border.",
    controls: ["primary", "secondary", "bg", "radius", "padding", "shadow", "animation"],
    featured: true,
    added: 4,
    build: (p) => ({
      html: `<div class="uf-glass-wrap">
  <article class="uf-glass">
    <span class="uf-glass-tag">New</span>
    <h3>Modern Card</h3>
    <p>A clean and responsive card component with a frosted finish.</p>
    <a href="#">Learn more →</a>
  </article>
</div>`,
      css: `.uf-glass-wrap { position: relative; padding: 40px; }
.uf-glass-wrap::before, .uf-glass-wrap::after {
  content: ""; position: absolute; width: 140px; height: 140px; border-radius: 50%; filter: blur(30px);
}
.uf-glass-wrap::before { background: ${p.primary}; top: 10px; left: 10px; }
.uf-glass-wrap::after { background: ${p.secondary}; bottom: 10px; right: 10px; }
.uf-glass {
  position: relative; z-index: 1; width: 260px;
  padding: ${p.padding}px;
  border-radius: ${p.radius + 4}px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: #F8FAFC;
  ${p.shadow ? "box-shadow: 0 20px 50px -20px rgba(0,0,0,.6);" : ""}
  ${p.animation ? "transition: transform .3s ease;" : ""}
}
.uf-glass:hover { ${p.animation ? "transform: translateY(-4px);" : ""} }
.uf-glass-tag { font-size: 11px; padding: 3px 8px; border-radius: 99px; background: ${alpha(p.primary, 0.3)}; }
.uf-glass h3 { margin: 12px 0 6px; font-size: 18px; }
.uf-glass p { margin: 0 0 14px; font-size: 13px; line-height: 1.5; color: #CBD5E1; }
.uf-glass a { color: ${p.secondary}; font-size: 13px; text-decoration: none; font-weight: 600; }`,
    }),
  },
  {
    slug: "modern-dropdown",
    name: "Modern Dropdown",
    kind: "component",
    category: "dropdowns",
    description: "An accessible dropdown with a smooth open animation and keyboard close.",
    controls: ["primary", "bg", "radius", "shadow", "animation"],
    added: 5,
    featured: true,
    build: (p) => ({
      html: `<div class="uf-dd">
  <button class="uf-dd-trigger" aria-haspopup="listbox" aria-expanded="false">
    <span class="uf-dd-value">Select option</span> <span aria-hidden="true">▾</span>
  </button>
  <ul class="uf-dd-menu" role="listbox">
    <li role="option" tabindex="0">React</li>
    <li role="option" tabindex="0">Tailwind CSS</li>
    <li role="option" tabindex="0">Vanilla JS</li>
  </ul>
</div>`,
      css: `.uf-dd { position: relative; width: 220px; margin-bottom: 140px; }
.uf-dd-trigger {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 11px 14px; font: inherit; font-size: 14px; color: #F8FAFC; cursor: pointer;
  background: #141A2E; border: 1px solid #252C43; border-radius: ${p.radius}px;
}
.uf-dd-trigger:focus-visible { outline: 2px solid ${p.primary}; }
.uf-dd-menu {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0; margin: 0; padding: 6px; list-style: none;
  background: #141A2E; border: 1px solid #252C43; border-radius: ${p.radius}px;
  ${p.shadow ? "box-shadow: 0 20px 40px -12px rgba(0,0,0,.6);" : ""}
  opacity: 0; transform: translateY(-6px); pointer-events: none;
  ${p.animation ? "transition: opacity .18s ease, transform .18s ease;" : ""}
}
.uf-dd.open .uf-dd-menu { opacity: 1; transform: none; pointer-events: auto; }
.uf-dd-menu li { padding: 9px 10px; font-size: 14px; border-radius: ${Math.max(4, p.radius - 4)}px; cursor: pointer; color: #CBD5E1; }
.uf-dd-menu li:hover, .uf-dd-menu li:focus { background: ${alpha(p.primary, 0.2)}; color: #fff; outline: none; }`,
      js: `const dd = document.querySelector(".uf-dd");
const trigger = dd.querySelector(".uf-dd-trigger");
const value = dd.querySelector(".uf-dd-value");
const setOpen = (o) => { dd.classList.toggle("open", o); trigger.setAttribute("aria-expanded", o); };
trigger.addEventListener("click", () => setOpen(!dd.classList.contains("open")));
dd.querySelectorAll("li").forEach((li) => {
  const pick = () => { value.textContent = li.textContent; setOpen(false); trigger.focus(); };
  li.addEventListener("click", pick);
  li.addEventListener("keydown", (e) => e.key === "Enter" && pick());
});
document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
document.addEventListener("click", (e) => !dd.contains(e.target) && setOpen(false));`,
    }),
  },
  {
    slug: "floating-label-input",
    name: "Floating Label Input",
    kind: "component",
    category: "inputs",
    description: "A text field whose label floats above when focused or filled.",
    controls: ["primary", "bg", "radius", "animation"],
    added: 6,
    build: (p) => ({
      html: `<div class="uf-float">
  <input id="email" type="email" placeholder=" " />
  <label for="email">Email address</label>
</div>`,
      css: `.uf-float { position: relative; width: 280px; }
.uf-float input {
  width: 100%; padding: 22px 14px 8px; font: inherit; font-size: 15px; color: #F8FAFC;
  background: #141A2E; border: 1px solid #252C43; border-radius: ${p.radius}px; outline: none;
  ${p.animation ? "transition: border-color .2s, box-shadow .2s;" : ""}
}
.uf-float label {
  position: absolute; left: 14px; top: 15px; font-size: 15px; color: #94A3B8; pointer-events: none;
  ${p.animation ? "transition: all .2s ease;" : ""}
}
.uf-float input:focus { border-color: ${p.primary}; box-shadow: 0 0 0 3px ${alpha(p.primary, 0.25)}; }
.uf-float input:focus + label,
.uf-float input:not(:placeholder-shown) + label { top: 6px; font-size: 11px; color: ${p.primary}; }`,
    }),
  },
  {
    slug: "search-input",
    name: "Search Input",
    kind: "component",
    category: "inputs",
    description: "A search field with icon and keyboard shortcut hint.",
    controls: ["primary", "bg", "radius"],
    added: 7,
    build: (p) => ({
      html: `<label class="uf-search">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
  <input type="search" placeholder="Search components..." />
  <kbd>Ctrl K</kbd>
</label>`,
      css: `.uf-search {
  display: flex; align-items: center; gap: 10px; width: 320px; padding: 10px 12px;
  background: #141A2E; border: 1px solid #252C43; border-radius: ${p.radius}px; color: #94A3B8;
}
.uf-search:focus-within { border-color: ${p.primary}; box-shadow: 0 0 0 3px ${alpha(p.primary, 0.2)}; }
.uf-search input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: #F8FAFC; font: inherit; font-size: 14px; }
.uf-search kbd { font-family: inherit; font-size: 11px; padding: 2px 6px; border: 1px solid #252C43; border-radius: 6px; }`,
    }),
  },
  {
    slug: "notification-badge",
    name: "Notification Badge",
    kind: "component",
    category: "badges",
    description: "A bell icon with a pulsing unread counter.",
    controls: ["primary", "bg", "animation"],
    defaults: { primary: "#F87171" },
    added: 8,
    build: (p) => ({
      html: `<button class="uf-bell" aria-label="3 unread notifications">
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  <span class="uf-badge">3</span>
</button>`,
      css: `.uf-bell { position: relative; padding: 12px; background: #141A2E; border: 1px solid #252C43; border-radius: 12px; color: #F8FAFC; cursor: pointer; }
.uf-badge {
  position: absolute; top: -6px; right: -6px; min-width: 20px; height: 20px; padding: 0 5px;
  display: grid; place-items: center; font-size: 11px; font-weight: 700; color: #fff;
  background: ${p.primary}; border-radius: 99px; border: 2px solid #080B16;
}
${p.animation ? `.uf-badge::after {
  content: ""; position: absolute; inset: -2px; border-radius: inherit; border: 2px solid ${p.primary};
  animation: uf-ping 1.6s ease-out infinite;
}
@keyframes uf-ping { to { transform: scale(1.8); opacity: 0; } }` : ""}`,
    }),
  },
  {
    slug: "modern-alert",
    name: "Modern Alert",
    kind: "component",
    category: "alerts",
    description: "A dismissible alert with an accent stripe and icon.",
    controls: ["primary", "bg", "radius", "padding"],
    defaults: { primary: "#34D399", padding: 16 },
    added: 9,
    build: (p) => ({
      html: `<div class="uf-alert" role="alert">
  <span class="uf-alert-icon">✓</span>
  <div><strong>Changes saved</strong><p>Your component settings were updated.</p></div>
  <button class="uf-alert-close" aria-label="Dismiss">×</button>
</div>`,
      css: `.uf-alert {
  display: flex; gap: 12px; align-items: flex-start; width: 340px; padding: ${p.padding}px;
  background: ${alpha(p.primary, 0.1)}; border: 1px solid ${alpha(p.primary, 0.35)};
  border-left: 4px solid ${p.primary}; border-radius: ${p.radius}px; color: #F8FAFC;
  transition: opacity .25s ease;
}
.uf-alert-icon { display: grid; place-items: center; width: 24px; height: 24px; flex: none; border-radius: 50%; background: ${p.primary}; color: #0B0F1E; font-weight: 700; font-size: 13px; }
.uf-alert strong { font-size: 14px; }
.uf-alert p { margin: 2px 0 0; font-size: 13px; color: #94A3B8; }
.uf-alert-close { margin-left: auto; background: none; border: 0; color: #94A3B8; font-size: 20px; cursor: pointer; line-height: 1; }`,
      js: `document.querySelector(".uf-alert-close").addEventListener("click", (e) => {
  const alertEl = e.currentTarget.closest(".uf-alert");
  alertEl.style.opacity = "0";
  setTimeout(() => alertEl.remove(), 250);
});`,
    }),
  },
  {
    slug: "avatar-group",
    name: "Avatar Group",
    kind: "component",
    category: "avatars",
    description: "Overlapping initials avatars that spread apart on hover.",
    controls: ["primary", "secondary", "bg", "animation"],
    added: 10,
    build: (p) => ({
      html: `<div class="uf-avatars">
  <span>AK</span><span>RS</span><span>MJ</span><span>PL</span><span class="more">+5</span>
</div>`,
      css: `.uf-avatars { display: flex; }
.uf-avatars span {
  display: grid; place-items: center; width: 44px; height: 44px; margin-left: -12px;
  border-radius: 50%; border: 3px solid #080B16; font-size: 13px; font-weight: 700; color: #fff;
  background: linear-gradient(135deg, ${p.primary}, ${p.secondary});
  ${p.animation ? "transition: margin .25s ease, transform .25s ease;" : ""}
}
.uf-avatars span:first-child { margin-left: 0; }
.uf-avatars span:nth-child(2) { filter: hue-rotate(40deg); }
.uf-avatars span:nth-child(3) { filter: hue-rotate(80deg); }
.uf-avatars span:nth-child(4) { filter: hue-rotate(140deg); }
.uf-avatars .more { background: #1B2238; }
.uf-avatars:hover span { margin-left: ${p.animation ? "4px" : "-12px"}; }
.uf-avatars span:hover { transform: translateY(-4px); }`,
    }),
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    kind: "component",
    category: "tooltips",
    description: "A pure CSS tooltip that appears on hover and keyboard focus.",
    controls: ["primary", "bg", "radius", "animation"],
    added: 11,
    build: (p) => ({
      html: `<button class="uf-tip" aria-describedby="tip1">
  Hover or focus me
  <span id="tip1" role="tooltip">Copied to clipboard</span>
</button>`,
      css: `.uf-tip { position: relative; padding: 10px 16px; font: inherit; font-size: 14px; color: #F8FAFC; background: #141A2E; border: 1px solid #252C43; border-radius: 10px; cursor: pointer; }
.uf-tip [role="tooltip"] {
  position: absolute; bottom: calc(100% + 10px); left: 50%; white-space: nowrap;
  padding: 6px 10px; font-size: 12px; color: #fff; background: ${p.primary}; border-radius: ${Math.max(4, p.radius - 4)}px;
  opacity: 0; transform: translate(-50%, 4px); pointer-events: none;
  ${p.animation ? "transition: opacity .15s ease, transform .15s ease;" : ""}
}
.uf-tip [role="tooltip"]::after {
  content: ""; position: absolute; top: 100%; left: 50%; margin-left: -5px; border: 5px solid transparent; border-top-color: ${p.primary};
}
.uf-tip:hover [role="tooltip"], .uf-tip:focus-visible [role="tooltip"] { opacity: 1; transform: translate(-50%, 0); }`,
    }),
  },
  {
    slug: "animated-navbar",
    name: "Animated Navbar",
    kind: "component",
    category: "navigation",
    description: "A pill navbar with a sliding active indicator.",
    controls: ["primary", "secondary", "bg", "radius", "animation"],
    added: 12,
    featured: true,
    build: (p) => ({
      html: `<nav class="uf-nav">
  <span class="uf-nav-pill"></span>
  <a href="#" class="active">Home</a>
  <a href="#">Components</a>
  <a href="#">Effects</a>
  <a href="#">About</a>
</nav>`,
      css: `.uf-nav { position: relative; display: flex; gap: 4px; padding: 6px; background: #141A2E; border: 1px solid #252C43; border-radius: ${p.radius + 6}px; }
.uf-nav a { position: relative; z-index: 1; padding: 8px 16px; font-size: 14px; color: #94A3B8; text-decoration: none; border-radius: ${p.radius}px; }
.uf-nav a.active { color: #fff; }
.uf-nav-pill {
  position: absolute; top: 6px; bottom: 6px; left: 0; width: 0; border-radius: ${p.radius}px;
  background: linear-gradient(90deg, ${p.primary}, ${p.secondary});
  ${p.animation ? "transition: left .3s cubic-bezier(.4,0,.2,1), width .3s cubic-bezier(.4,0,.2,1);" : ""}
}`,
      js: `const nav = document.querySelector(".uf-nav");
const pill = nav.querySelector(".uf-nav-pill");
const move = (a) => { pill.style.left = a.offsetLeft + "px"; pill.style.width = a.offsetWidth + "px"; };
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", (e) => {
  e.preventDefault();
  nav.querySelector(".active").classList.remove("active");
  a.classList.add("active");
  move(a);
}));
move(nav.querySelector(".active"));`,
    }),
  },
  {
    slug: "accordion",
    name: "Accordion",
    kind: "component",
    category: "accordions",
    description: "A native details-based accordion with a rotating chevron.",
    controls: ["primary", "bg", "radius", "animation"],
    added: 13,
    build: (p) => ({
      html: `<div class="uf-acc">
  <details open><summary>Is UIForge free?</summary><p>Yes, every snippet is free to copy and use.</p></details>
  <details><summary>Does it need a build step?</summary><p>No. HTML, CSS and JS versions work as-is.</p></details>
  <details><summary>Can I customize it?</summary><p>Use the playground controls, then copy the code.</p></details>
</div>`,
      css: `.uf-acc { width: 340px; display: grid; gap: 8px; }
.uf-acc details { background: #141A2E; border: 1px solid #252C43; border-radius: ${p.radius}px; padding: 0 16px; }
.uf-acc details[open] { border-color: ${alpha(p.primary, 0.6)}; }
.uf-acc summary { list-style: none; display: flex; justify-content: space-between; padding: 14px 0; font-size: 14px; font-weight: 600; cursor: pointer; }
.uf-acc summary::-webkit-details-marker { display: none; }
.uf-acc summary::after { content: "+"; color: ${p.primary}; font-size: 18px; line-height: 1; ${p.animation ? "transition: transform .2s ease;" : ""} }
.uf-acc details[open] summary::after { transform: rotate(45deg); }
.uf-acc p { margin: 0 0 14px; font-size: 13px; color: #94A3B8; line-height: 1.5; }`,
    }),
  },
  {
    slug: "tabs",
    name: "Tabs",
    kind: "component",
    category: "tabs",
    description: "Accessible tabs with arrow-key navigation and an underline indicator.",
    controls: ["primary", "bg", "animation"],
    added: 14,
    build: (p) => ({
      html: `<div class="uf-tabs">
  <div role="tablist">
    <button role="tab" aria-selected="true">Preview</button>
    <button role="tab" aria-selected="false">Code</button>
    <button role="tab" aria-selected="false">Docs</button>
  </div>
  <div class="uf-panel" role="tabpanel">Live preview of your component.</div>
  <div class="uf-panel" role="tabpanel" hidden>Copy the source in four formats.</div>
  <div class="uf-panel" role="tabpanel" hidden>Props, usage and setup notes.</div>
</div>`,
      css: `.uf-tabs { width: 340px; }
.uf-tabs [role="tablist"] { display: flex; gap: 4px; border-bottom: 1px solid #252C43; }
.uf-tabs [role="tab"] {
  padding: 10px 14px; font: inherit; font-size: 14px; color: #94A3B8; background: none; border: 0;
  border-bottom: 2px solid transparent; margin-bottom: -1px; cursor: pointer;
  ${p.animation ? "transition: color .2s, border-color .2s;" : ""}
}
.uf-tabs [aria-selected="true"] { color: #fff; border-bottom-color: ${p.primary}; }
.uf-panel { padding: 16px 2px; font-size: 14px; color: #CBD5E1; }`,
      js: `const tabs = [...document.querySelectorAll(".uf-tabs [role=tab]")];
const panels = document.querySelectorAll(".uf-tabs [role=tabpanel]");
const select = (i) => {
  tabs.forEach((t, j) => { t.setAttribute("aria-selected", i === j); t.tabIndex = i === j ? 0 : -1; panels[j].hidden = i !== j; });
  tabs[i].focus();
};
tabs.forEach((t, i) => {
  t.addEventListener("click", () => select(i));
  t.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") select((i + 1) % tabs.length);
    if (e.key === "ArrowLeft") select((i - 1 + tabs.length) % tabs.length);
  });
});`,
    }),
  },
  {
    slug: "modal",
    name: "Modal",
    kind: "component",
    category: "modals",
    description: "A native dialog modal with backdrop blur and scale-in animation.",
    controls: ["primary", "bg", "radius", "padding", "animation"],
    added: 15,
    build: (p) => ({
      html: `<button class="uf-open">Open modal</button>
<dialog class="uf-modal">
  <h3>Delete component?</h3>
  <p>This removes it from your saved list.</p>
  <div class="uf-modal-actions">
    <button class="uf-cancel">Cancel</button>
    <button class="uf-confirm">Delete</button>
  </div>
</dialog>`,
      css: `.uf-open, .uf-confirm { padding: 10px 18px; font: inherit; font-size: 14px; font-weight: 600; color: #fff; background: ${p.primary}; border: 0; border-radius: ${p.radius}px; cursor: pointer; }
.uf-cancel { padding: 10px 18px; font: inherit; font-size: 14px; color: #CBD5E1; background: none; border: 1px solid #252C43; border-radius: ${p.radius}px; cursor: pointer; }
.uf-modal {
  width: 320px; padding: ${p.padding}px; color: #F8FAFC; background: #141A2E;
  border: 1px solid #252C43; border-radius: ${p.radius + 4}px;
}
.uf-modal[open] { ${p.animation ? "animation: uf-pop .2s ease;" : ""} }
.uf-modal::backdrop { background: rgba(8, 11, 22, .6); backdrop-filter: blur(4px); }
.uf-modal h3 { margin: 0 0 6px; font-size: 17px; }
.uf-modal p { margin: 0 0 20px; font-size: 14px; color: #94A3B8; }
.uf-modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
@keyframes uf-pop { from { opacity: 0; transform: scale(.94); } }`,
      js: `const modal = document.querySelector(".uf-modal");
document.querySelector(".uf-open").addEventListener("click", () => modal.showModal());
modal.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => modal.close()));
modal.addEventListener("click", (e) => e.target === modal && modal.close());`,
    }),
  },
  {
    slug: "loader",
    name: "Spinner Loader",
    kind: "component",
    category: "loaders",
    description: "A gradient ring spinner with adjustable speed.",
    controls: ["primary", "secondary", "bg", "size", "speed"],
    defaults: { speed: 1 },
    added: 16,
    build: (p) => {
      const d = { sm: 28, md: 44, lg: 64 }[p.size];
      return {
        html: `<div class="uf-loader" role="status" aria-label="Loading"></div>`,
        css: `.uf-loader {
  width: ${d}px; height: ${d}px; border-radius: 50%;
  background: conic-gradient(from 0deg, transparent, ${p.primary}, ${p.secondary});
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - ${Math.round(d / 8)}px), #000 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - ${Math.round(d / 8)}px), #000 0);
  animation: uf-spin ${p.speed}s linear infinite;
}
@keyframes uf-spin { to { transform: rotate(1turn); } }`,
      };
    },
  },
  {
    slug: "gooey-drop-toast",
    name: "Gooey Drop Toast",
    kind: "component",
    category: "toasts",
    description: "A gooey animated toast that drops in, splashes into place, and melts away.",
    controls: ["primary", "bg", "radius"],
    defaults: { primary: "#8B5CF6", bg: "#0B0F1E", radius: 22 },
    added: 17,
    build: (p) => ({
      html: `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b"/>
    <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/></filter>
</svg>
<div class="goo">
  <div class="blob" id="drop"></div>
  <div class="blob" id="toast"></div>
  <div class="blob bit"></div><div class="blob bit"></div><div class="blob bit"></div>
  <div class="blob bit"></div><div class="blob bit"></div><div class="blob bit"></div>
  <div class="blob drip"></div><div class="blob drip"></div>
</div>
<div id="content">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/></svg>
  <div><b>Saved!</b><span>Your changes are live.</span></div>
</div>
<main>
  <h1>Gooey Drop</h1>
  <p>A drop falls, splats, and melts into a toast.</p>
  <button id="again" disabled>Drop again</button>
</main>`,
      css: `:root {
  --bg: ${p.bg}; --fg: #e9e6ff; --goo: ${p.primary}; --on-goo: #fff; --btn: #e9e6ff; --btn-fg: #14122b;
  --top: calc(env(safe-area-inset-top, 0px) + 40px);
  box-sizing: border-box; padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px);
  color-scheme: dark;
}
html, body { height: 100%; margin: 0; }
body { background: var(--bg); color: var(--fg); font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; overflow: hidden; display: grid; place-items: center; }
.goo { position: fixed; inset: 0; filter: url(#goo); pointer-events: none; }
.blob { position: absolute; left: 50%; top: var(--top); background: var(--goo); border-radius: 50%; opacity: 0; }
#drop { width: 30px; height: 30px; transform: translate(-50%, -300px); }
#toast { width: 30px; height: 30px; transform: translateX(-50%); }
.bit { width: 12px; height: 12px; margin-top: 9px; }
.drip { width: 16px; height: 16px; }
#content {
  position: fixed; left: 50%; top: var(--top); transform: translateX(-50%); height: 64px; display: flex; align-items: center; gap: 12px;
  padding: 0 20px; box-sizing: border-box; color: var(--on-goo); opacity: 0; white-space: nowrap; pointer-events: none;
}
#content svg { flex: none; }
#content b { display: block; font-size: 15px; }
#content span { display: block; font-size: 13px; opacity: .85; }
main { text-align: center; padding: 24px; }
h1 { font-size: 20px; margin: 0 0 6px; }
p { margin: 0 0 20px; opacity: .7; font-size: 14px; }
button { font: inherit; font-weight: 600; border: 0; border-radius: 999px; padding: 12px 24px; background: var(--btn); color: var(--btn-fg); cursor: pointer; }
button:disabled { opacity: .5; cursor: default; }`,
      js: `(function(){
  var drop=document.getElementById('drop'), toast=document.getElementById('toast'),
      content=document.getElementById('content'), btn=document.getElementById('again'),
      bits=[].slice.call(document.querySelectorAll('.bit')),
      drips=[].slice.call(document.querySelectorAll('.drip'));
  var wait=function(ms){return new Promise(function(r){setTimeout(r,ms);});};
  var A=function(el,k,o){o.fill='forwards';return el.animate(k,o).finished;};

  async function run(){
    btn.disabled=true;
    var viewportWidth=document.documentElement.clientWidth||window.innerWidth||320;
    var w=Math.min(300, viewportWidth*0.9);
    [drop,toast,content].concat(bits,drips).forEach(function(n){
      n.getAnimations().forEach(function(a){a.cancel();}); n.style.opacity=0;
    });
    content.style.opacity=0; content.style.width=w+'px';

    drop.style.opacity=1;
    await A(drop,[
      {transform:'translate(-50%,-300px) scale(.8,1.25)'},
      {transform:'translate(-50%,0) scale(.85,1.3)'}
    ],{duration:700,easing:'cubic-bezier(.6,0,1,.7)'});

    drop.style.opacity=0; toast.style.opacity=1;
    var jobs=[];
    bits.forEach(function(b,i){
      var dir=i%2?1:-1, dx=(40+Math.random()*(w/2-30))*dir, up=-(10+Math.random()*28);
      b.style.opacity=1;
      jobs.push(A(b,[
        {transform:'translate(-50%,0) scale(1)'},
        {transform:'translate(calc(-50% + '+dx*0.6+'px),'+up+'px) scale(1.1)',offset:.45},
        {transform:'translate(calc(-50% + '+dx+'px),'+(4+Math.random()*8)+'px) scale(.4)'}
      ],{duration:750,easing:'ease-out'}));
    });
    drips.forEach(function(dr,i){
      var f=i?0.22:-0.28;
      dr.style.opacity=1;
      jobs.push(A(dr,[
        {transform:'translate(calc(-50% + '+f*w+'px),42px) scale(.2)'},
        {transform:'translate(calc(-50% + '+f*w+'px),66px) scale(1)',offset:.55},
        {transform:'translate(calc(-50% + '+f*w+'px),42px) scale(.2)'}
      ],{duration:1100,delay:350+i*140,easing:'ease-in-out'}));
    });
    var grow=A(toast,[
      {width:'30px',height:'30px',borderRadius:'50%',transform:'translateX(-50%)'},
      {width:(w*0.45)+'px',height:'20px',borderRadius:'24px',transform:'translateX(-50%)',offset:.35},
      {width:w+'px',height:'64px',borderRadius:'${p.radius}px',transform:'translateX(-50%)'}
    ],{duration:950,easing:'cubic-bezier(.2,.8,.25,1)'});

    await wait(650);
    A(content,[{opacity:0,transform:'translate(-50%,8px)'},{opacity:1,transform:'translate(-50%,0)'}],{duration:350,easing:'ease-out'});
    await grow; await Promise.all(jobs);
    bits.concat(drips).forEach(function(n){n.style.opacity=0;});

    await wait(5000);
    await A(content,[{opacity:1},{opacity:0}],{duration:200});
    await A(toast,[
      {width:w+'px',height:'64px',borderRadius:'${p.radius}px',transform:'translateX(-50%)'},
      {width:'30px',height:'30px',borderRadius:'50%',transform:'translateX(-50%)'}
    ],{duration:550,easing:'cubic-bezier(.6,0,.4,1)'});
    await A(toast,[
      {transform:'translateX(-50%) translateY(0) scale(.85,1.25)'},
      {transform:'translateX(-50%) translateY(520px) scale(.8,1.4)'}
    ],{duration:700,easing:'cubic-bezier(.6,0,1,.7)'});
    toast.style.opacity=0;
    btn.disabled=false;
  }

  btn.addEventListener('click',run);
  run();
})();`,
    }),
  },
  {
    slug: "worm-underline-tabs",
    name: "Worm Underline Tabs",
    kind: "component",
    category: "tabs",
    description: "Animated tabs with a stretchy gradient underline and sliding content panels.",
    controls: ["primary", "secondary", "bg", "radius"],
    defaults: { primary: "#6D5DFC", secondary: "#E45BD0", bg: "#14131C", radius: 24 },
    added: 18,
    build: (p) => ({
  html: `<div class="uf-worm-card">
  <div class="uf-worm-tabs" role="tablist" aria-label="Media categories" id="uf-worm-tabs">
    <button class="uf-worm-tab" id="uf-worm-tab-0" role="tab" aria-selected="true" aria-controls="uf-worm-panel-0" tabindex="0">All</button>
    <button class="uf-worm-tab" id="uf-worm-tab-1" role="tab" aria-selected="false" aria-controls="uf-worm-panel-1" tabindex="-1">Music</button>
    <button class="uf-worm-tab" id="uf-worm-tab-2" role="tab" aria-selected="false" aria-controls="uf-worm-panel-2" tabindex="-1">Video</button>
    <button class="uf-worm-tab" id="uf-worm-tab-3" role="tab" aria-selected="false" aria-controls="uf-worm-panel-3" tabindex="-1">Live</button>
    <span class="uf-worm-indicator" id="uf-worm-indicator" aria-hidden="true"></span>
  </div>
  <div class="uf-worm-viewport">
    <div class="uf-worm-track" id="uf-worm-track">
  <div class="uf-worm-page uf-worm-p0" id="uf-worm-panel-0" role="tabpanel" aria-labelledby="uf-worm-tab-0"><div class="uf-worm-item"><i></i><i></i></div><div class="uf-worm-item"><i></i><i></i></div></div>
  <div class="uf-worm-page uf-worm-p1" id="uf-worm-panel-1" role="tabpanel" aria-labelledby="uf-worm-tab-1"><div class="uf-worm-item"><i></i><i></i></div><div class="uf-worm-item"><i></i><i></i></div></div>
  <div class="uf-worm-page uf-worm-p2" id="uf-worm-panel-2" role="tabpanel" aria-labelledby="uf-worm-tab-2"><div class="uf-worm-item"><i></i><i></i></div><div class="uf-worm-item"><i></i><i></i></div></div>
  <div class="uf-worm-page uf-worm-p3" id="uf-worm-panel-3" role="tabpanel" aria-labelledby="uf-worm-tab-3"><div class="uf-worm-item"><i></i><i></i></div><div class="uf-worm-item"><i></i><i></i></div></div>
    </div>
  </div>
</div>`,
  css: `:root { --uf-worm-bg: ${p.bg}; --uf-worm-panel: #1c1b27; --uf-worm-line: #2c2b3b; --uf-worm-text: #f2f1fa; --uf-worm-muted: #8f8da8; --uf-worm-a: ${p.primary}; --uf-worm-b: ${p.secondary}; }
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) { --uf-worm-bg: #eceaf6; --uf-worm-panel: #fff; --uf-worm-line: #dedbee; --uf-worm-text: #1b1a2a; --uf-worm-muted: #6c6a85; }
}
.uf-worm-card { width: min(420px, 100%); box-sizing: border-box; padding: 20px 16px 18px; border-radius: ${p.radius}px; background: var(--uf-worm-panel); color: var(--uf-worm-text); box-shadow: 0 20px 50px rgba(0,0,0,.25); font-family: "Segoe UI", system-ui, sans-serif; }
.uf-worm-tabs { position: relative; display: flex; justify-content: space-between; padding: 0 8px; border-bottom: 1px solid var(--uf-worm-line); }
.uf-worm-tab { padding: 12px 10px 16px; border: 0; background: none; color: var(--uf-worm-muted); font: inherit; font-size: 17px; font-weight: 600; cursor: pointer; transition: color .3s; }
.uf-worm-tab[aria-selected="true"] { color: var(--uf-worm-text); font-weight: 700; }
.uf-worm-tab:focus-visible { outline: 2px solid var(--uf-worm-a); outline-offset: 2px; border-radius: 8px; }
.uf-worm-indicator { position: absolute; bottom: -2px; left: 0; width: 0; height: 4px; border-radius: 4px; background: linear-gradient(90deg, var(--uf-worm-a), var(--uf-worm-b)); }
.uf-worm-viewport { overflow: hidden; margin-top: 18px; border-radius: 18px; }
.uf-worm-track { display: flex; width: 400%; transition: transform .55s cubic-bezier(.65,0,.25,1); }
.uf-worm-page { display: grid; flex: none; grid-template-columns: 1fr 1fr; gap: 12px; width: 25%; box-sizing: border-box; padding: 0 1px; }
.uf-worm-item { display: flex; height: 112px; flex-direction: column; justify-content: flex-end; gap: 8px; padding: 16px; border-radius: 16px; box-sizing: border-box; }
.uf-worm-item i { display: block; height: 7px; border-radius: 7px; background: rgba(255,255,255,.75); }
.uf-worm-item i:first-child { width: 62%; }
.uf-worm-item i:last-child { width: 34%; height: 6px; opacity: .7; }
.uf-worm-p0 .uf-worm-item { background: linear-gradient(135deg,#7c8cff,#4a5bd8); }
.uf-worm-p1 .uf-worm-item { background: linear-gradient(135deg,#3ab0ff,#8bd2f7); }
.uf-worm-p2 .uf-worm-item { background: linear-gradient(135deg,#f08ad5,#a66bf0); }
.uf-worm-p3 .uf-worm-item { background: linear-gradient(135deg,#ff8f6b,#f2557a); }
.uf-worm-page .uf-worm-item:nth-child(2) { filter: saturate(.5) brightness(.8); }
@media (prefers-reduced-motion: reduce) { .uf-worm-track { transition: none; } }`,
  js: `(function(){
  var tabs=[].slice.call(document.querySelectorAll('#uf-worm-tabs .uf-worm-tab')),
  worm=document.getElementById('uf-worm-indicator'),
  track=document.getElementById('uf-worm-track'),
  DUR=550, cur=0, timer;
  var mid=function(t){return {l:t.offsetLeft+10,r:t.offsetLeft+t.offsetWidth-10};};

  function place(i){
    var m=mid(tabs[i]);
    worm.style.transition='none';
    worm.style.left=m.l+'px';
    worm.style.width=(m.r-m.l)+'px';
  }

  function go(i){
    if(i===cur)return;
    var from=mid(tabs[cur]),to=mid(tabs[i]);
    clearTimeout(timer);
    var l=Math.min(from.l,to.l),r=Math.max(from.r,to.r);
    var ease='cubic-bezier(.5,0,.2,1)';
    worm.style.transition='left '+DUR*.5+'ms '+ease+', width '+DUR*.5+'ms '+ease;
    worm.style.left=l+'px';
    worm.style.width=(r-l)+'px';
    timer=setTimeout(function(){
  worm.style.left=to.l+'px';
  worm.style.width=(to.r-to.l)+'px';
    },DUR*.5);
    tabs[cur].setAttribute('aria-selected','false');
    tabs[cur].setAttribute('tabindex','-1');
    tabs[i].setAttribute('aria-selected','true');
    tabs[i].setAttribute('tabindex','0');
    track.style.transform='translateX(-'+(i*25)+'%)';
    cur=i;
  }

  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){go(i);});
    t.addEventListener('keydown',function(e){
  var n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:-1;
  if(n>=0&&n<tabs.length){tabs[n].focus();go(n);}
    });
  });
  window.addEventListener('resize',function(){place(cur);});
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){place(cur);});}
  place(cur);
})();`,
    }),
  },
  {
    slug: "hopping-dot-nav",
    name: "Hopping Dot Nav",
    kind: "component",
    category: "navigation",
    description: "An icon navigation bar with a playful hopping indicator and reduced-motion support.",
    controls: ["primary", "bg", "radius", "animation"],
    defaults: { primary: "#4D7BFF", bg: "#121118", radius: 26 },
    added: 19,
    build: (p) => ({
      html: `<nav class="uf-hop-nav" id="uf-hop-nav" aria-label="Main">
  <button type="button" aria-label="Home" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg></button>
  <button type="button" aria-label="Search" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg></button>
  <button type="button" aria-label="Favorites" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.8a4.7 4.7 0 0 1 8.5 2.4c0 6.1-8.5 11.3-8.5 11.3z"/></svg></button>
  <button type="button" aria-label="Profile" aria-current="true"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z"/></svg></button>
  <div class="uf-hop-rail" id="uf-hop-rail" aria-hidden="true"><div class="uf-hop-dot" id="uf-hop-dot"></div></div>
</nav>`,
      css: `.uf-hop-nav {
  --uf-hop-bar: #232233; --uf-hop-edge: #34334a; --uf-hop-icon: #8d8ba6; --uf-hop-on: #f1f0fb; --uf-hop-dot: ${p.primary};
  position: relative; display: flex; justify-content: space-around; width: min(420px, 100%); box-sizing: border-box;
  padding: 20px 8px 34px; border: 1px solid var(--uf-hop-edge); border-radius: ${p.radius}px; background: var(--uf-hop-bar);
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) .uf-hop-nav { --uf-hop-bar: #fff; --uf-hop-edge: #d9d7ea; --uf-hop-icon: #7d7b98; --uf-hop-on: #1c1b2c; --uf-hop-dot: color-mix(in srgb, ${p.primary} 78%, #173bb8); }
}
.uf-hop-nav button {
  padding: 8px 18px; border: 0; background: none; color: var(--uf-hop-icon); cursor: pointer; transition: color .25s, transform .25s;
}
.uf-hop-nav button[aria-current="true"] { color: var(--uf-hop-on); }
.uf-hop-nav button:active { transform: scale(.92); }
.uf-hop-nav button:focus-visible { outline: 2px solid var(--uf-hop-dot); outline-offset: 2px; border-radius: 12px; }
.uf-hop-nav svg { display: block; width: 30px; height: 30px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.uf-hop-rail { position: absolute; bottom: 12px; left: 0; width: 0; height: 0; }
.uf-hop-dot {
  position: absolute; top: -25px; left: -6px; width: 12px; height: 12px; border-radius: 50%; background: var(--uf-hop-dot);
  box-shadow: 0 0 10px 3px color-mix(in srgb, var(--uf-hop-dot) 70%, transparent), 0 0 22px 6px color-mix(in srgb, var(--uf-hop-dot) 35%, transparent);
  transform-origin: 50% 100%;
}`,
      js: `(function(){
  var nav=document.getElementById('uf-hop-nav'), rail=document.getElementById('uf-hop-rail'), dot=document.getElementById('uf-hop-dot'),
      btns=[].slice.call(nav.querySelectorAll('button')), cur=btns.length-1, anim=[];
  var reduce=${p.animation ? "matchMedia('(prefers-reduced-motion: reduce)').matches" : "true"};
  var cx=function(i){return btns[i].offsetLeft+btns[i].offsetWidth/2;};

  function snap(i){
    anim.forEach(function(a){a.cancel();});
    anim=[];
    rail.style.transform='translateX('+cx(i)+'px)';
  }

  function hop(i){
    if(i===cur)return;
    btns[cur].setAttribute('aria-current','false');
    btns[i].setAttribute('aria-current','true');
    var from=cx(cur),to=cx(i),dist=Math.abs(to-from);
    cur=i;
    if(reduce){snap(i);return;}
    anim.forEach(function(a){a.cancel();});
    anim=[];
    var T=300+dist*0.9,h=Math.min(46+dist*0.18,90),S=650,D=T+S,k=T/D,dir=to>from?1:-1,o={duration:D,fill:'forwards'},w=function(n){return k+(1-k)*n;};
    anim.push(rail.animate([{transform:'translateX('+from+'px)'},{transform:'translateX('+to+'px)'}],{duration:T,fill:'forwards',easing:'cubic-bezier(.45,.1,.55,.9)'}));
    anim.push(dot.animate([
      {transform:'translateY(0) scale(1,1)',offset:0,easing:'cubic-bezier(.2,.7,.4,1)'},
      {transform:'translateY('+(-h*.5)+'px) skewX('+(-dir*10)+'deg) scale(.8,1.4)',offset:k*.18,easing:'cubic-bezier(.2,.7,.4,1)'},
      {transform:'translateY('+(-h)+'px) scale(1.05,.95)',offset:k*.5,easing:'cubic-bezier(.6,0,.9,.4)'},
      {transform:'translateY(-3px) skewX('+(dir*8)+'deg) scale(.82,1.4)',offset:k*.86,easing:'ease-in'},
      {transform:'translateY(0) scale(2,.3)',offset:k,easing:'ease-out'},
      {transform:'translateY(0) scale(.75,1.4)',offset:w(.18),easing:'ease-in-out'},
      {transform:'translateY(0) scale(1.3,.72)',offset:w(.38),easing:'ease-in-out'},
      {transform:'translateY(0) scale(.9,1.15)',offset:w(.58),easing:'ease-in-out'},
      {transform:'translateY(0) scale(1.07,.93)',offset:w(.78),easing:'ease-in-out'},
      {transform:'translateY(0) scale(1,1)',offset:1}
    ],o));
  }

  btns.forEach(function(b,i){b.addEventListener('click',function(){hop(i);});});
  nav.addEventListener('keydown',function(e){
    var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0,n=cur+d;
    if(d&&n>=0&&n<btns.length){btns[n].focus();hop(n);}
  });
  addEventListener('resize',function(){snap(cur);});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){snap(cur);});
  snap(cur);
})();`,
    }),
  },
  {
    slug: "spotlight-nav",
    name: "Spotlight Nav",
    kind: "component",
    category: "navigation",
    description: "An icon navigation bar with a glowing spotlight that swings to each selected item.",
    controls: ["primary", "bg", "radius", "animation"],
    defaults: { primary: "#FFEEC0", bg: "#0E0D14", radius: 26 },
    added: 20,
    build: (p) => ({
      html: `<nav class="uf-spot-nav" id="uf-spot-nav" aria-label="Main">
  <button type="button" aria-label="Home" aria-current="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg></button>
  <button type="button" aria-label="Search" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg></button>
  <button type="button" aria-label="Favorites" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.8a4.7 4.7 0 0 1 8.5 2.4c0 6.1-8.5 11.3-8.5 11.3z"/></svg></button>
  <button type="button" aria-label="Profile" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z"/></svg></button>
  <div class="uf-spot-rail" id="uf-spot-rail" aria-hidden="true">
    <div class="uf-spot-lamp"></div>
    <div class="uf-spot-swing" id="uf-spot-swing"><div class="uf-spot-beam"></div></div>
  </div>
</nav>`,
      css: `.uf-spot-nav {
  --uf-spot-bar: #1b1a27; --uf-spot-edge: #2e2d42; --uf-spot-icon: #6f6d89; --uf-spot-on: #fff6dc; --uf-spot-beam: ${p.primary};
  position: relative; z-index: 0; overflow: hidden; display: flex; justify-content: space-around; width: min(420px, 100%); box-sizing: border-box;
  padding: 32px 8px 18px; border: 1px solid var(--uf-spot-edge); border-radius: ${p.radius}px; background: var(--uf-spot-bar);
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) .uf-spot-nav { --uf-spot-bar: color-mix(in srgb, ${p.bg} 35%, #fff); --uf-spot-edge: color-mix(in srgb, ${p.bg} 25%, #fff); --uf-spot-icon: #8d8bad; }
}
.uf-spot-nav button { position: relative; z-index: 2; padding: 8px 18px; border: 0; background: none; color: var(--uf-spot-icon); cursor: pointer; transition: color .35s, filter .35s, transform .35s; }
.uf-spot-nav button.uf-spot-lit { color: #fff; filter: drop-shadow(0 0 6px color-mix(in srgb, ${p.primary} 85%, #96cdff)); transform: scale(1.06); }
.uf-spot-nav button:focus-visible { outline: 2px solid ${p.primary}; outline-offset: 2px; border-radius: 12px; }
.uf-spot-nav svg { display: block; width: 30px; height: 30px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.uf-spot-rail { position: absolute; z-index: 1; top: 0; left: 0; width: 0; height: 0; pointer-events: none; }
.uf-spot-lamp { position: absolute; top: 0; left: -19px; width: 38px; height: 6px; border-radius: 6px; background: color-mix(in srgb, ${p.primary} 35%, #e9f6ff); box-shadow: 0 0 16px 4px color-mix(in srgb, ${p.primary} 75%, transparent); }
.uf-spot-swing { position: absolute; top: 4px; left: 0; width: 0; height: 0; transform-origin: 0 0; filter: blur(5px); }
.uf-spot-beam { position: absolute; top: 0; left: -64px; width: 128px; height: 108px; clip-path: polygon(34% 0,66% 0,100% 100%,0 100%); background: linear-gradient(to bottom, color-mix(in srgb, ${p.primary} 55%, transparent), color-mix(in srgb, ${p.primary} 30%, transparent) 60%, color-mix(in srgb, ${p.primary} 14%, transparent)); -webkit-mask-image: linear-gradient(to bottom,#000 35%,transparent 100%); mask-image: linear-gradient(to bottom,#000 35%,transparent 100%); }
@media (prefers-reduced-motion: reduce) { .uf-spot-nav button { transition: none; } }`,
      js: `(function(){
  var nav=document.getElementById('uf-spot-nav'),rail=document.getElementById('uf-spot-rail'),swing=document.getElementById('uf-spot-swing'),
      btns=[].slice.call(nav.querySelectorAll('button')),cur=0,anim=[],timer;
  var reduce=${p.animation ? "matchMedia('(prefers-reduced-motion: reduce)').matches" : "true"};
  var cx=function(i){return btns[i].offsetLeft+btns[i].offsetWidth/2;};
  function light(i){btns.forEach(function(b,j){b.classList.toggle('uf-spot-lit',j===i);});}
  function snap(i){
    anim.forEach(function(a){a.cancel();});
    anim=[];
    clearTimeout(timer);
    rail.style.transform='translateX('+cx(i)+'px)';
    swing.style.transform='none';
    light(i);
  }

  function go(i){
    if(i===cur)return;
    var from=cx(cur),to=cx(i),dist=Math.abs(to-from),dir=to>from?1:-1;
    cur=i;
    clearTimeout(timer);
    if(reduce){snap(i);return;}
    anim.forEach(function(a){a.cancel();});
    anim=[];
    light(-1);
    var T=380+dist*.8,S=900,D=T+S,k=T/D,a=Math.min(16+dist*.08,30),w=function(n){return k+(1-k)*n;};
    anim.push(rail.animate([{transform:'translateX('+from+'px)'},{transform:'translateX('+to+'px)'}],{duration:T,fill:'forwards',easing:'cubic-bezier(.55,0,.25,1)'}));
    anim.push(swing.animate([
      {transform:'rotate(0deg)',offset:0,easing:'ease-out'},
      {transform:'rotate('+(-dir*a)+'deg)',offset:k*.55,easing:'ease-in-out'},
      {transform:'rotate('+(-dir*a*.6)+'deg)',offset:k,easing:'ease-in-out'},
      {transform:'rotate('+(dir*a*.55)+'deg)',offset:w(.22),easing:'ease-in-out'},
      {transform:'rotate('+(-dir*a*.3)+'deg)',offset:w(.45),easing:'ease-in-out'},
      {transform:'rotate('+(dir*a*.14)+'deg)',offset:w(.68),easing:'ease-in-out'},
      {transform:'rotate('+(-dir*a*.05)+'deg)',offset:w(.85),easing:'ease-in-out'},
      {transform:'rotate(0deg)',offset:1}
    ],{duration:D,fill:'forwards'}));
    timer=setTimeout(function(){light(i);},T*.8);
  }

  btns.forEach(function(b,i){
    b.addEventListener('click',function(){
      btns[cur].setAttribute('aria-current','false');
      btns[i].setAttribute('aria-current','true');
      go(i);
    });
  });
  nav.addEventListener('keydown',function(e){
    var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0,n=cur+d;
    if(d&&n>=0&&n<btns.length){btns[n].focus();btns[cur].setAttribute('aria-current','false');btns[n].setAttribute('aria-current','true');go(n);}
  });
  addEventListener('resize',function(){snap(cur);});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){snap(cur);});
  snap(cur);
})();`,
    }),
  },
  {
    slug: "ripple-fill-nav",
    name: "Ripple Fill Nav",
    kind: "component",
    category: "navigation",
    description: "An icon navigation bar where a vivid gradient ripples into the selected tab.",
    controls: ["primary", "secondary", "bg", "radius"],
    defaults: { primary: "#7C6CFF", secondary: "#38C8FF", bg: "#121119", radius: 28 },
    added: 21,
    build: (p) => ({
      html: `<nav class="uf-ripple-nav" id="uf-ripple-nav" aria-label="Main">
  <button class="uf-ripple-tab" type="button" aria-label="Home" aria-current="true"><i class="uf-ripple-fill uf-ripple-on" aria-hidden="true"></i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg></button>
  <button class="uf-ripple-tab" type="button" aria-label="Search" aria-current="false"><i class="uf-ripple-fill" aria-hidden="true"></i><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg></button>
  <button class="uf-ripple-tab" type="button" aria-label="Favorites" aria-current="false"><i class="uf-ripple-fill" aria-hidden="true"></i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.8a4.7 4.7 0 0 1 8.5 2.4c0 6.1-8.5 11.3-8.5 11.3z"/></svg></button>
  <button class="uf-ripple-tab" type="button" aria-label="Profile" aria-current="false"><i class="uf-ripple-fill" aria-hidden="true"></i><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z"/></svg></button>
</nav>`,
      css: `:root { --uf-ripple-bg: ${p.bg}; --uf-ripple-bar: #1e1d2c; --uf-ripple-edge: #2f2e44; --uf-ripple-icon: #8d8ba8; --uf-ripple-v: ${p.primary}; --uf-ripple-c: ${p.secondary}; }
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) { --uf-ripple-bg: #e9e8f3; --uf-ripple-bar: #fff; --uf-ripple-edge: #d9d7ea; --uf-ripple-icon: #7d7b98; }
}
.uf-ripple-nav { display: flex; gap: 4px; width: min(420px, 100%); box-sizing: border-box; padding: 6px; border: 1px solid var(--uf-ripple-edge); border-radius: ${p.radius}px; background: var(--uf-ripple-bar); }
.uf-ripple-tab { position: relative; display: grid; flex: 1; place-items: center; height: 76px; border: 0; border-radius: 22px; background: none; color: var(--uf-ripple-icon); cursor: pointer; transition: color .3s; -webkit-tap-highlight-color: transparent; }
.uf-ripple-tab[aria-current="true"] { color: #fff; }
.uf-ripple-tab:focus-visible { outline: 2px solid var(--uf-ripple-c); outline-offset: 2px; }
.uf-ripple-tab svg { position: relative; z-index: 1; display: block; width: 30px; height: 30px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; transition: transform .45s cubic-bezier(.3,1.5,.5,1); }
.uf-ripple-tab[aria-current="true"] svg { transform: scale(1.08); }
.uf-ripple-fill { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(135deg,var(--uf-ripple-v),var(--uf-ripple-c)); opacity: 0; clip-path: circle(0% at 50% 50%); box-shadow: 0 6px 18px -4px color-mix(in srgb,var(--uf-ripple-v) 65%,transparent); }
.uf-ripple-fill.uf-ripple-on { opacity: 1; clip-path: circle(80% at 50% 50%); transition: clip-path .6s cubic-bezier(.2,.75,.25,1); }
.uf-ripple-fill.uf-ripple-leave { opacity: 0; clip-path: circle(80% at 50% 50%); transition: opacity .5s ease-out; }
@media (prefers-reduced-motion: reduce) { .uf-ripple-fill.uf-ripple-on,.uf-ripple-fill.uf-ripple-leave,.uf-ripple-tab svg { transition: none; } }`,
      js: `(function(){
  var nav=document.getElementById('uf-ripple-nav'),tabs=[].slice.call(nav.querySelectorAll('.uf-ripple-tab')),cur=0,timers=[];
  function go(i){
    if(i===cur)return;
    var old=tabs[cur].firstElementChild,nw=tabs[i].firstElementChild;
    tabs[cur].setAttribute('aria-current','false');
    tabs[cur].setAttribute('tabindex','-1');
    tabs[i].setAttribute('aria-current','true');
    tabs[i].setAttribute('tabindex','0');
    old.classList.remove('uf-ripple-on');
    old.classList.add('uf-ripple-leave');
    clearTimeout(timers[cur]);
    timers[cur]=setTimeout(function(){old.classList.remove('uf-ripple-leave');},520);
    clearTimeout(timers[i]);
    nw.classList.remove('uf-ripple-on','uf-ripple-leave');
    void nw.offsetWidth;
    nw.classList.add('uf-ripple-on');
    cur=i;
  }
  tabs.forEach(function(t,i){
    t.setAttribute('tabindex',i===cur?'0':'-1');
    t.addEventListener('click',function(){go(i);});
  });
  nav.addEventListener('keydown',function(e){
    var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0,n=cur+d;
    if(d&&n>=0&&n<tabs.length){tabs[n].focus();go(n);}
  });
})();`,
    }),
  },
  {
    slug: "jelly-icon-nav",
    name: "Jelly Icon Nav",
    kind: "component",
    category: "navigation",
    description: "An icon navigation bar with a bouncy jelly landing animation and filled selected icons.",
    controls: ["primary", "bg", "radius", "animation"],
    defaults: { primary: "#6F9BFF", bg: "#12111A", radius: 30 },
    added: 22,
    build: (p) => ({
      html: `<nav class="uf-jelly-nav" id="uf-jelly-nav" aria-label="Main">
  <button class="uf-jelly-tab" type="button" aria-label="Home" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="uf-jelly-fill" d="M4 10.5 12 4l8 6.5V20H4z"/><path class="uf-jelly-highlight" d="M7.2 11.6 10.4 9"/><path d="M10 20v-5h4v5"/></svg><i class="uf-jelly-shadow" aria-hidden="true"></i></button>
  <button class="uf-jelly-tab" type="button" aria-label="Search" aria-current="true"><svg viewBox="0 0 24 24" aria-hidden="true"><circle class="uf-jelly-fill" cx="10" cy="10" r="6.8"/><path class="uf-jelly-highlight" d="M6.6 9.6a3.5 3.5 0 0 1 3-3"/><path d="m15.2 15.2 5.3 5.3" stroke-width="2.5"/></svg><i class="uf-jelly-shadow" aria-hidden="true"></i></button>
  <button class="uf-jelly-tab" type="button" aria-label="Favorites" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="uf-jelly-fill" d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.8a4.7 4.7 0 0 1 8.5 2.4c0 6.1-8.5 11.3-8.5 11.3z"/><path class="uf-jelly-highlight" d="M6.4 9.4a2.3 2.3 0 0 1 2-2.3"/></svg><i class="uf-jelly-shadow" aria-hidden="true"></i></button>
  <button class="uf-jelly-tab" type="button" aria-label="Profile" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle class="uf-jelly-fill" cx="12" cy="7.5" r="3.5"/><path class="uf-jelly-highlight" d="M10.3 7.2a1.9 1.9 0 0 1 1.5-1.5"/><path class="uf-jelly-fill" d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z"/><path class="uf-jelly-highlight" d="M7.3 18c.3-1.4 1.2-2.3 2.5-2.8"/></svg><i class="uf-jelly-shadow" aria-hidden="true"></i></button>
</nav>`,
      css: `:root { --uf-jelly-bar: #1e1d2d; --uf-jelly-edge: #312f47; --uf-jelly-icon: #9896b2; --uf-jelly-fill: ${p.primary}; --uf-jelly-on: #e9efff; --uf-jelly-shadow: 0,0,0; }
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) { --uf-jelly-bar: #fff; --uf-jelly-edge: #d9d7ea; --uf-jelly-icon: #7d7b98; --uf-jelly-fill: color-mix(in srgb, ${p.primary} 76%, #365ee0); --uf-jelly-on: #1d3cc4; --uf-jelly-shadow: 40,40,90; }
}
.uf-jelly-nav { display: flex; justify-content: space-around; width: min(420px, 100%); box-sizing: border-box; padding: 26px 6px 22px; border: 1px solid var(--uf-jelly-edge); border-radius: ${p.radius}px; background: var(--uf-jelly-bar); }
.uf-jelly-tab { position: relative; padding: 6px 20px 16px; border: 0; background: none; color: var(--uf-jelly-icon); cursor: pointer; transition: color .25s; -webkit-tap-highlight-color: transparent; }
.uf-jelly-tab[aria-current="true"] { color: var(--uf-jelly-on); }
.uf-jelly-tab:focus-visible { outline: 2px solid var(--uf-jelly-fill); outline-offset: 2px; border-radius: 14px; }
.uf-jelly-tab svg { position: relative; z-index: 1; display: block; width: 32px; height: 32px; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; transform-origin: 50% 100%; }
.uf-jelly-fill { fill: var(--uf-jelly-fill); fill-opacity: 0; transition: ${p.animation ? "fill-opacity .25s" : "none"}; }
.uf-jelly-tab[aria-current="true"] .uf-jelly-fill { fill-opacity: 1; transition: ${p.animation ? "fill-opacity .4s .28s" : "none"}; }
.uf-jelly-shadow { position: absolute; left: calc(50% - 13px); bottom: 2px; width: 26px; height: 6px; border-radius: 50%; background: rgba(var(--uf-jelly-shadow),.5); filter: blur(2px); }
.uf-jelly-highlight { stroke: #fff; stroke-opacity: 0; stroke-width: 1.4; transition: ${p.animation ? "stroke-opacity .2s" : "none"}; }
.uf-jelly-tab[aria-current="true"] .uf-jelly-highlight { stroke-opacity: .75; transition: ${p.animation ? "stroke-opacity .4s .3s" : "none"}; }
@media (prefers-reduced-motion: reduce) { .uf-jelly-fill,.uf-jelly-tab[aria-current="true"] .uf-jelly-fill,.uf-jelly-highlight,.uf-jelly-tab[aria-current="true"] .uf-jelly-highlight { transition: none; } }`,
      js: `(function(){
  var nav=document.getElementById('uf-jelly-nav'),tabs=[].slice.call(nav.querySelectorAll('.uf-jelly-tab')),cur=1;
  var reduce=${p.animation ? "matchMedia('(prefers-reduced-motion: reduce)').matches" : "true"};
  tabs.forEach(function(t,i){
    t.setAttribute('aria-current',i===cur?'true':'false');
    t.setAttribute('tabindex',i===cur?'0':'-1');
  });
  var BODY=[
    {transform:'translateY(0) scale(1,1)',offset:0,easing:'ease-out'},
    {transform:'translateY(0) scale(1.32,.66)',offset:.12,easing:'cubic-bezier(.2,.7,.4,1)'},
    {transform:'translateY(-26px) scale(.8,1.32)',offset:.36,easing:'ease-out'},
    {transform:'translateY(-31px) scale(.95,1.06)',offset:.5,easing:'ease-in'},
    {transform:'translateY(0) scale(1.42,.58)',offset:.66,easing:'ease-out'},
    {transform:'translateY(0) scale(.8,1.28)',offset:.77,easing:'ease-in-out'},
    {transform:'translateY(0) scale(1.14,.88)',offset:.86,easing:'ease-in-out'},
    {transform:'translateY(0) scale(.95,1.06)',offset:.94,easing:'ease-in-out'},
    {transform:'translateY(0) scale(1,1)',offset:1}
  ];
  var SHADOW=[
    {transform:'scale(1)',opacity:1,offset:0},
    {transform:'scale(1.15,1)',opacity:1,offset:.12},
    {transform:'scale(.5)',opacity:.4,offset:.36},
    {transform:'scale(.42)',opacity:.3,offset:.5},
    {transform:'scale(1.35,1.1)',opacity:1,offset:.66},
    {transform:'scale(.9)',opacity:1,offset:.77},
    {transform:'scale(1.08)',opacity:1,offset:.86},
    {transform:'scale(1)',opacity:1,offset:1}
  ];
  function go(i){
    if(i===cur)return;
    tabs[cur].setAttribute('aria-current','false');
    tabs[cur].setAttribute('tabindex','-1');
    tabs[i].setAttribute('aria-current','true');
    tabs[i].setAttribute('tabindex','0');
    cur=i;
    if(reduce)return;
    var svg=tabs[i].querySelector('svg'),sh=tabs[i].querySelector('.uf-jelly-shadow');
    svg.getAnimations().concat(sh.getAnimations()).forEach(function(a){a.cancel();});
    svg.animate(BODY,{duration:950});
    sh.animate(SHADOW,{duration:950});
  }
  tabs.forEach(function(t,i){t.addEventListener('click',function(){go(i);});});
  nav.addEventListener('keydown',function(e){
    var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0,n=cur+d;
    if(d&&n>=0&&n<tabs.length){tabs[n].focus();go(n);}
  });
})();`,
    }),
  },
  {
    slug: "badge-pop-nav",
    name: "Badge Pop Nav",
    kind: "component",
    category: "navigation",
    description: "An icon navigation bar with notification badges that pop into colorful particles.",
    controls: ["primary", "secondary", "bg", "radius", "animation"],
    defaults: { primary: "#4D8DFF", secondary: "#8A7CFF", bg: "#12111A", radius: 30 },
    added: 23,
    build: (p) => ({
      html: `<nav class="uf-badge-nav" id="uf-badge-nav" aria-label="Main">
  <button class="uf-badge-tab" type="button" aria-label="Home"><span class="uf-badge-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg><b class="uf-badge-count" data-n="3">3</b></span></button>
  <button class="uf-badge-tab" type="button" aria-label="Search"><span class="uf-badge-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15.2 15.2 5.3 5.3"/></svg><b class="uf-badge-count" data-n="1">1</b></span></button>
  <button class="uf-badge-tab" type="button" aria-label="Favorites"><span class="uf-badge-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.8a4.7 4.7 0 0 1 8.5 2.4c0 6.1-8.5 11.3-8.5 11.3z"/></svg><b class="uf-badge-count" data-n="5">5</b></span></button>
  <button class="uf-badge-tab" type="button" aria-label="Profile"><span class="uf-badge-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z"/></svg><b class="uf-badge-count uf-badge-gone" data-n="2">2</b></span></button>
</nav>`,
      css: `:root { --uf-badge-bar: #1d1c2b; --uf-badge-edge: #302f45; --uf-badge-icon: #8d8ba8; --uf-badge-on: #fff; --uf-badge-ind1: ${p.primary}; --uf-badge-ind2: ${p.secondary}; --uf-badge-bg: ${p.bg}; }
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) { --uf-badge-bar: #fff; --uf-badge-edge: #d9d7ea; --uf-badge-icon: #7d7b98; --uf-badge-on: #16152a; }
}
.uf-badge-nav { display: flex; width: min(420px, 100%); box-sizing: border-box; padding: 24px 6px 26px; border: 1px solid var(--uf-badge-edge); border-radius: ${p.radius}px; background: color-mix(in srgb, var(--uf-badge-bg) 25%, var(--uf-badge-bar)); }
.uf-badge-tab { position: relative; display: grid; flex: 1; place-items: center; padding: 6px 0 14px; border: 0; background: none; color: var(--uf-badge-icon); cursor: pointer; transition: color .3s; -webkit-tap-highlight-color: transparent; }
.uf-badge-tab[aria-current="true"] { color: var(--uf-badge-on); }
.uf-badge-tab:focus-visible { outline: 2px solid var(--uf-badge-ind1); outline-offset: 2px; border-radius: 14px; }
.uf-badge-tab::after { position: absolute; bottom: -8px; left: calc(50% - 11px); width: 22px; height: 4px; border-radius: 4px; background: linear-gradient(90deg,var(--uf-badge-ind1),var(--uf-badge-ind2)); content: ""; transform: scaleX(0); transition: transform .35s cubic-bezier(.3,1.4,.5,1); }
.uf-badge-tab[aria-current="true"]::after { transform: scaleX(1); }
.uf-badge-icon { position: relative; display: block; width: 32px; height: 32px; }
.uf-badge-icon svg { display: block; width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.uf-badge-count { position: absolute; top: -9px; right: -10px; min-width: 20px; height: 20px; box-sizing: border-box; padding: 0 5px; border-radius: 10px; background: linear-gradient(135deg,#ff7ab0,#ff3d7f); color: #fff; font: 700 12px/20px system-ui,sans-serif; text-align: center; box-shadow: 0 0 0 2px var(--uf-badge-bar),0 3px 8px rgba(255,61,127,.45); }
.uf-badge-count.uf-badge-gone { transform: scale(0); transition: ${p.animation ? "transform .22s ease-out" : "none"}; }
.uf-badge-bit { position: absolute; z-index: 2; top: -1px; right: -1px; width: 7px; height: 7px; border-radius: 50%; pointer-events: none; }
@media (prefers-reduced-motion: reduce) { .uf-badge-tab,.uf-badge-tab::after,.uf-badge-count.uf-badge-gone { transition: none; } }`,
      js: `(function(){
  var nav=document.getElementById('uf-badge-nav'),tabs=[].slice.call(nav.querySelectorAll('.uf-badge-tab')),cur=3,timers=[];
  var reduce=${p.animation ? "matchMedia('(prefers-reduced-motion: reduce)').matches" : "true"};
  var COLORS=['#ff7ab0','#ff3d7f','#ffb3d1','#ffd36e','#7ad8ff','#c3a6ff'];
  tabs.forEach(function(t,i){
    t.setAttribute('aria-current',i===cur?'true':'false');
    t.setAttribute('tabindex',i===cur?'0':'-1');
  });
  function pop(tab){
    var badge=tab.querySelector('.uf-badge-count');
    if(!badge||badge.classList.contains('uf-badge-gone'))return;
    badge.classList.add('uf-badge-gone');
    if(reduce)return;
    badge.getAnimations().forEach(function(a){a.cancel();});
    badge.animate([{transform:'scale(1)'},{transform:'scale(1.35)',offset:.35},{transform:'scale(0)'}],{duration:220,easing:'ease-out'});
    var icon=tab.querySelector('.uf-badge-icon'),count=9;
    for(var k=0;k<count;k++){
      var bit=document.createElement('i');
      bit.className='uf-badge-bit';
      bit.style.background=COLORS[k%COLORS.length];
      icon.appendChild(bit);
      var angle=(k/count)*Math.PI*2+Math.random()*.5,radius=20+Math.random()*16,size=.6+Math.random()*.7;
      var burst=bit.animate([
        {transform:'translate(0,0) scale(.4)',opacity:1},
        {transform:'translate('+Math.cos(angle)*radius*.7+'px,'+Math.sin(angle)*radius*.7+'px) scale('+size*1.2+')',opacity:1,offset:.35},
        {transform:'translate('+Math.cos(angle)*radius+'px,'+(Math.sin(angle)*radius+8)+'px) scale(0)',opacity:0}
      ],{duration:560,delay:60,easing:'cubic-bezier(.2,.7,.4,1)',fill:'both'});
      burst.onfinish=function(){bit.remove();};
    }
  }
  function unpop(tab){
    var badge=tab.querySelector('.uf-badge-count');
    if(!badge||!badge.classList.contains('uf-badge-gone'))return;
    badge.classList.remove('uf-badge-gone');
    if(reduce)return;
    badge.getAnimations().forEach(function(a){a.cancel();});
    badge.animate([
      {transform:'scale(0)',offset:0},{transform:'scale(1.4)',offset:.45},{transform:'scale(.85)',offset:.7},
      {transform:'scale(1.08)',offset:.88},{transform:'scale(1)',offset:1}
    ],{duration:520,delay:140,easing:'ease-out',fill:'backwards'});
  }
  function go(i){
    if(i===cur)return;
    tabs[cur].setAttribute('aria-current','false');
    tabs[i].setAttribute('aria-current','true');
    unpop(tabs[cur]);
    pop(tabs[i]);
    cur=i;
  }
  tabs.forEach(function(tab,i){tab.addEventListener('click',function(){go(i);});});
  nav.addEventListener('keydown',function(e){
    var direction=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0,next=cur+direction;
    if(direction&&next>=0&&next<tabs.length){tabs[next].focus();go(next);}
  });
})();`,
    }),
  },
  {
    slug: "walking-toggle",
    name: "Walking Toggle",
    kind: "component",
    category: "toggles",
    description: "A playful toggle switch with a tiny walking character, dust puffs, and landing animation.",
    controls: ["primary", "bg", "radius", "animation"],
    defaults: { primary: "#3FAE6A", bg: "#F3EFE6", radius: 20 },
    added: 24,
    build: (p) => ({
      html: `<main class="uf-walk-card">
  <label class="uf-walk-row">
    <span><span class="uf-walk-title">Wi-Fi</span><span class="uf-walk-state" data-state>Off</span></span>
    <span class="uf-walk-switch" data-color="green">
      <input class="uf-walk-input" type="checkbox" role="switch" aria-label="Wi-Fi">
      <span class="uf-walk-ground"></span><span class="uf-walk-track"></span>
      <span class="uf-walk-character"><span class="uf-walk-legs"><i class="uf-walk-leg uf-walk-leg-a"></i><i class="uf-walk-leg uf-walk-leg-b"></i></span>
        <span class="uf-walk-head"><span class="uf-walk-eyes"><i class="uf-walk-eye uf-walk-eye-l"></i><i class="uf-walk-eye uf-walk-eye-r"></i></span><span class="uf-walk-mouth"></span></span>
      </span>
    </span>
  </label>
  <label class="uf-walk-row">
    <span><span class="uf-walk-title">Notifications</span><span class="uf-walk-state" data-state>Off</span></span>
    <span class="uf-walk-switch" data-color="pink">
      <input class="uf-walk-input" type="checkbox" role="switch" aria-label="Notifications">
      <span class="uf-walk-ground"></span><span class="uf-walk-track"></span>
      <span class="uf-walk-character"><span class="uf-walk-legs"><i class="uf-walk-leg uf-walk-leg-a"></i><i class="uf-walk-leg uf-walk-leg-b"></i></span>
        <span class="uf-walk-head"><span class="uf-walk-eyes"><i class="uf-walk-eye uf-walk-eye-l"></i><i class="uf-walk-eye uf-walk-eye-r"></i></span><span class="uf-walk-mouth"></span></span>
      </span>
    </span>
  </label>
  <label class="uf-walk-row">
    <span><span class="uf-walk-title">Auto-save</span><span class="uf-walk-state" data-state>On</span></span>
    <span class="uf-walk-switch" data-color="blue">
      <input class="uf-walk-input" type="checkbox" role="switch" aria-label="Auto-save" checked>
      <span class="uf-walk-ground"></span><span class="uf-walk-track"></span>
      <span class="uf-walk-character"><span class="uf-walk-legs"><i class="uf-walk-leg uf-walk-leg-a"></i><i class="uf-walk-leg uf-walk-leg-b"></i></span>
        <span class="uf-walk-head"><span class="uf-walk-eyes"><i class="uf-walk-eye uf-walk-eye-l"></i><i class="uf-walk-eye uf-walk-eye-r"></i></span><span class="uf-walk-mouth"></span></span>
      </span>
    </span>
  </label>
</main>`,
      css: `:root { --uf-walk-bg: ${p.bg}; --uf-walk-card: #fffdf8; --uf-walk-ink: #2b2a33; --uf-walk-muted: #7b7889; --uf-walk-track-off: #d9d4c7; --uf-walk-ground: #cfc9b8; --uf-walk-face: #fffdf8; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { --uf-walk-card: #211f2a; --uf-walk-ink: #f1eee8; --uf-walk-muted: #9a97aa; --uf-walk-track-off: #3a3747; --uf-walk-ground: #3a3747; --uf-walk-face: #211f2a; }
}
:root[data-theme="dark"] { --uf-walk-card: #211f2a; --uf-walk-ink: #f1eee8; --uf-walk-muted: #9a97aa; --uf-walk-track-off: #3a3747; --uf-walk-ground: #3a3747; --uf-walk-face: #211f2a; }
.uf-walk-card { width: min(420px, 100%); padding: 8px 24px; border-radius: ${p.radius}px; background: var(--uf-walk-card); color: var(--uf-walk-ink); box-shadow: 0 1px 0 rgba(0,0,0,.04),0 12px 40px rgba(0,0,0,.08); font-family: "Trebuchet MS","Segoe UI",system-ui,sans-serif; }
.uf-walk-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 0; cursor: pointer; }
.uf-walk-row+.uf-walk-row { border-top: 1px solid var(--uf-walk-track-off); }
.uf-walk-title,.uf-walk-state { display: block; }
.uf-walk-title { font-size: 1.05rem; font-weight: 700; }
.uf-walk-state { margin-top: 2px; color: var(--uf-walk-muted); font-size: .85rem; }
.uf-walk-switch { --uf-walk-on: ${p.primary}; --uf-walk-w: 88px; --uf-walk-h: 44px; --uf-walk-head-size: 32px; --uf-walk-pad: 6px; --uf-walk-travel: calc(var(--uf-walk-w) - var(--uf-walk-head-size) - var(--uf-walk-pad)*2); --uf-walk-dir: -1; --uf-walk-look: -2px; position: relative; display: block; flex: none; width: var(--uf-walk-w); height: 66px; }
.uf-walk-switch[data-color="pink"] { --uf-walk-on: #e0568a; }
.uf-walk-switch[data-color="blue"] { --uf-walk-on: #4a7be0; }
.uf-walk-switch[data-color="orange"] { --uf-walk-on: #e8892f; }
.uf-walk-input { position: absolute; z-index: 5; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.uf-walk-ground { position: absolute; right: 4px; bottom: 2px; left: 4px; height: 3px; border-radius: 3px; background: var(--uf-walk-ground); }
.uf-walk-track { position: absolute; top: 0; left: 0; width: var(--uf-walk-w); height: var(--uf-walk-h); overflow: hidden; border-radius: 999px; background: var(--uf-walk-track-off); transition: background-color .45s ease; }
.uf-walk-track::before { position: absolute; inset: 0; border-radius: inherit; background: var(--uf-walk-on); content: ""; transform: scaleX(0); transform-origin: left; transition: transform .7s cubic-bezier(.5,0,.2,1); }
.uf-walk-input:checked~.uf-walk-track::before { transform: scaleX(1); }
.uf-walk-input:focus-visible~.uf-walk-track { outline: 3px solid var(--uf-walk-ink); outline-offset: 4px; }
.uf-walk-character { position: absolute; z-index: 2; top: var(--uf-walk-pad); left: var(--uf-walk-pad); width: var(--uf-walk-head-size); height: 60px; pointer-events: none; transition: transform .7s cubic-bezier(.5,0,.2,1); }
.uf-walk-input:checked~.uf-walk-character { --uf-walk-dir: 1; --uf-walk-look: 2px; transform: translateX(var(--uf-walk-travel)); }
.uf-walk-input:checked~.uf-walk-character .uf-walk-legs { --uf-walk-dir: 1; }
.uf-walk-legs { position: absolute; inset: 0; transform: scaleX(var(--uf-walk-dir,-1)); }
.uf-walk-leg { position: absolute; top: 24px; width: 3px; height: 30px; border-radius: 3px; background: var(--uf-walk-ink); transform-origin: 50% 0; transition: transform .2s ease; }
.uf-walk-leg::after { position: absolute; bottom: 0; left: 0; width: 8px; height: 3px; border-radius: 3px; background: var(--uf-walk-ink); content: ""; }
.uf-walk-leg-a { left: 9px; }
.uf-walk-leg-b { left: 20px; }
.uf-walk-head { position: absolute; top: 0; left: 0; width: var(--uf-walk-head-size); height: var(--uf-walk-head-size); border-radius: 50%; background: var(--uf-walk-face); color: var(--uf-walk-ink); box-shadow: inset 0 0 0 2px var(--uf-walk-ink); transition: transform .15s ease; }
.uf-walk-input:active~.uf-walk-character .uf-walk-head { transform: scale(1.12,.9); }
.uf-walk-eyes { position: absolute; top: 11px; left: 0; width: 100%; height: 8px; transform: translateX(var(--uf-walk-look,-2px)); transition: transform .5s ease; }
.uf-walk-eye { position: absolute; top: 0; width: 6px; height: 8px; border-radius: 50%; background: var(--uf-walk-ink); transform: scaleY(.18); transition: transform .3s ease; }
.uf-walk-eye-l { left: 7px; }
.uf-walk-eye-r { left: 19px; }
.uf-walk-input:checked~.uf-walk-character .uf-walk-eye { transform: scaleY(1); }
.uf-walk-mouth { position: absolute; top: 21px; left: 50%; width: 10px; height: 2px; margin-left: -5px; border-radius: 2px; background: var(--uf-walk-ink); transform: translateX(var(--uf-walk-look,-2px)); transition: height .3s ease,border-radius .3s ease,transform .5s ease; }
.uf-walk-input:checked~.uf-walk-character .uf-walk-mouth { height: 6px; border-radius: 0 0 10px 10px; }
.uf-walk-switch.uf-walk-is-walking .uf-walk-head { animation: uf-walk-hop .35s ease-in-out infinite; }
.uf-walk-switch.uf-walk-is-walking .uf-walk-leg-a { animation: uf-walk-step .35s ease-in-out infinite alternate; }
.uf-walk-switch.uf-walk-is-walking .uf-walk-leg-b { animation: uf-walk-step .35s ease-in-out infinite alternate-reverse; }
.uf-walk-switch.uf-walk-is-landing .uf-walk-head { animation: uf-walk-land .35s ease-out; }
@keyframes uf-walk-step { from { transform: rotate(-32deg); } to { transform: rotate(32deg); } }
@keyframes uf-walk-hop { 0%,100% { translate: 0 0; } 50% { translate: 0 -3px; } }
@keyframes uf-walk-land { 0% { transform: scale(1.18,.82); } 55% { transform: scale(.92,1.08); } 100% { transform: scale(1); } }
.uf-walk-puff { position: absolute; z-index: 1; bottom: 3px; width: 8px; height: 8px; border-radius: 50%; background: var(--uf-walk-ground); opacity: 0; pointer-events: none; animation: uf-walk-puff .6s ease-out forwards; }
@keyframes uf-walk-puff { 0% { opacity: .9; transform: translate(0,0) scale(.4); } 100% { opacity: 0; transform: translate(var(--uf-walk-dx),-14px) scale(1.4); } }
@media (prefers-reduced-motion: reduce) { .uf-walk-character,.uf-walk-track::before,.uf-walk-eye,.uf-walk-mouth,.uf-walk-eyes { transition-duration: .01s; } .uf-walk-switch.uf-walk-is-walking .uf-walk-head,.uf-walk-switch.uf-walk-is-walking .uf-walk-leg,.uf-walk-switch.uf-walk-is-landing .uf-walk-head,.uf-walk-puff { animation: none; } }
${p.animation ? "" : ".uf-walk-character,.uf-walk-track,.uf-walk-track::before,.uf-walk-leg,.uf-walk-head,.uf-walk-eyes,.uf-walk-eye,.uf-walk-mouth { transition: none !important; } .uf-walk-switch.uf-walk-is-walking .uf-walk-head,.uf-walk-switch.uf-walk-is-walking .uf-walk-leg,.uf-walk-switch.uf-walk-is-landing .uf-walk-head,.uf-walk-puff { animation: none !important; }"}`,
      js: `(function(){
  var reduce=${p.animation ? "window.matchMedia('(prefers-reduced-motion: reduce)').matches" : "true"};
  document.querySelectorAll('.uf-walk-switch').forEach(function(sw){
    var input=sw.querySelector('.uf-walk-input');
    var state=sw.closest('.uf-walk-row').querySelector('[data-state]');
    var timer;
    function spawnDust(goingOn){
      var startX=goingOn?14:66,away=goingOn?-1:1;
      for(var i=0;i<3;i++){
        var puff=document.createElement('i');
        puff.className='uf-walk-puff';
        puff.style.left=startX+i*5+'px';
        puff.style.setProperty('--uf-walk-dx',away*(6+i*7)+'px');
        puff.style.animationDelay=i*70+'ms';
        sw.appendChild(puff);
        setTimeout(function(el){el.remove();},900,puff);
      }
    }
    input.addEventListener('change',function(){
      state.textContent=input.checked?'On':'Off';
      if(reduce)return;
      clearTimeout(timer);
      sw.classList.remove('uf-walk-is-landing');
      sw.classList.add('uf-walk-is-walking');
      spawnDust(input.checked);
      timer=setTimeout(function(){
        sw.classList.remove('uf-walk-is-walking');
        sw.classList.add('uf-walk-is-landing');
        setTimeout(function(){sw.classList.remove('uf-walk-is-landing');},360);
      },700);
    });
  });
})();`,
    }),
  },
  ...modernButtonItems,
  frutigerAeroButtonItem,
  geoOrbitButtonItem,
];
