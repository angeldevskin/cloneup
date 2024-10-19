import { Close as PopoverClose } from '@radix-ui/react-popover'
import { CheckCheck, MoreVertical, User } from 'lucide-react'
import { useState } from 'react'
import { PopOver } from '../../../components/PopOver'
import { getChatMessages } from '../../../services/chat.service'
import {
	ChatMessageProps,
	Lead,
	useChatStore
} from '../../../services/store/chat-store'
import { DialogRoot } from '../../../components/Dialog'
import * as S from './styles'
import { ModalDeleteChat } from './components/ModalDeleteChat'

interface ChatInfoProps {
	from: string
	status?: 'unread' | 'read'
	message?: string
	chatId: string
	leadId?: string
	avatar?: string
	leadDetails?: Lead
	updateCurrentLead: (currentLead: Lead) => void
	setLeadToDetail: (lead: Lead) => void
	onDelete: () => void
	onDelete: () => void
}

export function ChatInfo({
	from,
	status,
	message,
	chatId,
	avatar,
	leadDetails,
	updateCurrentLead,
	setLeadToDetail,
	onDelete
}: ChatInfoProps) {
	const {
		currentChat,
		setCurrentChat,
		setCurrentChatMessages,
		setCurrentLead
	} = useChatStore((state) => state)

	const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false)
	const [, setModalIdDelete] = useState<string>('')

	async function handleClickChat() {
		if (currentChat.chatId === chatId) return

		setCurrentChat({
			chatId,
			from,
			avatar,
			leadDetails: leadDetails ?? undefined
		})

		await getChatMessages(chatId).then((result) => {
			setCurrentLead(result.data.lead)
			updateCurrentLead(result.data.lead)

			setCurrentChatMessages(
				result.data.messages.map((messages: ChatMessageProps) => ({
					senderName: messages.senderName,
					sentBy: messages.sentBy,
					message: messages.message,
					updatedAt: messages.updatedAt,
					status: messages.status
				}))
			)
		})
	}

	function handleDeleteConversation() {
		setModalIdDelete(chatId)
		setModalDeleteOpen(true)
	}

	return (
		<>
			<S.Wrapper $isSelected={currentChat.chatId === chatId}>
				<S.InlineWrapper onClick={() => handleClickChat()}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							width: '100%',
							gap: '1rem'
						}}
					>
						{avatar && (
							<img
								src={avatar}
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
						)}
						{!avatar && (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#F2F2F3',
									borderRadius: '50%',
									width: '3rem',
									height: '3rem',
									minHeight: '3rem',
									minWidth: '3rem'
								}}
							>
								<User />
							</div>
						)}

						<div>
							<strong>{leadDetails?.name ?? from}</strong>
							<div
								style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
							>
								{message && (
									<>
										{status === 'unread' && <CheckCheck />}
										{status === 'read' && <CheckCheck color="#009ef7" />}
									</>
								)}
								<span>{message}</span>
							</div>
						</div>
					</div>
				</S.InlineWrapper>
				<PopOver
					side="right"
					trigger={<MoreVertical role="button" />}
					content={
						<S.ActionsWrapper>
							<PopoverClose asChild>
								<button
									onClick={() => setLeadToDetail(leadDetails ?? ({} as Lead))}
								>
									Exibir informações
								</button>
							</PopoverClose>
							<PopoverClose asChild>
								<button onClick={handleDeleteConversation}>
									Excluir conversa
								</button>
							</PopoverClose>
						</S.ActionsWrapper>
					}
				/>
			</S.Wrapper>

			<DialogRoot
				className="dialog-modal-delete"
				setIsOpen={() => setModalDeleteOpen(!modalDeleteOpen)}
				title=""
				isOpen={modalDeleteOpen}
				maxwidth={720}
				hasCloseButton={false}
			>
				<ModalDeleteChat
					handleClose={() => setModalDeleteOpen(false)}
					deleteChat={() => onDelete()}
				/>
			</DialogRoot>
		</>
	)
}
