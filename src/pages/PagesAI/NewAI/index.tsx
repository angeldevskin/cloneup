/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
import { MainTemplate } from '../../../templates/MainTemplate'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { useForm } from 'react-hook-form'
import { Select } from '../../../components/Select'
import { useEffect, useRef, useState } from 'react'
import { TextArea } from '../../../components/TextArea'
import {
	Bot,
	SendHorizontal,
	ArrowLeft,
	Trash,
	Info,
	Plus,
	FileSpreadsheet
} from 'lucide-react'
import {
	createAssistant,
	deleteFile,
	getAllAssistant,
	getAssistantById,
	runAssistant,
	sendFile,
	sendFileMultiple,
	updateAssistant
} from '../../../services/intelligenceAssistant.service'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AssistantResponse } from '../../../models/assitantResponse'
import * as S from './styles'
import './style.css'
import * as C from '../../../components/Funnels/FormWrapper/styles'
import { FileUpload } from '../../../components/FileUpload'
import { SliderCommon } from '../../../components/Slider'
import { toast } from 'react-toastify'
import baloonMe from '../../../assets/images/baloon_me.svg'
import baloonChat from '../../../assets/images/baloon_chat.svg'
import Markdown from 'react-markdown'
import remarkGfm from 'https://esm.sh/remark-gfm@4'
import { SwitchInput } from '../../../components/Switch'
// import { SwitchInput } from '../../../components/Switch'

export function NewAIPage() {
	const navigate = useNavigate()
	const [assistante, setAssistante] = useState<AssistantResponse>([])
	const { register, handleSubmit, reset } = useForm<any>({
		defaultValues: assistante
	})
	const [listselectedList, setSelectedList] = useState<string>('')

	const [durationType, setDurationType] = useState<string>('')
	const { iaId } = useParams()
	const [uploadedFiles, setUploadedFiles] = useState<File[] | string | any>([])
	const [temperature, setTemperature] = useState<number>()
	const [hasFileSearch, setHasFileSearch] = useState<boolean>(false)
	const [messages, setMessages] = useState<
		{ user: string; text: string | undefined }[]
	>([])
	const [messageToSend, setMessageToSend] = useState<string>()
	const [showUpload, setShowUpload] = useState<boolean>(false)
	const [isUpdate, setIsUpdate] = useState<boolean>(false)
	const [thread, setThread] = useState<string>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const messagesRef = useRef<HTMLDivElement>(null)
	const [blockMsg, setBlockMsg] = useState<boolean>(true)
	const [insertedFiles, setInsertedFiles] = useState<string[]>([])
	const [toRemoveFiles, setToRemoveFiles] = useState<string[]>([])
	const temperatureRef = useRef<HTMLDivElement>(null)
	const [searchParams] = useSearchParams()
	const fileRef = useRef<HTMLInputElement>(null)

	const assistantTemplateSales = {
		id: 'assistantTemplate2',
		object: 'assistant',
		name: 'Assistente de vendas',
		description:
			'Aja como uma pessoa especializada em vendas, capaz de ajudar com estratégias de vendas, técnicas de negociação, gestão de clientes e análise de mercado. Posso oferecer insights sobre como melhorar suas taxas de conversão, desenvolver campanhas eficazes de marketing e entender as necessidades dos clientes para aumentar as vendas. Estou aqui para responder suas perguntas e oferecer orientação para otimizar seus processos de vendas e alcançar seus objetivos comerciais.',
		instructions:
			'Aja como uma pessoa especializada em vendas, capaz de ajudar com estratégias de vendas, técnicas de negociação, gestão de clientes e análise de mercado. Posso oferecer insights sobre como melhorar suas taxas de conversão, desenvolver campanhas eficazes de marketing e entender as necessidades dos clientes para aumentar as vendas. Estou aqui para responder suas perguntas e oferecer orientação para otimizar seus processos de vendas e alcançar seus objetivos comerciais.',
		model: 'gpt-4o-mini',
		tools: [
			{
				type: 'file_search'
			}
		],
		top_p: 1,
		temperature: 0.0,
		tool_resources: {
			file_search: {
				vector_store_ids: []
			}
		},
		startMsg: 'Olá, sou especialista em vendas, no que posso ser útil hoje?',
		goodByMsg: 'Espero ter ajudado com suas vendas, até a próxima!',
		idleTimeout: '600000',
		files: [],
		idleTimeoutUnit: 'min'
	}

	const assistantTemplateNegotiator = {
		id: 'assistantTemplate3',
		object: 'assistant',
		name: 'Assistente negociador',
		description:
			'Aja como uma pessoa especializada em negociação, pronta para ajudar em todas as etapas do processo de negociação. Posso oferecer estratégias para maximizar seus resultados, técnicas para lidar com diferentes tipos de negociadores, análise de interesses e alternativas, além de dicas para construir relacionamentos duradouros durante o processo de negociação.',
		model: 'gpt-4o-mini',
		instructions:
			'Aja como uma pessoa especializada em negociação, pronta para ajudar em todas as etapas do processo de negociação. Posso oferecer estratégias para maximizar seus resultados, técnicas para lidar com diferentes tipos de negociadores, análise de interesses e alternativas, além de dicas para construir relacionamentos duradouros durante o processo de negociação.',
		tools: [
			{
				type: 'file_search'
			}
		],
		top_p: 1,
		temperature: 0.0,
		tool_resources: {
			file_search: {
				vector_store_ids: []
			}
		},
		startMsg:
			'Olá, sou especialista em negociações, no que posso ser útil hoje?',
		goodByMsg: 'Espero ter ajudado!',
		idleTimeout: '600000',
		files: [],
		idleTimeoutUnit: 'min'
	}

	useEffect(() => {
		const template = searchParams.get('template')
		const modelUrl = searchParams.get('model')
		if (template) {
			setBlockMsg(true)
			const fillFormWithTemplate = (template) => {
				reset({
					name: template.name,
					instructions: template.instructions,
					startMsg: template.startMsg,
					goodByMsg: template.goodByMsg,
					idleTimeout: handleDuration(
						template.idleTimeout,
						template.idleTimeoutUnit,
						'real'
					),
					model: template.model,
					durationType: template.idleTimeoutUnit,
					files: template.files
				})

				setSelectedList(template.model)

				setInsertedFiles(template.files || [])
				setDurationType('min')
			}

			if (template === 'assistantTemplate2') {
				fillFormWithTemplate(assistantTemplateSales)
			} else if (template === 'assistantTemplate3') {
				fillFormWithTemplate(assistantTemplateNegotiator)
			}
		}
		if (modelUrl) {
			setSelectedList(modelUrl)
		}
	}, [searchParams])

	const handleTemperatureChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setTemperature(value[0])
		} else {
			setTemperature(value)
		}
	}

	useEffect(() => {
		if (messagesRef.current) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight
		}
	}, [messages])

	useEffect(() => {
		if (temperature) {
			forceTemperature()
		}
	}, [temperature])

	const forceTemperature = () => {
		const el = temperatureRef.current
		const range = el?.querySelector('.SliderRoot > span:last-of-type')
		const line = temperature * 10
		if (range) {
			range.style.left = `calc(${line}% + ${
				temperature == 0 ? 9 : 9 - 1.8 * temperature
			}px)`
			const sliderRange = el?.querySelector('.SliderRange')
			sliderRange.style.right = `${(10 - temperature) * 10}%`
		}
	}

	useEffect(() => {
		const findAssistance = async (id: string) => {
			try {
				const data = await getAssistantById(id)
				if (data.content && data.content.idleTimeout) {
					data.content.idleTimeout = handleDuration(
						data.content.idleTimeout,
						data.content.idleTimeoutUnit,
						'real'
					)
				}

				setAssistante(data.content)
				reset(data.content)
				setTemperature(data.content.temperature * 10)
				setSelectedList(data.content.model)
				setDurationType(data.content.idleTimeoutUnit)
				setHasFileSearch(
					(data.content.tools && data.content.tools.length > 0) ?? false
				)
				setBlockMsg(false)
				if (data.content.files) {
					data.content.files.forEach((file: string) => {
						setInsertedFiles((prev) => {
							if (!prev.includes(file)) {
								return [...prev, file]
							}
							return prev
						})
					})
				}
			} catch (error) {
				console.error('Failed to fetch assistants:', error)
			}
		}
		if (iaId) {
			findAssistance(iaId)
			setIsUpdate(true)
		} else {
			setTemperature(5)
		}
	}, [])

	const sendFileUpload = async (file: any) => {
		if (file.length == 1) {
			const res = await sendFile(file[0])
				.then((res) => {
					const { data } = res
					return data
				})
				.catch((err) => {
					throw err
				})

			return res
		} else {
			const res = sendFileMultiple(file)
				.then((res) => {
					const { data } = res
					return data
				})
				.catch((err) => {
					throw err
				})
			return res
		}
	}

	const handleDuration = (
		duration: number,
		type: string,
		direction: string = 'ms'
	) => {
		if (!duration) return ''
		if (direction == 'ms') {
			switch (type) {
				case 's':
					return duration * 1000
				case 'min':
					return duration * 60000
				case 'h':
					return duration * 3600000
				default:
					return 0
			}
		} else if (direction == 'real') {
			switch (type) {
				case 's':
					return duration / 1000
				case 'min':
					return duration / 60000
				case 'h':
					return duration / 3600000
				default:
					return 0
			}
		}
	}

	const validateField = (fieldValue, fieldName) => {
		if (!fieldValue || !fieldValue.trim()) {
			toast.warning(
				`O campo ${fieldName} não pode ser vazio ou conter apenas espaços em branco!`
			)
			return false
		}
		return true
	}

	async function onSubmit(fields: any) {
		delete fields.msg
		if (
			!validateField(fields.name, 'nome') ||
			!validateField(fields.instructions, 'contexto') ||
			!validateField(fields.startMsg, 'Mensagem inicial') ||
			!validateField(listselectedList, 'Versão do GPT')
		) {
			return
		}

		let isDuplicate = false
		if (!iaId) {
			await getAllAssistant()
				.then((res) => {
					res.find((item) => {
						if (item.name === fields.name && !isDuplicate) {
							isDuplicate = true
							toast.warning(`Nome do assistente já em uso!`)
							return
						}
					})
				})
				.catch(() => {
					setBlockMsg(false)
				})
		} else {
			if (assistante.name !== fields.name) {
				await getAllAssistant()
					.then((res) => {
						res.find((item) => {
							if (item.name === fields.name && !isDuplicate) {
								isDuplicate = true
								toast.warning(`Nome do assistente já em uso!`)
								return
							}
						})
					})
					.catch(() => {
						setBlockMsg(false)
					})
			}
		}

		if (isDuplicate) {
			return
		}

		let fileNames: { fileName: string } | { fileName: string }[] | null = []
		const idleTimeoutInMs = handleDuration(
			parseFloat(fields.idleTimeout),
			durationType
		)

		setBlockMsg(true)
		if (uploadedFiles.length) {
			await sendFileUpload(uploadedFiles)
				.then((res) => {
					if (res) {
						if (res.length && res.length > 1) {
							fileNames = res.map((f: any) => f.fileName)
						} else {
							fileNames = [res.fileName]
						}
					}
				})
				.catch(() => {
					setBlockMsg(false)
				})
		}

		if (toRemoveFiles.length) {
			for (const f of toRemoveFiles) {
				await deleteFile(f)
					.then(() => {})
					.catch((err) => {
						console.error(err)
						toast.error(
							'Erro ao deletar a imagem: ' + f + '. Continuando o fluxo'
						)
					})
			}
		}

		const temperaturaMapped = temperature ? temperature / 10 : 0

		const fieldsToSend = {
			name: fields.name,
			instructions: fields.instructions,
			startMsg: fields.startMsg,
			goodByMsg: fields.goodByMsg,
			temperature: temperaturaMapped,
			idleTimeout: idleTimeoutInMs,
			model: listselectedList,
			hasCodeInterpreter: false,
			files: [...fileNames, ...insertedFiles],
			description: null,
			idleTimeoutUnit: durationType,
			hasFileSearch: hasFileSearch
		}
		if (isUpdate && iaId) {
			await updateAssistant(iaId, fieldsToSend)
				.then(() => {
					window.location.reload()
					toast.success('Assistente atualizado com sucesso!')
				})
				.catch(() => {
					toast.error('Erro ao atualizar assistente')
				})
		} else {
			await createAssistant(fieldsToSend)
				.then((res) => {
					setBlockMsg(false)
					toast.success('Assistente criado com sucesso!')
					window.location.href = `/new-ia/${res.result.id}`
				})
				.catch(() => {
					toast.error('Erro ao inserir novo assistente')
				})
		}
	}

	const handleFileUpload = (files: File[]) => {
		setUploadedFiles(files)
	}

	const handleSwitchChange = () => {
		setShowUpload(!showUpload)
		setHasFileSearch(!showUpload)
	}

	const checkSubtitle = (id: string | undefined) => {
		if (
			id === 'assistantTemplate2' ||
			id === 'assistantTemplate3' ||
			id === 'custom'
		) {
			return false
		} else {
			return true
		}
	}

	const handleSendMessage = async () => {
		setIsLoading(true)
		if (assistante?.id) {
			reset({ msg: '' })
			setMessages((prevMessages) => [
				...prevMessages,
				{ user: 'Me', text: messageToSend }
			])
			setMessageToSend('')
			await runAssistant(assistante?.id, messageToSend, thread)
				.then((res) => {
					const { data } = res
					if (!thread) {
						setThread(data.threadId)
					}
					setMessages((prevMessages) => [
						...prevMessages,
						{ user: assistante.name, text: data.response }
					])
				})
				.catch((err) => {
					console.log(err)
				})
				.finally(() => setIsLoading(false))
		}
	}

	const handleKeyDown = (event: {
		key: string
		preventDefault: () => void
	}) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			handleSendMessage()
		}
	}

	const handleRemoveFile = (file: string) => {
		const filteredFiles = insertedFiles.filter((f) => f != file)
		setInsertedFiles(filteredFiles)
		setToRemoveFiles((prev) => [...prev, file])
	}

	const handleAddFileBtn = (e) => {
		e.stopPropagation()
		e.preventDefault()
		const curr = fileRef.current
		if (curr) {
			curr.click()
		}
	}

	return (
		<MainTemplate>
			<S.NewAssistant>
				<div className="left">
					<div className="header">
						<h1>Assistentes de IA</h1>
					</div>
					<div className="content">
						<div className="dropdown">
							<div className="dropdown_header">
								<S.Button onClick={() => navigate('/assistant')}>
									<ArrowLeft />
									Voltar
								</S.Button>
								<h3>
									<Bot strokeWidth={1} />
									{checkSubtitle(searchParams.get('template'))
										? 'Editar assistente'
										: 'Novo assistente'}
								</h3>
								{!checkSubtitle(searchParams.get('template')) ? (
									<S.BannerInfoTemplate>
										<S.BannerInfoTemplateContainer>
											<a>
												<Info width={21} height={21} strokeWidth={1} />
											</a>
											<S.LabelInfoTemplate>
												Substitua os campos genéricos para ajustar as instruções
												do assistente ao seu negócio.
											</S.LabelInfoTemplate>
										</S.BannerInfoTemplateContainer>
									</S.BannerInfoTemplate>
								) : (
									''
								)}
							</div>
							<div className="dropdown_content">
								<C.FormWrapper onSubmit={handleSubmit(onSubmit)}>
									<div className="row">
										<div className="field field-8">
											<TextField
												label="Nome do assistente"
												placeholder="Digite nome do assistente"
												type="text"
												required
												register={register}
												name="name"
												$fullwidth
											/>
										</div>
										<div className="field field-4">
											<Select
												label="Versão do GPT"
												placeholder="Selecione a engine"
												currentValue={listselectedList}
												handleChange={(value) => setSelectedList(value)}
												items={[
													{
														name: 'gpt-4o',
														value: 'gpt-4o',
														id: '1'
													},
													{
														name: 'gpt-4o-mini',
														value: 'gpt-4o-mini',
														id: '2'
													}
												]}
											/>
										</div>
									</div>
									<div className="row">
										<div className="field" style={{ width: '100%' }}>
											<S.UploadHeader>
												<label>
													<S.SwitchBox>
														<SwitchInput
															checked={hasFileSearch}
															onChange={handleSwitchChange}
														/>
														<label htmlFor="" style={{ marginLeft: '20px' }}>
															Usar arquivos
														</label>
													</S.SwitchBox>
												</label>
												<S.Button onClick={(e) => handleAddFileBtn(e)}>
													<Plus />
													Adicionar arquivo
												</S.Button>
											</S.UploadHeader>
										</div>
									</div>
									<div className="row">
										<div className="field field-12">
											<FileUpload
												onRef={fileRef}
												onSwitchChange={(filePermition) =>
													handleSwitchChange(filePermition)
												}
												onFileUpload={(file) => handleFileUpload(file)}
											/>
										</div>
									</div>
									<div className="row">
										<div className="field field-12">
											{insertedFiles && insertedFiles.length != 0 && (
												<>
													<label>Arquivos enviados anteriormente</label>
													{insertedFiles.map((f) => (
														<S.FilePreviewItem key={f}>
															<S.FileInfo>
																<S.IcoBox>
																	<FileSpreadsheet
																		width={24}
																		height={24}
																		strokeWidth={1}
																	/>
																</S.IcoBox>
																<S.FileName>{f}</S.FileName>
															</S.FileInfo>

															<S.ButtonDeleteFile
																onClick={(event) => {
																	event.stopPropagation()
																	handleRemoveFile(f)
																}}
															>
																<a>
																	<Trash width={20} height={20} />
																</a>
															</S.ButtonDeleteFile>
														</S.FilePreviewItem>
													))}
												</>
											)}
										</div>
									</div>
									<div className="field field-12 context">
										<TextArea
											type="text"
											label="Contexto"
											placeholder="Digite o contexto"
											required
											register={register}
											name="instructions"
											$fullwidth
										/>
									</div>
									<div className="field field-12 startMessage">
										<TextArea
											type="text"
											label="Mensagem inicial"
											required
											placeholder="Digite a mensagem inicial"
											register={register}
											name="startMsg"
											$fullwidth
										/>
									</div>
									<div className="row">
										<div ref={temperatureRef} className="field field-5">
											<S.CreativeLevel>
												<label>Criatividade: </label>
											</S.CreativeLevel>
											<div className="slider-grid">
												<SliderCommon
													defaultValue={temperature}
													handleChange={handleTemperatureChange}
													inicialInfo="Frio"
													finalInfo="Criativo"
													step={1}
													max={10}
												/>
												{temperature != null && (
													<label className="labelTemp">{temperature}</label>
												)}
											</div>
										</div>
									</div>

									<S.AssistantFooter>
										<Button shape="ghost">Cancelar</Button>
										<Button type="submit">Salvar</Button>
									</S.AssistantFooter>
								</C.FormWrapper>
							</div>
						</div>
					</div>
				</div>
				<div className="right">
					<div className="actions">
						<h3>Playground</h3>
					</div>
					<div id="content_msg" ref={messagesRef}>
						<div className="scroll">
							{messages.map((message, index) => (
								<div
									key={index}
									className={`baloon ${message.user.toLowerCase()}`}
								>
									<div className="title">
										<img
											src={message.user == 'Me' ? baloonMe : baloonChat}
											alt=""
										/>
										<span className="name">{message.user}</span>
									</div>
									<div className="text">
										<Markdown remarkPlugins={[remarkGfm]}>
											{message.text}
										</Markdown>
									</div>
								</div>
							))}
							{isLoading && (
								<S.IsTyping>
									<div className="typing__dot"></div>
									<div className="typing__dot"></div>
									<div className="typing__dot"></div>
								</S.IsTyping>
							)}
						</div>
					</div>
					<div className={`conversation ${blockMsg ? 'blocked' : ''}`}>
						<div className="sendMsg">
							<TextField
								placeholder="Pergunte algo ao agente especialista..."
								type="msg"
								register={register}
								name="msg"
								onKeyDown={handleKeyDown}
								onChange={(val) => setMessageToSend(val.target.value)}
								$fullwidth
							/>
							<div className="sendBtn">
								<Button onClick={handleSendMessage}>
									<SendHorizontal />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</S.NewAssistant>
		</MainTemplate>
	)
}
