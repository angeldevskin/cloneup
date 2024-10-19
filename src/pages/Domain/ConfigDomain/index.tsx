import {
	AlertTriangle,
	Check,
	ChevronLeft,
	Copy,
	MoveRight
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { Tooltip } from '../../../components/Tooltip'
import { DomainItemResponseById } from '../../../models/domain.model'
import { getDomainById } from '../../../services/domains.service'
import { MainTemplate } from '../../../templates/MainTemplate'
import * as S from '.././styles'
import { domainList } from '../utils'
import './style.css'
export function ConfigDomain() {
	const { configId } = useParams()
	const navigate = useNavigate()

	const [copied, setCopied] = useState(false)
	const [selectId, setId] = useState(-1)
	const [statusAlert, setStatusAlert] = useState(false)
	const [selectText, setText] = useState('')
	const items = domainList
	const copyToClipboard = (textToCopy: string, id: number) => {
		navigator.clipboard.writeText(textToCopy).then(() => setCopied(true))
		setTimeout(() => setCopied(false), 3000)
		setId(id)
		setText(textToCopy)
	}
	const refreshPage = () => {
		if (window.location) {
			window.location.reload()
		}
	}

	const fetchDomainsById = async () => {
		try {
			if (configId) {
				const domainsResponse: DomainItemResponseById =
					await getDomainById(configId)
				domainsResponse.dnsStatusA != 'PROPAGATED' &&
					domainsResponse.dnsStatusCNAME != 'PROPAGATED' &&
					setStatusAlert(true)
			} else {
				throw new Error()
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchDomainsById()
		window.scrollTo(0, 0)
	}, [])

	return (
		<MainTemplate>
			<S.Section>
				<div className="backWrapper">
					<Tooltip
						content="Voltar para a página anterior"
						trigger={
							<ChevronLeft
								strokeWidth={1}
								cursor="pointer"
								size={28}
								onClick={() => navigate('/settings?active=dominios')}
							/>
						}
					/>
					<h1>Configurações de domínios</h1>
				</div>
				<div style={{ display: 'flex', marginTop: '2rem' }}>
					<div className="instructions">
						<h1>Siga as instruções</h1>
						<h2>
							Configure seu domínio no seu provedor, seguindo as etapas ao lado.
						</h2>
					</div>
					<div className="steps">
						<S.DomainCard $shadow="true">
							<h1>Etapa 1: Acesse o painel do seu gerenciador de dominios</h1>
							<h2>
								Faça login na sua conta do gerenciador de domínios (Ex:
								Hostgator, Registro.br, Godaddy, etc) e acesse a seção Zona DNS,
								para isso siga o seguinte caminho:
							</h2>
							<h2>
								Painel do cliente &nbsp;
								<span
									style={{ transform: 'scale(0.5)', display: 'inline-flex' }}
									className="arrow"
								>
									<MoveRight />
								</span>
								&nbsp; Domínio &nbsp;
								<span
									style={{ transform: 'scale(0.5)', display: 'inline-flex' }}
									className="arrow"
								>
									<MoveRight />
								</span>
								&nbsp; Escolha o domínio que deseja alterar, clique no botão
								“Alterar DNS” &nbsp;
								<span
									style={{ transform: 'scale(0.5)', display: 'inline-flex' }}
									className="arrow"
								>
									<MoveRight />
								</span>
								&nbsp; Vá até Zona DNS
							</h2>
						</S.DomainCard>
						<S.DomainCard $shadow="true">
							<h1>Etapa 2: Cadastrando os apontamentos</h1>
							<h2>
								Na seção Zona DNS, clique em &quot;Adicionar registro&quot;.
								Preencha cada campo com as respectivas informações listadas
								abaixo:
							</h2>
							{items.length > 0 && (
								<div>
									{items.map((item, index) => (
										<S.Card key={index}>
											<div className="step">
												<label>Tipo:</label>
												<span>{item.type}</span>
											</div>
											<div className="step">
												<label>Nome:</label>
												<span>{item.name}</span>
												<Button
													shape="text"
													onClick={() => {
														copyToClipboard(item.name, index)
													}}
													style={{
														color:
															selectId === index &&
															selectText === item.name &&
															copied
																? 'green'
																: '#009EF7'
													}}
												>
													{selectId === index &&
													selectText === item.name &&
													copied ? (
														<>
															<Check style={{ height: '1rem' }} />
															{'Copiado'}
														</>
													) : (
														<>
															<Copy style={{ height: '1rem' }} />
															{'Copiar'}
														</>
													)}
												</Button>
											</div>
											<div className="step">
												<label>IPv4:</label>
												<span>{item.ipv4}</span>
												<Button
													shape="text"
													onClick={() => {
														copyToClipboard(item.ipv4, index)
													}}
													style={{
														color:
															selectId === index &&
															selectText === item.ipv4 &&
															copied
																? 'green'
																: '#009EF7'
													}}
												>
													{selectId === index &&
													selectText === item.ipv4 &&
													copied ? (
														<>
															<Check style={{ height: '1rem' }} />
															{'Copiado'}
														</>
													) : (
														<>
															<Copy style={{ height: '1rem' }} />
															{'Copiar'}
														</>
													)}
												</Button>
											</div>
											{statusAlert && (
												<div className="alert-config">
													<div className="icon-config">
														<AlertTriangle />
													</div>
													<span className="label-config">
														Registro DNS não configurado ou não propagado.
													</span>
												</div>
											)}
										</S.Card>
									))}
								</div>
							)}

							<h2>
								Após preencher os campos, clique em &quot;Adicionar
								registro&quot;. <strong>Atenção</strong>: remova todos os
								registros DNS que sejam do mesmo Tipo e Nome dos registros
								acima.
							</h2>
						</S.DomainCard>
						<S.DomainCard $shadow="true">
							<h1>Etapa 3: Aguarde a propagação</h1>
							<h2>
								Após realizar corretamente os apontamentos acima em seu provedor
								de hospedagem, você deve aguardar um tempo para que as
								informações sejam propagadas, Esse processo costuma levar até
								4h.
							</h2>
							<Button
								onClick={() => refreshPage()}
								style={{ marginTop: '1rem' }}
							>
								<IoMdRefresh style={{ fontSize: '20px' }} />
								Atualizar
							</Button>
						</S.DomainCard>
					</div>
				</div>
			</S.Section>
		</MainTemplate>
	)
}
