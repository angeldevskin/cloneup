type Tool = {
	type: Type[]
	tool_resources?: {
		file_ids?: string[]
		vector_store_ids?: string[]
	}
}

type ToolResources = {
	file_ids?: string[]
	vector_store_ids?: string[]
}

type Metadata = {
	[key: string]: string
}

export type Type = {
	code_interpreter?: boolean
	file_search?: boolean
}
export type AssistantRequest = {
	model: string
	name?: string
	description?: string
	instructions?: string
	tools: Tool[]
	tool_resources?: ToolResources
	metadata?: Metadata
	temperature?: number
	top_p?: number
	response_format?: { type: 'json_object' } | string
}
