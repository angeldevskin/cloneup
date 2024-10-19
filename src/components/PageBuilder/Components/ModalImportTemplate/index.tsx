import { useState } from 'react'
import { useEditor } from '@grapesjs/react'
import { Button } from '../../../Button'
import { DialogRoot } from '../../../Dialog'
import * as S from './styles'

export function ImportTemplateToCanvas({
	isOpen,
	onClose
}: {
	isOpen: boolean
	onClose: () => void
}) {
	const editor = useEditor()

	const [htmlTemplate, setHtmlTemplate] = useState('')
	const [cssTemplate, setCssTemplate] = useState('')

	function setImports() {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document
		const mainWrapper = documentIFrame?.querySelector(
			'[custom-id="main-wrapper"]'
		) as HTMLIFrameElement

		mainWrapper.style.background = ''

		editor.setComponents(htmlTemplate)
		const pageId = localStorage.getItem('pageId')!
		const funnelId = localStorage.getItem('funnelId')!

		editor.getComponents().add({
			content: `
			<span id="funnelId" style="display: none;">${funnelId}</span>
			<span id="pageId" style="display: none;">${pageId}</span>
		`,
			style: {
				display: 'none'
			}
		})
		editor.setStyle(cssTemplate)
		editor.getWrapper()?.addStyle({
			margin: '0 auto'
		})

		const configPage = document.querySelector(
			'.config-page'
		) as HTMLInputElement
		configPage.style.display = 'none'

		setCssTemplate('')
		setHtmlTemplate('')
	}

	return (
		<>
			<DialogRoot
				isOpen={isOpen}
				setIsOpen={() => onClose()}
				title="Importar template"
				maxwidth={1000}
			>
				<S.ImportTemplateWrapper>
					<div className="content">
						<label htmlFor="html">HTML</label>
						<textarea
							name="html"
							id="html"
							value={htmlTemplate}
							onChange={(e) => setHtmlTemplate(e.target.value)}
							placeholder="Cole seu HTML aqui..."
							required
						/>
					</div>
					<div className="content">
						<label htmlFor="css">CSS</label>
						<textarea
							name="css"
							id="css"
							value={cssTemplate}
							onChange={(e) => setCssTemplate(e.target.value)}
							placeholder="Cole seu CSS aqui..."
						/>
					</div>
					<div>
						<Button
							onClick={() => {
								setImports()
								onClose()
							}}
							disabled={!htmlTemplate || !cssTemplate}
						>
							Importar
						</Button>
					</div>
				</S.ImportTemplateWrapper>
			</DialogRoot>
		</>
	)
}
