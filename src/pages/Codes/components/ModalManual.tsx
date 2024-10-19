/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'

import { Button } from '../../../components/Button'
import * as S from '../../../components/Funnels/FormWrapper/styles'

import { FormType, FunnelType } from '../../../@types/pages/funnels'
import { TextField } from '../../../components/TextField'
import { TextArea } from '../../../components/TextArea'
import { Clipboard, Loader2 } from 'lucide-react'
import {
	createPixelCodeSource,
	updatePixelCodeSource
} from '../../../services/pixel-code.service'
import { toast } from 'react-toastify'
import { errorToast } from '../../../components/Toast/types'
import { useEffect, useState } from 'react'
import { getPage, getPagesByFunnelId } from '../../../services/editor.service'
import { getAllFunnel } from '../../../services/funnels.service'
import { EmptyWrapper } from '../../../components/EmptyWrapper/styles'

type TypePages = {
	id: string
	value: string
}

export function ModalManual({ info, onCloseModal }: any) {
	const { register, handleSubmit } = useForm<FormType>()
	const [funnels, setFunnels] = useState<FunnelType[]>([])
	const [pages, setPages] = useState<TypePages[]>([])
	const [selectOptionFunil, setSelectOptionFunil] = useState<any>()
	const [selectOptionService, setSelectOptionService] = useState<string>('')
	const [pagesByFunnel, setPagesByFunnel] = useState<any>()
	const [btnDisabled, setBtndisabled] = useState<any>(false)
	const [isChecked, setIsChecked] = useState<boolean>(
		info ? !info.pagesIds : true
	)
	const [isPending, setIsPending] = useState<boolean>(false)
	const [, setPageResponse] = useState<any>()
	async function fetchFunnel() {
		try {
			const response = await getAllFunnel()
			setFunnels(response)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	async function fetchPage() {
		try {
			const response = await getPage()
			setPageResponse(response)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	// function onRemoveItemPage(item: TypePages) {
	// 	setPages((prevPages) => {
	// 		const filteredPages = prevPages.filter((page) => page.id !== item.id)
	// 		return [...filteredPages]
	// 	})
	// }

	async function fetchIDFunnel(id: string) {
		try {
			const response = await getPagesByFunnelId(id)
			let pages = null
			if (response?.data?.pages) {
				pages = response.data.pages.map((page: any) => ({
					id: page._id,
					name: page.name,
					value: page.name
				}))
			}

			return pages
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	const validateField = (fieldValue: string, fieldName: string) => {
		if (!fieldValue || !fieldValue.trim()) {
			toast.error(
				`O campo ${fieldName} não pode ser vazio ou conter apenas espaços em branco!`
			)
			return false
		}
		return true
	}

	async function onSubmit(fields: any) {
		if (!validateField(fields.name, 'Nome')) {
			return
		}

		setBtndisabled(true)
		fields.funnelIds = null
		fields.platform = 'CUSTOM'
		fields.id = null
		fields.headerPage = fields.headerPage || null
		fields.bodyPage = fields.bodyPage || null
		fields.footerPage = fields.footerPage || null
		fields.isGlobal = false
		fields.pagesIds = null
		fields.isManual = true

		try {
			if (info) {
				await updatePixelCodeSource(info._id, fields)
			} else {
				await createPixelCodeSource(fields)
			}
			setIsPending(false)
			onCloseModal()
		} catch (error) {
			toast.error('Erro ao criar código externo.', errorToast)
			setIsPending(false)
			onCloseModal()
			setBtndisabled(false)
		}
	}

	async function handleSetSelectOptionFunil(id: string) {
		setSelectOptionFunil(id)
		try {
			const pagesByFunnel = await fetchIDFunnel(id)
			setPagesByFunnel(pagesByFunnel)
		} catch (e) {
			console.log('Erro ao carregar as páginas' + e)
			setPagesByFunnel(null)
		}
	}

	function hanleChangePages(ev: any) {
		setPages((prevPages) => [...prevPages, { id: ev.id, value: ev.value }])
	}

	useEffect(() => {
		fetchFunnel()
		fetchPage()
		if (info) {
			if (!info.pagesIds) setIsChecked(false)
			if (info.isGlobal) setIsChecked(true)
		}
	}, [])

	useEffect(() => {
		setPages([])
	}, [selectOptionFunil])

	useEffect(() => {
		async function makeAsync() {
			if (info && selectOptionFunil != info.funnelName) {
				const find = funnels.find((funnel) => funnel.name == info.funnelName)
				if (find && find._id) {
					await handleSetSelectOptionFunil(find._id)
				}
			}
		}
		if (funnels) {
			makeAsync()
		}
	}, [funnels])

	async function populatePages() {
		for (const page of info.pagesIds) {
			if (!pages.find((pag) => pag == page)) {
				await hanleChangePages({
					id: page,
					name: findPageById(page).name,
					value: findPageById(page).name
				})
			}
		}
	}

	function findPageById(id: string) {
		return pagesByFunnel.find((pag: any) => pag.id == id)
	}

	async function populateAllPages() {
		for (const page of pagesByFunnel) {
			await hanleChangePages({
				id: page.id,
				name: page.name,
				value: page.name
			})
		}
	}

	useEffect(() => {
		if (info && selectOptionService != info.platform) {
			setSelectOptionService(info.platform)
		}
	}, [selectOptionFunil])

	useEffect(() => {
		if (!info && pagesByFunnel && pagesByFunnel.length && isChecked) {
			populateAllPages()
		}
		if (
			info?.pagesIds &&
			pagesByFunnel &&
			pages.length < info.pagesIds.length
		) {
			populatePages()
		}
	}, [pagesByFunnel])

	return (
		<div id="modal-manual">
			<>
				{isPending && (
					<EmptyWrapper>
						<Loader2 strokeWidth={1} />
						<span>Salvando código</span>
					</EmptyWrapper>
				)}
				{!isPending && (
					<>
						<h2>Integração manual</h2>
						<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
							<TextField
								placeholder="Ex: Pixel Produto XYZ"
								label="Nome"
								name="name"
								required
								onInvalid={(e) => {
									const target = e.target as HTMLInputElement
									target.setCustomValidity(
										'Preencha o campo com nome do código'
									)
								}}
								onInput={(e) =>
									(e.target as HTMLInputElement).setCustomValidity('')
								}
								register={register}
								minLength={4}
								maxLength={500}
								$fullwidth
								defaultValue={info ? info.name : null}
								$smallText="Escolha como identificar o seu código."
							/>
							<TextArea
								placeholder="Copie e cole aqui o seu código."
								label="Header"
								name="headerPage"
								register={register}
								iconPosition="right"
								icon={<Clipboard />}
								$fullwidth
								defaultValue={info ? info.headerPage : null}
							/>
							<TextArea
								placeholder="Copie e cole aqui o seu código."
								label="Body"
								name="bodyPage"
								register={register}
								iconPosition="right"
								icon={<Clipboard />}
								$fullwidth
								defaultValue={info ? info.bodyPage : null}
							/>
							<TextArea
								placeholder="Copie e cole aqui o seu código."
								label="Footer"
								name="footerPage"
								register={register}
								iconPosition="right"
								icon={<Clipboard />}
								$fullwidth
								defaultValue={info ? info.footerPage : null}
							/>
							{/* <Select
								items={funnels?.map((funnel) => ({
									id: funnel?._id ?? '',
									name: funnel?.name ?? '',
									value: funnel?.name ?? ''
								}))}
								label="Escolha o funil"
								withIdValue={true}
								placeholder={
									selectOptionFunil ? selectOptionFunil : 'Escolha o funil'
								}
								currentValue={selectOptionFunil}
								handleChange={(id) => handleSetSelectOptionFunil(id)}
							/> */}
							{/* <div className="footer">
								<SwitchInput
									checked={isChecked}
									onChange={() => setIsChecked(!isChecked)}
								/>
								<span className="info">
									Todas as páginas atuais e futuras deste funil
								</span>
							</div>

							{!isChecked && (
								<>
									<SelectMultiple
										items={pagesByFunnel}
										label="Escolha uma ou mais páginas"
										placeholder={
											pagesByFunnel && pagesByFunnel.length === 0
												? 'Nenhuma página neste funil'
												: 'Clique para escolher as páginas'
										}
										currentValue={selectOptionService}
										selectedItems={pages}
										multiple={true}
										removeItem={onRemoveItemPage}
										handleChange={(item) => hanleChangePages(item)}
									/>
									<small>
										Mantenha em branco para aplicar a todas as páginas do funil.
									</small>
								</>
							)} */}
							<S.ConfirmationWrapper>
								<Button
									disabled={btnDisabled}
									style={{ marginLeft: 'auto' }}
									type="submit"
								>
									{info ? 'Salvar alterações' : 'Adicionar'}
								</Button>
							</S.ConfirmationWrapper>
						</S.FormWrapper>
					</>
				)}
			</>
		</div>
	)
}
