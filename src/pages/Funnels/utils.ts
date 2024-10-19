import {
	FunnelHandles,
	MetricsFilterProps,
	PageHandles
} from '../../@types/pages/funnels'

export const funnelReducer = (
	state: FunnelHandles,
	action: { type: string; payload?: unknown }
) => {
	switch (action.type) {
		case 'funnelToHandle':
			return {
				...state,
				funnelToHandle: action.payload as string
			}
		case 'dialogCreate':
			return {
				...state,
				dialogCreate: !state.dialogCreate
			}
		case 'dialogEdit':
			return {
				...state,
				dialogEdit: !state.dialogEdit
			}
		case 'dialogDelete':
			return {
				...state,
				dialogDelete: !state.dialogDelete
			}
		case 'dialogExternalCodeFunnel':
			return {
				...state,
				dialogExternalCodeFunnel: !state.dialogExternalCodeFunnel
			}
		default:
			return state
	}
}

export const funnelsMetricsReducer = (
	state: MetricsFilterProps,
	action: { type: string }
) => {
	switch (action.type) {
		case 'type':
			return {
				...state,
				type: !state.type
			}
		case 'totalVisits':
			return {
				...state,
				totalVisits: !state.totalVisits
			}
		case 'uniqueVisits':
			return {
				...state,
				uniqueVisits: !state.uniqueVisits
			}
		case 'totalSales':
			return {
				...state,
				totalSales: !state.totalSales
			}
		case 'totalValue':
			return {
				...state,
				totalValue: !state.totalValue
			}
		case 'averageValue':
			return {
				...state,
				averageValue: !state.averageValue
			}
		case 'results':
			return {
				...state,
				results: !state.results
			}
		case 'conversion':
			return {
				...state,
				conversion: !state.conversion
			}
		default:
			return state
	}
}

export const pageReducer = (
	state: PageHandles,
	action: { type: string; payload?: unknown }
) => {
	switch (action.type) {
		case 'pageToHandle':
			return {
				...state,
				pageToHandle: action.payload as string
			}
		case 'dialogCreate':
			return {
				...state,
				dialogCreate: !state.dialogCreate
			}
		case 'dialogEdit':
			return {
				...state,
				dialogEdit: !state.dialogEdit
			}
		case 'dialogDelete':
			return {
				...state,
				dialogDelete: !state.dialogDelete
			}
		case 'dialogExternalCodePage':
			return {
				...state,
				dialogExternalCodePage: !state.dialogExternalCodePage
			}
		default:
			return state
	}
}
