import { useMemo } from "react";
import { toDocument, type Built } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/** Renders the exact HTML/CSS/JS shown in the code tabs inside a sandboxed iframe. */
export function Preview({
  built,
  bg,
  title,
  className,
  interactive = true,
}: {
  built: Built;
  bg: string;
  title: string;
  className?: string;
  interactive?: boolean;
}) {
  const doc = useMemo(() => toDocument(built, bg, title), [built, bg, title]);
  return (
    <iframe
      title={`${title} preview`}
      srcDoc={doc}
      sandbox="allow-scripts allow-modals"
      loading="lazy"
      className={cn("block h-full w-full border-0", !interactive && "pointer-events-none", className)}
    />
  );
}
