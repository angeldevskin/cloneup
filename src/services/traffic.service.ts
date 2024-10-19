import { toast } from 'react-toastify'
import { errorToast, successToast } from '../components/Toast/types'
import { axiosRoot } from '../http/axios'

type ITrafficSource = {
	funnelId: string
	name: string
	UTMSource: string
	UTMMedium: string
	UTMCampaign: string
	budget?: number
	budgetType?: string
}

export async function createTrafficSource(trafficSource: ITrafficSource) {
	const { data, status } = await axiosRoot().post('/traffics', trafficSource)

	if (status === 201) {
		return data
	}
}

export async function getTrafficSourceById(trafficId: string) {
	const { data, status } = await axiosRoot().get(`/traffics/${trafficId}`)

	if (status === 200) {
		return data
	}
}

export async function updateTrafficSource(
	trafficId: string,
	changes: Partial<ITrafficSource>
) {
	const { data, status } = await axiosRoot().patch(
		`/traffics/${trafficId}`,
		changes
	)

	if (status === 200) {
		return data
	} else {
		toast.error('Erro ao atualizar fonte de tráfego', errorToast)
		return
	}
}

export async function deleteTrafficSource(trafficId: string) {
	const { status } = await axiosRoot().delete(`/traffics/${trafficId}`)

	if (status === 204) {
		toast.success('Fonte de tráfego deletada com sucesso', successToast)
		return
	} else {
		toast.error('Erro ao deletar fonte de tráfego', errorToast)
		return
	}
}
