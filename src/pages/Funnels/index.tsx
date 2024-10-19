import { RowSelectionState, SortingState } from '@tanstack/react-table'
import {
	BookPlus,
	Code2,
	ExternalLink,
	Filter,
	Kanban,
	KanbanSquare,
	Loader2,
	Pen,
	PenLine
} from 'lucide-react'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Checkbox } from '../../components/Checkbox'
import { DialogRoot } from '../../components/Dialog'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'
import { Pagination } from '../../components/Pagination'
import { PopOver } from '../../components/PopOver'
import { RadioGroup } from '../../components/RadioGroup'
import { StatusPin } from '../../components/StatusPin'
import { TableCore } from '../../components/TableCore'
import { DeleteFunnel } from './DeleteFunnel'
import { EditFunnelForm } from './EditFunnelForm'
import { NewFunnelForm } from './NewFunnelForm'

import alertNoContent from '../../assets/images/alert-no-content.svg'

import { MainTemplate } from '../../templates/MainTemplate'

import { getFunnels, updateFunnel } from '../../services/funnels.service'

import { funnelReducer, funnelsMetricsReducer } from './utils'

import {
	FunnelHandles,
	FunnelType,
	GetFunnelProps,
	MetricsFilterProps
} from '../../@types/pages/funnels'
import { PaginationType } from '../../@types/pagination'

import { PopoverClose } from '@radix-ui/react-popover'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { TableCheck } from '../../components/TableCheck'
import { successToast } from '../../components/Toast/types'
import { useFunnels } from '../../services/store/funnels'
import { ExternalCodeFunnel } from './ExternalCodeFunnel'
import * as S from './styles'

const initialArgs: FunnelHandles = {
	funnelToHandle: '',
	dialogCreate: false,
	dialogEdit: false,
	dialogDelete: false,
	dialogExternalCodeFunnel: false
}

const initialMetrics: MetricsFilterProps = {
	_id: true,
	name: true,
	type: true,
	status: true,
	totalVisits: true,
	uniqueVisits: true,
	totalSales: false,
	totalValue: false,
	averageValue: false,
	results: true,
	conversion: true
}

export function Funnels() {
	const navigate = useNavigate()

	const [isPending, setIsPending] = useState(false)

	const [funnels, setFunnels] = useState([] as Partial<FunnelType[]>)
	const [pagination, setPagination] = useState<PaginationType>(
		{} as PaginationType
	)

	const [sorting, setSorting] = useState<SortingState>([])
	const [statusFilter, setStatusFilter] = useState('all')

	const [funnelState, dispatch] = useReducer(funnelReducer, initialArgs)
	const [metricsFilterState, dispatchMetrics] = useReducer(
		funnelsMetricsReducer,
		initialMetrics
	)

	const { setCurrentNodes, setCurrentFunnel, setCurrentEdges } = useFunnels(
		(state) => state
	)

	const fetchFunnels = async () => {
		const { funnels: funnelsData, pagination: funnelPagination } =
			await getFunnels(pagination.currentPage)

		const formattedFunnels = funnelsData.map(
			(funnel: Partial<GetFunnelProps>) => ({
				_id: funnel._id,
				name: funnel.name,
				status: funnel.status,
				description: funnel.description,
				type: funnel.category ? funnel.category?.category : '',
				templateId: funnel.templateId,
				domain: funnel.domain,
				totalVisits: funnel.visits?.totalVisits,
				uniqueVisits: funnel.visits?.uniqueVisits,
				totalSales: funnel.metrics?.totalSales,
				totalValue: funnel.metrics?.totalValue,
				averageValue: funnel.metrics?.averageValue,
				results: funnel.metrics?.results,
				conversion: funnel.metrics?.conversion
			})
		)

		setFunnels(formattedFunnels)
		setPagination(funnelPagination)
		setIsPending(false)
	}

	useEffect(() => {
		setIsPending(true)
		fetchFunnels()

		setCurrentNodes([])
		setCurrentEdges([])
		setCurrentFunnel({} as FunnelType)
	}, [
		pagination.currentPage,
		funnelState.dialogEdit,
		funnelState.dialogDelete,
		funnelState.funnelToHandle
	])

	const [selectedFunnelsInList, setSelectedFunnelsInList] =
		useState<RowSelectionState>({})

	function handleSeeInfo() {
		dispatch({
			type: 'dialogEdit'
		})
		dispatch({
			type: 'funnelToHandle',
			payload: Object.keys(selectedFunnelsInList)[0]
		})
	}

	function handleSeeCodes() {
		dispatch({
			type: 'dialogExternalCodeFunnel'
		})
		dispatch({
			type: 'funnelToHandle',
			payload: Object.keys(selectedFunnelsInList)[0]
		})
	}

	async function handlePublishFunnel(id: string) {
		const response = await updateFunnel({ status: 'published' }, id)

		if (response.status === 200) {
			toast.success('Funil publicado com sucesso', successToast)

			dispatch({
				type: 'funnelToHandle',
				payload: id
			})
		}
	}

	function funnelIsPublished(funnelId: string) {
		return (
			funnels.find((funnel) => funnel?._id === funnelId)?.status === 'published'
		)
	}

	function resolverClickCell(id: string, event: React.MouseEvent) {
		if ((event.target as HTMLElement).localName === 'td') {
			navigate(`/funnel-flow/${id}`)
		}

		if ((event.target as HTMLElement).attributes[1].localName === 'checkbox') {
			return
		}
	}

	return (
		<MainTemplate>
			<S.Wrapper>
				<S.Header>
					<h1>Funis</h1>

					<DialogRoot
						isOpen={funnelState.dialogCreate}
						setIsOpen={() => dispatch({ type: 'dialogCreate' })}
						trigger={
							<S.NewFunnelTrigger>
								<Filter />
								<span>Criar funil</span>
							</S.NewFunnelTrigger>
						}
						title="Criar funil"
					>
						<NewFunnelForm
							closeDialog={() => dispatch({ type: 'dialogCreate' })}
						/>
					</DialogRoot>
				</S.Header>
				{isPending && funnels.length <= 0 && (
					<EmptyWrapper>
						<Loader2 strokeWidth={1} />
						<span>Carregando funis</span>
					</EmptyWrapper>
				)}
				{funnels.length > 0 && (
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
												disabled={Object.keys(selectedFunnelsInList).length > 1}
												onClick={() => handleSeeInfo()}
											>
												<PenLine strokeWidth={1} />
												Editar informações
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedFunnelsInList).length > 1}
												onClick={() => handleSeeCodes()}
											>
												<Code2 strokeWidth={1} />
												Pixel e códigos
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedFunnelsInList).length > 1}
												onClick={() =>
													navigate(
														`/funnel-flow/${
															Object.keys(selectedFunnelsInList)[0]
														}`
													)
												}
											>
												<ExternalLink strokeWidth={1} />
												Acessar fluxo do funil
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedFunnelsInList).length > 1}
												onClick={() =>
													navigate(
														`/pages/${Object.keys(selectedFunnelsInList)[0]}`
													)
												}
											>
												<KanbanSquare strokeWidth={1} />
												Acessar páginas
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={
													Object.keys(selectedFunnelsInList).length > 1 ||
													funnelIsPublished(
														Object.keys(selectedFunnelsInList)[0]
													)
												}
												onClick={() =>
													handlePublishFunnel(
														Object.keys(selectedFunnelsInList)[0]
													)
												}
											>
												<BookPlus strokeWidth={1} />
												Publicar funil
											</button>
										</PopoverClose>
									</S.ActionsWrapper>
								}
								trigger={
									<S.ButtonActions
										disabled={Object.keys(selectedFunnelsInList).length <= 0}
									>
										<Pen strokeWidth={1} />
										Ações
									</S.ButtonActions>
								}
							/>
							<PopOver
								offset={6}
								trigger={
									<S.ButtonActions>
										<Kanban strokeWidth={1} />
										Métricas
									</S.ButtonActions>
								}
								content={
									<S.MetricsFilter>
										<strong>Adicionar colunas</strong>
										<Checkbox
											label="Visitas totais (Up)"
											onChange={() => dispatchMetrics({ type: 'totalVisits' })}
											check={metricsFilterState.totalVisits}
										/>
										<Checkbox
											label="Visitas únicas (Up)"
											onChange={() => dispatchMetrics({ type: 'uniqueVisits' })}
											check={metricsFilterState.uniqueVisits}
										/>
										<Checkbox
											label="Total de vendas (Integração)"
											onChange={() => dispatchMetrics({ type: 'totalSales' })}
											check={metricsFilterState.totalSales}
										/>
										<Checkbox
											label="Valor das vendas (Integração)"
											onChange={() => dispatchMetrics({ type: 'totalValue' })}
											check={metricsFilterState.totalValue}
										/>
										<Checkbox
											label="Ticket médio (Integração)"
											onChange={() => dispatchMetrics({ type: 'averageValue' })}
											check={metricsFilterState.averageValue}
										/>
										<Checkbox
											label="Resultados"
											onChange={() => dispatchMetrics({ type: 'results' })}
											check={metricsFilterState.results}
										/>
										<Checkbox
											label="Conversão"
											onChange={() => dispatchMetrics({ type: 'conversion' })}
											check={metricsFilterState.conversion}
										/>
									</S.MetricsFilter>
								}
								side="bottom"
								align="end"
							/>
							<PopOver
								offset={6}
								trigger={
									<S.ButtonActions>
										<Filter strokeWidth={1} />
										Status:
										{statusFilter === 'all' && ' Todos'}
										{statusFilter === 'draft' && ' Rascunho'}
										{statusFilter === 'published' && ' Publicado'}
										{statusFilter === 'archived' && ' Arquivado'}
									</S.ButtonActions>
								}
								content={
									<S.ActionsWrapper>
										<RadioGroup
											defaultValue={statusFilter}
											options={[
												{ value: 'all', label: 'Todos' },
												{ value: 'draft', label: 'Rascunho' },
												{ value: 'published', label: 'Publicado' },
												{ value: 'archived', label: 'Arquivado' }
											]}
											currentValue={statusFilter}
											handleChange={(value) => setStatusFilter(value)}
										/>
									</S.ActionsWrapper>
								}
								side="bottom"
								align="end"
							/>
						</S.FiltersWrapper>
						<S.Divider />
						<S.Content>
							<TableCore
								handleClickOnCell={(id, event) => resolverClickCell(id, event)}
								filter={statusFilter === 'all' ? '' : statusFilter}
								setFilter={setStatusFilter}
								visibleColumns={metricsFilterState}
								rowSelection={selectedFunnelsInList}
								getRowId={(row) => row?._id ?? ''}
								setRowSelection={setSelectedFunnelsInList}
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
									{ header: 'Nome do funil', accessorKey: 'name' },
									{
										header: 'Categoria',
										accessorKey: 'type',
										cell: ({ row }) => row.getValue('type') ?? '-'
									},
									{
										header: 'Status do funil',
										accessorKey: 'status',
										cell: ({ row }) => {
											switch (row.getValue('status')) {
												case 'draft':
													return (
														<StatusPin type="inProgress" message="rascunho" />
													)
												case 'published':
													return (
														<StatusPin type="success" message="publicado" />
													)
												case 'archived':
													return <StatusPin type="advice" message="arquivado" />
												default:
													return null
											}
										}
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
									},
									{
										header: 'Valor das vendas',
										accessorKey: 'totalValue',
										cell: ({ row }) => row.getValue('totalValue') ?? '-'
									},
									{
										header: 'Total de vendas',
										accessorKey: 'totalSales',
										cell: ({ row }) => row.getValue('totalSales') ?? '-'
									},
									{
										header: 'Ticket médio',
										accessorKey: 'averageValue',
										cell: ({ row }) => row.getValue('averageValue') ?? '-'
									},
									{
										header: 'Resultados',
										accessorKey: 'results',
										cell: ({ row }) => row.getValue('results') ?? '-'
									},
									{
										header: 'Conversão',
										accessorKey: 'conversion',
										cell: ({ row }) =>
											row.getValue('conversion')
												? `${row.getValue('conversion')}%`
												: '-'
									}
								]}
								data={funnels}
								sortingData={{ sorting, setSorting }}
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
								title="Excluir funil"
								isOpen={funnelState.dialogDelete}
								setIsOpen={() => dispatch({ type: 'dialogDelete' })}
							>
								<DeleteFunnel
									closeDialog={() => dispatch({ type: 'dialogDelete' })}
									funnelId={funnelState.funnelToHandle}
								/>
							</DialogRoot>
							<DialogRoot
								title="Editar informações"
								isOpen={funnelState.dialogEdit}
								setIsOpen={() => dispatch({ type: 'dialogEdit' })}
							>
								<EditFunnelForm
									closeDialog={() => dispatch({ type: 'dialogEdit' })}
									funnelId={funnelState.funnelToHandle}
								/>
							</DialogRoot>
							<DialogRoot
								maxwidth={720}
								title="Códigos externos do funil"
								isOpen={funnelState.dialogExternalCodeFunnel}
								setIsOpen={() => dispatch({ type: 'dialogExternalCodeFunnel' })}
							>
								<ExternalCodeFunnel
									onCloseModal={() =>
										dispatch({ type: 'dialogExternalCodeFunnel' })
									}
									funnelId={funnelState.funnelToHandle}
								/>
							</DialogRoot>
						</S.Content>
					</>
				)}
				{!isPending && funnels.length <= 0 && (
					<S.NoContentCard>
						<img src={alertNoContent} />
						<strong>Nada aqui</strong>
						<p>
							Nenhum funil encontrado, comece criando agora um funil para o seu
							negócio
						</p>
						<Button onClick={() => dispatch({ type: 'dialogCreate' })}>
							Criar meu primeiro funil
						</Button>
					</S.NoContentCard>
				)}
			</S.Wrapper>
		</MainTemplate>
	)
}
