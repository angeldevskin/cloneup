/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, PropertyProps } from 'grapesjs'
import { Property } from '../../../models/editor.model'

export function EditorPropertiesVideo(editor: Editor) {
	function getDefaultValue(type: string, editor: Editor) {
		switch (type) {
			case 'border-color':
				return editor.getSelected()?.rule?.attributes.style?.['border-color']

			case 'system-border':
				return editor.getSelected()?.rule?.attributes.style?.['system-border']

			case 'system-border-type':
				return editor.getSelected()?.rule?.attributes.style?.[
					'system-border-type'
				]

			case 'border-radius':
				return editor.getSelected()?.rule?.attributes.style?.['border-radius']
					? editor
							.getSelected()
							?.rule?.attributes.style?.['border-radius'].split('px')[0]
					: 0

			case 'link-video':
				if (editor.getSelected()?.attributes.provider === 'yt') {
					return `https://www.youtube.com/watch?v=${editor.getSelected()
						?.attributes.videoId}`
				} else {
					return `https://vimeo.com/${editor.getSelected()?.attributes.videoId}`
				}

			case 'autoplay':
				return editor.getSelected()?.attributes.autoplay

			case 'controls':
				return editor.getSelected()?.attributes.controls

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

	const propertiesVideo: Property[] = [
		{ name: 'BORDAS', property: 'title' },
		{
			name: 'Cor da Borda',
			property: 'border-color',
			label: 'Base type',
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

	const propertiesConfigurationVideo: Property[] = [
		{ name: 'LINK DO VÍDEO', property: 'title' },
		{
			name: 'Link do vídeo (YouTube ou Vimeo)',
			property: 'link-video',
			default: getDefaultValue('link-video', editor)
		},
		{ name: 'CONFIGURAÇÕES DO VÍDEO', property: 'title' },
		{
			name: 'Autoplay',
			property: 'autoplay',
			type: 'switch',
			default: getDefaultValue('autoplay', editor)
		},
		{
			name: 'Barra de progresso',
			property: 'controls',
			type: 'switch',
			default: getDefaultValue('controls', editor)
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
		properties: propertiesConfigurationVideo as PropertyProps[]
	})

	editor.StyleManager.addSector('estilos', {
		name: 'ESTILOS',
		open: false,
		properties: propertiesVideo as PropertyProps[]
	})

	editor.on('style:property:update', async (style) => {
		if (editor.getSelected()?.attributes.tagName === 'iframe') {
			if (style.property.attributes.property === 'autoplay') {
				editor
					.getSelected()
					?.set('autoplay', style.value === 'true' ? true : false)
			} else if (style.property.attributes.property === 'controls') {
				editor
					.getSelected()
					?.set('controls', style.value === 'true' ? true : false)
			} else if (style.property.attributes.property === 'link-video') {
				if (
					style.value.includes('embed/') ||
					style.value.includes('watch?v=') ||
					style.value.includes('youtu.be/')
				) {
					const valueId = style.value.includes('embed/')
						? style.value.split('embed/')
						: style.value.includes('watch?v=')
						  ? style.value.split('watch?v=')
						  : style.value.split('youtu.be/')

					editor.getSelected()?.set('provider', 'yt')
					editor.getSelected()?.set('videoId', valueId[1])
				} else if (
					style.value.includes('player.vimeo.com/video/') ||
					style.value.includes('vimeo.com/')
				) {
					const valueId = style.value.includes('player.vimeo.com/video/')
						? style.value.split('video/')
						: style.value.split('.com/')

					editor.getSelected()?.set('provider', 'vi')
					editor.getSelected()?.set('videoId', `${valueId[1]}`)
				}
			} else if (style.property.attributes.property.includes('border')) {
				const borderColor = editor.StyleManager.getProperty(
					'estilos',
					'border-color'
				)?.attributes
				const borderWidth = editor.StyleManager.getProperty(
					'estilos',
					'system-border'
				)?.attributes
				const borderType = editor.StyleManager.getProperty(
					'estilos',
					'system-border-type'
				)?.attributes

				editor.getSelected()?.addStyle({
					border: `${
						borderWidth?.value === '' ? `0px` : `${borderWidth?.value}px`
					} ${borderType?.value === '' ? 'solid' : borderType?.value} ${
						borderColor?.value === '' ? '#000' : borderColor?.value
					}`
				})
			} else if (style.property.attributes.property === 'height') {
				const iFrames = document.getElementsByClassName('gjs-frame')
				const iFrame = iFrames[0] as HTMLIFrameElement
				const documentIFrame = iFrame.contentWindow?.document
				const component = documentIFrame?.querySelector(
					`#${editor.getSelected()?.ccid}`
				) as HTMLElement

				component.style.width = `${style.to.value * 1.77}px`
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
