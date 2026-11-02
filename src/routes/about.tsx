import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, GitBranch, Layers, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_ITEMS } from "@/lib/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — UIForge" },
      { name: "description", content: "Why UIForge exists: reusable, readable UI code that makes interface work faster and more enjoyable." },
      { property: "og:title", content: "About UIForge" },
      { property: "og:description", content: "Reusable, readable UI code that makes interface work faster and more enjoyable." },
    ],
  }),
  component: About,
});

// Set this to your repository URL to show the GitHub button.
const GITHUB_URL = "";

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
        <div>
          <span className="inline-flex rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs">About UIForge</span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Built for Developers, <span className="text-gradient">by a Developer.</span></h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            UIForge is a developer-focused platform designed to make UI development faster, easier and more enjoyable through reusable components, backgrounds and interactive effects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/components">Browse Components <ArrowRight /></Link></Button>
            {GITHUB_URL && <Button asChild variant="subtle" size="lg"><a href={GITHUB_URL} target="_blank" rel="noreferrer"><GitBranch /> GitHub</a></Button>}
          </div>
        </div>
        <div className="relative mx-auto grid size-64 place-items-center" aria-hidden>
          <div className="absolute inset-0 rounded-3xl bg-brand opacity-30 blur-3xl" />
          <div className="float-slow relative grid size-48 place-items-center rounded-3xl border border-primary/40 bg-card shadow-card [--rot:-6deg]">
            <Code2 className="size-16 text-primary" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { icon: GitBranch, t: "Open Source", d: "Free to use and contribute. Copy any snippet into personal or client work." },
          { icon: Code2, t: "Developer Friendly", d: "Clean, accessible and customizable source code with no hidden dependencies." },
          { icon: Sprout, t: "Continuously Growing", d: "An organized library that can expand with real contributions." },
        ].map((v) => (
          <div key={v.t} className="rounded-xl border border-border bg-card p-6">
            <v.icon className="size-6 text-cyan" />
            <h3 className="mt-4 text-lg font-semibold">{v.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-3xl space-y-12">
        <Block title="Making UI Development More Accessible">
          Good interface details — a smooth dropdown, a focus ring that actually shows, a hover that feels right — take time to get right. UIForge collects those details into small, readable pieces so you can spend your time on the parts of your product that are unique.
        </Block>
        <Block title="Our Story">
          UIForge started as a personal toolbox: the snippets that kept getting rewritten from project to project. Turning them into a browsable, customizable library made them useful to more people than just the person who wrote them.
        </Block>
        <Block title="Development Philosophy">
          Every entry renders from the same code you copy. No screenshots, no mockups. Snippets favor native HTML elements, keyboard support, and respect for reduced-motion settings. Today the library holds {ALL_ITEMS.length} entries, and each one is meant to be read and changed, not treated as a black box.
        </Block>
        <Block title="Contributing">
          Have a component you keep rebuilding? Ideas, fixes and new entries are welcome. Keep it dependency-free, accessible, and small enough to understand at a glance.
        </Block>
      </section>

      <section className="mt-20 rounded-2xl border border-border bg-card p-10 text-center">
        <Layers className="mx-auto size-7 text-primary" />
        <h2 className="mt-4 text-2xl font-semibold">Ready to build something?</h2>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild variant="hero"><Link to="/components">Components</Link></Button>
          <Button asChild variant="subtle"><Link to="/effects">Effects</Link></Button>
        </div>
      </section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 leading-7 text-muted-foreground">{children}</p>
    </div>
  );
}
