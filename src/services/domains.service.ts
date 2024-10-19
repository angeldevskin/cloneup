import { axiosRoot } from '../http/axios'

export const getDomains = async () => {
	const { data, status } = await axiosRoot().get('/domains')

	return {
		data,
		status
	}
}

export async function getDomainById(domainId: string) {
	return await axiosRoot()
		.get(`/domains/${domainId}`)
		.then((response) => response.data.domain)
}
