export interface NavItem {
  title: string;
  href: string;
  slug: string[]; // e.g., ['getting-started', 'introduction']
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs/getting-started/introduction",
        slug: ["getting-started", "introduction"],
      },
      {
        title: "Installation",
        href: "/docs/getting-started/installation",
        slug: ["getting-started", "installation"],
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "QR Code",
        href: "/components/qr-code",
        slug: ["qr-code"],
      },
      {
        title: "Button",
        href: "/components/button",
        slug: ["button"],
      },
      {
        title: "Card",
        href: "/components/card",
        slug: ["card"],
      },
    ],
  },
];

// Helper to get all component paths for the components listing page
export const componentsList =
  docsNavigation.find((section) => section.title === "Components")?.items || [];

// Helper function to get navigation item by slug
export function getNavItemBySlug(slug: string[]): NavItem | undefined {
  for (const section of docsNavigation) {
    const item = section.items.find(
      (item) => JSON.stringify(item.slug) === JSON.stringify(slug),
    );
    if (item) return item;
  }
  return undefined;
}

// Generate all possible paths for static generation
export function getAllDocsPaths() {
  const paths: { slug: string[] }[] = [];

  docsNavigation.forEach((section) => {
    section.items.forEach((item) => {
      paths.push({ slug: item.slug });
    });
  });

  return paths;
}
