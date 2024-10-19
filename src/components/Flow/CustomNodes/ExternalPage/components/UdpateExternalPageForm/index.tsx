import { useEffect, useState } from 'react'
import { Page } from '../../../../../../models/page.model'
import { getPageById } from '../../../../../../services/editor.service'
import { Close } from '@radix-ui/react-dialog'

import * as S from './styles'
import { axiosRoot } from '../../../../../../http/axios'
import { Button } from '../../../../../Button'
import { TextFieldNatty } from '../../../../../TextFieldNatty'
import { toast } from 'react-toastify'
import { errorToast, successToast } from '../../../../../Toast/types'
import { z } from 'zod'
import { Copy, Unplug } from 'lucide-react'
import { dinamicHtml, dinamicJS } from '../ExternalPageForm/utils'
import { Loader2 } from 'lucide-react'
import { SwitchInput } from '../../../../../Switch'
import { DialogRoot } from '../../../../../Dialog'
import { Monitoring } from './monitoring'

interface UpdateExternalPageFormProps {
	pageId: string
	handleResponse: (response: Partial<Page>) => void
}

const schema = z.object({
	name: z.string().min(3, { message: 'Insira um nome válido' }),
	fullPath: z.string().url({ message: 'Insira uma URL válida' })
})

export function UpdateExternalPageForm({
	pageId,
	handleResponse
}: UpdateExternalPageFormProps) {
	const [page, setPage] = useState<Partial<Page>>()
	const [currentName, setCurrentName] = useState(page?.name ?? '')
	const [currentFullPath, setCurrentFullPath] = useState(page?.fullPath ?? '')
	const [currentFunnelId, setCurrentFunnelId] = useState<string>('')
	const [currentPageId, setCurrentPageId] = useState<string>('')
	const [nameError, setNameError] = useState<string | null>(null)
	const [fullPathError, setFullPathError] = useState<string | null>(null)
	const [formInfos, setFormInfos] = useState<{
		_id: string
		buttonColor: string
		buttonText: string
		borderRadius: string
		pageId: string
		deleteAt?: string
		createdAt?: string
		updatedAt?: string
		__v?: number
	}>()
	const [formButtonColor, setFormButtonColor] = useState('#000000')
	const [formButtonRedirect, setFormButtonRedirect] = useState('')
	const [formButtonBorderRadius, setFormButtonBorderRadius] =
		useState<string>('10')
	const [formButtonText, setFormButtonText] = useState('Cadastre-se')
	const [isloading, setIsLoading] = useState(false)
	const [showForm, setShowForm] = useState(false)
	const [isScriptRunning, setIsScriptRunning] = useState(false)
	const [handleMonitoring, setHandleMonitoring] = useState(false)

	async function fetchCurrentPage() {
		const response = await getPageById({
			pageId: pageId,
			showHTMLCSSJS: false
		})

		setPage(response)
		setCurrentName(response.name ?? '')
		setCurrentFullPath(response.fullPath ?? '')
		setCurrentFunnelId(response.funnelId ?? '')
		setCurrentPageId(response._id ?? '')
		setIsScriptRunning(response.isScriptRunning ?? false)

		if (response.externalForm?._id) {
			setShowForm(true)
			setFormInfos(response.externalForm)
			setFormButtonBorderRadius(response.externalForm.borderRadius)
			setFormButtonColor(response.externalForm.buttonColor)
			setFormButtonText(response.externalForm.buttonText)
			setFormButtonRedirect(response.externalForm.redirectUrl)
		}
	}

	async function onHandleSubmit() {
		setIsLoading(true)
		const parse = schema.safeParse({
			name: currentName,
			fullPath: currentFullPath
		})
		if (!parse.success) {
			if (parse.error.errors[0].path[0] === 'name') {
				setNameError('Insira um nome válido')
			}
			if (parse.error.errors[0].path[0] === 'fullPath') {
				setFullPathError('Insira uma URL válida')
			}

			setIsLoading(false)
			return
		}

		if (showForm && !formButtonRedirect) {
			toast('Insira uma URL de redirecionamento', errorToast)
			return
		}

		await axiosRoot()
			.patch(`/page/patch/${pageId}`, {
				name: currentName,
				fullPath:
					currentFullPath !== page?.fullPath ? currentFullPath : undefined
			})
			.then(async (result) => {
				const {
					name: nameResponse,
					fullPath: fullPathResponse,
					preview
				} = result.data.page

				if (showForm) {
					if (formInfos?._id) {
						await axiosRoot().put(`external-form/${formInfos._id}`, {
							buttonColor: formButtonColor,
							buttonText: formButtonText,
							redirectUrl: formButtonRedirect,
							borderRadius: formButtonBorderRadius.toString(),
							pageId: currentPageId
						})
					} else {
						await axiosRoot().post('external-form', {
							buttonColor: formButtonColor,
							buttonText: formButtonText,
							borderRadius: formButtonBorderRadius.toString(),
							pageId: currentPageId
						})
					}
				}

				handleResponse({
					name: nameResponse,
					fullPath: fullPathResponse,
					preview
				})

				toast.success('Página atualizada com sucesso!', successToast)

				document.getElementById('dialog-close')?.click()
			})
			.catch((data) => {
				if (data.response.data.error.includes('Full path already exists')) {
					toast.error('URL enviada já existe no funil', errorToast)
					return
				}

				return data
			})
			.finally(() => setIsLoading(false))
	}

	useEffect(() => {
		fetchCurrentPage()
	}, [])

	async function handleCopytHTML() {
		const html = dinamicHtml(
			formButtonColor,
			formButtonText,
			formButtonBorderRadius,
			currentFunnelId,
			currentPageId
		)

		await navigator.clipboard.writeText(html).then(() => {
			toast.success(
				'Código HTML copiado para área de transferência.',
				successToast
			)
		})
	}

	async function handleCopyJS() {
		const js = dinamicJS(formButtonRedirect)

		await navigator.clipboard.writeText(js).then(() => {
			toast.success(
				'Código JS copiado para área de transferência.',
				successToast
			)
		})
	}

	return (
		<S.Form>
			<TextFieldNatty
				$fullwidth
				label="Nome da Página"
				placeholder='Ex: "Página de contato"'
				name="name"
				value={currentName}
				onChange={(e) => setCurrentName(e.target.value)}
			/>
			{nameError && <span className="error">{nameError}</span>}
			<TextFieldNatty
				$fullwidth
				label="URL"
				placeholder="Ex: https://www.domain.com"
				name="fullPath"
				value={currentFullPath}
				onChange={(e) => setCurrentFullPath(e.target.value)}
			/>
			{fullPathError && <span className="error">{fullPathError}</span>}
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
			{(showForm === true || formInfos?._id) && (
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
							max={50}
							type="range"
							value={formButtonBorderRadius}
							onChange={(e) => setFormButtonBorderRadius(e.target.value)}
						/>
						<div className="inputManual">
							<input
								max={50}
								maxLength={2}
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
							alignItems: 'center',
							justifyContent: 'center',
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
					<span
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							fontSize: '0.875rem'
						}}
					>
						Copiar código HTML
						<Copy
							size={18}
							cursor="pointer"
							onClick={() => handleCopytHTML()}
						/>
					</span>
					<span
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							fontSize: '0.875rem'
						}}
					>
						Copiar código JS
						<Copy size={18} cursor="pointer" onClick={() => handleCopyJS()} />
					</span>
				</S.FormBuilderContainer>
			)}
			{!isScriptRunning && (
				<S.ScriptContainer>
					<span>
						<Unplug size={18} />
					</span>
					<div className="description">
						<span>
							Esta página não está sendo monitorada pelo Pixel Upfunnels.
						</span>
						<p>
							<button onClick={() => setHandleMonitoring(true)}>
								Clique aqui
							</button>
							para conectar.
						</p>
					</div>
				</S.ScriptContainer>
			)}
			<footer>
				<Close asChild>
					<Button shape="text" $fullwidth>
						Cancelar
					</Button>
				</Close>
				<Button
					className="loader"
					onClick={() => onHandleSubmit()}
					$fullwidth
					disabled={isloading}
				>
					{isloading ? <Loader2 /> : 'Confirmar'}
				</Button>
			</footer>
			<DialogRoot
				title="Corrigir monitoramento de página"
				isOpen={handleMonitoring}
				setIsOpen={() => setHandleMonitoring(!handleMonitoring)}
				maxwidth={900}
			>
				<Monitoring />
			</DialogRoot>
		</S.Form>
	)
}
