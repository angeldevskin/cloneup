import { useForm } from 'react-hook-form'
import { TextField } from '../../../../../TextField'
import { Close } from '@radix-ui/react-dialog'
import { Button } from '../../../../../Button'

import * as S from './styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SwitchInput } from '../../../../../Switch'
import { useState } from 'react'
import { TextFieldNatty } from '../../../../../TextFieldNatty'
import { dinamicHtml, dinamicJS } from './utils'

type Props = {
	page: {
		name: string
		fullPath: string
	}
	form?: {
		buttonColor: string
		buttonText: string
		buttonRedirect: string
		buttonBorderRadius: string
		html?: string
		js?: string
	}
}
import { useUtils } from '../../../../../../services/store/utils-store'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { errorToast } from '../../../../../Toast/types'

interface ExternalPageFormProps {
	handleAddNode: (data: Props) => void
}

const schema = z.object({
	name: z.string().min(3, { message: 'Insira um nome válido' }),
	fullPath: z.string().url({ message: 'Insira uma URL válida' })
})

export function ExternalPageForm({ handleAddNode }: ExternalPageFormProps) {
	const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>(
		{
			resolver: zodResolver(schema)
		}
	)

	const [currentPageId] = useState<string>(localStorage.getItem('pageId')!)
	const [currentFunnelId] = useState<string>(localStorage.getItem('funnelId')!)
	const [showForm, setShowForm] = useState(false)
	const [formButtonColor, setFormButtonColor] = useState('#000000')
	const [formButtonBorderRadius, setFormButtonBorderRadius] =
		useState<string>('10')
	const [formButtonText, setFormButtonText] = useState('Cadastre-se')
	const [formButtonRedirect, setFormButtonRedirect] = useState('')
	const { loading } = useUtils((state) => state)

	async function onHandleSubmit(data: z.infer<typeof schema>) {
		if (showForm && !formButtonRedirect) {
			toast('Insira uma URL de redirecionamento', errorToast)
			return
		}

		if (!showForm) {
			handleAddNode({
				page: data
			})
			return
		}

		handleAddNode({
			page: data,
			form: {
				buttonColor: formButtonColor,
				buttonText: formButtonText,
				buttonRedirect: formButtonRedirect,
				buttonBorderRadius: formButtonBorderRadius,
				html: dinamicHtml(
					formButtonColor,
					formButtonText,
					formButtonBorderRadius,
					currentFunnelId,
					currentPageId
				),
				js: dinamicJS()
			}
		})
	}

	return (
		<S.Form onSubmit={handleSubmit(onHandleSubmit)}>
			<TextField
				$fullwidth
				label="Nome da Página"
				placeholder='Ex: "Página de contato"'
				name="name"
				register={register}
			/>
			{formState.errors.name && (
				<span className="error">{formState.errors.name.message}</span>
			)}
			<TextField
				$fullwidth
				label="URL"
				placeholder="Insira a URL da página"
				name="fullPath"
				register={register}
			/>
			{formState.errors.fullPath && (
				<span className="error">{formState.errors.fullPath.message}</span>
			)}

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginTop: '1rem'
				}}
			>
				<strong>Formulário</strong>
				<SwitchInput
					checked={showForm}
					onChange={() => setShowForm(!showForm)}
				/>
			</div>
			{showForm && (
				<S.FormBuilderContainer>
					<TextFieldNatty
						name="buttonText"
						label="Texto do botão"
						placeholder="Cadastre-se"
						value={formButtonText}
						onChange={(e) => setFormButtonText(e.target.value)}
						$fullwidth
					/>
					<TextFieldNatty
						name="buttonRedirect"
						label="Página de destino após envio"
						placeholder="EX: https://www.google.com"
						value={formButtonRedirect}
						onChange={(e) => setFormButtonRedirect(e.target.value)}
						$fullwidth
					/>
					<div className="buttonColor">
						<span>Cor do botão</span>
						<div className="colorContainer">
							<S.FormButtonColor
								type="color"
								value={formButtonColor}
								onChange={(e) => setFormButtonColor(e.target.value)}
							/>
						</div>
					</div>
					<span>Suavizar arestas</span>
					<div className="buttonRadius">
						<input
							name="buttonBorderRadius"
							defaultValue={10}
							max={50}
							type="range"
							value={formButtonBorderRadius}
							onChange={(e) => setFormButtonBorderRadius(e.target.value)}
						/>
						<div className="inputManual">
							<input
								max={50}
								maxLength={2}
								type="number"
								value={formButtonBorderRadius}
								onChange={(e) => setFormButtonBorderRadius(e.target.value)}
							/>
							<span>px</span>
						</div>
					</div>
					<div
						style={{
							width: '100%',
							border: 'none',
							borderRadius: '10px',
							padding: '1rem',
							backgroundColor: '#f5f5f5',
							pointerEvents: 'none'
						}}
						dangerouslySetInnerHTML={{
							__html: dinamicHtml(
								formButtonColor,
								formButtonText,
								formButtonBorderRadius,
								currentFunnelId,
								currentPageId
							)
						}}
					/>
				</S.FormBuilderContainer>
			)}

			<footer>
				<Close asChild>
					<Button shape="text" $fullwidth>
						Cancelar
					</Button>
				</Close>
				<Button className="loader" type="submit" $fullwidth disabled={loading}>
					{loading ? <Loader2 /> : 'Confirmar'}
				</Button>
			</footer>
		</S.Form>
	)
}
