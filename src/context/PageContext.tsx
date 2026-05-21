"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface PageContextType {
  alternates: Record<string, string>;
  setAlternates: (alternates: Record<string, string>) => void;
  fallbacks: Record<string, string>;
  setFallbacks: (f: Record<string, string>) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [alternates, setAlternates] = useState<Record<string, string>>({});
  const [fallbacks, setFallbacks] = useState<Record<string, string>>({});

  return (
    <PageContext.Provider
      value={{ alternates, setAlternates, fallbacks, setFallbacks }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
}

export function PageAlternates({
  alternates,
  fallbacks,
}: {
  alternates: Record<string, string>;
  fallbacks?: Record<string, string>;
}) {
  const { setAlternates, setFallbacks } = usePageContext();

  useEffect(() => {
    setAlternates(alternates);
    setFallbacks(fallbacks || {});
    return () => {
      setAlternates({});
      setFallbacks({});
    };
  }, [alternates, fallbacks, setAlternates, setFallbacks]);

  return null;
}
