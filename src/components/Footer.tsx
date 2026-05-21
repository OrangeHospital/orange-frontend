import Link from "next/link";
import { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Doctors", href: "/doctors" },
    { label: "Our Facilities", href: "/facilities" },
    { label: "Contact Us", href: "/contact" },
  ];

  const facilities = [
    { label: "40 Bedded NICU and PICU" },
    { label: "High-tech Operation Theater" },
    { label: "24 HRS Ambulance Services" },
    { label: "24X7 Neonatologist & Intensivist" },
    { label: "Isolated Pediatric Dialysis Unit" },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <svg
                  viewBox="0 0 100 100"
                  className="h-7 w-7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="55" r="32" fill="#F0A500" />
                  <path
                    d="M50 38V72M33 55H67"
                    stroke="white"
                    strokeWidth="11"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 23C50 15 58 10 65 13C62 20 56 23 50 23Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M50 23C44 14 34 16 31 23C39 24 46 25 50 23Z"
                    fill="#8BC34A"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold uppercase tracking-tight text-white">
                Orange Hospital
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Orange Children Hospital is Gujarat&apos;s one of the largest 50
              bedded pediatric hospital. We specialize in Neonatal & Pediatric
              Critical Care with Level 3 NICU and PICU.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={
                      link.href === "/"
                        ? `/${locale}`
                        : `/${locale}${link.href}`
                    }
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base uppercase tracking-wider">
              Facilities
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {facilities.map((fac) => (
                <li key={fac.label} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {fac.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base uppercase tracking-wider">
              Contact Info
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">
              Opp. Satyamev Royal, Near Tapovan Circle, Chandkheda, Ahmedabad,
              Gujarat 382424
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <strong>Phone:</strong> +91 79 4009 5900, +91 97243 05900
            </p>
            <p className="text-sm text-gray-400">
              <strong>Email:</strong> info@orangechildrenhospital.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Orange Children Hospital. All Rights
            Reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
