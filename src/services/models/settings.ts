export interface Mailchimp {
	credentials: {
		mailChimpApiKey: string
	}
}

export interface ActiveCampaign {
	key: string
}

export interface ActiveCampaignPost {
	email: string
	firstName: string
	lastName: string
	phone: string
	fieldValues: FieldValueActiveCampaign[]
}

interface FieldValueActiveCampaign {
	field: string
	value: string
}
