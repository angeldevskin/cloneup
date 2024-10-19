export interface Pagination {
	count: number
	page_number: number
	page_size: number
}

export interface Data {
	id: string
	name: string
	type: string
	created_at: string
	price: number
	affiliate_enabled: boolean
	status: string
	payment_type: string
}

export interface KiwifyProductsResponse {
	status: number
	pagination: Pagination
	data: Data[]
}

export interface KiwifySales {
	pagination: Pagination
	data: Data[]
}
