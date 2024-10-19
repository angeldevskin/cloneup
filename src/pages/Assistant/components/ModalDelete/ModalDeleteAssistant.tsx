/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle } from 'lucide-react'
import deleteImage from '../../../../assets/images/delete.svg'
import { Button } from '../../../../components/Button'

interface ModalDeleteProps {
	handleClose: () => void
	handleDelete: () => Promise<void>
}

export function ModalDeleteAssistant({
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
					<h3>Excluir assistente</h3>
					<p>
						Você tem certeza que deseja excluir este assiste permanentemente?
						<strong> Esta ação não pode ser desfeita</strong>.
					</p>
					<div className="alert">
						<AlertCircle strokeWidth={1} />
						<span>
							Caso tenha inserido algum dado errado e já tenha associado o
							assistente a um lead, prefira editar ao invés de excluí-lo.
						</span>
					</div>
					<div className="flex footer">
						<Button className="botao-cancelar" onClick={handleClose}>
							Cancelar
						</Button>
						<Button className="botao-confirmar" onClick={onDelete}>
							Sim, excluir assistente
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
