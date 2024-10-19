import { Button } from '../../../components/Button'

export function ModalNewCode({
	openModal
}: {
	openModal: (type: string) => void
}) {
	return (
		<div id="modal-new-code">
			<p>Selecione um modelo para começar.</p>
			<div className="block integration">
				<div className="integration_title">
					<span>Integração</span>
					<span className="sub">Recomendado</span>
				</div>
				<div className="integration_body">
					<p>
						Um código já configurado pela UpFunnels para cada plataforma (Google
						Ads, Meta Ads, Tiktok Ads, etc). Basta inserir o ID do seu código
						externo e a Up cuida do restante.
					</p>
					<Button onClick={() => openModal('integration')}>
						Realizar integração
					</Button>
				</div>
			</div>
			<div className="block integration">
				<div className="integration_title">
					<span>Instalação manual</span>
					<span className="sub">Avançado</span>
				</div>
				<div className="integration_body">
					<p>
						Copie e cole o código bruto nas seções Header, Body ou Footer para
						instalar manualmente.
					</p>
					<Button onClick={() => openModal('manual')}>
						Instalar código manualmente
					</Button>
				</div>
			</div>
		</div>
	)
}
