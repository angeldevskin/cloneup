import { CheckCheck } from 'lucide-react'
import Markdown from 'react-markdown'

import stars from '../../../assets/stars.svg'

import { format, parseISO } from 'date-fns'
import { StatusPin } from '../../../components/StatusPin'
import {
	ChatMessageProps,
	useChatStore
} from '../../../services/store/chat-store'
import * as S from './styles'
import { convertUrlsToMarkdown, whatsappToMD } from './utils'

export function ChatMessage({
	sentBy,
	senderName,
	updatedAt,
	message,
	status
}: ChatMessageProps) {
	const { currentChat } = useChatStore((state) => state)

	return (
		<S.MessageWrapper from={sentBy}>
			<strong>
				{sentBy === 'user' && currentChat.leadDetails?.name}
				{(sentBy === 'owner' || sentBy === 'assistant') && senderName}
				{(sentBy === 'owner' || sentBy === 'assistant') &&
					!senderName &&
					'Owner'}{' '}
				{sentBy === 'assistant' && (
					<StatusPin type="ia" message="IA" icon={<img src={stars} />} />
				)}
			</strong>
			{message ? (
				<>
					{sentBy === 'assistant' && message.match(/[*_[.~\n`]/) && (
						<span className="message">
							<Markdown>
								{convertUrlsToMarkdown(message.replace(/\\n/g, '\n'))}
							</Markdown>
						</span>
					)}
					{sentBy !== 'assistant' && message.match(/[*_[.~\n`]/) && (
						<span className="message">
							<Markdown>
								{whatsappToMD(
									convertUrlsToMarkdown(message.replace(/\\n/g, '\n'))
								)}
							</Markdown>
						</span>
					)}
					{!message.match(/[*_[~.\n`]/) && (
						<span className="message">
							<Markdown className="md">
								{convertUrlsToMarkdown(message.replace(/\\n/g, '\n'))}
							</Markdown>
						</span>
					)}
				</>
			) : (
				<em>Mensagem não suportada no momento</em>
			)}

			<div className="status">
				{(sentBy === 'owner' || sentBy === 'assistant') &&
					status === 'unread' && <CheckCheck strokeWidth={1} size={16} />}
				{(sentBy === 'owner' || sentBy === 'assistant') &&
					status === 'read' && (
						<CheckCheck color="#009ef7" strokeWidth={1} size={16} />
					)}
				<span>{format(parseISO(updatedAt), 'HH:mm')}</span>
			</div>
		</S.MessageWrapper>
	)
}
