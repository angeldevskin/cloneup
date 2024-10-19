import { ColumnsTeamsFilterProps } from '../../models/teams.model'

export const teamsColumnsReducer = (
	state: ColumnsTeamsFilterProps,
	action: { type: string }
) => {
	switch (action.type) {
		case 'name':
			return {
				...state,
				name: !state.name
			}
		case 'email':
			return {
				...state,
				email: !state.email
			}
		case 'role':
			return {
				...state,
				role: !state.role
			}
		default:
			return state
	}
}
