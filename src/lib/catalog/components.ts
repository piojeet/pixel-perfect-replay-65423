import { alpha, SIZES, type Item, type ControlKey } from "./types";

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
];
