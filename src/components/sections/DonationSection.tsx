'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Heart, Shield, CreditCard, Building2, Smartphone, QrCode, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

const campaigns = [
  { title: 'Winter Relief Drive', raised: 1450000, goal: 2000000 },
  { title: 'Education Scholarships', raised: 980000, goal: 1500000 },
  { title: 'Clean Water Initiative', raised: 750000, goal: 3000000 },
];

const recentDonations = [
  { name: 'Anonymous Donor', amount: 50000, campaign: 'Winter Relief Drive', time: '2 hours ago' },
  { name: 'Community Supporter', amount: 25000, campaign: 'Education Scholarships', time: '5 hours ago' },
  { name: 'Local Business', amount: 100000, campaign: 'Clean Water Initiative', time: '1 day ago' },
  { name: 'Overseas Pakistani', amount: 75000, campaign: 'Winter Relief Drive', time: '2 days ago' },
];

export default function DonationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedAmount, setSelectedAmount] = useState<number | null>(2500);
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [formData, setFormData] = useState({ name: '', email: '', amount: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || Number.parseInt(formData.amount) || 0;
    if (amount <= 0) {
      toast.error('Please select or enter a donation amount.');
      return;
    }
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: formData.name || 'Anonymous',
          donorEmail: formData.email,
          amount,
          type: donationType,
          message: formData.message,
        }),
      });
      if (res.ok) {
        toast.success('Thank you for your generous donation!');
        setFormData({ name: '', email: '', amount: '', message: '' });
        setSelectedAmount(2500);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="donate" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-emerald/10 text-emerald px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Support Our Cause
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue dark:text-white mb-6">
            Your <span className="gradient-text">Generosity</span> Saves Lives
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Every rupee you donate goes directly to supporting families, students, and communities in Gilgit Baltistan. 100% transparent fund usage guaranteed.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-emerald" />
              <span className="text-sm font-medium text-emerald">100% Secure & Transparent</span>
            </div>

            {/* Donation type toggle */}
            <div className="flex gap-3 mb-6">
              {(['one-time', 'monthly'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setDonationType(type)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    donationType === type
                      ? 'bg-deep-blue text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {type === 'one-time' ? 'One-Time' : 'Monthly'}
                </button>
              ))}
            </div>

            {/* Amount selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Select Amount (PKR)</Label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                      selectedAmount === amount
                        ? 'bg-sky-blue text-white shadow-lg shadow-sky-blue/25'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    PKR {amount.toLocaleString()}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                placeholder="Or enter custom amount"
                value={formData.amount}
                onChange={(e) => {
                  setFormData({ ...formData, amount: e.target.value });
                  setSelectedAmount(null);
                }}
                className="w-full"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="donor-name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Full Name (Optional)
                  </Label>
                  <Input
                    id="donor-name"
                    placeholder="Anonymous"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="donor-email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Email (Optional)
                  </Label>
                  <Input
                    id="donor-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="donor-message" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Message (Optional)
                </Label>
                <Textarea
                  id="donor-message"
                  placeholder="Your words of encouragement..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={2}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-emerald to-emerald-dark hover:from-emerald-dark hover:to-emerald text-white py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="h-5 w-5 mr-2" />
                Donate {selectedAmount ? `PKR ${selectedAmount.toLocaleString()}` : 'Now'}{' '}
                {donationType === 'monthly' ? '(Monthly)' : ''}
              </Button>
            </form>

            {/* Payment Methods */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Other ways to donate:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Building2 className="h-5 w-5 text-deep-blue" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Bank Transfer</p>
                    <p className="text-[10px] text-gray-400">HBL / MCB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Smartphone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">EasyPaisa</p>
                    <p className="text-[10px] text-gray-400">03XX-XXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CreditCard className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">JazzCash</p>
                    <p className="text-[10px] text-gray-400">03XX-XXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <QrCode className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">QR Code</p>
                    <p className="text-[10px] text-gray-400">Scan to pay</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right sidebar - Campaigns & Recent Donations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Active Campaigns */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-deep-blue dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald" />
                Active Campaigns
              </h3>
              <div className="space-y-5">
                {campaigns.map((camp) => {
                  const pct = Math.round((camp.raised / camp.goal) * 100);
                  return (
                    <div key={camp.title}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{camp.title}</p>
                        <span className="text-xs text-emerald font-bold">{pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${pct}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.5 }}
                          className="h-full bg-linear-to-r from-emerald to-sky-blue rounded-full"
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">PKR {camp.raised.toLocaleString()}</span>
                        <span className="text-xs text-gray-400">Goal: PKR {camp.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Donations Feed */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-deep-blue dark:text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-sky-blue" />
                Recent Donations
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recentDonations.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Heart className="h-4 w-4 text-emerald" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{d.name}</p>
                      <p className="text-xs text-gray-400">PKR {d.amount.toLocaleString()} - {d.campaign}</p>
                      <p className="text-[10px] text-gray-300 dark:text-gray-600">{d.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
