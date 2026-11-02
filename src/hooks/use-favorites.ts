import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const KEY = "uf-favorites";

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    try {
      setFavs(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch {
      setFavs([]);
    }
  }, []);
  const toggle = useCallback((id: string) => {
    setFavs((f) => {
      const next = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      toast.success(f.includes(id) ? "Removed from saved" : "Saved to your list");
      return next;
    });
  }, []);
  return { favs, isFav: (id: string) => favs.includes(id), toggle };
}
