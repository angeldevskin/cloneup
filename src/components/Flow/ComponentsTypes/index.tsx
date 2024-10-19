import { ComponentProps, ReactNode } from 'react'

import * as S from './styles'

type PageTypeProps = {
	children: ReactNode
	hasLabel?: boolean
	label?: ReactNode
} & ComponentProps<'div'>

export function ComponentsType({ children, ...props }: PageTypeProps) {
	return (
		<S.Wrapper {...props}>
			{props.hasLabel && props.label}
			<S.Body>{children}</S.Body>
		</S.Wrapper>
	)
}
