'use client';

import { motion } from 'framer-motion';
import { Heart, Users, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-skardu.jpg"
          alt="Skardu Mountains Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-deep-blue/80 via-deep-blue/50 to-deep-blue/80" />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Heart className="h-4 w-4 text-red-400" />
            Umeed e Shumal — Youth-Led Welfare Initiative in Skardu
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Together We Can{' '}
          <span className="gradient-text">Change Lives</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Founded by Team — A youth-led welfare initiative supporting education, healthcare, and underprivileged families in Skardu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('donate')}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald to-emerald-dark text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-emerald/25 hover:scale-105 transition-all duration-300"
          >
            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Donate Now
          </button>
          <button
            onClick={() => scrollToSection('volunteer')}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            <Users className="h-5 w-5" />
            Join As Volunteer
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            100% Transparent
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-blue animate-pulse" />
            Youth-Led
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-warm-gold animate-pulse" />
            Community Focused
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
