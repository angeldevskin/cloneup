import { Close } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '../../../Button'
import { EmptyWrapper } from '../../../EmptyWrapper/styles'
import { Select } from '../../../Select'
import { TextField } from '../../../TextField'

import {
	createProduct,
	getProductsBySource,
	getKiwifyProducts
} from '../../../../services/products.service'
import { useFunnels } from '../../../../services/store/funnels'
import { successToast } from '../../../Toast/types'
import * as S from './styles'

export type ProductType = {
	_id: string
	name: string
	productId: string
	source: string
}

export function CheckoutForm({
	addCheckoutNode
}: {
	addCheckoutNode: (productId: string) => void
}) {
	const { currentFunnel } = useFunnels((state) => state)

	const [products, setProducts] = useState<
		Array<{ id: string; name: string; productId: string; source: string }>
	>([])
	const [selectedProduct, setSelectedProduct] = useState<string>()

	const [isPending, startProductTransation] = useTransition()

	const { register, handleSubmit, reset } = useForm<{
		productName?: string
		productId?: string
		hotmartProductId?: string
		hotmartProductName?: string
	}>()

	async function onHandleSubmit(fields: {
		productName?: string
		productId?: string
		hotmartProductId?: string
		hotmartProductName?: string
	}) {
		if (
			currentFunnel.checkoutPlatform === 'manual' &&
			fields.productName &&
			fields.productId
		) {
			const response = await createProduct({
				productId: fields.productId!,
				name: fields.productName!,
				source: 'manual'
			})

			if (response.status === 201) {
				addCheckoutNode(response.data.product._id)
				toast.success('Produto criado com sucesso!', successToast)

				return
			}
		}

		if (
			currentFunnel.checkoutPlatform === 'hotmart' &&
			fields.hotmartProductId &&
			fields.hotmartProductName
		) {
			const response = await createProduct({
				productId: fields.hotmartProductId!,
				name: fields.hotmartProductName!,
				source: 'hotmart'
			})

			if (response.status === 201) {
				addCheckoutNode(response.data.product._id)
				toast.success('Produto criado com sucesso!', successToast)

				return
			}
		}
		const produtcId = products.find(
			(product) => product.productId === selectedProduct
		)

		if (produtcId) addCheckoutNode(produtcId.id)
		reset()
	}

	async function fetchProducts() {
		if (currentFunnel.checkoutPlatform === 'kiwify') {
			const { data } = await getKiwifyProducts()

			console.log(data.data)

			const formatProducts = data.data.map(
				(product: { id: string; name: string }) => ({
					id: product.id,
					productId: product.id,
					name: product.name,
					source: 'kiwify'
				})
			)

			setProducts(formatProducts)

			return
		}

		if (currentFunnel.checkoutPlatform !== 'none') {
			const { data } = await getProductsBySource(
				currentFunnel.checkoutPlatform!
			)

			const formatProducts = data.products.map(
				(product: Partial<ProductType>) => ({
					id: product._id,
					name: product.name,
					productId: product.productId,
					source: product.source
				})
			)

			setProducts(formatProducts)
		}
	}

	useEffect(() => {
		if (currentFunnel.checkoutPlatform !== 'none') {
			startProductTransation(() => {
				fetchProducts()
			})
		}
	}, [currentFunnel.checkoutPlatform])

	return (
		<S.Form onSubmit={handleSubmit(onHandleSubmit)}>
			{isPending && (
				<EmptyWrapper>
					<Loader2 strokeWidth={1} />
					<span>Carregando produtos...</span>
				</EmptyWrapper>
			)}

			{products.length <= 0 &&
				!!currentFunnel.checkoutPlatform &&
				currentFunnel.checkoutPlatform !== 'manual' &&
				!isPending && <S.NoContent>Nenhum produto encontrado</S.NoContent>}

			{products.length > 0 && (
				<Select
					currentValue={selectedProduct!}
					handleChange={(value) => setSelectedProduct(value)}
					label="Produto"
					placeholder="Selecione um produto"
					items={products.map((product) => ({
						id: product.productId,
						name: `${product.name}`,
						value: product.productId
					}))}
				/>
			)}

			{currentFunnel.checkoutPlatform === 'hotmart' && (
				<>
					<span>Ou cadastre um novo abaixo:</span>
					<TextField
						label="ID do produto"
						name="hotmartProductId"
						register={register}
						type="number"
						placeholder="0"
						$fullwidth
					/>
					<TextField
						label="Nome do produto"
						name="hotmartProductName"
						register={register}
						type="text"
						placeholder="Nome do produto"
						$fullwidth
					/>
				</>
			)}

			{currentFunnel.checkoutPlatform === 'manual' && (
				<S.InlineContainer>
					<TextField
						label="Nome do produto"
						placeholder='Ex: "Curso de Marketing Digital"'
						name="productName"
						register={register}
						$fullwidth
					/>
					<TextField
						label="ID do produto"
						name="productId"
						register={register}
						type="number"
						placeholder="0"
						$fullwidth
					/>
				</S.InlineContainer>
			)}

			<footer>
				<Close asChild>
					<Button shape="text" $fullwidth>
						Cancelar
					</Button>
				</Close>
				<Button type="submit" $fullwidth>
					Confirmar
				</Button>
			</footer>
		</S.Form>
	)
}
