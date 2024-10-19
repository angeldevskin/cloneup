import { ColumnsFilterProps, Lead } from '../../models/leads.model'

export const leadsReducer = (
	state: { dialogDetails: boolean; leadToHandle: Lead },
	action: { type: string; payload?: unknown }
) => {
	switch (action.type) {
		case 'leadToHandle':
			return {
				...state,
				leadToHandle: action.payload as Lead
			}
		case 'dialogDetails':
			return {
				...state,
				dialogDetails: !state.dialogDetails
			}
		default:
			return state
	}
}

export const leadsColumnsReducer = (
	state: ColumnsFilterProps,
	action: { type: string }
) => {
	switch (action.type) {
		case 'name':
			return {
				...state,
				name: !state.name
			}
		case 'surname':
			return {
				...state,
				surname: !state.surname
			}
		case 'email':
			return {
				...state,
				email: !state.email
			}
		case 'telephone':
			return {
				...state,
				telephone: !state.telephone
			}
		case 'funnelName':
			return {
				...state,
				funnelName: !state.funnelName
			}
		case 'pageName':
			return {
				...state,
				pageName: !state.pageName
			}
		default:
			return state
	}
}

export function handleWhatsApp(telephone: string) {
	const url = `https://api.whatsapp.com/send?phone=${telephone
		.replace(' ', '')
		.replace('-', '')
		.trim()}`
	window.open(url, '_blank')
}
