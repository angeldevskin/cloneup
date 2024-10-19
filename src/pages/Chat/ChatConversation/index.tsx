/* eslint-disable @typescript-eslint/no-explicit-any */
import { Send, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

import { NoContent } from '../../../components/NoContent'
import { SelectResponsable } from '../../../components/SelectResponsable'
import { axiosRoot } from '../../../http/axios'
import { AssistantListResponse } from '../../../models/assistanteList'
import {
	ChatMessageProps,
	CurrentChatProps,
	Lead,
	useChatStore
} from '../../../services/store/chat-store'
import { ChatMessage } from '../ChatMessage'
import * as S from './styles'

const socket = io(`${import.meta.env.VITE_UPFUNNELS_API}`)

export function ChatConversation({
	managers,
	currentLeadOutsideStore
}: {
	managers: Array<AssistantListResponse>
	currentLeadOutsideStore?: any
}) {
	const [message, setMessage] = useState('')

	const {
		currentLead,
		currentChatMessages,
		currentChat,
		setCurrentChatMessages
	} = useChatStore((state) => state)

	const ref = useRef<HTMLDivElement>(null)

	const currentLeadRef = useRef(currentLead)
	useEffect(() => {
		currentLeadRef.current = currentLead
	}, [currentLead])

	const currentChatMessagesRef = useRef(currentChatMessages)
	useEffect(() => {
		currentChatMessagesRef.current = currentChatMessages
	}, [currentChatMessages])

	const currentChatRef = useRef(currentChat)
	useEffect(() => {
		currentChatRef.current = currentChat
	}, [currentChat])

	const scrollToBottom = () => {
		if (!ref.current) return
		ref.current.scrollIntoView({ behavior: 'smooth' })
	}

	socket.connect()

	socket.on('update.message', (message: ChatMessageProps) => {
		const _currentLead: Lead = currentLeadRef.current
		const _currentChatMessages: ChatMessageProps[] =
			currentChatMessagesRef.current
		const _currentChat: CurrentChatProps = currentChatRef.current

		if (_currentLead.chatId !== _currentChat.chatId) return

		// exibir somente mensagem do chat aberto
		if (_currentChat.chatId !== message.chatId) return

		setCurrentChatMessages([
			..._currentChatMessages,
			{
				sentBy: message.sentBy,
				message: message.message,
				updatedAt: message.updatedAt,
				status: message.status,
				senderName: message.senderName
			}
		])
	})

	const submitMessage = async () => {
		const _currentChatMessages: ChatMessageProps[] =
			currentChatMessagesRef.current
		setCurrentChatMessages([
			..._currentChatMessages,
			{
				sentBy: 'owner',
				message: message,
				updatedAt: new Date().toISOString(), // Set to current date and time
				status: 'unread',
				senderName: responsable?.name ?? ''
			}
		])

		setMessage('')
		await axiosRoot().post('/whatsapp/sendMessage', {
			sentBy: 'owner',
			phone: currentChat.from,
			chatId: currentChat.chatId,
			message,
			hour: new Date(),
			status: 'unread',
			senderName: responsable?.name
		})
	}

	const submitChatIA = async (reponsableSelected: any) => {
		setMessage('')
		await axiosRoot().post('ai-assistant-manager/start-chat-with-lead/', {
			assistente: reponsableSelected._id,
			customer: currentLeadOutsideStore,
			leadId: currentLead._id,
			context: mapCurrenteMessage().reverse().slice(0, 11)
		})
	}

	const mapCurrenteMessage = () => {
		return currentChatMessages.map((message) => {
			return {
				message: message.message,
				role: message.sentBy === 'owner' ? 'assistant' : message.sentBy
			}
		})
	}

	const changeAssistant = async (assistantName: string) => {
		const managerToSet = managers.find(
			(assistant) => assistant.name === assistantName
		)

		if (!managerToSet) return

		if (managerToSet.assistantManagerType.toLowerCase() === 'ia') {
			setResponsable(managerToSet)
			await axiosRoot().patch(
				`/leads/external/${currentLead.leadRef}?validateVisitedPagesIds=false`,
				{
					assistantManagerId: managerToSet?._id,
					assistantManagerType: managerToSet?.assistantManagerType.toLowerCase()
				}
			)
			submitChatIA(managerToSet)
			return
		}

		if (managerToSet.assistantManagerType.toLowerCase() === 'human') {
			setResponsable(managerToSet)
			return await axiosRoot().patch(
				`/leads/external/${currentLead.leadRef}?validateVisitedPagesIds=false`,
				{
					assistantManagerId: managerToSet?._id,
					assistantManagerType: managerToSet?.assistantManagerType.toLowerCase()
				}
			)
		}
	}

	const [responsable, setResponsable] = useState(
		managers.find(
			(item) => item._id == currentLeadOutsideStore.assistantManagerId
		)
	)

	useEffect(() => {
		setResponsable(
			managers.find(
				(item) => item._id == currentLeadOutsideStore.assistantManagerId
			)
		)
	}, [currentLeadOutsideStore])

	useEffect(() => {
		scrollToBottom()
	}, [currentChatMessages])

	return (
		<S.ChatConversationWrapper>
			{!currentChat.leadDetails?._id && (
				<NoContent message="Não encontramos as informações do lead" />
			)}
			{currentChat.leadDetails?._id && (
				<>
					<S.ContactHeader>
						<div
							style={{
								display: 'flex',
								gap: '1rem',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'flex-start',
								cursor: 'pointer'
							}}
						>
							{currentChat?.avatar ? (
								<img
									src={currentChat.avatar}
									alt=""
									style={{
										objectFit: 'cover',
										width: '3rem',
										height: '3rem',
										borderRadius: '50%',
										minHeight: '3rem',
										minWidth: '3rem'
									}}
								/>
							) : (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: '#F2F2F3',
										borderRadius: '50%',
										width: '3rem',
										height: '3rem'
									}}
								>
									<User />
								</div>
							)}
							<div>{currentChat?.leadDetails?.name ?? currentChat.from}</div>
						</div>
						<SelectResponsable
							defaultValue={responsable?._id ?? ''}
							currentValue={responsable?.name ?? ''}
							handleChange={(value) => changeAssistant(value)}
							items={managers.map((assistant) => ({
								name: assistant.name,
								_id: assistant._id,
								assistantManagerType: assistant.assistantManagerType
							}))}
						/>
					</S.ContactHeader>
					<S.MessagesContainer>
						{currentChatMessages.map((message, index) => {
							return (
								<ChatMessage
									key={index}
									sentBy={message.sentBy}
									senderName={message.senderName}
									message={message.message}
									updatedAt={message.updatedAt}
									status={message.status}
								/>
							)
						})}
						<div ref={ref} />
					</S.MessagesContainer>
					<S.SendContainer>
						<input
							placeholder={
								responsable?.assistantManagerType.toLowerCase() === 'ia'
									? 'Um assistente AI está responsável por esta conversa. Altere na barra superior para intervir.'
									: 'Digite sua mensagem...'
							}
							name="message"
							value={message}
							disabled={
								responsable?.assistantManagerType.toLowerCase() === 'ia'
							}
							onChange={(e) => setMessage(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && submitMessage()}
						/>
						<Send
							style={{
								pointerEvents:
									responsable?.assistantManagerType.toLowerCase() === 'ia'
										? 'none'
										: 'all'
							}}
							color={
								responsable?.assistantManagerType.toLowerCase() === 'ia'
									? '#85959E'
									: '#009ef7'
							}
							cursor={
								responsable?.assistantManagerType.toLowerCase() === 'ia'
									? 'not-allowed'
									: 'pointer'
							}
							onClick={() => submitMessage()}
						/>
					</S.SendContainer>
				</>
			)}
		</S.ChatConversationWrapper>
	)
}
