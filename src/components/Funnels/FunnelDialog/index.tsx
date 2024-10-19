import { Close, Portal, Root, Title } from '@radix-ui/react-dialog'
import { ReactElement } from 'react'

import { X } from 'lucide-react'
import * as S from './styles'

type FunnelTypeProps = {
	children: ReactElement
	isOpen: boolean
	setIsOpen: () => void
	title: string
}

export function FunnelDialog({
	children,
	isOpen = false,
	setIsOpen,
	title
}: FunnelTypeProps) {
	return (
		<Root open={isOpen} onOpenChange={setIsOpen}>
			<Portal>
				<S.DialogContent onInteractOutside={(event) => event.preventDefault()}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginBottom: '1rem',
							width: '100%'
						}}
					>
						<Title aria-label="title">{title}</Title>
						<Close asChild>
							<button aria-label="close">
								<X />
							</button>
						</Close>
					</div>
					{children}
				</S.DialogContent>
			</Portal>
		</Root>
	)
}
