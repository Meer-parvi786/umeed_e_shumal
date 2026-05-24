'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Our Team' },
  { href: '#programs', label: 'Programs' },
  { href: '#donate', label: 'Donate' },
  { href: '#volunteer', label: 'Volunteer' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-deep-blue text-white/90 text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              +92-307-8582373
            </span>
            <span>|</span>
            <span>info@umeedeshumal.org</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Skardu, Gilgit-Baltistan, Pakistan</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-deep-blue/95 backdrop-blur-md shadow-lg'
            : 'bg-white/80 dark:bg-deep-blue/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="#home" className="flex items-center gap-3 group">
              <img
                src="/images/logo.png"
                alt="Umeed e Shumal Logo"
                className="h-10 lg:h-12 w-auto object-contain rounded-lg drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div className="hidden sm:block">
                <h1 className={`text-sm lg:text-base font-bold leading-tight transition-colors ${
                  isScrolled ? 'text-deep-blue dark:text-white' : 'text-deep-blue dark:text-white'
                }`}>
                  Umeed e Shumal
                </h1>
                <p className={`text-[10px] lg:text-xs transition-colors ${
                  isScrolled ? 'text-sky-blue/70' : 'text-sky-blue/70'
                }`}>
                  Hope of the North
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-sky-blue/10 hover:text-sky-blue ${
                    isScrolled ? 'text-deep-blue dark:text-white/80' : 'text-deep-blue dark:text-white/80'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="#donate"
                className="hidden sm:inline-flex items-center gap-2 bg-linear-to-r from-emerald to-emerald-dark hover:from-emerald-dark hover:to-emerald text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="h-4 w-4" />
                Donate Now
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled ? 'text-deep-blue dark:text-white' : 'text-deep-blue dark:text-white'
                }`}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-deep-blue border-t border-gray-200 dark:border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-deep-blue dark:text-white/80 rounded-lg hover:bg-sky-blue/10 hover:text-sky-blue transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#donate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mt-4 bg-gradient-to-r from-emerald to-emerald-dark text-white text-center px-4 py-3 rounded-full font-semibold"
                >
                  Donate Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
