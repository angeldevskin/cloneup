import { Info } from 'lucide-react'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'

import * as S from './styles'
import { useForm } from 'react-hook-form'
import { createDomain } from '../../../services/domain.service'
import { toast } from 'react-toastify'
import { errorToast, successToast } from '../../../components/Toast/types'
import './style.css'

type FormType = {
	domainName: string
	funnelId?: string
}

export function NewsBondDomainForm({
	closeDialog,
	funnelId
}: {
	closeDialog: () => void
	funnelId: string
}) {
	const { register, handleSubmit } = useForm<FormType>()
	async function onSubmit(fields: FormType) {
		if (!fields.domainName || !fields.domainName.trim()) {
			toast.error(
				`O campo Domínio não pode ser vazio ou conter apenas espaços em branco!`
			)
			return false
		}

		const newData: FormType = {
			domainName: fields.domainName
		}

		if (funnelId) {
			newData.funnelId = funnelId
		}

		const response = await createDomain(newData)

		if (response.data.message === 'Domain created successfully') {
			toast.success('Projeto salvo com sucesso!', successToast)
			closeDialog()
		} else {
			toast.success('Projeto não salvo com sucesso!', errorToast)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<S.Form>
				<TextField
					placeholder="ex: seuproduto.com.br"
					name="domainName"
					required
					className="fullWidth"
					label="Domínio"
					$fullwidth={true}
					register={register}
				/>
				<span className="tip">
					Vincule um domínio que já pertença à você. Você também pode vincular
					um subdomínio. Ex: ebook.seuproduto.com.br
				</span>
				<S.Card>
					<Info />
					<p>
						Antes de vincular o seu domínio, certifique-se de tê-lo adquirido e
						o configurado em um serviço de hospedagem como: Hostgator, GoDaddy,
						Registro.br ou outro.
						<br />
						<br />
						Em caso de dúvida consulte nossa
						<span style={{ color: '#009EF7' }}> Central de Ajuda</span>.
					</p>
				</S.Card>
				<S.Button>
					<Button
						$fullwidth={true}
						shape="ghost"
						onClick={() => {
							closeDialog()
						}}
					>
						Cancelar
					</Button>
					<Button $fullwidth={true} type="submit">
						Vincular
					</Button>
				</S.Button>
			</S.Form>
		</form>
	)
	closeDialog()
}
