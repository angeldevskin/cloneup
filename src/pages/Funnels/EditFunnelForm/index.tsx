import { Close } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { GetFunnelProps } from '../../../@types/pages/funnels'
import { Button } from '../../../components/Button'
import * as S from '../../../components/Funnels/FormWrapper/styles'
import { Select } from '../../../components/Select'
import { TextField } from '../../../components/TextField'
import { errorToast, successToast } from '../../../components/Toast/types'
import { getFunnelByID, updateFunnel } from '../../../services/funnels.service'
import { Wrapper } from './styles'

type FormType = {
	name: string
	description: string
}

export function EditFunnelForm({
	funnelId,
	closeDialog
}: {
	funnelId: string
	closeDialog: () => void
}) {
	const [funnel, setFunnel] = useState<GetFunnelProps>({} as GetFunnelProps)

	const [isLoading, setIsLoading] = useState(true)

	const [selectedPlatform, setSelectedPlatform] = useState('')

	const { register, handleSubmit, reset } = useForm<FormType>({
		values: {
			name: funnel.name,
			description: funnel.description
		}
	})

	async function getFunnel() {
		const response: GetFunnelProps = await getFunnelByID(funnelId)

		if (!response) return toast.error('Erro ao buscar funil', errorToast)

		setFunnel(response)

		setIsLoading(false)
	}

	async function onSubmit(fields: FormType) {
		const { status } = await updateFunnel(fields, funnelId)

		if (status === 200) {
			closeDialog()
			reset()

			toast.success('Funil atualizado com sucesso', successToast)
		}
	}

	useEffect(() => {
		getFunnel()
	}, [])

	return (
		<Wrapper onSubmit={handleSubmit(onSubmit)}>
			{isLoading && <span>Carregando...</span>}
			{!isLoading && funnel && (
				<>
					<TextField
						placeholder="Digite o nome do funil"
						label="Nome do funil"
						name="name"
						register={register}
						$fullwidth
					/>
					<TextField
						placeholder="Digite uma descrição para o funil"
						label="Descrição do funil"
						name="description"
						register={register}
						$fullwidth
					/>
					{funnel.checkoutPlatform === 'none' &&
						funnel.category.category === 'Sales' && (
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

					<S.ConfirmationWrapper>
						<Close asChild>
							<Button shape="ghost" $fullwidth>
								Cancelar
							</Button>
						</Close>
						<Button $fullwidth type="submit">
							Salvar
						</Button>
					</S.ConfirmationWrapper>
				</>
			)}
		</Wrapper>
	)
}
