import { createFileRoute, notFound } from "@tanstack/react-router";
import { Playground } from "@/components/site/Playground";
import { findItem } from "@/lib/catalog";

export const Route = createFileRoute("/components/$category/$slug")({
  loader: ({ params }) => {
    const item = findItem("component", params.slug);
    if (!item || item.category !== params.category) throw notFound();
    return { name: item.name, description: item.description };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — UIForge Components` : "Component — UIForge" },
      { name: "description", content: loaderData?.description ?? "UI component" },
      { property: "og:title", content: loaderData ? `${loaderData.name} — UIForge` : "UIForge" },
      { property: "og:description", content: loaderData?.description ?? "UI component" },
    ],
  }),
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const item = findItem("component", slug)!;
  return <Playground item={item} backTo={{ href: "/components", label: "Components" }} />;
}
