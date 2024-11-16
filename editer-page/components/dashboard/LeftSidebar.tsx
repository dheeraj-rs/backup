"use client";

import { DraggableElement } from "@/components/DraggableElement";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const components = [
  { id: "heading", type: "Heading", icon: "Type" },
  { id: "paragraph", type: "Paragraph", icon: "Text" },
  { id: "button", type: "Button", icon: "Square" },
  { id: "image", type: "Image", icon: "Image" },
  { id: "card", type: "Card", icon: "CreditCard" },
  { id: "form", type: "Form", icon: "Box" },
];

export function LeftSidebar({ onDrop }) {
  return (
    <div className="left-sidebar">
      <div className="panel-header">
        <h2 className="text-lg font-semibold">Components</h2>
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search components..." className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {components.map((component) => (
            <DraggableElement
              key={component.id}
              id={component.id}
              type={component.type}
              icon={component.icon}
              onDrop={onDrop}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}