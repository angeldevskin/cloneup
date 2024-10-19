/* eslint-disable @typescript-eslint/no-explicit-any */
import success from '../../../assets/images/sucess.svg'
import { Button } from '../../../components/Button'

export function ModalSucces({ handleClose }: any) {
	return (
		<div id="modal-code-success">
			<div className="flex">
				<img src={success} alt="Success" />
				<div className="text">
					<h3>Sucesso!</h3>
					<p>Seu código foi adicionado com êxito!</p>
					<Button onClick={handleClose}>Fechar</Button>
				</div>
			</div>
		</div>
	)
}
