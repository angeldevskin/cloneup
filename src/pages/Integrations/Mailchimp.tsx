/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import {
	createMailchimp,
	getMailChimpListsIntegration
} from '../../services/setting'
import * as S from '../Settings/styles'
import { Mailchimp } from './models/Integrations'

interface InterfacesFormProps {
	onClose: () => void
	onUpdateBtn: (value: string, active: boolean, activeBtn: boolean) => void
}

export function MailchimpForm({ onClose, onUpdateBtn }: InterfacesFormProps) {
	const { register, handleSubmit } = useForm<Mailchimp>()

	async function onSubmit(fields: any) {
		delete fields.produto

		await createMailchimp(fields)
		toast.success('Integração cadastrada com sucesso!')
		try {
			const response = await getMailChimpListsIntegration()
			if (response.total_items != 0) {
				onUpdateBtn('mailchimp-key', true, true)
			} else {
				onUpdateBtn('mailchimp-key', false, true)
			}
			onClose()
		} catch (error) {
			onUpdateBtn('mailchimp-key', false, true)
			onClose()
		}
	}

	return (
		<>
			<form
				id="form-product"
				onSubmit={handleSubmit(onSubmit)}
				style={{
					display: 'flex',
					flexDirection: 'column',
					fontFamily: 'Nunito Sans, sans-serif'
				}}
			>
				<TextField
					label="Plataforma"
					placeholder="MailChimp"
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
					label="Chave API"
					name="mailChimpApiKey"
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
