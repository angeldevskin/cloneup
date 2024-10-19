import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface EditorStorePropsType {
	pageId?: string
	funnelId?: string
	pageTemplateId?: string
	from: 'funnel' | 'template'
}

export type EditorStoreType = {
	state: EditorStorePropsType
	setState: (state: EditorStorePropsType) => void
}

export const useEditorStore = create(
	persist<EditorStoreType>(
		(set) => ({
			state: {} as EditorStorePropsType,
			setState: (state: EditorStorePropsType) => {
				set(() => ({
					state
				}))
			}
		}),
		{
			name: '@upfunnels-editor:1.0.0'
		}
	)
)
