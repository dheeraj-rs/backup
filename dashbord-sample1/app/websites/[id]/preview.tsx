"use client";

import { useEffect, useRef } from "react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

export function Preview({ html, css, js }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const document = iframeRef.current.contentDocument;
      if (document) {
        document.open();
        document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                /* Reset default margins and height */
                body, html {
                  margin: 0;
                  padding: 0;
                  height: 100%;
                }
                ${css}
              </style>
            </head>
            <body>
              ${html}
              <script type="text/javascript">
                ${js}
              </script>
            </body>
          </html>
        `);
        document.close();
      }
    }
  }, [html, css, js]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0 bg-background"
      title="Preview"
      sandbox="allow-scripts allow-same-origin"
      width="100%"
      height="100%"
    />
  );
}
