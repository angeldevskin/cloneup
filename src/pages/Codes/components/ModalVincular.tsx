import { useForm } from 'react-hook-form'

import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select'

import * as S from '../../../components/Funnels/FormWrapper/styles'

import { FormType } from '../../../@types/pages/funnels'
import { SwitchInput } from '../../../components/Switch'
import { useState } from 'react'

export function ModalVincular() {
	const { handleSubmit } = useForm<FormType>()
	const [isChecked, setIsChecked] = useState<boolean>(false)

	async function onSubmit() {}

	return (
		<div id="modal-vincular">
			<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
				<Select
					items={[
						{
							id: 'kiwify',
							name: 'Kiwify',
							value: 'kiwify'
						},
						{
							id: 'hotmart',
							name: 'Hotmart',
							value: 'hotmart'
						},
						{
							id: 'manual',
							name: 'Manual',
							value: 'manual'
						}
					]}
					label="Escolha o funil"
					placeholder="Funil XYZ"
					currentValue=""
					handleChange={(value) => console.log(value)}
				/>

				<div className="footer">
					<SwitchInput
						checked={isChecked}
						onChange={() => setIsChecked(!isChecked)}
					/>
					<span className="info">
						Todas as páginas atuais e futuras deste funil
					</span>
				</div>

				<S.ConfirmationWrapper>
					<Button className="new" type="submit">
						Vincular
					</Button>
				</S.ConfirmationWrapper>
			</S.FormWrapper>
		</div>
	)
}
