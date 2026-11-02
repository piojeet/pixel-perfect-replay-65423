import { createFileRoute, notFound } from "@tanstack/react-router";
import { Playground } from "@/components/site/Playground";
import { findItem } from "@/lib/catalog";

export const Route = createFileRoute("/effects/$slug")({
  loader: ({ params }) => {
    const item = findItem("effect", params.slug);
    if (!item) throw notFound();
    return { name: item.name, description: item.description };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} Effect — UIForge` : "Effect — UIForge" },
      { name: "description", content: loaderData?.description ?? "Interactive effect" },
      { property: "og:title", content: loaderData ? `${loaderData.name} — UIForge` : "UIForge" },
      { property: "og:description", content: loaderData?.description ?? "Interactive effect" },
    ],
  }),
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const item = findItem("effect", slug)!;
  return <Playground item={item} backTo={{ href: "/effects", label: "Effects" }} />;
}
