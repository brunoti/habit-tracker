import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { HTTPException } from 'hono/http-exception'
import { cors } from 'hono/cors'
import { db } from '$lib/db'
import { habitEvents, habits } from '$lib/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

class Habit {
	static getStats(
		habit: InferSelectModel<typeof habits> & {
			events: InferSelectModel<typeof habitEvents>[]
		},
	) {
		return {
			lastDay: habit.events[habit.events.length - 1]?.createdAt ?? null,
			completed: habit.events.filter(event => event.type === 'completed')
				.length,
			skipped: habit.events.filter(event => event.type === 'skipped').length,
			total: habit.events.length,
		}
	}

	static async getHabitsAndAddStats() {
		const allHabits = await db.query.habits.findMany({ with: { events: true } })
		return allHabits.map(habit => ({
			...habit,
			stats: Habit.getStats(habit),
		}))
	}
}

const habitsRouter = new Hono().get('/', async c => {
	return c.json({
		results: await Habit.getHabitsAndAddStats(),
	})
})

export const router = new Hono().route('/habits', habitsRouter)

export const api = new Hono()
	.use('*', logger())
	.use('*', cors())
	.route('/api', router)

api.onError((err, c) => {
	console.error(err)
	if (err instanceof HTTPException) {
		return err.getResponse()
	}

	return c.json(
		{
			message: err.message,
		},
		500,
	)
})
