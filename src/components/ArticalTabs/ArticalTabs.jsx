"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import remarkGfm from "remark-gfm";

const ArticalTabs = ({ body }) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="w-full">
      <Tabs
        defaultValue="description"
        className="w-full px-0"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="w-full px-0">
          <TabsTrigger value="description" className="w-full">
            <Button
              variant={activeTab === "description" ? "gradient" : "text"}
              className="w-full rounded-xl"
            >
              Description
            </Button>
          </TabsTrigger>
          <TabsTrigger value="tutorial" className="w-full">
            <Button
              variant={activeTab === "tutorial" ? "gradient" : "text"}
              className="w-full rounded-xl"
            >
              Tutorial
            </Button>
          </TabsTrigger>
          <TabsTrigger value="example" className="w-full">
            <Button
              variant={activeTab === "example" ? "gradient" : "text"}
              className="w-full rounded-xl"
            >
              Example
            </Button>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-5">
          <MarkdownPreview
            source={
              body?.description?.length > 0
                ? body.description
                : "Coming Soon..."
            }
            style={{
              padding: 8,
              backgroundColor: "white", // Sets the background color to white
              color: "black", // Sets the text color to black
            }}
            rehypeRewrite={(node, index, parent) => {
              if (
                node.tagName === "a" &&
                parent &&
                /^h(1|2|3|4|5|6)/.test(parent.tagName)
              ) {
                parent.children = parent.children.slice(1);
              }
            }}
          />
        </TabsContent>
        <TabsContent value="tutorial" className="mt-5">
          <MarkdownPreview
            source={
              body?.tutorial?.length > 0 ? body.tutorial : "Coming Soon..."
            }
            style={{
              padding: 8,
              backgroundColor: "white", // Sets the background color to white
              color: "black", // Sets the text color to black
            }}
            rehypeRewrite={(node, index, parent) => {
              if (
                node.tagName === "a" &&
                parent &&
                /^h(1|2|3|4|5|6)/.test(parent.tagName)
              ) {
                parent.children = parent.children.slice(1);
              }
            }}
          />
        </TabsContent>
        <TabsContent value="example" className="mt-5">
          <MarkdownPreview
            source={body?.example?.length > 0 ? body.example : "Coming Soon..."}
            style={{
              padding: 8,
              backgroundColor: "white", // Sets the background color to white
              color: "black", // Sets the text color to black
            }}
            rehypeRewrite={(node, index, parent) => {
              if (
                node.tagName === "a" &&
                parent &&
                /^h(1|2|3|4|5|6)/.test(parent.tagName)
              ) {
                parent.children = parent.children.slice(1);
              }
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArticalTabs;
