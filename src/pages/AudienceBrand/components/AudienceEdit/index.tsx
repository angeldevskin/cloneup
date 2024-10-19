/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { MainTemplate } from '../../../../templates/MainTemplate'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import * as S from './styles'
import { TextField } from '../../../../components/TextField'
import { useForm } from 'react-hook-form'
import { TextArea } from '../../../../components/TextArea'
import { Ninche } from '../Ninche'
import { RadioOptions } from '../RadioOptions'
import { Age } from '../Age'
import { Education } from '../Education'

export function AudienceEdit() {
	const { audienceId } = useParams()
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm()

	const [audience, setAudience] = useState<any>()
	const audiences = [
		{
			id: '001',
			name: 'Imersão 30 dias para emagrecer'
		},
		{
			id: '002',
			name: 'Mente bilionária'
		},
		{
			id: '003',
			name: 'Público do lançamento X (pesquisa stories)'
		}
	]

	const genderOptions = [
		{ value: 'all', label: 'Todos' },
		{ value: 'man', label: 'Homem' },
		{ value: 'woman', label: 'Mulher' }
	]
	const informationSon = [
		{ value: 'yes', label: 'Sim' },
		{ value: 'no', label: 'Não' },
		{ value: 'indifferent', label: 'Indiferente' }
	]

	const [selectedGender, setSelectedGender] = useState('all')
	const [selectedInformationSon, setSelectedInformationSon] = useState('all')

	async function onSubmit(fields: any) {
		console.log('fields', fields)
	}

	useEffect(() => {
		async function findAudienceById(audienceId: string | undefined) {
			const audience = await audiences.find(
				(audience) => audience.id === audienceId
			)
			setAudience(audience)
		}
		findAudienceById(audienceId)
	}, [audienceId])

	const handleGenderChange = (value: string) => {
		setSelectedGender(value)
	}

	const handleInformationSonChange = (value: string) => {
		setSelectedInformationSon(value)
	}

	return (
		<MainTemplate>
			<S.Section>
				<S.Button onClick={() => navigate('/audience-brand')}>
					<ArrowLeft />
					Voltar para Público e marca
				</S.Button>
				<h1>Público - {audience?.name}</h1>
				<S.SectionTitle>
					<h1>Quem são</h1>
				</S.SectionTitle>
				<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<S.SectionBox>
						<S.FormTitle>
							<Age></Age>
						</S.FormTitle>
					</S.SectionBox>
					<S.SectionBox>
						<S.FormTitle>
							<S.ContainerOptions>
								<S.RadioWrapper>
									<S.Subtitle>
										<h2>Gênero</h2>
									</S.Subtitle>
									<RadioOptions
										isFlex={true}
										options={genderOptions}
										defaultValue={selectedGender}
										onChange={handleGenderChange}
									/>
								</S.RadioWrapper>
								<S.RadioWrapper>
									<S.Subtitle>
										<h2>Possuem filhos</h2>
									</S.Subtitle>
									<RadioOptions
										isFlex={true}
										options={informationSon}
										defaultValue={selectedInformationSon}
										onChange={handleInformationSonChange}
									/>
								</S.RadioWrapper>
							</S.ContainerOptions>
						</S.FormTitle>
					</S.SectionBox>
					<S.SectionBox>
						<S.FormItem>
							<Education></Education>
						</S.FormItem>
					</S.SectionBox>
					<S.SectionBox>
						<S.FormItem>
							<TextArea
								placeholder="Escreva mais detalhes relevantes que definem seu público. Este campo é livre."
								label="Outros detalhes"
								name="other-details"
								required
								register={register}
								iconPosition="right"
								$fullwidth
							/>
						</S.FormItem>
					</S.SectionBox>
					<S.SectionBox>
						<S.FormTitle>
							<h2>Produto</h2>
							<p>
								Ao fornecer detalhes sobre o seu produto, a UpAI criará um
								perfil de lead ideal para maximizar suas conversões.
							</p>
						</S.FormTitle>
						<S.FormProduct>
							<TextField
								placeholder={'Insira o nome do seu produto'}
								label="Nome"
								name="name"
								required
								onInvalid={(e) => {
									const target = e.target as HTMLInputElement
									target.setCustomValidity('Preencha o campo nome')
								}}
								onInput={(e) =>
									(e.target as HTMLInputElement).setCustomValidity('')
								}
								register={register}
								minLength={4}
								maxLength={500}
								$fullwidth
							/>
						</S.FormProduct>
					</S.SectionBox>

					<S.SectionBox>
						<S.FormItem>
							<TextArea
								placeholder="Escreva detalhes sobre seu produto"
								label="Descrição"
								name="description"
								required
								register={register}
								iconPosition="right"
								$fullwidth
							/>
						</S.FormItem>
					</S.SectionBox>

					<S.SectionBox>
						<Ninche />
					</S.SectionBox>

					<S.SectionBox>
						<S.FormItem>
							<TextArea
								placeholder="Descreva como o seu produto resolve o problema da persona e qual o diferencial em relação aos demais produtos no mercado. Dica: quanto mais detalhes fornecer, melhores os resultados fornecidos pela UpAI."
								label="Diferencial do produto"
								name="differential"
								required
								register={register}
								iconPosition="right"
								$fullwidth
							/>
						</S.FormItem>
					</S.SectionBox>
				</S.FormWrapper>
			</S.Section>
		</MainTemplate>
	)
}
