'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Muhammad Aslam',
    role: 'Beneficiary Father',
    content: 'The foundation founded by Rehan supported my children\'s education when I could not afford it. They gave us hope and a brighter future. I am forever grateful to the young volunteers who came to our village.',
    rating: 5,
  },
  {
    name: 'Zubaida Bibi',
    role: 'Community Elder',
    content: 'The medical camp organized by Umeed e Shumal saved many lives in our remote village. Rehan and her team are doing extraordinary work for our community. May Allah bless them all.',
    rating: 5,
  },
  {
    name: 'Ali Raza',
    role: 'Volunteer',
    content: 'Volunteering with Umeed e Shumal has been the most rewarding experience of my life. Seeing the smiles on children\'s faces when they receive school supplies is priceless. This is what real change looks like.',
    rating: 5,
  },
  {
    name: 'Dr. Shahzad',
    role: 'Medical Volunteer',
    content: 'I have been part of multiple medical camps with Umeed e Shumal. The organization founded by Rehan is transparent, well-organized, and truly dedicated to serving the people of Skardu. Highly recommended for anyone who wants to give back.',
    rating: 5,
  },
  {
    name: 'Sana Mir',
    role: 'Donor',
    content: 'I trust Umeed e Shumal completely with my donations. They provide detailed reports and I can see the direct impact of every contribution on the community. It feels great to be part of this noble mission.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length;
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const t = testimonials[current];
  const avatarColors = [
    'from-sky-blue to-blue-600',
    'from-emerald to-teal-600',
    'from-amber to-orange-600',
    'from-rose to-pink-600',
    'from-violet to-purple-600',
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            What People <span className="gradient-text">Say About Us</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
            <Quote className="h-12 w-12 text-sky-blue/20 absolute top-6 left-6" />

            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6 justify-center">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-warm-gold text-warm-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed text-center mb-8 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-linear-to-br ${avatarColors[current % avatarColors.length]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-deep-blue dark:text-white">{t.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-deep-blue transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-sky-blue w-8' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => navigate(1)}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-deep-blue transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
