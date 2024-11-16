"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function RightSidebar({ selectedElement, onUpdateElement }) {
  if (!selectedElement) {
    return (
      <div className="right-sidebar flex items-center justify-center text-muted-foreground">
        Select an element to edit its properties
      </div>
    );
  }

  const handleStyleChange = (property, value) => {
    onUpdateElement(selectedElement.id, {
      styles: { ...selectedElement.styles, [property]: value }
    });
  };

  const handlePropChange = (property, value) => {
    onUpdateElement(selectedElement.id, {
      props: { ...selectedElement.props, [property]: value }
    });
  };

  return (
    <div className="right-sidebar">
      <div className="panel-header">
        <h2 className="text-lg font-semibold">{selectedElement.type} Properties</h2>
      </div>
      <Tabs defaultValue="content">
        <TabsList className="w-full">
          <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
          <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-var(--header-height)-var(--bottom-panel-height)-120px)]">
          <TabsContent value="content" className="p-4 space-y-4">
            {selectedElement.type === "Heading" && (
              <>
                <div className="space-y-2">
                  <Label>Text</Label>
                  <Input
                    value={selectedElement.props.text || ""}
                    onChange={(e) => handlePropChange("text", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <select
                    className="w-full rounded-md border"
                    value={selectedElement.props.level}
                    onChange={(e) => handlePropChange("level", e.target.value)}
                  >
                    {["h1", "h2", "h3", "h4", "h5", "h6"].map((level) => (
                      <option key={level} value={level}>{level.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {selectedElement.type === "Paragraph" && (
              <div className="space-y-2">
                <Label>Text</Label>
                <textarea
                  className="w-full rounded-md border min-h-[100px] p-2"
                  value={selectedElement.props.text || ""}
                  onChange={(e) => handlePropChange("text", e.target.value)}
                />
              </div>
            )}
          </TabsContent>
          <TabsContent value="style" className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Width</Label>
              <Input
                value={selectedElement.styles.width}
                onChange={(e) => handleStyleChange("width", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Height</Label>
              <Input
                value={selectedElement.styles.height}
                onChange={(e) => handleStyleChange("height", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Padding</Label>
              <Input
                value={selectedElement.styles.padding}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Margin</Label>
              <Input
                value={selectedElement.styles.margin}
                onChange={(e) => handleStyleChange("margin", e.target.value)}
              />
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}