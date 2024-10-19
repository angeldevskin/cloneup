import { useState } from 'react'
// import { io } from 'socket.io-client'

import { ChatMessageProps } from '../pages/Chat/ChatMessage'

// const socketIo = io('http://localhost:3333')

export function useChat() {
	const [currentInstance, setCurrentInstance] = useState<string>('')
	const [chats, setChats] = useState<{ chatId: string }[]>([])
	const [currentChat, setCurrentChat] = useState<{ chatId: string }>()
	const [currentChatMessages, setCurrentChatMessages] = useState<
		ChatMessageProps[]
	>([])

	function sendMessage(message: ChatMessageProps) {
		console.log('Sending message:', message)
		setCurrentChatMessages((prev) => [message, ...prev])
	}

	return {
		currentChat,
		setCurrentChat,
		sendMessage,
		currentChatMessages,
		setCurrentChatMessages,
		currentInstance,
		setCurrentInstance,
		chats,
		setChats
	}
}
