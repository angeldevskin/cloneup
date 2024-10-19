export interface MeData {
	email: string
	role: string
	owner: string
	productName: string
	name: string
	surname: string
	costumerStripeId: string
	planSubscriptionId: string
	planSubscriptionEndDate: Date | null
	createdAt: Date
	updatedAt: Date
	productPriceMonthly: string
	productPriceYearly: string
	secret: {
		base32: string
	}
}
