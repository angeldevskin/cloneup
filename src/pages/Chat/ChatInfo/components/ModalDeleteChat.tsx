/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle } from 'lucide-react'
import deleteImage from '../../../../assets/images/delete.svg'
import { Button } from '../../../../components/Button'

export function ModalDeleteChat({ handleClose, deleteChat }: any) {
	const handleDelete = async () => {
		await deleteChat()
		handleClose()
	}

	return (
		<div id="modal-code-delete">
			<div className="flex">
				<img src={deleteImage} alt="Delete" />
				<div className="text">
					<h3>Excluir conversa</h3>
					<p>
						Você tem certeza que deseja excluir esta conversa permanentemente?{' '}
						<strong>Esta ação não pode ser desfeita</strong>.
					</p>
					<div className="alert">
						<AlertCircle strokeWidth={1} />
						<span>
							Este processo é permanente e não há como restaurar os dados após a
							exclusão.
						</span>
					</div>
					<div className="flex footer">
						<Button className="botao-cancelar" onClick={handleClose}>
							Cancelar
						</Button>
						<Button className="botao-confirmar" onClick={handleDelete}>
							Sim, excluir conversa
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
