import { create } from 'zustand'

export type UtilsState = {
	loading: boolean
	setLoading: (loading: boolean) => void
}

export const useUtils = create<UtilsState>((set) => ({
	loading: false,
	setLoading: (loading: boolean) =>
		set(() => ({
			loading
		}))
}))
