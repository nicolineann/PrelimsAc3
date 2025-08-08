import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  try {
    // Show all posts, not just the current user's
    const allPosts = await db.select().from(posts);
    return NextResponse.json(allPosts);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}

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
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await db.delete(posts).where(and(eq(posts.id, id), eq(posts.userId, user.id)));
  return NextResponse.json({ success: true });
}

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, description, category, imageUrl } = await req.json();
  const [newPost] = await db.insert(posts).values({
    title,
    description,
    category,
    imageUrl,
    userId: user.id,
  }).returning();
  return NextResponse.json(newPost);
}
