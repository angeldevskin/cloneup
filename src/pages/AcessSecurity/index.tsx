import { Check, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { DialogRoot } from '../../components/Dialog'
import { TextField } from '../../components/TextField'
import { axiosRoot } from '../../http/axios'
import { MeData } from '../../models/me.model'
import { mfaEnable, updatePassword } from '../../services/auth.service'
import { AcessoSegurancaModal } from './Configuracao2FA'
import { AcessoFatorRedef } from './models/twoFactor.model'
import './style.css'
import * as S from './styles'

export function AcessoSeguranca() {
	const [showPassword] = useState(false)
	const { register, handleSubmit, setValue, watch, reset } =
		useForm<AcessoFatorRedef>()
	const passwordsMatch = watch('newPassword') === watch('repeat')
	const [me, setMe] = useState<Partial<MeData> | undefined>(undefined)
	const [showMfa, setShowMfa] = useState<boolean>(false)
	const [mfaEnabled, setMfaEnabled] = useState<boolean>(true)
	const [chooseSource, setChooseSource] = useState(false)
	const [redefinir, setRedefinir] = useState(false)

	const onSubmit: SubmitHandler<AcessoFatorRedef> = async (fields) => {
		const { repeat, newPassword } = fields

		if (repeat !== newPassword) {
			toast.error('A senha e a confirmação da senha devem ser iguais')
			return
		}

		try {
			const res = await updatePassword(fields.newPassword)
			if (res.data && res.status == 200) {
				toast.success('Senha alterada com sucesso!')
				reset({ newPassword: '', repeat: '' })
				setRedefinir(false)
			}
		} catch (err) {
			toast.error('Houve um erro ao realizar a requisição de atualização')
		}
	}

	useEffect(() => {
		getMe()
	}, [])

	useEffect(() => {
		populateInputs()
	}, [me])

	async function getMe(): Promise<void> {
		try {
			const response = await axiosRoot().get('/user/me/')
			setMe(response.data)
			const isMfaEnabled = await mfaEnable()
			if (!isMfaEnabled.data) {
				setMfaEnabled(isMfaEnabled.data)
				setShowMfa(true)
			}
		} catch (error) {
			const customError = false
			throw customError
		}
	}

	function populateInputs(): void {
		if (me?.email) {
			setValue('email', me?.email)
		}
		if (me?.secret?.base32) {
			setValue('senhaAtual', me?.secret?.base32.substring(0, 6))
		}
		if (me?.name) {
			setValue('nome', `${me?.name} ${me?.surname}`)
		}
	}

	useEffect(() => {
		if (redefinir) {
			const element = document.getElementById('passwordReset')
			if (element) {
				const y = element?.getBoundingClientRect().top + window.pageYOffset - 50

				window.scrollTo({ top: y, behavior: 'smooth' })
			}
		} else {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		}
	}, [redefinir])

	return (
		<div className="container">
			<S.AcessWrapper>
				<div className="container-two-factor">
					<span className="title-form">Acesso</span>

					<div className="form-container">
						<form id="formPerfil" onSubmit={handleSubmit(onSubmit)}>
							<TextField
								label="Nome"
								className="nome-input"
								placeholder="Digite seu nome"
								type="text"
								disabled={true}
								register={register}
								defaultValue={`${me?.owner || ''}`}
								name="nome"
								$fullwidth
							/>

							<TextField
								label="E-mail"
								placeholder="Digite o e-mail"
								className="disabled-input"
								type="email"
								required
								register={register}
								name="email"
								disabled={true}
								$fullwidth
							/>
							{!redefinir && (
								<TextField
									type={showPassword ? 'text' : 'password'}
									label="Senha"
									required
									className="disabled-input"
									$fullwidth
									defaultValue={'********'}
									disabled={true}
									iconPosition="right"
									placeholder="Senha"
									register={register}
									name="senhaAtual"
								/>
							)}

							{redefinir && (
								<>
									<TextField
										type={showPassword ? 'text' : 'password'}
										label="Alterar senha"
										required
										onInvalid={(e) => {
											const target = e.target as HTMLInputElement
											target.setCustomValidity(
												'Confirme o campo com sua nova senha'
											)
										}}
										onInput={(e) =>
											(e.target as HTMLInputElement).setCustomValidity('')
										}
										$fullwidth
										defaultValue={''}
										autoComplete="new-password"
										iconPosition="right"
										placeholder="Digite senha"
										register={register}
										name="newPassword"
									/>
									<TextField
										type={showPassword ? 'text' : 'password'}
										label="Confirmar"
										required
										onInvalid={(e) => {
											const target = e.target as HTMLInputElement
											target.setCustomValidity('Confirme o campo com sua senha')
										}}
										onInput={(e) =>
											(e.target as HTMLInputElement).setCustomValidity('')
										}
										$fullwidth
										iconPosition="right"
										placeholder="Digite senha"
										register={register}
										name="repeat"
									/>

									{!passwordsMatch && (
										<p style={{ color: '#ff0000' }}>As senhas não coincidem.</p>
									)}
								</>
							)}
						</form>

						{!redefinir ? (
							<a
								type="button"
								onClick={() => setRedefinir(!redefinir)}
								className="redefinir"
							>
								Redefinir senha
							</a>
						) : (
							<Button form="formPerfil" className="redefinir" type="submit">
								Salvar
							</Button>
						)}
					</div>
					<div className="container-info">
						<span className="title-form">Segurança</span>
						<div className="autenticacao-info">
							<h4>Autenticação em 2 etapas</h4>
							<p>
								Adicione uma camada extra de segurança à sua conta UpFunnels
								exigindo um código de acesso ao realizar uma sessão em um novo
								dispositivo.
							</p>
						</div>
						{showMfa && (
							<div className="como-funciona">
								<h4>Como funciona?</h4>
								<p>
									1. Baixe um aplicativo de autenticação no seu dispositivo,
									como
									<a
										className="underline"
										href="https://support.google.com/accounts/answer/1066447?hl=pt&co=GENIE.Platform%3DAndroid&oco=0"
										target="_blank"
										rel="noreferrer"
									>
										{' '}
										Google Authenticator
									</a>
									,{' '}
									<a
										className="underline"
										href="https://www.microsoft.com/pt-br/security/mobile-authenticator-app"
										target="_blank"
										rel="noreferrer"
									>
										{' '}
										Microsoft Authenticator
									</a>{' '}
									ou{' '}
									<a
										className="underline"
										href="https://authy.com/download/"
										target="_blank"
										rel="noreferrer"
									>
										{' '}
										Authy.
									</a>
								</p>
								<p>
									2. Prossiga as etapas de validação do app em conjunto com a
									Yampi e finalize o processo de configuração.
								</p>
								<div className="button-ativar">
									<Button
										onClick={() => {
											setChooseSource(true)
										}}
									>
										Ativar autenticação em 2 etapas
									</Button>
								</div>
							</div>
						)}

						{!mfaEnabled ? (
							<div className="info-autentica">
								<Info />{' '}
								<span className="label-info-autentica">
									Sua autenticação em 2 etapas está desativada
								</span>
							</div>
						) : (
							<div className="info-autentica sucesso">
								<Check />{' '}
								<span className="label-info-autentica">
									Sua autenticação em 2 etapas está ativada
								</span>
							</div>
						)}
					</div>
				</div>
			</S.AcessWrapper>
			<DialogRoot
				title=""
				isOpen={chooseSource}
				setIsOpen={() => setChooseSource(!chooseSource)}
				maxwidth={996}
			>
				<AcessoSegurancaModal></AcessoSegurancaModal>
			</DialogRoot>
		</div>
	)
}
