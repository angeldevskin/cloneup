/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, PropertyProps } from 'grapesjs'
import { Property } from '../../../models/editor.model'

export function EditorPropertiesContentWrapper(editor: Editor) {
	const getDefaultValue = () => {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document
		const columnWidth = documentIFrame?.querySelector(
			'#content-width'
		) as HTMLIFrameElement

		return (columnWidth.attributes as any)?.['custom-width'].value
	}

	const propertiesContentWrapper: Property[] = [
		{
			name: 'Largura da página',
			property: 'width',
			type: 'select',
			default: getDefaultValue(),
			list: [
				{ value: '1200px', name: '1200px' },
				{ value: '960px', name: '960px' },
				{ value: '764px', name: '764px' }
			]
		}
	]

	editor.StyleManager.addSector('configuracao-pagina', {
		name: 'Configuração da página',
		open: true,
		properties: propertiesContentWrapper as PropertyProps[]
	})

	editor.on('style:property:update', (style) => {
		if (!editor.getSelected()?.ccid) {
			const iFrames = document.getElementsByClassName('gjs-frame')
			const iFrame = iFrames[0] as HTMLIFrameElement
			const documentIFrame = iFrame.contentWindow?.document
			const columnWidth = documentIFrame?.querySelector(
				'#content-width'
			) as HTMLIFrameElement

			columnWidth.setAttribute('custom-width', style.value)

			const containerColumn = editor.DomComponents.getWrapper()?.find(
				`[data-custom-id="container-column"]`
			)

			if (containerColumn) {
				containerColumn.forEach((item) =>
					item.addStyle({
						'max-width': style.value
					})
				)
			}

			const oneColumn = editor.DomComponents.getWrapper()?.find(
				`[data-custom-id="column-1-1"]`
			)

			if (oneColumn) {
				oneColumn.forEach((item) =>
					item.addStyle({
						'max-width': style.value
					})
				)
			}
		}
	})
}
