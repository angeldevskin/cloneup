/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { createKiwify, getProductsKiwify } from '../../services/setting'
import * as S from '../Settings/styles'
import { Kiwify } from './models/Integrations'

interface InterfacesFormProps {
	onClose: () => void
	onUpdateBtn: (value: string, active: boolean, activeBtn: boolean) => void
}

export function KiwifyForm({ onClose, onUpdateBtn }: InterfacesFormProps) {
	const { register, handleSubmit } = useForm<Kiwify>()

	async function onSubmit(fields: any) {
		delete fields.produto

		if (Object.values(fields).some((value) => value === '')) {
			toast.error('Por favor, preencha todos os campos.')
			return
		}

		await createKiwify(fields)
		toast.success('Credenciais cadastradas com sucesso')
		try {
			const res = await getProductsKiwify()
			if (res.pagination.page_number > 0) {
				onUpdateBtn('kiwify-key', true, true)
			} else {
				onUpdateBtn('kiwify-key', false, true)
			}
			onClose()
		} catch (error) {
			onUpdateBtn('kiwify-key', false, true)
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
					placeholder="Kiwify"
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
					label="Account ID"
					name="account_id"
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
