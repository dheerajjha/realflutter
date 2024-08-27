import { MarkdownInput } from "sanity-plugin-markdown";
import { useMemo } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

export function CustomMarkdownInput(props) {
  const reactMdeProps = useMemo(() => {
    return {
      options: {
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "quote",
          "code",
          "link",
          "image",
          "unordered-list",
          "ordered-list",
          "|",
          "preview",
          "side-by-side",
          "fullscreen",
          "|",
          "guide",
        ],
        placeholder: "Start writing your markdown content here...",
        spellChecker: true,
        autosave: {
          enabled: true,
          uniqueId: "markdownEditor",
          delay: 1000,
        },
        renderingConfig: {
          singleLineBreaks: false,
          codeSyntaxHighlighting: true,
        },
        previewRender: (markdownText) => {
          return DOMPurify.sanitize(marked.parse(markdownText));
        },
      },
    };
  }, []);

  return <MarkdownInput {...props} reactMdeProps={reactMdeProps} />;
}
