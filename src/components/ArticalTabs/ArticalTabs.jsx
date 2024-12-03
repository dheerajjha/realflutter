"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import * as Tooltip from '@radix-ui/react-tooltip';
import { trackTabChange, trackContentView } from "@/lib/analytics";

const ArticalTabs = ({ body }) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("tutorial");
  const [showExampleTooltip, setShowExampleTooltip] = useState(false);
  const [showTutorialTooltip, setShowTutorialTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShowExampleTooltip(true);
    const timer = setTimeout(() => {
      setShowExampleTooltip(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      trackContentView('article', 'initial_view', 'tutorial');
    }
  }, [mounted]);

  useEffect(() => {
    setShowTutorialTooltip(false);
    
    if (activeTab === "example") {
      setShowTutorialTooltip(true);
      const timer = setTimeout(() => {
        setShowTutorialTooltip(false);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <Tooltip.Provider>
        <Tabs
          defaultValue="tutorial"
          className="w-full px-0"
          onValueChange={(value) => {
            setActiveTab(value);
            trackTabChange(value);
            trackContentView('article', value, value);
          }}
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
              <CustomTooltip 
                show={showTutorialTooltip}
                content="Step by step guide"
                icon="info"
              >
                <Button
                  variant={activeTab === "tutorial" ? "gradient" : "text"}
                  className="w-full rounded-xl"
                >
                  Tutorial
                </Button>
              </CustomTooltip>
            </TabsTrigger>
            <TabsTrigger value="example" className="w-full">
              <CustomTooltip 
                show={showExampleTooltip}
                content={["Contains ready to run main.dart file", "with detailed comments"]}
                icon="file"
                multiline
              >
                <Button
                  variant={activeTab === "example" ? "gradient" : "text"}
                  className="w-full rounded-xl"
                >
                  Example
                </Button>
              </CustomTooltip>
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
      </Tooltip.Provider>
    </div>
  );
};

export default ArticalTabs;
