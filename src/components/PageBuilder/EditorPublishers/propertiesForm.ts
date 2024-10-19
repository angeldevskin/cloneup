/* eslint-disable no-case-declarations */
import { Property } from '../../../models/editor.model'
import { Editor, PropertyProps } from 'grapesjs'
import { fontes } from './fontes'

export function EditorPropertiesForm(editor: Editor) {
	const getButtonText = () => {
		const text = editor.DomComponents.getWrapper()?.find(
			`#${editor.getSelected()?.ccid} > span > button > span`
		)[0]

		return text?.attributes.components?.models?.[0]?.attributes.content
	}

	function getDefaultValue(type: string, editor: Editor) {
		switch (type) {
			case 'position-titles':
				return (
					editor.getSelected()?.rule?.attributes.style?.['position-titles'] ??
					'outside'
				)

			case 'font-size-label':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['font-size-label']?.split('px')[0] ??
					'16'
				)

			case 'height-input':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['height-input']?.split('px')[0] ?? '36'
				)

			case 'background-color-input':
				return (
					editor.getSelected()?.rule?.attributes.style?.[
						'background-color-input'
					] ?? '#fff'
				)

			case 'color':
				return editor.getSelected()?.rule?.attributes.style?.['color'] ?? '#000'

			case 'border-color-input':
				return (
					editor.getSelected()?.rule?.attributes.style?.[
						'border-color-input'
					] ?? 'rgb(163, 186, 198)'
				)

			case 'border-radius-input':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['border-radius-input']?.split('px')[0] ??
					'8'
				)

			case 'font-size-button':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['font-size-button']?.split('px')[0] ??
					'16'
				)

			case 'font-family-form':
				return (
					editor.getSelected()?.rule?.attributes.style?.['font-family-form'] ??
					'Arial'
				)

			case 'background-color-button':
				return (
					editor.getSelected()?.rule?.attributes.style?.[
						'background-color-button'
					] ?? 'rgb(30,136,229)'
				)

			case 'hover-background-color-button':
				return editor.getSelected()?.rule?.attributes.style?.[
					'hover-background-color-button'
				]
				break

			case 'color-text-button':
				return (
					editor.getSelected()?.rule?.attributes.style?.['color-text-button'] ??
					'#fff'
				)

			case 'hover-text-color-button':
				return editor.getSelected()?.rule?.attributes.style?.[
					'hover-text-color-button'
				]
				break

			case 'box-shadow-button':
				return editor.getSelected()?.rule?.attributes.style?.[
					'box-shadow-button'
				]

			case 'border-color-button':
				return editor.getSelected()?.rule?.attributes.style?.[
					'border-color-button'
				]

			case 'border-radius-button':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['border-radius-button']?.split(
							'px'
						)[0] ?? 0
				)

			case 'form-redirect':
				return editor.getSelected()?.getAttributes()['data-form-redirect'] ?? ''

			case 'info':
				setTimeout(() => {
					const inputText = document.querySelector(
						'.gjs-sm-property__info > .gjs-fields > .gjs-field > input'
					) as HTMLElement
					inputText.setAttribute('disabled', 'true')
				}, 100)

				return `#${editor.getSelected()?.getAttributes()['id']}`

			case 'visibility-desktop':
				return (
					editor.getSelected()?.rule?.attributes.style?.[
						'visibility-desktop'
					] ?? true
				)
				break

			case 'visibility-mobile':
				return (
					editor.getSelected()?.rule?.attributes.style?.['visibility-mobile'] ??
					true
				)
		}
	}

	const propertiesForm: Property[] = [
		{
			name: 'POSIÇÃO DOS TÍTULOS',
			property: 'title'
		},
		{
			name: ' ',
			property: 'position-titles',
			type: 'select',
			options: [
				{
					value: 'outside',
					name: 'Fora'
				},
				{
					value: 'inside',
					name: 'Dentro'
				}
			],
			default: getDefaultValue('position-titles', editor)
		},
		{
			name: 'TAMANHO DA FONTE DOS TÍTULOS',
			property: 'title-font-size'
		},
		{
			name: ' ',
			icon: 'fa fa-text-height',
			property: 'font-size-label',
			type: 'slider',
			min: 12,
			max: 32,
			step: 1,
			units: ['px'],
			default: getDefaultValue('font-size-label', editor)
		},
		{
			name: 'ALTURA DOS CAMPOS',
			property: 'title-font-size'
		},
		{
			name: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="13px" width="13px" xmlns="http://www.w3.org/2000/svg">
				<path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z">
				</path>
			</svg>`,
			property: 'height-input',
			type: 'slider',
			default: getDefaultValue('height-input', editor),
			min: 36,
			max: 76,
			step: 1,
			units: ['px']
		},
		{
			name: 'COR DOS CAMPOS',
			property: 'title'
		},
		{
			name: 'Cor de fundo do campo',
			property: 'background-color-input',
			type: 'color',
			default: getDefaultValue('background-color-input', editor)
		},
		{
			name: 'Cor dos textos',
			property: 'color',
			type: 'color',
			default: getDefaultValue('color', editor)
		},
		{
			name: 'Cor da borda do campo',
			property: 'border-color-input',
			type: 'color',
			default: getDefaultValue('border-color-input', editor)
		},
		{
			name: 'BORDAS DOS CAMPOS',
			property: 'title'
		},
		{
			name: ' ',
			property: 'border-radius-input',
			type: 'slider',
			default: getDefaultValue('border-radius-input', editor),
			min: 0,
			max: 100,
			step: 1,
			units: ['px']
		},
		{
			name: 'ESTILOS DE FONTE',
			property: 'title'
		},
		{
			name: 'Tamanho',
			property: 'font-size-button',
			type: 'number',
			defaults: getDefaultValue('font-size-button', editor),
			units: ['px']
		},
		{
			name: 'TIPOGRAFIA',
			property: 'title'
		},
		{
			name: 'Tipo de letra',
			property: 'font-family-form',
			type: 'select',
			defaults: getDefaultValue('font-family-form', editor),
			options: fontes
		},
		{
			name: 'COR DO BOTÃO',
			property: 'title'
		},
		{
			name: 'Cor de fundo do botão',
			property: 'background-color-button',
			type: 'color',
			defaults: getDefaultValue('background-color-button', editor)
		},
		{
			name: 'Fundo do botão no hover',
			property: 'hover-background-color-button',
			type: 'color',
			defaults: getDefaultValue('hover-background-color-button', editor)
		},
		{
			name: 'Cor do texto do botão',
			property: 'color-text-button',
			type: 'color',
			defaults: getDefaultValue('color-text-button', editor)
		},
		{
			name: 'Cor do texto no hover',
			property: 'hover-text-color-button',
			type: 'color',
			defaults: getDefaultValue('hover-text-color-button', editor)
		},
		{
			name: 'EFEITOS DO BOTÃO',
			property: 'title'
		},
		{
			name: 'Sombra',
			property: 'box-shadow-button',
			type: 'color',
			defaults: getDefaultValue('box-shadow-button', editor)
		},
		{
			name: 'Borda',
			property: 'border-color-button',
			type: 'color',
			defaults: getDefaultValue('border-color-button', editor)
		},
		{
			name: 'BORDAS DO BOTÃO',
			property: 'title'
		},
		{
			name: ' ',
			property: 'border-radius-button',
			type: 'slider',
			default: getDefaultValue('border-radius-button', editor),
			min: 0,
			max: 100,
			step: 1,
			units: ['px']
		}
	]

	const propertiesConfigurationForm: Property[] = [
		{
			name: 'Texto do botão',
			property: 'button-text',
			type: 'text',
			defaults: getButtonText()
		},
		{
			name: 'URL de redirecionamento após submissão',
			property: 'form-redirect',
			type: 'text',
			defaults: getDefaultValue('form-redirect', editor)
		},
		{
			name: 'Link para ancoragem (copie o link abaixo e cole no botão)',
			property: 'info',
			type: 'text',
			value: getDefaultValue('info', editor),
			default: getDefaultValue('info', editor)
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
		properties: propertiesConfigurationForm as PropertyProps[]
	})

	editor.StyleManager.addSector('estilos', {
		name: 'ESTILOS',
		open: false,
		properties: propertiesForm as PropertyProps[]
	})

	editor.on('style:property:update', (style) => {
		if (editor.getSelected()?.attributes.type === 'form') {
			const inputElements = editor.DomComponents.getWrapper()?.find(
				`#${editor.getSelected()?.ccid} > span > input`
			)
			const labelElements = editor.DomComponents.getWrapper()?.find(
				`#${editor.getSelected()?.ccid} > span > label`
			)
			const button = editor.DomComponents.getWrapper()?.find(
				`#${editor.getSelected()?.ccid} > span > button`
			)
			const text = editor.DomComponents.getWrapper()?.find(
				`#${editor.getSelected()?.ccid} > span > button > span`
			)[0]

			button?.forEach((element) => element.addStyle({ 'font-size': '13.3px' }))
			text?.set({
				removable: false,
				copyable: false,
				badgable: false,
				draggable: false,
				layerable: false,
				resizable: false,
				stylable: false,
				selectable: false
			})

			const positonTitles = editor.StyleManager.getProperty(
				'estilos',
				'position-titles'
			)?.attributes
			const fontSizeLabel = editor.StyleManager.getProperty(
				'estilos',
				'font-size-label'
			)?.attributes.value

			switch (style.property.attributes.property) {
				case 'position-titles':
					if (style.value === 'outside') {
						const propertyTitle = document.querySelector(
							'.gjs-sm-property.gjs-sm-base.gjs-sm-property__title-font-size'
						)
						const propertyFontSize = document.querySelector(
							'.gjs-sm-property.gjs-sm-slider.gjs-sm-property__font-size-label'
						)

						propertyTitle?.classList.remove('d-none')
						propertyFontSize?.classList.remove('d-none')

						labelElements?.forEach((element) =>
							element.addStyle({ display: 'block' })
						)
						inputElements?.forEach((element) =>
							element.addAttributes({
								placeholder: ''
							})
						)
					} else if (style.value === 'inside') {
						const propertyTitle = document.querySelector(
							'.gjs-sm-property.gjs-sm-base.gjs-sm-property__title-font-size'
						)
						const propertyFontSize = document.querySelector(
							'.gjs-sm-property.gjs-sm-slider.gjs-sm-property__font-size-label'
						)

						propertyTitle?.classList.add('d-none')
						propertyFontSize?.classList.add('d-none')

						labelElements?.forEach((element) =>
							element.addStyle({
								display: 'none',
								'font-size': `${fontSizeLabel}px`
							})
						)
						inputElements?.forEach((element, index) =>
							element.addAttributes({
								placeholder: `${labelElements?.[index].attributes.components?.models[0].attributes.content}`
							})
						)
					}
					break
				case 'font-size-label':
					if (
						positonTitles?.value === 'outside' ||
						positonTitles?.default === 'outside'
					) {
						labelElements?.forEach((element) =>
							element.addStyle({
								'font-size': `${style.value}`
							})
						)
					}
					break
				case 'height-input':
					inputElements?.forEach((element) =>
						element.addStyle({
							height: style.value === '' ? '36px' : `${style.value}`
						})
					)
					break
				case 'background-color-input':
					style.value !== '' &&
						inputElements?.forEach((element) =>
							element.addStyle({ 'background-color': style.value })
						)
					break
				case 'border-color-input':
					style.value !== '' &&
						inputElements?.forEach((element) =>
							element.addStyle({ 'border-color': style.value })
						)
					break
				case 'border-radius-input':
					inputElements?.forEach((element) =>
						element.addStyle({
							'border-radius': style.value === '' ? '8px' : `${style.value}`
						})
					)
					break
				case 'font-size-button':
					style.value !== '' &&
						labelElements?.forEach((element) =>
							element.addStyle({
								'font-size': style.value
							})
						)
					style.value !== '' &&
						text?.addStyle({ 'font-size': `${style.value}` })
					break
				case 'font-family-form':
					style.value !== '' &&
						labelElements?.forEach((element) =>
							element.addStyle({
								'font-family': style.value
							})
						)
					style.value !== '' &&
						text?.addStyle({
							'font-family': style.value
						})
					break
				case 'background-color-button':
					button?.forEach((element) =>
						element.addStyle({
							'background-color':
								style.value === '' ? 'rgb(30, 136, 229)' : style.value
						})
					)
					break
				case 'hover-background-color-button':
					style.value !== '' &&
						editor.addStyle(
							`#${button?.[0].ccid}:hover{background-color: ${style.value}}`
						)
					break
				case 'color-text-button':
					text?.addStyle({
						color: style.value === '' ? '#fff' : style.value
					})
					break
				case 'hover-text-color-button':
					style.value !== '' &&
						editor.addStyle(
							`#${button?.[0].ccid}:hover > #${text?.ccid}{color: ${style.value}}`
						)
					break
				case 'box-shadow-button':
					style.value !== '' &&
						button?.forEach((element) =>
							element.addStyle({
								'box-shadow': `${style.value} 0px 1px 3px`
							})
						)
					break
				case 'border-color-button':
					button?.forEach((element) =>
						element.addStyle({
							border: style.value === '' ? 'none' : `2px solid ${style.value}`
						})
					)
					break
				case 'border-radius-button':
					style.value !== '' &&
						button?.forEach((element) =>
							element.addStyle({ 'border-radius': style.value })
						)
					break
				case 'button-text':
					const content = style.value

					button?.forEach((element) => {
						if (
							element &&
							element.attributes &&
							element.attributes.components &&
							element.attributes.components.models &&
							element.attributes.components.models[0] &&
							element.attributes.components.models[0].attributes
						) {
							const iFrames = document.getElementsByClassName('gjs-frame')

							if (iFrames.length > 0) {
								const iFrame = iFrames[0] as HTMLIFrameElement
								const documentIFrame = iFrame.contentWindow?.document
								let elementHTML

								if (button?.[0].ccid) {
									elementHTML = documentIFrame?.getElementById(
										button?.[0].attributes.components!.models[0].ccid
									)
								}

								if (elementHTML) {
									elementHTML.innerHTML =
										content === '' ? elementHTML?.innerText : content
								}
							}

							text?.attributes.components!.models[0].set({
								content: content === '' ? 'Enviar agora mesmo' : content
							})
						}
					})
					break
				case 'form-redirect':
					editor
						.getSelected()
						?.addAttributes({ 'data-form-redirect': style.value })
					break
				case 'visibility-desktop':
					editor.addStyle(`@media (min-width: 361px) and (min-width: 1920px) {
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
					break
				case 'visibility-mobile':
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
					break
			}
		}
	})
}
