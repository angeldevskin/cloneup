import { useEffect } from 'react'

import { useResetPasswordSteps } from '../../contexts/auth/ResetPassword/steps'
import { AuthTemplate } from '../../templates/AuthTemplate'

import * as S from './styles'

export function ResetPassword() {
	const { currentStep } = useResetPasswordSteps()

	useEffect(() => {}, [currentStep])

	return (
		<AuthTemplate>
			<S.Wrapper>{currentStep}</S.Wrapper>
		</AuthTemplate>
	)
}
