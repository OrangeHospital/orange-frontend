"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Navigation items simplified to match the real website screenshot
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Doctors", href: "/doctors" },
    { label: "Facilities", href: "/facilities" },
    {
      label: "Patient Reviews",
      href: "/testimonial",
      hasDropdown: true,
      dropdownItems: [
        { label: "Testimonial", href: "/testimonial" },
        { label: "Success Stories", href: "/success-stories" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-none">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8 bg-white">
        {/* Logo Left */}
        <Link href="/" className="flex items-center py-2">
          <Image
            src="/orange-logo.png"
            alt="Orange Children Hospital Logo"
            width={172}
            height={50}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation Middle */}
        <nav className="hidden lg:flex items-center gap-8 font-medium h-full">
          {navItems.map((item) => {
            let isActive =
              item.href === "/"
                ? pathname === "/" || pathname === ""
                : pathname.startsWith(item.href);

            if (
              item.label === "Patient Reviews" &&
              (pathname.startsWith("/testimonial") ||
                pathname.startsWith("/success-stories"))
            ) {
              isActive = true;
            }

            return (
              <div
                key={item.label}
                className="relative group flex items-center h-full"
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1.5 py-2 text-[15px] font-semibold tracking-wide transition-colors duration-300 outline-none focus:outline-none focus-visible:outline-none select-none border-0 ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-[#F7A707]"
                  }`}
                  style={{ outline: "none", border: "none", boxShadow: "none" }}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`h-4 w-4 text-[#F7A707] transition-transform duration-200 group-hover:rotate-180`}
                    />
                  )}
                  {/* Modern 2026 Underline: Sleek glowing rounded pill, positioned closer to text */}
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-[#F7A707] transition-all duration-300 ${
                      isActive
                        ? "w-6 opacity-100 shadow-[0_0_12px_rgba(247,167,7,0.7)]"
                        : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-60"
                    }`}
                  />
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.dropdownItems && (
                  <div className="absolute top-[85%] left-0 w-52 rounded-xl bg-white border border-slate-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[100%] transition-all duration-300 z-50 overflow-hidden">
                    <div className="py-2 flex flex-col">
                      {item.dropdownItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={`relative pl-7 pr-5 py-3 text-sm font-semibold transition-all duration-200 text-left flex items-center group/sub ${
                              isSubActive
                                ? "text-[#F7A707] bg-orange-50/40"
                                : "text-slate-600 hover:text-[#F7A707] hover:bg-slate-50/60"
                            }`}
                          >
                            {/* Sleek vertical indicator line '|' on left edge */}
                            <span
                              className={`absolute left-3 top-[25%] bottom-[25%] w-[3px] rounded-full bg-[#F7A707] transition-all duration-300 origin-center ${
                                isSubActive
                                  ? "scale-y-100 opacity-100"
                                  : "scale-y-0 opacity-0 group-hover/sub:scale-y-100 group-hover/sub:opacity-100"
                              }`}
                            />
                            <span>{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
