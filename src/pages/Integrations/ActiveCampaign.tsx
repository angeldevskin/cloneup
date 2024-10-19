/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import {
	createActiveCampaign,
	getActiveCampaignList
} from '../../services/setting'
import * as S from '../Settings/styles'
import { ActiveCampaign } from './models/Integrations'

interface InterfacesFormProps {
	onClose: () => void
	onUpdateBtn: (value: string, active: boolean, activeBtn: boolean) => void
}

export function ActiveCampaignForm({
	onClose,
	onUpdateBtn
}: InterfacesFormProps) {
	const { register, handleSubmit } = useForm<ActiveCampaign>()

	async function onSubmit(fields: any) {
		delete fields.produto

		await createActiveCampaign(fields)
		toast.success('Integração cadastrada com sucesso!')
		try {
			const response = await getActiveCampaignList()
			if (response) {
				onUpdateBtn('active-campaign-key', true, true)
			} else {
				onUpdateBtn('active-campaign-key', false, true)
			}
			onClose()
		} catch (error) {
			onUpdateBtn('active-campaign-key', false, true)
			onClose()
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<TextField
					label="Plataforma"
					placeholder="ActiveCampaign"
					className="disabled-input-product"
					type="text"
					required
					register={register}
					$fullwidth
					name="produto"
					disabled={true}
					defaultValue={''}
					iconPosition="right"
				/>
				<TextField
					placeholder="Digite"
					label="Chave"
					name="key"
					register={register}
					$fullwidth
				/>
				<TextField
					placeholder="Digite"
					label="Url"
					name="baseUsername"
					register={register}
					$fullwidth
				/>

				<S.ConfirmationWrapper>
					<Close asChild>
						<Button shape="ghost" $fullwidth className="cancel-button">
							Cancelar
						</Button>
					</Close>
					<Button $fullwidth type="submit">
						Salvar
					</Button>
				</S.ConfirmationWrapper>
			</form>
		</>
	)
}
