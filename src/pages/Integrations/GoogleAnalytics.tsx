import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import * as S from '../Settings/styles'
import { GoogleAnalytics } from './models/Integrations'

export function GoogleAnalyticsForm() {
	const { register, handleSubmit } = useForm<GoogleAnalytics>()

	function onSubmit() {}

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
					placeholder="Google Analytics"
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
