import Link from "next/link";
import type { Route } from "next";
import StructuredData from "./StructuredData";

interface BreadcrumbItem {
  label: string;
  href?: string; // Sin href = página actual (no clickeable)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** true en fondos oscuros, false en fondos claros — AGENTS.md §7 */
  isDark?: boolean;
}

export default function Breadcrumbs({ items, isDark = false }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };

  const textClass = isDark ? "text-white/70" : "text-muted-foreground";
  const currentClass = isDark ? "text-white font-medium" : "text-foreground font-medium";
  const linkClass = isDark ? "hover:text-white transition-colors" : "hover:text-primary transition-colors";

  return (
    <>
      <StructuredData data={schema} />
      <nav aria-label="Breadcrumb" className={`py-3 px-4 text-sm ${textClass}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href as Route} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span className={currentClass}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
