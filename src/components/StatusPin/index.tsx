import { ReactNode } from 'react'
import * as S from './styles'

export type StatusPinProps = {
	type: 'success' | 'advice' | 'inProgress' | 'ia'
	message: string
	icon?: ReactNode
}

export function StatusPin({ type, message, icon }: StatusPinProps) {
	return (
		<S.Container type={type}>
			<span>
				{message}
				{icon && icon}
			</span>
		</S.Container>
	)
}
