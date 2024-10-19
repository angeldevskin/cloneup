import * as S from './styles'
import './style.css'
import { useState, useEffect } from 'react'
import { TextArea } from '../../components/TextArea'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { AlertCircleIcon, CheckCircle2 } from 'lucide-react'
import {
	getExternalScript,
	checkPage
} from '../../services/monitoramento.service'

export function MonitoramentoPage() {
	const { register } = useForm()
	const [validationStatus, setValidationStatus] = useState<
		null | 'success' | 'error'
	>(null)
	const [script, setScript] = useState('')
	const [alertMessage, setAlertMessage] = useState<string | null>(null)

	useEffect(() => {
		const fetchScript = async () => {
			try {
				const result = await getExternalScript()
				setScript(result.script)
			} catch (error) {
				console.error('Erro ao obter o script externo:', error)
			}
		}

		fetchScript()
	}, [])

	const handleCopy = () => {
		navigator.clipboard.writeText(script).then(() => {
			setAlertMessage('Código copiado para a área de transferência!')
			setValidationStatus('success')
		})
	}

	const handleValidation = async () => {
		const inputElement = document.querySelector<HTMLInputElement>(
			'input[name="pageVerify"]'
		)
		if (inputElement) {
			const inputValue = inputElement.value

			try {
				const { data, status } = await checkPage({ url: inputValue })
				console.log('API Result:', data)

				if (status === 200) {
					if (data.exists) {
						setValidationStatus('success')
						setAlertMessage('Página validada com sucesso!')
					} else {
						const message = data.message || 'Mensagem não disponível'

						if (message.includes('no corresponding debug entry')) {
							window.open(inputValue, '_blank')
							setValidationStatus('error')
							setAlertMessage(
								'A página irá abrir em uma nova aba para verificar se o código foi instalado corretamente. Após o carregamento, tente novamente.'
							)
						} else if (message.includes('does not exist in the Pages')) {
							setValidationStatus('error')
							setAlertMessage('A página não está cadastrada em nenhum funil.')
						} else {
							setValidationStatus('error')
							setAlertMessage(
								'A digitada URL não existe ou ocorreu um erro na validação.'
							)
						}
					}
				} else {
					setValidationStatus('error')
					setAlertMessage('Erro ao validar a página. Tente novamente.')
				}
			} catch (error) {
				console.error('Erro ao validar a página:', error)
				setValidationStatus('error')
				setAlertMessage('Erro ao validar a página. Tente novamente.')
			}
		}
	}

	return (
		<S.Section>
			<S.Monitoramento>
				<div className="header">
					<h1>Monitoramentos</h1>
				</div>
				<div className="content">
					<div className="left">
						<h2>Siga as instruções</h2>
						<p>Instale seu código no seu site seguindo as etapas ao lado.</p>
					</div>
					<div className="right">
						<div className="steps">
							<div className="step step1">
								<h3>Etapa 1: Copie o código base</h3>
								<p>
									Copie o código abaixo e insira no seu site na tag{' '}
									<strong>header</strong> ou em algum bloco personalizado do seu
									site.
								</p>
								<TextArea
									readOnly={true}
									placeholder="Escreva mais detalhes relevantes que definem seu público. Este campo é livre."
									name="other-details"
									required
									register={register}
									iconPosition="right"
									defaultValue={script}
									$fullwidth
								/>
								<Button onClick={handleCopy}>Copiar código</Button>
							</div>
							<div className="step step2">
								<h3>
									Etapa 2: Verifique se o código foi instalado corretamente
								</h3>
								<p>
									Após inserir o código no seu site, verifique se está tudo
									funcionando inserindo o endereço da sua página no assistente
									abaixo.
								</p>
								<TextField
									name="pageVerify"
									register={register}
									type="text"
									placeholder="seudominio.com/sua-url"
									$fullwidth
								/>
								{validationStatus === 'success' && (
									<S.AlertContainer type="success">
										<S.Container>
											<S.IconConfigSucess>
												<CheckCircle2 />
											</S.IconConfigSucess>
											<S.LabelInfo>{alertMessage}</S.LabelInfo>
										</S.Container>
									</S.AlertContainer>
								)}
								{validationStatus === 'error' && (
									<S.AlertContainer type="error">
										<S.Container>
											<S.IconConfig>
												<AlertCircleIcon />
											</S.IconConfig>
											<S.LabelInfo>{alertMessage}</S.LabelInfo>
										</S.Container>
									</S.AlertContainer>
								)}
								<Button onClick={handleValidation}>Verificar</Button>
							</div>
						</div>
					</div>
				</div>
			</S.Monitoramento>
		</S.Section>
	)
}
