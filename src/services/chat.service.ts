import { axiosRoot } from '../http/axios'

export async function getInstance() {
	return await axiosRoot().get('/instance')
}

export async function getChats() {
	return await axiosRoot().get('/whatsapp')
}

export async function getChatMessages(chatId: string) {
	return await axiosRoot().get(`/whatsapp/${chatId}`)
}

export async function deleteChat(chatId: string) {
	try {
		return await axiosRoot().delete(`/whatsapp/${chatId}`)
	} catch (e) {
		throw e
	}
}
