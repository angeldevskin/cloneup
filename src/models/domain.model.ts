export interface DomainItem {
	_id: string
	id: string
	ownerId: string
	funnelId: string
	domainName: string
	createdAt: string
	updatedAt: string
	deletedAt: string | null
	__v: number
}

export interface NewDomain {
	domainName: string
	funnelId?: string
}

export interface DomainItemResponseById {
	_id: string
	id: string
	ownerId: string
	funnelId: string
	domainName: string
	dnsStatusCNAME: string
	dnsStatusA: string
	createdAt: string
	updatedAt: string
	deletedAt: string | null
	__v: number
}
