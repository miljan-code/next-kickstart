import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const example = pgTable('example', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
