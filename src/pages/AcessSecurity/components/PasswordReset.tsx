/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { TextField } from '../../../components/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import '../style.css'
import { MeData } from '../../../models/me.model'
import { toast } from 'react-toastify'

export function PasswordReset({ email }: Partial<MeData>) {
	const { register, handleSubmit, watch } = useForm<any>()
	const [showPassword] = useState(false)
	const passwordsMatch = watch('newPassword') === watch('repeat')
	const onSubmit: SubmitHandler<any> = async (fields) => {
		const { repeat, newPassword } = fields

		if (repeat !== newPassword) {
			toast.error('A senha e a confirmação da senha devem ser iguais')
			return
		}
		delete fields.repeat
	}

	return (
		<div id="passwordReset" className="form-passwordReset">
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					type={showPassword ? 'text' : 'password'}
					label="Nova senha"
					required
					$fullwidth
					iconPosition="right"
					placeholder="Digite sua nova senha"
					register={register}
					name="newPassword"
				/>
				<input type="hidden" {...register('email')} value={email} />
				<TextField
					type={showPassword ? 'text' : 'password'}
					label="Repita sua senha"
					required
					$fullwidth
					iconPosition="right"
					placeholder="Repita sua senha"
					register={register}
					name="repeat"
				/>
				{!passwordsMatch && (
					<p style={{ color: '#ff0000' }}>As senhas não coincidem.</p>
				)}
			</form>
		</div>
	)
}
