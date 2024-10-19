import { DefaultFields } from './DefaultFields'

export interface Hotmart extends DefaultFields {
	hottok: string
}

export interface Mailchimp {
	mailChimpApiKey: string
}

export interface Kiwify extends DefaultFields {}

export interface ActiveCampaign {
	key: string
	baseUsername: string
}

export interface GoogleAnalytics extends DefaultFields {}

export interface GoogleADS extends DefaultFields {}

export interface Facebook extends DefaultFields {}
