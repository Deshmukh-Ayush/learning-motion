import Link from "next/link";
import { componentsList } from "@/config/docs-navigation";

export default function ComponentsPage() {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold">Components</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Browse our collection of components. Click on any component to view its
        documentation.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {componentsList.map((component) => (
          <Link
            key={component.href}
            href={component.href}
            className="block rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
          >
            <h3 className="mb-2 text-xl font-semibold">{component.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click to view documentation →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
