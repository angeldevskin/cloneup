/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from 'grapesjs'

export function editorAnimations(editor: Editor) {
	const componentsState = new Map()
	const properties = [
		{
			name: 'Animações',
			property: 'animation',
			type: 'select',
			defaults: '',
			list: [
				{ value: '', name: 'Nenhuma' },
				{ value: 'rotation', name: 'Rotação' },
				{ value: 'jump', name: 'Pular' }
			]
		},
		{
			name: 'Repetir',
			property: 'animationLoop',
			type: 'select',
			defaults: 'false',
			list: [
				{ value: 'false', name: 'Apenas uma vez' },
				{ value: 'duas', name: 'Apenas duas vezes' },
				{ value: 'true', name: 'Sempre' }
			]
		},
		/**{
  name: 'Velocidade',
  property: 'animationSpeed',
  type: 'slider', // Use o tipo 'slider' para um controle deslizante
  defaults: '50000',
  min: 250, // Valor mínimo do controle deslizante
  max: 50000, // Valor máximo do controle deslizante
  step: 250, // Incremento do controle deslizante
  units: ['ms'], // Unidades do controle deslizante (opcional)
} */
		{
			name: 'Velocidade',
			property: 'animationSpeed',
			type: 'select',
			defaults: '50000',
			list: [
				{ value: '50000', name: '1' },
				{ value: '25000', name: '2' },
				{ value: '10000', name: '3' },
				{ value: '7500', name: '4' },
				{ value: '5000', name: '5' },
				{ value: '2500', name: '6' },
				{ value: '1000', name: '7' },
				{ value: '750', name: '8' },
				{ value: '500', name: '9' },
				{ value: '250', name: '10' }
			]
		}
	]

	editor.StyleManager.addSector('animation', {
		name: 'ANIMAÇÃO',
		open: false,
		properties
	})

	editor.on('component:selected', (selectedComponent) => {
		componentsState.clear()
		if (selectedComponent) {
			componentsState.set(selectedComponent, {
				animation: '',
				loop: 'false',
				repetition: 0,
				speed: 5000,
				timestamp: 0,
				posx: 0,
				posy: 0,
				currentRotation: 0,
				lastTimestamp: 0,
				pulando: true,
				start: true
			})
		}
	})

	editor.on('update', () => {
		componentsState.forEach((state, component) => {
			const animationLoopValue = component.getStyle().animationLoop
			if (animationLoopValue) {
				state.loop = animationLoopValue
				switch (animationLoopValue) {
					case 'false':
						if (state.repetition < 1 && state.animation === '') {
							state.currentRotation = 1
							state.pulando = true
							state.posy = 1
							state.posx = 1
							state.repetition = 1
						}
						break
					case 'duas':
						if (state.repetition < 2 && state.animation === '') {
							state.currentRotation = 1
							state.pulando = true
							state.posy = 1
							state.posx = 1
							state.repetition = 2
						}
						break
				}
			}
			const animationSpeed = component.getStyle().animationSpeed
			if (animationSpeed) {
				state.speed = Number(animationSpeed)
			}
			const animationValue = component.getStyle().animation

			switch (animationValue) {
				case 'rotation':
					if (state.animation !== 'rotation') {
						state.animation = 'rotation'
						noneAnimation(component, state)
						state.currentRotation = 1
						state.pulando = true
						state.posy = 1
						state.posx = 1
						state.start = true
					}
					rotationAnimation(component, state)
					break
				case 'jump':
					if (state.animation !== 'jump') {
						state.animation = 'jump'
						noneAnimation(component, state)
						state.currentRotation = 1
						state.pulando = true
						state.posy = 1
						state.posx = 1
						state.start = true
					}
					jumpAnimation(component, state)
					break
				default:
					state.animation = ''
					noneAnimation(component, state)
					break
			}
		})
	})

	function noneAnimation(component: any, state: any) {
		state.timestamp = 0
		state.posx = 0
		state.posy = 0
		state.currentRotation = 0
		state.lastTimestamp = 0
		component.set('style', {
			transform: `rotate(0deg)`,
			position: 'relative',
			bottom: `0rem`
		})
	}

	function rotationAnimation(component: any, state: any) {
		function rotate(timestamp: any) {
			if (!state.lastTimestamp) {
				state.lastTimestamp = timestamp
			}
			const deltaTime = timestamp - state.lastTimestamp
			state.lastTimestamp = timestamp

			if (
				state.currentRotation < 365 &&
				!(state.currentRotation === 0 && state.loop === 'false') &&
				!(
					state.repetition <= 0 &&
					!(state.loop === 'true' || state.loop === 'false')
				)
			) {
				state.currentRotation += 365 * (deltaTime / state.speed)
			} else {
				state.animation = ''
			}

			if (state.currentRotation >= 365) {
				state.currentRotation = 0
			}
			if (state.repetition > 0 && state.currentRotation === 0) {
				state.repetition -= 1
			}
			component.set('style', {
				transform: `rotate(${state.currentRotation}deg)`
			})
			if (state.animation === 'rotation') {
				requestAnimationFrame(rotate)
			}
		}
		if (state.start) {
			requestAnimationFrame(rotate)
			state.start = false
		}
	}

	function jumpAnimation(component: any, state: any) {
		function jump(timestamp: any) {
			if (!state.lastTimestamp) {
				state.lastTimestamp = timestamp
			}
			const deltaTime = timestamp - state.lastTimestamp
			state.lastTimestamp = timestamp

			if (
				!(state.posy === 0 && state.loop === 'false') &&
				!(
					state.repetition <= 0 &&
					!(state.loop === 'true' || state.loop === 'false')
				)
			) {
				if (state.pulando && state.posy <= 10) {
					state.posy += 5 * (deltaTime / state.speed)
				}
				if (!state.pulando && state.posy >= 0) {
					state.posy -= 10 * (deltaTime / state.speed)
				}
			} else {
				state.animation = ''
			}

			if (state.posy >= 10) {
				state.pulando = false
			}

			if (state.posy < 0) {
				state.posy = 0
			}
			if (state.loop === 'true' && state.posy <= 0) {
				state.pulando = true
			} else {
				if (state.posy <= 0) {
					if (state.repetition > 0) {
						state.pulando = true
						state.repetition -= 1
					} else {
						state.pulando = false
					}
				}
			}

			component.set('style', {
				position: 'relative',
				transform: `rotate(0deg)`,
				bottom: `${state.posy}rem`
			})
			if (state.animation === 'jump') {
				requestAnimationFrame(jump)
			}
		}
		if (state.start) {
			requestAnimationFrame(jump)
			state.start = false
		}
	}
}
