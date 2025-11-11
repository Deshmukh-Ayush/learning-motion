import { notFound } from "next/navigation";
import { getAllDocsPaths, getNavItemBySlug } from "@/config/docs-navigation";

import IntroductionMdx from "@/content/docs/getting-started/introduction.mdx";
import InstallationMdx from "@/content/docs/getting-started/installation.mdx";

const docsMap: Record<string, React.ComponentType> = {
  "getting-started/introduction": IntroductionMdx,
  "getting-started/installation": InstallationMdx,
};

export function generateStaticParams() {
  const allPaths = getAllDocsPaths();
  return allPaths
    .filter((path) => path.slug.length > 1)
    .map((path) => ({
      slug: path.slug,
    }));
}


export default function DocsPage({ params }: { params: { slug: string[] } }) {
  const navItem = getNavItemBySlug(params.slug);

  if (!navItem) {
    notFound();
  }

  const slugKey = params.slug.join("/");
  const MdxComponent = docsMap[slugKey];

  if (!MdxComponent) {
    notFound();
  }

  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      <MdxComponent />
    </article>
  );
}
