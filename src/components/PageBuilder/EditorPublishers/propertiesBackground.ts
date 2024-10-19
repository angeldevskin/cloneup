/* eslint-disable @typescript-eslint/no-explicit-any */
import { Property } from '../../../models/editor.model'
import { Editor } from 'grapesjs'

let imagepropertiesBackground: string = ''
let border: string = ''
let borderType: string = ''

export const propertiesBackground: Property[] = [
	{ name: 'COR', property: 'title' },
	{
		name: 'ICONBOTAO',
		icon: 'fa fa-image',
		type: 'add-image'
	},
	{ name: 'Imagem de fundo', property: 'title-cor-texto-fundo' },
	{
		name: 'Cor de Fundo',
		property: 'background-color',
		label: 'Base type',
		type: 'color',
		defaults: 'white'
	},
	{ name: 'Cor do fundo', property: 'title-cor-texto-fundo' },
	{
		name: 'Cor de Fundo',
		property: 'border-color',
		label: 'Base type',
		type: 'color',
		defaults: 'black'
	},
	{ name: 'Borda', property: 'title-cor-texto-sem-recuo' },
	{
		name: 'Largura da Borda',
		property: 'system-border',
		defaults: 0,
		onChange: (model: any) => {
			border = model.value
		}
	},
	{ name: 'px', property: 'title-cor-texto-sem-recuo-px' },
	{
		name: 'Tipo de Bordar',
		property: 'system-border-type',
		type: 'select',
		defaults: 'solid',
		list: [
			{ value: 'solid', name: 'Sólido' },
			{ value: 'dotted', name: 'Pontos' },
			{ value: 'dashed', name: 'Tracejada' },
			{ value: 'double', name: 'Dupla' },
			{ value: 'groove', name: 'Esculpida' },
			{ value: 'ridge', name: 'Saindo' },
			{ value: 'inset', name: 'Entalhada' },
			{ value: 'outset', name: 'Relação' }
		],
		onChange: (model: any) => {
			borderType = model.value
		}
	},
	{
		name: 'Image de fundo',
		icon: 'fa fa-image',
		type: 'file',
		onChange: (model: any) => {
			imagepropertiesBackground = model.value
		}
	}
]

export function EditorPropertiesBackground(editor: Editor) {
	editor.on('component:update', (component) => {
		const typeComponent = component.get('type')
		const tagName = component.attributes.tagName
		if (tagName == 'div' && typeComponent != 'text') {
			component.addStyle({
				display: 'flex',
				'align-items': 'center',
				'justify-content': 'center',
				'background-image': `url("${imagepropertiesBackground}")`,
				'border-width': `${border}px`,
				'border-style': `${borderType}`
			})
		}
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
}
