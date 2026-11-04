import { alpha, type Item } from "./types";

const names = [
  "Lift",
  "Spring",
  "Spotlight",
  "Shine",
  "Continue",
  "Glide",
  "Roll",
  "Ink Fill",
  "Tilt",
  "Magnet",
  "Under Glow",
  "Halo",
  "Skew",
  "Focus",
  "Track",
  "Split",
  "Squish",
  "Depth",
  "Ripple",
  "Jelly",
  "Pop",
  "Shake",
  "Tada",
  "Flip",
  "Spin",
  "Bounce",
  "Rubber",
  "Beat",
  "Confetti",
  "Submit",
  "Flash",
  "Pulse",
  "Breathe",
  "Float",
  "Shimmer",
  "Orbit",
  "Glow",
  "Wiggle",
  "Typing",
  "Aurora",
  "Loading",
  "Ping",
  "Hue Flow",
  "Bob",
  "Rise Fill",
  "Corner",
  "Text Glow",
  "Morph",
  "Neon Edge",
  "Vivid",
  "Drop",
  "Swing",
] as const;

const looks = ["sg", "sgl", "sn", "sd", "so", "sm", "sw", "sc", "sl", "sb"];
const confettiColors = ["#ff3d7f", "#ffd36e", "#7ad8ff", "#c3a6ff", "#c6ff3d"];
const hoverOnly = (number: number) => number <= 18 || (number >= 45 && number <= 50);
const clickOnly = (number: number) => (number >= 19 && number <= 31) || number >= 51;
const typeOf = (number: number) => (hoverOnly(number) ? "HOVER" : clickOnly(number) ? "CLICK" : "AUTO");

function buttonCss(number: number, p: Parameters<Item["build"]>[0]) {
  const look = number === 36 ? "sd" : number === 40 ? "sm" : looks[(number - 1) % looks.length]!;
  const hoverCss: Record<number, string> = {
    1: `.a1.h { transform: translateY(-4px); filter: brightness(1.12) drop-shadow(0 12px 12px #0006); }`,
    2: `.a2 { transition: transform .5s cubic-bezier(.34,1.56,.64,1); } .a2.h { transform: scale(1.09); }`,
    3: `.a3::before { content:""; position:absolute; inset:0; border-radius:inherit; background:radial-gradient(80px circle at var(--x,50%) var(--y,50%),#fff7,#fff0); opacity:0; transition:opacity .3s; } .a3.h::before { opacity:1; }`,
    4: `.a4 { overflow:hidden; } .a4::after { content:""; position:absolute; top:0; left:-70%; width:40%; height:100%; transform:skewX(-22deg); background:linear-gradient(90deg,#fff0,#fff8,#fff0); transition:left .7s; } .a4.h::after { left:130%; }`,
    5: `.a5::after { content:"→"; position:absolute; right:16px; top:50%; margin-top:-8px; opacity:0; transform:translateX(-10px); transition:.35s; } .a5.h::after { opacity:1; transform:none; } .a5.h span { transform:translateX(-10px); }`,
    6: `.a6 { overflow:hidden; } .a6::before { content:""; position:absolute; inset:0; background:linear-gradient(100deg,#fff0 25%,#fff4 50%,#fff0 75%) 120% 0/250% 100% no-repeat; transition:background-position .9s; } .a6.h::before { background-position:-20% 0; }`,
    7: `.a7::after { content:attr(data-t); position:absolute; inset:0; display:grid; place-items:center; transform:translateY(110%); transition:.4s cubic-bezier(.2,.8,.2,1); } .a7.h span { transform:translateY(-110%); } .a7.h::after { transform:none; }`,
    8: `.a8 { overflow:hidden; } .a8::before { content:""; position:absolute; inset:0; background:#fff3; clip-path:circle(0 at var(--x,50%) var(--y,50%)); transition:clip-path .5s cubic-bezier(.2,.8,.2,1); } .a8.h::before { clip-path:circle(150% at var(--x,50%) var(--y,50%)); }`,
    9: `.a9 { transform:perspective(500px) rotateX(calc(var(--dy,0)*-14deg)) rotateY(calc(var(--dx,0)*16deg)); transition:transform .5s cubic-bezier(.2,.8,.2,1); } .a9.h { transition:transform .12s linear; }`,
    10: `.a10 { transform:translate(calc(var(--dx,0)*10px),calc(var(--dy,0)*8px)); transition:transform .5s cubic-bezier(.2,.8,.2,1); } .a10.h { transition:transform .12s linear; }`,
    11: `.a11::before { content:""; position:absolute; inset:10px 14px -12px; border-radius:inherit; background:inherit; filter:blur(16px); opacity:0; z-index:-1; transition:.4s; } .a11.h::before { opacity:.85; }`,
    12: `.a12 { outline:2px solid #fff0; outline-offset:0; } .a12.h { outline-color:#fff8; outline-offset:6px; }`,
    13: `.a13.h { transform:skewX(-10deg) scale(1.05); }`,
    14: `.a14 span { filter:blur(5px); opacity:.5; } .a14.h span { filter:none; opacity:1; }`,
    15: `.a15.h { letter-spacing:.14em; }`,
    16: `.a16 { overflow:hidden; } .a16::before,.a16::after { content:""; position:absolute; top:0; width:51%; height:100%; background:#fff3; transition:.4s cubic-bezier(.2,.8,.2,1); } .a16::before { left:0; transform:translateX(-101%); } .a16::after { right:0; transform:translateX(101%); } .a16.h::before,.a16.h::after { transform:none; }`,
    17: `.a17.h { transform:scale(1.1,.9); }`,
    18: `.a18 { box-shadow:0 6px 0 #0005,0 12px 18px -6px #0008; } .a18.h { transform:translateY(5px); box-shadow:0 1px 0 #0005,0 4px 8px -4px #0008; }`,
    45: `.a45 { overflow:hidden; } .a45::before { content:""; position:absolute; inset:0; background:#fff3; transform:translateY(101%); transition:.4s cubic-bezier(.2,.8,.2,1); } .a45.h::before { transform:none; }`,
    46: `.a46 { overflow:hidden; } .a46::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 0 0,#fff8,#fff0 60%); opacity:0; transition:.4s; } .a46.h::before { opacity:1; }`,
    47: `.a47.h span { text-shadow:0 0 14px #fff,0 0 26px #fff9; }`,
    48: `.a48.h { border-radius:10px; }`,
    49: `.a49.h { box-shadow:inset 0 0 18px 2px #fff7,0 0 24px #fff4; }`,
    50: `.a50.h { filter:brightness(1.25) saturate(1.4); }`,
  };
  const clickCss: Record<number, string> = {
    19: `.a19::after { content:""; position:absolute; left:var(--x,50%); top:var(--y,50%); width:12px; height:12px; margin:-6px; border-radius:50%; background:#fff9; transform:scale(0); } .a19.k::after { animation:uf-mb-ripple .7s ease-out; } @keyframes uf-mb-ripple { to { transform:scale(24); opacity:0; } }`,
    20: `.a20.k { animation:uf-mb-jelly .7s; } @keyframes uf-mb-jelly { 30%{transform:scale(1.25,.75)} 50%{transform:scale(.8,1.2)} 70%{transform:scale(1.1,.9)} 90%{transform:scale(.97,1.03)} }`,
    21: `.a21.k { animation:uf-mb-pop .4s; } @keyframes uf-mb-pop { 40%{transform:scale(1.3)} }`,
    22: `.a22.k { animation:uf-mb-shake .5s; } @keyframes uf-mb-shake { 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }`,
    23: `.a23.k { animation:uf-mb-tada .8s; } @keyframes uf-mb-tada { 10%,20%{transform:scale(.9) rotate(-4deg)} 30%,50%,70%{transform:scale(1.1) rotate(4deg)} 40%,60%{transform:scale(1.1) rotate(-4deg)} }`,
    24: `.a24.k { animation:uf-mb-flip .7s; } @keyframes uf-mb-flip { 50%{transform:perspective(400px) rotateX(180deg)} to{transform:perspective(400px) rotateX(360deg)} }`,
    25: `.a25.k { animation:uf-mb-spin .6s; } @keyframes uf-mb-spin { to{transform:rotate(360deg)} }`,
    26: `.a26.k { animation:uf-mb-bounce .7s; } @keyframes uf-mb-bounce { 0%,50%,100%{transform:none} 25%{transform:translateY(-18px)} 75%{transform:translateY(-8px)} }`,
    27: `.a27.k { animation:uf-mb-rubber .7s; } @keyframes uf-mb-rubber { 30%{transform:scaleX(1.25)} 40%{transform:scaleX(.75)} 50%{transform:scaleX(1.15)} 65%{transform:scaleX(.95)} }`,
    28: `.a28.k { animation:uf-mb-beat .6s; } @keyframes uf-mb-beat { 30%{transform:scale(1.2)} 50%{transform:scale(.95)} 70%{transform:scale(1.12)} }`,
    31: `.a31.k { animation:uf-mb-flash .7s; } @keyframes uf-mb-flash { 40%{filter:brightness(1.9) drop-shadow(0 0 20px #fff)} }`,
    51: `.a51.k { animation:uf-mb-drop .6s; } @keyframes uf-mb-drop { 30%{transform:translateY(8px) scale(1.08,.88)} 60%{transform:translateY(-6px)} }`,
    52: `.a52.k { transform-origin:top center; animation:uf-mb-swing .8s; } @keyframes uf-mb-swing { 20%{transform:rotate(15deg)} 40%{transform:rotate(-10deg)} 60%{transform:rotate(5deg)} 80%{transform:rotate(-5deg)} }`,
  };
  const autoCss: Record<number, string> = {
    32: `.a32 { animation:uf-mb-ring 1.8s infinite; } @keyframes uf-mb-ring { 0%{box-shadow:0 0 0 0 ${p.primary}aa} 100%{box-shadow:0 0 0 18px ${p.primary}00} }`,
    33: `.a33 { animation:uf-mb-breathe 2.4s ease-in-out infinite; } @keyframes uf-mb-breathe { 50%{transform:scale(1.07)} }`,
    34: `.a34 { animation:uf-mb-float 2.2s ease-in-out infinite; } @keyframes uf-mb-float { 50%{transform:translateY(-8px)} }`,
    35: `.a35 { overflow:hidden; } .a35::before { content:""; position:absolute; inset:0; background:linear-gradient(110deg,#fff0 30%,#fff6 50%,#fff0 70%) 0 0/200% 100%; animation:uf-mb-shimmer 1.8s linear infinite; } @keyframes uf-mb-shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`,
    36: `.a36 { overflow:hidden; background:none; box-shadow:none; } .a36::before { content:""; position:absolute; inset:-80%; z-index:-2; background:conic-gradient(${p.primary},${p.secondary},#ff3d7f,${p.primary}); animation:uf-mb-spin 2.4s linear infinite; } .a36::after { content:""; position:absolute; inset:2px; z-index:-1; border-radius:inherit; background:var(--uf-mb-card); }`,
    37: `.a37 { animation:uf-mb-glow 2s ease-in-out infinite; } @keyframes uf-mb-glow { 50%{filter:drop-shadow(0 0 14px ${p.primary}) brightness(1.15)} }`,
    38: `.a38 { animation:uf-mb-wiggle 2.6s infinite; } @keyframes uf-mb-wiggle { 0%,78%,100%{transform:none} 82%{transform:rotate(-5deg)} 88%{transform:rotate(5deg)} 94%{transform:rotate(-3deg)} }`,
    39: `.a39 span::after { content:"|"; margin-left:2px; animation:uf-mb-blink 1s steps(1) infinite; } @keyframes uf-mb-blink { 50%{opacity:0} }`,
    40: `.a40 { background-size:200% 200%,200% 200%,200% 200%,100%; animation:uf-mb-aurora 6s ease-in-out infinite alternate; } @keyframes uf-mb-aurora { to{background-position:100% 100%,0 100%,100% 0,0 0} }`,
    41: `.a41 span::after { content:"..."; display:inline-block; width:0; overflow:hidden; vertical-align:bottom; animation:uf-mb-dots 1.2s steps(4) infinite; } @keyframes uf-mb-dots { to{width:1.15em} }`,
    42: `.a42 { overflow:visible; } .a42::after { content:""; position:absolute; inset:0; border-radius:inherit; border:2px solid #fff9; animation:uf-mb-ping 1.8s infinite; pointer-events:none; } @keyframes uf-mb-ping { to{transform:scale(1.4,1.7);opacity:0} }`,
    43: `.a43 { animation:uf-mb-hue 6s linear infinite; } @keyframes uf-mb-hue { to{filter:hue-rotate(360deg)} }`,
    44: `.a44 { animation:uf-mb-bob 3s ease-in-out infinite; } @keyframes uf-mb-bob { 25%{transform:translateY(-5px) rotate(-2deg)} 75%{transform:translateY(3px) rotate(2deg)} }`,
  };
  const baseCss = `.uf-mb-page { --uf-mb-card:#171626; --uf-mb-cell:#ffffff08; --uf-mb-edge:#ffffff14; --uf-mb-text:#f1f0fa; --uf-mb-muted:#8d8ba8; --uf-mb-glass:#ffffff14; --uf-mb-gedge:#ffffff30; --uf-mb-ink:#f1f0fa; --uf-mb-neu:#1d1c2e; --uf-mb-primary:${p.primary}; --uf-mb-secondary:${p.secondary}; display:grid; min-height:100%; align-content:center; justify-items:center; gap:12px; padding:24px; box-sizing:border-box; color:var(--uf-mb-text); font-family:system-ui,-apple-system,"Segoe UI",sans-serif; background:transparent; }
@media (prefers-color-scheme:light) { :root:not([data-theme="dark"]) .uf-mb-page { --uf-mb-card:#fff; --uf-mb-cell:#ffffff99; --uf-mb-edge:#0000000f; --uf-mb-text:#1b1a2a; --uf-mb-muted:#6c6a85; --uf-mb-glass:#ffffffb3; --uf-mb-gedge:#0000001a; --uf-mb-ink:#1b1a2a; --uf-mb-neu:#e6e4f4; } }
.uf-mb-cell { display:grid; justify-items:center; gap:12px; width:min(190px,100%); padding:8px 10px; border:0; border-radius:0; background:transparent; -webkit-backdrop-filter:none; backdrop-filter:none; }
.uf-mb-cell small { color:var(--uf-mb-muted); font-size:10px; letter-spacing:.08em; }
.uf-modern-button { position:relative; isolation:isolate; overflow:visible; width:100%; max-width:150px; padding:15px 22px; border:0; border-radius:${p.radius}px; background:linear-gradient(135deg,var(--uf-mb-primary),var(--uf-mb-secondary)); color:#fff; font:600 14px/1 system-ui,-apple-system,"Segoe UI",sans-serif; letter-spacing:-.01em; white-space:nowrap; cursor:pointer; touch-action:manipulation; -webkit-tap-highlight-color:transparent; transition:.35s cubic-bezier(.2,.8,.2,1); }
.uf-modern-button span { position:relative; display:block; transition:.4s cubic-bezier(.2,.8,.2,1); }
.uf-modern-button:focus-visible { outline:2px solid var(--uf-mb-text); outline-offset:3px; }
.uf-modern-button.sg { background:linear-gradient(135deg,#6366f1,#a855f7); box-shadow:0 10px 28px -8px #7c5cff99,inset 0 1px #fff4; }
.uf-modern-button.sgl { background:var(--uf-mb-glass); color:var(--uf-mb-ink); -webkit-backdrop-filter:blur(14px); backdrop-filter:blur(14px); box-shadow:inset 0 0 0 1px var(--uf-mb-gedge),0 8px 24px -10px #0006; }
.uf-modern-button.sn { background:var(--uf-mb-neu); color:var(--uf-mb-ink); box-shadow:6px 6px 14px #0004,-5px -5px 12px #ffffff0d,inset 0 0 0 1px #ffffff08; }
.uf-modern-button.sd { background:#0b0b12; box-shadow:inset 0 0 0 1px #ffffff26,inset 0 1px #fff3,0 8px 20px -8px #000; }
.uf-modern-button.so { border:1.5px solid transparent; background:linear-gradient(var(--uf-mb-card),var(--uf-mb-card)) padding-box,linear-gradient(135deg,#22d3ee,#a855f7,#ff3d7f) border-box; color:var(--uf-mb-ink); }
.uf-modern-button.sm { background:radial-gradient(at 20% 20%,#ff7ab8 0,#0000 55%),radial-gradient(at 85% 30%,#38c8ff 0,#0000 50%),radial-gradient(at 50% 100%,#8b5cf6 0,#0000 60%),#3b2a8f; box-shadow:inset 0 1px #fff4,0 10px 24px -8px #8b5cf688; }
.uf-modern-button.sw { background:#fff; color:#14131f; box-shadow:0 10px 24px -10px #fff6,0 0 0 1px #0001; }
.uf-modern-button.sc { border-radius:18px; background:linear-gradient(180deg,#ff9a6b,#ff3d7f); box-shadow:inset 0 2px 0 #fff6,inset 0 -3px 0 #0003,0 8px 0 -2px #c21f5b,0 14px 20px -6px #ff3d7f88; }
.uf-modern-button.sl { border-radius:16px; background:#c6ff3d; color:#14131f; box-shadow:0 10px 24px -10px #c6ff3daa; }
.uf-modern-button.sb { background:linear-gradient(180deg,#3b9bff,#0a6cf0); box-shadow:inset 0 1px #fff5,0 10px 22px -8px #0a84ffaa; }
@media (prefers-reduced-motion:reduce) { .uf-modern-button,.uf-modern-button::after,.uf-modern-button::before,.uf-modern-button span::after { animation:none!important; transition:none!important; } }`;
  const specific = hoverCss[number] ?? clickCss[number] ?? autoCss[number] ?? "";
  const type = typeOf(number);
  const js = `(function(){
  var button=document.querySelector('.uf-modern-button'),label=button.querySelector('span'),number=${number},name=${JSON.stringify(names[number - 1])},timer,busy=false;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function on(){button.classList.add('h');}
  function off(){button.classList.remove('h');button.style.removeProperty('--dx');button.style.removeProperty('--dy');}
  button.addEventListener('pointerenter',on);
  button.addEventListener('pointerleave',off);
  button.addEventListener('blur',off);
  button.addEventListener('focus',function(){if(button.matches(':focus-visible'))on();});
  button.addEventListener('pointermove',function(e){
    var r=button.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    button.style.setProperty('--x',x+'px');button.style.setProperty('--y',y+'px');
    button.style.setProperty('--dx',((x/r.width-.5)*2).toFixed(2));button.style.setProperty('--dy',((y/r.height-.5)*2).toFixed(2));
  });
  button.addEventListener('pointerdown',function(e){
    var r=button.getBoundingClientRect();
    button.style.setProperty('--x',(e.clientX-r.left)+'px');button.style.setProperty('--y',(e.clientY-r.top)+'px');
  });
  button.addEventListener('click',function(){
    clearTimeout(timer);button.classList.remove('k');void button.offsetWidth;button.classList.add('k');
    timer=setTimeout(function(){button.classList.remove('k');},900);
    if(number===29&&!reduce){
      var colors=${JSON.stringify(confettiColors)};
      for(var j=0;j<12;j++){
        var bit=document.createElement('i'),angle=j/12*6.283,radius=40+Math.random()*24;
        bit.style.cssText='position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px;border-radius:'+(j%2?'50%':'2px')+';background:'+colors[j%colors.length]+';pointer-events:none';
        button.appendChild(bit);
        bit.animate([{transform:'translate(0,0) scale(1) rotate(0)',opacity:1},{transform:'translate('+Math.cos(angle)*radius+'px,'+(Math.sin(angle)*radius+14)+'px) scale(0) rotate(200deg)',opacity:0}],{duration:700,easing:'cubic-bezier(.2,.7,.4,1)'}).onfinish=function(){this.effect.target.remove();};
      }
    }
    if(number===30&&!busy){
      busy=true;label.textContent='✓ Done';
      label.animate([{transform:'scale(.6)'},{transform:'scale(1.15)',offset:.6},{transform:'scale(1)'}],{duration:400});
      setTimeout(function(){label.textContent=name;busy=false;},1500);
    }
  });
})();`;
  return {
    html: `<div class="uf-mb-page"><div class="uf-mb-cell"><button type="button" class="uf-modern-button ${look} a${number}" data-t="Go →"><span>${names[number - 1]}</span></button><small>${type}</small></div></div>`,
    css: `${baseCss}\n${specific}`,
    js,
  };
}

export const modernButtonItems: Item[] = names.map((name, index) => {
  const number = index + 1;
  const slugName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    slug: `modern-button-${slugName}`,
    name: `${name} Button`,
    kind: "component",
    category: "buttons",
    description: `${typeOf(number).toLowerCase()} button effect ${String(number).padStart(2, "0")} from the 52 Modern Buttons collection.`,
    controls: ["primary", "secondary", "bg", "radius"],
    defaults: { primary: "#6366F1", secondary: "#A855F7", bg: "#0C0B14", radius: 999 },
    added: 24 + number,
    build: (params) => buttonCss(number, params),
  };
});

export const frutigerAeroButtonItem: Item = {
  slug: "frutiger-aero-button",
  name: "Frutiger Aero Button",
  kind: "component",
  category: "buttons",
  description: "A glossy blue glass button with a soft highlight and responsive press states.",
  controls: ["primary", "animation"],
  defaults: { primary: "#5587FF", radius: 999 },
  added: 77,
  build: (p) => ({
    html: `<div class="uf-frutiger-demo"><button type="button" class="uf-frutiger-btn">Primary</button></div>`,
    css: `.uf-frutiger-demo { display:grid; place-items:center; min-height:100%; padding:24px; box-sizing:border-box; }
.uf-frutiger-btn {
  position:relative;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:12px 32px;
  border:1px solid rgba(255,255,255,.4);
  border-radius:9999px;
  background:radial-gradient(farthest-corner at bottom center,rgba(255,255,255,.7),transparent),linear-gradient(to bottom,${alpha(p.primary, 0.6)},${alpha(p.primary, 0.7)});
  background-color:${p.primary};
  box-shadow:0 4px 4px rgba(0,0,0,.4);
  -webkit-backdrop-filter:blur(10px);
  backdrop-filter:blur(10px);
  color:#fff;
  font:700 16px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  text-shadow:0 1px 3px rgba(0,0,0,.4);
  text-decoration:none;
  cursor:pointer;
  user-select:none;
  -webkit-user-select:none;
  ${p.animation ? "transition:all 300ms ease;" : "transition:none;"}
}
.uf-frutiger-btn::after {
  content:"";
  position:absolute;
  top:4%;
  left:.75em;
  width:calc(100% - 1.5em);
  height:40%;
  border-radius:inherit;
  background:linear-gradient(to bottom,rgba(255,255,255,.8),rgba(255,255,255,.1));
  ${p.animation ? "transition:background 400ms ease;" : ""}
  pointer-events:none;
}
.uf-frutiger-btn:hover {
  box-shadow:0 6px 8px rgba(0,0,0,.4);
  ${p.animation ? "transform:translateY(-1px);" : ""}
}
.uf-frutiger-btn:active {
  box-shadow:0 2px 4px rgba(0,0,0,.4);
  ${p.animation ? "transform:translateY(1px);" : ""}
}
.uf-frutiger-btn:focus-visible { outline:2px solid ${p.primary}; outline-offset:3px; }
@media (prefers-reduced-motion:reduce) { .uf-frutiger-btn,.uf-frutiger-btn::after { transition:none; } }`,
  }),
};

export const geoOrbitButtonItem: Item = {
  slug: "geo-orbit-button",
  name: "Geo Orbit Button",
  kind: "component",
  category: "buttons",
  description: "A black neon button with a rotating conic-gradient edge and soft glow.",
  controls: ["animation"],
  defaults: { radius: 999 },
  added: 78,
  build: (p) => ({
    html: `<button type="button" class="uf-geo-orbit-button"><span>Contact Us</span></button>`,
    css: `@import url("https://fonts.googleapis.com/css2?family=Geo&display=swap");
.uf-geo-orbit-button {
  --uf-geo-border:3px;
  position:relative;
  isolation:isolate;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:220px;
  min-height:76px;
  padding:20px 34px;
  overflow:hidden;
  border:0;
  border-radius:999px;
  background:#000;
  color:#fff;
  font:700 28px/1 "Geo",monospace;
  text-transform:uppercase;
  cursor:pointer;
  ${p.animation ? "animation:uf-geo-glow 2s linear infinite;" : ""}
}
.uf-geo-orbit-button::before {
  content:"";
  position:absolute;
  z-index:0;
  top:50%;
  left:50%;
  width:150%;
  aspect-ratio:1;
  border-radius:50%;
  background:conic-gradient(#fff 0%,#000 3%,#409 60%,#fff 100%);
  transform:translate(-50%,-50%);
  ${p.animation ? "animation:uf-geo-spin 2s linear infinite;" : ""}
}
.uf-geo-orbit-button::after {
  content:"";
  position:absolute;
  z-index:1;
  top:50%;
  left:50%;
  width:calc(100% - var(--uf-geo-border));
  height:calc(100% - var(--uf-geo-border));
  border-radius:inherit;
  background:#000d;
  -webkit-backdrop-filter:blur(10px);
  backdrop-filter:blur(10px);
  transform:translate(-50%,-50%);
}
.uf-geo-orbit-button span { position:relative; z-index:2; white-space:nowrap; }
.uf-geo-orbit-button:focus-visible { outline:2px solid #409; outline-offset:4px; }
${p.animation ? `@keyframes uf-geo-spin { to { transform:translate(-50%,-50%) rotate(360deg); } }
@keyframes uf-geo-glow {
  0%,100% { box-shadow:0 0 0 0 transparent; }
  25% { box-shadow:0 0 0 8px #4094; }
  50% { box-shadow:0 0 0 16px transparent; }
}` : ""}
@media (prefers-reduced-motion:reduce) { .uf-geo-orbit-button,.uf-geo-orbit-button::before { animation:none; } }`,
  }),
};

export const hamburgerMorphButtonItem: Item = {
  slug: "hamburger-morph-button",
  name: "Hamburger Morph Button",
  kind: "component",
  category: "menu",
  description: "A circular menu button that morphs into a close icon with a glowing gradient edge.",
  controls: ["animation"],
  defaults: { radius: 999 },
  added: 79,
  build: (p) => ({
    html: `<button type="button" class="uf-hamburger-morph-button" aria-expanded="false" aria-label="Menu"><span class="uf-hamburger-morph-icon" aria-hidden="true"><i class="uf-hamburger-morph-bar uf-hamburger-morph-top"></i><i class="uf-hamburger-morph-bar uf-hamburger-morph-middle"></i><i class="uf-hamburger-morph-bar uf-hamburger-morph-bottom"></i></span></button>`,
    css: `.uf-hamburger-morph-button {
  --uf-hm-violet:#7c6cff;
  --uf-hm-cyan:#38c8ff;
  --uf-hm-bar:#fff;
  position:relative;
  display:grid;
  place-items:center;
  width:128px;
  height:128px;
  padding:0;
  border:1px solid #3b3a54;
  border-radius:50%;
  background:#222136;
  cursor:pointer;
  isolation:isolate;
  -webkit-tap-highlight-color:transparent;
  ${p.animation ? "transition:box-shadow .5s .2s,transform .2s,border-color .4s;" : ""}
}
.uf-hamburger-morph-button:active { ${p.animation ? "transform:scale(.94);" : ""} }
.uf-hamburger-morph-button:focus-visible { outline:2px solid var(--uf-hm-cyan); outline-offset:5px; }
.uf-hamburger-morph-button::before {
  content:"";
  position:absolute;
  z-index:-1;
  inset:-1px;
  border-radius:50%;
  background:linear-gradient(135deg,var(--uf-hm-violet),var(--uf-hm-cyan));
  opacity:0;
  transform:scale(.2);
  ${p.animation ? "transition:opacity .35s,transform .5s cubic-bezier(.2,.8,.2,1);" : ""}
}
.uf-hamburger-morph-icon {
  position:relative;
  width:50px;
  height:36px;
  ${p.animation ? "transition:rotate .35s cubic-bezier(.5,0,.2,1);" : ""}
}
.uf-hamburger-morph-bar {
  position:absolute;
  left:0;
  top:calc(50% - 3px);
  width:100%;
  height:6px;
  border-radius:6px;
  background:var(--uf-hm-bar);
  translate:0 0;
  rotate:0deg;
  scale:1 1;
  opacity:1;
  ${p.animation ? "transition:translate .28s cubic-bezier(.5,0,.2,1) .3s,rotate .3s cubic-bezier(.5,0,.2,1),scale .25s .3s,opacity .2s .3s;" : ""}
}
.uf-hamburger-morph-top { translate:0 -15px; }
.uf-hamburger-morph-bottom { translate:0 15px; }
.uf-hamburger-morph-button[aria-expanded="true"] { border-color:transparent; box-shadow:0 0 0 0 #0000,0 0 50px 8px #5c8cff77; }
.uf-hamburger-morph-button[aria-expanded="true"]::before { opacity:1; transform:scale(1); }
.uf-hamburger-morph-button[aria-expanded="true"] .uf-hamburger-morph-icon { rotate:90deg; }
.uf-hamburger-morph-button[aria-expanded="true"] .uf-hamburger-morph-bar { ${p.animation ? "transition:translate .28s cubic-bezier(.5,0,.2,1),rotate .35s cubic-bezier(.5,0,.2,1) .25s,scale .25s,opacity .2s;" : ""} }
.uf-hamburger-morph-button[aria-expanded="true"] .uf-hamburger-morph-top { translate:0 0; rotate:45deg; }
.uf-hamburger-morph-button[aria-expanded="true"] .uf-hamburger-morph-bottom { translate:0 0; rotate:-45deg; }
.uf-hamburger-morph-button[aria-expanded="true"] .uf-hamburger-morph-middle { opacity:0; scale:0 1; }
.uf-hamburger-morph-button[aria-expanded="true"] .uf-hamburger-morph-bar { background:#fff; }
@media (prefers-reduced-motion:reduce) { .uf-hamburger-morph-button,.uf-hamburger-morph-button::before,.uf-hamburger-morph-icon,.uf-hamburger-morph-bar { transition:none!important; } }`,
    js: `(function(){
  var button=document.querySelector('.uf-hamburger-morph-button');
  button.addEventListener('click',function(){
    button.setAttribute('aria-expanded',button.getAttribute('aria-expanded')!=='true');
  });
})();`,
  }),
};

export const flipKnobToggleItem: Item = {
  slug: "flip-knob-toggle",
  name: "Flip Knob Toggle",
  kind: "component",
  category: "toggles",
  description: "A 3D coin knob flips between off and on with a glowing switch track.",
  controls: ["animation"],
  defaults: { radius: 50 },
  added: 80,
  build: (p) => ({
    html: `<button type="button" class="uf-flip-knob" role="switch" aria-checked="false" aria-label="Toggle"><span class="uf-flip-knob-thumb"><span class="uf-flip-knob-coin"><span class="uf-flip-knob-face uf-flip-knob-off"><i></i></span><span class="uf-flip-knob-face uf-flip-knob-on"><i></i></span></span></span></button>`,
    css: `.uf-flip-knob {
  position:relative;
  display:block;
  width:200px;
  height:100px;
  padding:0;
  border:1px solid #3d3c58;
  border-radius:50px;
  background:#292840;
  cursor:pointer;
  -webkit-tap-highlight-color:transparent;
  ${p.animation ? "transition:background .5s,border-color .5s,box-shadow .5s;" : ""}
}
.uf-flip-knob:focus-visible { outline:2px solid #38c8ff; outline-offset:5px; }
.uf-flip-knob-thumb {
  position:absolute;
  top:8px;
  left:8px;
  width:82px;
  height:82px;
  perspective:500px;
  translate:0 0;
  ${p.animation ? "transition:translate .6s cubic-bezier(.5,-.2,.2,1.2);" : ""}
}
.uf-flip-knob-coin {
  position:absolute;
  inset:0;
  transform-style:preserve-3d;
  transform:rotateY(0);
  ${p.animation ? "transition:transform .6s cubic-bezier(.5,-.2,.2,1.2);" : ""}
}
.uf-flip-knob-face {
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
  border-radius:50%;
  backface-visibility:hidden;
  -webkit-backface-visibility:hidden;
}
.uf-flip-knob-off {
  background:radial-gradient(circle at 35% 30%,#fbfaff,#d3d1e8 70%,#bab8d4);
  box-shadow:inset 0 -4px 8px #8a88ab55,0 6px 14px #0005;
}
.uf-flip-knob-off i {
  width:32px;
  height:32px;
  border:9px solid #9a98b8;
  border-radius:50%;
}
.uf-flip-knob-on {
  transform:rotateY(180deg);
  background:linear-gradient(135deg,#7c6cff,#38c8ff);
  box-shadow:0 0 26px 4px #4d8dff99,inset 0 1px #fff5;
}
.uf-flip-knob-on i {
  width:9px;
  height:38px;
  border-radius:9px;
  background:#fff;
  box-shadow:0 0 12px 2px #fff9;
}
.uf-flip-knob[aria-checked="true"] {
  background:#2d2870;
  border-color:#6a63d8;
  box-shadow:0 0 34px 2px #5c6cff55,inset 0 0 20px #0004;
}
.uf-flip-knob[aria-checked="true"] .uf-flip-knob-thumb { translate:100px 0; }
.uf-flip-knob[aria-checked="true"] .uf-flip-knob-coin { transform:rotateY(180deg); }
.uf-flip-knob-thumb.uf-flip-knob-animating { ${p.animation ? "animation:uf-flip-knob-lift .6s ease-in-out;" : ""} }
${p.animation ? "@keyframes uf-flip-knob-lift { 50% { scale:1.14; } }" : ""}
@media (prefers-reduced-motion:reduce) { .uf-flip-knob,.uf-flip-knob-thumb,.uf-flip-knob-coin { transition:none!important; animation:none!important; } }`,
    js: `(function(){
  var toggle=document.querySelector('.uf-flip-knob');
  toggle.addEventListener('click',function(){
    toggle.setAttribute('aria-checked',toggle.getAttribute('aria-checked')!=='true');
    ${p.animation ? "var thumb=toggle.querySelector('.uf-flip-knob-thumb');thumb.classList.remove('uf-flip-knob-animating');void thumb.offsetWidth;thumb.classList.add('uf-flip-knob-animating');thumb.addEventListener('animationend',function(){thumb.classList.remove('uf-flip-knob-animating');},{once:true});" : ""}
  });
})();`,
  }),
};

export const neonGlowToggleItem: Item = {
  slug: "neon-glow-toggle",
  name: "Neon Glow Toggle",
  kind: "component",
  category: "toggles",
  description: "A neon-outlined switch with a glowing knob and animated light trail.",
  controls: ["animation"],
  defaults: { radius: 50 },
  added: 81,
  build: (p) => ({
    html: `<button type="button" class="uf-neon-glow-toggle" role="switch" aria-checked="false" aria-label="Toggle"><svg viewBox="0 0 200 100" aria-hidden="true"><defs><linearGradient id="uf-neon-glow-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="0"><stop offset="0" stop-color="#7c6cff"></stop><stop offset="1" stop-color="#38c8ff"></stop></linearGradient></defs><rect class="uf-neon-glow-base" x="2" y="2" width="196" height="96" rx="48"></rect><rect class="uf-neon-glow-neon" x="2" y="2" width="196" height="96" rx="48"></rect><rect class="uf-neon-glow-tail" x="2" y="2" width="196" height="96" rx="48" pathLength="100"></rect><rect class="uf-neon-glow-spark" x="2" y="2" width="196" height="96" rx="48" pathLength="100"></rect></svg><span class="uf-neon-glow-knob"></span></button>`,
    css: `.uf-neon-glow-toggle {
  position:relative;
  display:block;
  width:200px;
  height:100px;
  padding:0;
  border:0;
  border-radius:50px;
  background:#0e0d15;
  box-shadow:0 0 0 0 #38c8ff00,inset 0 2px 10px #0008;
  cursor:pointer;
  -webkit-tap-highlight-color:transparent;
  ${p.animation ? "transition:background .5s .5s,box-shadow .6s .5s;" : ""}
}
.uf-neon-glow-toggle:focus-visible { outline:2px solid #38c8ff; outline-offset:6px; }
.uf-neon-glow-toggle svg { position:absolute; inset:0; width:100%; height:100%; overflow:visible; pointer-events:none; }
.uf-neon-glow-toggle rect { fill:none; stroke-width:4; }
.uf-neon-glow-base { stroke:#34325a; }
.uf-neon-glow-neon {
  stroke:url(#uf-neon-glow-gradient);
  opacity:0;
  filter:drop-shadow(0 0 6px #5c8cff) drop-shadow(0 0 14px #38a8ff);
  ${p.animation ? "transition:opacity .5s .5s;" : ""}
}
.uf-neon-glow-spark,.uf-neon-glow-tail { stroke-linecap:round; stroke-dashoffset:0; opacity:0; }
.uf-neon-glow-spark { stroke:#fff; stroke-dasharray:4 96; filter:drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px #38c8ff); }
.uf-neon-glow-tail { stroke:#38c8ff; stroke-dasharray:20 80; filter:blur(2px); }
${p.animation ? `.uf-neon-glow-toggle.uf-neon-glow-running .uf-neon-glow-spark,.uf-neon-glow-toggle.uf-neon-glow-running .uf-neon-glow-tail { animation:uf-neon-glow-race .8s cubic-bezier(.5,0,.4,1); }
@keyframes uf-neon-glow-race { 0% { opacity:1; stroke-dashoffset:0; } 92% { opacity:1; } 100% { opacity:0; stroke-dashoffset:-100; } }` : ""}
.uf-neon-glow-knob {
  position:absolute;
  top:12px;
  left:12px;
  width:76px;
  height:76px;
  box-sizing:border-box;
  border:3px solid #5b5a7c;
  border-radius:50%;
  background:#16151f;
  translate:0 0;
  ${p.animation ? "transition:translate .55s cubic-bezier(.5,-.15,.2,1.15),background .4s .45s,border-color .4s .45s,box-shadow .5s .45s;" : ""}
}
.uf-neon-glow-toggle[aria-checked="true"] { background:#10294a; box-shadow:0 0 44px 6px #38a8ff55,inset 0 2px 14px #0006; }
.uf-neon-glow-toggle[aria-checked="true"] .uf-neon-glow-neon { opacity:1; }
.uf-neon-glow-toggle[aria-checked="true"] .uf-neon-glow-knob {
  translate:100px 0;
  border-color:transparent;
  background:radial-gradient(circle,#fff 0,#9fe8ff 38%,#38c8ff 72%,#3f9bff);
  box-shadow:0 0 28px 8px #38c8ffaa,0 0 60px 14px #38a8ff55;
}
.uf-neon-glow-toggle:not([aria-checked="true"]),.uf-neon-glow-toggle:not([aria-checked="true"]) .uf-neon-glow-neon,.uf-neon-glow-toggle:not([aria-checked="true"]) .uf-neon-glow-knob { transition-delay:0s; }
@media (prefers-reduced-motion:reduce) { .uf-neon-glow-toggle,.uf-neon-glow-neon,.uf-neon-glow-knob { transition:none!important; } .uf-neon-glow-toggle.uf-neon-glow-running .uf-neon-glow-spark,.uf-neon-glow-toggle.uf-neon-glow-running .uf-neon-glow-tail { animation:none; } }`,
    js: `(function(){
  var toggle=document.querySelector('.uf-neon-glow-toggle'),timer;
  toggle.addEventListener('click',function(){
    var on=toggle.getAttribute('aria-checked')!=='true';
    toggle.setAttribute('aria-checked',on);
    clearTimeout(timer);
    toggle.classList.remove('uf-neon-glow-running');
    ${p.animation ? "if(on){void toggle.offsetWidth;toggle.classList.add('uf-neon-glow-running');timer=setTimeout(function(){toggle.classList.remove('uf-neon-glow-running');},900);}" : ""}
  });
})();`,
  }),
};
