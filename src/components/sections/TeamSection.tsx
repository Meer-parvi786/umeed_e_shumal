'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface TeamMemberData {
  name: string;
  position: string;
  bio: string;
  image: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

const teamMembers: TeamMemberData[] = [
  { name: 'Fatima Baneen', position: 'Founder & President', bio: 'The visionary founder of Umeed e Shumaal, Fatima Baneen is a passionate youth leader dedicated to transforming lives in Skardu through community service, education, and compassion.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
  { name: 'Fatima Noor', position: 'Vice President', bio: 'Co-leading Umeed e Shumaal with a focus on sustainable development and empowering women and children in underserved communities.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
  { name: 'Hassan Khan', position: 'General Secretary', bio: 'Managing day-to-day operations and ensuring smooth coordination across all departments.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
  { name: 'Amina Begum', position: 'Finance Secretary', bio: 'Overseeing all financial operations with complete transparency and accountability.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
  { name: 'Bilal Shah', position: 'Media & PR Lead', bio: 'Amplifying our mission through social media and community outreach.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
  { name: 'Zainab Fatima', position: 'Field Operations Lead', bio: 'Leading on-ground welfare activities across the Skardu region.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
  { name: 'Usman Wazir', position: 'Volunteer Coordinator', bio: 'Recruiting, training, and managing our dedicated volunteer team.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
  { name: 'Sara Hussain', position: 'Education Lead', bio: 'Managing scholarship programs and educational support for students.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
  { name: 'Dr. Kamran', position: 'Health & Welfare Lead', bio: 'Organizing medical camps and emergency medical support.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
  { name: 'Tariq Baig', position: 'Logistics & Support', bio: 'Ensuring smooth supply chains for all foundation activities.', image: '', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
];

const colors = [
  'from-sky-blue/20 to-sky-blue/5',
  'from-emerald/20 to-emerald/5',
  'from-blue-400/20 to-blue-400/5',
  'from-amber-400/20 to-amber-400/5',
  'from-rose-400/20 to-rose-400/5',
  'from-violet-400/20 to-violet-400/5',
  'from-teal-400/20 to-teal-400/5',
  'from-indigo-400/20 to-indigo-400/5',
  'from-cyan-400/20 to-cyan-400/5',
  'from-orange-400/20 to-orange-400/5',
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-emerald/10 text-emerald px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Meet the <span className="gradient-text">Passionate Leaders</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Our dedicated team of young leaders works tirelessly to bring hope and support to communities across Skardu.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Avatar area */}
              <div className={`relative h-44 bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center overflow-hidden`}>
                <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-gray-800 flex items-center justify-center text-2xl font-bold text-deep-blue dark:text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="p-5 text-center">
                <h3 className="font-bold text-deep-blue dark:text-white text-base">{member.name}</h3>
                <p className="text-sky-blue text-sm font-medium mt-1">{member.position}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-relaxed line-clamp-2">{member.bio}</p>

                {/* Social links */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {member.facebook !== '#' && (
                    <a href={member.facebook} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-sky-blue hover:text-white flex items-center justify-center text-gray-400 transition-all duration-200">
                      <Facebook className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <a href={member.twitter} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-sky-blue hover:text-white flex items-center justify-center text-gray-400 transition-all duration-200">
                    <Twitter className="h-3.5 w-3.5" />
                  </a>
                  <a href={member.instagram} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-sky-blue hover:text-white flex items-center justify-center text-gray-400 transition-all duration-200">
                    <Instagram className="h-3.5 w-3.5" />
                  </a>
                  <a href={member.linkedin} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-sky-blue hover:text-white flex items-center justify-center text-gray-400 transition-all duration-200">
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
