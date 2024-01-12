import type { PageLoad } from './$types'
import { client } from '$lib/client'

export const load: PageLoad = async ({ fetch }) => {
	return {
		habits: {
			list: await client(fetch)
				.habits.$get()
				.then(res => res.json())
				.then(res => res.results),
		},
	}
}
