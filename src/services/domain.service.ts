import { axiosRoot } from '../http/axios'
import { DomainItem, NewDomain } from '../models/domain.model'

export async function getDomains(): Promise<DomainItem[]> {
	try {
		const response = await axiosRoot().get('/domains/')
		return response.data.domains
	} catch (error) {
		const customError = false
		throw customError
	}
}

export async function createDomain(newDomain: NewDomain) {
	try {
		const { data, status } = await axiosRoot().post('/domains/', newDomain)

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(`Erro ao criar página: ${error}`)
	}
}

export async function deleteDomainAxios(id: string) {
	try {
		const { data, status } = await axiosRoot().delete(`/domains/${id}`)

		return {
			data,
			status
		}
	} catch (error) {
		throw error
	}
}
