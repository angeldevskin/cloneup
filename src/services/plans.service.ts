import { axiosRoot } from '../http/axios'

export const getPlans = async () => {
	const response = await axiosRoot().get('/plans/status')
	return response.data.usage
}
