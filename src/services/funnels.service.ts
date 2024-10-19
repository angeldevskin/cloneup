import { toast } from 'react-toastify'
import { FunnelCreationType, FunnelType } from '../@types/pages/funnels'

import { errorToast } from '../components/Toast/types'
import { axiosRoot } from '../http/axios'

export async function createFunnel(funnel: FunnelCreationType) {
	const response = await axiosRoot()
		.post('/funnel/create', funnel)
		.then((response) => response.data)
		.then((data) => {
			if (data.message.includes('Funnel limit reached')) {
				toast.error('Limite de funis atingido', errorToast)
				return
			}

			return data
		})

	return {
		data: response
	}
}

export async function getFunnels(page?: number) {
	const fetchedFunnels = await axiosRoot()
		.get(`/funnel/get?page=${page ?? 0}&sortOrder=desc`)
		.then((response) => response.data)

	if (!fetchedFunnels.funnels) {
		throw new Error('Funnels not found')
	}

	return {
		funnels: fetchedFunnels.funnels,
		pagination: {
			currentPage: fetchedFunnels.currentPage,
			totalPages: fetchedFunnels.totalPages
		}
	}
}

export async function getFunnelByID(id: string) {
	const response = await axiosRoot().get(`/funnel/get/${id}`)

	if (response?.status === 200) {
		return response.data.funnel as FunnelType
	}
}

export async function getAllFunnel() {
	const response = await axiosRoot().get(`/funnel/get`)
	if (response.status === 200) {
		return response.data.funnels
	} else {
		throw new Error('Não foi possível trazer os dados')
	}
}

export async function updateFunnel(
	funnel: FunnelCreationType,
	funnelId: string
) {
	const { data, status } = await axiosRoot().patch(
		`/funnel/patch/${funnelId}`,
		funnel
	)

	if (!(status === 200)) {
		throw new Error('Não foi possível atualizar o funil')
	}

	return {
		data,
		status
	}
}

export async function deleteFunnel(funnelId: string) {
	const { status } = await axiosRoot().delete(`/funnel/delete/${funnelId}`)

	if (!(status === 204)) {
		throw new Error('Não foi possível deletar o funil')
	}

	return {
		status
	}
}
