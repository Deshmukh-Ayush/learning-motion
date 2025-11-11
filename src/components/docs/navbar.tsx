"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { docsNavigation } from "@/config/docs-navigation";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const allItems = docsNavigation.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.title,
    })),
  );

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold">
            Your Library
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span>Search...</span>
            <kbd className="rounded bg-white px-2 py-1 text-xs dark:bg-gray-900">
              ⌘K
            </kbd>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="fixed top-[20%] left-1/2 w-full max-w-xl -translate-x-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <Command.Input
                placeholder="Search documentation..."
                className="w-full border-b border-gray-200 bg-transparent px-4 py-3 text-base outline-none dark:border-gray-800"
              />
              <Command.List className="max-h-96 overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-gray-500">
                  No results found.
                </Command.Empty>
                {docsNavigation.map((section) => (
                  <Command.Group
                    key={section.title}
                    heading={section.title}
                    className="mb-2"
                  >
                    {section.items.map((item) => (
                      <Command.Item
                        key={item.href}
                        onSelect={() => {
                          router.push(item.href);
                          setOpen(false);
                        }}
                        className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-gray-100 dark:hover:bg-gray-800 dark:data-[selected=true]:bg-gray-800"
                      >
                        {item.title}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
