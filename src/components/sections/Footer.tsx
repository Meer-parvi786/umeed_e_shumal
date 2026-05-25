'use client';

import Link from 'next/link';
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { useState } from 'react';

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#programs', label: 'Our Programs' },
  { href: '#donate', label: 'Donate' },
  { href: '#volunteer', label: 'Volunteer' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail('');
    } catch {
      // silent fail
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-deep-blue text-white relative">
      {/* Donate CTA Banner */}
      <div className="bg-linear-to-r from-emerald to-emerald-dark">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">Every Contribution Makes a Difference</h3>
            <p className="text-white/80 mt-1">Join us in building a better future for the people of Gilgit Baltistan.</p>
          </div>
          <Link
            href="#donate"
            className="inline-flex items-center gap-2 bg-white text-emerald-dark px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            <Heart className="h-5 w-5" />
            Donate Now
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="Umeed e Shumaal Logo"
                className="h-10 w-auto object-contain rounded-lg brightness-0 invert"
              />
              <div>
                <h3 className="font-bold text-lg">Umeed e Shumaal</h3>
                <p className="text-xs text-white/60">Hope of the North</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Umeed e Shumaal (Hope of the North) is a youth-led welfare initiative founded by Team, supporting education, healthcare, and underprivileged families in Gilgit Baltistan, Gilgit-Baltistan, Pakistan. Together, we are building a stronger community.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-sky-blue flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-sky-blue flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/umeed_e_shumal/" className="w-9 h-9 rounded-full bg-white/10 hover:bg-sky-blue flex items-center justify-center transition-colors" aria-label="Instagram" target='_blank'>
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-sky-blue flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/70 hover:text-sky-blue transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 text-sky-blue shrink-0" />
                <span>Main Bazaar, Gilgit Baltistan, Gilgit-Baltistan, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="h-4 w-4 text-sky-blue shrink-0" />
                <span>+92-307-8582373</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="h-4 w-4 text-sky-blue shrink-0" />
                <span>info@umeedeshumaal.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-white/70 text-sm mb-4">Subscribe to receive updates about our activities and events.</p>
            {subscribed ? (
              <p className="text-emerald font-medium text-sm">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-sky-blue"
                  required
                />
                <button
                  type="submit"
                  className="bg-sky-blue hover:bg-sky-blue/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-sm text-center">
            &copy; {new Date().getFullYear()} Umeed e Shumaal. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-blue flex items-center justify-center transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923078582373"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
}
