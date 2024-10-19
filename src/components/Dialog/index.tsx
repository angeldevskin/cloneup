import { Close, Portal, Root, Title } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

import * as S from './styles'

export function DialogRoot({
	isOpen = false,
	setIsOpen,
	title,
	trigger,
	children,
	maxwidth,
	hasCloseButton = true,
	autoClose = true,
	className,
	preventClose = false
}: {
	isOpen?: boolean
	setIsOpen: () => void
	trigger?: ReactNode
	title: string
	children: ReactNode
	maxwidth?: number
	hasCloseButton?: boolean
	autoClose?: boolean
	className?: string
	preventClose?: boolean
}) {
	return (
		<Root open={isOpen} onOpenChange={setIsOpen}>
			{!!trigger && <S.DialogTrigger>{trigger}</S.DialogTrigger>}
			<Portal>
				<S.DialogOverlay>
					<S.DialogContent
						className={className}
						maxwidth={maxwidth}
						onInteractOutside={(event) =>
							preventClose && event.preventDefault()
						}
						onPointerDownOutside={(event) =>
							!autoClose && event.preventDefault()
						}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: '1rem'
							}}
						>
							{title && <Title aria-label="title">{title}</Title>}
							{hasCloseButton && (
								<Close asChild>
									<button aria-label="close" id="dialog-close">
										<X />
									</button>
								</Close>
							)}
						</div>
						{children}
					</S.DialogContent>
				</S.DialogOverlay>
			</Portal>
		</Root>
	)
}
