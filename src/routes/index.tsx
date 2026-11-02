import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Box, ChevronDown, CreditCard, Layers, MousePointer2, MousePointerClick, Search, Sparkles, Tag, TextCursorInput, Wand2, Code2, Copy, SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/site/ItemCard";
import { useOpenSearch } from "@/components/site/Shell";
import { backgroundItems, componentItems, effectItems, ALL_ITEMS } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UIForge — Build Beautiful Interfaces, Faster" },
      { name: "description", content: "Copy-ready UI components, backgrounds and interactive effects for React, HTML, CSS and JavaScript — with live, customizable previews." },
      { property: "og:title", content: "UIForge — Build Beautiful Interfaces, Faster" },
      { property: "og:description", content: "Copy-ready UI components, backgrounds and interactive effects with live, customizable previews." },
    ],
  }),
  component: Home,
});

const count = (cat: string) => componentItems.filter((i) => i.category === cat).length;

function Home() {
  const openSearch = useOpenSearch();
  const categories = [
    { icon: MousePointerClick, name: "Buttons", desc: "Gradient, outline, shine", n: count("buttons"), to: "/components" as const },
    { icon: ChevronDown, name: "Dropdowns", desc: "Accessible select menus", n: count("dropdowns"), to: "/components" as const },
    { icon: CreditCard, name: "Cards", desc: "Glass and content cards", n: count("cards"), to: "/components" as const },
    { icon: TextCursorInput, name: "Inputs", desc: "Floating labels, search", n: count("inputs"), to: "/components" as const },
    { icon: Tag, name: "Badges", desc: "Counters and pings", n: count("badges"), to: "/components" as const },
    { icon: Layers, name: "Backgrounds", desc: "Gradients and patterns", n: backgroundItems.length, to: "/backgrounds" as const },
    { icon: Sparkles, name: "Hover Effects", desc: "Lift, glow, neon", n: effectItems.filter((e) => e.category === "hover" || e.category === "card").length, to: "/effects" as const },
    { icon: MousePointer2, name: "Mouse Effects", desc: "Follow, trail, parallax", n: effectItems.filter((e) => ["mouse", "cursor"].includes(e.category)).length, to: "/effects" as const },
    { icon: Wand2, name: "Animations", desc: "Reveal, scroll, ripple", n: effectItems.filter((e) => ["text", "scroll", "button"].includes(e.category)).length, to: "/effects" as const },
  ];
  const featured = componentItems.filter((i) => i.featured);
  const recent = [...ALL_ITEMS].sort((a, b) => b.added - a.added).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[720px] rounded-full bg-primary/20 blur-[120px]" />
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-foreground">
              <Sparkles className="size-3.5 text-primary" /> A Modern UI Component Library
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Build Beautiful Interfaces Faster with <span className="text-gradient">UIForge</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              A curated collection of beautifully crafted UI components, backgrounds and interactive effects for React, Tailwind CSS and plain HTML/CSS/JS.
            </p>
            <button onClick={openSearch} className="mt-8 flex w-full max-w-lg items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-left text-sm text-muted-foreground transition-colors hover:border-primary/60">
              <Search className="size-4" /> Search components, effects, backgrounds...
              <kbd className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[11px]">Ctrl K</kbd>
            </button>
            <div className="mt-5 flex flex-wrap gap-2">
              {["React", "Tailwind CSS", "HTML", "CSS", "JavaScript"].map((t) => (
                <span key={t} className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg"><Link to="/components">Browse Components <ArrowRight /></Link></Button>
              <Button asChild variant="subtle" size="lg"><Link to="/effects">Explore Effects</Link></Button>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Section title="Popular Categories" link={{ to: "/components", label: "View all" }}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9">
          {categories.map((c) => (
            <Link key={c.name} to={c.to} className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/60">
              <c.icon className="size-5 text-primary transition-transform group-hover:scale-110" />
              <div className="mt-3 text-sm font-semibold">{c.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{c.desc}</div>
              <div className="mt-2 font-mono text-[11px] text-cyan">{c.n} {c.n === 1 ? "entry" : "entries"}</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Featured Components" link={{ to: "/components", label: "All components" }}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((i) => <ItemCard key={i.slug} item={i} />)}</div>
      </Section>

      <Section title="Backgrounds" link={{ to: "/backgrounds", label: "All backgrounds" }}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{backgroundItems.filter((b) => b.featured).map((i) => <ItemCard key={i.slug} item={i} />)}</div>
      </Section>

      <Section title="Interactive Effects" link={{ to: "/effects", label: "All effects" }}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{effectItems.filter((b) => b.featured).map((i) => <ItemCard key={i.slug} item={i} tall />)}</div>
      </Section>

      <Section title="Recently Added">
        <div className="grid gap-5 sm:grid-cols-3">{recent.map((i) => <ItemCard key={i.kind + i.slug} item={i} />)}</div>
      </Section>

      <Section title="Why UIForge?">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: SlidersHorizontal, t: "Customize live", d: "Colors, sizes, radius and motion update the preview instantly." },
            { icon: Code2, t: "Real code, four ways", d: "The code you copy is exactly what renders — React, HTML, CSS and JS." },
            { icon: Copy, t: "Zero dependencies", d: "Paste and go. No packages to install, no build step required." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border border-border bg-card p-6">
              <f.icon className="size-5 text-cyan" />
              <h3 className="mt-4 font-semibold">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-10 text-center sm:p-14">
          <div aria-hidden className="absolute inset-0 bg-brand opacity-15" />
          <div className="relative">
            <Box className="mx-auto size-8 text-primary" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Start building with {ALL_ITEMS.length} ready-made pieces</h2>
            <p className="mx-auto mt-2 max-w-lg text-muted-foreground">Pick one, tune it, copy it. That's it.</p>
            <Button asChild variant="hero" size="lg" className="mt-6"><Link to="/components">Get Started <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, link, children }: { title: string; link?: { to: "/components" | "/backgrounds" | "/effects"; label: string }; children: React.ReactNode }) {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {link && <Link to={link.to} className="flex items-center gap-1 text-sm text-primary hover:underline">{link.label} <ArrowRight className="size-3.5" /></Link>}
      </div>
      {children}
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[520px]" aria-hidden>
      <div className="float-slow absolute left-0 top-6 w-[78%] overflow-hidden rounded-xl border border-border bg-code shadow-card [--rot:-3deg]">
        <div className="flex gap-1.5 border-b border-border px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-destructive" /><span className="size-2.5 rounded-full bg-warning" /><span className="size-2.5 rounded-full bg-success" />
          <span className="ml-3 font-mono text-[11px] text-tok-com">GradientButton.jsx</span>
        </div>
        <pre className="p-4 font-mono text-[12px] leading-6 text-code-foreground">
<span className="text-tok-key">export default function</span> <span className="text-tok-tag">Button</span>() {"{"}{"\n"}
{"  "}<span className="text-tok-key">return</span> ({"\n"}
{"    "}<span className="text-tok-tag">&lt;button</span> <span className="text-tok-key">className</span>=<span className="text-tok-str">"uf-grad-btn"</span><span className="text-tok-tag">&gt;</span>{"\n"}
{"      "}Get Started →{"\n"}
{"    "}<span className="text-tok-tag">&lt;/button&gt;</span>{"\n"}
{"  "});{"\n"}
{"}"}
        </pre>
      </div>
      <div className="float-slow absolute bottom-6 right-0 w-[62%] rounded-xl border border-border bg-card/90 p-5 shadow-card backdrop-blur [--rot:3deg] [animation-delay:-3s]">
        <div className="mb-3 text-xs font-medium text-muted-foreground">Customize</div>
        <div className="flex gap-2">
          {["bg-primary", "bg-cyan", "bg-success", "bg-warning", "bg-destructive"].map((c) => <span key={c} className={`size-5 rounded-full ${c}`} />)}
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-elevated"><div className="h-full w-2/3 rounded-full bg-brand" /></div>
        <div className="mt-5 flex justify-center">
          <span className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground glow">Get Started →</span>
        </div>
      </div>
      <div className="float-slow absolute right-6 top-0 grid size-16 place-items-center rounded-2xl border border-primary/40 bg-primary/15 backdrop-blur [animation-delay:-1.5s]">
        <Code2 className="size-7 text-primary" />
      </div>
    </div>
  );
}
