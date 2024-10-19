import { axiosRoot } from '../http/axios'
import { KiwifyProductsResponse } from './models/kiwify-products'
import {
	ActiveCampaign,
	ActiveCampaignPost,
	Mailchimp
} from './models/settings'

interface Hotmart {
	client_id: string
	client_secret: string
	token: string
	hottok: string
}

interface Kiwify {
	token: string
	client_id: string
	client_secret: string
	account_id: string
}

export async function getHotmart(): Promise<Hotmart> {
	try {
		const response = await axiosRoot().get('/integrations/hotmart')
		return response.data
	} catch (error) {
		const customError = false
		throw customError
	}
}

export async function getstatusKiwify() {
	try {
		const response = await axiosRoot().get('/integrations/kiwify/sales')
		return response
	} catch (error) {
		const customError = false
		throw customError
	}
}

export async function createHotmart(newHotmart: Hotmart): Promise<Hotmart> {
	try {
		const response = await axiosRoot().post('/integrations/hotmart', newHotmart)
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar configuração: ${error}`)
	}
}

export async function getKiwify(): Promise<Kiwify> {
	try {
		const response = await axiosRoot().get('/integrations/kiwify')
		return response.data
	} catch (error) {
		const customError = false
		throw customError
	}
}

export async function createKiwify(newKiwify: Kiwify): Promise<Kiwify> {
	try {
		const response = await axiosRoot().post('/integrations/kiwify', newKiwify)
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar configuração: ${error}`)
	}
}

export async function createMailchimp(
	newMailchimp: Mailchimp
): Promise<Mailchimp> {
	try {
		const response = await axiosRoot().post(
			'/integrations/mailchimp/marketing/',
			newMailchimp
		)
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar configuração: ${error}`)
	}
}

export async function getMailchimp(): Promise<Mailchimp> {
	try {
		const response = await axiosRoot().get('/integrations/mailchimp/marketing/')
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar configuração: ${error}`)
	}
}

export async function getActiveCampaignLists() {
	try {
		const response = await axiosRoot().get(
			'/integrations/active-campaign/lists'
		)
		return response.data.lists
	} catch (error) {
		console.error(`Erro ao trazer active campaign list: ${error}`)
	}
}

export async function getMailChimpLists() {
	try {
		const response = await axiosRoot().get(
			'/integrations/mailchimp/marketing/list'
		)
		return response.data.lists.lists
	} catch (error) {
		console.error(`Erro ao trazer active Mailchimp list: ${error}`)
	}
}

export async function getMailchimpTags(listId: string) {
	try {
		console.log(listId)
		const response = await axiosRoot().get(
			`/integrations/mailchimp/marketing/segments/${listId}`
		)

		return response.data.segments.segments.map(
			(tag: { id: string; name: string; value: string }) => ({
				id: tag.id,
				name: tag.name,
				value: tag.id
			})
		)
	} catch (error) {
		console.error(`Erro ao trazer active Mailchimp list: ${error}`)
	}
}

export async function getActiveCampaignTags() {
	try {
		const request = await axiosRoot().get(`/integrations/active-campaign/tags`)

		const response = request.data.tags.map(
			(tag: { id: string; tag: string }) => ({
				id: tag.id,
				name: tag.tag,
				value: tag.id
			})
		)

		return response
	} catch (error) {
		console.error(`Erro ao trazer active Mailchimp list: ${error}`)
	}
}

export async function getKiwifySales() {
	try {
		const response = await axiosRoot().get('/integrations/kiwify/sales')
		return response
	} catch (error) {
		console.error(`Erro ao trazer active Mailchimp list: ${error}`)
	}
}

export async function getMailChimpListsIntegration() {
	try {
		const response = await axiosRoot().get(
			'/integrations/mailchimp/marketing/list'
		)
		return response.data.lists
	} catch (error) {
		console.error(`Erro ao trazer active Mailchimp list: ${error}`)
	}
}

export async function createActiveCampaign(newMailchimp: ActiveCampaignPost) {
	await axiosRoot()
		.post('/integrations/active-campaign', newMailchimp)
		.then((response) => response.data as Mailchimp)
		.catch((data) => {
			if (!data) return false
		})
}

export async function getActiveCampaign() {
	await axiosRoot()
		.get('/integrations/active-campaign')
		.then((response) => response.data as ActiveCampaign)
		.catch((data) => {
			if (!data) return false
		})
}

export async function getActiveCampaignNew() {
	try {
		const response = await axiosRoot().get('/integrations/active-campaign')
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar configuração: ${error}`)
	}
}

export async function getActiveCampaignOld() {
	try {
		const response = await axiosRoot().get('/integrations/active-campaign')
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar configuração: ${error}`)
	}
}

export async function getActiveCampaignList() {
	try {
		const response = await axiosRoot().get(
			'/integrations/active-campaign/lists'
		)
		return response.data
	} catch (error) {
		throw new Error(`Erro a listar produtos: ${error}`)
	}
}

export async function getHotmartSubscriptions() {
	try {
		const response = await axiosRoot().get(
			'/integrations/hotmart/subscriptions'
		)
		return response.data
	} catch (error) {
		throw new Error(`Erro a listar subscrições: ${error}`)
	}
}

export async function getProductsKiwify(): Promise<KiwifyProductsResponse> {
	try {
		const response = await axiosRoot().get('/integrations/kiwify/products')
		return response.data
	} catch (error) {
		throw new Error(`Erro ao criar configuração: ${error}`)
	}
}

export async function deleteIntegration(integration: string) {
	const integrationFormat = integration.toLocaleLowerCase().replace(/\s+/g, '-')
	try {
		if (integrationFormat === 'mailchimp') {
			const { status } = await axiosRoot().delete(
				`/integrations/mailchimp/marketing`
			)
			if (status === 204) {
				return
			} else {
				throw new Error(`Erro ao deletar integracao!`)
			}
		} else {
			const { status } = await axiosRoot().delete(
				`/integrations/${integrationFormat}`
			)

			if (status === 204) {
				return
			} else {
				throw new Error(`Erro ao deletar integracao!`)
			}
		}
	} catch (error) {
		throw new Error(`Erro ao deletar integracao: ${error}`)
	}
}
