/* eslint-disable @typescript-eslint/no-explicit-any */
type ToolResponse = {
	type: 'code_interpreter' | 'file_search' | 'function'
}

type MetadataResponse = {
	[key: string]: string
}

export type AssistantResponse = {
	_id: string
	assistantId: string
	object: string
	created_at: number | null
	name: string | null
	description: string | null
	model: string
	instructions: string | null
	tools: ToolResponse[]
	metadata: MetadataResponse
	top_p: number
	temperature: number
	response_format: string
	startMsg: string | null
	idleTimeout: any
	goodByMsg: string | null
	idleTimeoutUnit: string
}
