'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Users, DollarSign, Image as ImageIcon,
  MessageSquare, Settings, LogOut, Menu, X, Heart, Bell,
  TrendingUp, UserPlus, Mail, BarChart3, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

// Types
interface DashboardData {
  totalDonationAmount: number;
  totalDonationCount: number;
  totalVolunteers: number;
  unreadMessages: number;
  totalPosts: number;
  campaigns: Array<{ id: string; title: string; goalAmount: number; raisedAmount: number }>;
  recentDonations: Array<{ id: string; donorName: string; amount: number; campaign: string; createdAt: string; type: string }>;
  recentVolunteers: Array<{ id: string; fullName: string; city: string; skills: string; createdAt: string; status: string }>;
  impactStats: Array<{ key: string; label: string; value: number }>;
}

type Tab = 'dashboard' | 'donations' | 'volunteers' | 'blog' | 'messages' | 'gallery' | 'settings';

const sidebarItems: Array<{ id: Tab; label: string; icon: React.ElementType }> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'donations', label: 'Donations', icon: DollarSign },
  { id: 'volunteers', label: 'Volunteers', icon: UserPlus },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [admin, setAdmin] = useState<{ name: string; role: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data.dashboard);
      }
    } catch {
      // silent
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/me');
        if (res.ok) {
          const data = await res.json();
          setAdmin(data.admin);
          setIsAuthenticated(true);
          setShowLogin(false);
          try {
            const dashRes = await fetch('/api/admin/dashboard');
            if (dashRes.ok) {
              const dashData = await dashRes.json();
              setDashboardData(dashData.dashboard);
            }
          } catch {
            // silent
          }
        }
      } catch {
        // not authenticated
      }
      setIsLoading(false);
    })();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.admin);
        setIsAuthenticated(true);
        setShowLogin(false);
        toast.success('Welcome back, ' + data.admin.name + '!');
        fetchDashboard();
      } else {
        toast.error('Invalid credentials');
      }
    } catch {
      toast.error('Login failed');
    }
  };

  const handleLogout = () => {
    document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
    setAdmin(null);
    setShowLogin(true);
    toast.success('Logged out successfully');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-blue via-[#1a3f7a] to-deep-blue flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <img
              src="/images/logo.png"
              alt="Umeed e Shumaal Logo"
              className="w-20 h-20 mx-auto object-contain mb-4 drop-shadow-lg rounded-xl"
            />
            <h1 className="text-2xl font-bold text-white">Umeed e Shumaal Admin Panel</h1>
            <p className="text-white/60 mt-1">Founded by Fatima Baneen</p>
          </div>

          <form onSubmit={handleLogin} className="glass rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Sign In</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/70 mb-1 block">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-blue"
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-blue"
                  placeholder="admin123"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-blue to-emerald text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            </div>
            <p className="text-white/40 text-xs text-center mt-4">
              Default: admin / admin123
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-deep-blue text-white transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo.png"
                  alt="Umeed e Shumaal"
                  className="h-8 w-8 object-contain rounded-lg brightness-0 invert"
                />
                <span className="font-bold text-sm">Umeed e Shumaal</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-sky-blue/20 text-sky-blue'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-8 h-8 rounded-full bg-sky-blue/20 flex items-center justify-center text-sm font-bold">
                {admin?.name?.[0] || 'A'}
              </div>
              <div>
                <p className="text-sm font-medium">{admin?.name || 'Admin'}</p>
                <p className="text-xs text-white/50">{admin?.role || 'admin'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-sky-blue hover:underline flex items-center gap-1">
              View Website <ChevronRight className="h-3 w-3" />
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">
          {activeTab === 'dashboard' && <DashboardTab data={dashboardData} />}
          {activeTab === 'donations' && <DonationsTab />}
          {activeTab === 'volunteers' && <VolunteersTab />}
          {activeTab === 'blog' && <BlogTab />}
          {activeTab === 'messages' && <MessagesTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'settings' && <SettingsTab stats={dashboardData?.impactStats} />}
        </main>
      </div>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab({ data }: { data: DashboardData | null }) {
  if (!data) return <div className="text-center py-12 text-gray-500">Loading dashboard data...</div>;

  const statCards = [
    { label: 'Total Donations', value: `PKR ${(data.totalDonationAmount / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Donation Count', value: data.totalDonationCount.toString(), icon: TrendingUp, color: 'bg-sky-blue/10 text-sky-blue' },
    { label: 'Volunteers', value: data.totalVolunteers.toString(), icon: UserPlus, color: 'bg-purple-50 text-purple-600' },
    { label: 'Unread Messages', value: data.unreadMessages.toString(), icon: Bell, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Campaigns Progress */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-sky-blue" />
          Campaign Progress
        </h2>
        <div className="space-y-4">
          {data.campaigns.map((camp) => {
            const pct = Math.round((camp.raisedAmount / camp.goalAmount) * 100);
            return (
              <div key={camp.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{camp.title}</span>
                  <span className="text-sm font-bold text-emerald">{pct}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald to-sky-blue rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">PKR {camp.raisedAmount.toLocaleString()} / PKR {camp.goalAmount.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald" />
            Recent Donations
          </h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {data.recentDonations.map((d) => (
              <div key={d.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-700">{d.donorName}</p>
                  <p className="text-xs text-gray-400">{d.campaign}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald">PKR {d.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{d.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Volunteer Applications */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-sky-blue" />
            Recent Applications
          </h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {data.recentVolunteers.map((v) => (
              <div key={v.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-700">{v.fullName}</p>
                  <p className="text-xs text-gray-400">{v.city} - {v.skills?.split(',').slice(0, 2).join(', ')}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  v.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                  v.status === 'rejected' ? 'bg-red-50 text-red-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Donations Tab
function DonationsTab() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/donations').then(r => r.json()).then(d => { setDonations(d.donations || []); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">All Donations</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Donor</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {donations.map((d: any) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-gray-900">{d.donorName}</td>
                <td className="px-6 py-3 text-emerald font-semibold">PKR {d.amount?.toLocaleString()}</td>
                <td className="px-6 py-3 text-gray-500 capitalize">{d.type}</td>
                <td className="px-6 py-3 text-gray-500">{d.campaign || '-'}</td>
                <td className="px-6 py-3 text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Volunteers Tab
function VolunteersTab() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/volunteers').then(r => r.json()).then(d => { setVolunteers(d.applications || []); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Volunteer Applications</h2>
        <span className="bg-sky-blue/10 text-sky-blue px-3 py-1 rounded-full text-sm font-medium">{volunteers.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">City</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Skills</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {volunteers.map((v: any) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-gray-900">{v.fullName}</td>
                <td className="px-6 py-3 text-gray-500">{v.city}</td>
                <td className="px-6 py-3 text-gray-500 max-w-[200px] truncate">{v.skills}</td>
                <td className="px-6 py-3 text-gray-500">{v.phone}</td>
                <td className="px-6 py-3 text-gray-500">{new Date(v.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    v.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                    v.status === 'rejected' ? 'bg-red-50 text-red-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Blog Tab
function BlogTab() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog').then(r => r.json()).then(d => { setPosts(d.posts || []); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Blog Posts</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Published</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((p: any) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-gray-900 max-w-[300px] truncate">{p.title}</td>
                <td className="px-6 py-3 text-gray-500 capitalize">{p.category}</td>
                <td className="px-6 py-3">
                  {p.isFeatured && <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600">Featured</span>}
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                    {p.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Messages Tab
function MessagesTab() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact').then(r => r.json()).then(d => { setMessages(d.messages || []); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Contact Messages</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.map((m: any) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-gray-900">{m.name}</td>
                <td className="px-6 py-3 text-gray-500">{m.email}</td>
                <td className="px-6 py-3 text-gray-500">{m.subject || '-'}</td>
                <td className="px-6 py-3 text-gray-500 max-w-[200px] truncate">{m.message}</td>
                <td className="px-6 py-3 text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Gallery Tab
function GalleryTab() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-sky-blue" />
        Gallery Management
      </h2>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
        <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">Gallery Image Upload</p>
        <p className="text-gray-400 text-sm mt-1">Drag and drop images here or click to upload. Feature coming soon.</p>
        <button className="mt-4 bg-sky-blue/10 text-sky-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-blue/20 transition-colors">
          Browse Files
        </button>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({ stats }: { stats?: Array<{ key: string; label: string; value: number }> }) {
  return (
    <div className="space-y-6">
      {/* Impact Statistics */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-sky-blue" />
          Impact Statistics
        </h2>
        <p className="text-gray-500 text-sm mb-4">These statistics are displayed on the website. Update them to reflect the latest figures.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats?.map((s) => (
            <div key={s.key} className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium text-gray-700">{s.label}</p>
              <p className="text-2xl font-bold text-deep-blue mt-1">{s.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-700 font-medium">Security Reminder</p>
            <p className="text-xs text-amber-600 mt-1">Remember to change the default admin password in production. Use environment variables for the JWT secret.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
