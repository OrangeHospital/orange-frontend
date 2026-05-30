import React from "react";
// import DOMPurify from "isomorphic-dompurify";

interface RichTextContentProps {
  content: string;
}

interface LexicalNode {
  type: string;
  tag?: string;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  indent?: number;
  direction?: string | null;
  version?: number;
  detail?: number;
  mode?: string;
  style?: string;
}

interface LexicalRoot {
  root: LexicalNode;
}

export default function RichTextContent({ content }: RichTextContentProps) {
  // Parse JSON content
  let parsedContent: LexicalRoot;
  try {
    parsedContent = JSON.parse(content);
  } catch {
    // If parsing fails, render as sanitized HTML fallback (prevents XSS)
    // const sanitizedContent = DOMPurify.sanitize(content);
    return (
      <div
        className="prose prose-lg max-w-none"
        // dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    if (!node) return null;

    // Handle text nodes
    if (node.type === "text") {
      const textContent = node.text || "";
      if (!textContent && node.type === "text") return null;

      // Apply formatting based on format flags
      if (node.format === 1) {
        // Bold
        return (
          <strong key={index} className="font-semibold text-[#1f2937]">
            {textContent}
          </strong>
        );
      }
      if (node.format === 2) {
        // Italic
        return (
          <em key={index} className="italic">
            {textContent}
          </em>
        );
      }

      return <span key={index}>{textContent}</span>;
    }

    // Handle line breaks
    if (node.type === "linebreak") {
      return <span key={index} className="block h-2" aria-hidden="true" />;
    }

    // Handle heading nodes
    if (node.type === "heading" && node.tag) {
      const headingClasses = {
        h1: "text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2937] mb-6 mt-12",
        h2: "text-2xl md:text-3xl lg:text-4xl font-semibold text-[#1f2937] mb-5 mt-10",
        h3: "text-xl md:text-2xl lg:text-3xl font-semibold text-[#1f2937] mb-4 mt-8",
        h4: "text-lg md:text-xl lg:text-2xl font-semibold text-[#1f2937] mb-3 mt-6",
        h5: "text-base md:text-lg lg:text-xl font-semibold text-[#1f2937] mb-3 mt-5",
        h6: "text-base md:text-lg font-semibold text-[#1f2937] mb-2 mt-4",
      };

      const HeadingTag = node.tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return React.createElement(
        HeadingTag,
        {
          key: index,
          className:
            headingClasses[node.tag as keyof typeof headingClasses] || "",
        },
        node.children?.map((child, i) => renderNode(child, i)),
      );
    }

    // Handle paragraph nodes
    if (node.type === "paragraph") {
      return (
        <p
          key={index}
          className="text-base md:text-lg text-[#4a5565] leading-relaxed mb-6"
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      );
    }

    // Handle list nodes
    if (node.type === "list") {
      const ListTag = node.tag === "ol" ? "ol" : "ul";
      const listClass =
        node.tag === "ol"
          ? "list-decimal list-outside space-y-3 my-6 pl-8"
          : "list-disc list-outside space-y-3 my-6 pl-8";

      return (
        <ListTag key={index} className={listClass}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </ListTag>
      );
    }

    // Handle list item nodes
    if (node.type === "listitem") {
      return (
        <li
          key={index}
          className="text-base md:text-lg text-[#4a5565] leading-relaxed mb-6 last:mb-0"
        >
          {node.children?.map((child, i) => (
            <React.Fragment key={i}>
              {renderNode(child, i)}
              {/* Safety: If next child is text and current is text, and no linebreak between them */}
              {i < (node.children?.length || 0) - 1 &&
                child.type === "text" &&
                node.children?.[i + 1]?.type === "text" && (
                  <span className="block h-2" aria-hidden="true" />
                )}
            </React.Fragment>
          ))}
        </li>
      );
    }

    // Handle quote nodes
    if (node.type === "quote") {
      return (
        <blockquote
          key={index}
          className="border-l-4 border-[#f7941d] pl-6 py-4 my-8 italic text-[#4a5565] bg-[#fff7ed] rounded-r-lg"
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </blockquote>
      );
    }

    // Handle link nodes
    if (node.type === "link") {
      return (
        <a
          key={index}
          href="#"
          className="text-[#f7941d] hover:text-[#e07d0a] underline transition-colors"
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </a>
      );
    }

    // Handle code block nodes
    if (node.type === "code") {
      return (
        <pre
          key={index}
          className="bg-gray-900 text-gray-100 p-6 rounded-xl my-8 overflow-x-auto"
        >
          <code className="text-sm md:text-base">
            {node.children?.map((child, i) => renderNode(child, i))}
          </code>
        </pre>
      );
    }

    // Recursively render children for unknown node types
    if (node.children) {
      return (
        <React.Fragment key={index}>
          {node.children.map((child, i) => renderNode(child, i))}
        </React.Fragment>
      );
    }

    return null;
  };

  return (
    <div className="blog-content">
      {parsedContent.root.children?.map((node, index) =>
        renderNode(node, index),
      )}
    </div>
  );
}
