import { axiosRoot } from '../http/axios'
import { ListPage, Page, PageTemplate } from '../models/page.model'

export async function getPage(): Promise<ListPage> {
	try {
		const response = await axiosRoot().get('/page/get/')
		return response.data
	} catch (error) {
		const customError = false
		throw customError
	}
}

export async function getPageById({
	pageId,
	showHTMLCSSJS
}: {
	pageId: string
	showHTMLCSSJS: boolean
}): Promise<Page> {
	try {
		const { data } = await axiosRoot().get(`/page/get/${pageId}`, {
			params: {
				showHTMLCSSJS
			}
		})

		return data.page
	} catch (error) {
		throw new Error(`Erro ao buscar páginas: ${error}`)
	}
}

export async function getPagesByFunnelId(funnelId: string) {
	try {
		const { data, status } = await axiosRoot().get(`/page/get`, {
			params: {
				funnelId,
				showHTMLCSSJS: false
			}
		})

		return { data, status }
	} catch (error) {
		throw new Error(`Erro ao buscar páginas: ${error}`)
	}
}

export async function createPage(newPage: Page) {
	const { data, status } = await axiosRoot().post('/page/create', newPage)

	return {
		data,
		status
	}
}

export async function updatePage(changes: Partial<Page>, pageId: string) {
	let errorMsg

	try {
		const response = await axiosRoot().patch(`/page/patch/${pageId}`, changes, {
			validateStatus: (status) => {
				if (status === 409) {
					errorMsg = 'Já existe uma página nesse funil com essa URL'
				}

				if (status >= 200 && status < 300) return true

				return false
			}
		})

		return response
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(errorMsg || 'Erro ao atualizar a página')
	}
}

export async function deletePage(pageId: string) {
	try {
		const { status } = await axiosRoot().delete(`/page/delete/${pageId}`)

		if (status === 204) {
			return
		}
	} catch (error) {
		throw new Error(`Erro ao deletar página: ${error}`)
	}
}

export async function publishPage({
	pageId,
	domain
}: {
	pageId: string
	domain: string
}) {
	try {
		const { data, status } = await axiosRoot().post(
			`/domains/files/${pageId}`,
			{
				domainName: domain
			}
		)

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(`Erro ao publicar página: ${error}`)
	}
}

export async function getPageTemplate(status?: string) {
	try {
		return await axiosRoot().get('/page-template/get/', {
			params: {
				status: status ?? null
			}
		})
	} catch (error) {
		const customError = false
		throw customError
	}
}

export async function createPageTemplate(
	newPageTemplate: PageTemplate
): Promise<PageTemplate> {
	try {
		const response = await axiosRoot().post(
			'/page-template/create',
			newPageTemplate
		)
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar página: ${error}`)
	}
}

export async function updatePageTemplate(
	newPageTemplate: PageTemplate,
	id: string
): Promise<PageTemplate> {
	try {
		const response = await axiosRoot().put(
			`/page-template/update/${id}`,
			newPageTemplate
		)
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar página: ${error}`)
	}
}

export async function deletePageTemplate(id: string) {
	try {
		const response = await axiosRoot().delete(`/page-template/delete/${id}`)
		return response
	} catch (error) {
		throw new Error(`Erro ao deletar template: ${error}`)
	}
}

export async function getPageByID(id: string) {
	const response = await axiosRoot().get(`/page/get/${id}`)

	if (response.status === 200) {
		return response.data
	}
}
