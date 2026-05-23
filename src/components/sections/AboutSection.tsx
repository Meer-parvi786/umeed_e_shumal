'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Shield, Users, BookOpen, Heart } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const values = [
  { icon: Shield, title: 'Transparency', desc: 'Every donation is tracked and reported. We maintain complete financial transparency with our donors and community members.' },
  { icon: Users, title: 'Youth-Led', desc: 'Driven by passionate young leaders of Skardu who understand the needs of their community and are committed to making a difference.' },
  { icon: Heart, title: 'Compassion', desc: 'We approach every individual and family with empathy and respect, understanding that dignity is as important as the help we provide.' },
  { icon: BookOpen, title: 'Education First', desc: 'We believe education is the most powerful tool for change. Our programs prioritize educational support for underprivileged children.' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-sky-blue/10 text-sky-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Empowering Communities,{' '}
            <span className="gradient-text">Changing Futures</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Umeed e Shumaal (Hope of the North) is a grassroots, youth-led organization founded by Fatima Baneen with a simple yet powerful mission: to uplift underprivileged families, support deserving students, and provide healthcare assistance to the people of Skardu and surrounding areas in Gilgit-Baltistan, Pakistan.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-gradient-to-br from-deep-blue to-[#1a3f7a] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-sky-blue/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-sky-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">
                Founded by Fatima Baneen, Umeed e Shumaal aims to empower the youth of Skardu to become agents of positive change by providing a platform for education, healthcare, welfare, and community development. We strive to create a society where every family has access to basic necessities, every child has the opportunity to receive quality education, and every individual can live with dignity and hope for a better tomorrow. Our foundation stands as a beacon of hope for the people of Gilgit-Baltistan.
              </p>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-gradient-to-br from-emerald to-emerald-dark rounded-2xl p-8 md:p-10 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">
                A Skardu where no family goes hungry, no child is deprived of education, and no individual is denied basic healthcare. Under the leadership of Fatima Baneen, we envision a community that is self-sufficient, educated, healthy, and united in the spirit of compassion and service. Through collective effort and youth leadership, we aim to transform Skardu into a model of community-driven development in Gilgit-Baltistan.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:border-sky-blue/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-blue/10 group-hover:bg-sky-blue/20 flex items-center justify-center mb-4 transition-colors">
                <value.icon className="h-6 w-6 text-sky-blue" />
              </div>
              <h3 className="text-lg font-bold text-deep-blue dark:text-white mb-2">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
