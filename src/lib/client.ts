import type { ApiType } from '$lib/api/types'
import { hc } from 'hono/client'

let browserClient: ReturnType<typeof hc<ApiType>>

export const client = (fetch: Window['fetch']) => {
	const isBrowser = typeof window !== 'undefined'

	if (isBrowser && browserClient) {
		return browserClient
	}
	const client = hc<ApiType>('/api', { fetch })

	if (isBrowser) {
		browserClient = client
	}

	return client
}
