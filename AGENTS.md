<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Catalog entries live in `src/lib/catalog/*`; each item's `build(params)` returns the HTML/CSS/JS that is both shown in code tabs and rendered in a sandboxed iframe preview — so previews always match copied code.
- No backend: favorites and theme preference live in localStorage.
