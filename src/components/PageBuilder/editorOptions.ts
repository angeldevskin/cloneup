/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Editor, ProjectData } from 'grapesjs'
import { componentPosition, getTranslateX, getTranslateY } from './utils'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { axiosRoot } from '../../http/axios'
import { Page, PageTemplate } from '../../models/page.model'
import {
	getPageById,
	publishPage,
	updatePage,
	updatePageTemplate
} from '../../services/editor.service'
import { createLeadEditor } from '../../services/leads.service'
import { uploadImage } from '../../services/uploadImage.service'
import { errorToast, successToast } from '../Toast/types'
import { editorPublishers } from './editorPublishers'
import { EditorPropertiesButton } from './EditorPublishers/propertiesButton'
import { EditorPropertiesContentWrapper } from './EditorPublishers/propertiesContentWrapper'
import { EditorPropertiesForm } from './EditorPublishers/propertiesForm'
import { EditorPropertiesText } from './EditorPublishers/propertiesText'
import { EditorPropertiesTitle } from './EditorPublishers/propertiesTitle'
import { EditorPropertiesBlock } from './EditorPublishers/propertiesBlock'
import * as OneColumn from './OneColumn'
import { script } from './Scripts'
import { getFunnelByID } from '../../services/funnels.service'
import './style.css'

export function editorOptions(editor: Editor) {
	const um = editor.UndoManager
	editor.Panels.removeButton('views', 'open-blocks')
	editor.Panels.removePanel('options')
	editor.Panels.removePanel('commands')
	editor.Panels.removePanel('views')
	editor.setDragMode('translate')

	function addStyleManager() {
		const managerContainer = document.querySelector('.manager-container')
		const panels = document.querySelector('.gjs-pn-panels')

		panels?.classList.add('smaller-width')
		managerContainer?.classList.add('visible')
	}

	function removeStyleManager() {
		const managerContainer = document.querySelector('.manager-container')
		const panels = document.querySelector('.gjs-pn-panels')

		panels?.classList.remove('smaller-width')
		managerContainer?.classList.remove('visible')
	}

	function setAttributeToContentWidth() {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document

		const columnWidth = documentIFrame?.querySelector(
			'#content-width'
		) as HTMLIFrameElement

		const oneColumn = editor.DomComponents.getWrapper()?.find(
			`[data-custom-id="column-1-1"]`
		)

		columnWidth.setAttribute(
			'custom-width',
			oneColumn && oneColumn?.[0].rule?.attributes.style?.['max-width']
		)
	}

	editor.on('keymap:emit', (keymap) => {
		if (keymap === 'core:paste') {
			try {
				navigator.clipboard.readText().then((res) => {
					const selected = editor.getSelected()

					const iFrames = document.getElementsByClassName('gjs-frame')

					if (iFrames.length > 0) {
						const iFrame = iFrames[0] as HTMLIFrameElement
						const documentIFrame = iFrame.contentWindow?.document
						const elementHTML = documentIFrame?.getElementById(
							`${selected?.ccid}`
						)

						if (elementHTML) {
							elementHTML.innerText = res
						}
					}

					if (
						selected &&
						selected.attributes &&
						selected.attributes.components &&
						selected.attributes.components.models &&
						selected.attributes.components.models[0] &&
						selected.attributes.components.models[0].attributes
					) {
						selected.attributes.components.models[0].set({
							content: res
						})
					}
				})
			} catch (error) {
				console.error('core:paste error', error)
			}
		}
	})

	editor.on('modal', (e) => {
		if (e.content.classList.contains('gjs-custom-code')) {
			removeStyleManager()
			editor.stopCommand('edit-component')
		}
	})

	editor.on('update', () => {
		dispatchUndoRepo()
	})

	function dispatchUndoRepo() {
		if (!um.hasUndo()) {
			editor.Panels.getButton('actions', 'undo')?.set('className', 'disabled')
		}

		if (!um.hasRedo()) {
			editor.Panels.getButton('actions', 'redo')?.set('className', 'disabled')
		}
	}

	let countSaveProject = 0
	async function saveProject(data: ProjectData) {
		try {
			const html = editor.getHtml()
			let css = editor.getCss()
			css += `
				[data-custom-id="column-1-1"],
				[data-custom-id="column-2-1"],
				[data-custom-id="column-2-2"],
				[data-custom-id="column-3-1"],
				[data-custom-id="column-3-2"],
				[data-custom-id="column-3-3"] {
					position: relative;
					left: 0;
				}
			`
			const upfunnels = JSON.parse(
				localStorage.getItem('@upfunnels-editor:1.0.0')!
			)

			const props = {
				...data,
				assets: data.assets.filter((asset: any) => asset.src)
			}

			if (upfunnels.state.state.from === 'funnel') {
				const newData: Page = {
					html: html,
					css: css!,
					js: script,
					props: props
				}

				await updatePage(newData, upfunnels.state.state.pageId!)
			} else {
				const templatePage = await axiosRoot().get(
					`/page-template/get/${upfunnels.state.state.pageTemplateId!}`
				)

				const newData: PageTemplate = {
					html: html,
					css: css!,
					js: script,
					props: props,
					category: templatePage.data.pageTemplate.category,
					name: templatePage.data.pageTemplate.name,
					status: templatePage.data.pageTemplate.status
				}

				await updatePageTemplate(newData, upfunnels.state.state.pageTemplateId!)
			}

			countSaveProject = 0
		} catch (error) {
			countSaveProject++

			if (countSaveProject === 2) {
				throw new Error(`Erro ao salvar a página: ${error}`)
			}
		}
	}

	let countPublishProject = 0
	editor.Commands.add('publish-project', async () => {
		try {
			if (
				editor.Panels.getButton('buttons', 'publish')?.attributes.label !==
				`<div class="loading-publish"></div>`
			) {
				editor.Panels.getButton('buttons', 'publish')?.set(
					'label',
					`<div class="loading-publish"></div>`
				)

				await editor.store()

				const upfunnels = JSON.parse(
					localStorage.getItem('@upfunnels-editor:1.0.0')!
				)

				if (!upfunnels.state.state.funnelId) {
					toast.error(
						'Erro ao publicar projeto. Tente novamente mais tarde',
						errorToast
					)

					return
				}

				const res = await getFunnelByID(upfunnels.state.state.funnelId)

				const currentPage = await getPageById({
					pageId: upfunnels.state.state.pageId!,
					showHTMLCSSJS: false
				})

				await publishPage({
					pageId: upfunnels.state.state.pageId!,
					domain: `${res?.domain?.domainName}${currentPage.path}`
				})

				toast.success('Projeto publicado com sucesso!', successToast)
				editor.Panels.getButton('buttons', 'publish')?.set('label', 'Publicar')

				countPublishProject = 0
			}
		} catch (error) {
			countPublishProject++

			if (countPublishProject === 2) {
				toast.error(
					'Erro ao publicar projeto, tente novamente mais tarde',
					errorToast
				)
				editor.Panels.getButton('buttons', 'publish')?.set('label', 'Publicar')

				return
			}

			editor.runCommand('publish-project')
		}
	})

	let countSaveTemplate = 0
	editor.Commands.add('save-template', async () => {
		try {
			if (
				editor.Panels.getButton('buttons', 'save')?.attributes.label !==
				`<div class="loading-publish"></div>`
			) {
				editor.Panels.getButton('buttons', 'save')?.set(
					'label',
					`<div class="loading-publish"></div>`
				)

				await editor.store()

				toast.success('Template salvo com sucesso!', successToast)
				editor.Panels.getButton('buttons', 'save')?.set('label', 'Salvar')

				countSaveTemplate = 0
			}
		} catch (error) {
			countSaveTemplate++

			if (countSaveTemplate === 2) {
				toast.error(
					'Erro ao salvar template, tente novamente mais tarde',
					errorToast
				)
				editor.Panels.getButton('buttons', 'save')?.set('label', 'Salvar')
			}

			await editor.store()
		}
	})

	let countSavePage = 0
	editor.Commands.add('save-page', async () => {
		try {
			if (
				editor.Panels.getButton('buttons', 'save')?.attributes.label !==
				`<div class="loading-publish"></div>`
			) {
				editor.Panels.getButton('buttons', 'save')?.set(
					'label',
					`<div class="loading-publish"></div>`
				)

				await editor.store()

				toast.success('Página salva com sucesso!', successToast)
				editor.Panels.getButton('buttons', 'save')?.set('label', 'Salvar')

				countSavePage = 0
			}
		} catch (error) {
			countSavePage++

			if (countSavePage === 2) {
				toast.error(
					'Erro ao salvar página, tente novamente mais tarde',
					errorToast
				)
				editor.Panels.getButton('buttons', 'save')?.set('label', 'Salvar')

				return
			}

			await editor.store()
		}
	})

	editor.Storage.add('remote', {
		async load(): Promise<any> {
			try {
				const upfunnels = JSON.parse(
					localStorage.getItem('@upfunnels-editor:1.0.0')!
				)

				if (upfunnels.state.state.from === 'funnel') {
					const { data } = await axiosRoot().get(
						`/page/get/${upfunnels.state.state.pageId!}`
					)

					return {
						styles: data.page.props ? data.page.props.styles : [{}],
						pages: data.page.props ? data.page.props.pages : [{}],
						assets: data.page.props
							? data.page.props.assets.filter((asset: any) => asset.src)
							: [{}]
					}
				} else {
					const { data } = await axiosRoot().get(
						`/page-template/get/${upfunnels.state.state.pageTemplateId!}`
					)

					return {
						styles: data.pageTemplate.props
							? data.pageTemplate.props.styles
							: [{}],
						pages: data.pageTemplate.props
							? data.pageTemplate.props.pages
							: [{}],
						assets: data.pageTemplate.props
							? data.pageTemplate.props.assets.filter((asset: any) => asset.src)
							: [{}]
					}
				}
			} catch (error) {
				toast.error(
					'Erro ao carregar página. Tente novamente mais tarde',
					errorToast
				)
			}
		},
		async store(data: any) {
			try {
				await saveProject(data)
			} catch (error) {
				toast.error(
					'Erro ao salvar projeto. Tente novamente mais tarde',
					errorToast
				)

				throw new Error(`Erro ao salvar a página: ${error}`)
			}
		}
	})

	editor.getConfig().showDevices = false

	editor.Panels.addPanel({
		id: 'devices',
		appendTo: '#panel__devices',
		buttons: [
			{
				id: 'back-button',
				command: () => {
					if (upfunnels.state.state.from === 'funnel') {
						const funnelId = upfunnels.state.state.funnelId
						window.location.href = `/funnel-flow/${funnelId}`
					} else {
						window.location.href = `/templates`
					}
				},
				className: 'arrow-back',
				active: 0,
				label: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.76807 6.41643L6.30057 10.9489C6.38168 11.03 6.42418 11.1256 6.42807 11.2356C6.43141 11.3456 6.38696 11.4464 6.29474 11.5381C6.20363 11.627 6.10557 11.6723 6.00057 11.6739C5.89613 11.675 5.7978 11.6298 5.70557 11.5381L0.638906 6.47143C0.566128 6.39809 0.515017 6.32365 0.485573 6.24809C0.456128 6.17254 0.441406 6.08976 0.441406 5.99976C0.441406 5.90976 0.456128 5.82698 0.485573 5.75143C0.515017 5.67587 0.566128 5.60171 0.638906 5.52893L5.70557 0.461428C5.78335 0.38365 5.87807 0.341983 5.98974 0.336428C6.10196 0.330872 6.20391 0.372539 6.29557 0.461428C6.38724 0.553094 6.43307 0.651983 6.43307 0.758094C6.43307 0.864761 6.38724 0.963928 6.29557 1.05559L1.76724 5.58309H11.4172C11.5361 5.58309 11.6353 5.62282 11.7147 5.70226C11.7942 5.78171 11.8339 5.88087 11.8339 5.99976C11.8339 6.11865 11.7942 6.21782 11.7147 6.29726C11.6353 6.37671 11.5361 6.41643 11.4172 6.41643H1.76807Z" fill="#444F55"/>
				</svg>`
			},
			{
				id: 'set-device-desktop',
				command: 'desktop',
				className: 'custom__btn device active device_desktop',
				active: 1,
				label: 'Desktop'
			},
			{
				id: 'set-device-mobile',
				command: 'mobile',
				className: 'custom__btn device device_mobile',
				label: 'Mobile'
			}
		]
	})

	editor.Panels.addPanel({
		id: 'actions',
		appendTo: '#panel__basic-actions',
		buttons: [
			{
				id: 'undo',
				className: 'disabled',
				label: `<svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2.58724 11.0009C2.46835 11.0009 2.36918 10.9612 2.28974 10.8817C2.2103 10.8023 2.17057 10.7031 2.17057 10.5842C2.17057 10.4654 2.2103 10.3662 2.28974 10.2867C2.36918 10.2073 2.46835 10.1676 2.58724 10.1676H8.21557C9.08002 10.1676 9.81613 9.87119 10.4239 9.27841C11.0328 8.68563 11.3372 7.96174 11.3372 7.10674C11.3372 6.25174 11.0331 5.53063 10.4247 4.94341C9.81585 4.35563 9.07946 4.06174 8.21557 4.06174H1.76391L3.93974 6.23758C4.02863 6.32647 4.07307 6.4248 4.07307 6.53258C4.07307 6.64036 4.02863 6.73869 3.93974 6.82758C3.85085 6.91647 3.75002 6.95813 3.63724 6.95258C3.52391 6.94702 3.42807 6.90536 3.34974 6.82758L0.638073 4.11758C0.565851 4.0448 0.515017 3.97036 0.485573 3.89424C0.456128 3.81869 0.441406 3.73591 0.441406 3.64591C0.441406 3.55591 0.456128 3.47313 0.485573 3.39758C0.515017 3.32202 0.566128 3.24786 0.638906 3.17508L3.34974 0.463411C3.43863 0.374522 3.53696 0.330078 3.64474 0.330078C3.75252 0.330078 3.85085 0.374522 3.93974 0.463411C4.02863 0.5523 4.0703 0.653133 4.06474 0.765911C4.05918 0.878689 4.01752 0.974523 3.93974 1.05341L1.76391 3.22841H8.21557C9.30613 3.22841 10.2381 3.60452 11.0114 4.35674C11.7836 5.10897 12.1697 6.02563 12.1697 7.10674C12.1697 8.18786 11.7836 9.1073 11.0114 9.86508C10.2392 10.6229 9.30696 11.0015 8.21474 11.0009H2.58724Z" fill="#444F55"/>
				</svg>
				`,
				command: () => {
					um.undo()
					dispatchUndoRepo()

					const configPage = document.querySelector(
						'.config-page'
					) as HTMLInputElement

					configPage.style.display = 'flex'

					setAttributeToContentWidth()
				}
			},
			{
				id: 'redo',
				className: 'disabled',
				label: `<svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M11.2367 4.06063H4.78425C3.9198 4.06063 3.18369 4.35451 2.57591 4.94229C1.96702 5.53007 1.66258 6.25118 1.66258 7.10562C1.66258 7.96007 1.96675 8.68396 2.57508 9.27729C3.18397 9.87007 3.92036 10.1665 4.78425 10.1665H10.4126C10.5315 10.1665 10.6306 10.2062 10.7101 10.2856C10.7895 10.3651 10.8292 10.4642 10.8292 10.5831C10.8292 10.702 10.7895 10.8012 10.7101 10.8806C10.6306 10.9601 10.5315 10.9998 10.4126 10.9998H4.78425C3.69369 10.9998 2.76175 10.6209 1.98841 9.86312C1.21508 9.10535 0.828969 8.18618 0.830081 7.10562C0.831192 6.02507 1.2173 5.1084 1.98841 4.35563C2.7623 3.6034 3.69453 3.22729 4.78508 3.22729H11.2376L9.06091 1.05146C8.98314 0.973681 8.94147 0.877847 8.93591 0.763959C8.93036 0.651181 8.97203 0.550348 9.06091 0.461459C9.1498 0.37257 9.24814 0.328125 9.35591 0.328125C9.46369 0.328125 9.56203 0.37257 9.65091 0.461459L12.3617 3.17313C12.4345 3.24535 12.4856 3.31951 12.5151 3.39563C12.5445 3.47174 12.5592 3.55451 12.5592 3.64396C12.5592 3.7334 12.5445 3.81618 12.5151 3.89229C12.4862 3.9684 12.4354 4.04285 12.3626 4.11563L9.65091 6.82646C9.57314 6.90424 9.47758 6.9459 9.36425 6.95146C9.25091 6.95701 9.1498 6.91535 9.06091 6.82646C8.97203 6.73757 8.92758 6.63951 8.92758 6.53229C8.92758 6.42507 8.97203 6.32674 9.06091 6.23729L11.2367 4.06063Z" fill="#444F55"/>
				</svg>
				`,
				command: () => {
					um.redo()
					dispatchUndoRepo()

					const configPage = document.querySelector(
						'.config-page'
					) as HTMLInputElement

					configPage.style.display = 'flex'

					setAttributeToContentWidth()
				}
			},
			{
				id: 'sw-visibility',
				command: 'sw-visibility',
				attributes: { title: 'Visualizar componentes' },
				className: 'custom__btn sw-visibility',
				label: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.847318 1.35787C0.701762 1.35787 0.579818 1.3087 0.481484 1.21037C0.383151 1.11204 0.333984 0.990647 0.333984 0.846203C0.333984 0.701758 0.383151 0.579814 0.481484 0.480369C0.579818 0.380925 0.701762 0.331758 0.847318 0.332869C0.992873 0.33398 1.11454 0.383147 1.21232 0.480369C1.3101 0.577591 1.35926 0.699536 1.35982 0.846203C1.36037 0.992869 1.31121 1.11454 1.21232 1.2112C1.11343 1.30787 0.991484 1.35704 0.846484 1.3587M3.92398 1.3587C3.77843 1.3587 3.65648 1.30954 3.55815 1.2112C3.45982 1.11287 3.41065 0.991203 3.41065 0.846203C3.41065 0.701203 3.45982 0.579258 3.55815 0.480369C3.65648 0.38148 3.77843 0.332314 3.92398 0.332869C4.06954 0.333425 4.19121 0.382591 4.28898 0.480369C4.38676 0.578147 4.43593 0.700092 4.43648 0.846203C4.43704 0.992314 4.38787 1.11398 4.28898 1.2112C4.1901 1.30842 4.06843 1.35759 3.92398 1.3587ZM7.00065 1.3587C6.85565 1.3587 6.73398 1.30954 6.63565 1.2112C6.53732 1.11287 6.48815 0.991203 6.48815 0.846203C6.48815 0.701203 6.53732 0.579258 6.63565 0.480369C6.73398 0.38148 6.85565 0.332314 7.00065 0.332869C7.14565 0.333425 7.2676 0.382591 7.36648 0.480369C7.46537 0.578147 7.51426 0.700092 7.51315 0.846203C7.51204 0.992314 7.46287 1.11398 7.36565 1.2112C7.26843 1.30842 7.14676 1.35815 7.00065 1.3587ZM10.0773 1.35787C9.93232 1.35787 9.81065 1.3087 9.71232 1.21037C9.61398 1.11204 9.56482 0.990091 9.56482 0.844536C9.56482 0.69898 9.61398 0.577314 9.71232 0.479536C9.81065 0.381758 9.93232 0.332591 10.0773 0.332036C10.2223 0.33148 10.3443 0.380647 10.4432 0.479536C10.542 0.578425 10.5912 0.700369 10.5907 0.845369C10.5901 0.990369 10.5409 1.11204 10.4432 1.21037C10.3454 1.3087 10.2234 1.35787 10.0773 1.35787ZM13.154 1.35787C13.009 1.35787 12.8873 1.3087 12.789 1.21037C12.6907 1.11204 12.6415 0.990091 12.6415 0.844536C12.6415 0.69898 12.6907 0.577314 12.789 0.479536C12.8873 0.381758 13.009 0.332591 13.154 0.332036C13.299 0.33148 13.4209 0.380647 13.5198 0.479536C13.6187 0.578425 13.6679 0.700369 13.6673 0.845369C13.6668 0.990369 13.6176 1.11204 13.5198 1.21037C13.422 1.3087 13.2995 1.35787 13.154 1.35787ZM0.846484 4.43537C0.701484 4.43537 0.579818 4.3862 0.481484 4.28787C0.383151 4.18954 0.333984 4.06787 0.333984 3.92287C0.333984 3.77787 0.383151 3.65593 0.481484 3.55704C0.579818 3.45815 0.701762 3.40898 0.847318 3.40954C0.992873 3.41009 1.11454 3.45926 1.21232 3.55704C1.3101 3.65481 1.35926 3.77676 1.35982 3.92287C1.36037 4.06898 1.31121 4.19065 1.21232 4.28787C1.11343 4.38509 0.991762 4.43426 0.847318 4.43537M13.1548 4.43537C13.0093 4.43537 12.8873 4.3862 12.789 4.28787C12.6907 4.18954 12.6415 4.06787 12.6415 3.92287C12.6415 3.77787 12.6907 3.65593 12.789 3.55704C12.8873 3.45815 13.0093 3.40898 13.1548 3.40954C13.3004 3.41009 13.422 3.45926 13.5198 3.55704C13.6182 3.65537 13.6673 3.77731 13.6673 3.92287C13.6673 4.06842 13.6182 4.19009 13.5198 4.28787C13.4215 4.38565 13.2998 4.43481 13.1548 4.43537ZM0.846484 7.51287C0.701484 7.51287 0.579818 7.4637 0.481484 7.36537C0.383151 7.26593 0.333984 7.14398 0.333984 6.99954C0.333984 6.85509 0.383151 6.73343 0.481484 6.63454C0.579818 6.53565 0.701762 6.48648 0.847318 6.48704C0.992873 6.48759 1.11454 6.53676 1.21232 6.63454C1.3101 6.73231 1.35926 6.85398 1.35982 6.99954C1.36037 7.14509 1.31121 7.26704 1.21232 7.36537C1.11343 7.4637 0.991484 7.51259 0.846484 7.51204M13.1548 7.51204C13.0093 7.51204 12.8873 7.46287 12.789 7.36454C12.6907 7.2662 12.6418 7.14454 12.6423 6.99954C12.6429 6.85454 12.692 6.73287 12.7898 6.63454C12.8876 6.5362 13.0093 6.48704 13.1548 6.48704C13.3004 6.48704 13.4223 6.5362 13.5207 6.63454C13.619 6.73287 13.6679 6.85454 13.6673 6.99954C13.6668 7.14454 13.6176 7.26648 13.5198 7.36537C13.422 7.46426 13.3004 7.51315 13.1548 7.51204ZM0.846484 10.5895C0.701484 10.5895 0.579818 10.5404 0.481484 10.442C0.383151 10.3437 0.333984 10.2218 0.333984 10.0762C0.333984 9.93065 0.383151 9.80898 0.481484 9.7112C0.579818 9.61343 0.701762 9.56426 0.847318 9.5637C0.992873 9.56315 1.11454 9.61231 1.21232 9.7112C1.3101 9.81009 1.35926 9.93176 1.35982 10.0762C1.36037 10.2206 1.31121 10.3426 1.21232 10.442C1.11343 10.5415 0.991762 10.5906 0.847318 10.5895M13.1548 10.5895C13.0093 10.5895 12.8873 10.5404 12.789 10.442C12.6907 10.3437 12.6415 10.2218 12.6415 10.0762C12.6415 9.93065 12.6907 9.80898 12.789 9.7112C12.8873 9.61343 13.0093 9.56426 13.1548 9.5637C13.3004 9.56315 13.422 9.61231 13.5198 9.7112C13.6182 9.80954 13.6673 9.9312 13.6673 10.0762C13.6673 10.2212 13.6182 10.3431 13.5198 10.442C13.4215 10.5409 13.2998 10.5901 13.1548 10.5895ZM0.846484 13.6662C0.701484 13.6662 0.579818 13.617 0.481484 13.5187C0.383151 13.4204 0.333984 13.2987 0.333984 13.1537C0.333984 13.0087 0.383151 12.8868 0.481484 12.7879C0.579818 12.689 0.701762 12.6398 0.847318 12.6404C0.992318 12.6404 1.11398 12.6895 1.21232 12.7879C1.31065 12.8862 1.35982 13.0079 1.35982 13.1529C1.35982 13.2979 1.31065 13.4198 1.21232 13.5187C1.11398 13.6176 0.992318 13.6668 0.847318 13.6662M3.92398 13.6662C3.77843 13.6662 3.65648 13.617 3.55815 13.5187C3.45982 13.4204 3.41065 13.2987 3.41065 13.1537C3.41065 13.0087 3.45982 12.8868 3.55815 12.7879C3.65648 12.689 3.77843 12.6398 3.92398 12.6404C4.06954 12.6409 4.19121 12.6901 4.28898 12.7879C4.38676 12.8856 4.43593 13.0073 4.43648 13.1529C4.43704 13.2984 4.38787 13.4204 4.28898 13.5187C4.1901 13.617 4.06843 13.6662 3.92398 13.6662ZM7.00065 13.6662C6.85565 13.6662 6.73398 13.617 6.63565 13.5187C6.53732 13.4204 6.48815 13.2987 6.48815 13.1537C6.48815 13.0087 6.53732 12.8868 6.63565 12.7879C6.73398 12.689 6.85565 12.6398 7.00065 12.6404C7.14565 12.6409 7.2676 12.6901 7.36648 12.7879C7.46537 12.8856 7.51426 13.0073 7.51315 13.1529C7.51315 13.2984 7.46398 13.4204 7.36565 13.5187C7.26732 13.617 7.14565 13.6662 7.00065 13.6662ZM10.0773 13.6662C9.93232 13.6662 9.81065 13.617 9.71232 13.5187C9.61398 13.4204 9.56482 13.2987 9.56482 13.1537C9.56482 13.0087 9.61398 12.8868 9.71232 12.7879C9.81065 12.689 9.93232 12.6398 10.0773 12.6404C10.2223 12.6409 10.3443 12.6901 10.4432 12.7879C10.542 12.8856 10.5912 13.0073 10.5907 13.1529C10.5901 13.2984 10.5409 13.4204 10.4432 13.5187C10.3454 13.617 10.2234 13.6662 10.0773 13.6662ZM13.154 13.6662C13.009 13.6662 12.8873 13.617 12.789 13.5187C12.6907 13.4204 12.6415 13.2987 12.6415 13.1537C12.6415 13.0087 12.6907 12.8868 12.789 12.7879C12.8873 12.689 13.009 12.6398 13.154 12.6404C13.299 12.6409 13.4209 12.6901 13.5198 12.7879C13.6187 12.8856 13.6679 13.0073 13.6673 13.1529C13.6673 13.2984 13.6182 13.4204 13.5198 13.5187C13.4215 13.617 13.299 13.6662 13.154 13.6662Z" fill="#444F55"/>
				</svg>`,
				active: true
			}
		]
	})

	editor.Panels.addPanel({
		id: 'config-page',
		appendTo: '#panel__config-page',
		buttons: [
			{
				id: 'set-config-page',
				command: 'config-page',
				className: 'custom__btn config config-page',
				label: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6.44568 15.5L6.14401 13.09C5.8779 13.0094 5.5904 12.8833 5.28151 12.7117C4.97207 12.5394 4.70901 12.355 4.49234 12.1583L2.26901 13.1042L0.714844 10.3958L2.63651 8.94667C2.61151 8.79667 2.59123 8.64167 2.57568 8.48167C2.55901 8.32167 2.55068 8.16639 2.55068 8.01583C2.55068 7.87583 2.55901 7.72861 2.57568 7.57417C2.59123 7.41972 2.61151 7.24583 2.63651 7.0525L0.714844 5.605L2.26901 2.92833L4.47568 3.85833C4.72457 3.65111 4.99401 3.46417 5.28401 3.2975C5.5729 3.13083 5.85429 3.00194 6.12818 2.91083L6.44484 0.5H9.55484L9.85568 2.92667C10.1751 3.03889 10.4573 3.1675 10.7023 3.3125C10.9473 3.4575 11.1998 3.63917 11.4598 3.8575L13.7307 2.92833L15.2848 5.60417L13.2998 7.10083C13.3454 7.27306 13.371 7.43111 13.3765 7.575C13.3821 7.71889 13.3848 7.86056 13.3848 8C13.3848 8.12944 13.3793 8.26583 13.3682 8.40917C13.3576 8.55306 13.3332 8.72694 13.2948 8.93083L15.2482 10.3958L13.694 13.1042L11.4598 12.1425C11.2004 12.3608 10.9393 12.5478 10.6765 12.7033C10.4137 12.8589 10.1401 12.9825 9.85568 13.0742L9.55484 15.5H6.44568ZM7.16651 14.6667H8.79651L9.10401 12.41C9.52401 12.2989 9.90179 12.1464 10.2373 11.9525C10.574 11.7586 10.9162 11.4931 11.264 11.1558L13.3432 12.0417L14.1715 10.625L12.3473 9.255C12.4168 9.01778 12.4629 8.79944 12.4857 8.6C12.5079 8.40111 12.519 8.20111 12.519 8C12.519 7.78889 12.5079 7.58889 12.4857 7.4C12.4635 7.21111 12.4173 7.00361 12.3473 6.7775L14.2032 5.375L13.3748 3.95833L11.2482 4.85C10.996 4.57278 10.6646 4.31306 10.254 4.07083C9.8429 3.82917 9.45401 3.66889 9.08735 3.59L8.83318 1.33333H7.17151L6.91151 3.57417C6.49151 3.66361 6.1054 3.80806 5.75318 4.0075C5.40151 4.20639 5.05151 4.48 4.70318 4.82833L2.62484 3.95833L1.79651 5.375L3.60401 6.725C3.53457 6.91167 3.48596 7.11444 3.45818 7.33333C3.4304 7.55222 3.41651 7.78 3.41651 8.01667C3.41651 8.22778 3.4304 8.4375 3.45818 8.64583C3.48596 8.85417 3.52929 9.05694 3.58818 9.25417L1.79651 10.625L2.62484 12.0417L4.68734 11.1667C5.01457 11.4967 5.35401 11.7614 5.70568 11.9608C6.0579 12.1603 6.45457 12.3156 6.89568 12.4267L7.16651 14.6667ZM7.97734 10.0833C8.55846 10.0833 9.05096 9.88139 9.45484 9.4775C9.85873 9.07361 10.0607 8.58111 10.0607 8C10.0607 7.41889 9.85873 6.92639 9.45484 6.5225C9.05096 6.11861 8.55846 5.91667 7.97734 5.91667C7.3929 5.91667 6.89957 6.11861 6.49734 6.5225C6.09512 6.92639 5.89401 7.41889 5.89401 8C5.89401 8.58111 6.09512 9.07361 6.49734 9.4775C6.89957 9.88139 7.3929 10.0833 7.97734 10.0833Z" fill="#444F55"/>
				</svg>`
			}
		]
	})

	const upfunnels = JSON.parse(localStorage.getItem('@upfunnels-editor:1.0.0')!)

	if (upfunnels.state.state.from === 'template') {
		editor.Panels.addPanel({
			id: 'buttons',
			appendTo: '#panel__buttons',
			buttons: [
				{
					id: 'preview',
					command: 'change_mode',
					attributes: { title: 'Pré visualizar' },
					className: 'custom__btn preview',
					label: 'Pré-visualizar'
				},
				{
					id: 'save',
					command: () => editor.runCommand('save-template'),
					className: 'custom__btn publish',
					attributes: { title: 'Salvar' },
					label: 'Salvar'
				}
			]
		})
	} else {
		editor.Panels.addPanel({
			id: 'buttons',
			appendTo: '#panel__buttons',
			buttons: [
				{
					id: 'preview',
					command: 'change_mode',
					attributes: { title: 'Pré visualizar' },
					className: 'custom__btn preview',
					label: 'Pré-visualizar'
				},
				{
					id: 'save',
					command: () => editor.runCommand('save-page'),
					className: 'custom__btn save',
					attributes: { title: 'Salvar' },
					label: 'Salvar'
				},
				{
					id: 'publish',
					command: () => editor.runCommand('publish-project'),
					className: 'custom__btn publish',
					attributes: { title: 'Publicar' },
					label: 'Publicar'
				}
			]
		})
	}

	editor.Panels.addPanel({
		id: 'title-style-content',
		appendTo: '#titleStyleContent',
		buttons: [
			{
				id: 'title',
				className: 'title-style-content',
				label: `Configurações`
			},
			{
				id: 'set-stop-edit-component',
				command: () => {
					editor.stopCommand('edit-component')
					editor.stopCommand('config-page')

					editor.select()
				},
				className: 'custom__btn stop-edit-component',
				label: `<svg width="12" height="12" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M9 0.5L1 8.5M1 0.5L9 8.5" stroke="#181818" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>`
			}
		]
	})

	editor.Commands.add('change_mode', {
		run: function (editor) {
			document
				.querySelector('#root > section')
				?.classList.add('preview-enabled')
			removeStyleManager()

			editor.runCommand('preview')
			editor.stopCommand('edit-component')
		},
		stop: function (editor) {
			document
				.querySelector('#root > section')
				?.classList.remove('preview-enabled')

			editor.stopCommand('preview')
		}
	})

	editor.Commands.add('desktop', {
		run(e) {
			removeAttributesVideoImgGeometricShapes()

			e.setDevice('Desktop')

			editor.stopCommand('edit-component')
			editor.select()

			changeToDesktop++
		},
		stop() {}
	})

	function extractTranslateValues(cssString: string) {
		const globalTransformRegex =
			/([^\s#{}]+)\s*{[^}]*transform\s*:\s*translateX\(([^)]+)\)\s*translateY\(([^)]+)\)[^}]*}/
		const mediaTransformRegex =
			/@media\s*\(max-width:\s*980px\)\s*{[^}]*([^\s#{}]+)\s*{[^}]*transform\s*:\s*translateX\(([^)]+)\)\s*translateY\(([^)]+)\)[^}]*}}/

		const globalTransformMatch = cssString.match(globalTransformRegex)
		const globalTransforms = globalTransformMatch
			? {
					translateX: globalTransformMatch[2]
						? globalTransformMatch[2].trim()
						: null,
					translateY: globalTransformMatch[3]
						? globalTransformMatch[3].trim()
						: null
			  }
			: null

		const mediaTransformMatch = cssString.match(mediaTransformRegex)
		const mediaTransforms = mediaTransformMatch
			? {
					translateX: mediaTransformMatch[2]
						? mediaTransformMatch[2].trim()
						: null,
					translateY: mediaTransformMatch[3]
						? mediaTransformMatch[3].trim()
						: null
			  }
			: null

		return {
			globalTransforms,
			mediaTransforms
		}
	}

	function addStyleToPosition(
		globalTransforms: {
			translateX: string | null
			translateY: string | null
		} | null,
		mediaTransforms: {
			translateX: string | null
			translateY: string | null
		} | null,
		component: Component
	) {
		if (!mediaTransforms && globalTransforms?.translateY) {
			component.addStyle({
				left: '0',
				width: '300px',
				transform: `translateX(0px) translateY(${globalTransforms.translateY})`,
				'max-width': '300px'
			})
		} else if (!mediaTransforms && !globalTransforms?.translateY) {
			component.addStyle({
				left: '0',
				width: '300px',
				transform: `translateX(0px) translateY(0px)`,
				'max-width': '300px'
			})
		}
	}

	function addStyleToPositionAndSize(
		styles: CSSStyleDeclaration,
		component: Component,
		proportion: number
	) {
		if (+styles?.width.split('px')[0] > 300 && !component.getStyle()) {
			const translateX = getTranslateX(styles.transform)
			const translateY = getTranslateY(styles.transform)

			component.addStyle({
				left: '0',
				transform: `translateX(${translateX}) translateY(${translateY})`,
				'max-width': '300px',
				width: '300px',
				height: `${300 / proportion}px`
			})
		} else if (
			+styles?.width.split('px')[0] > 300 &&
			component.getStyle() &&
			!component.getStyle().width &&
			!component.getStyle().height
		) {
			const translateX = getTranslateX(component.getStyle().transform as string)
			const translateY = getTranslateY(component.getStyle().transform as string)

			component.addStyle({
				left: '0',
				transform: `translateX(${translateX}) translateY(${translateY})`,
				'max-width': '300px',
				width: '300px',
				height: `${300 / proportion}px`
			})
		} else if (
			+styles?.width.split('px')[0] > 300 &&
			component.getStyle() &&
			component.getStyle().width &&
			component.getStyle().height
		) {
			const translateX = getTranslateX(component.getStyle().transform as string)
			const translateY = getTranslateY(component.getStyle().transform as string)

			component.addStyle({
				left: '0',
				transform: `translateX(${translateX}) translateY(${translateY})`,
				'max-width': '300px',
				width: component.getStyle().width,
				height: component.getStyle().height
			})
		} else if (+styles?.width.split('px')[0] <= 300 && !component.getStyle()) {
			component.addStyle({
				left: '0',
				transform: `translateX(0px) translateY(0px)`,
				'max-width': '300px',
				width: styles.width,
				height: `${+styles?.width.split('px')[0] / proportion}px`
			})
		} else if (
			+styles?.width.split('px')[0] <= 300 &&
			component.getStyle() &&
			!component.getStyle().width &&
			!component.getStyle().height
		) {
			const translateX = getTranslateX(component.getStyle().transform as string)
			const translateY = getTranslateY(component.getStyle().transform as string)

			component.addStyle({
				left: '0',
				transform: `translateX(${translateX}) translateY(${translateY})`,
				'max-width': '300px',
				width: styles.width,
				height: `${+styles?.width.split('px')[0] / proportion}px`
			})
		} else if (
			+styles?.width.split('px')[0] <= 300 &&
			component.getStyle() &&
			component.getStyle().width &&
			component.getStyle().height
		) {
			const translateX = getTranslateX(component.getStyle().transform as string)
			const translateY = getTranslateY(component.getStyle().transform as string)

			component.addStyle({
				left: '0',
				transform: `translateX(${translateX}) translateY(${translateY})`,
				'max-width': '300px',
				width: component.getStyle().width,
				height: component.getStyle().height
			})
		}
	}

	function centralizeComponents() {
		const h1 = editor.DomComponents.getWrapper()?.find('h1')
		if (h1) {
			h1.forEach((item) => {
				const componentCss = editor.CodeManager.getCode(item, 'css')

				const { globalTransforms, mediaTransforms } =
					extractTranslateValues(componentCss)

				addStyleToPosition(globalTransforms, mediaTransforms, item)
			})

			h1?.[0]?.parent()?.addStyle({
				display: 'block !important'
			})
		}

		const p = editor.DomComponents.getWrapper()?.find('p')
		if (p) {
			p.forEach((item) => {
				const componentCss = editor.CodeManager.getCode(item, 'css')

				const { globalTransforms, mediaTransforms } =
					extractTranslateValues(componentCss)

				addStyleToPosition(globalTransforms, mediaTransforms, item)
			})

			p?.[0]?.parent()?.addStyle({
				display: 'block !important'
			})
		}

		const img = editor.DomComponents.getWrapper()?.find('img')
		if (img) {
			img.forEach((item) => {
				const iFrames = document.getElementsByClassName('gjs-frame')
				const iFrame = iFrames[0] as HTMLIFrameElement
				const documentIFrame = iFrame.contentWindow?.document

				const component = documentIFrame?.querySelector(
					`#${item.ccid}`
				) as HTMLIFrameElement
				const computedStyles = window.getComputedStyle(component)

				const img = new Image()
				const base64 = item.attributes.src
				img.src = base64

				const proportion = img.width / img.height

				addStyleToPositionAndSize(computedStyles, item, proportion)
			})

			img?.[0]?.parent()?.addStyle({
				display: 'block !important'
			})
		}

		const video = editor.DomComponents.getWrapper()?.find(
			'[data-gjs-type="video"]'
		)
		if (video) {
			video.forEach((item) => {
				const componentCss = editor.CodeManager.getCode(item, 'css')

				const { globalTransforms, mediaTransforms } =
					extractTranslateValues(componentCss)

				addStyleToPosition(globalTransforms, mediaTransforms, item)
			})

			video?.[0]?.parent()?.addStyle({
				display: 'block !important'
			})
		}

		const form = editor.DomComponents.getWrapper()?.find('form')
		if (form) {
			form.forEach((item) => {
				const componentCss = editor.CodeManager.getCode(item, 'css')

				const { globalTransforms, mediaTransforms } =
					extractTranslateValues(componentCss)

				addStyleToPosition(globalTransforms, mediaTransforms, item)
			})

			form?.[0]?.parent()?.addStyle({
				display: 'block !important'
			})
		}

		const a = editor.DomComponents.getWrapper()?.find('a')
		if (a) {
			a.forEach((item) => {
				const componentCss = editor.CodeManager.getCode(item, 'css')

				const { globalTransforms, mediaTransforms } =
					extractTranslateValues(componentCss)

				addStyleToPosition(globalTransforms, mediaTransforms, item)
			})

			a?.[0]?.parent()?.addStyle({
				display: 'block !important'
			})
		}

		const square = editor.DomComponents.getWrapper()?.find(
			'[data-custom-id="square"]'
		)
		if (square) {
			square.forEach((item) => {
				const componentCss = editor.CodeManager.getCode(item, 'css')

				const { globalTransforms, mediaTransforms } =
					extractTranslateValues(componentCss)

				addStyleToPosition(globalTransforms, mediaTransforms, item)
			})

			square?.[0]?.parent()?.addStyle({
				display: 'block !important'
			})
		}

		const ellipse = editor.DomComponents.getWrapper()?.find(
			'[data-custom-id="ellipse"]'
		)
		if (ellipse) {
			ellipse.forEach((item) => {
				const componentCss = editor.CodeManager.getCode(item, 'css')

				const { globalTransforms, mediaTransforms } =
					extractTranslateValues(componentCss)

				addStyleToPosition(globalTransforms, mediaTransforms, item)
			})

			ellipse?.[0]?.parent()?.addStyle({
				display: 'block !important'
			})
		}
	}

	let changeToDesktop = 0
	function removeAttributesVideoImgGeometricShapes() {
		if (changeToDesktop > 1) {
			const iFrames = document.getElementsByClassName('gjs-frame')
			const iFrame = iFrames[0] as HTMLIFrameElement
			const documentIFrame = iFrame.contentWindow?.document

			const videos = documentIFrame?.querySelectorAll(
				'[data-gjs-type="video"]'
			) as unknown as HTMLElement[]
			const imgs = documentIFrame?.querySelectorAll(
				`img`
			) as unknown as HTMLElement[]
			const squares = documentIFrame?.querySelectorAll(
				'[data-custom-id="square"]'
			) as unknown as HTMLElement[]
			const ellipses = documentIFrame?.querySelectorAll(
				'[data-custom-id="ellipse"]'
			) as unknown as HTMLElement[]

			const editorVideo = editor.DomComponents.getWrapper()?.find(
				'[data-gjs-type="video"]'
			)
			const editorImg = editor.DomComponents.getWrapper()?.find(`img`)
			const editorSquare = editor.DomComponents.getWrapper()?.find(
				'[data-custom-id="square"]'
			)
			const editorEllipse = editor.DomComponents.getWrapper()?.find(
				'[data-custom-id="ellipse"]'
			)

			videos.forEach((video, index) => {
				const styles = video.getAttribute('style')
				const widthValue = styles
					?.split(';')
					.find((style) => style.trim().startsWith('width'))
					?.split(':')[1]
					.trim()

				if (widthValue) {
					editorVideo?.[index].addStyle({
						width: widthValue
					})
				}

				video.removeAttribute('style')
			})

			imgs.forEach((img, index) => {
				const styles = img.getAttribute('style')
				const widthValue = styles
					?.split(';')
					.find((style) => style.trim().startsWith('width'))
					?.split(':')[1]
					.trim()

				if (widthValue) {
					editorImg?.[index].addStyle({
						width: widthValue
					})
				}

				img.removeAttribute('style')
			})

			squares.forEach((square, index) => {
				const styles = square.getAttribute('style')
				const widthValue = styles
					?.split(';')
					.find((style) => style.trim().startsWith('width'))
					?.split(':')[1]
					.trim()

				if (widthValue) {
					editorSquare?.[index].addStyle({
						width: widthValue
					})
				}

				square.removeAttribute('style')
			})

			ellipses.forEach((ellipse, index) => {
				const styles = ellipse.getAttribute('style')
				const widthValue = styles
					?.split(';')
					.find((style) => style.trim().startsWith('width'))
					?.split(':')[1]
					.trim()

				if (widthValue) {
					editorEllipse?.[index].addStyle({
						width: widthValue
					})
				}

				ellipse.removeAttribute('style')
			})
		}
	}

	function minHeightToDivMobile() {
		const components = editor.DomComponents.getWrapper()?.find(`[data-column]`)
		const columns = editor.DomComponents.getWrapper()?.find(
			`[data-custom-id="container-column-1-1"]`
		)

		let maxTranslateY = -Infinity
		components?.forEach((component) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
			const componentHeight = component.view?.$el[0].offsetHeight!
			const dataColumn = component.getAttributes()['data-column']

			if (componentHeight > maxTranslateY) {
				const columnIndex = dataColumn - 1

				maxTranslateY = componentHeight

				columns?.[columnIndex].addStyle({
					'min-height': `${maxTranslateY}px`
				})
			}
		})
	}

	editor.Commands.add('mobile', {
		run(e) {
			removeAttributesVideoImgGeometricShapes()

			e.setDevice('Mobile')

			const oneColumn = editor.DomComponents.getWrapper()?.find(
				`[data-custom-id="column-1-1"]`
			)

			if (oneColumn) {
				oneColumn.forEach((item) =>
					item.addStyle({
						'max-width': '300px',
						'flex-basis': '300px'
					})
				)
			}

			editor.DomComponents.getWrapper()?.addStyle({
				margin: '0 auto !important'
			})

			editor.stopCommand('edit-component')
			editor.select()

			centralizeComponents()

			if (changeToDesktop === 1) {
				minHeightToDivMobile()
			}

			changeToDesktop++
		},
		stop() {}
	})

	editor.Commands.add('edit-component', {
		run(e) {
			const typeComponent = e.getSelected()?.get('type')
			const tagName = e.getSelected()?.attributes.tagName

			switch (tagName) {
				case 'h1':
					EditorPropertiesTitle(editor)
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
					EditorPropertiesForm(editor)
					break
				case 'p':
					EditorPropertiesText(editor)
					break
				case 'iframe':
					break
			}

			switch (typeComponent) {
				case 'image':
					break
				case 'link':
					EditorPropertiesButton(editor)
					break
				case 'div':
					EditorPropertiesBlock(editor)
					break
			}

			addStyleManager()
		},
		stop() {
			removeStyleManager()
			editor.StyleManager.removeSector('configuracao-pagina')
		}
	})

	editor.Commands.add('config-page', {
		run(e) {
			editor.select()
			EditorPropertiesContentWrapper(e)
			editor.runCommand('edit-component')
			editor.runCommand('sw-visibility')
		},
		stop() {
			editor.stopCommand('edit-component')
			editor.StyleManager.removeSector('configuracao-pagina')
			editor.runCommand('sw-visibility')

			document
				.querySelector('.config.config-page')
				?.classList.remove('gjs-pn-active', 'gjs-four-color')
		}
	})

	editor.Commands.add('tlb-delete', {
		run(e) {
			e.getSelected()?.remove()
			e.select()
			removeStyleManager()
		}
	})

	editor.Blocks.add('video', {
		label: 'Vídeo',
		media: `<svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14.8713 2.17383C15.1994 3.32227 15.1994 5.7832 15.1994 5.7832C15.1994 5.7832 15.1994 8.2168 14.8713 9.39258C14.7072 10.0488 14.1877 10.541 13.5588 10.7051C12.383 11.0059 7.73458 11.0059 7.73458 11.0059C7.73458 11.0059 3.0588 11.0059 1.88302 10.7051C1.25412 10.541 0.734585 10.0488 0.570522 9.39258C0.242397 8.2168 0.242397 5.7832 0.242397 5.7832C0.242397 5.7832 0.242397 3.32227 0.570522 2.17383C0.734585 1.51758 1.25412 0.998047 1.88302 0.833984C3.0588 0.505859 7.73458 0.505859 7.73458 0.505859C7.73458 0.505859 12.383 0.505859 13.5588 0.833984C14.1877 0.998047 14.7072 1.51758 14.8713 2.17383ZM6.20333 7.99805L10.0861 5.7832L6.20333 3.56836V7.99805Z" fill="#444F55"/>
		</svg>`,
		content: `<div
		data-gjs-draggable="[data-custom-id=column-1-1]"
		data-gjs-type="video"
		style="
			width: 480px; 
			height: 270px;
		"
		>
		</div>
		<style>
			[data-gjs-type="video"] {
				position: absolute;
				left: 0px !important;
				top: 0px !important;
			}
		</style>`,
		activate: false,
		select: false
	})

	editor.Blocks.add('image', {
		label: 'Imagem',
		media: `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_3151_3839)">
		<path d="M15.2285 2C15.6452 2 15.9993 2.14583 16.291 2.4375C16.5827 2.72917 16.7285 3.08333 16.7285 3.5V12.5C16.7285 12.9167 16.5827 13.2708 16.291 13.5625C15.9993 13.8542 15.6452 14 15.2285 14H2.22852C1.81185 14 1.45768 13.8542 1.16602 13.5625C0.874349 13.2708 0.728516 12.9167 0.728516 12.5V3.5C0.728516 3.08333 0.874349 2.72917 1.16602 2.4375C1.45768 2.14583 1.81185 2 2.22852 2H15.2285ZM15.041 12.5C15.166 12.5 15.2285 12.4375 15.2285 12.3125V3.6875C15.2285 3.5625 15.166 3.5 15.041 3.5H2.41602C2.29102 3.5 2.22852 3.5625 2.22852 3.6875V12.3125C2.22852 12.4375 2.29102 12.5 2.41602 12.5H15.041ZM3.83789 5.10938C3.83789 5.10938 3.89779 5.04948 4.01758 4.92969C4.13737 4.8099 4.37435 4.75 4.72852 4.75C5.08268 4.75 5.37956 4.86979 5.61914 5.10938C5.85872 5.34896 5.97852 5.64583 5.97852 6C5.97852 6.35417 5.85872 6.65104 5.61914 6.89062C5.37956 7.13021 5.08268 7.25 4.72852 7.25C4.37435 7.25 4.07747 7.13021 3.83789 6.89062C3.59831 6.65104 3.47852 6.35417 3.47852 6C3.47852 5.64583 3.59831 5.34896 3.83789 5.10938ZM3.72852 11V9.5L4.97852 8.25C5.14518 8.08333 5.31185 8.08333 5.47852 8.25L6.72852 9.5L10.4785 5.75C10.6452 5.58333 10.8118 5.58333 10.9785 5.75L13.7285 8.5V11H3.72852Z" fill="#444F55"/>
		</g>
		<defs>
		<clipPath id="clip0_3151_3839">
		<rect width="16" height="16" fill="white" transform="matrix(1 0 0 -1 0.728516 16)"/>
		</clipPath>
		</defs>
		</svg>`,
		content: `<img
			data-gjs-type="image"
			data-gjs-draggable="[data-custom-id=column-1-1]"
		/>
		<style>
			img {
				position: absolute;
				left: 0px !important;
				top: 0px !important;
			}
		</style>`,
		activate: true,
		select: true
	})

	/* editor.Blocks.add('horizontal-line', {
		label: 'Linha horizontal',
		media: `<svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16 0.799976V1.19998C16 1.31664 15.9625 1.41248 15.8875 1.48748C15.8125 1.56248 15.7167 1.59998 15.6 1.59998H0.4C0.283333 1.59998 0.1875 1.56248 0.1125 1.48748C0.0375 1.41248 0 1.31664 0 1.19998V0.799976C0 0.683309 0.0375 0.587476 0.1125 0.512476C0.1875 0.437476 0.283333 0.399976 0.4 0.399976H15.6C15.7167 0.399976 15.8125 0.437476 15.8875 0.512476C15.9625 0.587476 16 0.683309 16 0.799976Z" fill="#444F55"/>
		</svg>`,
		content: `<div
				data-gjs-type="div"
				data-custom-id="square"
				style="
					width: 200px; 
					height: 200px;
					background: #e3e3e3;
				"
				data-gjs-draggable="[data-custom-id=column-1-1]"
			></div>
			<style>
				[data-custom-id="square"] {
					position: absolute;
					left: 0px !important;
					top: 0px !important;
				}
			</style>
		`,
		activate: false,
		select: false
	})

	editor.Blocks.add('vertical-line', {
		label: 'Linha vertical',
		media: `<svg width="2" height="16" viewBox="0 0 2 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0.800037 0H1.20004C1.3167 0 1.41254 0.0374994 1.48754 0.1125C1.56254 0.1875 1.60004 0.283333 1.60004 0.4V15.6C1.60004 15.7167 1.56254 15.8125 1.48754 15.8875C1.41254 15.9625 1.3167 16 1.20004 16H0.800037C0.68337 16 0.587537 15.9625 0.512537 15.8875C0.437537 15.8125 0.400037 15.7167 0.400037 15.6V0.4C0.400037 0.283333 0.437537 0.1875 0.512537 0.1125C0.587537 0.0374994 0.68337 0 0.800037 0Z" fill="#444F55"/>
		</svg>`,
		content: `<div
				data-gjs-type="div"
				data-custom-id="square"
				style="
					width: 200px; 
					height: 200px;
					background: #e3e3e3;
				"
				data-gjs-draggable="[data-custom-id=column-1-1]"
			></div>
			<style>
				[data-custom-id="square"] {
					position: absolute;
					left: 0px !important;
					top: 0px !important;
				}
			</style>
		`,
		activate: false,
		select: false
	}) */

	editor.Blocks.add('square', {
		label: 'Quadrado',
		media: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12.5 0C12.9167 0 13.2708 0.145833 13.5625 0.4375C13.8542 0.729167 14 1.08333 14 1.5V12.5C14 12.9167 13.8542 13.2708 13.5625 13.5625C13.2708 13.8542 12.9167 14 12.5 14H1.5C1.08333 14 0.729167 13.8542 0.4375 13.5625C0.145833 13.2708 0 12.9167 0 12.5V1.5C0 1.08333 0.145833 0.729167 0.4375 0.4375C0.729167 0.145833 1.08333 0 1.5 0H12.5ZM12.3125 12.5C12.4375 12.5 12.5 12.4375 12.5 12.3125V1.6875C12.5 1.5625 12.4375 1.5 12.3125 1.5H1.6875C1.5625 1.5 1.5 1.5625 1.5 1.6875V12.3125C1.5 12.4375 1.5625 12.5 1.6875 12.5H12.3125Z" fill="#444F55"/>
		</svg>`,
		content: `<div
				data-gjs-type="div"
				data-custom-id="square"
				style="
					width: 200px; 
					height: 200px;
					background: #e3e3e3;
				"
				data-gjs-draggable="[data-custom-id=column-1-1]"
			></div>
			<style>
				[data-custom-id="square"] {
					position: absolute;
					left: 0px !important;
					top: 0px !important;
				}
			</style>
		`,
		activate: false,
		select: false
	})

	editor.Blocks.add('ellipse', {
		label: 'Círculo',
		media: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2.51562 2.51562C2.51562 2.51562 2.89323 2.13802 3.64844 1.38281C4.40365 0.627604 5.85417 0.25 8 0.25C10.1458 0.25 11.974 1.00521 13.4844 2.51562C14.9948 4.02604 15.75 5.85417 15.75 8C15.75 10.1458 14.9948 11.974 13.4844 13.4844C11.974 14.9948 10.1458 15.75 8 15.75C5.85417 15.75 4.02604 14.9948 2.51562 13.4844C1.00521 11.974 0.25 10.1458 0.25 8C0.25 5.85417 1.00521 4.02604 2.51562 2.51562ZM3.57812 12.4219C3.57812 12.4219 3.88281 12.7266 4.49219 13.3359C5.10156 13.9453 6.27083 14.25 8 14.25C9.72917 14.25 11.2031 13.6406 12.4219 12.4219C13.6406 11.2031 14.25 9.72917 14.25 8C14.25 6.27083 13.6406 4.79688 12.4219 3.57812C11.2031 2.35938 9.72917 1.75 8 1.75C6.27083 1.75 4.79688 2.35938 3.57812 3.57812C2.35938 4.79688 1.75 6.27083 1.75 8C1.75 9.72917 2.35938 11.2031 3.57812 12.4219Z" fill="#444F55"/>
		</svg>`,
		content: `<div
				data-gjs-type="div"
				data-custom-id="ellipse"
				style="
					width: 200px; 
					height: 200px;
					border-radius: 50%;
					background: #e3e3e3;
				"
				data-gjs-draggable="[data-custom-id=column-1-1]"
			></div>
			<style>
				[data-custom-id="ellipse"] {
					position: absolute;
					left: 0px !important;
					top: 0px !important;
				}
			</style>
		`,
		activate: false,
		select: false
	})

	editor.Blocks.add('link', {
		label: 'Botão',
		media: `<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V6C1.5 7.38071 2.61929 8.5 4 8.5H16C17.3807 8.5 18.5 7.38071 18.5 6V4C18.5 2.61929 17.3807 1.5 16 1.5ZM4 0C1.79086 0 0 1.79086 0 4V6C0 8.20914 1.79086 10 4 10H16C18.2091 10 20 8.20914 20 6V4C20 1.79086 18.2091 0 16 0H4Z" fill="#444F55"/>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M4 4.75C4 4.33579 4.33579 4 4.75 4H15.25C15.6642 4 16 4.33579 16 4.75C16 5.16421 15.6642 5.5 15.25 5.5H4.75C4.33579 5.5 4 5.16421 4 4.75Z" fill="#444F55"/>
		</svg>`,
		content: `<a
				href="#"
				data-gjs-type="link"
				style="text-decoration: none;
					cursor: pointer;
					width: 200px;
					word-break: break-word;
					padding-right: 8px;
					padding-left: 8px;
					height: 54px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius:8px;
					border: none;
					box-shadow: none;
					background-color: #009ef7;
					color: #ffffff;
					font-size: 18px;
					font-family: Arial;
					text-align: center;"
					data-gjs-draggable="[data-custom-id=column-1-1]"
				type="button">Botão</a>
				<style>
					a {
						position: absolute;
						left: 0px !important;
						top: 0px !important;
					}
				</style>
			`,
		activate: true,
		select: true
	})

	editor.Blocks.add('form', {
		label: 'Formulário',
		activate: true,
		select: true,
		media: `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.25195 12.75C6.08529 12.75 6.00195 12.6667 6.00195 12.5V11.5C6.00195 11.3333 6.08529 11.25 6.25195 11.25H10.752C10.9186 11.25 11.002 11.3333 11.002 11.5V12.5C11.002 12.6667 10.9186 12.75 10.752 12.75H6.25195ZM3.50195 13C3.35612 13 3.23633 12.9531 3.14258 12.8594C3.04883 12.7656 3.00195 12.6458 3.00195 12.5V11.5C3.00195 11.3542 3.04883 11.2344 3.14258 11.1406C3.23633 11.0469 3.35612 11 3.50195 11H4.50195C4.64779 11 4.76758 11.0469 4.86133 11.1406C4.95508 11.2344 5.00195 11.3542 5.00195 11.5V12.5C5.00195 12.6458 4.95508 12.7656 4.86133 12.8594C4.76758 12.9531 4.64779 13 4.50195 13H3.50195ZM3.50195 9C3.35612 9 3.23633 8.95312 3.14258 8.85938C3.04883 8.76562 3.00195 8.64583 3.00195 8.5V7.5C3.00195 7.35417 3.04883 7.23438 3.14258 7.14062C3.23633 7.04688 3.35612 7 3.50195 7H4.50195C4.64779 7 4.76758 7.04688 4.86133 7.14062C4.95508 7.23438 5.00195 7.35417 5.00195 7.5V8.5C5.00195 8.64583 4.95508 8.76562 4.86133 8.85938C4.76758 8.95312 4.64779 9 4.50195 9H3.50195ZM6.25195 8.75C6.08529 8.75 6.00195 8.66667 6.00195 8.5V7.5C6.00195 7.33333 6.08529 7.25 6.25195 7.25H10.752C10.9186 7.25 11.002 7.33333 11.002 7.5V8.5C11.002 8.66667 10.9186 8.75 10.752 8.75H6.25195ZM3.50195 5C3.35612 5 3.23633 4.95312 3.14258 4.85938C3.04883 4.76562 3.00195 4.64583 3.00195 4.5V3.5C3.00195 3.35417 3.04883 3.23438 3.14258 3.14062C3.23633 3.04688 3.35612 3 3.50195 3H4.50195C4.64779 3 4.76758 3.04688 4.86133 3.14062C4.95508 3.23438 5.00195 3.35417 5.00195 3.5V4.5C5.00195 4.64583 4.95508 4.76562 4.86133 4.85938C4.76758 4.95312 4.64779 5 4.50195 5H3.50195ZM6.25195 4.75C6.08529 4.75 6.00195 4.66667 6.00195 4.5V3.5C6.00195 3.33333 6.08529 3.25 6.25195 3.25H10.752C10.9186 3.25 11.002 3.33333 11.002 3.5V4.5C11.002 4.66667 10.9186 4.75 10.752 4.75H6.25195ZM13.002 0C13.2728 0 13.5072 0.098958 13.7051 0.296875C13.903 0.494792 14.002 0.729167 14.002 1V15C14.002 15.2708 13.903 15.5052 13.7051 15.7031C13.5072 15.901 13.2728 16 13.002 16H1.00195C0.73112 16 0.496745 15.901 0.298828 15.7031C0.100911 15.5052 0.00195312 15.2708 0.00195312 15V1C0.00195312 0.729167 0.100911 0.494792 0.298828 0.296875C0.496745 0.098958 0.73112 0 1.00195 0H13.002ZM12.502 14.5V1.5H1.50195V14.5H12.502Z" fill="#444F55"/>
		</svg>`,
		content: {
			type: 'form',
			tagName: 'form',
			style: {
				width: '300px'
			},
			attributes: {
				id: 'form',
				'data-custom-id': 'custom-form'
			},
			draggable: `[data-custom-id=column-1-1]`,
			components: [
				{
					components: [
						{
							type: 'label',
							components: 'Nome'
						},
						{
							type: 'input',
							attributes: {
								type: 'text',
								name: 'name'
							},
							style: {
								border: '1px solid rgb(163, 186, 198)',
								'border-radius': '8px',
								height: '36px'
							}
						},
						{
							tagName: 'span',
							components: 'Campo obrigatório',
							attributes: {
								class: 'warning-name'
							},
							style: {
								display: 'none',
								color: '#ff6969',
								'font-size': '10px'
							}
						}
					],
					tagName: 'span',
					style: {
						display: 'grid',
						'margin-bottom': '16px'
					}
				},
				{
					components: [
						{
							type: 'label',
							components: 'E-mail'
						},
						{
							type: 'input',
							attributes: {
								type: 'email',
								name: 'email'
							},
							style: {
								border: '1px solid rgb(163, 186, 198)',
								'border-radius': '8px',
								height: '36px'
							}
						},
						{
							tagName: 'span',
							components: 'Campo obrigatório',
							attributes: {
								class: 'warning-email'
							},
							style: {
								display: 'none',
								color: '#ff6969',
								'font-size': '10px'
							}
						}
					],
					tagName: 'span',
					style: {
						display: 'grid',
						'margin-bottom': '16px'
					}
				},
				{
					components: [
						{
							type: 'label',
							components: 'WhatsApp'
						},
						{
							type: 'input',
							attributes: {
								type: 'text',
								name: 'whatsApp',
								maxLength: 15
							},
							style: {
								border: '1px solid rgb(163, 186, 198)',
								'border-radius': '8px',
								height: '36px'
							}
						},
						{
							tagName: 'span',
							components: 'Campo obrigatório',
							attributes: {
								class: 'warning-whatsApp'
							},
							style: {
								display: 'none',
								color: '#ff6969',
								'font-size': '10px'
							}
						}
					],
					tagName: 'span',
					style: {
						display: 'grid',
						'margin-bottom': '16px'
					}
				},
				{
					components: [
						{
							type: 'button',
							tagName: 'button',
							components: {
								type: 'text',
								tagName: 'span',
								removable: false,
								copyable: false,
								badgable: false,
								draggable: false,
								layerable: false,
								resizable: false,
								stylable: false,
								selectable: false,
								components: 'Enviar agora mesmo',
								style: {
									'font-size': '16px',
									color: '#fff',
									'font-family': 'Arial'
								},
								attributes: {
									id: 'buttonForm-span'
								}
							},
							style: {
								'font-size': '14px',
								'background-color': 'rgb(30,136,229)',
								cursor: 'pointer',
								border: 'none',
								color: '#fff'
							}
						}
					],
					tagName: 'span',
					style: {
						display: 'grid',
						width: '100%',
						height: '54px',
						color: '#fff'
					}
				},
				{
					components: [
						{
							tagName: 'span',
							components: 'Formulário enviado com sucesso.',
							attributes: {
								class: 'msg-success'
							},
							style: {
								display: 'none',
								color: '#29cb39',
								'margin-top': '10px',
								'font-size': '14px'
							}
						},
						{
							tagName: 'span',
							components:
								'Houve um problema ao enviar o formulário, tente novamente.',
							attributes: {
								class: 'msg-error'
							},
							style: {
								display: 'none',
								color: '#ff6969',
								'margin-top': '10px',
								'font-size': '14px'
							}
						}
					]
				}
			]
		}
	})

	editor.Blocks.add('text', {
		label: 'Texto',
		media: `<svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M18.525 3.6875C18.6635 3.6875 18.7773 3.73145 18.8664 3.81934C18.9555 3.90723 19 4.01953 19 4.15625V11.6562C19 11.793 18.9555 11.9053 18.8664 11.9932C18.7773 12.0811 18.6635 12.125 18.525 12.125H18.05C17.9115 12.125 17.7977 12.0811 17.7086 11.9932C17.6195 11.9053 17.575 11.793 17.575 11.6562V11.2754C16.8625 11.8418 16.0708 12.125 15.2 12.125C14.151 12.125 13.2555 11.7588 12.5133 11.0264C11.7711 10.2939 11.4 9.41016 11.4 8.375V7.4375C11.4 6.40234 11.7711 5.51855 12.5133 4.78613C13.2555 4.05371 14.151 3.6875 15.2 3.6875C16.0708 3.6875 16.8625 3.9707 17.575 4.53711V4.15625C17.575 4.01953 17.6195 3.90723 17.7086 3.81934C17.7977 3.73145 17.9115 3.6875 18.05 3.6875H18.525ZM17.575 8.375V7.4375C17.575 6.79297 17.3424 6.24121 16.8773 5.78223C16.4122 5.32324 15.8531 5.09375 15.2 5.09375C14.5469 5.09375 13.9878 5.32324 13.5227 5.78223C13.0576 6.24121 12.825 6.79297 12.825 7.4375V8.375C12.825 9.01953 13.0576 9.57129 13.5227 10.0303C13.9878 10.4893 14.5469 10.7188 15.2 10.7188C15.8531 10.7188 16.4122 10.4893 16.8773 10.0303C17.3424 9.57129 17.575 9.01953 17.575 8.375ZM6.29375 1.16797L10.4203 11.4805C10.4401 11.5391 10.45 11.5977 10.45 11.6562C10.45 11.793 10.4055 11.9053 10.3164 11.9932C10.2273 12.0811 10.1135 12.125 9.975 12.125H9.47031C9.2526 12.125 9.10417 12.0273 9.025 11.832L7.8375 8.84375H2.6125L1.425 11.832C1.34583 12.0273 1.1974 12.125 0.979688 12.125H0.475C0.336458 12.125 0.222656 12.0811 0.133594 11.9932C0.0445313 11.9053 0 11.793 0 11.6562C0 11.5977 0.00989583 11.5391 0.0296875 11.4805L4.12656 1.16797C4.20573 0.972656 4.35417 0.875 4.57188 0.875H5.87812C6.09583 0.875 6.23437 0.972656 6.29375 1.16797ZM3.17656 7.4375H7.27344L5.225 2.33984L3.17656 7.4375Z" fill="#444F55"/>
		</svg>`,
		content: `
		<p
			data-gjs-type="text"
			data-gjs-draggable="[data-custom-id=column-1-1]"
		>
			Digite seu texto aqui
		</p>
		<style>
			p {
				text-align: center;
				font-size: 18px;
				margin: 0px;
				line-height: 18px;
				word-wrap: break-word;
				width: fit-content;
				position: absolute;
				left: 0px !important;
				top: 0px !important;
			}
		</style>`,
		activate: true,
		select: true
	})

	editor.Blocks.add('title', {
		label: 'Título',
		media: `<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14.2305 0C14.3763 0 14.4961 0.046875 14.5898 0.140625C14.6836 0.234375 14.7305 0.354167 14.7305 0.5V3C14.7305 3.14583 14.6836 3.26562 14.5898 3.35938C14.4961 3.45312 14.3763 3.5 14.2305 3.5H13.7305C13.5846 3.5 13.4648 3.45312 13.3711 3.35938C13.2773 3.26562 13.2305 3.14583 13.2305 3V2H8.73047V12.5H10.2305C10.3763 12.5 10.4961 12.5469 10.5898 12.6406C10.6836 12.7344 10.7305 12.8542 10.7305 13V13.5C10.7305 13.6458 10.6836 13.7656 10.5898 13.8594C10.4961 13.9531 10.3763 14 10.2305 14H5.23047C5.08464 14 4.96484 13.9531 4.87109 13.8594C4.77734 13.7656 4.73047 13.6458 4.73047 13.5V13C4.73047 12.8542 4.77734 12.7344 4.87109 12.6406C4.96484 12.5469 5.08464 12.5 5.23047 12.5H6.73047V2H2.23047V3C2.23047 3.14583 2.18359 3.26562 2.08984 3.35938C1.99609 3.45312 1.8763 3.5 1.73047 3.5H1.23047C1.08464 3.5 0.964844 3.45312 0.871094 3.35938C0.777344 3.26562 0.730469 3.14583 0.730469 3V0.5C0.730469 0.354167 0.777344 0.234375 0.871094 0.140625C0.964844 0.046875 1.08464 0 1.23047 0H14.2305Z" fill="#444F55"/>
		</svg>`,
		content: `
		<h1
			data-gjs-type="text"
			data-gjs-draggable="[data-custom-id=column-1-1]"
		>
			Digite seu título aqui
		</h1>
		<style>
			h1 {
				text-align: center;
				margin: 0px;
				line-height: 38px;
				font-weight: normal;
				word-wrap: break-word;
				width: fit-content;
				font-size: 32px;
				font-family: Arial;
				position: absolute;
				left: 0px !important;
				top: 0px !important;
			}
		</style>`,
		activate: true,
		select: true
	})

	editor.Blocks.add('one-column', {
		id: 'one-column',
		label: 'Uma Coluna',
		media: `<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="0.75" y="0.75" width="14.5" height="10.5" rx="1.25" stroke="#444F55" stroke-width="1.5"/>
		</svg>`,
		content: OneColumn.html,
		activate: true,
		select: true
	})

	editor.DomComponents.addType('video', {
		model: {
			defaults: {
				provider: 'yt'
			}
		}
	})

	function addScriptToBody() {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document
		const body = documentIFrame?.querySelector('body')

		const script = document.createElement('script')

		script.type = 'text/javascript'
		script.innerHTML = `
			function preventZoomKeyboard(e) {
				if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '-' || e.key === '+' || e.key === '0')) {
					e.preventDefault();
				}
			};

			function preventZoomKeyboardWheel(e) {
				if (e.ctrlKey) {
					e.preventDefault();
				}
			};

			window.addEventListener('keydown', preventZoomKeyboard);
			window.addEventListener('wheel', preventZoomKeyboardWheel, { passive: false });
		`

		body?.appendChild(script)
	}

	function relocateComponents() {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document

		const columns = documentIFrame?.querySelectorAll(
			'[data-custom-id="column-1-1"]'
		)
		const components = documentIFrame?.querySelectorAll('[data-column]')

		components?.forEach((component) => {
			const columnIndex = component.getAttribute('data-column')!

			const index = parseInt(columnIndex, 10) - 1

			if (index >= 0 && columns?.length && index < columns.length) {
				columns?.[index].appendChild(component)
			}
		})
	}

	let canvasClientX: number
	let canvasClientY: number
	editor.on('canvas:dragend', (canvas) => {
		canvasClientX = canvas.pageX
		canvasClientY = canvas.pageY

		if (changeToDesktop >= 3 && editor.getDevice() === 'Desktop') {
			canvasClientX += 452
		}
	})

	editor.on('load', async () => {
		um.clear()
		editorPublishers(editor)

		//Só aparece o elemento centralizador se ele nao existir e se nao for uma página template
		if (!editor.getHtml().includes('data-custom-id="container-column-1-1"')) {
			editor.getWrapper()?.addAttributes({ 'custom-id': 'main-wrapper' })
			editor.getWrapper()?.set({
				removable: false,
				draggable: false,
				resizable: false
			})
			editor.setComponents(`<div
			data-gjs-draggable="
			#container,
			#template-container,
			#template-wrapper,
			[custom-id=column-template],
			[custom-id=main-wrapper]"
			id="container-column-1-1"
			data-custom-id="container-column-1-1"
			data-gjs-type="div"
			draggable="false"
			style="
				display: flex;
				background: #fff;
				height: ${window.innerHeight / 2}px;"
		>
			<div
				data-gjs-type="div"
				data-custom-id="column-1-1"
				data-gjs-name="Bloco"
				id="column-1-1"
				data-gjs-type="div"
				draggable="false"
				style="
					flex: 1 1 0%;
					max-width: 1200px;
					width: 100%;
					height: 100%;
					margin: 0 auto;
					flex-shrink: 0;
					position: relative;"></div>
		</div>`)

			editor.getComponents().add({
				content: `
			<div id="content-width" custom-width="1200px"></div>
		`,
				style: {
					display: 'none'
				}
			})
		}

		editor.addStyle(`
			form {
				position: absolute;
				left: 0px !important;
				top: 0px !important;	
			} 
			[data-custom-id="column-1-1"] {
				transform: translateX(0px) translateY(0px) !important;
			}`)

		const upfunnels = JSON.parse(
			localStorage.getItem('@upfunnels-editor:1.0.0')!
		)

		if (
			upfunnels.state.state.from === 'funnel' &&
			(!editor.getHtml().includes('funnelId') ||
				!editor.getHtml().includes('pageId'))
		) {
			const pageId = upfunnels.state.state.pageId
			const funnelId = upfunnels.state.state.funnelId
			editor.getComponents().add({
				content: `
				<span id="funnelId" style="display: none;">${funnelId}</span>
				<span id="pageId" style="display: none;">${pageId}</span>
			`,
				style: {
					display: 'none'
				}
			})
		}

		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document
		const mainWrapper = documentIFrame?.querySelector(
			'[custom-id="main-wrapper"]'
		) as HTMLIFrameElement

		mainWrapper.style.background = '#F2F2F3'

		setAttributeToContentWidth()

		relocateComponents()

		addScriptToBody()
	})

	editor.on('block:drag:start', (block: Component) => {
		removeStyleManager()

		editor.stopCommand('edit-component')
		if (block.id === 'one-column') {
			editor.setDragMode('translate')
		}
	})

	function adjusteSideComponent(block: Component) {
		const htmlString = editor.getHtml()

		const parser = new DOMParser()
		const doc = parser.parseFromString(htmlString, 'text/html')

		const div = doc.querySelector('#content-width')
		const customWidthValue = div?.getAttribute('custom-width')?.split('px')[0]

		const translateY = getTranslateY(block.rule?.attributes.style?.transform)!
		const translateX = getTranslateX(block.rule?.attributes.style?.transform)!

		if (+translateX.split('px')[0] < 0) {
			block.addStyle({
				transform: `translateY(${translateY}) translateX(0px)`
			})
		} else {
			const componentWidth = block.view?.$el[0].clientWidth

			//Pega a posição mais a largura do componente
			const position = +translateX.split('px')[0] + componentWidth!

			switch (+customWidthValue!) {
				case 1200:
					if (position > +customWidthValue!) {
						const diff = position - +customWidthValue!
						const newLeft = +translateX.split('px')[0] - diff

						block.addStyle({
							transform: `translateY(${translateY}) translateX(${newLeft}px)`
						})
					}
					break

				case 960:
					if (position > +customWidthValue!) {
						const diff = position - +customWidthValue!
						const newLeft = +translateX.split('px')[0] - diff

						block.addStyle({
							transform: `translateY(${translateY}) translateX(${newLeft}px)`
						})
					}
					break

				default:
					if (position > +customWidthValue!) {
						const diff = position - +customWidthValue!
						const newLeft = +translateX.split('px')[0] - diff

						block.addStyle({
							transform: `translateY(${translateY}) translateX(${newLeft}px)`
						})
					}
					break
			}
		}
	}

	function addReferenceToComponent(block: Component) {
		const columns = editor.DomComponents.getWrapper()?.find(
			`[data-custom-id="column-1-1"]`
		)
		const columnsHeights: number[] = []

		const verticalValue = canvasClientY as number

		let accumulatedHeight = 0
		let columnIndex = 0

		columns?.forEach((column) => {
			columnsHeights.push(column.view?.$el[0].offsetHeight as number)
		})

		for (let index = 0; index < columnsHeights.length; index++) {
			accumulatedHeight += columnsHeights[index]

			if (verticalValue < accumulatedHeight) {
				columnIndex = index

				break
			}
		}

		block.addAttributes({ 'data-column': `${columnIndex + 1}` })
	}

	function putComponentInside(block: Component) {
		const columns = editor.DomComponents.getWrapper()?.find(
			`[data-custom-id="column-1-1"]`
		)
		const columnIndex = block.getAttributes()['data-column']

		const index = parseInt(columnIndex, 10) - 1

		const columnWidth =
			+columns?.[0]?.rule?.attributes.style?.['max-width'].split('px')[0]
		const screenWidth = window.innerWidth

		let adjustment = 0

		if (editor.getDevice() === 'Desktop') {
			adjustment = (screenWidth - columnWidth) / 2
		} else {
			adjustment = (360 - columnWidth) / 2
		}

		let columnTop = 0
		let newTop = 0
		if (index > 0) {
			columnTop = columns?.[index]?.view?.$el[0].offsetTop as number
			newTop = canvasClientY - columnTop!
		} else {
			newTop = canvasClientY
		}

		const newLeft = canvasClientX - adjustment

		block.addStyle({
			transform: `translateY(${newTop}px) translateX(${newLeft}px)`
		})

		adjusteSideComponent(block)
	}

	let changeDataColumn = false
	function changeReferenceToComponent(block: Component) {
		const columns = editor.DomComponents.getWrapper()?.find(
			`[data-custom-id="column-1-1"]`
		)
		const dataIndexColumn = +block.getAttributes()['data-column'] - 1
		const columnsHeights: number[] = []

		const verticalValue = getTranslateY(
			block.rule?.attributes.style?.transform
		)!

		let accumulatedHeight = 0
		let columnIndex = dataIndexColumn

		columns?.forEach((column) => {
			columnsHeights.push(column.view?.$el[0].offsetHeight as number)
		})

		// Caso o valor vertical seja negativo (componente está subindo)
		if (+verticalValue?.split('px')[0] < 0) {
			// Trabalha de trás para frente, começando pela coluna anterior
			for (let index = dataIndexColumn - 1; index >= 0; index--) {
				accumulatedHeight += columnsHeights[index]
				const absVerticalValue = Math.abs(+verticalValue.split('px')[0])

				if (absVerticalValue < accumulatedHeight) {
					columnIndex = index

					if (dataIndexColumn !== index) {
						changeDataColumn = true
					} else {
						changeDataColumn = false
					}
					break
				}
			}
		} else {
			for (
				let index = dataIndexColumn;
				index < columnsHeights.length;
				index++
			) {
				accumulatedHeight += columnsHeights[index]

				if (+verticalValue.split('px')[0] < accumulatedHeight) {
					columnIndex = index

					if (dataIndexColumn !== index) {
						changeDataColumn = true
					} else {
						changeDataColumn = false
					}
					break
				}
			}
		}

		// Atualiza o atributo 'data-column' com o novo índice da coluna
		block.addAttributes({ 'data-column': `${columnIndex + 1}` })
	}

	function minHeightToDiv(block: Component) {
		const dataColumn = block.getAttributes()['data-column']

		const indexColumn = parseInt(dataColumn, 10) - 1

		const componentsInsideDiv = editor.DomComponents.getWrapper()?.find(
			`[data-column="${dataColumn}"]`
		)
		const columns = editor.DomComponents.getWrapper()?.find(
			`[data-custom-id="container-column-1-1"]`
		)[indexColumn]

		let maxSum = -Infinity
		let minHeight = 0
		componentsInsideDiv?.forEach((component) => {
			const translateYValue = getTranslateY(
				component.rule?.attributes.style?.transform
			)!
			const heightComponent = component.view?.$el[0].offsetHeight

			minHeight = +translateYValue.split('px')[0] + heightComponent!

			if (minHeight > maxSum) {
				maxSum = minHeight
			}
		})

		columns?.addStyle({
			'min-height': `${maxSum}px`
		})
	}

	function minHeightExcludedToDiv(block: Component) {
		const dataColumn = block.getAttributes()['data-column']

		const indexColumn = parseInt(dataColumn, 10) - 1

		const componentsInsideDiv = editor.DomComponents.getWrapper()?.find(
			`[data-column="${dataColumn}"]`
		)

		const columns = editor.DomComponents.getWrapper()?.find(
			`[data-custom-id="container-column-1-1"]`
		)[indexColumn]

		let maxSum = -Infinity
		let minHeight = 0

		const remainComponents = componentsInsideDiv?.filter((item) => {
			return item.ccid !== block.ccid
		})

		remainComponents?.forEach((component) => {
			const translateYValue = getTranslateY(
				component.rule?.attributes.style?.transform
			)!
			const heightComponent = component.view?.$el[0].offsetHeight

			minHeight = +translateYValue.split('px')[0] + heightComponent!

			if (minHeight > maxSum) {
				maxSum = minHeight
			}
		})

		columns?.addStyle({
			'min-height': `${maxSum}px`
		})
	}

	function changeComponentInside(block: Component) {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document

		const columns = editor.DomComponents.getWrapper()?.find(
			`[data-custom-id="column-1-1"]`
		)
		const columnsIframe = documentIFrame?.querySelectorAll(
			`[data-custom-id="column-1-1"]`
		) as unknown as HTMLIFrameElement[]
		const componentsIframe = documentIFrame?.querySelector(
			`#${block.ccid}`
		) as unknown as HTMLIFrameElement
		const columnIndex = block.getAttributes()['data-column']

		const indexColumn = parseInt(columnIndex, 10) - 1

		columnsIframe[indexColumn].appendChild(componentsIframe)

		const columnsHeights: number[] = []
		columns?.forEach((column) => {
			columnsHeights.push(column.view?.$el[0].offsetHeight as number)
		})

		const translateY = getTranslateY(block.rule?.attributes.style?.transform)!
		const translateX = getTranslateX(block.rule?.attributes.style?.transform)!

		let newTop = +translateY?.split('px')[0]
		// Caso o valor vertical seja negativo (componente está subindo)
		if (newTop < 0) {
			// Trabalha de trás para frente, começando pela coluna anterior
			for (let index = indexColumn; index < columnsHeights.length; index++) {
				newTop += columnsHeights[index]

				if (newTop > 0) {
					break
				}
			}
		} else {
			for (
				let index = indexColumn - 1;
				index < columnsHeights.length;
				index++
			) {
				newTop -= columnsHeights[index]

				if (newTop < 0) {
					newTop += columnsHeights[index]

					break
				}
			}
		}

		block.addStyle({
			transform: `translateY(${newTop}px) translateX(${translateX})`
		})
	}

	editor.on('block:drag:stop', function (block: Component) {
		const iFrames = document.getElementsByClassName('gjs-frame')
		const iFrame = iFrames[0] as HTMLIFrameElement
		const documentIFrame = iFrame.contentWindow?.document
		const columnWidth = documentIFrame?.querySelector(
			'#content-width'
		) as HTMLIFrameElement

		//Para que o width setado para o tamanho do body va para todas as divs
		if (
			block?.attributes?.attributes?.['data-custom-id'] ===
			'container-column-1-1'
		) {
			const oneColumn = editor.DomComponents.getWrapper()?.find(
				`[data-custom-id="column-1-1"]`
			)
			const containerColumns = editor.DomComponents.getWrapper()?.find(
				`[data-custom-id="container-column-1-1"]`
			)
			let sumColumnsHeight: number = 0

			if (containerColumns) {
				for (let i = 0; i < containerColumns.length - 1; i++) {
					sumColumnsHeight += containerColumns[i].view?.$el[0]
						.offsetHeight as number
				}

				block.addStyle({
					left: '0px',
					top: `${sumColumnsHeight}px`
				})
			}

			oneColumn?.forEach((item) =>
				item.addStyle({
					'max-width': (columnWidth.attributes as any)?.['custom-width'].value
				})
			)

			editor.select()
		} else {
			switch (block.attributes.tagName) {
				case 'iframe':
					editor.select(block)
					break

				case 'h1':
					componentPosition(
						block,
						canvasClientX,
						canvasClientY,
						'drag-stop',
						changeToDesktop,
						editor
					)
					break

				case 'p':
					componentPosition(
						block,
						canvasClientX,
						canvasClientY,
						'drag-stop',
						changeToDesktop,
						editor
					)
					break
			}

			addReferenceToComponent(block)
			putComponentInside(block)
			minHeightToDiv(block)
		}
	})

	function getImageDimensions(
		imageUrl: string
	): Promise<{ width: number; height: number }> {
		return new Promise((resolve, reject) => {
			const img = new Image()

			img.onload = function () {
				const width = img.width
				const height = img.height
				resolve({ width, height })
			}

			img.onerror = function () {
				reject(new Error('Erro ao carregar a imagem.'))
			}

			img.src = imageUrl
		})
	}

	editor.on('asset:add', async (asset) => {
		try {
			const result = await uploadImage(asset.attributes.src!)
			asset.attributes.src = result.publicURL
		} catch (error) {
			toast.error(
				'Não foi possível fazer o upload da imagem, tente novamente',
				errorToast
			)

			editor.Assets.remove(asset.attributes.src)
			asset.attributes.src = ''
		}
	})

	editor.on('asset:close', async () => {
		if (editor.getSelected()?.attributes.type === 'image') {
			getImageDimensions(editor.getSelected()?.attributes.src)
				.then((dimensions) => {
					const proportion = dimensions.width / dimensions.height

					editor.getSelected()?.addStyle({
						width: '200px',
						height: `${200 / proportion}px`
					})
				})
				.catch((error) => {
					console.error(error.message)
				})
		}
	})

	editor.on('component:drag:start', () => {
		const writeWithAi = document.getElementById('write-with-ai')
		writeWithAi!.style.display = 'none'
	})

	editor.on('component:drag:end', (component) => {
		if (editor.getDevice() === 'Desktop') {
			switch (component.target.attributes.tagName) {
				case 'h1':
					componentPosition(component.target)
					break

				case 'p':
					componentPosition(component.target)
					break
			}

			changeReferenceToComponent(component.target)

			if (changeDataColumn) {
				changeComponentInside(component.target)
			}

			adjusteSideComponent(component.target)
		}

		minHeightToDiv(component.target)
	})

	editor.on('component:remove', function (component: Component) {
		if (component.ccid.includes('column')) {
			const columns = editor.DomComponents.getWrapper()?.find(
				`[data-custom-id="container-column-1-1"]`
			)

			const indexColumnRemoved = columns?.findIndex((column) => {
				return column.ccid === component.ccid
			})

			const componentsToRemove = editor.DomComponents.getWrapper()?.find(
				`[data-column="${indexColumnRemoved! + 1}"]`
			)
			componentsToRemove?.forEach((componentToRemove) => {
				componentToRemove.remove()
			})
		} else {
			minHeightExcludedToDiv(component)
		}
	})

	editor.on('component:input', (component: Component) => {
		const iFrames = document.getElementsByClassName('gjs-frame')

		if (iFrames.length > 0) {
			const iFrame = iFrames[0] as HTMLIFrameElement
			const documentIFrame = iFrame.contentWindow?.document
			const elementHTML = documentIFrame?.getElementById(component.ccid)

			//Verifica se o que foi colado possue alguma tag html menos a tag br
			if (
				elementHTML &&
				/<\/?(?!br\b)[a-z][\s\S]*>/i.test(elementHTML.innerHTML)
			) {
				elementHTML.innerText = component.view?.$el[0].innerText as string

				component?.attributes.components!.models[0].set({
					content: component.view?.$el[0].innerText
				})
			}
		}
	})

	editor.StyleManager.addType('switch', {
		create({ change }) {
			const el = document.createElement('div')
			el.innerHTML = '<input type="checkbox" class="switch" />'
			const inputEl = el.querySelector('.switch')
			inputEl?.addEventListener('change', (event) => change({ event }))
			inputEl?.addEventListener('input', (event) =>
				change({ event, partial: true })
			)
			return el
		},
		emit({ updateStyle }, { event, partial }) {
			const { checked } = event.target
			updateStyle(checked ? 'true' : 'false', { partial })
		},
		update({ value, el }) {
			const switchInput: HTMLInputElement | null = el.querySelector('.switch')

			if (el && switchInput !== null) {
				switchInput.checked = value === 'true'
			}
		},
		destroy() {}
	})

	editor.Components.addType('form', {
		isComponent: (el) => el.tagName == 'FORM',
		model: {
			defaults: {
				tagName: 'form',
				droppable: ':not(form)',
				draggable: ':not(form)',
				attributes: { method: 'post' },
				traits: [
					{
						type: 'select',
						name: 'method',
						options: [
							{ value: 'get', name: 'GET' },
							{ value: 'post', name: 'POST' }
						]
					},
					{
						name: 'action'
					}
				]
			}
		}
	})

	editor.DomComponents.addType('input', {
		isComponent: (el) => el.tagName == 'input',
		model: {
			defaults: {
				'custom-name': 'Input',
				tagName: 'input',
				attributes: {
					type: 'email',
					required: true
				},
				traits: [
					'name',
					'placeholder',
					{
						type: 'select',
						label: 'Type',
						name: 'type',
						options: [
							{ value: 'text', name: 'Texto' },
							{ value: 'number', name: 'Número' },
							{ value: 'email', name: 'E-mail' },
							{ value: 'password', name: 'Senha' }
						]
					},
					{
						type: 'checkbox',
						label: 'Required',
						name: 'required'
					}
				]
			}
		},
		view: {
			events: {
				input: 'handleInput'
			} as any,
			handleInput(event: Event) {
				const input = event.target as HTMLInputElement
				const key = event as any

				if (input.name !== 'whatsApp') {
					return
				}

				let value: string = input.value

				if (key?.inputType === 'deleteContentBackward' && value.length > 0) {
					return input.value
				}

				value = value.replace(/\D/g, '')

				if (value.length > 0) {
					value = value.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})$/, '($1) $2-$3')
				}

				return (input.value = value)
			}
		}
	})

	/* editor.DomComponents.addType('div', {
		model: {
			defaults: {
				draggable: false
			}
		}
	}) */

	/* editor.DomComponents.addType('textarea', {
		extend: 'input',
		isComponent: (el) => el.tagName == 'TEXTAREA',
		model: {
			defaults: {
				tagName: 'textarea',
				attributes: {},
				traits: [
					'name',
					'placeholder',
					{
						name: 'required',
						type: 'checkbox'
					}
				]
			}
		}
	}) */

	async function handleSubmitForm(ev: Event) {
		if (editor.Commands.isActive('preview')) {
			ev.preventDefault()

			const target = ev.target as HTMLFormElement
			const form = target.parentElement?.parentElement
			const inputs = form?.querySelectorAll('input')
			const name = form?.querySelector('.warning-name') as HTMLElement
			const email = form?.querySelector('.warning-email') as HTMLElement
			const whatsApp = form?.querySelector('.warning-whatsApp') as HTMLElement
			const msgError = form?.querySelector('.msg-error') as HTMLElement
			const msgSuccess = form?.querySelector('.msg-success') as HTMLElement

			try {
				const values: {
					[key: string]: string
					name: string
					email: string
					whatsApp: string
				} = {
					name: '',
					email: '',
					whatsApp: ''
				}

				inputs?.forEach((input: HTMLInputElement) => {
					const name = input.name
					const value = input.value
					if (name) {
						values[name] = value
					}
				})

				if (!values.email || !values.whatsApp) {
					if (name !== null) {
						if (!values.name) {
							name.style.display = 'block'
							name.style.color = '#ff6969'
						} else {
							name.style.display = 'none'
						}
					}

					if (!values.email) {
						email.style.display = 'block'
					} else {
						email.style.display = 'none'
					}

					if (!values.whatsApp) {
						whatsApp.style.display = 'block'
					} else {
						whatsApp.style.display = 'none'
					}

					return
				}

				if (name !== null) {
					name.style.display = 'none'
				}
				email.style.display = 'none'
				whatsApp.style.display = 'none'

				const funnelId = document.querySelector('#funnelId')?.textContent
				const pageId = document.querySelector('#pageId')?.textContent

				let valueName
				if (values.name) {
					valueName = values.name
				} else {
					valueName = null
				}

				const payloadData = {
					leadRef: uuidv4(),
					name: valueName,
					email: values.email,
					telephone: values.whatsApp.replace(/\D/g, ''),
					pageId: pageId!,
					funnelId: funnelId!
				}

				await createLeadEditor(payloadData)

				toast.success('Lead criada com sucesso', successToast)

				msgError.style.display = 'none'
				msgSuccess.style.display = 'block'
			} catch (error) {
				toast.error('Houve um erro ao criar a Lead', errorToast)

				msgError.style.display = 'block'
				msgSuccess.style.display = 'none'
			}
		}
	}

	editor.DomComponents.addType('button', {
		extend: 'input',
		isComponent: (el) => el.tagName == 'BUTTON',
		model: {
			defaults: {
				tagName: 'button',
				attributes: {
					type: 'button',
					id: 'buttonForm'
				},
				text: 'Enviar agora mesmo',
				traits: [
					{
						name: 'text',
						changeProp: true
					},
					{
						type: 'select',
						name: 'type',
						options: [
							{ value: 'button' },
							{ value: 'submit' },
							{ value: 'reset' }
						]
					}
				]
			}
		},
		view: {
			events: {
				click: handleSubmitForm
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any
		}
	})
}
