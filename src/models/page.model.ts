export interface Page {
	_id?: string
	funnelId?: string
	name?: string
	description?: string
	pageTemplateId?: string
	html?: string
	path?: string
	css?: string
	js?: string
	props?: object
	fullPath?: string
	external?: boolean
	preview?: string
	category?: string
	enable?: boolean
	ownerId?: string
	deployed?: boolean
	createdAt?: string
	updatedAt?: string
	deletedAt?: string
	isScriptRunning?: boolean
	__v?: number
	visits?: {
		totalVisits: number
		uniqueVisits: number
	}
	externalForm?: {
		_id: string
		buttonColor: string
		buttonText: string
		borderRadius: string
		redirectUrl: string
		pageId: string
		deleteAt?: string
		createdAt?: string
		updatedAt?: string
		__v?: number
	}
}

export interface PageTemplate {
	html: string
	css: string
	props: object
	category: string
	name: string
	status: string
	js: object | string | null
}

export type ListPageTemplate = {
	html: string
	css: string
	props: object
	category: string
	_id: string
	js: string
	ownerId: string
	name: string
	preview: string
}[]

export interface ListPage {
	message: string
	pages: [
		{
			html: string
			css: string
			props: object
			category: string
		}
	]
	totalPages: number
}
