import { AxiosResponse } from 'axios'
import { axiosRoot } from '../http/axios'
import {
	Lead,
	LeadApiResponse,
	NewLead,
	NewLeadEditor
} from '../models/leads.model'

export async function getLeads(
	page: number,
	limit: number,
	pageId: string,
	funnelId: string
): Promise<Lead[]> {
	try {
		const response: AxiosResponse<LeadApiResponse> = await axiosRoot().get(
			'/leads',
			{
				params: {
					page,
					limit,
					pageId,
					funnelId
				}
			}
		)
		return response.data.leads
	} catch (error) {
		const customError = false
		throw customError
	}
}

export async function getCrms() {
	return await axiosRoot().get('/crm')
}

export async function getCrmByFunnelId(funnelId: string) {
	return await axiosRoot().get(`/crm/${funnelId}?status=draft`)
}

export async function getAllLeadsRequest(): Promise<Lead[]> {
	try {
		const response: AxiosResponse<LeadApiResponse> =
			await axiosRoot().get('/leads')

		return response.data.leads
	} catch (error) {
		const customError = false
		throw customError
	}
}

export async function createLead(newLead: NewLead) {
	try {
		const { data, status } = await axiosRoot().post('/leads/manual', newLead)

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(`Erro ao criar página: ${error}`)
	}
}

export async function createLeadEditor(
	payloadData: NewLeadEditor
): Promise<NewLeadEditor> {
	try {
		const response = await axiosRoot().post(`/leads`, payloadData)
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar Lead: ${error}`)
	}
}

export async function updateLead(id: string, newLead: NewLead) {
	try {
		const { data, status } = await axiosRoot().put(
			`/leads/${id}?validateVisitedPagesIds=false`,
			newLead
		)

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(`Erro ao criar página: ${error}`)
	}
}

export async function deleteLead(id: string) {
	try {
		const { data, status } = await axiosRoot().delete(`/leads/${id}`)

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(`Erro ao remover lead: ${error}`)
	}
}
