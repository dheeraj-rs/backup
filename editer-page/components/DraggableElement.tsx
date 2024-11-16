"use client";

import { useDraggable } from "@dnd-kit/core";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

const defaultProps = {
  Heading: { text: "New Heading", level: "h1" },
  Paragraph: { text: "New paragraph text" },
  Button: { text: "New Button", variant: "default" },
  Card: { title: "New Card", content: "Card content" }
};

export function DraggableElement({ id, type, icon }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      type,
      defaultProps: defaultProps[type]
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const Icon = Icons[icon];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "draggable-item",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        <span>{type}</span>
      </div>
    </div>
  );
}