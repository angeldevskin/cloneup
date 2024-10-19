import { axiosRoot } from '../http/axios'

export async function getCategories({ type }: { type: string }) {
	const { data, status } = await axiosRoot().get(`/category/get?type=${type}`)

	return {
		data,
		status
	}
}
