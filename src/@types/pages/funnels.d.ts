import { Edge, Node, Viewport } from 'reactflow'

export type FunnelHandles = {
	funnelToHandle: string
	dialogCreate: boolean
	dialogEdit: boolean
	dialogDelete: boolean
	dialogExternalCodeFunnel: boolean
}

export type PageHandles = {
	pageToHandle: string
	dialogCreate: boolean
	dialogEdit: boolean
	dialogDelete: boolean
	dialogExternalCodePage: boolean
}

type CategoryProps = {
	category: string
	_id: string
	ownerId: string
	type: string
	isDefault: boolean
	createdAt: string
	updatedAt: string
	__v: number
}

export type FunnelType = {
	name: string
	description?: string
	templateId: string
	status: string
	domainName?: string
	checkoutPlatform?: string
	objective: string
	domain?: {
		domainName: string
		_id: string
		ownerId: string
		createdAt: string
		deleteAt?: string
		updatedAt: string
		__v?: number
	}
	props: {
		nodes: Node[]
		edges: Edge[]
		viewport: Viewport
	}
	visits?: {
		totalVisits: number
		uniqueVisits: number
	}
	metrics?: {
		totalSales: number
		totalValue: number
		averageValue: number
		results: number
		conversion: number
	}
	product?: string
	categoryId: string
	category: string
	type?: string
	domainId?: string
	_id?: string
	ownerId?: string
	createdAt?: string
	updatedAt?: string
	deletedAt?: string
	__v?: number
}

export type GetFunnelProps = {
	category: CategoryProps
} & FunnelType

export type FunnelCreationType = Partial<FunnelType>

export type MyFunnelsType = Array<{
	funnelName: string
	id: string
	domainName: string
}>

export type FormType = {
	funnelName: string
	funnelDesc?: string
	funnelCategory: string
}

export type FunnelTemplateType = {
	_id: string
	name: string
	description: string
	pages: []
	ownerId: string
	category: string
	props: {
		nodes: Node[]
		edges: Edge[]
	}
	isDefault: boolean
	createdAt: string
	updatedAt: string
}

export type MetricsFilterProps = {
	_id: boolean
	name: boolean
	type: boolean
	status: boolean
	totalVisits: boolean
	uniqueVisits: boolean
	totalSales: boolean
	totalValue: boolean
	averageValue: boolean
	results: boolean
	conversion: boolean
}
