import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'sywf-super-secret-key-change-in-production');

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const { payload } = await verify(token, JWT_SECRET);
    const admin = await db.admin.findUnique({
      where: { id: payload.adminId as string },
      select: { id: true, name: true, role: true, username: true },
    });
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 401 });
    }
    return NextResponse.json({ admin });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
