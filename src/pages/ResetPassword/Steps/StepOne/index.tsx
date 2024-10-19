/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../../../components/Button'
import { TextField } from '../../../../components/TextField'

import { ResetPasswordContext } from '../../../../contexts/auth/ResetPassword/steps'
import { sendEmailToResetPassword } from '../../../../services/auth.service'

import * as S from './styles'
import { toast } from 'react-toastify'

export function StepOne() {
	const { register, handleSubmit } = useForm<{ email: string }>()

	const { handleSteps, updateCurrentUserInfos, currentUser } =
		useContext(ResetPasswordContext)

	const onSubmit = async (data: { email: string }) => {
		try {
			await sendEmailToResetPassword(data)
			localStorage.setItem('resetPasswordEmail', data.email)

			handleSteps('two')
			updateCurrentUserInfos({
				...currentUser,
				email: data.email
			})
		} catch (err: any) {
			console.log(err)
			toast.error(err?.response?.data)
		}
	}

	return (
		<S.Wrapper>
			<header>
				<h1>Esqueci minha senha</h1>
			</header>

			<form onSubmit={handleSubmit(onSubmit)} id="send-email">
				<TextField
					label="E-mail"
					placeholder="Digite o e-mail"
					type="email"
					name="email"
					required
					register={register}
					$fullwidth
				/>
			</form>

			<footer>
				<Button type="submit" form="send-email">
					Enviar
				</Button>
			</footer>
		</S.Wrapper>
	)
}
