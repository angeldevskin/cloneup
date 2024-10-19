import * as RadixHoverCard from '@radix-ui/react-hover-card'
import { ReactNode } from 'react'

import * as S from './styles'

export function HoverCard({
	trigger,
	content,
	side = 'top',
	align = 'center',
	background = '#ffffff',
	hasArrow = true
}: {
	trigger: ReactNode
	content: ReactNode
	side?: 'top' | 'right' | 'bottom' | 'left'
	align?: 'start' | 'center' | 'end'
	background?: string
	hasArrow?: boolean
}) {
	return (
		<RadixHoverCard.Root openDelay={0}>
			<RadixHoverCard.Trigger asChild>{trigger}</RadixHoverCard.Trigger>
			<RadixHoverCard.Portal>
				<S.Content side={side} sideOffset={5} align={align}>
					{content}
					{hasArrow && <S.Arrow background={background} />}
				</S.Content>
			</RadixHoverCard.Portal>
		</RadixHoverCard.Root>
	)
}
