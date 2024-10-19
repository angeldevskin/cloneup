import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LogInType } from '../../@types/auth/logIn'

import * as S from './styles'

import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'

import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'
import { successToast } from '../../components/Toast/types'
import { logIn, mfaEnable } from '../../services/auth.service'
import { AuthTemplate } from '../../templates/AuthTemplate'
import { Form2Fa } from './components/Form2fa/Form2fa'

export function Login() {
	const [showPassword, setShowPassword] = useState(false)

	const { register, handleSubmit } = useForm<LogInType>()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>()
	const [step, setStep] = useState<number>(1)
	const INCORRECT_PASSWORD_MESSAGE = 'Incorrect password'
	const IDENTIFY_NOT_FOUND = 'Login identity not found'

	const onSubmit: SubmitHandler<LogInType> = async (fields) => {
		setIsLoading(true)
		await logIn(fields)
			.then(async (res) => {
				if (res?.data?.accessToken) {
					const { data } = await mfaEnable()
					if (data) {
						setStep(2)
						return
					} else {
						toast.success('Login efetuado com sucesso', successToast)
					}
				}

				setTimeout(() => {
					navigate('/')
				}, 300)
			})
			.catch((err) => {
				const { data, status } = err.response
				if (status == 400) {
					if (data.message == INCORRECT_PASSWORD_MESSAGE) {
						toast.error('Senha incorreta')
					}
					if (data.message == IDENTIFY_NOT_FOUND) {
						toast.error('Usuário não encontrado')
					}
				}
			})
		setIsLoading(false)
	}

	return (
		<AuthTemplate>
			<S.LoginWrapper step2={step == 2 ? true : undefined}>
				{step == 1 && (
					<>
						<header>
							<h1>Entrar</h1>
						</header>
						<form
							className={isLoading ? 'isLoading' : ''}
							onSubmit={handleSubmit(onSubmit)}
						>
							<TextField
								label="E-mail"
								placeholder="Digite o e-mail"
								type="email"
								required
								onInvalid={(e) => {
									const target = e.target as HTMLInputElement
									target.setCustomValidity('Preencha o campo com seu email')
								}}
								onInput={(e) =>
									(e.target as HTMLInputElement).setCustomValidity('')
								}
								register={register}
								name="email"
								$fullwidth
							/>

							<TextField
								type={showPassword ? 'text' : 'password'}
								label="Senha"
								required
								onInvalid={(e) => {
									const target = e.target as HTMLInputElement
									target.setCustomValidity('Preencha o campo com sua senha')
								}}
								onInput={(e) =>
									(e.target as HTMLInputElement).setCustomValidity('')
								}
								$fullwidth
								icon={
									showPassword ? (
										<Eye onClick={() => setShowPassword(!showPassword)} />
									) : (
										<EyeOff onClick={() => setShowPassword(!showPassword)} />
									)
								}
								iconPosition="right"
								placeholder="Digite sua senha"
								register={register}
								name="password"
							/>
							<footer>
								<a href="/reset-password">Esqueci a senha</a>
								<Button type="submit">Entrar</Button>
							</footer>
						</form>
					</>
				)}
				{step == 2 && <Form2Fa />}
			</S.LoginWrapper>
		</AuthTemplate>
	)
}
