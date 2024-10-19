import { axiosRoot } from '../http/axios'

export async function getFunnelTemplates() {
	const { data, status } = await axiosRoot().get('/funnel-template/get/')

	if (!(status === 200)) {
		throw new Error('Templates não encontrados.')
	}

	return {
		data,
		status
	}
}
