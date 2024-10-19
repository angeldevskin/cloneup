import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormType, FunnelCreationType } from '../../../@types/pages/funnels'
import { Button } from '../../../components/Button'
import * as S from '../../../components/Funnels/FormWrapper/styles'
import { TextField } from '../../../components/TextField'
import { successToast } from '../../../components/Toast/types'
import { createFunnel } from '../../../services/funnels.service'
import { useFunnels } from '../../../services/store/funnels'
import { useEffect, useState } from 'react'
import { getCategories } from '../../../services/categories.service'
import { CategoriesType } from '../../../@types/categories'
import { Select } from '../../../components/Select'

export type SelectItemsType = {
	id: string
	name: string
	value: string
}[]

export function NewFunnelForm({ closeDialog }: { closeDialog: () => void }) {
	const [selectedPlatform, setSelectedPlatform] = useState('')

	const [categories, setCategories] = useState<SelectItemsType>()
	// const [domains, setDomains] = useState<SelectItemsType>()

	const [selectedCategory, setSelectedCategory] = useState('')
	// const [selectedDomain] = useState('')

	const { register, handleSubmit, reset } = useForm<FormType>()

	const { setCurrentFunnel, setCurrentNodes, setCurrentEdges } = useFunnels(
		(state) => state
	)

	const navigate = useNavigate()

	const validateField = (fieldValue: string, fieldName: string) => {
		if (!fieldValue || !fieldValue.trim()) {
			toast.error(
				`O campo ${fieldName} não pode ser vazio ou conter apenas espaços em branco!`
			)
			return false
		}
		return true
	}

	async function fetchCategories() {
		const responseCategories = await getCategories({ type: 'funnel' })

		if (responseCategories.data) {
			const myCategories = responseCategories.data.categories.map(
				(item: CategoriesType) => ({
					name: item.category,
					id: item._id,
					value: item._id
				})
			)

			setCategories(myCategories)
		}
	}

	// async function fetchDomains() {
	// 	try {
	// 		const responseDomains = await getDomains()

	// 		const myDomains = responseDomains.map((domain) => ({
	// 			name: domain.domainName,
	// 			id: domain._id,
	// 			value: domain._id
	// 		}))

	// 		setDomains(myDomains)
	// 	} catch (error) {
	// 		toast.info('Erro ao buscar domínios cadastrados', errorToast)
	// 	}
	// }

	useEffect(() => {
		fetchCategories()
	}, [])

	async function onSubmit(fields: FormType) {
		if (!validateField(fields.funnelName, 'nome do funil')) {
			return
		}

		const newData: FunnelCreationType = {
			name: fields.funnelName,
			description: fields.funnelDesc ? fields.funnelDesc : undefined,
			templateId: undefined,
			props: {
				nodes: [],
				edges: [],
				viewport: {
					x: 320.5,
					y: 269.5,
					zoom: 1.2
				}
			},
			category: selectedCategory,
			// domainId: selectedDomain,
			checkoutPlatform: !selectedPlatform ? 'none' : selectedPlatform,
			status: 'draft'
		}

		const response = await createFunnel(newData)

		if (response) {
			setCurrentFunnel({
				...response.data.funnel
			})
			setCurrentNodes(response.data.funnel.props.nodes)
			setCurrentEdges(response.data.funnel.props.edges)

			toast.success('Funil criado com sucesso', successToast)
			closeDialog()
			navigate(`/funnel-flow/${response.data.funnel._id}`)
			reset()
		}
	}

	return (
		<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
			<TextField
				placeholder="Digite o nome do funil"
				label="Nome do funil"
				name="funnelName"
				required
				register={register}
				minLength={4}
				maxLength={50}
				$fullwidth
			/>
			<TextField
				placeholder="Digite uma descrição para o funil"
				label="Descrição do funil"
				name="funnelDesc"
				register={register}
				$fullwidth
			/>
			{/* <Select
				items={domains}
				label="Domínio"
				placeholder="Selecione o domínio do funil"
				handleChange={(value) => setSelectedDomain(value)}
				currentValue={selectedDomain}
			/> */}
			<Select
				items={categories}
				label="Categoria"
				placeholder="Selecione a categoria do funil"
				handleChange={(value) => setSelectedCategory(value)}
				currentValue={selectedCategory}
			/>
			{selectedCategory ===
				categories?.find((cat) => cat.name === 'Vendas')?.id && (
				<Select
					items={[
						{
							id: 'kiwify',
							name: 'Kiwify',
							value: 'kiwify'
						},
						{
							id: 'hotmart',
							name: 'Hotmart',
							value: 'hotmart'
						},
						{
							id: 'manual',
							name: 'Manual',
							value: 'manual'
						}
					]}
					placeholder="Selecione a plataforma de checkout"
					label="Plataforma de Checkout"
					currentValue={selectedPlatform}
					handleChange={(value) => setSelectedPlatform(value)}
				/>
			)}
			<span
				style={{
					textAlign: 'left',
					fontSize: '12px'
				}}
			>
				Templates de funil - <strong>Em breve</strong>
			</span>

			<S.ConfirmationWrapper>
				<Close asChild>
					<Button shape="ghost" $fullwidth>
						Cancelar
					</Button>
				</Close>
				<Button $fullwidth type="submit">
					Criar
				</Button>
			</S.ConfirmationWrapper>
		</S.FormWrapper>
	)
}
