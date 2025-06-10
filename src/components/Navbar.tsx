'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Join', href: '/signup' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (href: string) =>
    pathname === href
      ? 'bg-pink-500 text-white px-4 py-2 rounded-full'
      : 'hover:text-pink-500 transition';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600">
          FinestNeedle 💘
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={linkClass(href)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white/20 backdrop-blur px-4 pb-4 space-y-2 text-white font-medium">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${linkClass(href)} block w-full`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
