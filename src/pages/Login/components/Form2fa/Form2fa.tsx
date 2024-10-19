/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from 'react-hook-form'
import { changeStepsCode } from '../../../../common/steps-verify'
import { VerificationMfaFormType } from '../../../../@types/auth/mfaVerificationCode'
import { ChangeEvent } from 'react'
import './style.css'
import { Button } from '../../../../components/Button'
import { verifyMFA } from '../../../../services/auth.service'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

export function Form2Fa() {
	const { handleSubmit, setValue } = useForm<VerificationMfaFormType>()
	const order = ['one', 'two', 'three', 'four', 'five', 'six']
	const navigate = useNavigate()
	function handleChange(
		step: 'one' | 'two' | 'three' | 'four' | 'five' | 'six',
		e: ChangeEvent<HTMLInputElement>
	): void {
		setValue(`number-${step}`, e.target.value)
		changeStepsCode(step, e, order)
	}

	const onSubmit: SubmitHandler<VerificationMfaFormType> = async (inputs) => {
		const joinCode = [
			inputs['number-one'],
			inputs['number-two'],
			inputs['number-three'],
			inputs['number-four'],
			inputs['number-five'],
			inputs['number-six']
		].join('')

		const data = await verifyMFA(joinCode)

		if (data.status == 200) {
			toast.success('Código validado com sucesso!')
			navigate('/')
		} else {
			if (data instanceof AxiosError) {
				if (data?.response?.status == 403) {
					toast.error('Código inválido')
				}
			}
		}
	}

	return (
		<div className="block-mfa">
			<h2 className="title-mfa">Código 2FA</h2>
			<p>
				Insira o código de segurança de 6 dígitos presente no seu app de
				autenticação.{' '}
			</p>
			<form onSubmit={handleSubmit(onSubmit)} id="verify-mfa-login-form">
				<div className="flex-block">
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
					<input
						onChange={(e) => handleChange('five', e)}
						type="text"
						name="number-five"
						maxLength={1}
					/>
					<input
						onChange={(e) => handleChange('six', e)}
						type="text"
						name="number-six"
						maxLength={1}
					/>
				</div>
				<Button form="verify-mfa-login-form" type="submit">
					Validar
				</Button>
			</form>
		</div>
	)
}
