/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
interface PlanDetails {
	name: string
	value: string
	width: string
}

export class PlanModel {
	name: string
	activePlan?: boolean
	classe: string
	title: string
	badgeTitle: string
	badgeClass: string
	value: string
	recorrencia: string
	anual: string
	infoHTML: JSX.Element | string
	infoHTMLClass: string
	details: PlanDetails[]
	footer: JSX.Element | string
	footerClass: string
	showOutside?: boolean
	modal: any
}

export interface UserLimits {
	message: string
	usage: Usage
}

export interface Usage {
	domains: Domains
	leads: Leads
	funnels: Funnels
}

export interface Domains {
	total: number
	current: number
	percentage: number
}

export interface Leads {
	total: number
	current: number
	percentage: number
}

export interface Funnels {
	total: number | null
	current: number
	percentage: number
}
export interface ActivePlanDetails {
	productPriceMonthly: number
	productPriceYearly: number
	productName: string
	_id: string
	name: string
	deletedAt: Date | null
	createdAt: Date
	updatedAt: Date
	__v: number
	productSubscriptionId: string
}

export interface ActivePlanResponse {
	plans: ActivePlanDetails[]
}

export interface ActivePlan {
	data: ActivePlanResponse
}
