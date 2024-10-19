/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'

import { Button } from '../../../../components/Button'
import { TextField } from '../../../../components/TextField'
import { createLead } from '../../../../services/leads.service'
import { toast } from 'react-toastify'
import { errorToast, successToast } from '../../../../components/Toast/types'
import * as S from './styles'
import { NewLead } from '../../../../models/leads.model'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

export function NewLeadForm() {
	const { register, handleSubmit } = useForm<NewLead>()
	const [telephone] = useState<string>()

	async function onSubmit(fields: NewLead) {
		const newData: NewLead = {
			leadRef: uuidv4(),
			name: fields.name,
			surname: fields.surname,
			email: fields.email,
			telephone: fields.telephone.replace(' ', '')
		}

		const response = await createLead(newData)

		if (response.data.message === 'Lead created successfully') {
			toast.success('Projeto salvo com sucesso!', successToast)
			setTimeout(() => {
				window.location.reload()
			}, 2500)
		} else {
			toast.success('Projeto não salvo com sucesso!', errorToast)
		}
	}

	const validatePhoneInput = (event: any) => {
		let { value } = event.target

		value = value.replace(/\D/g, '')
		value = value.replace(/(\d{2})/, '($1) ')
		const isMobilePhone = /^[(][0-9][0-9][)][\s][9]/.test(value)

		if (!/[0-9]/.test(event.key)) {
			event.preventDefault()
		}

		if (isMobilePhone) {
			event.currentTarget.maxLength = 16
			value = value.replace(/\D/g, '')
			value = value.replace(/(\d{2})(\d{1})/, '($1) $2 ')
			value = value.replace(/(\d{4})/, '$1-')
			value = value.replace(/(\d{4})/, '$1')
		} else {
			event.currentTarget.maxLength = 14
			value = value.replace(/(\d{4})/, '$1-')
			value = value.replace(/(\d{4})/, '$1')
		}

		event.currentTarget.value = value
		register('telephone')
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'start',
				justifyContent: 'center',
				width: '100%',
				gap: '1rem'
			}}
		>
			<strong>Informações de contato</strong>
			<form onSubmit={handleSubmit(onSubmit)}>
				<S.Container>
					<S.FormWrapper id="newLead">
						<TextField
							label="Nome"
							name="name"
							type="text"
							required
							placeholder="Insira o nome"
							register={register}
							$fullwidth
						/>
						<TextField
							label="Sobrenome"
							name="surname"
							type="text"
							required
							placeholder="Insira o nome"
							register={register}
							$fullwidth
						/>
						<TextField
							label="Telefone"
							name="telephone"
							type="tel"
							required
							onKeyPress={(e) => validatePhoneInput(e)}
							value={telephone}
							placeholder="Ex: (31) 91234-5678"
							register={register}
							$fullwidth
						/>
						<TextField
							label="E-mail"
							name="email"
							type="email"
							required
							placeholder="Insira o e-mail"
							register={register}
							$fullwidth
						/>
					</S.FormWrapper>

					<footer>
						<Close asChild>
							<Button shape="text">Cancelar</Button>
						</Close>
						<Button type="submit">Adicionar lead</Button>
					</footer>
				</S.Container>
			</form>
		</div>
	)
}
