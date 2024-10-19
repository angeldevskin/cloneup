/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, PropertyProps } from 'grapesjs'
import { Property } from '../../../models/editor.model'

export function EditorPropertiesBlock(editor: Editor) {
	function getDefaultValue(type: string, editor: Editor) {
		switch (type) {
			case 'background-color':
				return (
					editor.getSelected()?.rule?.attributes.style?.['background-color'] ??
					'#fff'
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

			case 'border-radius':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['border-radius']?.split('px')?.[0] ?? '0'
				)

			case 'background-img':
				{
					const backgrounImg =
						editor.getSelected()?.rule?.attributes.style?.['background-image']
					if (
						backgrounImg &&
						(backgrounImg.includes('base64') || backgrounImg.includes('https'))
					) {
						const url = backgrounImg.match(/url\(([^)]+)\)/)

						setTimeout(() => {
							const container = document.querySelector(
								'.gjs-sm-property__Image-de-fundo > .gjs-fields > .gjs-sm-file > .gjs-sm-preview-file'
							) as HTMLElement
							const clear = document.querySelector(
								'.gjs-sm-property__Image-de-fundo > .gjs-fields > .gjs-sm-file > .gjs-sm-preview-file > .gjs-sm-preview-file-close'
							) as HTMLElement

							container.style.display = 'block'
							clear.innerHTML = 'Redefinir'
						}, 100)

						return url[1]
					}
				}

				return ''

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
		{
			name: ' ',
			property: 'border-radius',
			type: 'slider',
			default: getDefaultValue('border-radius', editor),
			min: 0,
			max: 100,
			step: 1,
			units: ['px']
		},
		{
			name: ' ',
			property: 'title-cor-texto-icon',
			icon: 'fa fa-image',
			default: getDefaultValue('background-img', editor),
			value: getDefaultValue('background-img', editor)
		},
		{ name: 'Imagem de fundo', property: 'title-cor-texto-back-img' },
		{
			name: 'Image de fundo',
			icon: 'fa fa-image',
			type: 'file',
			default: getDefaultValue('background-img', editor),
			value: getDefaultValue('background-img', editor)
		},
		{ name: 'VISIBILIDADE', property: 'title-visibility-block' },
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

	editor.StyleManager.addType('add-image', {
		create({ props }) {
			const el = document.createElement('div')
			const icon = document.createElement('i')
			icon.className = props.icon || ''
			icon.style.cursor = 'pointer'
			el.appendChild(icon)
			return el
		}
	})

	editor.on('style:property:update', (style) => {
		if (editor.getSelected()?.attributes.tagName === 'div') {
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
			} else if (style.property.attributes.property === 'Image-de-fundo') {
				const clear = document.querySelector(
					'.gjs-sm-property__Image-de-fundo > .gjs-fields > .gjs-sm-file > .gjs-sm-preview-file > .gjs-sm-preview-file-close'
				) as HTMLElement
				clear.innerHTML = 'Redifinir'

				editor.getSelected()?.addStyle({
					'background-image': `url(${style.value})`,
					'background-repeat': 'no-repeat',
					'background-size': 'cover',
					'background-position': 'center'
				})
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
