export interface PixelCodeResponse {
	pixelCodeSource: PixelCode[]
}

export interface PixelCode {
	_id: string
	ownerId: string
	funnelIds: string[]
	pagesIds: string[]
	funnelName: string
	pageName: string
	pageId: string
	name: string
	isManual: boolean
	isGlobal: boolean
	platform: string
	createdAt: string
	updatedAt: string
	deletedAt: string | null
	__v: number
}

export interface PixelCodeResponseWithFunnelPage extends PixelCode {
	funnelName: string
	pageName: string
}
