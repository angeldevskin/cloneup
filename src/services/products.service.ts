import { axiosRoot } from '../http/axios'

export async function createProduct(product: {
	productId: string
	name: string
	source: string
}) {
	try {
		const { data, status } = await axiosRoot().post(`/product`, product)

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(
			'Não foi possível criar o produto. Tente novamente mais tarde.'
		)
	}
}

export async function getProductById(productId: string) {
	try {
		const { data, status } = await axiosRoot().get(`/product/${productId}`)

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(
			'Não foi possível buscar o produto. Tente novamente mais tarde.'
		)
	}
}

export async function deleteProduct(productId: string) {
	try {
		const { status } = await axiosRoot().delete(`/product/${productId}`)

		return {
			status
		}
	} catch (error) {
		throw new Error(
			'Não foi possível excluir o produto. Tente novamente mais tarde.'
		)
	}
}

export async function getProductsBySource(source: string) {
	try {
		const { data, status } = await axiosRoot().get(`/product`, {
			params: {
				source
			}
		})

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(
			'Não foi possível buscar os produtos. Tente novamente mais tarde.'
		)
	}
}

export async function getKiwifyProducts() {
	try {
		const { data, status } = await axiosRoot().get(
			`/integrations/kiwify/products`
		)

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(
			'Não foi possível buscar os produtos. Tente novamente mais tarde.'
		)
	}
}
