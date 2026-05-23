import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donorName, donorEmail, amount, type, campaign, message } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
    }

    const donation = await db.donation.create({
      data: {
        donorName: donorName || 'Anonymous',
        donorEmail: donorEmail || '',
        amount: parseFloat(amount),
        type: type || 'one-time',
        campaign: campaign || '',
        message: message || '',
        status: 'completed',
      },
    });

    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (error) {
    console.error('Donation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const donations = await db.donation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return NextResponse.json({ donations });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}
