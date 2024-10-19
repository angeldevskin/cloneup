/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, PropertyProps } from 'grapesjs'
import { Property } from '../../../models/editor.model'

export function EditorPropertiesButton(editor: Editor) {
	function getDefaultValue(type: string, editor: Editor) {
		switch (type) {
			case 'background-color':
				return editor.getSelected()?.rule?.attributes.style?.[
					'background-color'
				]

			case 'hover-background-color':
				return editor.getSelected()?.rule?.attributes.style?.[
					'hover-background-color'
				]

			case 'color':
				return editor.getSelected()?.rule?.attributes.style?.['color']

			case 'hover-text-color':
				return editor.getSelected()?.rule?.attributes.style?.[
					'hover-text-color'
				]

			case 'font-size':
				return editor
					.getSelected()
					?.rule?.attributes.style?.['font-size']?.split('px')[0]

			case 'font-family':
				return editor.getSelected()?.rule?.attributes.style?.['font-family']

			case 'box-shadow-custom':
				return editor.getSelected()?.rule?.attributes.style?.[
					'box-shadow-custom'
				]

			case 'border-radius':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['border-radius']?.split('px')[0] ?? 0
				)

			case 'button-text':
				return editor.getSelected()?.view?.$el[0].textContent

			case 'target':
				return editor.getSelected()?.rule?.attributes.style?.['target']

			case 'href':
				return editor.getSelected()?.rule?.attributes.style?.['href']

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

	const propertiesButton: Property[] = [
		{ name: 'CORES DE FUNDO', property: 'title' },
		{
			property: 'background-color',
			type: 'color',
			default: getDefaultValue('background-color', editor)
		},
		{
			name: 'Cor de fundo em hover',
			property: 'hover-background-color',
			type: 'color',
			default: getDefaultValue('hover-background-color', editor)
		},
		{ name: 'CORES DE TEXTO', property: 'title' },
		{
			property: 'color',
			type: 'color',
			default: getDefaultValue('color', editor)
		},
		{
			name: 'Cor em hover',
			property: 'hover-text-color',
			type: 'color',
			default: getDefaultValue('hover-text-color', editor)
		},
		{ name: 'TIPOGRAFIA', property: 'title' },
		{
			name: 'Tamanho da fonte',
			property: 'font-size',
			type: 'integer',
			default: getDefaultValue('font-size', editor),
			units: ['px']
		},
		{
			name: 'Família',
			property: 'font-family',
			type: 'select',
			default: getDefaultValue('font-family', editor),
			options: [
				{ value: 'Arial', name: 'Arial' },
				{ value: 'Helvetica', name: 'Helvetica' },
				{ value: 'Verdana', name: 'Verdana' },
				{ value: 'Tahoma', name: 'Tahoma' },
				{ value: 'Calibri', name: 'Calibri' },
				{ value: 'Geneva', name: 'Geneva' },
				{ value: 'Trebuchet MS', name: 'Trebuchet MS' },
				{ value: 'Times New Roman', name: 'Times New Roman' },
				{ value: 'Georgia', name: 'Georgia' }
			]
		},
		{
			name: 'EFEITOS',
			property: 'title'
		},
		{
			name: 'Sombra personalizada',
			property: 'box-shadow-custom',
			type: 'color',
			default: getDefaultValue('box-shadow-custom', editor)
		},
		{
			name: 'Radio da borda',
			property: 'border-radius',
			type: 'slider',
			default: getDefaultValue('border-radius', editor),
			min: 0,
			max: 100,
			step: 1,
			units: ['px']
		}
	]

	const propertiesConfigurationButton: Property[] = [
		{
			name: 'Texto do botão',
			property: 'button-text',
			type: 'text',
			defaults: getDefaultValue('button-text', editor)
		},
		{
			name: 'Abertura de link',
			label: 'Abertura de link',
			property: 'target',
			type: 'select',
			default: getDefaultValue('target', editor),
			options: [
				{
					name: 'Abrir na página atual',
					value: '_self'
				},
				{
					name: 'Abrir em uma nova guia',
					value: '_blank'
				}
			]
		},
		{
			name: 'Preencha a URL',
			label: 'Preencha a URL',
			property: 'href',
			default: getDefaultValue('href', editor),
			type: 'text'
		},
		{ name: 'VISIBILIDADE', property: 'title' },
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

	editor.StyleManager.addSector('configurar', {
		name: 'CONFIGURAR',
		open: true,
		properties: propertiesConfigurationButton as PropertyProps[]
	})

	editor.StyleManager.addSector('estilos', {
		name: 'ESTILOS',
		open: false,
		properties: propertiesButton as PropertyProps[]
	})

	editor.on('style:property:update', (style) => {
		if (editor.getSelected()?.attributes.type === 'link') {
			if (style.property.attributes.property === 'hover-text-color') {
				editor.addStyle(
					`#${editor.getSelected()?.ccid}:hover{color: ${style.value}}`
				)
			} else if (
				style.property.attributes.property === 'hover-background-color'
			) {
				editor.addStyle(
					`#${editor.getSelected()?.ccid}:hover{background-color: ${
						style.value
					}}`
				)
			} else if (style.property.attributes.property === 'button-text') {
				const selected = editor.getSelected()
				const content = style.value

				if (
					selected &&
					selected.attributes &&
					selected.attributes.components &&
					selected.attributes.components.models &&
					selected.attributes.components.models.length > 0
				) {
					const iFrames = document.getElementsByClassName('gjs-frame')

					if (iFrames.length > 0) {
						const iFrame = iFrames[0] as HTMLIFrameElement
						const documentIFrame = iFrame.contentWindow?.document
						const elementHTML = documentIFrame?.getElementById(selected.ccid)

						if (elementHTML) {
							elementHTML.innerHTML = content === '' ? 'Botão' : content
						}
					}

					selected.attributes.components.models[0].set({
						content: content === '' ? 'Botão' : content
					})
				}
			} else if (
				style.property.attributes.property === 'target' ||
				style.property.attributes.property === 'href'
			) {
				const targetValue = editor.StyleManager.getProperty(
					'configurar',
					'target'
				)?.attributes.value
				const targetDefault = editor.StyleManager.getProperty(
					'configurar',
					'target'
				)?.attributes.default
				const href = editor.StyleManager.getProperty('configurar', 'href')
					?.attributes.value

				editor.getSelected()?.setAttributes({
					target: targetValue ? targetValue : targetDefault,
					href: href
				})
			} else if (style.property.attributes.property === 'box-shadow-custom') {
				editor.getSelected()?.addStyle({
					'box-shadow': style.value ? `${style.value} 0px 1px 3px` : 'none'
				})
			} else if (style.property.attributes.property === 'visibility-desktop') {
				editor.addStyle(`@media (min-width: 361px) and (min-width: 1920px) {
					#${editor.getSelected()?.ccid} {
						display: ${
							style.value === ''
								? 'flex'
								: style.value === 'true'
								  ? 'flex'
								  : 'none'
						};
					}
				}`)
			} else if (style.property.attributes.property === 'visibility-mobile') {
				editor.addStyle(`@media (max-width: 360px) {
					#${editor.getSelected()?.ccid} {
						display: ${
							style.value === ''
								? 'flex'
								: style.value === 'true'
								  ? 'flex'
								  : 'none'
						};
					}
				}`)
			}
		}
	})
}
