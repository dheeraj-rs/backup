"use client";

import { useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Grip, Settings } from "lucide-react";

export function ElementEditor({ element, isSelected, onSelect, onMove, children }) {
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: { type: "element" }
  });

  const handleMouseDown = (e) => {
    if (resizeRef.current && resizeRef.current.contains(e.target)) {
      setIsResizing(true);
      const startY = e.clientY;
      const startHeight = element.styles.height;

      const handleMouseMove = (e) => {
        const deltaY = e.clientY - startY;
        const newHeight = parseInt(startHeight) + deltaY;
        onMove(element.id, { styles: { ...element.styles, height: `${newHeight}px` } });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative group",
        isSelected && "ring-2 ring-primary",
        isResizing && "select-none"
      )}
      onClick={onSelect}
      onMouseDown={handleMouseDown}
    >
      {isSelected && (
        <>
          <div className="absolute -top-3 -left-3 bg-primary text-white p-1 rounded-sm">
            <Grip className="h-4 w-4" {...attributes} {...listeners} />
          </div>
          <div className="absolute -top-3 -right-3 bg-primary text-white p-1 rounded-sm">
            <Settings className="h-4 w-4" />
          </div>
          <div
            ref={resizeRef}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary cursor-ns-resize"
          />
        </>
      )}
      {children}
    </div>
  );
}