import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Show all posts, not just the current user's
    const allPosts = await db.select().from(posts);
    return NextResponse.json(allPosts);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
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
