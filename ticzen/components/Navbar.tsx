"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-black tracking-tight">
              TIC<span className="bg-black text-white px-0.5 rounded">ZE</span>N
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-black transition-colors">
                All Events <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg py-1 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {["Comedy", "Concerts", "Seminar", "Conference", "Night Life", "Tours", "Fashion"].map((item) => (
                  <Link key={item} href={`/events?category=${item.toLowerCase()}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/organizers" className="hover:text-black transition-colors">Organizers</Link>
            <Link href="/create-event" className="hover:text-black transition-colors">Create Event</Link>
            <Link href="/my-tickets" className="hover:text-black transition-colors">My Tickets</Link>
            <Link href="/about" className="hover:text-black transition-colors">About Us</Link>
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/signin" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-black transition-colors"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1">
            {["All Events", "Organizers", "Create Event", "My Tickets", "About Us"].map((item) => (
              <Link
                key={item}
                href={item === "All Events" ? "/events" : `/${item.toLowerCase().replace(" ", "-")}`}
                className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-black"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="pt-3 flex gap-3">
              <Link href="/auth/signin" className="flex-1 text-center border border-gray-300 text-sm font-medium py-2 rounded-full hover:bg-gray-50">
                Sign In
              </Link>
              <Link href="/auth/signup" className="flex-1 text-center bg-gray-900 text-white text-sm font-medium py-2 rounded-full hover:bg-black">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
