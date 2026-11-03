import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, componentItems, searchItems } from "@/lib/catalog";
import { ItemCard } from "@/components/site/ItemCard";
import { PageHeader, SearchField } from "@/components/site/Gallery";

export const Route = createFileRoute("/components/")({
  head: () => ({
    meta: [
      { title: "Explore Components — UIForge" },
      { name: "description", content: "Browse buttons, cards, inputs, dropdowns, modals and more — with live previews and copy-ready code." },
      { property: "og:title", content: "Explore Components — UIForge" },
      { property: "og:description", content: "Browse buttons, cards, inputs, dropdowns, modals and more — with live previews and copy-ready code." },
    ],
  }),
  component: ComponentsPage,
});

function ComponentsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "az">("newest");
  const cats = CATEGORIES.component.map((c) => ({ ...c, count: componentItems.filter((i) => i.category === c.slug).length }));
  const list = useMemo(() => {
    const l = searchItems(q, componentItems).filter((i) => cat === "all" || i.category === cat);
    return [...l].sort((a, b) => (sort === "az" ? a.name.localeCompare(b.name) : sort === "newest" ? b.added - a.added : a.added - b.added));
  }, [q, cat, sort]);

  const btn = (active: boolean) =>
    "flex w-auto shrink-0 items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors lg:w-full " +
    (active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader eyebrow={`${componentItems.length} components`} title="Explore Components" description="Discover beautifully crafted components ready for your next project." />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit">
          <p className="mb-2 px-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Categories</p>
          <div className="flex gap-1 overflow-x-auto pb-2 lg:grid lg:overflow-visible">
            <button className={btn(cat === "all")} onClick={() => setCat("all")}>
              All Components <span className="ml-3 font-mono text-xs">{componentItems.length}</span>
            </button>
            {cats.map((c) => (
              <button key={c.slug} className={btn(cat === c.slug) + " shrink-0"} onClick={() => setCat(c.slug)}>
                {c.label} <span className="ml-3 font-mono text-xs">{c.count}</span>
              </button>
            ))}
          </div>
        </aside>
        <div className="min-w-0">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="w-full min-w-0 flex-1"><SearchField value={q} onChange={setQ} placeholder="Search components..." /></div>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sort"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus:border-primary sm:w-auto">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="az">Name A–Z</option>
            </select>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">Showing {list.length} of {componentItems.length}</p>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((i) => <ItemCard key={i.slug} item={i} />)}
          </div>
          {list.length === 0 && <p className="mt-16 text-center text-muted-foreground">No components match that search.</p>}
        </div>
      </div>
    </div>
  );
}
