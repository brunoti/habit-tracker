import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'
import { text, integer, sqliteTable as table } from 'drizzle-orm/sqlite-core'

const uid = () => text('uid').notNull().unique()

const timestamps = ({ withDeletedAt = false } = {}) => ({
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	...(withDeletedAt && {
		deletedAt: text('deleted_at').default(sql`NULL`),
	}),
})

export const users = table('users', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	uid: uid().$defaultFn(() => createId()),
	name: text('name').notNull(),
	...timestamps({ withDeletedAt: true }),
})

export const habits = table('habits', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	uid: text('uid')
		.notNull()
		.$defaultFn(() => createId())
		.unique(),
	title: text('name').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	daysOfWeek: text('days_of_week', { mode: 'json' })
		.$type<number[]>()
		.notNull()
		.default(sql`'[0, 1, 2, 3, 4, 5, 6]'`),
	...timestamps({ withDeletedAt: true }),
})

export const habitEvents = table('habit_events', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	uid: uid().$defaultFn(() => createId()),
	habitId: integer('habit_id')
		.notNull()
		.references(() => habits.id),
	event: text('event', {
		enum: ['completed', 'skipped'],
	}).notNull(),
	...timestamps(),
})
