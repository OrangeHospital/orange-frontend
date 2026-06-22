import Link from "next/link";
import React from "react";

const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_UNDERLINE = 4;
const IS_STRIKETHROUGH = 8;
const IS_CODE = 16;
const IS_SUBSCRIPT = 32;
const IS_SUPERSCRIPT = 64;

function LexicalRenderer({ node }) {
  if (node.type === "text") {
    let element = <>{node.text}</>;
    const format = node.format || 0;

    if (format & IS_BOLD) element = <strong>{element}</strong>;
    if (format & IS_ITALIC) element = <em>{element}</em>;
    if (format & IS_UNDERLINE) element = <u>{element}</u>;
    if (format & IS_STRIKETHROUGH) element = <s>{element}</s>;
    if (format & IS_CODE)
      element = <code className="bg-gray-100 px-1 rounded">{element}</code>;
    if (format & IS_SUBSCRIPT) element = <sub>{element}</sub>;
    if (format & IS_SUPERSCRIPT) element = <sup>{element}</sup>;

    return element;
  }

  const children =
    node.children?.map((child, i) => (
      <LexicalRenderer key={i} node={child} />
    )) || null;

  switch (node.type) {
    case "root":
      return <div className="space-y-4">{children}</div>;

    case "paragraph":
      return (
        <p className="text-[#4a5565] text-lg leading-relaxed">{children}</p>
      );

    case "heading": {
      const Tag = node.tag || "h2";
      return <Tag className="text-black font-bold mb-4">{children}</Tag>;
    }

    case "list": {
      const ListTag = node.tag === "ol" ? "ol" : "ul";
      return (
        <ListTag
          className={`list-${node.tag === "ol" ? "decimal" : "disc"} pl-6 space-y-2`}
        >
          {children}
        </ListTag>
      );
    }

    case "listitem":
      return <li className="text-lg">{children}</li>;

    case "link":
      return (
        <Link
          href={node.url || "#"}
          target={node.target}
          rel={node.rel}
          className="text-accent hover:underline"
        >
          {children}
        </Link>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-accent pl-4 italic bg-gray-50 py-2">
          {children}
        </blockquote>
      );

    default:
      return <span>{children}</span>;
  }
}

export default function ParagraphEditorSection({ data }) {
  if (!data) return null;

  let lexicalState = null;
  let rawContent = data;

  try {
    if (data && typeof data === "object") {
      if ("sectionData" in data && data.sectionData) {
        rawContent = data.sectionData;
      } else if ("content" in data && data.content) {
        rawContent = data.content;
      }
    }

    if (typeof rawContent === "string") {
      lexicalState = JSON.parse(rawContent);
    } else if (rawContent && typeof rawContent === "object") {
      lexicalState = rawContent.content?.root ? rawContent.content : rawContent;
    }
  } catch {
    // If not JSON, we keep lexicalState as null and will fallback to HTML
  }

  // If we have a valid lexical state with a root, use the renderer
  if (lexicalState && lexicalState.root) {
    return (
      <div className="container mx-auto px-5 md:px-10 max-w-5xl py-4">
        <LexicalRenderer node={lexicalState.root} />
      </div>
    );
  }

  // Fallback to HTML rendering for raw strings/HTML
  if (typeof rawContent === "string" && rawContent.trim() !== "") {
    return (
      <div className="container mx-auto px-5 md:px-10 max-w-7xl py-4">
        <div
          className="text-[#4a5565] text-lg leading-relaxed prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: rawContent }}
        />
      </div>
    );
  }

  return null;
}
