import {
	ChevronLeft,
	Code2,
	ExternalLink,
	Filter,
	Loader2,
	Pen,
	PenLine
} from 'lucide-react'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '../../components/Button'
import { errorToast } from '../../components/Toast/types'
import { MainTemplate } from '../../templates/MainTemplate'

import { FunnelType, PageHandles } from '../../@types/pages/funnels'
import { DialogRoot } from '../../components/Dialog'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'
import { TableCore } from '../../components/TableCore'
import { Tooltip } from '../../components/Tooltip'
import { Page } from '../../models/page.model'
import { getPagesByFunnelId } from '../../services/editor.service'
import { getFunnelByID } from '../../services/funnels.service'
import { PageInfo } from './components/PageInfo'

import { PopoverClose } from '@radix-ui/react-popover'
import { RowSelectionState } from '@tanstack/react-table'
import { PaginationType } from '../../@types/pagination'
import { Pagination } from '../../components/Pagination'
import { PopOver } from '../../components/PopOver'
import { TableCheck } from '../../components/TableCheck'
import { pageReducer } from '../Funnels/utils'
import { ExternalCodePage } from './components/ExternalCodePage'
import * as S from './styles'

const initialArgs: PageHandles = {
	pageToHandle: '',
	dialogCreate: false,
	dialogEdit: false,
	dialogDelete: false,
	dialogExternalCodePage: false
}

export function PageList() {
	const { funnelId } = useParams()
	const navigate = useNavigate()

	const [isPending, setIsPending] = useState(false)
	const [funnel, setFunnel] = useState<Partial<FunnelType>>()
	const [currentPages, setCurrentPages] = useState<Array<Partial<Page>>>([])
	const [pageToHandle, setPageToHandle] = useState<Partial<Page>>()
	const [pageState, dispatch] = useReducer(pageReducer, initialArgs)

	const [pageDetailsOpen, setPageDetailsOpen] = useState(false)

	const [pagination, setPagination] = useState<PaginationType>(
		{} as PaginationType
	)

	const [selectedPagesInList, setSelectedPagesInList] =
		useState<RowSelectionState>({})

	function openPage(pageId: string) {
		if (!funnel || !currentPages) return

		const getPath = currentPages?.find((page) => page._id === pageId)

		const textToCopy = `https://${funnel.domain?.domainName}${getPath?.path}`

		window.open(textToCopy, '_blank')
	}

	async function fetchData() {
		const response = await getPagesByFunnelId(funnelId!)

		if (!response) return toast.error('Páginas não encontradas', errorToast)

		const formattedPages = response.data.pages.map(
			(
				page: { visits: { totalVisits: number; uniqueVisits: number } } & Page
			) => ({
				...page,
				totalVisits: page.visits.totalVisits,
				uniqueVisits: page.visits.uniqueVisits
			})
		)

		setPagination({
			currentPage: response.data.currentPage,
			totalPages: response.data.totalPages
		})
		setCurrentPages(formattedPages)
		setIsPending(false)
	}

	// async function deletePageById(pageId: string) {
	// 	try {
	// 		await deletePage(pageId)
	// 		const updatedPages = currentPages.filter((page) => page._id !== pageId)
	// 		setCurrentPages(updatedPages)
	// 		toast.success('Página excluida com sucesso')
	// 	} catch (error) {
	// 		toast.error('Erro ao excluir página', errorToast)
	// 		console.error(error)
	// 	}
	// }

	async function fetchFunnel() {
		const response = await getFunnelByID(funnelId!)

		if (!response) return toast.error('Funil não encontrado', errorToast)

		setFunnel(response)
	}

	function setPageInfo(pageId: string) {
		const getPage = currentPages?.find((page) => page._id === pageId)

		if (!getPage) return toast.error('Página não encontrada', errorToast)
		setPageToHandle(getPage)
		setPageDetailsOpen(true)
	}

	function handleExternalCodePage(pageId: string) {
		dispatch({
			type: 'dialogExternalCodePage'
		})
		dispatch({
			type: 'pageToHandle',
			payload: pageId
		})
	}

	useEffect(() => {
		setIsPending(true)
		fetchData()
		fetchFunnel()
	}, [pageDetailsOpen])

	return (
		<MainTemplate>
			<S.Wrapper>
				<S.Header>
					<S.BrainHeader>
						<Tooltip
							content="Voltar para a página anterior"
							trigger={
								<ChevronLeft strokeWidth={1} onClick={() => navigate(-1)} />
							}
						/>
						<h1>{funnel?.name ?? ''}</h1>
					</S.BrainHeader>
					<Button onClick={() => navigate(`/funnel-flow/${funnelId}`)}>
						<Filter strokeWidth={1} />
						Editar funil no painel
					</Button>
				</S.Header>
				{!isPending && currentPages.length <= 0 && (
					<EmptyWrapper>
						<span>Nenhuma página encontrada</span>
					</EmptyWrapper>
				)}

				{currentPages.length > 0 && funnel && (
					<>
						<S.FiltersWrapper>
							<PopOver
								offset={6}
								align="end"
								side="bottom"
								content={
									<S.ActionsWrapper>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedPagesInList).length > 1}
												onClick={() =>
													setPageInfo(Object.keys(selectedPagesInList)[0])
												}
											>
												<PenLine strokeWidth={1} />
												Editar informações
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedPagesInList).length > 1}
												onClick={() =>
													handleExternalCodePage(
														Object.keys(selectedPagesInList)[0]
													)
												}
											>
												<Code2 strokeWidth={1} />
												Pixel e códigos
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedPagesInList).length > 1}
												onClick={() =>
													openPage(Object.keys(selectedPagesInList)[0])
												}
											>
												<ExternalLink strokeWidth={1} />
												Acessar página
											</button>
										</PopoverClose>
									</S.ActionsWrapper>
								}
								trigger={
									<S.ButtonActions
										disabled={Object.keys(selectedPagesInList).length <= 0}
									>
										<Pen strokeWidth={1} />
										Ações
									</S.ButtonActions>
								}
							/>
						</S.FiltersWrapper>
						<S.Divider />
						<S.Content>
							<TableCore
								rowSelection={selectedPagesInList}
								getRowId={(row) => row?._id ?? ''}
								setRowSelection={setSelectedPagesInList}
								columns={[
									{
										accessorKey: '_id',
										size: 40,
										header: undefined,
										cell: ({ row }) => (
											<div style={{ margin: 0 }}>
												<TableCheck
													check={row.getIsSelected()}
													onChange={row.getToggleSelectedHandler()}
												/>
											</div>
										)
									},
									{
										header: 'Nome da Página',
										accessorKey: 'name',
										cell: ({ row }) => row.getValue('name') ?? '-'
									},
									{
										header: 'URL',
										accessorKey: 'path',
										cell: ({ row }) => row.getValue('path') ?? '-'
									},
									{
										header: 'Visitas totais',
										accessorKey: 'totalVisits',
										cell: ({ row }) => row.getValue('totalVisits') ?? '-'
									},
									{
										header: 'Visitas únicas',
										accessorKey: 'uniqueVisits',
										cell: ({ row }) => row.getValue('uniqueVisits') ?? '-'
									}
								]}
								data={currentPages}
							/>
							<Pagination
								previousPage={() =>
									setPagination({
										...pagination,
										currentPage: pagination.currentPage - 1
									})
								}
								nextPage={() =>
									setPagination({
										...pagination,
										currentPage: pagination.currentPage + 1
									})
								}
								currentPage={pagination.currentPage}
								hasNextPage={pagination.currentPage < pagination.totalPages}
							/>
							<DialogRoot
								setIsOpen={() => setPageDetailsOpen(!pageDetailsOpen)}
								title="Editar informações da página"
								isOpen={pageDetailsOpen}
							>
								<PageInfo
									domainName={funnel.domain?.domainName ?? ''}
									page={pageToHandle!}
									pageId={pageToHandle?._id ?? ''}
									closeDialog={() => setPageDetailsOpen(false)}
									showName
								/>
							</DialogRoot>
							<DialogRoot
								maxwidth={720}
								title="Códigos externos da página"
								isOpen={pageState.dialogExternalCodePage}
								setIsOpen={() => dispatch({ type: 'dialogExternalCodePage' })}
							>
								<ExternalCodePage
									onCloseModal={() =>
										dispatch({ type: 'dialogExternalCodePage' })
									}
									pagesId={pageState.pageToHandle}
								/>
							</DialogRoot>
						</S.Content>
					</>
				)}

				{isPending && (
					<EmptyWrapper>
						<Loader2 strokeWidth={1} />
						<span>Carregando páginas</span>
					</EmptyWrapper>
				)}
			</S.Wrapper>
		</MainTemplate>
	)
}
