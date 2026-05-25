'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ZoomIn, Camera } from 'lucide-react';

const galleryItems = [
  { id: 1, title: 'Winter Relief Distribution', category: 'Welfare', image: '/images/community-help.jpg' },
  { id: 2, title: 'Students Receiving Scholarships', category: 'Education', image: '/images/education-support.jpg' },
  { id: 3, title: 'Free Medical Camp in Roundu', category: 'Healthcare', image: '/images/medical-camp.jpg' },
  { id: 4, title: 'Team Meeting & Planning', category: 'Team', image: '/images/hero-Gilgit Baltistan.jpg' },
  { id: 5, title: 'Ration Drive for Families', category: 'Welfare', image: '/images/community-help.jpg' },
  { id: 6, title: 'Volunteer Training Session', category: 'Volunteers', image: '/images/education-support.jpg' },
  { id: 7, title: 'Gilgit Baltistan Mountain Outreach', category: 'Community', image: '/images/hero-Gilgit Baltistan.jpg' },
  { id: 8, title: 'School Supply Distribution', category: 'Education', image: '/images/education-support.jpg' },
  { id: 9, title: 'Community Health Awareness', category: 'Healthcare', image: '/images/medical-camp.jpg' },
];

const categories = ['All', 'Welfare', 'Education', 'Healthcare', 'Volunteers', 'Team', 'Community'];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-block bg-emerald/10 text-emerald px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Gallery
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Moments of <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            A glimpse into our activities, events, and the lives we touch every day in the Gilgit Baltistan community.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-deep-blue text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              layout
              className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3] bg-gray-200"
              onClick={() => setLightboxIndex(filtered.findIndex(g => g.id === item.id))}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-white/70 text-xs">{item.category}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightboxIndex].image}
              alt={filtered[lightboxIndex].title}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-lg">{filtered[lightboxIndex].title}</p>
              <p className="text-white/60 text-sm">{filtered[lightboxIndex].category}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(Math.max(0, lightboxIndex - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(Math.min(filtered.length - 1, lightboxIndex + 1));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            →
          </button>
        </motion.div>
      )}
    </section>
  );
}
