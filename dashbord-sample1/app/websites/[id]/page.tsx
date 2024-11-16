"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Globe, Code, Save, Eye } from "lucide-react";
import { Preview } from "./preview";

const websites = {
  "1": {
    name: "Example Blog",
    url: "blog.example.com",
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Example Blog</title>
</head>
<body>
  <h1>Welcome to my blog</h1>
  <p>This is a sample blog post.</p>
  <article>
    <h2>First Post</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </article>
</body>
</html>`,
    css: `body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

h1 {
  color: #2563eb;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

h2 {
  color: #1f2937;
  margin-top: 2rem;
}

article {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
}`,
    js: `document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('h1');
  if (h1) {
    h1.addEventListener('click', () => {
      h1.style.color = '#ef4444';
    });
  }
});`,
  },
  // Add other website data here
};

export default function WebsiteEditor() {
  const { id } = useParams();
  const { toast } = useToast();
  const website = websites[id as keyof typeof websites];

  const [code, setCode] = useState({
    html: website?.html || "",
    css: website?.css || "",
    js: website?.js || "",
  });

  const [settings, setSettings] = useState({
    name: website?.name || "",
    url: website?.url || "",
  });

  const handleCodeChange =
    (type: keyof typeof code) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCode((prev) => ({
        ...prev,
        [type]: e.target.value,
      }));
    };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your website changes have been saved successfully.",
    });
  };

  if (!website) {
    return <div className="p-6">Website not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{settings.name}</h1>
          <p className="text-sm text-muted-foreground">{settings.url}</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="code" className="flex flex-col h-[calc(100vh-12rem)]">
        <TabsList>
          <TabsTrigger value="code">
            <Code className="w-4 h-4 mr-2" />
            Code Editor
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Globe className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="flex-1 overflow-auto space-y-4">
          <Card className="p-4">
            <Label htmlFor="html">HTML</Label>
            <Textarea
              id="html"
              value={code.html}
              onChange={handleCodeChange("html")}
              className="font-mono"
              rows={10}
            />
          </Card>

          <Card className="p-4">
            <Label htmlFor="css">CSS</Label>
            <Textarea
              id="css"
              value={code.css}
              onChange={handleCodeChange("css")}
              className="font-mono"
              rows={8}
            />
          </Card>

          <Card className="p-4">
            <Label htmlFor="js">JavaScript</Label>
            <Textarea
              id="js"
              value={code.js}
              onChange={handleCodeChange("js")}
              className="font-mono"
              rows={8}
            />
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="flex-1">
          <Card className="h-full">
            <Preview html={code.html} css={code.css} js={code.js} />
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Website Name</Label>
              <Input
                id="name"
                name="name"
                value={settings.name}
                onChange={handleSettingsChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Domain</Label>
              <Input
                id="url"
                name="url"
                value={settings.url}
                onChange={handleSettingsChange}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
