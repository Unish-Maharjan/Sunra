"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { label: "Vehicles", href: "/vehicles" },
  { label: "Technology", href: "/technology" },
  { label: "Experience", href: "/experience" },
  { label: "Support", href: "/support" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0E100E]/80 backdrop-blur-xl border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-360 mx-auto h-full px-8 xl:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center group transition-transform duration-200 hover:opacity-90"
          >
            <Image
              src="/logo/logo.svg"
              alt="Sunra Logo"
              height={42}
              width={145}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-10 xl:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading font-medium text-sm text-white/75 hover:text-white transition-colors 
              duration-200 tracking-tight relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 
                after:h-0.5
               after:bg-secondary hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center gap-4 xl:gap-5">
          {/* Utility Icons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              aria-label="Log in"
              className="w-9 h-9 rounded-full bg-white/4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center text-white/80 hover:text-white"
            >
              <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative w-9 h-9 rounded-full bg-white/4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center text-white/80 hover:text-white"
            >
              <FontAwesomeIcon icon={faCartShopping} className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;