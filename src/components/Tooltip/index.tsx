import { Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip'

import * as S from './styles'

export function Tooltip({
	trigger,
	content,
	side = 'top',
	onClick,
	delay = 1,
	disable = false
}: {
	trigger: React.ReactNode
	content: string
	side?: 'top' | 'bottom' | 'left' | 'right'
	delay?: number
	disable?: boolean
	onClick?: () => void
}) {
	return (
		<Provider delayDuration={delay} disableHoverableContent={disable}>
			<Root>
				<Trigger asChild onClick={onClick}>
					{trigger}
				</Trigger>
				<Portal>
					{content && (
						<S.TooltipContent side={side} sideOffset={10}>
							<span>{content}</span>
						</S.TooltipContent>
					)}
				</Portal>
			</Root>
		</Provider>
	)
}
