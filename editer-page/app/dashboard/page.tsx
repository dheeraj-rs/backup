"use client";

import { useState, useCallback } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { LeftSidebar } from "@/components/dashboard/LeftSidebar";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { BottomPanel } from "@/components/dashboard/BottomPanel";
import { PreviewArea } from "@/components/dashboard/PreviewArea";
import { Header } from "@/components/dashboard/Header";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Element {
  id: string;
  type: string;
  props: Record<string, unknown>;
  styles: Record<string, string | number>;
}

const DEFAULT_ELEMENT_STYLES = {
  width: "100%",
  height: "auto",
  padding: "1rem",
  margin: "0.5rem 0",
} as const;

export default function DashboardPage() {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [history, setHistory] = useState<Element[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const addToHistory = useCallback(
    (newElements: Element[]): void => {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), newElements]);
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setElements(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setElements(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { over, active } = event;
      setActiveId(null);

      if (over?.id === "preview-area") {
        const newElement: Element = {
          id: `${active.id}-${Date.now()}`,
          type: active.data.current?.type,
          props: { ...active.data.current?.defaultProps },
          styles: DEFAULT_ELEMENT_STYLES,
        };

        const newElements = [...elements, newElement];
        setElements(newElements);
        setSelectedElement(newElement);
        addToHistory(newElements);
      }
    },
    [elements, addToHistory]
  );

  const updateElementProps = useCallback(
    (
      id: string,
      updates: {
        props?: Record<string, unknown>;
        styles?: Record<string, string | number>;
      }
    ): void => {
      setElements((prevElements) => {
        const newElements = prevElements.map((el) =>
          el.id === id
            ? {
                ...el,
                props: { ...el.props, ...updates.props },
                styles: { ...el.styles, ...updates.styles },
              }
            : el
        );
        addToHistory(newElements);
        return newElements;
      });
    },
    [addToHistory]
  );

  const moveElement = useCallback(
    (draggedId: string, targetId: string) => {
      setElements((prevElements) => {
        const newElements = [...prevElements];
        const draggedIndex = newElements.findIndex((el) => el.id === draggedId);
        const targetIndex = newElements.findIndex((el) => el.id === targetId);
        const [draggedElement] = newElements.splice(draggedIndex, 1);
        newElements.splice(targetIndex, 0, draggedElement);
        addToHistory(newElements);
        return newElements;
      });
    },
    [addToHistory]
  );

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="dashboard-layout">
        <Header
          onUndo={undo}
          onRedo={redo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onPreview={() => setShowPreview(true)}
          onCode={() => setShowCode(true)}
          elements={elements}
        />
        <div className="main-content">
          <LeftSidebar onDrop={undefined} />
          <PreviewArea
            elements={elements}
            activeId={activeId}
            selectedElement={selectedElement}
            onSelectElement={setSelectedElement}
            onMoveElement={moveElement}
          />
          <RightSidebar
            selectedElement={selectedElement}
            onUpdateElement={updateElementProps}
          />
        </div>
        <BottomPanel elements={elements} />

        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="w-screen h-screen max-w-full max-h-full p-0">
            <div className="h-full overflow-auto p-6">
              <PreviewArea
                elements={elements}
                activeId={null}
                selectedElement={null}
                onSelectElement={() => {}}
                onMoveElement={() => {}}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showCode} onOpenChange={setShowCode}>
          <DialogContent className="w-[800px] max-h-[80vh]">
            <div className="h-full overflow-auto">
              <BottomPanel elements={elements} isFullScreen />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DndContext>
  );
}
