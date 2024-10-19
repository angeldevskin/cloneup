import { Component, Editor } from 'grapesjs'
import { SubItemsType } from '../Components/DropdownAI'

export const mentalTrigger: SubItemsType[] = [
	{
		title: 'Medo'
	},
	{
		title: 'Escassez'
	},
	{
		title: 'Prova Social'
	},
	{
		title: 'Urgência'
	},
	{
		title: 'Reciprocidade'
	},
	{
		title: 'Autoridade'
	},
	{
		title: 'Comunidade'
	},
	{
		title: 'Ganância'
	},
	{
		title: 'Coerência'
	},
	{
		title: 'Pertencimento'
	},
	{
		title: 'Especificidade'
	}
]

export function getTranslateY(transformString: string) {
	if (transformString) {
		const match = transformString.match(/translateY\(([^)]+)\)/)

		return match ? match[1] : null
	} else {
		return '0px'
	}
}

export function getTranslateX(transformString: string) {
	if (transformString) {
		const match = transformString.match(/translateX\(([^)]+)\)/)

		return match ? match[1] : null
	} else {
		return '0px'
	}
}

export const componentPosition = (
	selectedComponent: Component,
	canvasClientX?: number,
	canvasClientY?: number,
	type?: 'drag-stop',
	changeToDesktop?: number,
	editor?: Editor
) => {
	const iFrames = document.getElementsByClassName('gjs-frame')
	const iFrame = iFrames[0] as HTMLIFrameElement
	const documentIFrame = iFrame.contentWindow?.document

	const component = documentIFrame?.querySelector(
		`#${selectedComponent.ccid}`
	) as HTMLIFrameElement
	const rect = component.getBoundingClientRect()

	let x: number | undefined = 0
	let y: number | undefined = 0
	if (type === 'drag-stop') {
		x = canvasClientX

		if (
			changeToDesktop &&
			changeToDesktop >= 3 &&
			editor?.getDevice() === 'Desktop'
		) {
			x = canvasClientX! - 449
		}

		if (selectedComponent.attributes.tagName === 'h1') {
			y = canvasClientY && canvasClientY + 90
		} else if (selectedComponent.attributes.tagName === 'p') {
			y = canvasClientY && canvasClientY + 68
		}
	} else {
		x = rect.left
		y = rect.bottom + 51
	}

	const writeWithAi = document.getElementById('write-with-ai')
	writeWithAi!.style.display = 'block'
	writeWithAi!.style.left = `${x}px`
	writeWithAi!.style.top = `${y}px`
}
