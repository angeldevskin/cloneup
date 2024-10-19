/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, PropertyProps } from 'grapesjs'
import { Property } from '../../../models/editor.model'

export function EditorPropertiesImage(editor: Editor) {
	function getDefaultValue(type: string, editor: Editor) {
		switch (type) {
			case 'opacity':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['opacity']?.split('px')[0] ?? 100
				)

			case 'tone-effect':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['tone-effect']?.split('deg')[0] ?? '0'
				)

			case 'saturation-effect':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['saturation-effect']?.split('%')[0] ??
					100
				)

			case 'brightness-effect':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['brightness-effect']?.split('%')[0] ??
					100
				)

			case 'contrast-effect':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['contrast-effect']?.split('%')[0] ?? 100
				)

			case 'reverse-effect':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['reverse-effect']?.split('%')[0] ?? '0'
				)

			case 'sepia-effect':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['sepia-effect']?.split('%')[0] ?? '0'
				)

			case 'blur-effect':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['blur-effect']?.split('%')[0] ?? '0'
				)

			case 'shadesGray-effect':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['shadesGray-effect']?.split('%')[0] ??
					'0'
				)

			case 'border-color':
				return editor.getSelected()?.rule?.attributes.style?.['border-color']

			case 'system-border':
				return editor.getSelected()?.rule?.attributes.style?.['system-border']

			case 'system-border-type':
				return editor.getSelected()?.rule?.attributes.style?.[
					'system-border-type'
				]

			case 'border-radius':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['border-radius']?.split('px')[0] ?? 0
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

	const propertiesImage: Property[] = [
		{ name: 'EFEITOS', property: 'title' },
		{
			property: 'opacity',
			type: 'slider',
			units: ['%'],
			default: getDefaultValue('opacity', editor),
			min: 0,
			max: 100,
			step: 1
		},
		{
			name: 'Tonalidade',
			property: 'tone-effect',
			type: 'slider',
			units: ['deg'],
			default: getDefaultValue('tone-effect', editor),
			min: 0,
			max: 360,
			step: 1
		},
		{
			name: 'Saturação',
			label: 'saturation',
			property: 'saturation-effect',
			type: 'slider',
			min: 0,
			max: 200,
			default: getDefaultValue('saturation-effect', editor),
			step: 1,
			units: ['%']
		},
		{
			name: 'Brilho',
			property: 'brightness-effect',
			label: 'brightness',
			type: 'slider',
			min: 0,
			max: 200,
			default: getDefaultValue('brightness-effect', editor),
			step: 1,
			units: ['%']
		},
		{
			name: 'Contraste',
			property: 'contrast-effect',
			label: 'contrast',
			type: 'slider',
			min: 0,
			max: 200,
			default: getDefaultValue('contrast-effect', editor),
			step: 1,
			units: ['%']
		},
		{
			name: 'Inverter',
			property: 'reverse-effect',
			label: 'contrast',
			type: 'slider',
			min: 0,
			max: 100,
			default: getDefaultValue('reverse-effect', editor),
			step: 1,
			units: ['%']
		},
		{
			name: 'Sépia',
			property: 'sepia-effect',
			label: 'sepia',
			type: 'slider',
			min: 0,
			max: 100,
			default: getDefaultValue('sepia-effect', editor),
			step: 1,
			units: ['%']
		},
		{
			name: 'Desfoque',
			property: 'blur-effect',
			label: 'blur',
			type: 'slider',
			min: 0,
			max: 50,
			default: getDefaultValue('blur-effect', editor),
			step: 1,
			units: ['px']
		},
		{
			name: 'Tons de cinza',
			property: 'shadesGray-effect',
			label: 'shadesGray',
			type: 'slider',
			min: 0,
			max: 100,
			default: getDefaultValue('shadesGray-effect', editor),
			step: 1,
			units: ['px']
		},
		{ name: 'BORDAS', property: 'title' },
		{
			name: 'Cor da Borda',
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
		}
	]

	const propertiesConfigurationImage: Property[] = [
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

	editor.StyleManager.addSector('editor', {
		name: 'EDITOR',
		open: true,
		properties: propertiesImage as PropertyProps[]
	})

	editor.StyleManager.addSector('configurar', {
		name: 'CONFIGURAR',
		open: false,
		properties: propertiesConfigurationImage as PropertyProps[]
	})

	editor.on('style:property:update', (style) => {
		if (editor.getSelected()?.attributes.type === 'image') {
			if (style.property.attributes.property.includes('effect')) {
				const toneValue =
					editor.StyleManager.getProperty('editor', 'tone-effect')?.attributes
						.value === ''
						? `${editor.StyleManager.getProperty('editor', 'tone-effect')
								?.attributes.default}deg`
						: `${editor.StyleManager.getProperty('editor', 'tone-effect')
								?.attributes.value}deg`

				const saturationValue =
					editor.StyleManager.getProperty('editor', 'saturation-effect')
						?.attributes.value === ''
						? `${editor.StyleManager.getProperty('editor', 'saturation-effect')
								?.attributes.default}%`
						: `${editor.StyleManager.getProperty('editor', 'saturation-effect')
								?.attributes.value}%`

				const brightnessValue =
					editor.StyleManager.getProperty('editor', 'brightness-effect')
						?.attributes.value === ''
						? `${editor.StyleManager.getProperty('editor', 'brightness-effect')
								?.attributes.default}%`
						: `${editor.StyleManager.getProperty('editor', 'brightness-effect')
								?.attributes.value}%`

				const contrastValue =
					editor.StyleManager.getProperty('editor', 'contrast-effect')
						?.attributes.value === ''
						? `${editor.StyleManager.getProperty('editor', 'contrast-effect')
								?.attributes.default}%`
						: `${editor.StyleManager.getProperty('editor', 'contrast-effect')
								?.attributes.value}%`

				const reverseValue =
					editor.StyleManager.getProperty('editor', 'reverse-effect')
						?.attributes.value === ''
						? `${editor.StyleManager.getProperty('editor', 'reverse-effect')
								?.attributes.default}%`
						: `${editor.StyleManager.getProperty('editor', 'reverse-effect')
								?.attributes.value}%`

				const sepiaValue =
					editor.StyleManager.getProperty('editor', 'sepia-effect')?.attributes
						.value === ''
						? `${editor.StyleManager.getProperty('editor', 'sepia-effect')
								?.attributes.default}%`
						: `${editor.StyleManager.getProperty('editor', 'sepia-effect')
								?.attributes.value}%`

				const blurValue =
					editor.StyleManager.getProperty('editor', 'blur-effect')?.attributes
						.value === ''
						? `${editor.StyleManager.getProperty('editor', 'blur-effect')
								?.attributes.default}px`
						: `${editor.StyleManager.getProperty('editor', 'blur-effect')
								?.attributes.value}px`

				const shadesGrayValue =
					editor.StyleManager.getProperty('editor', 'shadesGray-effect')
						?.attributes.value === ''
						? `${editor.StyleManager.getProperty('editor', 'shadesGray-effect')
								?.attributes.default}`
						: +editor.StyleManager.getProperty('editor', 'shadesGray-effect')
								?.attributes.value / 100

				editor.getSelected()?.addStyle({
					filter: `hue-rotate(${toneValue}) saturate(${saturationValue}) brightness(${brightnessValue}) contrast(${contrastValue}) invert(${reverseValue}) sepia(${sepiaValue}) blur(${blurValue}) grayscale(${shadesGrayValue})`
				})
			} else if (style.property.attributes.property.includes('border')) {
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

				editor.getSelected()?.addStyle({
					border: `${
						borderWidth?.value === ''
							? `${borderWidth.default}px`
							: `${borderWidth?.value}px`
					} ${
						borderType?.value === '' ? borderType.default : borderType?.value
					} ${
						borderColor?.value === '' ? borderColor.default : borderColor?.value
					}`
				})
			} else if (style.property.attributes.property === 'height') {
				if (
					editor.getSelected()?.attributes.attributes?.src.includes('https')
				) {
					const iFrames = document.getElementsByClassName('gjs-frame')
					const iFrame = iFrames[0] as HTMLIFrameElement
					const documentIFrame = iFrame.contentWindow?.document
					const component = documentIFrame?.querySelector(
						`#${editor.getSelected()?.ccid}`
					) as HTMLElement

					component.style.width = `${style.to.value * 1.77}px`
				}
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
