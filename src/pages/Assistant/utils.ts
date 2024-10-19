import { ColumnsAssistantFilterProps } from '../../models/assistant.model'

export const assistantColumnsReducer = (
	state: ColumnsAssistantFilterProps,
	action: { type: string }
) => {
	switch (action.type) {
		case 'name':
			return {
				...state,
				name: !state.name
			}
		case 'gptVersion':
			return {
				...state,
				gptVersion: !state.gptVersion
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
