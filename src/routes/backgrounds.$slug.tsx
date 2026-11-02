import { createFileRoute, notFound } from "@tanstack/react-router";
import { Playground } from "@/components/site/Playground";
import { findItem } from "@/lib/catalog";

export const Route = createFileRoute("/backgrounds/$slug")({
  loader: ({ params }) => {
    const item = findItem("background", params.slug);
    if (!item) throw notFound();
    return { name: item.name, description: item.description };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} Background — UIForge` : "Background — UIForge" },
      { name: "description", content: loaderData?.description ?? "CSS background" },
      { property: "og:title", content: loaderData ? `${loaderData.name} — UIForge` : "UIForge" },
      { property: "og:description", content: loaderData?.description ?? "CSS background" },
    ],
  }),
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const item = findItem("background", slug)!;
  return <Playground item={item} backTo={{ href: "/backgrounds", label: "Backgrounds" }} />;
}
