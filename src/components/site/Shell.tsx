import { Link, useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Menu, Moon, Search, Sun, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ALL_ITEMS, categoryLabel, type Item } from "@/lib/catalog";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
      <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        <path d="M16 2 29 9.5v13L16 30 3 22.5v-13z" fill="url(#lg)" />
        <path d="M16 9 23 13v6l-7 4-7-4v-6z" fill="var(--background)" opacity=".85" />
      </svg>
      <span className="text-lg">UIForge</span>
    </Link>
  );
}

const SearchCtx = createContext<() => void>(() => {});
export const useOpenSearch = () => useContext(SearchCtx);

function goTo(navigate: ReturnType<typeof useNavigate>, item: Item) {
  if (item.kind === "component")
    navigate({ to: "/components/$category/$slug", params: { category: item.category, slug: item.slug } });
  else if (item.kind === "background") navigate({ to: "/backgrounds/$slug", params: { slug: item.slug } });
  else navigate({ to: "/effects/$slug", params: { slug: item.slug } });
}

function SearchDialog({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const navigate = useNavigate();
  const groups: [string, Item["kind"]][] = [
    ["Components", "component"],
    ["Backgrounds", "background"],
    ["Effects", "effect"],
  ];
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search components, backgrounds, effects..." />
      <CommandList>
        <CommandEmpty>Nothing matches that search.</CommandEmpty>
        {groups.map(([label, kind]) => (
          <CommandGroup key={kind} heading={label}>
            {ALL_ITEMS.filter((i) => i.kind === kind).map((i) => (
              <CommandItem
                key={i.kind + i.slug}
                value={`${i.name} ${i.category} ${i.description}`}
                onSelect={() => {
                  setOpen(false);
                  goTo(navigate, i);
                }}
              >
                <span>{i.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{categoryLabel(i.kind, i.category)}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/components", label: "Components" },
  { to: "/backgrounds", label: "Backgrounds" },
  { to: "/effects", label: "Effects" },
  { to: "/about", label: "About" },
] as const;

function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    setLight(localStorage.getItem("uf-theme") === "light");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      onClick={() => {
        const next = !light;
        setLight(next);
        localStorage.setItem("uf-theme", next ? "light" : "dark");
      }}
    >
      {light ? <Moon /> : <Sun />}
    </Button>
  );
}

function Navbar({ onSearch }: { onSearch: () => void }) {
  const [mobile, setMobile] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: "exact" in n }}
              className="relative px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:after:absolute data-[status=active]:after:inset-x-3 data-[status=active]:after:-bottom-[13px] data-[status=active]:after:h-0.5 data-[status=active]:after:bg-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={onSearch}
            className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:flex"
          >
            <Search className="size-4" /> Search
            <kbd className="ml-6 rounded border border-border px-1.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Search" onClick={onSearch}>
            <Search />
          </Button>
          <ThemeToggle />
          <Button asChild variant="hero" size="sm" className="ml-2 hidden sm:inline-flex">
            <Link to="/components">Get Started</Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu" onClick={() => setMobile(!mobile)}>
            {mobile ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {mobile && (
        <nav className="grid gap-1 border-t border-border px-4 py-3 lg:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMobile(false)}
              activeOptions={{ exact: "exact" in n }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground data-[status=active]:bg-accent data-[status=active]:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Build beautiful interfaces, faster. Copy-ready components, backgrounds and effects.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Library</h4>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li><Link to="/components" className="hover:text-foreground">Components</Link></li>
            <li><Link to="/backgrounds" className="hover:text-foreground">Backgrounds</Link></li>
            <li><Link to="/effects" className="hover:text-foreground">Effects</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Project</h4>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li className="flex items-center gap-1.5"><Github className="size-3.5" /> Open source friendly</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} UIForge</div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <SearchCtx.Provider value={() => setOpen(true)}>
      <div className="flex min-h-screen flex-col">
        <Navbar onSearch={() => setOpen(true)} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <SearchDialog open={open} setOpen={setOpen} />
    </SearchCtx.Provider>
  );
}
