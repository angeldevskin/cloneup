/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import { ChangeEvent, useEffect } from 'react'
import './styles.css'

import { VerificationCodeFormType } from '../../../../@types/auth/resetPassword'

import { Button } from '../../../../components/Button'

import { useResetPasswordSteps } from '../../../../contexts/auth/ResetPassword/steps'

import * as S from './styles'
import { sendEmailToResetPassword } from '../../../../services/auth.service'
import { changeStepsCode } from '../../../../common/steps-verify'
import { toast } from 'react-toastify'

export function StepTwo() {
	const { register, handleSubmit } = useForm<VerificationCodeFormType>()
	const { handleSteps, currentUser, updateCurrentUserInfos } =
		useResetPasswordSteps()
	const order = ['one', 'two', 'three', 'four']
	const onSubmit = (data: VerificationCodeFormType) => {
		const joinCode = `${data['number-one']}${data['number-two']}${data['number-three']}${data['number-four']}`

		if (
			!data['number-one'] ||
			!data['number-two'] ||
			!data['number-three'] ||
			!data['number-four']
		) {
			toast.error('Digite todos os números')
			return
		}

		updateCurrentUserInfos({
			...currentUser,
			code: joinCode
		})

		handleSteps('three')
	}

	const handleResendEmail = async () => {
		const storedEmail = localStorage.getItem('resetPasswordEmail')
		if (storedEmail !== null) {
			try {
				await sendEmailToResetPassword({ email: storedEmail })
			} catch (error: any) {
				toast.error('Erro ao reenviar o email: ' + error.response.data)
			}
		}
	}

	function mascaraEmail(data: string) {
		const limit = data.split('@')
		const firstLetter = limit[0].charAt(0)
		const hiddenCharacter = '*'.repeat(limit[0].length - 1)
		return firstLetter + hiddenCharacter + '@' + limit[1]
	}

	useEffect(() => {
		const storedEmail = localStorage.getItem('resetPasswordEmail')
		if (storedEmail) {
			updateCurrentUserInfos({
				...currentUser,
				email: storedEmail
			})
		}
	}, [])

	function handleChange(
		step: 'one' | 'two' | 'three' | 'four',
		e: ChangeEvent<HTMLInputElement>
	): void {
		changeStepsCode(step, e, order)
		register(`number-${step}`, { value: e.target.value })
	}

	return (
		<S.Wrapper>
			<header>
				<h1>Código</h1>
				<p>
					Insira o código de segurança de 4 dígitos que enviamos para o endereço
					de email {mascaraEmail(currentUser.email)}.
				</p>
			</header>
			<form onSubmit={handleSubmit(onSubmit)} id="code-form">
				<input
					onChange={(e) => handleChange('one', e)}
					type="text"
					name="number-one"
					maxLength={1}
				/>

				<input
					type="text"
					onChange={(e) => handleChange('two', e)}
					name="number-two"
					maxLength={1}
				/>

				<input
					type="text"
					onChange={(e) => handleChange('three', e)}
					name="number-three"
					maxLength={1}
				/>

				<input
					onChange={(e) => handleChange('four', e)}
					type="text"
					name="number-four"
					maxLength={1}
				/>
			</form>

			<footer>
				<span className="receive-code">
					Nao recebeu o código?{' '}
					<a href="#" onClick={handleResendEmail}>
						Receber um novo
					</a>
				</span>
			</footer>
			<Button $fullwidth form="code-form">
				Validar
			</Button>
		</S.Wrapper>
	)
}
