import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/site/Gallery";

export const Route = createFileRoute("/effects/")({
  head: () => ({
    meta: [
      { title: "Interactive Effects — UIForge" },
      { name: "description", content: "Hover interactions, mouse effects, cursor animations and scroll experiences in plain CSS and JS." },
      { property: "og:title", content: "Interactive Effects — UIForge" },
      { property: "og:description", content: "Hover interactions, mouse effects, cursor animations and scroll experiences in plain CSS and JS." },
    ],
  }),
  component: () => (
    <Gallery kind="effect" title="Bring Your UI to Life" description="Discover beautiful hover interactions, mouse effects, cursor animations and scroll experiences." />
  ),
});
