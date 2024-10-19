/* eslint-disable react/no-unescaped-entities */
import * as S from './styles'
import { Close } from '@radix-ui/react-dialog'
import { Button } from '../../../../components/Button'
import { TextField } from '../../../../components/TextField'
import { FormType } from '../../../../@types/pages/funnels'
import { useForm } from 'react-hook-form'
import openAI from '../../../../assets/images/openAI.svg'
import { updateKeyOpenAI } from '../../../../services/intelligenceAssistant.service'
import { toast } from 'react-toastify'

export function ModalConfigKeyIA({
	openModal
}: {
	openModal: (type: string) => void
}) {
	const { register, handleSubmit } = useForm<FormType>()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async function onSubmit(fields: any) {
		const { keyOpenIA } = fields

		await updateKeyOpenAI(keyOpenIA)
			.then(() => {
				toast.success('Chave cadastrada com sucesso!')
				openModal('closeConfig')
				return
			})
			.catch((err) => {
				toast.error('Erro ao cadastrara a chave')
				console.log(err)
			})
	}

	return (
		<S.ContainerInfo>
			<S.BanerContainer>
				<S.CenteredContent>
					<S.SVGImage src={openAI} />
					<S.OverlayText>OpenAI</S.OverlayText>
				</S.CenteredContent>
				<S.Description>
					Estamos entusiasmados com sua decisão de vincular a chave da OpenAI ao
					nosso aplicativo. Isso vai abrir portas para uma experiência incrível
					com nossos assistentes de inteligência artificial, feitos sob medida
					para enriquecer sua jornada.
				</S.Description>
			</S.BanerContainer>
			<S.InfoContainer>
				<S.InfoItem>
					<S.TitleStep>Passo 1: Criar uma conta na OpenAI</S.TitleStep>
					<span>
						1. Acesse o{' '}
						<S.Link href="https://openai.com/pt-BR/" target="_blank">
							site da OpenAI
						</S.Link>
						.
					</span>
					<span>2. Click em "Sign Up" para criar uma conta nova.</span>
					<span>3. Preencha com suas informações solicitadas.</span>
					<span>4. Verifique seu e-mail para ativar a conta</span>
				</S.InfoItem>
				<S.InfoItem>
					<S.TitleStep>Passo 2: Acessar o painel da API</S.TitleStep>
					<span>1. Faça login e navegue até o painel de controle da API.</span>
					<span>
						Acesse{' '}
						<S.Link href="https://platform.openai.com" target="_blank">
							plataform.openai.com
						</S.Link>
						.
					</span>
				</S.InfoItem>
				<S.InfoItem>
					<S.TitleStep>Passo 3: Criar uma conta na OpenAI</S.TitleStep>
					<span>1. No painel, acesse a seção "Billing".</span>
					<span>2. Click em "Add a payment method".</span>
					<span>
						3. Insira os detalhes do seu cartão ou outro método de pagamento.
					</span>
					<span>4. Confirme para adicionar o método de pagamento</span>
				</S.InfoItem>
				<S.InfoItem>
					<span>
						<strong>Observações importantes: </strong>O uso da API da OpenAI é
						tarifado. Guarde sua chave da API em local seguro e não compartilhe
						publicamente.
					</span>
				</S.InfoItem>
				<S.InfoItem>
					<S.AlertCard>
						<span>
							Ao alterar a chave da OpenAI, todos os seus assistentes criados na
							chave antiga serão excluidos.
						</span>
					</S.AlertCard>
				</S.InfoItem>
				<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
					<div>
						<S.InputKey>
							<TextField
								placeholder={'Insira a sua chave da OpenAI'}
								label="Insira a sua chave da OpenAI"
								name="keyOpenIA"
								required
								onInvalid={(e) => {
									const target = e.target as HTMLInputElement
									target.setCustomValidity('Preencha o campo nome da sua chave')
								}}
								onInput={(e) =>
									(e.target as HTMLInputElement).setCustomValidity('')
								}
								register={register}
								minLength={4}
								maxLength={500}
								$fullwidth
							/>
						</S.InputKey>
						<div className="integration_body">
							<S.BrandFooter>
								<Close asChild>
									<Button
										onClick={() => openModal('integration')}
										shape="ghost"
									>
										Cancelar
									</Button>
								</Close>
								<Button type="submit">Salvar chave</Button>
							</S.BrandFooter>
						</div>
					</div>
				</S.FormWrapper>
			</S.InfoContainer>
		</S.ContainerInfo>
	)
}
