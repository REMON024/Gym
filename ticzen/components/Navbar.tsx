"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
  { label: "All Events", href: "/events", hasDropdown: true },
  { label: "Organizers", href: "/organizers" },
  { label: "Create Event", href: "/create-event" },
  { label: "My Tickets", href: "/my-tickets" },
  { label: "About Us", href: "/about" },
];

const eventCategories = ["Comedy", "Concerts", "Seminar", "Conference", "Night Life", "Launching", "Tours", "Fashion"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="font-extrabold text-xl tracking-tight leading-none">
              <span className="text-gray-900">TIC</span>
              <span className="inline-block bg-gray-900 text-white px-1 py-0.5 mx-0.5 rounded-sm" style={{fontSize:'inherit'}}>ZE</span>
              <span className="text-gray-900">N</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    {link.label} <ChevronDown size={14} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-44 z-50">
                      {eventCategories.map((cat) => (
                        <Link key={cat} href={`/events?category=${cat.toLowerCase().replace(" ", "-")}`}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                          {cat}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.label} href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/signin" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link href="/auth/signup"
              className="bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-black transition-colors">
              Register
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1 pb-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex gap-3 px-2">
              <Link href="/auth/signin"
                className="flex-1 text-center border border-gray-300 text-sm font-medium py-2.5 rounded-full hover:bg-gray-50">
                Sign In
              </Link>
              <Link href="/auth/signup"
                className="flex-1 text-center bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-full hover:bg-black">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
