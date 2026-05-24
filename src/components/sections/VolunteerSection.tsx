'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { UserCheck, Users, Briefcase } from 'lucide-react';
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
    fullName: '',
    gender: '',
    city: '',
    phone: '',
    email: '',
    availability: '',
    reason: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
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
      const message = `
📝 New Volunteer Application

👤 Name: ${formData.fullName}
🚻 Gender: ${formData.gender || '-'}
🏙 City: ${formData.city || '-'}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}
⏰ Availability: ${formData.availability || '-'}

🧠 Skills: ${selectedSkills.length ? selectedSkills.join(', ') : '-'}

💬 Reason:
${formData.reason || '-'}
      `;

      const whatsappNumber = "923078582373";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(url, '_blank');

      toast.success('Redirecting to WhatsApp...');

      setFormData({
        fullName: '',
        gender: '',
        city: '',
        phone: '',
        email: '',
        availability: '',
        reason: '',
      });

      setSelectedSkills([]);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="volunteer" className="py-20 md:py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        {/* Header */}
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
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your time and skills can transform lives. Join our growing volunteer team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-linear-to-br from-deep-blue to-[#1a3f7a] rounded-2xl p-8 text-white">
              <UserCheck className="h-10 w-10 text-sky-blue mb-4" />
              <h3 className="text-xl font-bold mb-3">Why Volunteer With Us?</h3>
              <ul className="space-y-3 text-white/80 text-sm">
                <li>Make real impact in lives</li>
                <li>Build leadership skills</li>
                <li>Meet like-minded people</li>
                <li>Get certificates</li>
                <li>Gain experience</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto text-emerald mb-1" />
                  <p className="font-bold">245+</p>
                  <p className="text-xs">Volunteers</p>
                </div>
                <div className="text-center">
                  <Briefcase className="h-6 w-6 mx-auto text-sky-blue mb-1" />
                  <p className="font-bold">15+</p>
                  <p className="text-xs">Skills</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl p-8 border"
          >
            <h3 className="text-xl font-bold mb-6">Application Form</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />

                <Input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <Input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <Textarea
                placeholder="Why do you want to join?"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              />

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      selectedSkills.includes(skill)
                        ? 'bg-sky-blue text-white'
                        : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Sending...' : 'Submit via WhatsApp'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}