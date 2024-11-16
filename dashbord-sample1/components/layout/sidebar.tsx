"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Users,
  Palette,
  FileText,
  Image,
  Globe,
  Code,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const websites = [
  { id: 1, name: "Example Blog", url: "blog.example.com" },
  { id: 2, name: "E-commerce Site", url: "shop.example.com" },
  { id: 3, name: "Portfolio", url: "portfolio.example.com" },
];

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Websites",
    href: "/websites",
    icon: Globe,
    submenu: websites.map((site) => ({
      title: site.name,
      href: `/websites/${site.id}`,
      icon: Code,
      subtitle: site.url,
    })),
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Content",
    href: "/content",
    icon: FileText,
  },
  {
    title: "Media",
    href: "/media",
    icon: Image,
  },
  {
    title: "Appearance",
    href: "/appearance",
    icon: Palette,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const MenuItem = ({ item, level = 0 }: { item: any; level?: number }) => {
    if (item.submenu) {
      return (
        <Collapsible
          open={expandedItems.includes(item.title)}
          onOpenChange={() => toggleExpanded(item.title)}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted">
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                expandedItems.includes(item.title) && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-1">
            {item.submenu.map((subItem: any) => (
              <MenuItem key={subItem.href} item={subItem} level={level + 1} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
          pathname === item.href
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        )}
      >
        <item.icon className="h-4 w-4" />
        <div className="flex-1 overflow-hidden">
          <div className="truncate">{item.title}</div>
          {item.subtitle && (
            <div className="text-xs text-muted-foreground truncate">
              {item.subtitle}
            </div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={cn(
          "w-64 bg-card border-r p-4 mobile-sidebar md:relative md:transform-none",
          isOpen && "open"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">Admin</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
        </nav>
      </aside>
    </>
  );
}
