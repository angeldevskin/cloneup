/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosRoot } from '../http/axios'
import { AssistantRequest } from '../models/assitantRequest'

export const createOpenAIKey = async (key: string) => {
	try {
		const response = await axiosRoot().put('/assistant/key', key)
		return response?.data
	} catch (err) {
		throw err
	}
}

export async function createAssistant(assistantRequest: AssistantRequest) {
	try {
		const { data, status } = await axiosRoot().post(
			'/ai-assistant-manager/new',
			assistantRequest
		)

		if (status === 201) {
			return data
		} else {
			return status
		}
	} catch (error) {
		throw new Error(`Failed to create assistant IA: ${error}`)
	}
}

export async function getAssistantById(assistantRequest: string) {
	try {
		const { data, status } = await axiosRoot().get(
			`/ai-assistant-manager/${assistantRequest}`
		)

		if (status === 200) {
			return data
		} else {
			return status
		}
	} catch (error) {
		throw new Error(`Failed to get assistant IA by ID: ${error}`)
	}
}

export async function getAllAssistant(): Promise<any[]> {
	const data = await axiosRoot()
		.get(`/ai-assistant-manager/`)
		.then((response) => response)

	if (!data) {
		throw new Error('Assistant IA not found')
	}

	return data.data.content
}

export async function updateAssistant(
	assistantId: string,
	changes: Partial<AssistantRequest>
) {
	try {
		const { data, status } = await axiosRoot().put(
			`/ai-assistant-manager/${assistantId}`,
			changes
		)

		if (status === 200) {
			return data
		} else {
			return status
		}
	} catch (error) {
		throw new Error(`Failed to update assistant IA: ${error}`)
	}
}

export async function deleteAssistant(assistantId: string) {
	try {
		const res = await axiosRoot().delete(`/ai-assistant-manager/${assistantId}`)
		return res
	} catch (error) {
		throw error
	}
}

export async function getCredentials() {
	try {
		const data = await axiosRoot().get(`/integrations/openai/credentials`)

		return data
	} catch (err) {
		throw err
	}
}

export async function updateCredentials(apiKey: string) {
	try {
		const data = await axiosRoot().put(`/integrations/openai/credentials`, {
			apiKey
		})

		return data
	} catch (err) {
		throw err
	}
}

export async function updateKeyOpenAI(apiKey: string) {
	try {
		const { data, status } = await axiosRoot().put(
			`/integrations/openai/credentials`,
			{
				apiKey
			}
		)

		return {
			data,
			status
		}
	} catch (error) {
		throw new Error(`Erro ao atualizar chave: ${error}`)
	}
}

export async function runAssistant(
	assistantId: string,
	message: string | undefined,
	threadId: string = ''
) {
	try {
		const response = await axiosRoot().post(`/ai-assistant-manager/run`, {
			assistantId,
			message,
			threadId
		})

		return response
	} catch (error) {
		throw error
	}
}

export async function sendFileMultiple(files: any) {
	try {
		const formData = new FormData()
		files.forEach((file: any) => {
			formData.append('files', file)
		})
		const response = await axiosRoot().post(`/dcmt/upload-multiple`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		return response
	} catch (error) {
		throw error
	}
}

export async function sendFile(file: any) {
	try {
		const formData = new FormData()
		formData.append('file', file)
		const response = await axiosRoot().post(`/dcmt/upload-single`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		return response
	} catch (error) {
		throw error
	}
}

export async function deleteFile(file: any) {
	try {
		const response = await axiosRoot().delete(`dcmt/remove/${file}`)

		return response
	} catch (error) {
		throw error
	}
}

export async function getAllAssistantList() {
	return await axiosRoot()
		.get('/whatsapp/assistants')
		.then((response) => response.data)
}
