import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { MapPin, Mail, Phone, Plus } from "lucide-react";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  // Navigation items matching the layout of the requested design
  const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "About Us", href: "/about" },
    {
      label: "Services",
      href: "/services",
      hasDropdown: true,
      dropdownItems: [
        { label: "NICU & PICU Care", href: "/services/nicu-picu" },
        { label: "Pediatric Surgery", href: "/services/surgery" },
        { label: "High-tech OT", href: "/services/operation-theater" },
        { label: "Ambulance Services", href: "/services/ambulance" },
      ],
    },
    { label: "Appointment", href: "/appointment" },
    {
      label: "Pages",
      href: "/pages",
      hasDropdown: true,
      dropdownItems: [
        { label: "Our Doctors", href: "/doctors" },
        { label: "Our Facilities", href: "/facilities" },
        { label: "Patient Reviews", href: "/reviews" },
      ],
    },
    {
      label: "Blog",
      href: "/blog",
      hasDropdown: true,
      dropdownItems: [
        { label: "Single Post", href: "/blog/single-post" },
        { label: "Health Tips", href: "/blog/health-tips" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* 1. Top Bar (Row 1) */}
      <div className="border-b border-sky-100/50 bg-[#F4F9FD]/60 text-xs md:text-sm py-2.5">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Top Bar Left: Address, Email, Phone */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 md:gap-6 text-slate-600 font-medium">
            <span className="flex items-center gap-1.5 transition-colors hover:text-primary">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>Opp. Satyamev Royal, Near Tapovan Circle, Ahmedabad</span>
            </span>
            <a
              href="mailto:info@orangechildrenhospital.com"
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>info@orangechildrenhospital.com</span>
            </a>
            <a
              href="tel:+919724305900"
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>+91 97243 05900</span>
            </a>
          </div>

          {/* Top Bar Right: Social Media Icons */}
          <div className="flex items-center gap-2">
            {[
              {
                label: "Facebook",
                href: "#",
                svg: (
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6c0-.5.5-1 1-1H18V1h-3c-3 0-5 2-5 5v2z" />
                  </svg>
                ),
              },
              {
                label: "Twitter",
                href: "#",
                svg: (
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                ),
              },
              {
                label: "Youtube",
                href: "#",
                svg: (
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                ),
              },
            ].map((social, index) => {
              return (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-7 w-7 items-center justify-center rounded bg-[#0A2540] text-white transition-all hover:bg-primary duration-300"
                  aria-label={social.label}
                >
                  {social.svg}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar (Row 2) */}
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8 bg-white">
        {/* Logo Left */}
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {/* Beautiful Orange Fruit Logo */}
            <svg
              viewBox="0 0 100 100"
              className="h-9 w-9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Orange fruit body */}
              <circle cx="50" cy="55" r="32" fill="#F7A707" />
              {/* Highlight gradient */}
              <circle
                cx="42"
                cy="47"
                r="28"
                fill="url(#orangeGrad)"
                opacity="0.3"
              />

              {/* White plus symbol in the middle */}
              <path
                d="M50 38V72M33 55H67"
                stroke="white"
                strokeWidth="11"
                strokeLinecap="round"
              />

              {/* Leaf stem */}
              <path
                d="M50 23C50 15 58 10 65 13C62 20 56 23 50 23Z"
                fill="#4CAF50"
              />
              {/* Leaf */}
              <path
                d="M50 23C44 14 34 16 31 23C39 24 46 25 50 23Z"
                fill="#8BC34A"
              />

              <defs>
                <radialGradient
                  id="orangeGrad"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  transform="translate(40 45) rotate(90) scale(40)"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold uppercase tracking-tight text-primary">
              Orange
            </span>
            <span className="text-[8px] font-bold tracking-widest text-[#6b7280] uppercase -mt-1">
              Neonatal & Pediatric Intensive Care Unit
            </span>
          </div>
        </Link>

        {/* Navigation Middle */}
        <nav className="hidden lg:flex items-center gap-6 font-semibold h-full">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group flex items-center h-full"
            >
              <Link
                href={
                  item.href === "/" ? `/${locale}` : `/${locale}${item.href}`
                }
                className={`flex items-center gap-1 text-sm md:text-base font-bold tracking-wide transition-colors py-8 ${
                  item.active
                    ? "text-primary hover:text-primary-dark"
                    : "text-slate-900 hover:text-primary"
                }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <Plus className="h-3 w-3 stroke-[3px] text-sky-400 group-hover:text-primary transition-colors" />
                )}
              </Link>

              {/* Dynamic Dropdown Hover Menu matching the exact design and shape of your screenshot */}
              {item.hasDropdown && item.dropdownItems && (
                <div className="absolute top-[80%] left-0 w-52 rounded-xl bg-white border border-slate-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[95%] transition-all duration-300 z-50 overflow-hidden">
                  <div className="py-2 flex flex-col">
                    {item.dropdownItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={`/${locale}${subItem.href}`}
                        className="px-5 py-3 text-sm font-bold text-[#0A2540] hover:bg-slate-50 hover:text-primary transition-colors text-left"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button Right */}
        <div className="hidden md:flex items-center">
          <Link
            href={`/${locale}/appointment`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm md:text-base font-extrabold uppercase tracking-wider text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-primary-dark/30 transition-all duration-300 transform active:scale-95"
          >
            <span>Make Appointment</span>
            <Plus className="h-4.5 w-4.5 stroke-[3px]" />
          </Link>
        </div>

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
