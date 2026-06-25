import Link from "next/link";
import { PortableTextComponents } from "@portabletext/react";
import { projectId, dataset } from "./sanity";
import Image from "next/image";

function resolveSanityAssetRef(ref: string) {
  const parts = ref.split("-");
  if (parts.length < 4 || parts[0] !== "image") return "";
  const assetId = parts[1];
  const dimensions = parts[2];
  const extension = parts[3];
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${extension}`;
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const ref = value?.asset?._ref || value?.asset?._id;
      if (!ref) return null;
      const imageUrl = resolveSanityAssetRef(ref);
      if (!imageUrl) return null;
      return (
        <div className="relative my-8 overflow-hidden max-w-full flex justify-center">
          <Image
            src={imageUrl}
            alt={value?.altText || value?.alt || "Image"}
            width={400}
            height={400}
            className="max-h-[500px] w-auto rounded-xl object-contain"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mt-6 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-5 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mt-4 mb-2">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-slate-600 leading-relaxed mb-4 text-medium">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#F7A707] pl-4 italic bg-slate-50/80 py-3 my-4 text-slate-700 rounded-r-md">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
    underline: ({ children }) => (
      <u className="underline decoration-[#F7A707]/60 decoration-2 underline-offset-2">
        {children}
      </u>
    ),
    "strike-through": ({ children }) => (
      <s className="line-through text-slate-400">{children}</s>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 text-[#EF641A] font-mono px-1.5 py-0.5 rounded text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal =
        href.startsWith("http") ||
        href.startsWith("https") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");
      if (isExternal) {
        return (
          <a
            href={href}
            className="text-[#F7A707] hover:text-[#EF641A] hover:underline font-semibold transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-[#F7A707] hover:text-[#EF641A] hover:underline font-semibold transition-colors duration-200"
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-600">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-slate-600">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};
