export interface NewLead {
	leadRef: string
	name: string
	surname: string
	email: string
	telephone: string
	pageId?: string
	funnelId?: string
}

export interface NewLeadEditor {
	leadRef: string
	name: string | null
	surname?: string
	email: string
	telephone: string
	pageId?: string
	funnelId?: string
}

export interface NewLeadUpdate {
	name: string
	surname: string
	email: string
	telephone: string
	leadRef: string
}

export interface LeadApiResponse {
	currentPage: number
	leads: Lead[]
	message: string
	totalPages: number
}

export interface Lead {
	userId: string
	name: string | null
	surname: string
	email: string
	telephone: string
	pageId: string
	funnelId: string
	chatId?: string
	_id: string
	createdAt: string
	updatedAt: string
	pageName: string
	funnelName: string
	leadRef: string
	assistantManagerType: 'human' | 'ia'
	assistantManagerId: {
		_id: string
		name: string
		role: string
	}
}

export interface LeadResponse {
	message: string
	leads: Lead
}

export type ColumnsFilterProps = {
	name: boolean
	surname: boolean
	email: boolean
	telephone: boolean
	funnelName: boolean
	pageName: boolean
}
