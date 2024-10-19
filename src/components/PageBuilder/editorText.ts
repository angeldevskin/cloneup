import { Editor } from 'grapesjs'

export function editorText(editor: Editor) {
	// var textContent: string = ''
	let textValue: string = ''
	editor.StyleManager.addSector('Text', {
		name: 'Texto',
		open: false,
		properties: [
			{
				name: 'Conteúdo HTML',
				property: 'content',
				type: 'textarea',
				defaults: 'tt',
				onChange: function () {
					// textContent = model.value
					//setTextonChange(model.value)
				}
			}
		]
	})

	editor.on('component:selected', (selectedComponent) => {
		if (selectedComponent.get('type') === 'text') {
			textValue = selectedComponent.view.el.innerText.trim()
			editor.getSelected()?.setStyle({ content: textValue })
		}
	})

	editor.on('change', (selectedComponent) => {
		console.log(selectedComponent)
	})
}
