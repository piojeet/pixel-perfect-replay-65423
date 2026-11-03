import { componentItems } from "./components";
import { backgroundItems } from "./backgrounds";
import { effectItems } from "./effects";
import type { Item, Kind } from "./types";

export * from "./types";

export const CATEGORIES: Record<Kind, { slug: string; label: string; description: string }[]> = {
  component: [
    { slug: "buttons", label: "Buttons", description: "Clickable actions with style" },
    { slug: "dropdowns", label: "Dropdowns", description: "Select menus and pickers" },
    { slug: "cards", label: "Cards", description: "Content containers" },
    { slug: "inputs", label: "Inputs", description: "Text fields and search" },
    { slug: "toggles", label: "Toggles", description: "Interactive on/off switches" },
    { slug: "badges", label: "Badges", description: "Counters and labels" },
    { slug: "alerts", label: "Alerts", description: "Status messages" },
    { slug: "toasts", label: "Toasts", description: "Temporary notification messages" },
    { slug: "avatars", label: "Avatars", description: "User pictures and groups" },
    { slug: "tooltips", label: "Tooltips", description: "Hints on hover" },
    { slug: "navigation", label: "Navigation Bars", description: "Menus and navbars" },
    { slug: "modals", label: "Modals", description: "Dialogs and overlays" },
    { slug: "tabs", label: "Tabs", description: "Switchable panels" },
    { slug: "accordions", label: "Accordions", description: "Collapsible sections" },
    { slug: "loaders", label: "Loaders", description: "Loading indicators" },
  ],
  background: [
    { slug: "gradients", label: "Gradients", description: "" },
    { slug: "animated", label: "Animated", description: "" },
    { slug: "mesh", label: "Mesh", description: "" },
    { slug: "patterns", label: "Patterns", description: "" },
    { slug: "blur", label: "Blur", description: "" },
    { slug: "grid", label: "Grid", description: "" },
    { slug: "waves", label: "Waves", description: "" },
    { slug: "aurora", label: "Aurora", description: "" },
  ],
  effect: [
    { slug: "hover", label: "Hover", description: "" },
    { slug: "mouse", label: "Mouse", description: "" },
    { slug: "cursor", label: "Cursor", description: "" },
    { slug: "scroll", label: "Scroll", description: "" },
    { slug: "text", label: "Text", description: "" },
    { slug: "card", label: "Card", description: "" },
    { slug: "button", label: "Button", description: "" },
  ],
};

export const ALL_ITEMS: Item[] = [...componentItems, ...backgroundItems, ...effectItems];
export { componentItems, backgroundItems, effectItems };

export const itemsOf = (kind: Kind) => ALL_ITEMS.filter((i) => i.kind === kind);

export function categoryLabel(kind: Kind, slug: string) {
  return CATEGORIES[kind].find((c) => c.slug === slug)?.label ?? slug;
}

export function findItem(kind: Kind, slug: string) {
  return ALL_ITEMS.find((i) => i.kind === kind && i.slug === slug);
}

export function itemLink(item: Item): { to: string; params: Record<string, string> } {
  if (item.kind === "component")
    return { to: "/components/$category/$slug", params: { category: item.category, slug: item.slug } };
  if (item.kind === "background") return { to: "/backgrounds/$slug", params: { slug: item.slug } };
  return { to: "/effects/$slug", params: { slug: item.slug } };
}

export function searchItems(q: string, list: Item[] = ALL_ITEMS) {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((i) =>
    [i.name, i.description, i.category, categoryLabel(i.kind, i.category)].some((t) => t.toLowerCase().includes(s)),
  );
}
