/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { createHotmart, getHotmartSubscriptions } from '../../services/setting'
import * as S from '../Settings/styles'
import { Hotmart } from './models/Integrations'

interface InterfacesFormProps {
	onClose: () => void
	onUpdateBtn: (value: string, active: boolean, activeBtn: boolean) => void
}

export function HotmartForm({ onClose, onUpdateBtn }: InterfacesFormProps) {
	const { register, handleSubmit } = useForm<Hotmart>()

	async function onSubmit(fields: any) {
		delete fields.produto

		await createHotmart(fields)
		toast.success('Integração cadastrada com sucesso!')
		try {
			const response = await getHotmartSubscriptions()
			if (response) {
				onUpdateBtn('hotmart-key', true, true)
			} else {
				toast.success(
					'Integração cadastrada com sucesso porém sem subscrições!'
				)
				onUpdateBtn('hotmart-key', false, true)
			}
			onClose()
		} catch (error) {
			onUpdateBtn('hotmart-key', false, true)
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
					placeholder="Hotmart"
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
					label="Client ID"
					name="client_id"
					register={register}
					$fullwidth
				/>
				<TextField
					placeholder="Digite"
					label="Client secret"
					name="client_secret"
					register={register}
					$fullwidth
				/>
				<TextField
					placeholder="Digite"
					label="Token"
					name="token"
					register={register}
					$fullwidth
				/>

				<TextField
					placeholder="Digite"
					label="Hottok"
					name="hottok"
					register={register}
					$fullwidth
				/>

				<S.ConfirmationWrapper>
					<Button
						shape="ghost"
						$fullwidth
						className="cancel-button"
						onClick={onClose}
					>
						Cancelar
					</Button>
					<Button $fullwidth type="submit">
						Salvar
					</Button>
				</S.ConfirmationWrapper>
			</form>
		</>
	)
}
