import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const subscription = await db.newsletterSubscription.create({
      data: { email },
    });
    return NextResponse.json({ success: true, subscription }, { status: 201 });
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === 'P2002') {
      return NextResponse.json({ success: true, message: 'Already subscribed' });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
