import * as Toast from '@radix-ui/react-toast'

import * as S from './styles'

export function FeedbackToast({
	open,
	handleOpen,
	icon,
	message
}: {
	open: boolean
	handleOpen: () => void
	icon: React.ReactNode
	message: string
}) {
	return (
		<Toast.Provider swipeDirection="down">
			<S.CustomRoot open={open} onOpenChange={handleOpen}>
				<S.CustomTitle>
					{icon && icon}
					<span>{message ?? ''}</span>
				</S.CustomTitle>
			</S.CustomRoot>
			<S.CustomViewport />
		</Toast.Provider>
	)
}
