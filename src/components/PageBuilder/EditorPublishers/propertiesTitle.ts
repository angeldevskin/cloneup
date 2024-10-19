/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, PropertyProps } from 'grapesjs'
import { Property } from '../../../models/editor.model'
import { fontes } from './fontes'

export function EditorPropertiesTitle(editor: Editor) {
	function getDefaultValue(type: string, editor: Editor) {
		switch (type) {
			case 'color':
				return editor.getSelected()?.rule?.attributes.style?.['color'] ?? '#000'

			case 'font-size':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['font-size']?.split('px')[0] ?? '32'
				)

			case 'decoration':
				if (
					editor.getSelected()?.rule?.attributes.style?.['font-weight'] ===
					'bold'
				) {
					setTimeout(() => {
						const clear = document.querySelector(
							'.gjs-sm-property__decoration > .gjs-sm-label > .gjs-sm-clear'
						) as HTMLElement
						clear.style.display = 'block'
						clear.innerHTML = 'Redefinir'

						const label = document.querySelector('label[for*="bold"]')
						label?.classList.add('active')
					}, 100)

					return 'bold'
				} else if (
					editor.getSelected()?.rule?.attributes.style?.['font-style'] ===
					'italic'
				) {
					setTimeout(() => {
						const clear = document.querySelector(
							'.gjs-sm-property__decoration > .gjs-sm-label > .gjs-sm-clear'
						) as HTMLElement
						clear.style.display = 'block'
						clear.innerHTML = 'Redefinir'

						const label = document.querySelector('label[for*="italic"]')
						label?.classList.add('active')
					}, 100)

					return 'italic'
				} else if (
					editor.getSelected()?.rule?.attributes.style?.['text-decoration'] ===
					'underline'
				) {
					setTimeout(() => {
						const clear = document.querySelector(
							'.gjs-sm-property__decoration > .gjs-sm-label > .gjs-sm-clear'
						) as HTMLElement
						clear.style.display = 'block'
						clear.innerHTML = 'Redefinir'

						const label = document.querySelector('label[for*="underline"]')
						label?.classList.add('active')
					}, 100)

					return 'underline'
				} else if (
					editor.getSelected()?.rule?.attributes.style?.['text-decoration'] ===
					'line-through'
				) {
					setTimeout(() => {
						const clear = document.querySelector(
							'.gjs-sm-property__decoration > .gjs-sm-label > .gjs-sm-clear'
						) as HTMLElement
						clear.style.display = 'block'
						clear.innerHTML = 'Redefinir'

						const label = document.querySelector('label[for*="line-through"]')
						label?.classList.add('active')
					}, 100)

					return 'line-through'
				}
				break

			case 'text-align-text':
				const value =
					editor.getSelected()?.rule?.attributes.style?.['text-align-text']

				setTimeout(() => {
					const label = document.querySelector(
						`label[for*="text-align-text-${value}"]`
					)
					label?.classList.add('active')
				}, 100)

				return editor.getSelected()?.rule?.attributes.style?.['text-align-text']

			case 'line-height':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['line-height']?.split('px')[0] ?? '32'
				)

			case 'letter-spacing':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['letter-spacing']?.split('px')[0] ?? '0'
				)

			case 'opacity':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['opacity']?.split('%')[0] ?? '100'
				)

			case 'text-shadow-c':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['text-shadow-c']?.split('px')[0] ?? '0'
				)
			case 'text-shadow-h':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['text-shadow-h']?.split('px')[0] ?? '0'
				)

			case 'text-shadow-v':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['text-shadow-v']?.split('px')[0] ?? '0'
				)

			case 'text-shadow-b':
				return (
					editor
						.getSelected()
						?.rule?.attributes.style?.['text-shadow-b']?.split('px')[0] ?? '0'
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

	const propertiesTitle: Property[] = [
		{ name: 'BÁSICOS', property: 'title' },
		{
			name: 'Cor do Texto',
			property: 'color',
			type: 'color',
			default: getDefaultValue('color', editor)
		},
		{
			name: 'Fonte',
			property: 'font-size',
			type: 'number',
			defaults: getDefaultValue('font-size', editor),
			units: ['px']
		},
		{
			name: 'FONTE',
			label: 'FONTE',
			property: 'font-family',
			type: 'select',
			default: getDefaultValue('font-family', editor),
			options: fontes
		},
		{ name: 'DECORAÇÃO', property: 'title' },
		{
			name: ' ',
			type: 'radio',
			value: getDefaultValue('decoration', editor),
			property: 'decoration',
			list: [
				{
					value: 'bold',
					name: `<svg width="12" height="14" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.42907 11.2088C1.18462 11.2088 0.979343 11.1257 0.813232 10.9596C0.646566 10.793 0.563232 10.5874 0.563232 10.343V1.65797C0.563232 1.41352 0.646566 1.20825 0.813232 1.04214C0.979343 0.876025 1.1849 0.792969 1.4299 0.792969H4.0624C4.85851 0.792969 5.56101 1.04408 6.1699 1.5463C6.77879 2.04852 7.08323 2.70158 7.08323 3.50547C7.08323 4.04269 6.94212 4.51297 6.6599 4.9163C6.37823 5.31964 6.02907 5.61519 5.6124 5.80297C6.11962 5.94519 6.55018 6.24352 6.90407 6.69797C7.25851 7.15186 7.43573 7.69908 7.43573 8.33963C7.43573 9.23408 7.10184 9.93602 6.43407 10.4455C5.76629 10.9544 5.03129 11.2088 4.22907 11.2088H1.42907ZM1.62657 10.2213H4.1774C4.82295 10.2213 5.34407 10.0271 5.74073 9.6388C6.13795 9.25047 6.33657 8.79825 6.33657 8.28214C6.33657 7.76658 6.13795 7.31464 5.74073 6.9263C5.34407 6.53741 4.81823 6.34297 4.16323 6.34297H1.62657V10.2213ZM1.62657 5.37547H4.0124C4.56684 5.37547 5.03629 5.20408 5.42073 4.8613C5.80573 4.51797 5.99823 4.08852 5.99823 3.57297C5.99823 3.04686 5.80268 2.61575 5.41157 2.27964C5.02045 1.94297 4.5574 1.77464 4.0224 1.77464H1.62657V5.37547Z" fill="#333333"/>
					</svg>`
				},
				{
					value: 'italic',
					name: `<svg width="12" height="14" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0.465 10.4167C0.335 10.4167 0.225 10.3717 0.135 10.2817C0.0449997 10.1917 0 10.0814 0 9.95083C0 9.82028 0.0449997 9.71028 0.135 9.62083C0.225 9.53194 0.335 9.4875 0.465 9.4875H3.02917L5.92917 0.929166H3.36667C3.23667 0.929166 3.12667 0.884167 3.03667 0.794167C2.94667 0.704167 2.90167 0.593889 2.90167 0.463333C2.90167 0.332778 2.94667 0.223055 3.03667 0.134166C3.12667 0.0452776 3.23667 0.000555556 3.36667 0H9.36C9.49 0 9.6 0.0450001 9.69 0.135C9.78 0.225 9.825 0.335278 9.825 0.465833C9.825 0.596389 9.78 0.706389 9.69 0.795833C9.6 0.884722 9.49 0.929166 9.36 0.929166H6.8925L3.99167 9.4875H6.45917C6.58972 9.4875 6.69972 9.5325 6.78917 9.6225C6.87917 9.7125 6.92417 9.82278 6.92417 9.95333C6.92417 10.0839 6.87917 10.1936 6.78917 10.2825C6.69917 10.3714 6.58917 10.4161 6.45917 10.4167H0.465Z" fill="#333333"/>
					</svg>`
				},
				{
					value: 'underline',
					name: `<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.16007 13.042C1.0423 13.042 0.943408 13.002 0.863408 12.922C0.783408 12.842 0.743408 12.7428 0.743408 12.6245C0.743408 12.5067 0.783408 12.4078 0.863408 12.3278C0.943408 12.2483 1.0423 12.2086 1.16007 12.2086H10.8401C10.9579 12.2086 11.0567 12.2486 11.1367 12.3286C11.2167 12.4086 11.2567 12.5078 11.2567 12.6261C11.2567 12.7439 11.2167 12.8428 11.1367 12.9228C11.0567 13.0022 10.9579 13.042 10.8401 13.042H1.16007ZM6.00007 10.382C4.81119 10.382 3.87841 10.0325 3.20174 9.33362C2.52563 8.63473 2.18758 7.68612 2.18758 6.48779V0.65862C2.18758 0.529731 2.23508 0.419453 2.33008 0.327787C2.42508 0.235564 2.53702 0.189453 2.66591 0.189453C2.7948 0.189453 2.90452 0.235564 2.99507 0.327787C3.08619 0.419453 3.13174 0.529731 3.13174 0.65862V6.51695C3.13174 7.42251 3.3848 8.13973 3.89091 8.66862C4.39757 9.19751 5.10063 9.46195 6.00007 9.46195C6.90007 9.46195 7.60285 9.19751 8.10841 8.66862C8.61507 8.13973 8.86841 7.42223 8.86841 6.51612V0.65862C8.86841 0.529731 8.91591 0.419453 9.01091 0.327787C9.10591 0.235564 9.21785 0.189453 9.34674 0.189453C9.47563 0.189453 9.58563 0.235564 9.67674 0.327787C9.7673 0.419453 9.81258 0.529731 9.81258 0.65862V6.48779C9.81258 7.68612 9.47452 8.63473 8.79841 9.33362C8.12174 10.0325 7.18896 10.382 6.00007 10.382Z" fill="#333333"/>
					</svg>`
				},
				{
					value: 'line-through',
					name: `<svg width="12" height="14" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0.916667 7.23268C0.798333 7.23268 0.699444 7.19296 0.62 7.11352C0.540556 7.03407 0.500556 6.9349 0.5 6.81602C0.5 6.69768 0.54 6.59879 0.62 6.51935C0.699444 6.4399 0.798333 6.40018 0.916667 6.40018H15.0833C15.2017 6.40018 15.3006 6.44018 15.38 6.52018C15.46 6.60018 15.5 6.69907 15.5 6.81685C15.5 6.93518 15.46 7.03407 15.38 7.11352C15.3 7.19352 15.2011 7.23352 15.0833 7.23352L0.916667 7.23268ZM7.4875 4.76602V1.20768H3.52917C3.38639 1.20768 3.26528 1.15768 3.16583 1.05768C3.06583 0.957682 3.01583 0.836016 3.01583 0.692682C3.01583 0.549349 3.06583 0.426016 3.16583 0.322682C3.26583 0.218238 3.38694 0.166016 3.52917 0.166016H12.4875C12.6297 0.166016 12.7508 0.216015 12.8508 0.316015C12.9503 0.416015 13 0.537682 13 0.681016C13 0.824349 12.95 0.947682 12.85 1.05102C12.7506 1.15546 12.6297 1.20768 12.4875 1.20768H8.52917V4.76602H7.4875ZM7.4875 8.86768H8.52917V11.3202C8.52917 11.4624 8.47917 11.5835 8.37917 11.6835C8.27917 11.783 8.1575 11.8327 8.01417 11.8327C7.87083 11.8327 7.74722 11.7813 7.64333 11.6785C7.53944 11.5757 7.4875 11.4507 7.4875 11.3035V8.86768Z" fill="#333333"/>
					</svg>`
				}
			]
		},
		{ name: 'ALINHAMENTO', property: 'title' },
		{
			property: 'text-align-text',
			type: 'radio',
			defaults: getDefaultValue('text-align-text', editor),
			list: [
				{
					value: 'left',
					name: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0.749919 13.6673C0.631585 13.6673 0.532696 13.6273 0.453252 13.5473C0.373252 13.4673 0.333252 13.3684 0.333252 13.2507C0.333252 13.1329 0.373252 13.034 0.453252 12.954C0.533252 12.874 0.632141 12.834 0.749919 12.834H13.2499C13.3683 12.834 13.4671 12.874 13.5466 12.954C13.626 13.034 13.666 13.1329 13.6666 13.2507C13.6666 13.3684 13.6266 13.4673 13.5466 13.5473C13.4671 13.6268 13.3683 13.6665 13.2499 13.6665L0.749919 13.6673ZM0.749919 10.5423C0.631585 10.5423 0.532696 10.5023 0.453252 10.4223C0.373252 10.3423 0.333252 10.2434 0.333252 10.1257C0.333252 10.0079 0.373252 9.90898 0.453252 9.82898C0.533252 9.74954 0.632141 9.70982 0.749919 9.70982H8.24992C8.36825 9.70982 8.46714 9.74982 8.54659 9.82982C8.62603 9.90982 8.66603 10.009 8.66658 10.1273C8.66658 10.2451 8.62659 10.344 8.54659 10.424C8.46714 10.5034 8.36825 10.5431 8.24992 10.5431L0.749919 10.5423ZM0.749919 7.41732C0.631585 7.41732 0.532696 7.37732 0.453252 7.29732C0.373252 7.21732 0.333252 7.11843 0.333252 7.00065C0.333252 6.88287 0.373252 6.78398 0.453252 6.70398C0.533252 6.62454 0.632141 6.58482 0.749919 6.58482H13.2499C13.3683 6.58482 13.4671 6.62482 13.5466 6.70482C13.6266 6.78482 13.6666 6.88398 13.6666 7.00232C13.6666 7.12065 13.6266 7.21954 13.5466 7.29898C13.4671 7.37843 13.3683 7.41815 13.2499 7.41815L0.749919 7.41732ZM0.749919 4.29232C0.631585 4.29232 0.532696 4.25232 0.453252 4.17232C0.373808 4.09232 0.333808 3.99343 0.333252 3.87565C0.333252 3.75787 0.373252 3.65898 0.453252 3.57898C0.533252 3.49954 0.632141 3.45982 0.749919 3.45982H8.24992C8.36825 3.45982 8.46714 3.49982 8.54659 3.57982C8.62659 3.65982 8.66658 3.75898 8.66658 3.87732C8.66658 3.9951 8.62659 4.09398 8.54659 4.17398C8.46714 4.25343 8.36825 4.29315 8.24992 4.29315L0.749919 4.29232ZM0.749919 1.16732C0.631585 1.16732 0.532696 1.12732 0.453252 1.04732C0.373808 0.967318 0.333808 0.868151 0.333252 0.749818C0.333252 0.63204 0.373252 0.533151 0.453252 0.453151C0.533252 0.373707 0.632141 0.333984 0.749919 0.333984H13.2499C13.3683 0.333984 13.4671 0.373984 13.5466 0.453984C13.6266 0.533984 13.6666 0.633151 13.6666 0.751484C13.6666 0.869262 13.6266 0.968151 13.5466 1.04815C13.4671 1.1276 13.3683 1.16732 13.2499 1.16732H0.749919Z" fill="#333333"/>
					</svg>
					`
				},
				{
					value: 'center',
					name: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.749919 13.6673C0.631585 13.6673 0.532696 13.6273 0.453252 13.5473C0.373252 13.4673 0.333252 13.3684 0.333252 13.2507C0.333252 13.1329 0.373252 13.034 0.453252 12.954C0.533252 12.874 0.632141 12.834 0.749919 12.834H13.2499C13.3683 12.834 13.4671 12.874 13.5466 12.954C13.626 13.034 13.666 13.1329 13.6666 13.2507C13.6666 13.3684 13.6266 13.4673 13.5466 13.5473C13.4671 13.6268 13.3683 13.6665 13.2499 13.6665L0.749919 13.6673ZM4.08325 10.5423C3.96492 10.5423 3.86603 10.5023 3.78659 10.4223C3.70659 10.3423 3.66659 10.2434 3.66659 10.1257C3.66659 10.0079 3.70659 9.90898 3.78659 9.82898C3.86603 9.74954 3.96492 9.70982 4.08325 9.70982H9.91658C10.0349 9.70982 10.1338 9.74982 10.2133 9.82982C10.2927 9.90982 10.3327 10.009 10.3333 10.1273C10.3333 10.2451 10.2933 10.344 10.2133 10.424C10.1338 10.5034 10.0349 10.5431 9.91658 10.5431L4.08325 10.5423ZM0.749919 7.41732C0.631585 7.41732 0.532696 7.37732 0.453252 7.29732C0.373252 7.21732 0.333252 7.11843 0.333252 7.00065C0.333252 6.88287 0.373252 6.78398 0.453252 6.70398C0.533252 6.62454 0.632141 6.58482 0.749919 6.58482H13.2499C13.3683 6.58482 13.4671 6.62482 13.5466 6.70482C13.6266 6.78482 13.6666 6.88398 13.6666 7.00232C13.6666 7.12065 13.6266 7.21954 13.5466 7.29898C13.4671 7.37843 13.3683 7.41815 13.2499 7.41815L0.749919 7.41732ZM4.08325 4.29232C3.96492 4.29232 3.86603 4.25232 3.78659 4.17232C3.70714 4.09232 3.66714 3.99343 3.66659 3.87565C3.66659 3.75787 3.70659 3.65898 3.78659 3.57898C3.86603 3.49954 3.96492 3.45982 4.08325 3.45982H9.91658C10.0349 3.45982 10.1338 3.49982 10.2133 3.57982C10.2933 3.65982 10.3333 3.75898 10.3333 3.87732C10.3333 3.9951 10.2933 4.09398 10.2133 4.17398C10.1338 4.25343 10.0349 4.29315 9.91658 4.29315L4.08325 4.29232ZM0.749919 1.16732C0.631585 1.16732 0.532696 1.12732 0.453252 1.04732C0.373808 0.967318 0.333808 0.868151 0.333252 0.749818C0.333252 0.63204 0.373252 0.533151 0.453252 0.453151C0.533252 0.373707 0.632141 0.333984 0.749919 0.333984H13.2499C13.3683 0.333984 13.4671 0.373984 13.5466 0.453984C13.6266 0.533984 13.6666 0.633151 13.6666 0.751484C13.6666 0.869262 13.6266 0.968151 13.5466 1.04815C13.4671 1.1276 13.3683 1.16732 13.2499 1.16732H0.749919Z" fill="#333333"/>
				</svg>
				`
				},
				{
					value: 'right',
					name: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.749919 1.16732C0.631585 1.16732 0.532696 1.12732 0.453252 1.04732C0.373808 0.967318 0.333808 0.868151 0.333252 0.749818C0.333252 0.63204 0.373252 0.533151 0.453252 0.453151C0.533252 0.373707 0.632141 0.333984 0.749919 0.333984H13.2499C13.3683 0.333984 13.4671 0.373984 13.5466 0.453984C13.6266 0.533984 13.6666 0.633151 13.6666 0.751484C13.6666 0.869262 13.6266 0.968151 13.5466 1.04815C13.4671 1.1276 13.3683 1.16732 13.2499 1.16732H0.749919ZM5.74992 4.29232C5.63159 4.29232 5.5327 4.25232 5.45325 4.17232C5.37381 4.09232 5.33381 3.99343 5.33325 3.87565C5.33325 3.75787 5.37325 3.65898 5.45325 3.57898C5.53325 3.49954 5.63214 3.45982 5.74992 3.45982H13.2499C13.3683 3.45982 13.4671 3.49982 13.5466 3.57982C13.6266 3.65982 13.6666 3.75898 13.6666 3.87732C13.6666 3.9951 13.6266 4.09398 13.5466 4.17398C13.4671 4.25343 13.3683 4.29315 13.2499 4.29315L5.74992 4.29232ZM0.749919 7.41732C0.631585 7.41732 0.532696 7.37732 0.453252 7.29732C0.373252 7.21732 0.333252 7.11843 0.333252 7.00065C0.333252 6.88287 0.373252 6.78398 0.453252 6.70398C0.533252 6.62454 0.632141 6.58482 0.749919 6.58482H13.2499C13.3683 6.58482 13.4671 6.62482 13.5466 6.70482C13.6266 6.78482 13.6666 6.88398 13.6666 7.00232C13.6666 7.12065 13.6266 7.21954 13.5466 7.29898C13.4671 7.37843 13.3683 7.41815 13.2499 7.41815L0.749919 7.41732ZM5.74992 10.5423C5.63159 10.5423 5.5327 10.5023 5.45325 10.4223C5.37325 10.3423 5.33325 10.2434 5.33325 10.1257C5.33325 10.0079 5.37325 9.90898 5.45325 9.82898C5.53325 9.74954 5.63214 9.70982 5.74992 9.70982H13.2499C13.3683 9.70982 13.4671 9.74982 13.5466 9.82982C13.626 9.90982 13.666 10.009 13.6666 10.1273C13.6666 10.2451 13.6266 10.344 13.5466 10.424C13.4671 10.5034 13.3683 10.5431 13.2499 10.5431L5.74992 10.5423ZM0.749919 13.6673C0.631585 13.6673 0.532696 13.6273 0.453252 13.5473C0.373252 13.4673 0.333252 13.3684 0.333252 13.2507C0.333252 13.1329 0.373252 13.034 0.453252 12.954C0.533252 12.874 0.632141 12.834 0.749919 12.834H13.2499C13.3683 12.834 13.4671 12.874 13.5466 12.954C13.626 13.034 13.666 13.1329 13.6666 13.2507C13.6666 13.3684 13.6266 13.4673 13.5466 13.5473C13.4671 13.6268 13.3683 13.6665 13.2499 13.6665L0.749919 13.6673Z" fill="#333333"/>
				</svg>
				`
				},
				{
					value: 'justify',
					name: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.749919 13.6673C0.631585 13.6673 0.532696 13.6273 0.453252 13.5473C0.373252 13.4673 0.333252 13.3684 0.333252 13.2507C0.333252 13.1329 0.373252 13.034 0.453252 12.954C0.533252 12.874 0.632141 12.834 0.749919 12.834H13.2499C13.3683 12.834 13.4671 12.874 13.5466 12.954C13.626 13.034 13.666 13.1329 13.6666 13.2507C13.6666 13.3684 13.6266 13.4673 13.5466 13.5473C13.4671 13.6268 13.3683 13.6665 13.2499 13.6665L0.749919 13.6673ZM0.749919 10.5423C0.631585 10.5423 0.532696 10.5023 0.453252 10.4223C0.373252 10.3423 0.333252 10.2434 0.333252 10.1257C0.333252 10.0079 0.373252 9.90898 0.453252 9.82898C0.533252 9.74954 0.632141 9.70982 0.749919 9.70982H13.2499C13.3683 9.70982 13.4671 9.74982 13.5466 9.82982C13.626 9.90982 13.666 10.009 13.6666 10.1273C13.6666 10.2451 13.6266 10.344 13.5466 10.424C13.4671 10.5034 13.3683 10.5431 13.2499 10.5431L0.749919 10.5423ZM0.749919 7.41732C0.631585 7.41732 0.532696 7.37732 0.453252 7.29732C0.373252 7.21732 0.333252 7.11843 0.333252 7.00065C0.333252 6.88287 0.373252 6.78398 0.453252 6.70398C0.533252 6.62454 0.632141 6.58482 0.749919 6.58482H13.2499C13.3683 6.58482 13.4671 6.62482 13.5466 6.70482C13.6266 6.78482 13.6666 6.88398 13.6666 7.00232C13.6666 7.12065 13.6266 7.21954 13.5466 7.29898C13.4671 7.37843 13.3683 7.41815 13.2499 7.41815L0.749919 7.41732ZM0.749919 4.29232C0.631585 4.29232 0.532696 4.25232 0.453252 4.17232C0.373808 4.09232 0.333808 3.99343 0.333252 3.87565C0.333252 3.75787 0.373252 3.65898 0.453252 3.57898C0.533252 3.49954 0.632141 3.45982 0.749919 3.45982H13.2499C13.3683 3.45982 13.4671 3.49982 13.5466 3.57982C13.6266 3.65982 13.6666 3.75898 13.6666 3.87732C13.6666 3.9951 13.6266 4.09398 13.5466 4.17398C13.4671 4.25343 13.3683 4.29315 13.2499 4.29315L0.749919 4.29232ZM0.749919 1.16732C0.631585 1.16732 0.532696 1.12732 0.453252 1.04732C0.373808 0.967318 0.333808 0.868151 0.333252 0.749818C0.333252 0.63204 0.373252 0.533151 0.453252 0.453151C0.533252 0.373707 0.632141 0.333984 0.749919 0.333984H13.2499C13.3683 0.333984 13.4671 0.373984 13.5466 0.453984C13.6266 0.533984 13.6666 0.633151 13.6666 0.751484C13.6666 0.869262 13.6266 0.968151 13.5466 1.04815C13.4671 1.1276 13.3683 1.16732 13.2499 1.16732H0.749919Z" fill="#333333"/>
				</svg>
				`
				}
			]
		},
		{ name: 'ESPAÇAMENTOS', property: 'title' },
		{
			property: 'ico-line',
			icon: 'fa fa-text-height',
			name: ' '
		},
		{
			property: 'line-height',
			name: ` `,
			type: 'slider',
			min: 20,
			max: 400,
			step: 1,
			units: ['px'],
			default: getDefaultValue('line-height', editor)
		},
		{
			name: ` `,
			icon: 'fa fa-text-width',
			property: 'ico-line'
		},
		{
			property: 'letter-spacing',
			name: ' ',
			type: 'slider',
			default: getDefaultValue('letter-spacing', editor),
			min: 0,
			max: 100,
			step: 1,
			units: ['px']
		}
	]

	const propertiesTitleStyles: Property[] = [
		{
			name: 'EFEITOS',
			property: 'title'
		},
		{
			name: 'Opacidade',
			property: 'opacity',
			type: 'slider',
			default: 100,
			min: 0,
			max: 100,
			step: 1,
			defaults: getDefaultValue('opacity', editor),
			units: ['%']
		},
		{
			name: 'SOMBRA',
			property: 'title'
		},
		{
			property: 'text-shadow-c',
			name: 'Cor da sombra',
			type: 'color',
			default: getDefaultValue('text-shadow-c', editor)
		},
		{
			name: ' ',
			icon: 'fa fa-arrow-right',
			property: 'text-shadow-h',
			type: 'slider',
			default: getDefaultValue('text-shadow-h', editor),
			min: -50,
			max: 50,
			step: 1,
			units: ['px']
		},
		{
			name: ' ',
			icon: 'fa fa-arrow-down',
			property: 'text-shadow-v',
			type: 'slider',
			default: getDefaultValue('text-shadow-v', editor),
			min: -50,
			max: 50,
			step: 1,
			units: ['px']
		},
		{
			name: ' ',
			icon: 'fa fa-eye',
			property: 'text-shadow-b',
			type: 'slider',
			default: getDefaultValue('text-shadow-b', editor),
			min: 0,
			max: 50,
			step: 1,
			units: ['px']
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

	editor.StyleManager.addSector('editor', {
		name: 'EDITOR',
		open: true,
		properties: propertiesTitle as PropertyProps[]
	})

	editor.StyleManager.addSector('estilos', {
		name: 'ESTILOS',
		open: false,
		properties: propertiesTitleStyles as PropertyProps[]
	})

	editor.on('style:property:update', (style) => {
		if (editor.getSelected()?.attributes.tagName === 'h1') {
			if (style.property.attributes.property.includes('text-shadow')) {
				const color = editor.StyleManager.getProperty(
					'estilos',
					'text-shadow-c'
				)?.attributes.value
				const horizontal = editor.StyleManager.getProperty(
					'estilos',
					'text-shadow-h'
				)?.attributes.value
				const vertical = editor.StyleManager.getProperty(
					'estilos',
					'text-shadow-v'
				)?.attributes.value
				const blur = editor.StyleManager.getProperty('estilos', 'text-shadow-b')
					?.attributes.value

				if (horizontal !== '' || vertical !== '' || blur !== '') {
					editor.getSelected()?.addStyle({
						'text-shadow': `${horizontal === '' ? '0' : horizontal}px ${
							vertical === '' ? '0' : vertical
						}px ${blur === '' ? '0' : blur}px ${color === '' ? '#000' : color}`
					})
				}
			} else if (style.property.attributes.property === 'decoration') {
				const clear = document.querySelector(
					'.gjs-sm-property__decoration > .gjs-sm-label > .gjs-sm-clear'
				) as HTMLElement
				clear.innerHTML = 'Redefinir'

				switch (style.value) {
					case 'bold':
						const bold = document.querySelector('label[for*="bold"]')
						bold?.classList.add('active')

						editor.getSelected()?.addStyle({
							'font-weight': 'bold',
							'text-decoration': 'none',
							'font-style': 'normal'
						})
						break

					case 'italic':
						const italic = document.querySelector('label[for*="italic"]')
						italic?.classList.add('active')

						editor.getSelected()?.addStyle({
							'font-weight': 'normal',
							'text-decoration': 'none',
							'font-style': 'italic'
						})
						break

					case 'underline':
						const underline = document.querySelector('label[for*="underline"]')
						underline?.classList.add('active')

						editor.getSelected()?.addStyle({
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'underline'
						})
						break

					case 'line-through':
						const lineThrough = document.querySelector(
							'label[for*="line-through"]'
						)
						lineThrough?.classList.add('active')

						editor.getSelected()?.addStyle({
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'line-through'
						})
						break

					default:
						switch (style.from.value) {
							case 'bold':
								const bold = document.querySelector('label[for*="bold"]')
								bold?.classList.remove('active')

								editor.getSelected()?.addStyle({
									'font-weight': 'normal'
								})
								break

							case 'italic':
								const italic = document.querySelector('label[for*="italic"]')
								italic?.classList.remove('active')

								editor.getSelected()?.addStyle({
									'font-style': 'normal'
								})
								break

							case 'underline':
								const underline = document.querySelector(
									'label[for*="underline"]'
								)
								underline?.classList.remove('active')

								editor.getSelected()?.addStyle({
									'text-decoration': 'none'
								})
								break

							case 'line-through':
								const lineThrough = document.querySelector(
									'label[for*="line-through"]'
								)
								lineThrough?.classList.remove('active')

								editor.getSelected()?.addStyle({
									'text-decoration': 'none'
								})
								break
						}
						break
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
			} else if (style.property.attributes.property === 'text-align-text') {
				switch (style.value) {
					case 'left':
						const left = document.querySelector(
							'label[for*="text-align-text-left"]'
						)
						left?.classList.add('active')

						editor.getSelected()?.addStyle({
							'text-align': 'left'
						})
						break

					case 'center':
						const center = document.querySelector(
							'label[for*="text-align-text-center"]'
						)
						center?.classList.add('active')

						editor.getSelected()?.addStyle({
							'text-align': 'center'
						})
						break

					case 'right':
						const right = document.querySelector(
							'label[for*="text-align-text-right"]'
						)
						right?.classList.add('active')

						editor.getSelected()?.addStyle({
							'text-align': 'right'
						})
						break

					case 'justify':
						const justify = document.querySelector(
							'label[for*="text-align-text-justify"]'
						)
						justify?.classList.add('active')

						editor.getSelected()?.addStyle({
							'text-align': 'justify'
						})
						break
				}
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
