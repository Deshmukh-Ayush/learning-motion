import { Navbar } from "@/components/docs/navbar";
import { Sidebar } from "@/components/docs/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="max-w-4xl flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
