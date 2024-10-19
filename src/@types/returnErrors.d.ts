export type ErrorReturn = {
	message: string
	validation: {
		body: {
			source: string
			keys: Array<string>
			message: string
		}
	}
}
