"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

function generateHTML(elements: any[]) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <style>
        /* Add your custom styles here */
        ${generateCSS(elements)}
    </style>
</head>
<body>
    ${elements
      .map(
        (el: {
          type: any;
          props: { level: any; text: any; title: any; content: any };
          styles: any;
        }) => {
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
              return `<div class="card" style="${styleObjectToString(
                el.styles
              )}">
            <h3>${el.props.title}</h3>
            <p>${el.props.content}</p>
          </div>`;
            default:
              return "";
          }
        }
      )
      .join("\n    ")}
</body>
</html>`;
}

function generateCSS(elements: any[]) {
  return elements
    .map((el: { type: string; id: any; styles: any }) => {
      const selector = `.${el.type.toLowerCase()}-${el.id}`;
      return `${selector} {
      ${styleObjectToString(el.styles)}
    }`;
    })
    .join("\n");
}

function styleObjectToString(
  styles: { [s: string]: unknown } | ArrayLike<unknown>
) {
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

export function BottomPanel({
  elements,
  isFullScreen = false,
}: {
  elements: any[];
  isFullScreen?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const htmlCode = generateHTML(elements);
  const cssCode = generateCSS(elements);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className={`bottom-panel ${isExpanded || isFullScreen ? "h-[60vh]" : ""}`}
    >
      <div className="panel-header">
        <h2 className="text-lg font-semibold">Code Output</h2>
        {!isFullScreen && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        )}
      </div>
      <Tabs defaultValue="html">
        <TabsList>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>
        <ScrollArea
          className={
            isFullScreen
              ? "h-[60vh]"
              : "h-[calc(var(--bottom-panel-height)-100px)]"
          }
        >
          <TabsContent value="html" className="p-4 relative">
            <Button
              variant="outline"
              size="sm"
              className="absolute right-6 top-6"
              onClick={() => copyToClipboard(htmlCode)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <pre className="code-editor">
              {htmlCode || "// Drag components to generate code"}
            </pre>
          </TabsContent>
          <TabsContent value="css" className="p-4 relative">
            <Button
              variant="outline"
              size="sm"
              className="absolute right-6 top-6"
              onClick={() => copyToClipboard(cssCode)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <pre className="code-editor">
              {cssCode || "/* CSS styles will appear here */"}
            </pre>
          </TabsContent>
          <TabsContent value="js" className="p-4 relative">
            <Button
              variant="outline"
              size="sm"
              className="absolute right-6 top-6"
              onClick={() =>
                copyToClipboard("// Add your custom JavaScript here")
              }
            >
              <Copy className="h-4 w-4" />
            </Button>
            <pre className="code-editor">
              {"// JavaScript code will appear here"}
            </pre>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
