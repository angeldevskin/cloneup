import * as S from './styles'
import { FormType } from '../../../../@types/pages/funnels'
import { useForm } from 'react-hook-form'
import { Select } from '../../../../components/Select'
import { useState } from 'react'
import { Button } from '../../../../components/Button'
import { useNavigate } from 'react-router-dom'

export function ModalNewIA({ closeDialog }: { closeDialog: () => void }) {
	const navigate = useNavigate()
	const { handleSubmit } = useForm<FormType>()
	const [model, setModel] = useState<string>('')
	const [iaModal, setIaModel] = useState<string>('gpt-4o-mini')

	async function onSubmit() {
		redirectToNew()
	}

	const redirectToNew = (id: string | null = null) => {
		if (id) {
			navigate(`/new-ia?template=${id}&model=${iaModal}`, {
				state: { action: 'edit' }
			})
			return
		}
		navigate(`/new-ia?model=${iaModal}`, { state: { action: 'add', model } })
	}

	const handleChangeRadio = (opt: string) => {
		setIaModel(opt)
	}

	const options = [
		{
			value: 'gpt-4o-mini',
			label: 'gpt-4o-mini',
			text: 'Modelo pequeno, acessível e inteligente para tarefas rápidas e leves'
		},
		{
			value: 'gpt-4o',
			label: 'gpt-4o',
			text: 'Modelo emblemático de alta inteligência para tarefas complexas e multietapas'
		}
	]

	return (
		<S.ContainerInfo>
			<S.InfoContainer>
				<S.InfoItem>
					<S.Title>
						Defina as suas opções iniciais e nós cuidaremos do resto. Você
						poderá personalizar o seu assistente a qualquer momento.
					</S.Title>
				</S.InfoItem>
				<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<>
						<div className="field field-12">
							<Select
								label="Modelo"
								placeholder="Selecione o modelo"
								currentValue={model}
								handleChange={(value) => setModel(value)}
								withIdValue={true}
								items={[
									{
										name: 'Personalizado (recomendado para usuários avançados)',
										value:
											'Personalizado (recomendado para usuários avançados)',
										id: 'custom'
									},
									{
										name: 'Assistente de vendas',
										value: 'Assistente de vendas',
										id: 'assistantTemplate2'
									},
									{
										name: 'Assistente negociador',
										value: 'Assistente negociador',
										id: 'assistantTemplate3'
									}
								]}
							/>
						</div>
						<div className="field field-12">
							<div className="version inner">
								<label>Versão</label>
								<div className="radios">
									{options.map((opt, i) => (
										<S.RadioWrapper
											className={`${opt.value === iaModal ? 'active' : ''}`}
											key={i}
										>
											<div className="radio">
												<input
													onChange={(e) => handleChangeRadio(e.target.value)}
													checked={opt.value === iaModal}
													id={`radio-${i + 1}`}
													value={opt.value}
													type="radio"
													name="model"
												/>
												<label htmlFor={`radio-${i + 1}`}>{opt.label}</label>
											</div>
											<div className="text">
												<p>{opt.text}</p>
											</div>
										</S.RadioWrapper>
									))}
								</div>
							</div>
						</div>
						<S.AssistantFooter>
							<Button
								shape="ghost"
								onClick={() => {
									closeDialog()
									redirectToNew(model)
								}}
							>
								Cancelar
							</Button>
							<Button
								onClick={() => {
									redirectToNew(model)
								}}
								type="submit"
							>
								Criar assistente
							</Button>
						</S.AssistantFooter>
					</>
				</S.FormWrapper>
			</S.InfoContainer>
		</S.ContainerInfo>
	)
}
