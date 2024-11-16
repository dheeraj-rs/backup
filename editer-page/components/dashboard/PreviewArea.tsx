"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ElementEditor } from "./ElementEditor";

const componentMap = {
  Heading: ({ text, level = "h1", className, style }) => {
    const Tag = level;
    return (
      <Tag className={cn("font-bold", className)} style={style}>
        {text || "Heading"}
      </Tag>
    );
  },
  Paragraph: ({ text, className, style }) => (
    <p className={cn("leading-relaxed", className)} style={style}>
      {text || "Paragraph text"}
    </p>
  ),
  Button: ({ text, variant = "default", className, style }) => (
    <button
      className={cn("px-4 py-2 rounded bg-primary text-primary-foreground", className)}
      style={style}
    >
      {text || "Button"}
    </button>
  ),
  Card: ({ title, content, className, style }) => (
    <div className={cn("p-4 rounded-lg border bg-card", className)} style={style}>
      <h3 className="font-semibold mb-2">{title || "Card Title"}</h3>
      <p>{content || "Card content goes here"}</p>
    </div>
  )
};

export function PreviewArea({ elements, activeId, selectedElement, onSelectElement, onMoveElement }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "preview-area"
  });

  return (
    <div className="preview-area">
      <div className="p-6">
        <div
          ref={setNodeRef}
          className={cn(
            "preview-container",
            isOver && "border-primary border-2"
          )}
        >
          {elements.map((element) => {
            const Component = componentMap[element.type];
            const isSelected = selectedElement?.id === element.id;
            
            return Component ? (
              <ElementEditor
                key={element.id}
                element={element}
                isSelected={isSelected}
                onSelect={() => onSelectElement(element)}
                onMove={onMoveElement}
              >
                <Component {...element.props} style={element.styles} />
              </ElementEditor>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}