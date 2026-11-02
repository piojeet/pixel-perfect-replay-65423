import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, itemsOf, searchItems, type Kind } from "@/lib/catalog";
import { Chip, ItemCard } from "./ItemCard";

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">{eyebrow}</p>}
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
    </div>
  );
}

export function SearchField({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-muted-foreground focus-within:border-primary">
      <Search className="size-4" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
    </label>
  );
}

export function Gallery({ kind, title, description }: { kind: Exclude<Kind, "component">; title: string; description: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const all = itemsOf(kind);
  const cats = CATEGORIES[kind].filter((c) => all.some((i) => i.category === c.slug));
  const list = useMemo(() => searchItems(q, all).filter((i) => cat === "all" || i.category === cat), [q, cat, all]);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader eyebrow={`${all.length} ${kind === "background" ? "backgrounds" : "effects"}`} title={title} description={description} />
      <SearchField value={q} onChange={setQ} placeholder={`Search ${kind === "background" ? "backgrounds" : "effects"}...`} />
      <div className="mt-5 flex flex-wrap gap-2">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>All</Chip>
        {cats.map((c) => (
          <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.label}</Chip>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((i) => <ItemCard key={i.slug} item={i} tall={kind === "effect"} />)}
      </div>
      {list.length === 0 && <p className="mt-16 text-center text-muted-foreground">No matches. Try another word or filter.</p>}
    </div>
  );
}
