/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'

import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select'
import { TextField } from '../../../components/TextField'
import { EmptyWrapper } from '../../../../src/components/EmptyWrapper/styles'

import * as S from '../../../components/Funnels/FormWrapper/styles'

import { FormType, FunnelType } from '../../../@types/pages/funnels'
import { useEffect, useState } from 'react'
import { getAllFunnel } from '../../../services/funnels.service'
import { getPage, getPagesByFunnelId } from '../../../services/editor.service'
import {
	createPixelCodeSource,
	updatePixelCodeSource
} from '../../../services/pixel-code.service'
import { toast } from 'react-toastify'
import { errorToast } from '../../../components/Toast/types'
import { Plataforms } from '../configs/Platforms'
import { Loader2 } from 'lucide-react'

type TypePages = {
	id: string
	value: string
}

export function ModalIntegration({ info, isUpdate, onCloseModal }: any) {
	const { register, handleSubmit } = useForm<FormType>()
	const [funnels, setFunnels] = useState<FunnelType[]>([])
	const [, setPageResponse] = useState<any>()
	const [isChecked, setIsChecked] = useState<boolean>(
		info ? !info.pagesIds : true
	)
	const [selectOptionService, setSelectOptionService] = useState<string>('')
	const [selectOptionFunil, setSelectOptionFunil] = useState<any>()
	const [pages, setPages] = useState<TypePages[]>([])
	const [placeholderID, setPlaceholderID] = useState<string>('Digite o ID')
	const [pagesByFunnel, setPagesByFunnel] = useState<any>()
	const [isPending, setIsPending] = useState<boolean>(false)
	const [btnDisabled, setBtndisabled] = useState<any>(false)

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
		if (
			!validateField(fields.id, 'ID') ||
			!validateField(fields.name, 'Nome')
		) {
			return
		}

		setBtndisabled(true)
		fields.platform = selectOptionService
		fields.headerPage = null
		fields.bodyPage = null
		fields.footerPage = null
		fields.isGlobal = false
		fields.isManual = false
		fields.pagesIds = null
		fields.funnelIds = null
		setIsPending(true)

		try {
			if (isUpdate) {
				await updatePixelCodeSource(info._id, fields)
			} else {
				await createPixelCodeSource(fields)
			}
			setIsPending(false)
			onCloseModal(true)
		} catch (error) {
			toast.error('Erro ao criar código externo.', errorToast)
			setIsPending(false)
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

	async function fetchFunnel() {
		try {
			const response = await getAllFunnel()
			setFunnels(response)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

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

	function handleIdChange(id: string) {
		setSelectOptionService(id)
		if (id == 'META_ADS') {
			setPlaceholderID('Ex.: 467919022149332')
		} else if (id == 'GOOGLE_TAG_MANAGER') {
			setPlaceholderID('Ex.: GTM-FCH5PKG')
		} else if (id == 'GOOGLE_ADS') {
			setPlaceholderID('Ex.: AW-12208310814')
		} else if (id == 'TIKTOK_ADS') {
			setPlaceholderID('Ex.: CEJ60CJC77UA31R53D1G')
		} else if (id == 'Taboola') {
			setPlaceholderID('Ex.: 3482734623987')
		} else if (id == 'X') {
			setPlaceholderID('Ex.: tw-ntggz-u3dkv ')
		}
	}

	useEffect(() => {
		fetchFunnel()
		fetchPage()
		if (info) {
			if (!info.pagesIds) setIsChecked(false)
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

	function findPageById(id: string) {
		return pagesByFunnel.find((pag: any) => pag.id == id)
	}

	useEffect(() => {
		if (info && selectOptionService != info.platform) {
			setSelectOptionService(info.platform)
		}
	}, [selectOptionFunil])

	return (
		<div id="modal-integration" className={info ? 'disabled' : ''}>
			<>
				{isPending && (
					<EmptyWrapper>
						<Loader2 strokeWidth={1} />
						<span>Salvando código</span>
					</EmptyWrapper>
				)}
				{!isPending && (
					<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
						<div className="servico">
							<Select
								items={Plataforms}
								withIdValue={true}
								label="Escolha o serviço"
								placeholder={
									selectOptionService
										? selectOptionService
										: 'Escolha o serviço'
								}
								currentValue={selectOptionService}
								handleChange={(id) => handleIdChange(id)}
							/>
						</div>

						<TextField
							placeholder={placeholderID}
							label="ID"
							name="id"
							required
							onInvalid={(e) => {
								const target = e.target as HTMLInputElement
								target.setCustomValidity('Preencha o campo ID')
							}}
							onInput={(e) =>
								(e.target as HTMLInputElement).setCustomValidity('')
							}
							register={register}
							minLength={4}
							maxLength={500}
							defaultValue={info ? info.id : ''}
							$fullwidth
						/>
						<small>Cole o ID no campo indicado.</small>
						<TextField
							placeholder="Ex: Pixel Produto XYZ"
							label="Nome"
							name="name"
							required
							onInvalid={(e) => {
								const target = e.target as HTMLInputElement
								target.setCustomValidity('Preencha o campo com nome do código')
							}}
							onInput={(e) =>
								(e.target as HTMLInputElement).setCustomValidity('')
							}
							defaultValue={info ? info.name : ''}
							register={register}
							$fullwidth
						/>
						<small>Escolha como identificar o seu código.</small>

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
						/>
						<div className="footer">
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
							{!info ? (
								<Button disabled={btnDisabled} className="new" type="submit">
									Adicionar
								</Button>
							) : (
								<>
									<Button style={{ marginLeft: 'auto' }} type="submit">
										Salvar alterações
									</Button>
								</>
							)}
						</S.ConfirmationWrapper>
					</S.FormWrapper>
				)}
			</>
		</div>
	)
}
