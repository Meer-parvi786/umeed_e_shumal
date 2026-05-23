import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [totalDonations, totalVolunteers, totalMessages, totalPosts, campaigns] = await Promise.all([
      db.donation.aggregate({ _sum: { amount: true }, _count: true }),
      db.volunteerApplication.count(),
      db.contactMessage.count({ where: { isRead: false } }),
      db.blogPost.count(),
      db.campaign.findMany({ where: { isActive: true } }),
    ]);

    const recentDonations = await db.donation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const recentVolunteers = await db.volunteerApplication.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const stats = await db.impactStat.findMany();

    return NextResponse.json({
      dashboard: {
        totalDonationAmount: totalDonations._sum.amount || 0,
        totalDonationCount: totalDonations._count,
        totalVolunteers,
        unreadMessages: totalMessages,
        totalPosts,
        campaigns,
        recentDonations,
        recentVolunteers,
        impactStats: stats,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard' }, { status: 500 });
  }
}
