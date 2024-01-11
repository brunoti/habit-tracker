import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { HTTPException } from 'hono/http-exception'
import { cors } from 'hono/cors'
import { db } from '$lib/db'

const habitsRouter = new Hono().get('/', async c =>
	c.json({
		results: await db.query.habits.findMany(),
	}),
)

const router = new Hono().route('/habits', habitsRouter)

export const api = new Hono()
	.use('*', logger())
	.use('*', cors())
	.route('/api', router)

api.onError((err, c) => {
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

export type ApiType = typeof router
