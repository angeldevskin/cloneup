import { useForm } from 'react-hook-form'
import { FormType } from '../../../../@types/pages/funnels'
import * as S from '../../../../components/Funnels/FormWrapper/styles'
import * as C from './styles'
import { TextField } from '../../../../components/TextField'
import { Button } from '../../../../components/Button'
import { Close } from '@radix-ui/react-dialog'

export function NewPublic() {
	const { register, handleSubmit } = useForm<FormType>()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async function onSubmit(fields: any) {
		console.log('fields', fields)
	}

	return (
		<div className="form">
			<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
				<TextField
					placeholder={'Dê um nome ao seu público'}
					label="Nome"
					name="name"
					required
					onInvalid={(e) => {
						const target = e.target as HTMLInputElement
						target.setCustomValidity('Preencha o campo nome da sua marca')
					}}
					onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
					register={register}
					minLength={4}
					maxLength={500}
					$fullwidth
				/>
				<C.BrandText>
					Todos os membros da sua equipe verão este nome e poderão utilizar este
					público. Somente administradores podem fazer alterações nele.
				</C.BrandText>
				<C.BrandFooter>
					<Close asChild>
						<Button shape="ghost">Cancelar</Button>
					</Close>
					<Button type="submit">Criar</Button>
				</C.BrandFooter>
			</S.FormWrapper>
		</div>
	)
}
