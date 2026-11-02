import { Fragment, type ReactNode } from "react";

type Lang = "jsx" | "html" | "css" | "js";

const RULES: Record<Lang, [RegExp, string][]> = {
  js: [
    [/\/\/[^\n]*|\/\*[\s\S]*?\*\//y, "text-tok-com"],
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/y, "text-tok-str"],
    [/\b(?:const|let|var|function|return|if|else|for|of|in|new|import|from|export|default|true|false|null|undefined|await|async|typeof)\b/y, "text-tok-key"],
    [/\b\d+(?:\.\d+)?\b/y, "text-tok-num"],
    [/<\/?[A-Za-z][\w-]*|\/?>/y, "text-tok-tag"],
  ],
  jsx: [],
  html: [
    [/<!--[\s\S]*?-->/y, "text-tok-com"],
    [/"[^"]*"/y, "text-tok-str"],
    [/<\/?[A-Za-z][\w-]*|\/?>/y, "text-tok-tag"],
    [/\b[a-z-]+(?==)/y, "text-tok-key"],
  ],
  css: [
    [/\/\*[\s\S]*?\*\//y, "text-tok-com"],
    [/"[^"]*"/y, "text-tok-str"],
    [/@[\w-]+/y, "text-tok-key"],
    [/#[0-9a-fA-F]{3,8}\b/y, "text-tok-num"],
    [/-?\d+(?:\.\d+)?(?:px|s|deg|%|vmax|vmin|vh|vw|turn|em)?/y, "text-tok-num"],
    [/[\w-]+(?=\s*:[^:{]*[;}\n])/y, "text-tok-tag"],
  ],
};
RULES.jsx = RULES.js;

function highlight(code: string, lang: Lang): ReactNode[] {
  const rules = RULES[lang];
  const out: ReactNode[] = [];
  let i = 0;
  let plain = "";
  while (i < code.length) {
    let matched = false;
    for (const [re, cls] of rules) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m[0].length) {
        if (plain) out.push(plain), (plain = "");
        out.push(
          <span key={i} className={cls}>
            {m[0]}
          </span>,
        );
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // skip identifier chunks so keywords don't match mid-word
      const w = /[\w$]+/y;
      w.lastIndex = i;
      const m = w.exec(code);
      const chunk = m ? m[0] : code[i];
      plain += chunk;
      i += chunk.length;
    }
  }
  if (plain) out.push(plain);
  return out;
}

export function CodeBlock({ code, lang, maxH }: { code: string; lang: Lang; maxH?: string }) {
  const lines = code.split("\n");
  return (
    <div className="overflow-auto bg-code font-mono text-[12.5px] leading-6" style={{ maxHeight: maxH }}>
      <div className="flex min-w-max">
        <div aria-hidden className="sticky left-0 select-none bg-code px-4 py-4 text-right text-tok-com">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="py-4 pr-6 text-code-foreground">
          <code>
            {highlight(code, lang).map((n, i) => (
              <Fragment key={i}>{n}</Fragment>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
