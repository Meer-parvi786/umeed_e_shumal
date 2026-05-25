'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, GraduationCap, HandHelping, DollarSign, HeartPulse, Home } from 'lucide-react';

const stats = [
  { icon: Home, label: 'Families Helped', value: 1250, suffix: '+', color: 'text-amber-500' },
  { icon: GraduationCap, label: 'Students Supported', value: 830, suffix: '+', color: 'text-sky-blue' },
  { icon: HandHelping, label: 'Active Volunteers', value: 245, suffix: '+', color: 'text-emerald' },
  { icon: DollarSign, label: 'Donations Raised', value: 4500000, suffix: '', color: 'text-rose-500', prefix: 'PKR ' },
  { icon: HeartPulse, label: 'Medical Camps', value: 67, suffix: '', color: 'text-purple-500' },
];

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-deep" />
      <div className="absolute inset-0 bg-[url('/images/hero-Gilgit Baltistan.jpg')] bg-cover bg-center opacity-10" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-sky-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-emerald/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-white/10 text-sky-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Numbers That <span className="text-sky-blue">Tell Our Story</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Every number represents a life touched, a family supported, and a community strengthened through collective effort and generosity.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors`}>
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                <AnimatedCounter value={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix} />
              </p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
