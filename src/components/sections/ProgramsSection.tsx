'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, HeartPulse, Package, Users, BookOpen, Stethoscope, Wheat, Mountain, HandHelping, Lightbulb } from 'lucide-react';

const programs = [
  {
    icon: GraduationCap,
    title: 'Education Support',
    subtitle: 'Empowering through knowledge',
    desc: 'We provide scholarships, school supplies, tuition support, and mentoring programs to deserving students in Skardu. Our goal is to ensure that financial constraints never stand in the way of a child\'s education and dreams.',
    features: ['Scholarships for deserving students', 'School supplies distribution', 'After-school tutoring programs', 'Career counseling & mentoring'],
    gradient: 'from-blue-500 to-sky-blue',
    bgLight: 'bg-blue-50',
  },
  {
    icon: HeartPulse,
    title: 'Health & Welfare',
    subtitle: 'Caring for the community',
    desc: 'Our health programs include free medical camps, emergency medical support, medicine distribution, and health awareness campaigns in remote areas where healthcare access is limited.',
    features: ['Free medical camps', 'Emergency medical aid', 'Medicine distribution', 'Health awareness campaigns'],
    gradient: 'from-rose-500 to-pink-500',
    bgLight: 'bg-rose-50',
  },
  {
    icon: Package,
    title: 'Food & Relief',
    subtitle: 'Nourishing those in need',
    desc: 'We organize ration drives, winter relief packages, and disaster relief efforts to support families facing food insecurity and harsh weather conditions in the mountainous region.',
    features: ['Monthly ration drives', 'Winter relief packages', 'Disaster relief support', 'Community kitchen initiatives'],
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
  },
  {
    icon: Users,
    title: 'Community Development',
    subtitle: 'Building stronger communities',
    desc: 'We engage youth through volunteer programs, community awareness events, skill development workshops, and cultural preservation activities that foster unity and progress.',
    features: ['Youth engagement programs', 'Skill development workshops', 'Community awareness events', 'Cultural preservation initiatives'],
    gradient: 'from-emerald to-teal-500',
    bgLight: 'bg-emerald-50',
  },
];

const quickStats = [
  { icon: BookOpen, label: 'Students Supported', value: '830+' },
  { icon: Stethoscope, label: 'Medical Camps', value: '67' },
  { icon: Wheat, label: 'Families Fed', value: '1,250+' },
  { icon: Mountain, label: 'Villages Reached', value: '45+' },
  { icon: HandHelping, label: 'Volunteers', value: '245+' },
  { icon: Lightbulb, label: 'Awareness Events', value: '120+' },
];

export default function ProgramsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="programs" className="py-20 md:py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-sky-blue/10 text-sky-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Making a <span className="gradient-text">Real Difference</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Our programs are designed to address the most pressing needs of the Skardu community, from education and healthcare to food security and youth empowerment.
          </p>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-16"
        >
          {quickStats.map((stat, i) => (
            <div key={stat.label} className="text-center p-3">
              <div className="w-10 h-10 mx-auto rounded-xl bg-sky-blue/10 flex items-center justify-center mb-2">
                <stat.icon className="h-5 w-5 text-sky-blue" />
              </div>
              <p className="text-lg md:text-xl font-bold text-deep-blue dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`p-8 md:p-10`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                    <program.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{program.subtitle}</p>
                    <h3 className="text-xl font-bold text-deep-blue dark:text-white">{program.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{program.desc}</p>

                <ul className="space-y-3">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${program.gradient} flex items-center justify-center shrink-0`}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
