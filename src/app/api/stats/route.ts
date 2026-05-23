import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = await db.impactStat.findMany({
      orderBy: { key: 'asc' },
    });
    return NextResponse.json({ stats });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
