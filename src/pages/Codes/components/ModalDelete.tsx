/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle } from 'lucide-react'
import deleteImage from '../../../assets/images/delete.svg'
import { Button } from '../../../components/Button'

export function ModalDelete({ handleClose, deletePixelCode }: any) {
	const handleDelete = async () => {
		await deletePixelCode()
		handleClose()
	}

	return (
		<div id="modal-code-delete">
			<div className="flex">
				<img src={deleteImage} alt="Delete" />
				<div className="text">
					<h3>Excluir código</h3>
					<p>
						Você tem certeza que deseja excluir este código permanentemente?
						Todos os funis e páginas associados a ele serão afetados.{' '}
						<strong>Esta ação não pode ser desfeita</strong>.
					</p>
					<div className="alert">
						<AlertCircle strokeWidth={1} />
						<span>
							Caso tenha inserido algum dado errado e já tenha associado o
							código a um fluxo, prefira editar informações do código ao invés
							de excluí-lo.
						</span>
					</div>
					<div className="flex footer">
						<Button className="botao-cancelar" onClick={handleClose}>
							Cancelar
						</Button>
						<Button className="botao-confirmar" onClick={handleDelete}>
							Sim, excluir código
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
