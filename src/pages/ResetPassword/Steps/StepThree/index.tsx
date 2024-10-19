import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '../../../../components/Button'
import { TextField } from '../../../../components/TextField'
import { toast } from 'react-toastify'
import * as S from './styles'

import { Eye, EyeOff } from 'lucide-react'
import { useResetPasswordSteps } from '../../../../contexts/auth/ResetPassword/steps'
import { sendCodeToResetPassword } from '../../../../services/auth.service'
import { PassswordFormType } from './models/password'
import { useNavigate } from 'react-router-dom'

export function StepThree() {
	const [showNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const navigate = useNavigate()

	const { currentUser } = useResetPasswordSteps()
	const { register, handleSubmit, watch } = useForm<PassswordFormType>()
	const passwordsMatch = watch('newPassword') === watch('confirmPassword')

	const onSubmit: SubmitHandler<PassswordFormType> = async (data) => {
		const { confirmPassword, newPassword } = data
		if (confirmPassword !== newPassword) {
			toast.error('A senha e a confirmação da senha devem ser iguais')
			return
		}

		try {
			const res = await sendCodeToResetPassword({
				...currentUser,
				newPassword: data.newPassword
			})
			if (res.data && res.status == 200) {
				toast.success('Senha alterada com sucesso!')
				setTimeout(() => navigate('/'), 1000)
			}
		} catch (err) {
			console.log(err)
			toast.error('Houve um erro ao realizar a requisição de atualização')
		}
	}

	return (
		<S.Wrapper>
			<header>
				<h1>Nova senha</h1>
			</header>

			<form onSubmit={handleSubmit(onSubmit)} id="password-form">
				<TextField
					type={showNewPassword ? 'text' : 'password'}
					label="Nova senha"
					name="newPassword"
					icon={
						showConfirmPassword ? (
							<Eye
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							/>
						) : (
							<EyeOff
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							/>
						)
					}
					register={register}
					iconPosition="right"
					placeholder="Digite sua senha"
					$fullwidth
				/>

				<TextField
					type={showConfirmPassword ? 'text' : 'password'}
					label="Confirme sua senha"
					register={register}
					name="confirmPassword"
					icon={
						showConfirmPassword ? (
							<Eye
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							/>
						) : (
							<EyeOff
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							/>
						)
					}
					iconPosition="right"
					placeholder="Confirme sua senha"
					$fullwidth
				/>

				{!passwordsMatch && (
					<p style={{ color: '#ff0000' }}>As senhas não coincidem.</p>
				)}
			</form>

			<footer>
				<Button form="password-form">Redefinir</Button>
			</footer>
		</S.Wrapper>
	)
}
