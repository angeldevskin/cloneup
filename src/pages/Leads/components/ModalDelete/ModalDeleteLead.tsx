/* eslint-disable @typescript-eslint/no-explicit-any */
import deleteImage from '../../../../assets/images/delete.svg'
import { Button } from '../../../../components/Button'

interface ModalDeleteProps {
	handleClose: () => void
	handleDelete: () => Promise<void>
}

export function ModalDeleteLead({
	handleClose,
	handleDelete
}: ModalDeleteProps) {
	const onDelete = async () => {
		await handleDelete()
		handleClose()
	}

	return (
		<div id="modal-code-delete">
			<div className="flex">
				<img src={deleteImage} alt="Delete" />
				<div className="text">
					<h3>Excluir lead</h3>
					<p>
						Você tem certeza que deseja excluir este lead permanentemente?
						<strong> Esta ação não pode ser desfeita</strong>.
					</p>
					<div className="flex footer">
						<Button className="botao-cancelar" onClick={handleClose}>
							Cancelar
						</Button>
						<Button className="botao-confirmar" onClick={onDelete}>
							Sim, excluir lead
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
