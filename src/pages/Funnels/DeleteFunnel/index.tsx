import { Close } from '@radix-ui/react-dialog'
import { toast } from 'react-toastify'

import { Button } from '../../../components/Button'

import { deleteFunnel } from '../../../services/funnels.service'

import { successToast } from '../../../components/Toast/types'

import * as S from './styles'

export function DeleteFunnel({
	funnelId,
	closeDialog
}: {
	funnelId: string
	closeDialog: () => void
}) {
	async function destroyFunnel() {
		const { status } = await deleteFunnel(funnelId)

		if (status === 204) {
			toast.success('Funil excluído com sucesso!', successToast)

			closeDialog()
		}
	}

	return (
		<S.Wrapper>
			<span>Deseja realmente excluir o funil?</span>
			<footer>
				<Close asChild>
					<Button shape="text" $fullwidth>
						Cancelar
					</Button>
				</Close>
				<Button shape="danger" $fullwidth onClick={() => destroyFunnel()}>
					Excluir
				</Button>
			</footer>
		</S.Wrapper>
	)
}
