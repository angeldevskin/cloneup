import { Cog, Loader2, LogOut, MoreVertical } from 'lucide-react'
import io from 'socket.io-client'
import { MainTemplate } from '../../templates/MainTemplate'
import { ChatInfo } from './ChatInfo'
// import { LoginSocialFacebook } from 'reactjs-social-login'
// import { FacebookLoginButton } from 'react-social-login-buttons'
import { ChatConversation } from './ChatConversation'

import * as S from './styles'

import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
// import { FaFacebookF } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'
import { NoContentCard } from '../../components/NoContentCard'
import { errorToast } from '../../components/Toast/types'
import { Tooltip } from '../../components/Tooltip'
import { axiosRoot } from '../../http/axios'
import {
	deleteChat,
	getChatMessages,
	getChats
} from '../../services/chat.service'
import { getAllAssistantList } from '../../services/intelligenceAssistant.service'
import {
	ChatMessageProps,
	CurrentChatProps,
	Lead,
	useChatStore
} from '../../services/store/chat-store'
import { LeadDetails } from './LeadDetails'

import fallbackChats from '../../assets/fallback-chats.svg'

interface ChatProps {
	phoneCustomer: string
	lastMessage: { message: string; status: string } | null
	leadId: string
	_id: string
	leadDetails: Lead
}

const socket = io(`${import.meta.env.VITE_UPFUNNELS_API}`)

export function Chat() {
	const { chatId } = useParams()
	const {
		chats,
		setChats,
		currentChat,
		setCurrentChat,
		setCurrentChatMessages,
		setCurrentLead
	} = useChatStore((state) => state)

	socket.connect()

	socket.on(
		'update.chat',
		(result: { chatId: string; lastMessage: string }) => {
			if (!result.chatId) return

			const updatedChat = chats.find((chat) => chat.chatId === result.chatId)

			if (!updatedChat) return

			const newChat = {
				...updatedChat,
				message: result.lastMessage
			}

			setChats([
				newChat,
				...chats.filter((chat) => chat.chatId !== result.chatId)
			])
		}
	)

	const [currentLeadOutsideStore, setCurrentLeadOutsideStore] = useState({})
	const [leadToDetail, setLeadToDetail] = useState<Lead>()

	const [currentAssistantsManagers, setCurrentAssistantsManagers] = useState([])

	const [instance, setInstance] = useState<
		| {
				instanceId?: string
				connected: boolean
				qrCode?: string
				phone?: string
		  }
		| undefined
	>(undefined)
	const [fallbackInstance, setFallbackInstance] = useState(false)

	const handleDeleteChat = async (chatId: string) => {
		await deleteChat(chatId)
			.then((res) => {
				if (res.status == 204) {
					toast.success('Conversa apagada com sucesso!')
					const filteredChats = chats.filter((c) => c.chatId != chatId)
					setChats(filteredChats)
					return
				}
				console.log(res)
			})
			.catch((err) => {
				toast.error(`Erro ao excluir conversa: ${err?.message}`)
				return
			})
	}

	async function fetchChats() {
		const result = await getChats().then((result) => result.data)

		setChats(
			result.map((chat: ChatProps) => ({
				status: chat.lastMessage?.status ?? '',
				from: chat.phoneCustomer,
				leadId: chat.leadId,
				leadDetails: chat.leadDetails,
				message: chat.lastMessage?.message ?? '',
				chatId: chat._id
			}))
		)

		if (chatId) {
			const chat: ChatProps = result.find(
				(chat: ChatProps) => chat._id === chatId
			)

			if (chat) {
				setCurrentChat({
					from: chat.phoneCustomer,
					chatId: chat._id,
					leadDetails: chat.leadDetails
				})

				await getChatMessages(chatId).then((result) => {
					setCurrentLead(result.data.lead)
					setCurrentLeadOutsideStore(chat.leadDetails)

					setCurrentChatMessages(
						result.data.messages.map(
							({
								senderName,
								sentBy,
								message,
								status,
								updatedAt
							}: ChatMessageProps) => ({
								senderName,
								sentBy,
								message,
								updatedAt,
								status
							})
						)
					)
				})
			}
		}
	}

	async function fetchAssistants() {
		setIsPending(true)
		const data = await getAllAssistantList().finally(() => setIsPending(false))
		setCurrentAssistantsManagers(data)
	}

	async function fetchInstance() {
		setCurrentChat({} as { from: string; chatId: string; leadDetails: Lead })

		const { data } = await axiosRoot().get('/integrations/whatsapp/instance')

		if (!data.base64 && !data.instanceId) {
			toast.error('Erro ao buscar informações do Whatsapp', errorToast)

			setFallbackInstance(true)

			return
		}

		if (data.base64) {
			if (instance?.qrCode) {
				toast.error('QR Code expirado, tente novamente', errorToast)
			}

			setInstance({
				connected: false,
				qrCode: data.base64
			})

			return
		}

		if (data.instanceId) {
			setInstance({
				phone: data.phone,
				instanceId: data.instanceId,
				connected: true
			})

			fetchChats()

			return
		}
	}

	async function logoutInstance() {
		if (!instance?.instanceId) return

		await axiosRoot()
			.delete(`/whatsapp/instance`)
			.then(async () => {
				setChats([])
				setCurrentChat({} as CurrentChatProps)
				setCurrentChatMessages([])
				setCurrentLead({} as Lead)

				await fetchInstance()
			})
	}

	useEffect(() => {
		if (!instance?.instanceId) {
			fetchInstance()
			fetchAssistants()
		}
	}, [])

	useEffect(() => {
		if (showDetails) {
			setShowDetails(false)
		}
	}, [currentChat])

	const [showDetails, setShowDetails] = useState(false)
	const [ispending, setIsPending] = useState(false)

	const numb = instance?.phone ? instance?.phone : ''

	function phoneMask(phone: string) {
		const phoneNumber = phone.replace(/\D/g, '')
		const areaCode = phoneNumber.slice(0, 1)

		if (areaCode === '1') {
			const number = phoneNumber.slice(1)
			return `
			+${areaCode} (${number.slice(0, 3)}) 
			${number.slice(3, 6)}-${number.slice(6, 10)}
			`
		} else {
			const areaCode = phoneNumber.slice(0, 2)
			const number = phoneNumber.slice(2)
			return `+${areaCode} (${number.slice(0, 2)}) 
			${number.slice(2, 7)}-${number.slice(6, 10)}`
		}
	}

	// const [provider, setProvider] = useState('')
	// const [profile, setProfile] = useState()

	// const onLoginStart = useCallback(() => {
	// 	// alert('login start')
	// }, [])

	// const onLogoutSuccess = useCallback(() => {
	// 	setProfile(null)
	// 	setProvider('')
	// 	alert('logout success')
	// }, [])

	return (
		<MainTemplate>
			<div
				style={{
					padding: '0 2rem 2rem 2rem',
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<h1>Chat</h1>
				<S.Wrapper>
					{!instance?.qrCode &&
						!instance?.connected &&
						ispending &&
						chats.length <= 0 && (
							<EmptyWrapper style={{ minHeight: '85dvh' }}>
								<Loader2 size={24} />
								<span style={{ fontSize: '1.5rem' }}>
									Carregando informações...
								</span>
							</EmptyWrapper>
						)}
					{instance?.qrCode &&
						!instance.instanceId &&
						!instance.connected &&
						!ispending && (
							<S.ConnectionWrapper>
								<section>
									<span>Conecte o seu Whatsapp para começar</span>
									<div className="steps">
										<span>1. Abra o Whatsapp no seu celular</span>
										<span>
											2. Toque em <strong>Mais opções</strong>{' '}
											<MoreVertical color="#818B90" /> no Android ou em{' '}
											<strong>Configurações</strong> <Cog color="#818B90" /> no
											iPhone
										</span>
										<span>
											3. Toque em <strong>Dispositivos conectados</strong> e, em
											seguida, em <strong>Conectar um dispositivo</strong>
										</span>
										<span>
											4. Aponte seu celular para esta tela para capturar o QR
											code
										</span>
									</div>
								</section>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem'
									}}
								>
									<div style={{ background: '#000000' }}>
										<img
											src={instance.qrCode}
											alt="QR Code"
											style={{ objectFit: 'cover' }}
										/>
									</div>
									<Button onClick={async () => await fetchInstance()}>
										Já me conectei
									</Button>
								</div>
							</S.ConnectionWrapper>
						)}

					{instance &&
						instance.instanceId &&
						instance.connected &&
						!ispending && (
							<>
								{chats.length >= 0 && (
									<>
										<S.ChatsWrapper>
											<div
												style={{
													height: '100%',
													padding: '1rem',
													gap: '0.5rem',
													display: 'flex',
													overflow: 'auto',
													flexDirection: 'column',
													borderRight: '1px solid #F2F2F3'
												}}
											>
												{/* <LoginSocialFacebook
													isOnlyGetToken
													appId="875821850646848"
													onLoginStart={onLoginStart}
													onResolve={({ provider, data }: any) => {
														setProvider(provider)
														setProfile(data)
													}}
													onReject={(err) => {
														console.log(err)
													}}
												>
													<FacebookLoginButton />
												</LoginSocialFacebook> */}

												{chats.map((chat) => (
													<ChatInfo
														key={chat.chatId}
														from={chat.from}
														status="read"
														chatId={chat.chatId}
														leadId={chat.leadId}
														leadDetails={chat.leadDetails}
														message={chat.message}
														setLeadToDetail={(lead) => {
															if (!lead._id) return
															setLeadToDetail(lead)
															setShowDetails(true)
														}}
														updateCurrentLead={(lead) =>
															setCurrentLeadOutsideStore(lead)
														}
														onDelete={() => handleDeleteChat(chat.chatId)}
													/>
												))}
											</div>
											<S.InstanceWrapper>
												<div>
													<span>
														<FaWhatsapp />
														{phoneMask(numb)}
													</span>
													<Tooltip
														trigger={
															<LogOut
																strokeWidth={1}
																cursor="pointer"
																color="#F05151"
															/>
														}
														content="Desconectar número"
														onClick={() => logoutInstance()}
													/>
												</div>
											</S.InstanceWrapper>
										</S.ChatsWrapper>

										<S.ConversationContainer>
											{showDetails && leadToDetail?._id && (
												<LeadDetails
													lead={leadToDetail}
													handleClose={() => setShowDetails(false)}
												/>
											)}
											{!currentChat.chatId &&
												!showDetails &&
												chats.length >= 0 && (
													<S.EmptyChat>
														<img src={fallbackChats} />
														<span>
															Você está Conectado. Inicie uma conversa para
															começar
														</span>
													</S.EmptyChat>
												)}
											{currentChat.chatId &&
												currentLeadOutsideStore &&
												!showDetails && (
													<ChatConversation
														currentLeadOutsideStore={currentLeadOutsideStore}
														managers={currentAssistantsManagers}
													/>
												)}
										</S.ConversationContainer>
									</>
								)}
							</>
						)}

					{fallbackInstance && !ispending && (
						<NoContentCard
							message="Não conseguimos encontrar suas informações, tente novamente mais
								tarde"
						/>
					)}
				</S.Wrapper>
			</div>
		</MainTemplate>
	)
}
