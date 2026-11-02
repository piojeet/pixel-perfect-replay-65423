export type Size = "sm" | "md" | "lg";

export interface Params {
  primary: string;
  secondary: string;
  bg: string;
  size: Size;
  radius: number;
  weight: number;
  shadow: boolean;
  animation: boolean;
  padding: number;
  speed: number;
  intensity: number;
}

export type ControlKey = keyof Params;

export type Kind = "component" | "background" | "effect";

export interface Built {
  html: string;
  css: string;
  js?: string;
}

export interface Item {
  slug: string;
  name: string;
  kind: Kind;
  category: string; // slug
  description: string;
  controls: ControlKey[];
  defaults?: Partial<Params>;
  build: (p: Params) => Built;
  props?: [string, string, string][];
  added: number; // order of addition, higher = newer
  featured?: boolean;
}

export const BASE_PARAMS: Params = {
  primary: "#8B5CF6",
  secondary: "#22D3EE",
  bg: "#0B0F1E",
  size: "md",
  radius: 12,
  weight: 600,
  shadow: true,
  animation: true,
  padding: 24,
  speed: 8,
  intensity: 70,
};

export const SIZES: Record<Size, { py: number; px: number; fs: number }> = {
  sm: { py: 8, px: 16, fs: 13 },
  md: { py: 12, px: 24, fs: 15 },
  lg: { py: 16, px: 32, fs: 17 },
};

/** hex + alpha (0-1) -> 8-digit hex */
export function alpha(hex: string, a: number) {
  const v = Math.round(Math.max(0, Math.min(1, a)) * 255)
    .toString(16)
    .padStart(2, "0");
  return hex.slice(0, 7) + v;
}

export function paramsFor(item: Item): Params {
  return { ...BASE_PARAMS, ...item.defaults };
}

/** Convert HTML snippet + CSS + JS into a React component source string. */
export function toReact(name: string, b: Built): string {
  const comp = name.replace(/[^a-zA-Z0-9]/g, "");
  const jsx = b.html
    .replace(/\bclass=/g, "className=")
    .replace(/\bfor=/g, "htmlFor=")
    .replace(/\btabindex=/g, "tabIndex=")
    .replace(/<(input|img|br|hr)([^>]*?)\s*\/?>/g, "<$1$2 />")
    .replace(/<!--(.*?)-->/g, "{/*$1*/}")
    .split("\n")
    .map((l) => "    " + l)
    .join("\n");
  const effect = b.js
    ? `\n  useEffect(() => {\n${b.js
        .trim()
        .split("\n")
        .map((l) => "    " + l)
        .join("\n")}\n  }, []);\n`
    : "";
  return `import ${b.js ? "{ useEffect } from \"react\";\nimport " : ""}"./${comp}.css"; // paste the CSS tab into this file

export default function ${comp}() {${effect}
  return (
${jsx}
  );
}
`;
}

/** Full standalone HTML document used for previews and downloads. */
export function toDocument(b: Built, bg: string, title = "UIForge") {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>
html,body{margin:0;min-height:100%;height:100%}
body{background:${bg};font-family:Inter,system-ui,-apple-system,sans-serif;color:#F8FAFC;display:grid;place-items:center;overflow:hidden}
*,*::before,*::after{box-sizing:border-box}
@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
${b.css}
</style>
</head>
<body>
${b.html}
${b.js ? `<script>\n${b.js}\n</script>` : ""}
</body>
</html>`;
}
