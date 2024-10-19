import { createContext, ReactNode, useContext, useState } from 'react'

import { StepOne } from '../../../pages/ResetPassword/Steps/StepOne'
import { StepThree } from '../../../pages/ResetPassword/Steps/StepThree'
import { StepTwo } from '../../../pages/ResetPassword/Steps/StepTwo'

import {
	TypeResetPasswordContext,
	TypeResetPasswordCurrentUser
} from '../../../@types/contexts/forgetPassword'

export const ResetPasswordContext = createContext(
	{} as TypeResetPasswordContext
)

export const ResetPasswordProvider = ({
	children
}: {
	children: ReactNode
}) => {
	const [currentStep, setCurrentStep] = useState<ReactNode | null>(<StepOne />)
	const [currentUser, setCurrentUser] = useState<TypeResetPasswordCurrentUser>(
		{} as TypeResetPasswordCurrentUser
	)

	function handleSteps(step: 'one' | 'two' | 'three') {
		switch (step) {
			case 'one':
				return setCurrentStep(<StepOne />)
			case 'two':
				return setCurrentStep(<StepTwo />)
			case 'three':
				return setCurrentStep(<StepThree />)
			default:
				break
		}
	}

	function updateCurrentUserInfos(data: TypeResetPasswordCurrentUser) {
		setCurrentUser(data)
	}

	return (
		<ResetPasswordContext.Provider
			value={{ currentStep, handleSteps, currentUser, updateCurrentUserInfos }}
		>
			{children}
		</ResetPasswordContext.Provider>
	)
}

export function useResetPasswordSteps() {
	return useContext(ResetPasswordContext)
}
