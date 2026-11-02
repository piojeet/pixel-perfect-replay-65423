import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/site/Gallery";

export const Route = createFileRoute("/backgrounds/")({
  head: () => ({
    meta: [
      { title: "Backgrounds — UIForge" },
      { name: "description", content: "Gradients, patterns and animated CSS backgrounds you can customize and copy." },
      { property: "og:title", content: "Backgrounds — UIForge" },
      { property: "og:description", content: "Gradients, patterns and animated CSS backgrounds you can customize and copy." },
    ],
  }),
  component: () => (
    <Gallery kind="background" title="Beautiful Backgrounds for Every Project" description="Explore gradients, patterns and animated backgrounds that make your website stand out." />
  ),
});
