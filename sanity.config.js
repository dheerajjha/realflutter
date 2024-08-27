import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { markdownSchema } from "sanity-plugin-markdown";
import { CustomMarkdownInput } from "@/lib/CustomMarkdownInput";

export default defineConfig({
  name: "default",
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_NAME,

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  basePath: "/studio",

  plugins: [
    structureTool(),
    visionTool(),
    markdownSchema({ input: CustomMarkdownInput }),
  ],

  schema: {
    types: schemaTypes,
  },
});
