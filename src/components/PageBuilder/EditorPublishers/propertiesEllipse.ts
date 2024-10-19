import { Editor, PropertyProps } from 'grapesjs'
import { Property } from '../../../models/editor.model'

export function EditorPropertiesEllipse(editor: Editor) {
	function getDefaultValue(type: string, editor: Editor) {
		switch (type) {
			case 'background-color':
				return (
					editor.getSelected()?.rule?.attributes.style?.['background-color'] ??
					'#e3e3e3'
				)

			case 'border-color':
				return editor.getSelected()?.rule?.attributes.style?.['border-color']

			case 'system-border':
				return editor.getSelected()?.rule?.attributes.style?.['system-border']

			case 'system-border-type':
				return (
					editor.getSelected()?.rule?.attributes.style?.[
						'system-border-type'
					] ?? 'solid'
				)

			case 'visibility-desktop':
				return (
					editor.getSelected()?.rule?.attributes.style?.[
						'visibility-desktop'
					] ?? true
				)

			case 'visibility-mobile':
				return (
					editor.getSelected()?.rule?.attributes.style?.['visibility-mobile'] ??
					true
				)
		}
	}

	const propertiesBackground: Property[] = [
		{ name: 'BÁSICOS', property: 'title' },
		{
			property: 'background-color',
			type: 'color',
			default: getDefaultValue('background-color', editor)
		},
		{
			name: 'Cor da borda',
			property: 'border-color',
			type: 'color',
			default: getDefaultValue('border-color', editor)
		},
		{
			name: 'Largura da Borda',
			property: 'system-border',
			default: getDefaultValue('system-border', editor)
		},
		{
			name: 'Tipo de Borda',
			property: 'system-border-type',
			type: 'select',
			default: getDefaultValue('system-border-type', editor),
			list: [
				{ value: 'solid', name: 'Sólido' },
				{ value: 'dotted', name: 'Pontos' },
				{ value: 'dashed', name: 'Tracejada' },
				{ value: 'double', name: 'Dupla' },
				{ value: 'groove', name: 'Esculpida' },
				{ value: 'ridge', name: 'Saindo' },
				{ value: 'inset', name: 'Entalhada' },
				{ value: 'outset', name: 'Relação' }
			]
		},
		{ name: 'VISIBILIDADE', property: 'title-visibility-geometric-shapes' },
		{
			name: 'Mostrar no Desktop',
			property: 'visibility-desktop',
			type: 'switch',
			defaults: getDefaultValue('visibility-desktop', editor)
		},
		{
			name: 'Mostrar no Mobile',
			property: 'visibility-mobile',
			type: 'switch',
			defaults: getDefaultValue('visibility-mobile', editor)
		}
	]

	editor.StyleManager.addSector('editor', {
		name: 'EDITOR',
		open: true,
		properties: propertiesBackground as PropertyProps[]
	})

	editor.on('style:property:update', (style) => {
		if (
			editor.getSelected()?.attributes.attributes?.['data-custom-id'] ===
			'ellipse'
		) {
			if (style.property.attributes.property.includes('border')) {
				const borderColor = editor.StyleManager.getProperty(
					'editor',
					'border-color'
				)?.attributes
				const borderWidth = editor.StyleManager.getProperty(
					'editor',
					'system-border'
				)?.attributes
				const borderType = editor.StyleManager.getProperty(
					'editor',
					'system-border-type'
				)?.attributes

				if (borderColor || borderWidth || borderType) {
					editor.getSelected()?.addStyle({
						border: `${
							borderWidth?.value === ''
								? `${borderWidth.default}px`
								: `${borderWidth?.value}px`
						} ${
							borderType?.value === '' ? borderType.default : borderType?.value
						} ${
							borderColor?.value === ''
								? borderColor.default
								: borderColor?.value
						}`
					})
				} else {
					const borderColor =
						editor.getSelected()?.rule?.attributes.style?.['border-color']
					const systemBorder =
						editor.getSelected()?.rule?.attributes.style?.['system-border']
					const systemBorderType =
						editor.getSelected()?.rule?.attributes.style?.['system-border-type']

					editor.getSelected()?.addStyle({
						border: `${systemBorder}px ${
							systemBorderType ?? 'solid'
						} ${borderColor}`
					})
				}
			} else if (style.property.attributes.property === 'height') {
				const iFrames = document.getElementsByClassName('gjs-frame')
				const iFrame = iFrames[0] as HTMLIFrameElement
				const documentIFrame = iFrame.contentWindow?.document
				const component = documentIFrame?.querySelector(
					`#${editor.getSelected()?.ccid}`
				) as HTMLElement

				component.style.width = `${style.to.value * 1}px`
			} else if (style.property.attributes.property === 'visibility-desktop') {
				editor.addStyle(`@media (min-width: 361px) and (max-width: 1920px) {
					#${editor.getSelected()?.ccid} {
						display: ${
							style.value === ''
								? 'block'
								: style.value === 'true'
								  ? 'block'
								  : 'none'
						};
					}
				}`)
			} else if (style.property.attributes.property === 'visibility-mobile') {
				editor.addStyle(`@media (max-width: 360px) {
					#${editor.getSelected()?.ccid} {
						display: ${
							style.value === ''
								? 'block'
								: style.value === 'true'
								  ? 'block'
								  : 'none'
						};
					}
				}`)
			}
		}
	})
}
