import { create } from 'zustand'
import { FunnelType } from '../../@types/pages/funnels'
import { AssistantListResponse } from '../../models/assistanteList'
import { Page } from '../../models/page.model'

type Chat = {
	status: string
	from: string
	message: string
	chatId: string
	leadId: string
	leadDetails?: Lead
}
export interface ChatMessageProps {
	senderName: string
	sentBy: 'user' | 'assistant' | 'owner'
	message: string
	updatedAt: string
	status: 'unread' | 'read'
	chatId?: string
}

export interface CurrentChatProps {
	from: string
	chatId: string
	avatar?: string
	leadDetails?: Lead
}
export interface Lead {
	userId: string
	name: string | null
	surname: string
	email: string
	telephone: string
	pageId: string
	funnelId: string
	chatId?: string
	_id: string
	createdAt: string
	updatedAt: string
	pageName: string
	funnelName: string
	leadRef: string
	funnelDetails?: FunnelType
	pageDetails?: Page
	assistantManagerType: 'human' | 'ia'
	assistantManagerId:
		| {
				_id: string
				name: string
				role: string
		  }
		| string
}

export type ChatStoreType = {
	chats: Chat[]
	currentLead: Lead
	currentListAssistant: AssistantListResponse[]
	currentChat: CurrentChatProps
	currentChatMessages: ChatMessageProps[]
	setChats: (chats: Chat[]) => void
	setAssistantList: (chats: AssistantListResponse[]) => void
	setCurrentChat: (chat: CurrentChatProps) => void
	setCurrentLead: (currentLead: Lead) => void
	setCurrentChatMessages: (messages: ChatMessageProps[]) => void
}

export const useChatStore = create<ChatStoreType>((set) => ({
	chats: [],
	currentLead: {} as Lead,
	currentListAssistant: {} as AssistantListResponse[],
	currentChat: {} as CurrentChatProps,
	currentChatMessages: [],
	setChats: (chats) => {
		set(() => ({
			chats
		}))
	},
	setCurrentChat: (chat: CurrentChatProps) => {
		set(() => ({
			currentChat: chat
		}))
	},
	setCurrentLead: (lead) => {
		set(() => ({
			currentLead: lead
		}))
	},
	setAssistantList: (assistant) => {
		set(() => ({
			currentListAssistant: assistant
		}))
	},
	setCurrentChatMessages: (messages) => {
		set(() => ({
			currentChatMessages: messages
		}))
	}
}))
