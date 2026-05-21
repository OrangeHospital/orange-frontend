import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  lang?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      lang,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark shadow-sm",
      secondary: "bg-secondary text-white hover:bg-secondary/90",
      outline: "border-2 border-primary text-primary hover:bg-surface",
      ghost: "text-primary hover:bg-surface",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg font-semibold",
    };

    const styles = cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
      variants[variant],
      sizes[size],
      className,
    );

    if (href) {
      const finalHref =
        lang && !href.startsWith(`/${lang}/`) && !href.startsWith("http")
          ? `/${lang}${href.startsWith("/") ? href : `/${href}`}`
          : href;

      return (
        <Link href={finalHref} className={styles}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
