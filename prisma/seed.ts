import { db } from '@/lib/db';
import { hash } from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await hash('admin123', 10);
  await db.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Admin User',
      role: 'superadmin',
    },
  });

  // Create team members
  const teamMembers = [
    { name: 'Fatima Baneen', position: 'Founder & President', bio: 'The visionary founder of Umeed e Shumaal, a passionate youth leader dedicated to transforming lives in Gilgit Baltistan through community service, education, and compassion.', displayOrder: 1 },
    { name: 'Fatima Noor', position: 'Vice President', bio: 'Co-leading Umeed e Shumaal with a focus on sustainable development and empowering women and children in underserved communities.', displayOrder: 2 },
    { name: 'Hassan Khan', position: 'General Secretary', bio: 'Managing day-to-day operations and ensuring smooth coordination across all departments and volunteer teams.', displayOrder: 3 },
    { name: 'Amina Begum', position: 'Finance Secretary', bio: 'Overseeing all financial operations with complete transparency and accountability for every donation received.', displayOrder: 4 },
    { name: 'Bilal Shah', position: 'Media & PR Lead', bio: 'Amplifying our mission through social media, press coverage, and community outreach to build lasting partnerships.', displayOrder: 5 },
    { name: 'Zainab Fatima', position: 'Field Operations Lead', bio: 'Leading on-ground welfare activities, distribution drives, and community support programs across Gilgit Baltistan region.', displayOrder: 6 },
    { name: 'Usman Wazir', position: 'Volunteer Coordinator', bio: 'Recruiting, training, and managing our growing team of dedicated volunteers who make our work possible.', displayOrder: 7 },
    { name: 'Sara Hussain', position: 'Education Lead', bio: 'Developing and managing scholarship programs, educational support, and mentoring for deserving students.', displayOrder: 8 },
    { name: 'Dr. Kamran', position: 'Health & Welfare Lead', bio: 'Organizing medical camps, health awareness drives, and emergency medical support for remote communities.', displayOrder: 9 },
    { name: 'Tariq Baig', position: 'Logistics & Support', bio: 'Ensuring smooth supply chains, transportation, and logistical support for all foundation activities and events.', displayOrder: 10 },
  ];

  for (const member of teamMembers) {
    await db.teamMember.upsert({
      where: { id: `team-${member.displayOrder}` },
      update: {},
      create: {
        id: `team-${member.displayOrder}`,
        ...member,
      },
    });
  }

  // Create impact stats
  const stats = [
    { key: 'families', label: 'Families Helped', value: 1250 },
    { key: 'students', label: 'Students Supported', value: 830 },
    { key: 'volunteers', label: 'Active Volunteers', value: 245 },
    { key: 'donations', label: 'Donations (PKR)', value: 4500000 },
    { key: 'camps', label: 'Medical Camps', value: 67 },
  ];

  for (const stat of stats) {
    await db.impactStat.upsert({
      where: { key: stat.key },
      update: {},
      create: stat,
    });
  }

  // Create testimonials
  const testimonials = [
    {
      id: 'test-1',
      name: 'Muhammad Aslam',
      role: 'Beneficiary Father',
      content: 'The foundation supported my children\'s education when I could not afford it. They gave us hope and a brighter future. I am forever grateful to the young volunteers who came to our village.',
    },
    {
      id: 'test-2',
      name: 'Zubaida Bibi',
      role: 'Community Elder',
      content: 'The medical camp organized by Umeed e Shumaal saved many lives in our remote village. Fatima Baneen and her team are doing extraordinary work for our community. May Allah bless them all.',
    },
    {
      id: 'test-3',
      name: 'Ali Raza',
      role: 'Volunteer',
      content: 'Volunteering with Umeed e Shumaal has been the most rewarding experience of my life. Seeing the smiles on children\'s faces when they receive school supplies is priceless. This is what real change looks like.',
    },
    {
      id: 'test-4',
      name: 'Dr. Shahzad',
      role: 'Medical Volunteer',
      content: 'I have been part of multiple medical camps with Umeed e Shumaal. The organization founded by Fatima Baneen is transparent, well-organized, and truly dedicated to serving the people of Gilgit Baltistan. Highly recommended for anyone who wants to give back.',
    },
    {
      id: 'test-5',
      name: 'Sana Mir',
      role: 'Donor',
      content: 'I trust Umeed e Shumaal completely with my donations. They provide detailed reports and I can see the direct impact of every contribution on the community. It feels great to be part of this noble mission.',
    },
  ];

  for (const t of testimonials) {
    await db.testimonial.upsert({
      where: { id: t.id },
      update: {},
      create: t,
    });
  }

  // Create campaigns
  const campaigns = [
    {
      id: 'camp-1',
      title: 'Winter Relief Drive 2025',
      description: 'Providing warm clothing, blankets, and food supplies to 500+ families in remote areas of Gilgit Baltistan during the harsh winter season.',
      goalAmount: 2000000,
      raisedAmount: 1450000,
      image: '',
    },
    {
      id: 'camp-2',
      title: 'Education for All Scholarship',
      description: 'Supporting 200+ deserving students with scholarships, school supplies, and mentoring to continue their education.',
      goalAmount: 1500000,
      raisedAmount: 980000,
      image: '',
    },
    {
      id: 'camp-3',
      title: 'Clean Water Initiative',
      description: 'Installing clean water filtration systems in 15 villages across the Gilgit Baltistan district to ensure access to safe drinking water.',
      goalAmount: 3000000,
      raisedAmount: 750000,
      image: '',
    },
  ];

  for (const c of campaigns) {
    await db.campaign.upsert({
      where: { id: c.id },
      update: {},
      create: c,
    });
  }

  // Create blog posts
  const blogPosts = [
    {
      id: 'blog-1',
      title: 'Winter Relief Drive Successfully Completed in Gilgit Baltistan',
      slug: 'winter-relief-drive-completed',
      excerpt: 'Our volunteers distributed warm clothing and food supplies to over 300 families across remote villages in the Gilgit Baltistan district.',
      content: 'Our dedicated team of 50+ volunteers worked tirelessly through the harsh winter months to deliver essential supplies to families in need. The drive covered 12 remote villages, providing warm clothing, blankets, food rations, and medical supplies. This initiative was made possible by the generous contributions of our donors and the unwavering commitment of our volunteers.',
      category: 'campaigns',
      isFeatured: true,
      isPublished: true,
    },
    {
      id: 'blog-2',
      title: 'Education Scholarships Awarded to 100 Deserving Students',
      slug: 'education-scholarships-awarded',
      excerpt: 'Umeed e Shumaal has awarded educational scholarships to 100 deserving students across Gilgit Baltistan district, enabling them to pursue their dreams.',
      content: 'In our commitment to promoting education in the region, Umeed e Shumaal has awarded full and partial scholarships to 100 deserving students. These scholarships cover tuition fees, books, uniforms, and other educational expenses. The selection process was rigorous and transparent, ensuring that the most deserving students received support.',
      category: 'education',
      isFeatured: true,
      isPublished: true,
    },
    {
      id: 'blog-3',
      title: 'Free Medical Camp in Roundu Valley',
      slug: 'medical-camp-roundu-valley',
      excerpt: 'A comprehensive medical camp was organized in Roundu Valley, providing free consultations and medicines to over 500 patients.',
      content: 'In collaboration with local healthcare professionals, Umeed e Shumaal organized a two-day medical camp in Roundu Valley. The camp provided free general health consultations, pediatric check-ups, dental care, eye examinations, and free medicines. Over 500 patients from surrounding villages benefited from this initiative.',
      category: 'health',
      isFeatured: false,
      isPublished: true,
    },
  ];

  for (const b of blogPosts) {
    await db.blogPost.upsert({
      where: { id: b.id },
      update: {},
      create: b,
    });
  }

  // Create sample donations
  const donations = [
    { donorName: 'Anonymous Donor', amount: 50000, type: 'one-time', campaign: 'Winter Relief Drive 2025', status: 'completed' },
    { donorName: 'Community Supporter', amount: 25000, type: 'monthly', campaign: 'Education for All Scholarship', status: 'completed' },
    { donorName: 'Local Business', amount: 100000, type: 'one-time', campaign: 'Clean Water Initiative', status: 'completed' },
    { donorName: 'Overseas Pakistani', amount: 75000, type: 'one-time', campaign: 'Winter Relief Drive 2025', status: 'completed' },
    { donorName: 'Monthly Donor', amount: 10000, type: 'monthly', campaign: 'General Fund', status: 'completed' },
  ];

  for (let i = 0; i < donations.length; i++) {
    await db.donation.create({
      data: { id: `don-${i + 1}`, ...donations[i] },
    });
  }

  console.log('Database seeded successfully!');
}

seed()
  .catch(console.error)
  .finally(() => process.exit(0));
