import { axiosRoot } from '../http/axios'
import { getPageByID } from './editor.service'
import { PixelCode, PixelCodeResponseWithFunnelPage } from './models/pixel-code'

type IPixelCodeSource = {
	name: string
	platform: string
	pagelId: string
	funnelIds: string[]
	pagesIds: string[]
	headerPage: string
	bodyPage: string
	footerPage: string
	isManual: boolean
}

export async function createPixelCodeSource(pixelCode: IPixelCodeSource) {
	try {
		const { data, status } = await axiosRoot().post(
			'/external-code/',
			pixelCode
		)

		if (status === 201) {
			return data
		} else {
			return status
		}
	} catch (error) {
		throw new Error(`Failed to create pixel or code source: ${error}`)
	}
}

export async function getPixelCodeSourceById(externalCodeId: string) {
	try {
		const { data, status } = await axiosRoot().get(
			`/external-code/${externalCodeId}`
		)

		if (status === 200) {
			return data
		} else {
			return status
		}
	} catch (error) {
		throw new Error(`Failed to get pixel or code source by ID: ${error}`)
	}
}

export async function getAllExternalCodes(): Promise<PixelCode[]> {
	const data = await axiosRoot()
		.get(`/external-code/`)
		.then((response) => response)

	if (!data) {
		throw new Error('External code not found')
	}

	return data.data.externalCode
}

export async function getPixelCodeWithFunnelPage(): Promise<PixelCode[]> {
	try {
		const response = await axiosRoot().get('/external-code/')

		if (response.status === 200) {
			const pixelCodes: PixelCode[] = response.data.externalCode
			const pixelCodesPageWithFunnel: PixelCodeResponseWithFunnelPage[] = []
			for (const pixelCode of pixelCodes) {
				let page = null

				if (pixelCode.pageId) {
					page = await getPageByID(pixelCode.pageId)
				}

				const pixelCodePageWithFunnel: PixelCodeResponseWithFunnelPage = {
					...pixelCode,
					pageName: page?.page?.name ?? '',
					pageId: page?.page?._id ?? ''
				}
				pixelCodesPageWithFunnel.push(pixelCodePageWithFunnel)
			}
			return pixelCodesPageWithFunnel
		} else {
			throw new Error(`Failed to get pixel or code. Status: ${response.status}`)
		}
	} catch (error) {
		throw new Error(`Failed to get pixel or code: ${error}`)
	}
}

export async function updatePixelCodeSource(
	externalCodeId: string,
	changes: Partial<IPixelCodeSource>
) {
	try {
		const { data, status } = await axiosRoot().patch(
			`/external-code/${externalCodeId}`,
			changes
		)

		if (status === 200) {
			return data
		} else {
			return status
		}
	} catch (error) {
		throw new Error(`Failed to update pixel or code source: ${error}`)
	}
}

export async function updatePixelCodeSourceFunnel(
	externalCodeId: string,
	changes: Partial<IPixelCodeSource>
) {
	try {
		const { data, status } = await axiosRoot().patch(
			`/external-code/${externalCodeId}`,
			changes
		)

		if (status === 200) {
			return data
		} else {
			return status
		}
	} catch (error) {
		// Erro ignorado intencionalmente
	}
}

export async function deletePixelCodeSource(externalCodeId: string) {
	try {
		const { status } = await axiosRoot().delete(
			`/external-code/${externalCodeId}`
		)

		if (status === 204) {
			return status
		} else {
			return status
		}
	} catch (error) {
		throw new Error(`Failed to delete pixel or code source: ${error}`)
	}
}
