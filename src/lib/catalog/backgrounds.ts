import { alpha, type Item } from "./types";

const fill = `position: fixed; inset: 0;`;

export const backgroundItems: Item[] = [
  {
    slug: "aurora-gradient", name: "Aurora Gradient", kind: "background", category: "aurora",
    description: "Soft drifting aurora blobs over a deep night sky.",
    controls: ["primary", "secondary", "bg", "speed", "intensity", "animation"], featured: true, added: 1,
    build: (p) => ({
      html: `<div class="uf-aurora"></div>`,
      css: `.uf-aurora { ${fill} overflow: hidden; background: ${p.bg}; }
.uf-aurora::before, .uf-aurora::after {
  content: ""; position: absolute; width: 70vmax; height: 70vmax; border-radius: 50%;
  filter: blur(80px); opacity: ${p.intensity / 100};
  ${p.animation ? `animation: uf-aurora ${p.speed * 2}s ease-in-out infinite alternate;` : ""}
}
.uf-aurora::before { background: ${p.primary}; top: -30vmax; left: -20vmax; }
.uf-aurora::after { background: ${p.secondary}; bottom: -35vmax; right: -25vmax; animation-delay: -${p.speed}s; }
@keyframes uf-aurora { to { transform: translate(15vmax, 10vmax) scale(1.15); } }`,
    }),
  },
  {
    slug: "mesh-gradient", name: "Mesh Gradient", kind: "background", category: "mesh",
    description: "Layered radial gradients that blend into a smooth mesh.",
    controls: ["primary", "secondary", "bg", "intensity"], defaults: { secondary: "#F472B6" }, added: 2,
    build: (p) => ({
      html: `<div class="uf-mesh"></div>`,
      css: `.uf-mesh { ${fill}
  background-color: ${p.bg};
  background-image:
    radial-gradient(at 20% 20%, ${alpha(p.primary, p.intensity / 100)} 0, transparent 50%),
    radial-gradient(at 80% 10%, ${alpha(p.secondary, p.intensity / 100)} 0, transparent 50%),
    radial-gradient(at 70% 80%, ${alpha(p.primary, p.intensity / 140)} 0, transparent 50%),
    radial-gradient(at 10% 90%, ${alpha(p.secondary, p.intensity / 160)} 0, transparent 50%);
}`,
    }),
  },
  {
    slug: "dot-pattern", name: "Dot Pattern", kind: "background", category: "patterns",
    description: "A subtle repeating dot grid.",
    controls: ["primary", "bg", "intensity", "padding"], defaults: { padding: 22 }, added: 3,
    build: (p) => ({
      html: `<div class="uf-dots"></div>`,
      css: `.uf-dots { ${fill}
  background-color: ${p.bg};
  background-image: radial-gradient(${alpha(p.primary, p.intensity / 100)} 1.2px, transparent 1.2px);
  background-size: ${p.padding}px ${p.padding}px;
}`,
    }),
  },
  {
    slug: "grid-pattern", name: "Grid Pattern", kind: "background", category: "grid",
    description: "Thin grid lines fading out toward the edges.",
    controls: ["primary", "bg", "intensity", "padding"], defaults: { padding: 40, intensity: 35 }, added: 4,
    build: (p) => ({
      html: `<div class="uf-grid"></div>`,
      css: `.uf-grid { ${fill}
  background-color: ${p.bg};
  background-image:
    linear-gradient(${alpha(p.primary, p.intensity / 100)} 1px, transparent 1px),
    linear-gradient(90deg, ${alpha(p.primary, p.intensity / 100)} 1px, transparent 1px);
  background-size: ${p.padding}px ${p.padding}px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
}`,
    }),
  },
  {
    slug: "wavy-lines", name: "Wavy Lines", kind: "background", category: "waves",
    description: "Animated SVG waves rolling along the bottom.",
    controls: ["primary", "secondary", "bg", "speed", "animation"], added: 5,
    build: (p) => ({
      html: `<div class="uf-waves">
  <svg viewBox="0 0 1440 320" preserveAspectRatio="none"><path class="w1" d="M0,160 C240,260 480,60 720,160 C960,260 1200,60 1440,160 C1680,260 1920,60 2160,160 L2160,320 L0,320 Z"/></svg>
  <svg viewBox="0 0 1440 320" preserveAspectRatio="none"><path class="w2" d="M0,200 C240,120 480,280 720,200 C960,120 1200,280 1440,200 C1680,120 1920,280 2160,200 L2160,320 L0,320 Z"/></svg>
</div>`,
      css: `.uf-waves { ${fill} overflow: hidden; background: ${p.bg}; }
.uf-waves svg { position: absolute; bottom: 0; left: 0; width: 150%; height: 55%; }
.uf-waves .w1 { fill: ${alpha(p.primary, 0.45)}; }
.uf-waves .w2 { fill: ${alpha(p.secondary, 0.35)}; }
${p.animation ? `.uf-waves svg:first-child { animation: uf-wave ${p.speed}s linear infinite; }
.uf-waves svg:last-child { animation: uf-wave ${p.speed * 1.6}s linear infinite reverse; }
@keyframes uf-wave { to { transform: translateX(-33.33%); } }` : ""}`,
    }),
  },
  {
    slug: "animated-gradient", name: "Animated Gradient", kind: "background", category: "animated",
    description: "A smoothly shifting multi-color gradient.",
    controls: ["primary", "secondary", "bg", "speed", "animation"], added: 6, featured: true,
    build: (p) => ({
      html: `<div class="uf-anim-grad"></div>`,
      css: `.uf-anim-grad { ${fill}
  background: linear-gradient(120deg, ${p.bg}, ${p.primary}, ${p.secondary}, ${p.bg});
  background-size: 300% 300%;
  ${p.animation ? `animation: uf-shift ${p.speed}s ease infinite;` : ""}
}
@keyframes uf-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`,
    }),
  },
  {
    slug: "glass-blur", name: "Glass Blur", kind: "background", category: "blur",
    description: "Colored shapes behind a frosted glass layer.",
    controls: ["primary", "secondary", "bg", "intensity"], added: 7,
    build: (p) => ({
      html: `<div class="uf-glassbg"><span></span><span></span><span></span></div>`,
      css: `.uf-glassbg { ${fill} overflow: hidden; background: ${p.bg}; }
.uf-glassbg span { position: absolute; border-radius: 40%; }
.uf-glassbg span:nth-child(1) { width: 40vmin; height: 40vmin; background: ${p.primary}; top: 15%; left: 15%; }
.uf-glassbg span:nth-child(2) { width: 30vmin; height: 30vmin; background: ${p.secondary}; bottom: 15%; right: 20%; }
.uf-glassbg span:nth-child(3) { width: 22vmin; height: 22vmin; background: ${p.primary}; top: 20%; right: 15%; opacity: .6; }
.uf-glassbg::after { content: ""; position: absolute; inset: 0; backdrop-filter: blur(${Math.round(p.intensity / 2)}px); -webkit-backdrop-filter: blur(${Math.round(p.intensity / 2)}px); background: rgba(255,255,255,.04); }`,
    }),
  },
  {
    slug: "neon-glow", name: "Neon Glow", kind: "background", category: "gradients",
    description: "A pulsing neon horizon glow.",
    controls: ["primary", "secondary", "bg", "speed", "intensity", "animation"], defaults: { speed: 4 }, added: 8,
    build: (p) => ({
      html: `<div class="uf-neon"></div>`,
      css: `.uf-neon { ${fill} background: ${p.bg}; overflow: hidden; }
.uf-neon::before {
  content: ""; position: absolute; left: 50%; bottom: -40vh; width: 120vw; height: 70vh; transform: translateX(-50%);
  background: radial-gradient(ellipse at center, ${alpha(p.primary, p.intensity / 100)}, ${alpha(p.secondary, p.intensity / 250)} 40%, transparent 70%);
  ${p.animation ? `animation: uf-pulse ${p.speed}s ease-in-out infinite;` : ""}
}
.uf-neon::after { content: ""; position: absolute; left: 10%; right: 10%; top: 70%; height: 2px; background: ${p.secondary}; box-shadow: 0 0 20px 4px ${p.secondary}; opacity: .8; }
@keyframes uf-pulse { 50% { opacity: .55; transform: translateX(-50%) scale(1.08); } }`,
    }),
  },
  {
    slug: "radial-gradient", name: "Radial Spotlight", kind: "background", category: "gradients",
    description: "A centered radial spotlight fading into the background.",
    controls: ["primary", "bg", "intensity"], added: 9,
    build: (p) => ({
      html: `<div class="uf-radial"></div>`,
      css: `.uf-radial { ${fill} background: radial-gradient(circle at 50% 40%, ${alpha(p.primary, p.intensity / 100)} 0%, ${p.bg} 60%); }`,
    }),
  },
  {
    slug: "geometric-pattern", name: "Geometric Pattern", kind: "background", category: "patterns",
    description: "Repeating diagonal triangles built from conic gradients.",
    controls: ["primary", "secondary", "bg", "padding", "intensity"], defaults: { padding: 48, intensity: 25 }, added: 10,
    build: (p) => ({
      html: `<div class="uf-geo"></div>`,
      css: `.uf-geo { ${fill}
  background-color: ${p.bg};
  background-image:
    linear-gradient(45deg, ${alpha(p.primary, p.intensity / 100)} 25%, transparent 25%),
    linear-gradient(-45deg, ${alpha(p.secondary, p.intensity / 100)} 25%, transparent 25%);
  background-size: ${p.padding}px ${p.padding}px;
}`,
    }),
  },
  {
    slug: "noise-texture", name: "Noise Texture", kind: "background", category: "gradients",
    description: "Film-grain noise layered over a gradient, generated with SVG turbulence.",
    controls: ["primary", "secondary", "bg", "intensity"], defaults: { intensity: 25 }, added: 11,
    build: (p) => ({
      html: `<div class="uf-noise"></div>`,
      css: `.uf-noise { ${fill} background: linear-gradient(160deg, ${alpha(p.primary, 0.6)}, ${p.bg} 60%, ${alpha(p.secondary, 0.4)}); }
.uf-noise::after {
  content: ""; position: absolute; inset: 0; opacity: ${p.intensity / 100};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}`,
    }),
  },
  {
    slug: "particle-background", name: "Particle Background", kind: "background", category: "animated",
    description: "Floating connected particles drawn on a canvas.",
    controls: ["primary", "bg", "speed", "intensity", "animation"], defaults: { speed: 5, intensity: 60 }, added: 12, featured: true,
    build: (p) => ({
      html: `<canvas class="uf-particles"></canvas>`,
      css: `.uf-particles { ${fill} display: block; background: ${p.bg}; }`,
      js: `const canvas = document.querySelector(".uf-particles");
const ctx = canvas.getContext("2d");
const COUNT = ${Math.round(p.intensity)};
const SPEED = ${(p.speed / 10).toFixed(2)};
const ANIMATE = ${p.animation} && !matchMedia("(prefers-reduced-motion: reduce)").matches;
let w, h, pts;
const resize = () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; };
resize(); addEventListener("resize", resize);
pts = Array.from({ length: COUNT }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * SPEED, vy: (Math.random() - .5) * SPEED }));
function frame() {
  ctx.clearRect(0, 0, w, h);
  for (const p of pts) {
    p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h;
    ctx.fillStyle = "${p.primary}"; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 7); ctx.fill();
  }
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
    if (d < 110) { ctx.strokeStyle = "${p.primary}" + Math.round((1 - d / 110) * 120).toString(16).padStart(2, "0"); ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
  }
  if (ANIMATE) requestAnimationFrame(frame);
}
frame();`,
    }),
  },
];
