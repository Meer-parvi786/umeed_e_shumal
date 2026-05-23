import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, gender, city, skills, availability, phone, email, reason } = body;

    if (!fullName || !phone || !email) {
      return NextResponse.json({ error: 'Name, phone, and email are required' }, { status: 400 });
    }

    const application = await db.volunteerApplication.create({
      data: {
        fullName,
        gender: gender || '',
        city: city || '',
        skills: skills || '',
        availability: availability || '',
        phone,
        email,
        reason: reason || '',
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    console.error('Volunteer error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const applications = await db.volunteerApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ applications });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
