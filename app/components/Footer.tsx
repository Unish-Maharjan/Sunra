import React from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  vehicles: [
    { label: "SUNRA ROBO-S", href: "/vehicles" },
    { label: "SUNRA MIKU SUPER", href: "/vehicles" },
    { label: "SUNRA CRYSTAL", href: "/vehicles" },
    { label: "SUNRA HAWK", href: "/vehicles" },
  ],
  technology: [
    { label: "Dual Battery Tech", href: "/technology" },
    { label: "Fingerprint Biometrics", href: "/technology" },
    { label: "Regenerative Braking", href: "/technology" },
    { label: "Smart Connectivity", href: "/technology" },
  ],
  support: [
    { label: "Find a Dealer", href: "/dealers" },
    { label: "Warranty & Service", href: "/warranty" },
    { label: "Owner's Manual", href: "/manuals" },
    { label: "Contact Us", href: "/support" },
  ],
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#080908] text-white border-t border-white/8 select-none">
      <div className="max-w-360 mx-auto w-full px-8 xl:px-14 py-16 sm:py-20">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-white/8">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start max-w-100">
            <Link
              href="/"
              className="inline-block transition-opacity duration-200 hover:opacity-85"
            >
              <Image
                src="/logo/logo.svg"
                alt="Sunra Logo"
                width={130}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="text-[#868A84] text-xs sm:text-sm font-sans mt-4 leading-relaxed">
              Pioneering intelligent electric mobility for modern urban living.
              Engineered with precision, designed for everyday freedom.
            </p>
          </div>

          {/* Navigation Column 1: Vehicles */}
          <div className="flex flex-col">
            <span className="font-heading text-xs font-semibold tracking-[0.2em] text-secondary uppercase mb-4">
              VEHICLES
            </span>
            <ul className="flex flex-col gap-3">
              {footerLinks.vehicles.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column 2: Technology */}
          <div className="flex flex-col">
            <span className="font-heading text-xs font-semibold tracking-[0.2em] text-secondary uppercase mb-4">
              INNOVATION
            </span>
            <ul className="flex flex-col gap-3">
              {footerLinks.technology.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column 3: Support */}
          <div className="flex flex-col">
            <span className="font-heading text-xs font-semibold tracking-[0.2em] text-secondary uppercase mb-4">
              SUPPORT
            </span>
            <ul className="flex flex-col gap-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737771]">
          <div className="flex items-center gap-6">
            <span>&copy; {currentYear} SUNRA. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-200"
            >
             Designed & Developed By
            </Link>
            <span><Image src="/logo/webx-logo.svg" alt="logo" width={50} height={50}/></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;