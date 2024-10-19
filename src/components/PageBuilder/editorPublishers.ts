/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Editor, ToolbarButtonProps } from 'grapesjs'
import { componentPosition } from './utils'
import { EditorPropertiesImage } from './EditorPublishers/propertiesImage'
import { EditorPropertiesVideo } from './EditorPublishers/propertiesVideo'
import { EditorPropertiesSquare } from './EditorPublishers/propertiesSquare'
import { EditorPropertiesEllipse } from './EditorPublishers/propertiesEllipse'

export function editorPublishers(editor: Editor) {
	function removeStyleManager() {
		const managerContainer = document.querySelector('.manager-container')
		managerContainer?.classList.remove('visible')
	}

	let count = 1
	function addToolbar(selectedComponent: Component) {
		const newTool = {
			title: 'Editar componente',
			commandName: 'edit-component',
			id: 'edit-component',
			label: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen">
				<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
			</svg>`
		}

		const tipTool = {
			title: 'Segure Shift para manter a proporção',
			id: 'tip-video-image',
			label: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb">
				<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
				<path d="M9 18h6"/><path d="M10 22h4"/>
			</svg>`
		}

		const defaultToolbar = selectedComponent.get('toolbar')
		const checkAlreadyExist = defaultToolbar?.find(
			(toolbar) => toolbar.command === newTool.commandName
		)
		let newToolbar: ToolbarButtonProps[] = []

		if (!checkAlreadyExist) {
			newToolbar =
				defaultToolbar?.map((eachToolbar: ToolbarButtonProps) => {
					if (
						eachToolbar.command !== 'tlb-move' &&
						eachToolbar.command !== 'tlb-clone' &&
						eachToolbar.command !== 'tlb-delete' &&
						eachToolbar.id !== 'edit-component' &&
						eachToolbar.id !== 'tip-video-image'
					) {
						return {
							...eachToolbar,
							label: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-up"><rect width="18" height="18" x="3" y="3" rx="2"/>
							<path d="m16 12-4-4-4 4"/>
							<path d="M12 16V8"/>
						</svg>`
						}
					} else if (eachToolbar.command === 'tlb-move') {
						return {
							...eachToolbar,
							label: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move">
							<polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/>
						</svg>`
						}
					} else if (eachToolbar.command === 'tlb-clone') {
						return {
							...eachToolbar,
							label: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
							<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
						</svg>`
						}
					} else if (eachToolbar.command === 'tlb-delete') {
						return {
							...eachToolbar,
							label: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
							<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
						</svg>`
						}
					}

					return eachToolbar
				}) || []

			newToolbar?.unshift({
				id: newTool.id,
				label: newTool.label,
				attributes: { title: newTool.title },
				command: () => {
					if (count % 2 !== 0) {
						editor.runCommand(newTool.commandName)
					} else {
						editor.stopCommand(newTool.commandName)
					}
					count++
				}
			})
		}

		if (
			selectedComponent.get('type') === 'image' ||
			selectedComponent.attributes.tagName === 'iframe'
		) {
			newToolbar?.unshift({
				id: tipTool.id,
				label: tipTool.label,
				attributes: { title: tipTool.title },
				command: () => {}
			})
		}

		if (
			selectedComponent.attributes.attributes?.['data-custom-id'] ===
			'column-1-1'
		) {
			newToolbar = newToolbar.filter(
				(toolbar: ToolbarButtonProps) =>
					(toolbar.command !== 'tlb-clone' &&
						toolbar.command !== 'tlb-delete' &&
						toolbar.command !== 'tlb-move') ||
					toolbar.id === 'edit-component'
			)
		}

		if (
			selectedComponent.attributes.attributes?.['data-custom-id'] ===
			'container-column-1-1'
		) {
			newToolbar = newToolbar.filter(
				(toolbar: ToolbarButtonProps) =>
					toolbar.command === 'tlb-clone' ||
					toolbar.command === 'tlb-delete' ||
					toolbar.id === 'edit-component'
			)
		}

		selectedComponent.set('toolbar', newToolbar)
	}

	function removeAI() {
		const writeWithAi = document.getElementById('write-with-ai')
		writeWithAi!.style.display = 'none'
	}

	function addWidthProportional(deselectedComponent: Component) {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document

		const component = documentIFrame?.querySelector(
			`#${deselectedComponent?.ccid}`
		) as HTMLElement

		const styles = component.getAttribute('style')
		const widthValue = styles
			?.split(';')
			.find((style) => style.trim().startsWith('width'))
			?.split(':')[1]
			.trim()

		if (widthValue) {
			deselectedComponent.addStyle({
				width: widthValue
			})

			component.style.removeProperty('width')
		}
	}

	editor.on('component:selected', (selectedComponent: Component) => {
		editor.stopCommand('edit-component')
		count = 1
		const typeComponent = selectedComponent.get('type')
		const tagName = selectedComponent.attributes.tagName
		const customId = selectedComponent.attributes.attributes?.['data-custom-id']

		switch (customId) {
			case 'square':
				selectedComponent.set({
					resizable: true
				})

				addToolbar(selectedComponent)

				EditorPropertiesSquare(editor)

				return
			case 'ellipse':
				selectedComponent.set({
					resizable: true
				})

				addToolbar(selectedComponent)

				EditorPropertiesEllipse(editor)

				return
		}

		switch (tagName) {
			case 'h1':
				selectedComponent.set('resizable', true)

				addToolbar(selectedComponent)

				if (editor.getDevice() === 'Desktop') {
					componentPosition(selectedComponent)
				}
				break
			case 'form':
			case 'input':
			case 'button':
			case 'label':
			case 'textarea':
			case 'select':
			case 'option':
			case 'fieldset':
			case 'legend':
				if (tagName !== 'form') {
					selectedComponent.set({
						selectable: false,
						resizable: false,
						draggable: false,
						removable: false,
						editable: false,
						copyable: false,
						stylable: false
					})

					const form = editor
						.getSelected()
						?.parents()
						?.filter((parent) => parent.attributes.tagName === 'form')[0]

					editor.select(form)
				}

				selectedComponent.set('resizable', true)

				addToolbar(selectedComponent)
				break
			case 'p':
				editor.getSelected()?.set('resizable', true)

				addToolbar(selectedComponent)

				if (editor.getDevice() === 'Desktop') {
					componentPosition(selectedComponent)
				}
				break
			case 'iframe':
				editor.getSelected()?.set('mute', 0)
				selectedComponent.set({
					resizable: {
						tc: false,
						bc: false,
						cl: false,
						cr: false
					}
				})

				addToolbar(selectedComponent)

				EditorPropertiesVideo(editor)
				break
			case 'span':
				removeStyleManager()

				const form = editor
					.getSelected()
					?.parents()
					?.filter((parent) => parent.attributes.tagName === 'form')[0]

				if (form) {
					editor.select(form)
				}

				addToolbar(selectedComponent)
				break
			case 'body':
				selectedComponent.set({
					selectable: false,
					resizable: false,
					draggable: false,
					removable: false,
					editable: false,
					copyable: false
				})
				break
		}

		switch (typeComponent) {
			case 'image':
				selectedComponent.set({
					resizable: {
						tc: false,
						bc: false,
						cl: false,
						cr: false
					}
				})

				addToolbar(selectedComponent)

				EditorPropertiesImage(editor)
				break
			case 'link':
				editor.getSelected()?.set('resizable', true)

				addToolbar(selectedComponent)
				break
			case 'div':
				const dataCustomId =
					selectedComponent.attributes.attributes?.['data-custom-id']

				if (dataCustomId !== 'geometric-shapes') {
					const resizableTopBottom = new Set(['container-column-1-1'])

					if (resizableTopBottom.has(dataCustomId)) {
						selectedComponent.set({
							resizable: {
								tl: false,
								tr: false,
								bl: false,
								br: false,
								cl: false,
								cr: false
							},
							draggable: false,
							removable: true
						})
					}

					selectedComponent.set('draggable', false)
				} else {
					selectedComponent.set({
						resizable: true
					})
				}

				addToolbar(selectedComponent)
				break
		}
	})

	editor.on('component:deselected', (deselectedComponent: Component) => {
		const tagName = deselectedComponent.attributes.tagName
		const typeComponent = deselectedComponent.get('type')
		const customId =
			deselectedComponent.attributes.attributes?.['data-custom-id']

		editor.stopCommand('edit-component')

		switch (customId) {
			case 'square':
				editor.StyleManager.removeSector('editor')

				addWidthProportional(deselectedComponent)

				return
			case 'ellipse':
				editor.StyleManager.removeSector('editor')

				addWidthProportional(deselectedComponent)

				return
		}

		switch (tagName) {
			case 'p':
				editor.StyleManager.removeSector('editor')
				editor.StyleManager.removeSector('estilos')

				removeAI()
				break
			case 'h1':
				editor.StyleManager.removeSector('editor')
				editor.StyleManager.removeSector('estilos')

				removeAI()
				break
			case 'form':
			case 'input':
			case 'button':
			case 'label':
			case 'textarea':
			case 'select':
			case 'option':
			case 'fieldset':
			case 'legend':
				editor.StyleManager.removeSector('estilos')
				editor.StyleManager.removeSector('configurar')
				break
			case 'iframe':
				editor.StyleManager.removeSector('estilos')
				editor.StyleManager.removeSector('configurar')

				addWidthProportional(deselectedComponent)
				break
		}

		switch (typeComponent) {
			case 'image':
				editor.StyleManager.removeSector('editor')
				editor.StyleManager.removeSector('configurar')

				addWidthProportional(deselectedComponent)
				break
			case 'link':
				editor.StyleManager.removeSector('estilos')
				editor.StyleManager.removeSector('configurar')
				break
			case 'div':
				editor.StyleManager.removeSector('editor')
				break
		}
	})
}
