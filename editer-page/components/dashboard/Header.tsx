"use client";

import { Save, Settings, Eye, Code, Undo, Redo } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onPreview: () => void;
  onCode: () => void;
  elements: any[];
}

export function Header({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onPreview,
  onCode,
  elements,
}: HeaderProps) {
  const [showSettings, setShowSettings] = useState(false);

  const handleSave = () => {
    const htmlContent = generateFullHTML(elements);
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-[var(--header-height)] border-b bg-card px-4">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndo}
            disabled={!canUndo}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRedo}
            disabled={!canRedo}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" onClick={onCode}>
            <Code className="h-4 w-4 mr-2" />
            Code
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="default" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Website Settings</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Site Title</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Favicon</label>
                  <input type="file" className="w-full" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="seo" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Meta Description
                  </label>
                  <textarea className="w-full p-2 border rounded" rows={3} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Keywords</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom CSS</label>
                  <textarea
                    className="w-full p-2 border rounded font-mono"
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Custom JavaScript
                  </label>
                  <textarea
                    className="w-full p-2 border rounded font-mono"
                    rows={5}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </header>
  );
}

function generateFullHTML(
  elements: Array<{ type: string; props: any; styles: any }>
) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <style>
        /* Add your custom styles here */
    </style>
</head>
<body>
    ${elements
      .map((el) => {
        switch (el.type) {
          case "Heading":
            return `<${el.props.level} style="${styleObjectToString(
              el.styles
            )}">${el.props.text}</${el.props.level}>`;
          case "Paragraph":
            return `<p style="${styleObjectToString(el.styles)}">${
              el.props.text
            }</p>`;
          case "Button":
            return `<button style="${styleObjectToString(el.styles)}">${
              el.props.text
            }</button>`;
          case "Card":
            return `<div class="card" style="${styleObjectToString(el.styles)}">
            <h3>${el.props.title}</h3>
            <p>${el.props.content}</p>
          </div>`;
          default:
            return "";
        }
      })
      .join("\n    ")}
</body>
</html>`;
}

function styleObjectToString(styles: { [key: string]: string }) {
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
}
