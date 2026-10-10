"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface MenuItemData {
  menuName?: string;
  link?: string;
  label?: string;
  href?: string;
  status?: string;
  isClickable?: boolean;
  children?: MenuItemData[];
  dropdownItems?: MenuItemData[];
}

interface HeaderProps {
  menu?: MenuItemData[];
}

export default function Header({ menu }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Lock body scroll when mobile menu is open to prevent background scroll leaks
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Helper function to check if item status is active
  const isActiveStatus = (status: string | undefined | null): boolean => {
    if (status === undefined || status === null) return true;
    if (typeof status === "string") return status.toLowerCase() === "active";
    return true;
  };

  // Navigation items loaded dynamically from Sanity if available, otherwise fallback
  const rawMenuItems =
    menu && menu.length > 0
      ? menu
      : [
          { label: "Home", href: "/", isClickable: true, status: "active" },
          {
            label: "About",
            href: "/about",
            isClickable: true,
            status: "active",
          },
          {
            label: "Doctors",
            href: "/doctors",
            isClickable: true,
            status: "active",
          },
          {
            label: "Facilities",
            href: "/facilities",
            isClickable: true,
            status: "active",
          },
          {
            label: "Patient Reviews",
            href: "/testimonial",
            isClickable: true,
            status: "active",
            dropdownItems: [
              {
                label: "Testimonial",
                href: "/testimonial",
                isClickable: true,
                status: "active",
              },
              {
                label: "Success Stories",
                href: "/success-stories",
                isClickable: true,
                status: "active",
              },
            ],
          },
          {
            label: "Contact",
            href: "/contact",
            isClickable: true,
            status: "active",
          },
        ];

  const navItems = rawMenuItems
    .filter((item: MenuItemData) => isActiveStatus(item.status))
    .map((item: MenuItemData) => {
      const rawChildren = item.children || item.dropdownItems || [];
      const activeChildren = rawChildren
        .filter((child: MenuItemData) => isActiveStatus(child.status))
        .map((child: MenuItemData) => ({
          label: child.menuName || child.label || "",
          href: child.link || child.href || "#",
          status: child.status ?? "active",
          isClickable: child.isClickable ?? true,
        }));

      return {
        label: item.menuName || item.label || "",
        href: item.link || item.href || "#",
        status: item.status ?? "active",
        isClickable: item.isClickable ?? true,
        hasDropdown: activeChildren.length > 0,
        dropdownItems: activeChildren,
      };
    });

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
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 font-medium h-full">
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
                {item.isClickable ? (
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1.5 py-2 text-[15px] font-semibold tracking-wide transition-colors duration-300 outline-none focus:outline-none focus-visible:outline-none select-none border-0 ${
                      isActive
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-[#F7A707]"
                    }`}
                    style={{
                      outline: "none",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`h-4 w-4 text-[#F7A707] transition-transform duration-200 group-hover:rotate-180`}
                      />
                    )}
                    {/* Modern Underline: Sleek glowing rounded pill */}
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-[#F7A707] transition-all duration-300 ${
                        isActive
                          ? "w-6 opacity-100 shadow-[0_0_12px_rgba(247,167,7,0.7)]"
                          : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-60"
                      }`}
                    />
                  </Link>
                ) : (
                  <span
                    className="relative flex items-center gap-1.5 py-2 text-[15px] font-semibold tracking-wide text-slate-400 cursor-not-allowed select-none border-0"
                    title={`${item.label} (Disabled)`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:rotate-180`}
                      />
                    )}
                  </span>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && item.dropdownItems && (
                  <div className="absolute top-[85%] left-0 w-52 rounded-xl bg-white border border-slate-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[100%] transition-all duration-300 z-50 overflow-hidden">
                    <div className="py-2 flex flex-col">
                      {item.dropdownItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href;

                        if (!subItem.isClickable) {
                          return (
                            <span
                              key={subItem.label}
                              className="relative pl-7 pr-5 py-3 text-sm font-semibold text-slate-400 cursor-not-allowed text-left flex items-center select-none"
                            >
                              <span>{subItem.label}</span>
                            </span>
                          );
                        }

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
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors duration-200"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          role="presentation"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white px-6 py-6 shadow-2xl flex flex-col h-full overflow-y-auto transition-transform duration-300 ease-out transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header: Logo & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <Image
                src="/orange-logo.png"
                alt="Orange Children Hospital Logo"
                width={130}
                height={38}
                priority
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 flex-1 flex flex-col gap-1">
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

              if (item.hasDropdown && item.dropdownItems) {
                const isDropdownExpanded = activeDropdown === item.label;
                return (
                  <div key={item.label} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(
                          isDropdownExpanded ? null : item.label,
                        )
                      }
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left text-base font-semibold transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? "text-[#F7A707] bg-orange-50/50"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                          isDropdownExpanded ? "rotate-180 text-[#F7A707]" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Items */}
                    <div
                      className={`overflow-hidden transition-all duration-300 pl-4 flex flex-col gap-1 border-l-2 border-slate-100 ml-4 mt-1 ${
                        isDropdownExpanded
                          ? "max-h-40 opacity-100 py-1"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.dropdownItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href;

                        if (!subItem.isClickable) {
                          return (
                            <span
                              key={subItem.label}
                              className="px-4 py-3.5 rounded-md text-sm font-semibold text-slate-400 cursor-not-allowed select-none"
                            >
                              {subItem.label}
                            </span>
                          );
                        }

                        return (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`px-4 py-3.5 rounded-md text-sm font-semibold transition-colors duration-200 ${
                              isSubActive
                                ? "text-[#F7A707] bg-orange-50/30"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/60"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (!item.isClickable) {
                return (
                  <span
                    key={item.label}
                    className="px-4 py-3 rounded-lg text-base font-semibold text-slate-400 cursor-not-allowed select-none"
                  >
                    {item.label}
                  </span>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-[#F7A707] bg-orange-50/50"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
