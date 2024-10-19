/* eslint-disable @typescript-eslint/no-explicit-any */
import GJSEditor, { WithEditor } from '@grapesjs/react'
import grapesJS, { Editor } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import pt from 'grapesjs/locale/pt'
import { decodeJwt } from 'jose'
import { BookHeart, BookOpenCheck, Speech } from 'lucide-react'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getPageById, updatePage } from '../../../services/editor.service'
import { getFunnelByID } from '../../../services/funnels.service'
import { openAI } from '../../../services/openAI.service'
import { useFunnels } from '../../../services/store/funnels'
import { errorToast, successToast } from '../../Toast/types'
import { Tooltip } from '../../Tooltip'
import { DropDownAI } from '../Components/DropdownAI'
import { TextField } from '../Components/TextField'
import { editorOptions } from '../editorOptions'
import { mentalTrigger } from '../utils'
import * as S from './styles'

export function RootComponent() {
	const upfunnels = JSON.parse(localStorage.getItem('@upfunnels-editor:1.0.0')!)

	const previousPathName = useRef('')
	const { currentFunnel } = useFunnels((state) => state)

	const [newPromptCommand, setNewPromptCommand] = useState(false)
	const [promptCommandValue, setPromptCommandValue] = useState('')
	const [pathName, setPathName] = useState('')
	const [domainName, setDomainName] = useState<string | undefined>('')
	const [loading, setLoading] = useState(false)

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { value } = event.target
		const newValue = value.replace(/[^a-zA-Z-]/g, '')

		setPathName(newValue)
	}

	async function handleBlur() {
		try {
			if (pathName !== previousPathName.current) {
				const data = {
					path: `/${pathName}`
				}

				await updatePage(data, upfunnels.state.state.pageId!)

				toast.success('URL atualizada com sucesso', successToast)

				previousPathName.current = pathName
			}
		} catch (error: any) {
			setPathName(previousPathName.current)

			toast.error(
				`${
					error.message.includes('URL')
						? error.message
						: 'Não foi possível atualizar a URL, tente novamente'
				}`,
				errorToast
			)
		}
	}

	async function handleKeyDownUpdateUrl(
		event: KeyboardEvent<HTMLInputElement>
	) {
		try {
			if (event.key === 'Enter') {
				if (pathName !== previousPathName.current) {
					previousPathName.current = pathName

					const data = {
						path: `/${pathName}`
					}

					await updatePage(data, upfunnels.state.state.pageId!)

					toast.success('URL atualizada com sucesso', successToast)
				}
			}
		} catch (error: any) {
			const errorMessage = typeof error === 'string' && error

			toast.error(
				error.includes('existe')
					? `${errorMessage}`
					: 'Não foi possível atualizar a URL, tente novamente',
				errorToast
			)
		}
	}

	async function getPage() {
		try {
			const res = await getPageById({
				pageId: upfunnels.state.state.pageId!,
				showHTMLCSSJS: false
			})

			setPathName(res.path!.replace('/', ''))
			previousPathName.current = res.path!.replace('/', '')
		} catch (error) {
			toast.error(
				'Não foi possível recuperar a URL da página, tente novamente',
				errorToast
			)
		}
	}

	function changeContent(content: string, editor: Editor) {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document
		const elementHTML = documentIFrame?.getElementById(
			`${editor.getSelected()?.ccid}`
		)
		elementHTML!.innerHTML = content.replace('"', '').replace('"', '')

		editor.getSelected()!.attributes.components!.models[0].set({
			content: content.replace('"', '').replace('"', '')
		})
	}

	async function hadleClickMainOptions(title: string, editor: Editor) {
		try {
			setLoading(true)

			const content =
				editor.getSelected()?.attributes.components?.models[0].content

			const result = await openAI('mainOptions', title, content!)

			changeContent(result.choices[0].message.content, editor)

			setLoading(false)
		} catch (error) {
			setLoading(false)

			toast.error('Serviço indisponível. Tente mais tarde', errorToast)
		}
	}

	function getText(editor: Editor) {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document
		const component = documentIFrame?.querySelector(
			`#${editor.getSelected()?.ccid}`
		) as HTMLIFrameElement

		return component.innerText
	}

	async function handleClickMentalTrigger(title: string, editor: Editor) {
		try {
			setLoading(true)

			const content = getText(editor)

			const result = await openAI('mentalTrigger', title, content!)

			changeContent(result.choices[0].message.content, editor)

			setLoading(false)
		} catch (error) {
			setLoading(false)

			toast.error('Serviço indisponível. Tente mais tarde', errorToast)
		}
	}

	function handleClickDropdown(open: boolean) {
		if (open) {
			setNewPromptCommand(false)
		}
	}

	async function handleKeyDown(
		event: KeyboardEvent<HTMLInputElement>,
		editor: Editor
	) {
		if (event.key === 'Enter') {
			try {
				setLoading(true)

				const content =
					editor.getSelected()?.attributes.components?.models[0].content

				const result = await openAI(
					'newPromptCommand',
					promptCommandValue,
					content!
				)

				changeContent(result.choices[0].message.content, editor)

				setNewPromptCommand(false)
				setLoading(false)
			} catch (error) {
				setLoading(false)

				toast.error('Serviço indisponível. Tente mais tarde', errorToast)
			}
		}
	}

	async function copyToClipboard() {
		navigator.clipboard
			.writeText(`https://${domainName}/${pathName}`)
			.then(() => {
				toast.success('URL copiada para área de transferência.', successToast)
			})
	}

	async function getDomainName() {
		try {
			if (currentFunnel.domain?.domainName) {
				setDomainName(currentFunnel.domain.domainName)
			} else {
				const res = await getFunnelByID(currentFunnel._id!)

				setDomainName(res?.domain?.domainName)
			}
		} catch (error) {
			toast.error('Não foi possível recuperar o domínio.')
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('@upfunnels-access-token:1.0')

		if (token) {
			const payload = decodeJwt(token)

			if (payload) {
				localStorage.setItem('role', payload.role as string)
			}
		}

		if (upfunnels.state.state.from === 'funnel') {
			getPage()
			getDomainName()
		}
	}, [])

	return (
		<S.MainContainer>
			<div className="gjs-pn-panels">
				<div className="container-panel">
					<div className="content-device-basic-actions">
						<div id="panel__devices" />
					</div>

					<div className="content-input-buttons">
						<div className="panel__url">
							{upfunnels.state.state.from === 'funnel' && (
								<TextField
									$fullwidth={true}
									icon={
										<Tooltip
											trigger={
												<div
													style={{
														width: '100%',
														overflow: 'hidden',
														fontSize: '0.875rem',
														height: '100%',
														color: '#d7d5dd',
														paddingRight: '0px'
													}}
												>
													{domainName}/
												</div>
											}
											content={''}
											onClick={copyToClipboard}
										/>
									}
									onChange={handleChange}
									onBlur={handleBlur}
									onKeyDown={handleKeyDownUpdateUrl}
									value={pathName}
								/>
							)}
						</div>

						<div id="panel__basic-actions" />

						<div className="divider"></div>

						<div id="panel__config-page" />

						<div id="panel__buttons" />
					</div>
				</div>
			</div>
			<S.Sidebar>
				{/* {localStorage.getItem('role') === 'admin_upfunnels' && (
					<button onClick={() => setImportTemplateOpen(true)}>Importar</button>
				)} */}
				<div id="sidebarContent" />
			</S.Sidebar>
			<S.Managerbar className="manager-container">
				<div id="titleStyleContent" />

				<div id="styleContent" />
			</S.Managerbar>
			<GJSEditor
				grapesjs={grapesJS}
				onEditor={editorOptions}
				plugins={[
					{
						id: 'grapesjs-custom-code',
						src: 'https://unpkg.com/grapesjs-custom-code',
						options: {
							blockCustomCode: {
								label: 'Código Customizado',
								category: '',
								media: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.52845 15.1139L5.4454 14.7805C5.29729 14.7434 5.24175 14.6508 5.27878 14.5026L9.19442 1.05466C9.24996 0.906468 9.34253 0.850898 9.47213 0.887944L10.5552 1.22137C10.7033 1.25841 10.7588 1.35103 10.7218 1.49922L6.80616 14.9472C6.76913 15.0954 6.67656 15.1509 6.52845 15.1139ZM4.2235 11.7519C4.11242 11.8445 4.00134 11.8445 3.89025 11.7519L0.0579209 8.16763C-0.0531611 8.05649 -0.0531611 7.94535 0.0579209 7.83421L3.89025 4.24994C4.00134 4.15732 4.11242 4.15732 4.2235 4.24994L4.9733 5.0557C5.06587 5.16684 5.05661 5.27798 4.94553 5.38912L2.00186 8.00092L4.94553 10.6127C5.05661 10.7238 5.06587 10.835 4.9733 10.9461L4.2235 11.7519ZM12.1103 11.7519C11.9992 11.8445 11.8882 11.8445 11.7771 11.7519L11.0273 10.9461C10.9347 10.835 10.944 10.7238 11.055 10.6127L13.9987 8.00092L11.055 5.38912C10.944 5.27798 10.9347 5.16684 11.0273 5.0557L11.7771 4.24994C11.8882 4.13879 11.9992 4.13879 12.1103 4.24994L15.9149 7.83421C16.0445 7.94535 16.0445 8.05649 15.9149 8.16763L12.1103 11.7519Z" fill="#444F55"/>
								</svg>`
							},
							buttonLabel: 'Salvar',
							modalTitle: 'Insira seu código'
						}
					}
					/* {
						id: 'grapesjs-tailwind',
						src: 'https://unpkg.com/grapesjs-tailwind'
					} */
				]}
				options={{
					/* selectorManager: {
						escapeName(name) {
							return `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-')
						}
					}, */
					colorPicker: {
						appendTo: 'parent',
						offset: {
							top: 26,
							left: -190
						}
					},
					i18n: {
						locale: 'pt',
						messages: { pt }
					},
					storageManager: {
						type: 'remote',
						autosave: false,
						autoload: true
					},
					width: '100%',
					height: 'auto',
					blockManager: {
						appendTo: '#sidebarContent'
					},
					styleManager: {
						appendTo: '#styleContent'
					},
					deviceManager: {
						devices: [
							{
								name: 'Desktop',
								width: '',
								widthMedia: ''
							},
							{
								name: 'Mobile',
								width: '360px',
								widthMedia: '980px'
							}
						]
					}
				}}
			>
				<WithEditor>
					{/* <ImportTemplateToCanvas
						isOpen={importTemplateOpen}
						onClose={() => setImportTemplateOpen(false)}
					/> */}
					<S.ContainerWriteWithAI id="write-with-ai">
						<DropDownAI
							handleClickDropdown={(open) => handleClickDropdown(open)}
							handleClickAccordion={() => setNewPromptCommand(false)}
							items={[
								{
									icon: <Speech strokeWidth={2} color="#444F55" />,
									title: 'Tornar mais persuasivo'
								},
								{
									icon: <BookHeart strokeWidth={2} color="#444F55" />,
									title: 'Simplificar texto'
								},
								{
									icon: <BookOpenCheck strokeWidth={2} color="#444F55" />,
									title: 'Corrigir Gramática'
								}
							]}
							subItems={mentalTrigger}
							hadleClickMainOptions={(title, editor) =>
								hadleClickMainOptions(title, editor)
							}
							handleClickMentalTrigger={(title, editor) =>
								handleClickMentalTrigger(title, editor)
							}
							handleClickNewPromptCommand={() => setNewPromptCommand(true)}
							newPromptCommand={newPromptCommand}
							onChange={(event) => setPromptCommandValue(event.target.value)}
							value={promptCommandValue}
							onKeyDown={(event, editor) => handleKeyDown(event, editor)}
							loading={loading}
						/>
					</S.ContainerWriteWithAI>
				</WithEditor>
			</GJSEditor>
		</S.MainContainer>
	)
}
