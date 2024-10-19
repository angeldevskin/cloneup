import { axiosRoot } from '../http/axios'

type IExternalScript = {
	url: string
}

export async function checkPage(url: IExternalScript) {
	try {
		const response = await axiosRoot().post('/page/external/script/check', url)
		const { data, status } = response

		return { data, status }
	} catch (error) {
		throw new Error(`Failed to check url: ${error}`)
	}
}

export async function getExternalScript() {
	try {
		const { data, status } = await axiosRoot().get(`/page/external/script`)

		if (status === 200) {
			return data
		} else {
			return status
		}
	} catch (error) {
		throw new Error(`Failed to get external script: ${error}`)
	}
}
