import { Close } from '@radix-ui/react-dialog'
import { Button } from '../Button'
import * as S from './styles'

export function DeleteConfirmation({
	message,
	itemToDelete,
	destructionFunction
}: {
	message: string
	itemToDelete?: string
	destructionFunction: (itemToDelete?: string) => void
}) {
	return (
		<S.Wrapper>
			<span>{message}</span>
			<footer>
				<Close asChild>
					<Button shape="text" $fullwidth>
						Cancelar
					</Button>
				</Close>
				<Close asChild>
					<Button
						shape="danger"
						$fullwidth
						onClick={() => destructionFunction(itemToDelete)}
					>
						Excluir
					</Button>
				</Close>
			</footer>
		</S.Wrapper>
	)
}
