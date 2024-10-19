import { ReactNode } from 'react'

export type TypeResetPasswordCurrentUser = {
	email: string
	newPassword: string
	code: string
}

export type TypeResetPasswordContext = {
	currentStep: ReactNode | null
	handleSteps: (step: 'one' | 'two' | 'three') => void
	currentUser: TypeResetPasswordCurrentUser
	updateCurrentUserInfos: (currentUser: TypeResetPasswordCurrentUser) => void
}
