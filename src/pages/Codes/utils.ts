import { ColumnsFilterPropsCode } from '../../models/code.model'

export const codeColumnsReducer = (
	state: ColumnsFilterPropsCode,
	action: { type: string }
) => {
	switch (action.type) {
		case 'name':
			return {
				...state,
				name: !state.name
			}
		case 'platform':
			return {
				...state,
				platform: !state.platform
			}
		case 'createdAt':
			return {
				...state,
				createdAt: !state.createdAt
			}
		default:
			return state
	}
}
