/** @type { import("drizzle-kit").Config } */
export default {
	schema: './src/lib/db/schema.ts',
	out: './drizzle',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN,
	},
}
