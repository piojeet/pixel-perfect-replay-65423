import { alpha, type Item } from "./types";

const card = (r: number) => `width: 200px; height: 130px; border-radius: ${r}px; background: #141A2E; border: 1px solid #252C43; display: grid; place-items: center; color: #CBD5E1; font-size: 14px;`;

export const effectItems: Item[] = [
  {
    slug: "hover-card-lift", name: "Hover Card Lift", kind: "effect", category: "hover",
    description: "Cards rise and glow when hovered.",
    controls: ["primary", "bg", "radius", "speed", "intensity"], defaults: { speed: 3, intensity: 50 }, added: 1, featured: true,
    build: (p) => ({
      html: `<div class="uf-lift">Hover me</div>`,
      css: `.uf-lift { ${card(p.radius)} transition: transform ${p.speed / 10}s ease, box-shadow ${p.speed / 10}s ease, border-color ${p.speed / 10}s; }
.uf-lift:hover { transform: translateY(-${Math.round(p.intensity / 6)}px); border-color: ${p.primary}; box-shadow: 0 ${Math.round(p.intensity / 3)}px 40px -12px ${alpha(p.primary, 0.6)}; }`,
    }),
  },
  {
    slug: "magnetic-button", name: "Magnetic Button", kind: "effect", category: "button",
    description: "A button that is pulled toward the cursor.",
    controls: ["primary", "secondary", "bg", "radius", "intensity"], defaults: { intensity: 40 }, added: 2, featured: true,
    build: (p) => ({
      html: `<div class="uf-mag-zone"><button class="uf-mag">Hover Me</button></div>`,
      css: `.uf-mag-zone { padding: 60px; }
.uf-mag { padding: 14px 28px; font: inherit; font-weight: 600; color: #fff; border: 0; border-radius: ${p.radius}px; cursor: pointer;
  background: linear-gradient(90deg, ${p.primary}, ${p.secondary}); transition: transform .2s ease-out; }`,
      js: `const zone = document.querySelector(".uf-mag-zone");
const btn = zone.querySelector(".uf-mag");
const STRENGTH = ${(p.intensity / 100).toFixed(2)};
zone.addEventListener("mousemove", (e) => {
  const r = btn.getBoundingClientRect();
  const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
  btn.style.transform = "translate(" + x * STRENGTH + "px," + y * STRENGTH + "px)";
});
zone.addEventListener("mouseleave", () => (btn.style.transform = ""));`,
    }),
  },
  {
    slug: "mouse-follow-glow", name: "Mouse Follow Glow", kind: "effect", category: "mouse",
    description: "A soft glow that follows the cursor across a surface.",
    controls: ["primary", "bg", "radius", "intensity"], added: 3,
    build: (p) => ({
      html: `<div class="uf-glow-card"><span>Move your mouse</span></div>`,
      css: `.uf-glow-card { position: relative; width: 300px; height: 180px; border-radius: ${p.radius}px; background: #141A2E; border: 1px solid #252C43; overflow: hidden; display: grid; place-items: center; color: #CBD5E1; }
.uf-glow-card::before { content: ""; position: absolute; inset: 0; opacity: 0; transition: opacity .3s;
  background: radial-gradient(${120 + p.intensity * 2}px circle at var(--x, 50%) var(--y, 50%), ${alpha(p.primary, 0.45)}, transparent 70%); }
.uf-glow-card:hover::before { opacity: 1; }
.uf-glow-card span { position: relative; }`,
      js: `const glow = document.querySelector(".uf-glow-card");
glow.addEventListener("mousemove", (e) => {
  const r = glow.getBoundingClientRect();
  glow.style.setProperty("--x", e.clientX - r.left + "px");
  glow.style.setProperty("--y", e.clientY - r.top + "px");
});`,
    }),
  },
  {
    slug: "text-reveal", name: "Text Reveal", kind: "effect", category: "text",
    description: "Letters slide up one by one with a gradient finish.",
    controls: ["primary", "secondary", "bg", "speed", "animation"], defaults: { speed: 6 }, added: 4,
    build: (p) => ({
      html: `<h1 class="uf-reveal" aria-label="UIForge"><span>U</span><span>I</span><span>F</span><span>o</span><span>r</span><span>g</span><span>e</span></h1>`,
      css: `.uf-reveal { margin: 0; font-size: 64px; font-weight: 800; display: flex; overflow: hidden; }
.uf-reveal span { display: inline-block; background: linear-gradient(90deg, ${p.primary}, ${p.secondary}); -webkit-background-clip: text; background-clip: text; color: transparent;
  ${p.animation ? `transform: translateY(110%); animation: uf-up ${p.speed / 10}s cubic-bezier(.2,.8,.2,1) forwards;` : ""} }
${[1, 2, 3, 4, 5, 6, 7].map((i) => `.uf-reveal span:nth-child(${i}) { animation-delay: ${((i - 1) * 0.07).toFixed(2)}s; }`).join("\n")}
@keyframes uf-up { to { transform: none; } }`,
    }),
  },
  {
    slug: "tilt-effect", name: "Tilt Effect", kind: "effect", category: "card",
    description: "A card that tilts to follow the cursor.",
    controls: ["primary", "secondary", "bg", "radius", "intensity"], defaults: { intensity: 30 }, added: 5,
    build: (p) => ({
      html: `<div class="uf-tilt-wrap"><div class="uf-tilt">Tilt me</div></div>`,
      css: `.uf-tilt-wrap { perspective: 800px; }
.uf-tilt { width: 220px; height: 140px; border-radius: ${p.radius}px; display: grid; place-items: center; color: #fff; font-weight: 600;
  background: linear-gradient(135deg, ${alpha(p.primary, 0.7)}, ${alpha(p.secondary, 0.5)}); border: 1px solid rgba(255,255,255,.2);
  transition: transform .15s ease-out; }`,
      js: `const tilt = document.querySelector(".uf-tilt");
const MAX = ${Math.round(p.intensity / 2)};
document.addEventListener("mousemove", (e) => {
  const r = tilt.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  tilt.style.transform = "rotateX(" + -y * MAX + "deg) rotateY(" + x * MAX + "deg)";
});
document.addEventListener("mouseleave", () => (tilt.style.transform = ""));`,
    }),
  },
  {
    slug: "scroll-fade-in", name: "Scroll Fade In", kind: "effect", category: "scroll",
    description: "Elements fade and rise into view as you scroll.",
    controls: ["primary", "bg", "radius", "speed"], defaults: { speed: 6 }, added: 6,
    build: (p) => ({
      html: `<div class="uf-scroller">
  <p class="uf-hint">Scroll inside ↓</p>
  <div class="uf-fade"></div><div class="uf-fade"></div><div class="uf-fade"></div><div class="uf-fade"></div><div class="uf-fade"></div>
</div>`,
      css: `.uf-scroller { width: 280px; height: 260px; overflow-y: auto; padding: 16px; border: 1px solid #252C43; border-radius: ${p.radius}px; background: #101426; }
.uf-hint { margin: 0 0 140px; font-size: 13px; color: #94A3B8; text-align: center; }
.uf-fade { height: 60px; margin-bottom: 14px; border-radius: ${p.radius}px; background: linear-gradient(90deg, ${alpha(p.primary, 0.6)}, ${alpha(p.primary, 0.2)});
  opacity: 0; transform: translateY(24px); transition: opacity ${p.speed / 10}s ease, transform ${p.speed / 10}s ease; }
.uf-fade.in { opacity: 1; transform: none; }`,
      js: `const root = document.querySelector(".uf-scroller");
const io = new IntersectionObserver((entries) => entries.forEach((en) => en.target.classList.toggle("in", en.isIntersecting)), { root, threshold: .3 });
root.querySelectorAll(".uf-fade").forEach((el) => io.observe(el));`,
    }),
  },
  {
    slug: "cursor-trail", name: "Cursor Trail", kind: "effect", category: "cursor",
    description: "A trail of fading dots following the pointer.",
    controls: ["primary", "secondary", "bg", "intensity"], defaults: { intensity: 20 }, added: 7,
    build: (p) => ({
      html: `<p class="uf-trail-hint">Move your cursor around</p>`,
      css: `.uf-trail-hint { color: #94A3B8; font-size: 14px; }
.uf-dot { position: fixed; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 50%; pointer-events: none; }`,
      js: `const N = ${Math.max(4, Math.round(p.intensity / 2))};
const dots = Array.from({ length: N }, (_, i) => {
  const d = document.createElement("span");
  d.className = "uf-dot";
  d.style.background = i % 2 ? "${p.secondary}" : "${p.primary}";
  d.style.opacity = 1 - i / N;
  d.style.transform = "scale(" + (1 - i / N) + ")";
  document.body.appendChild(d);
  return { el: d, x: 0, y: 0 };
});
let mx = 0, my = 0;
addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
(function loop() {
  let x = mx, y = my;
  dots.forEach((d) => { d.x += (x - d.x) * .35; d.y += (y - d.y) * .35; d.el.style.left = d.x + "px"; d.el.style.top = d.y + "px"; x = d.x; y = d.y; });
  requestAnimationFrame(loop);
})();`,
    }),
  },
  {
    slug: "neon-hover", name: "Neon Hover", kind: "effect", category: "hover",
    description: "A link that lights up with a neon glow on hover.",
    controls: ["primary", "bg", "radius", "intensity"], defaults: { primary: "#22D3EE" }, added: 8,
    build: (p) => ({
      html: `<a href="#" class="uf-neon-link">Neon Hover</a>`,
      css: `.uf-neon-link { padding: 14px 30px; font-size: 16px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; text-decoration: none;
  color: ${p.primary}; border: 2px solid ${p.primary}; border-radius: ${p.radius}px; transition: all .25s ease; }
.uf-neon-link:hover { color: #0B0F1E; background: ${p.primary};
  box-shadow: 0 0 ${Math.round(p.intensity / 5)}px ${p.primary}, 0 0 ${Math.round(p.intensity / 2)}px ${p.primary}, 0 0 ${p.intensity}px ${p.primary}; }`,
    }),
  },
  {
    slug: "card-3d-tilt", name: "3D Card Tilt", kind: "effect", category: "card",
    description: "A layered card with depth and a moving shine.",
    controls: ["primary", "secondary", "bg", "radius", "intensity"], defaults: { intensity: 40 }, added: 9, featured: true,
    build: (p) => ({
      html: `<div class="uf-3d">
  <div class="uf-3d-card">
    <span class="uf-3d-shine"></span>
    <strong>Pro Plan</strong>
    <em>Depth layer</em>
  </div>
</div>`,
      css: `.uf-3d { perspective: 900px; }
.uf-3d-card { position: relative; width: 240px; height: 150px; padding: 20px; border-radius: ${p.radius + 4}px; transform-style: preserve-3d; overflow: hidden;
  background: linear-gradient(135deg, ${p.primary}, ${p.secondary}); color: #fff; transition: transform .1s ease-out; }
.uf-3d-card strong { display: block; font-size: 20px; transform: translateZ(50px); }
.uf-3d-card em { display: block; margin-top: 50px; font-style: normal; font-size: 13px; opacity: .85; transform: translateZ(30px); }
.uf-3d-shine { position: absolute; inset: 0; background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,.35), transparent 50%); pointer-events: none; }`,
      js: `const c3 = document.querySelector(".uf-3d-card");
const MAX3 = ${Math.round(p.intensity / 2)};
c3.addEventListener("mousemove", (e) => {
  const r = c3.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  c3.style.transform = "rotateY(" + (x - .5) * MAX3 + "deg) rotateX(" + (.5 - y) * MAX3 + "deg)";
  c3.style.setProperty("--x", x * 100 + "%"); c3.style.setProperty("--y", y * 100 + "%");
});
c3.addEventListener("mouseleave", () => (c3.style.transform = ""));`,
    }),
  },
  {
    slug: "ripple-effect", name: "Ripple Effect", kind: "effect", category: "button",
    description: "Material-style ripple from the click point.",
    controls: ["primary", "bg", "radius", "speed"], defaults: { speed: 6 }, added: 10,
    build: (p) => ({
      html: `<button class="uf-ripple">Click me</button>`,
      css: `.uf-ripple { position: relative; overflow: hidden; padding: 14px 32px; font: inherit; font-weight: 600; color: #fff; background: ${p.primary}; border: 0; border-radius: ${p.radius}px; cursor: pointer; }
.uf-ripple .wave { position: absolute; border-radius: 50%; background: rgba(255,255,255,.5); transform: scale(0); animation: uf-ripple ${p.speed / 10}s ease-out forwards; pointer-events: none; }
@keyframes uf-ripple { to { transform: scale(4); opacity: 0; } }`,
      js: `document.querySelector(".uf-ripple").addEventListener("click", (e) => {
  const b = e.currentTarget, r = b.getBoundingClientRect(), s = Math.max(r.width, r.height);
  const w = document.createElement("span");
  w.className = "wave";
  w.style.cssText = "width:" + s + "px;height:" + s + "px;left:" + (e.clientX - r.left - s / 2) + "px;top:" + (e.clientY - r.top - s / 2) + "px";
  b.appendChild(w);
  w.addEventListener("animationend", () => w.remove());
});`,
    }),
  },
  {
    slug: "smooth-parallax", name: "Smooth Parallax", kind: "effect", category: "mouse",
    description: "Layers shift at different depths as the mouse moves.",
    controls: ["primary", "secondary", "bg", "intensity"], defaults: { intensity: 40 }, added: 11,
    build: (p) => ({
      html: `<div class="uf-parallax">
  <span class="layer" data-depth="0.2"></span>
  <span class="layer" data-depth="0.5"></span>
  <span class="layer" data-depth="1"></span>
</div>`,
      css: `.uf-parallax { position: relative; width: 300px; height: 200px; }
.uf-parallax .layer { position: absolute; border-radius: 16px; transition: transform .2s ease-out; }
.uf-parallax .layer:nth-child(1) { inset: 20px 40px; background: ${alpha(p.primary, 0.25)}; }
.uf-parallax .layer:nth-child(2) { inset: 50px 80px; background: ${alpha(p.secondary, 0.4)}; }
.uf-parallax .layer:nth-child(3) { inset: 80px 120px; background: ${p.primary}; }`,
      js: `const layers = document.querySelectorAll(".uf-parallax .layer");
const AMT = ${p.intensity};
addEventListener("mousemove", (e) => {
  const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
  layers.forEach((l) => { const d = +l.dataset.depth; l.style.transform = "translate(" + x * AMT * d + "px," + y * AMT * d + "px)"; });
});`,
    }),
  },
  {
    slug: "gradient-border", name: "Gradient Border Animation", kind: "effect", category: "card",
    description: "A rotating conic gradient border around a card.",
    controls: ["primary", "secondary", "bg", "radius", "speed", "animation"], defaults: { speed: 4 }, added: 12,
    build: (p) => ({
      html: `<div class="uf-gborder"><div class="inner">Gradient Border</div></div>`,
      css: `@property --uf-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
.uf-gborder { padding: 2px; border-radius: ${p.radius + 2}px;
  background: conic-gradient(from var(--uf-angle), ${p.primary}, ${p.secondary}, ${p.primary});
  ${p.animation ? `animation: uf-rotate ${p.speed}s linear infinite;` : ""} }
.uf-gborder .inner { width: 220px; height: 120px; display: grid; place-items: center; border-radius: ${p.radius}px; background: #141A2E; color: #F8FAFC; font-weight: 600; }
@keyframes uf-rotate { to { --uf-angle: 360deg; } }`,
    }),
  },
];
