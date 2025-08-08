import { db } from '@/db';
import { posts } from '@/db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id, title, description, category, imageUrl } = await req.json();
    const updated = await db.update(posts)
      .set({ title, description, category, imageUrl })
      .where(and(eq(posts.id, id), eq(posts.userId, user.id)))
      .returning();
    if (!updated.length) return NextResponse.json({ error: 'Not found or not authorized' }, { status: 404 });
    return NextResponse.json(updated[0]);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await db.delete(posts).where(and(eq(posts.id, id), eq(posts.userId, user.id)));
  return NextResponse.json({ success: true });
}
