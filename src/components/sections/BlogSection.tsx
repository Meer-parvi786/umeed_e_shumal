'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

const blogPosts = [
  {
    title: 'Winter Relief Drive Successfully Completed in Gilgit Baltistan',
    slug: 'winter-relief-drive-completed',
    excerpt: 'Our volunteers distributed warm clothing and food supplies to over 300 families across remote villages in the Gilgit Baltistan district under Umeed e Shumaal initiative.',
    category: 'Campaigns',
    image: '/images/community-help.jpg',
    date: 'Dec 15, 2025',
    featured: true,
  },
  {
    title: 'Education Scholarships Awarded to 100 Deserving Students',
    slug: 'education-scholarships-awarded',
    excerpt: 'Umeed e Shumaal has awarded educational scholarships to 100 deserving students across Gilgit Baltistan district, enabling them to pursue their dreams.',
    category: 'Education',
    image: '/images/education-support.jpg',
    date: 'Nov 28, 2025',
    featured: true,
  },
  {
    title: 'Free Medical Camp in Roundu Valley',
    slug: 'medical-camp-roundu-valley',
    excerpt: 'A comprehensive medical camp was organized by Umeed e Shumaal in Roundu Valley, providing free consultations and medicines to over 500 patients.',
    category: 'Health',
    image: '/images/medical-camp.jpg',
    date: 'Oct 10, 2025',
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  'Campaigns': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Education': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Health': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  'Community': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="blog" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-sky-blue/10 text-sky-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Latest Updates
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Stories & <span className="gradient-text">Updates</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Stay informed about our latest activities, campaigns, success stories, and community impact reports.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                </div>
                {post.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-warm-gold text-white px-2 py-1 rounded-full text-xs font-bold">Featured</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </div>
                <h3 className="text-lg font-bold text-deep-blue dark:text-white mb-2 group-hover:text-sky-blue transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <button className="inline-flex items-center gap-1 text-sky-blue text-sm font-semibold hover:gap-2 transition-all">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
