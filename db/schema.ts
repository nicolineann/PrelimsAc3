import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  category: varchar('category', { length: 100 }),
  imageUrl: text('image_url'),
  userId: varchar('user_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});
