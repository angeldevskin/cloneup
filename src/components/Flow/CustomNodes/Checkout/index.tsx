import { memo, useEffect, useState } from 'react'
import { NodeProps, Position } from 'reactflow'
import {
	deleteProduct,
	getProductById
} from '../../../../services/products.service'
import { CheckoutForm, ProductType } from '../../components/CheckoutForm'

import hotmartLogo from '../../../../assets/images/hotmart.svg'
import kiwifyLogo from '../../../../assets/images/kiwify.svg'

import { Cable, Plus, Trash } from 'lucide-react'
import { toast } from 'react-toastify'
import { useFunnels } from '../../../../services/store/funnels'
import { DeleteConfirmation } from '../../../DeleteConfirmation'
import { DialogRoot } from '../../../Dialog'
import { FunnelDialog } from '../../../Funnels/FunnelDialog'
import { successToast } from '../../../Toast/types'
import { Tooltip } from '../../../Tooltip'
import * as S from './styles'

type CheckoutNodeProps = {
	productId: string
	type: 'checkout'
}

function Checkout({ data, ...rest }: NodeProps<CheckoutNodeProps>) {
	const [deleteDialog, setDeleteDialog] = useState(false)
	const [product, setProduct] = useState<Partial<ProductType>>()

	const [addProductDialog, setAddProductDialog] = useState(false)

	const { currentNodes, setCurrentNodes, currentEdges, setCurrentEdges } =
		useFunnels((state) => state)

	async function fetchProduct() {
		const response = await getProductById(data.productId)

		setProduct(response.data.product)
	}

	function addNewProduct(id: string) {
		data.productId = id
	}

	useEffect(() => {
		fetchProduct()
	}, [data.productId])

	function iconResolver() {
		switch (product?.source) {
			case 'hotmart':
				return <img src={hotmartLogo} alt="hotmart logo" />
			case 'kiwify':
				return <img src={kiwifyLogo} alt="kiwify logo" />
			default:
				return <Cable strokeWidth={1} />
		}
	}

	async function removeGenericNode() {
		const newNodes = currentNodes.filter((node) => {
			return node.id !== rest.id
		})

		setCurrentNodes(newNodes)
	}

	async function destroyCheckoutAndProduct() {
		const findProduct = currentNodes.find(
			(node) =>
				node.type === 'checkout' && node.data.productId === data.productId
		)

		if (findProduct) {
			const newNodes = currentNodes.filter(
				(node) => node.id !== findProduct?.id
			)

			const newEdges = currentEdges.filter(
				(edge) => (edge.target || edge.source) !== findProduct?.id
			)

			setCurrentNodes(newNodes)
			setCurrentEdges(newEdges)
			const response = await deleteProduct(data.productId)

			if (response.status === 204) {
				toast.success('Checkout removido com sucesso', successToast)
				setDeleteDialog(!deleteDialog)
			}
		}
	}

	return (
		<S.Wrapper data-state={!data.productId && 'placeholder'}>
			<S.CustomHandle type="target" position={Position.Left} />
			{!data.productId && (
				<>
					<S.Actions>
						<Tooltip
							content="Selecione um produto"
							trigger={
								<button
									className="checkoutAction"
									data-state="regular"
									onClick={() => setAddProductDialog(true)}
								>
									Selecione
								</button>
							}
						/>
						<Tooltip
							trigger={
								<button
									className="checkoutAction"
									data-state="desctruction"
									onClick={() => removeGenericNode()}
								>
									<Trash strokeWidth={1} />
								</button>
							}
							content="Remover checkout"
						/>
					</S.Actions>
					<Plus strokeWidth={1.5} size={32} />
					<S.Infos>
						<span>Checkout</span>
					</S.Infos>
					<FunnelDialog
						title="Produto"
						isOpen={addProductDialog}
						setIsOpen={() => setAddProductDialog(!addProductDialog)}
					>
						<CheckoutForm
							addCheckoutNode={(productId: string) => addNewProduct(productId)}
						/>
					</FunnelDialog>
				</>
			)}
			{data.productId && (
				<>
					<S.Actions>
						<Tooltip
							trigger={
								<button
									className="checkoutAction"
									data-state="desctruction"
									onClick={() => setDeleteDialog(!deleteDialog)}
								>
									<Trash strokeWidth={1} />
								</button>
							}
							content="Remover checkout"
						/>
					</S.Actions>
					{iconResolver()}
					<S.Infos>
						<Tooltip
							trigger={
								<strong
									style={{
										overflow: 'hidden',
										textWrap: 'nowrap',
										fontSize: '0.5rem',
										maxWidth: '150%',
										textOverflow: 'ellipsis'
									}}
								>
									{product?.name}
								</strong>
							}
							content={product?.name ?? ''}
						/>
					</S.Infos>
				</>
			)}
			<S.CustomHandle type="source" position={Position.Right} />
			<DialogRoot
				title="Excluir checkout"
				isOpen={deleteDialog}
				setIsOpen={() => setDeleteDialog(!deleteDialog)}
			>
				<DeleteConfirmation
					message="Deseja realmente excluir o checkout? O produto vinculado também será excluído."
					itemToDelete={data.productId}
					destructionFunction={() => destroyCheckoutAndProduct()}
				/>
			</DialogRoot>
		</S.Wrapper>
	)
}

export default memo(Checkout)
