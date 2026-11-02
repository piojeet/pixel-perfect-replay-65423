import { Link } from "@tanstack/react-router";
import { useMemo, type ReactNode } from "react";
import { Copy, ArrowUpRight } from "lucide-react";
import { categoryLabel, paramsFor, type Item } from "@/lib/catalog";
import { copyText } from "@/lib/download";
import { Preview } from "./Preview";

export function ItemLink({ item, className, children }: { item: Item; className?: string; children: ReactNode }) {
  if (item.kind === "component")
    return (
      <Link to="/components/$category/$slug" params={{ category: item.category, slug: item.slug }} className={className}>
        {children}
      </Link>
    );
  if (item.kind === "background")
    return (
      <Link to="/backgrounds/$slug" params={{ slug: item.slug }} className={className}>
        {children}
      </Link>
    );
  return (
    <Link to="/effects/$slug" params={{ slug: item.slug }} className={className}>
      {children}
    </Link>
  );
}

export function ItemCard({ item, tall }: { item: Item; tall?: boolean }) {
  const p = useMemo(() => paramsFor(item), [item]);
  const built = useMemo(() => item.build(p), [item, p]);
  const copyable = item.kind === "background" ? built.css : [built.html, `<style>\n${built.css}\n</style>`, built.js ? `<script>\n${built.js}\n</script>` : ""].filter(Boolean).join("\n\n");
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-card">
      <div className={tall ? "h-56" : "h-44"}>
        <Preview built={built} bg={p.bg} title={item.name} interactive={item.kind !== "background"} />
      </div>
      <div className="flex items-start gap-3 border-t border-border p-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] text-accent-foreground">{categoryLabel(item.kind, item.category)}</span>
            {item.kind === "component" && <span className="text-[11px] text-muted-foreground">HTML · CSS{built.js ? " · JS" : ""} · React</span>}
          </div>
          <h3 className="truncate text-sm font-semibold">
            <ItemLink item={item} className="after:absolute after:inset-x-0 after:bottom-0 after:top-[inherit] focus-visible:outline-none">
              {item.name}
            </ItemLink>
          </h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
        </div>
        <div className="relative z-10 flex gap-1">
          <button
            onClick={() => copyText(copyable, item.kind === "background" ? "CSS copied" : "Code copied")}
            className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            aria-label={`Copy ${item.name} code`}
          >
            <Copy className="size-3.5" />
          </button>
          <ItemLink item={item} className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
            <ArrowUpRight className="size-3.5" aria-label="View details" />
          </ItemLink>
        </div>
      </div>
    </article>
  );
}

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={
        "rounded-full border px-4 py-1.5 text-sm transition-colors " +
        (active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
