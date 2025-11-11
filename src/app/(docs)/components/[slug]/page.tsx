import { notFound } from "next/navigation";
import { getAllDocsPaths, getNavItemBySlug } from "@/config/docs-navigation";

// Import all MDX files
import QrCodeMdx from "@/content/components/qr-code.mdx";
import ButtonMdx from "@/content/components/button.mdx";
import CardMdx from "@/content/components/card.mdx";

// Map slugs to their MDX components
const componentMap: Record<string, React.ComponentType> = {
  "qr-code": QrCodeMdx,
  button: ButtonMdx,
  card: CardMdx,
};

export function generateStaticParams() {
  const allPaths = getAllDocsPaths();
  // Filter only component paths (single slug)
  return allPaths
    .filter((path) => path.slug.length === 1)
    .map((path) => ({
      slug: path.slug[0],
    }));
}

export default function ComponentPage({
  params,
}: {
  params: { slug: string };
}) {
  const navItem = getNavItemBySlug([params.slug]);

  if (!navItem) {
    notFound();
  }

  const MdxComponent = componentMap[params.slug];

  if (!MdxComponent) {
    notFound();
  }

  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      <MdxComponent />
    </article>
  );
}
