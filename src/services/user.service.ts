import { axiosRoot } from '../http/axios'

export async function getUsers() {
	try {
		const response = await axiosRoot().get('/user/team')
		return response.data
	} catch (error: any) {
		const customError = error.response.data
		throw customError
	}
}

export async function createUser(user: {
	email: string
	name: string
	role: string
	password?: string
}) {
	try {
		const response = await axiosRoot().post('/user/create', user)
		return response.data
	} catch (error: any) {
		const customError = error.response.data
		throw customError
	}
}
export async function updateUser(
	id: string,
	user: {
		email: string
		name: string
		role: string
		password: string
	}
): Promise<any[]> {
	try {
		const response = await axiosRoot().put(
			`/user/update/team-member/${id}`,
			user
		)
		return response.data
	} catch (error: any) {
		const customError = error.response.datamessage
		throw customError
	}
}

export async function deleteUser(email: string): Promise<any[]> {
	try {
		const response = await axiosRoot().delete('/user/delete', {
			data: { email }
		})
		return response.data
	} catch (error: any) {
		const customError = error.response.data.message
		throw customError
	}
}
