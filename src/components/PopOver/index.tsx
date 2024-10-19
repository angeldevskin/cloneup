import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover'
import { ReactNode } from 'react'

export function PopOver({
	trigger,
	content,
	side = 'top',
	align = 'center',
	offset = 20
}: {
	trigger: ReactNode
	content: ReactNode
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
	offset?: number
}) {
	return (
		<Root>
			<Trigger asChild>{trigger}</Trigger>
			<Portal>
				<Content
					side={side}
					sideOffset={offset}
					style={{ border: 'none', outline: 'none' }}
					align={align}
				>
					{content}
				</Content>
			</Portal>
		</Root>
	)
}
