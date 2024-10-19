export interface PageTemplateResponse {
	category: {
		category: string
		createdAt: string
		deletedAt: string | null
		isDefault: boolean
		ownerId: string
		type: string
		updatedAt: string
		__v: number
		_id: string
	}
	status: string
	createdAt: string
	css: string
	deletedAt?: string | null
	html: string
	isDefault: boolean
	js: string | object
	name: string
	ownerId?: string
	preview?: string | null
	props: {
		key: string
		value: string
	}
	updatedAt: string
	__v?: number
	_id: string
}
