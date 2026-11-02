import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft, ChevronRight, Copy, Download, Expand, Heart, Maximize, Monitor, RotateCcw, Share2, Smartphone, Shrink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  categoryLabel, itemsOf, paramsFor, toDocument, toReact, type Item, type Params, type Size,
} from "@/lib/catalog";
import { copyText, downloadText } from "@/lib/download";
import { CodeBlock } from "./CodeBlock";
import { ItemCard, ItemLink } from "./ItemCard";
import { Preview } from "./Preview";
import { useFavorites } from "@/hooks/use-favorites";

const SWATCHES = ["#8B5CF6", "#EC4899", "#6366F1", "#3B82F6", "#22D3EE", "#34D399", "#FBBF24", "#F97316", "#F87171"];
const BGS = ["#0B0F1E", "#141A2E", "#000000", "#1E1B4B", "#F8FAFC"];

type Tab = "react" | "html" | "css" | "js";

function ColorRow({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono">{value.toUpperCase()}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {options.map((c) => (
          <button
            key={c}
            aria-label={`${label} ${c}`}
            onClick={() => onChange(c)}
            className={"size-6 rounded-full border transition-transform hover:scale-110 " + (value.toLowerCase() === c.toLowerCase() ? "border-foreground ring-2 ring-primary ring-offset-2 ring-offset-card" : "border-border")}
            style={{ background: c }}
          />
        ))}
        <label className="relative size-6 cursor-pointer overflow-hidden rounded-full border border-dashed border-muted-foreground" title="Custom color">
          <input type="color" value={value.slice(0, 7)} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0" aria-label={`Custom ${label}`} />
        </label>
      </div>
    </div>
  );
}

function SliderRow({ label, value, min, max, step = 1, unit = "", onChange }: { label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono">{value}{unit}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} aria-label={label} />
    </div>
  );
}

export function Playground({ item, backTo }: { item: Item; backTo: { href: "/components" | "/backgrounds" | "/effects"; label: string } }) {
  const defaults = useMemo(() => paramsFor(item), [item]);
  const [p, setP] = useState<Params>(defaults);
  const [tab, setTab] = useState<Tab>("react");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [expanded, setExpanded] = useState(false);
  const [nonce, setNonce] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const { isFav, toggle } = useFavorites();

  useEffect(() => setP(defaults), [defaults]);

  const set = <K extends keyof Params>(k: K, v: Params[K]) => setP((s) => ({ ...s, [k]: v }));
  const has = (k: keyof Params) => item.controls.includes(k);

  const built = useMemo(() => item.build(p), [item, p]);
  const react = useMemo(() => toReact(item.name, built), [item.name, built]);
  const tabs: { id: Tab; label: string; code: string; lang: "jsx" | "html" | "css" | "js"; ext: string }[] = [
    { id: "react", label: "React", code: react, lang: "jsx", ext: "jsx" },
    { id: "html", label: "HTML", code: built.html, lang: "html", ext: "html" },
    { id: "css", label: "CSS", code: built.css.replace(/\n\s*\n/g, "\n").replace(/^\s+\n/gm, ""), lang: "css", ext: "css" },
    ...(built.js ? [{ id: "js" as Tab, label: "JavaScript", code: built.js, lang: "js" as const, ext: "js" }] : []),
  ];
  const current = tabs.find((t) => t.id === tab) ?? tabs[0];
  const fileBase = item.slug;

  const siblings = itemsOf(item.kind);
  const idx = siblings.findIndex((s) => s.slug === item.slug);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  const related = siblings.filter((s) => s.category === item.category && s.slug !== item.slug).concat(siblings.filter((s) => s.category !== item.category)).slice(0, 3);
  const fav = isFav(item.kind + ":" + item.slug);

  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else stageRef.current?.requestFullscreen?.();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to={backTo.href} className="flex items-center gap-1 hover:text-foreground"><ChevronLeft className="size-4" />{backTo.label}</Link>
        <span>/</span>
        <span>{categoryLabel(item.kind, item.category)}</span>
        <span>/</span>
        <span className="text-foreground">{item.name}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{item.name}</h1>
          <p className="mt-1 text-muted-foreground">{item.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="subtle" size="sm" onClick={() => toggle(item.kind + ":" + item.slug)} aria-pressed={fav}>
            <Heart className={fav ? "fill-primary text-primary" : ""} /> {fav ? "Saved" : "Save"}
          </Button>
          <Button variant="subtle" size="sm" onClick={() => copyText(window.location.href, "Link copied")}>
            <Share2 /> Share
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div ref={stageRef} className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
            <div className="flex rounded-lg border border-border p-0.5">
              {(["desktop", "mobile"] as const).map((d) => (
                <button key={d} onClick={() => setDevice(d)} aria-label={`${d} preview`} aria-pressed={device === d}
                  className={"rounded-md p-1.5 " + (device === d ? "bg-elevated text-foreground" : "text-muted-foreground")}>
                  {d === "desktop" ? <Monitor className="size-4" /> : <Smartphone className="size-4" />}
                </button>
              ))}
            </div>
            <div className="ml-2 flex items-center gap-1.5" role="group" aria-label="Preview background">
              {BGS.map((b) => (
                <button key={b} onClick={() => set("bg", b)} aria-label={`Background ${b}`}
                  className={"size-5 rounded border " + (p.bg === b ? "ring-2 ring-primary" : "border-border")} style={{ background: b }} />
              ))}
            </div>
            <div className="ml-auto flex gap-1">
              <Button variant="ghost" size="icon" aria-label="Reset" onClick={() => { setP(defaults); setNonce((n) => n + 1); }}><RotateCcw /></Button>
              <Button variant="ghost" size="icon" aria-label="Fullscreen" onClick={fullscreen}><Maximize /></Button>
            </div>
          </div>
          <div className="grid-bg flex h-[420px] items-center justify-center p-4 [:fullscreen_&]:h-[calc(100vh-50px)]">
            <div className={"h-full overflow-hidden rounded-lg border border-border transition-all " + (device === "mobile" ? "w-[375px] max-w-full" : "w-full")}>
              <Preview key={nonce} built={built} bg={p.bg} title={item.name} />
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-5">
          <h2 className="mb-5 font-semibold">Customize</h2>
          <div className="grid gap-5">
            {has("primary") && <ColorRow label="Primary color" value={p.primary} onChange={(v) => set("primary", v)} options={SWATCHES} />}
            {has("secondary") && <ColorRow label="Secondary color" value={p.secondary} onChange={(v) => set("secondary", v)} options={SWATCHES} />}
            {has("bg") && <ColorRow label="Background" value={p.bg} onChange={(v) => set("bg", v)} options={BGS} />}
            {has("size") && (
              <div>
                <div className="mb-2 text-xs text-muted-foreground">Size</div>
                <div className="grid grid-cols-3 rounded-lg border border-border p-0.5">
                  {(["sm", "md", "lg"] as Size[]).map((s) => (
                    <button key={s} onClick={() => set("size", s)} aria-pressed={p.size === s}
                      className={"rounded-md py-1 text-xs font-medium uppercase " + (p.size === s ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            {has("radius") && <SliderRow label="Border radius" value={p.radius} min={0} max={32} unit="px" onChange={(v) => set("radius", v)} />}
            {has("weight") && <SliderRow label="Font weight" value={p.weight} min={400} max={800} step={100} onChange={(v) => set("weight", v)} />}
            {has("padding") && <SliderRow label={item.kind === "background" ? "Pattern size" : "Padding"} value={p.padding} min={8} max={64} unit="px" onChange={(v) => set("padding", v)} />}
            {has("speed") && <SliderRow label={item.kind === "component" ? "Spin duration" : "Speed / duration"} value={p.speed} min={1} max={20} unit={item.slug === "particle-background" ? "" : item.kind === "component" ? "s" : ""} onChange={(v) => set("speed", v)} />}
            {has("intensity") && <SliderRow label="Intensity" value={p.intensity} min={5} max={100} onChange={(v) => set("intensity", v)} />}
            {has("shadow") && (
              <label className="flex items-center justify-between text-sm">Shadow <Switch checked={p.shadow} onCheckedChange={(v) => set("shadow", v)} /></label>
            )}
            {has("animation") && (
              <label className="flex items-center justify-between text-sm">Animation <Switch checked={p.animation} onCheckedChange={(v) => set("animation", v)} /></label>
            )}
          </div>
        </aside>
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} aria-pressed={current.id === t.id}
              className={"rounded-md px-3 py-1.5 text-sm " + (current.id === t.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground")}>{t.label}</button>
          ))}
          <div className="ml-auto flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setExpanded((e) => !e)}>{expanded ? <Shrink /> : <Expand />}{expanded ? "Collapse" : "Expand"}</Button>
            <Button variant="ghost" size="sm" onClick={() => downloadText(toDocument(built, p.bg, item.name), `${fileBase}.html`, "text/html")}><Download /> Full HTML</Button>
            <Button variant="ghost" size="sm" onClick={() => downloadText(current.code, `${fileBase}.${current.ext}`)}><Download /> File</Button>
            <Button variant="hero" size="sm" onClick={() => copyText(current.code)}><Copy /> Copy</Button>
          </div>
        </div>
        <CodeBlock code={current.code} lang={current.lang} maxH={expanded ? undefined : "380px"} />
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-3 font-semibold">How to use</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Adjust the controls until the preview looks right.</li>
            <li><strong className="text-foreground">Plain HTML:</strong> paste the HTML into your page, the CSS into a stylesheet{built.js ? ", and the JavaScript at the end of the body" : ""}. Or download the full HTML file.</li>
            <li><strong className="text-foreground">React:</strong> save the React tab as a component and the CSS tab next to it as <code className="font-mono text-xs">{item.name.replace(/[^a-zA-Z0-9]/g, "")}.css</code>.</li>
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">No dependencies needed. Animations respect the visitor's reduced-motion setting.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-3 font-semibold">Customizable properties</h2>
          <table className="w-full text-left text-sm">
            <tbody>
              {item.controls.map((c) => (
                <tr key={c} className="border-t border-border first:border-0">
                  <td className="py-2 font-mono text-xs text-primary">{c}</td>
                  <td className="py-2 text-right font-mono text-xs text-muted-foreground">{String(p[c])}</td>
                </tr>
              ))}
              {item.props?.map(([n, t, d]) => (
                <tr key={n} className="border-t border-border">
                  <td className="py-2 font-mono text-xs text-primary">{n}</td>
                  <td className="py-2 text-right text-xs text-muted-foreground">{t} — {d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Related</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <ItemCard key={r.slug} item={r} />)}
        </div>
      </section>

      <div className="mt-10 flex justify-between gap-4">
        <ItemLink item={prev} className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm hover:border-primary"><ChevronLeft className="size-4" /> {prev.name}</ItemLink>
        <ItemLink item={next} className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm hover:border-primary">{next.name} <ChevronRight className="size-4" /></ItemLink>
      </div>
    </div>
  );
}
