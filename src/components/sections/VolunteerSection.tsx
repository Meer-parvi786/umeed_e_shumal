'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { UserCheck, Users, Mail, Phone, MapPin, Briefcase, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const skills = [
  'Teaching', 'Medical/Healthcare', 'IT/Technology', 'Photography', 'Event Management',
  'Social Media', 'Fundraising', 'Construction', 'Counseling', 'Accounting',
  'Translation', 'Driving/Logistics', 'Cooking', 'First Aid', 'Other',
];

export default function VolunteerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: '', gender: '', city: '', phone: '', email: '', availability: '', reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          skills: selectedSkills.join(', '),
        }),
      });
      if (res.ok) {
        toast.success('Thank you for applying! We will contact you soon.');
        setFormData({ fullName: '', gender: '', city: '', phone: '', email: '', availability: '', reason: '' });
        setSelectedSkills([]);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="volunteer" className="py-20 md:py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-sky-blue/10 text-sky-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Join Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Become a <span className="gradient-text">Volunteer</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Your time and skills can transform lives. Join our growing team of 245+ volunteers and make a real impact in the Skardu community.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-gradient-to-br from-deep-blue to-[#1a3f7a] rounded-2xl p-8 text-white">
              <UserCheck className="h-10 w-10 text-sky-blue mb-4" />
              <h3 className="text-xl font-bold mb-3">Why Volunteer With Us?</h3>
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-blue mt-1.5 shrink-0" />
                  Make a direct impact on people&apos;s lives
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-blue mt-1.5 shrink-0" />
                  Develop leadership and teamwork skills
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-blue mt-1.5 shrink-0" />
                  Connect with like-minded youth
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-blue mt-1.5 shrink-0" />
                  Receive volunteer certificates
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-blue mt-1.5 shrink-0" />
                  Gain experience in community development
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-deep-blue dark:text-white mb-4">Volunteer Benefits</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl">
                  <Users className="h-6 w-6 text-emerald mx-auto mb-1" />
                  <p className="text-sm font-bold text-deep-blue dark:text-white">245+</p>
                  <p className="text-xs text-gray-500">Active Volunteers</p>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl">
                  <Briefcase className="h-6 w-6 text-sky-blue mx-auto mb-1" />
                  <p className="text-sm font-bold text-deep-blue dark:text-white">15+</p>
                  <p className="text-xs text-gray-500">Skill Areas</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-deep-blue dark:text-white mb-6">Volunteer Application Form</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="v-name" className="text-sm font-medium mb-1 block">Full Name *</Label>
                  <Input
                    id="v-name"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="v-gender" className="text-sm font-medium mb-1 block">Gender</Label>
                  <select
                    id="v-gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="v-city" className="text-sm font-medium mb-1 block">City *</Label>
                  <Input
                    id="v-city"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="v-phone" className="text-sm font-medium mb-1 block">Phone Number *</Label>
                  <Input
                    id="v-phone"
                    placeholder="03XX-XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="v-email" className="text-sm font-medium mb-1 block">Email *</Label>
                <Input
                  id="v-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="v-availability" className="text-sm font-medium mb-1 block">Availability</Label>
                <select
                  id="v-availability"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="">Select availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="flexible">Flexible</option>
                  <option value="full-time">Full-time</option>
                </select>
              </div>

              {/* Skills */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Your Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedSkills.includes(skill)
                          ? 'bg-sky-blue text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="v-reason" className="text-sm font-medium mb-1 block">Why do you want to join?</Label>
                <Textarea
                  id="v-reason"
                  placeholder="Tell us about your motivation..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-sky-blue to-deep-blue hover:from-deep-blue hover:to-sky-blue text-white py-6 text-lg font-bold rounded-xl shadow-lg transition-all duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
