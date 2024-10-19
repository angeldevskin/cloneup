/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close as PopoverClose } from '@radix-ui/react-popover'

import { debounce } from 'lodash'
import {
	AlignLeft,
	CircleSlash2,
	Kanban,
	LayoutList,
	Loader2,
	Pen,
	Search,
	SquareKanbanDashed,
	Trash2
} from 'lucide-react'
import { useCallback, useEffect, useReducer, useState } from 'react'

import { MainTemplate } from '../../templates/MainTemplate'

import { DialogRoot } from '../../components/Dialog'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'

import { EditLeadForm } from './components/EditLeadForm'

import { ColumnsFilterProps, Lead } from '../../models/leads.model'

import { RowSelectionState } from '@tanstack/react-table'
import { toast } from 'react-toastify'
import { FunnelType } from '../../@types/pages/funnels'
import { Checkbox } from '../../components/Checkbox'
import { NoContentCard } from '../../components/NoContentCard'
import { PopOver } from '../../components/PopOver'
import { RadioGroup } from '../../components/RadioGroup'
import { Select } from '../../components/Select'
import { TextFieldNatty } from '../../components/TextFieldNatty'
import { errorToast } from '../../components/Toast/types'
import { getFunnelByID, getFunnels } from '../../services/funnels.service'
import { deleteLead, getCrmByFunnelId } from '../../services/leads.service'
import { useFunnels } from '../../services/store/funnels'
import { LeadsList } from './components/LeadsList'
import * as S from './styles'
import { leadsColumnsReducer, leadsReducer } from './utils'
import { LeadsBoard } from './components/LeadsBoard'
import { ModalDeleteLead } from './components/ModalDelete/ModalDeleteLead'

const initialColumns: ColumnsFilterProps = {
	name: true,
	surname: true,
	email: true,
	telephone: true,
	funnelName: true,
	pageName: true
}

export function Leads() {
	const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false)
	const [visualization, setVisualization] = useState('board')
	const [selectedLeadsInList, setSelectedLeadsInList] =
		useState<RowSelectionState>({})
	const [deleteAssistantId, setDeleteAssistantId] = useState<string | null>(
		null
	)
	const [dialogFunnelOpen, setDialogFunnelOpen] = useState(false)
	const [loadingFunnels, setLoadingFunnels] = useState(false)
	const { setCurrentFunnel, funnelToLead, setFunnelToLead } = useFunnels(
		(state) => state
	)
	const [selectedFunnel, setSelectedFunnel] = useState<string>('')
	const [funnels, setFunnels] = useState<
		Array<{
			funnelName: string
			funnelId: string
		}>
	>()

	// Leads handlers
	const [loadingLeads, setLoadingLeads] = useState(false)
	const [leads, setLeads] = useState<Lead[]>([])
	const [crmId, setCrmId] = useState('')

	const [columns, setColumns] = useState<
		Array<{
			id: string
			pageId: string
			index: number
			name: string
			managerId: string
		}>
	>([])
	const [leadsState, dispatch] = useReducer(leadsReducer, {
		dialogDetails: false,
		leadToHandle: {} as Lead
	})
	const [leadsColumnsState, dispatchLeadsColumnsState] = useReducer(
		leadsColumnsReducer,
		initialColumns
	)

	const [currentAssistantsManagers, setCurrentAssistantsManagers] = useState([])

	async function fetchCrm(funnelId: string) {
		console.log('fetchCrm')
		setLoadingLeads(true)
		const response = await getCrmByFunnelId(funnelId)

		const crms = response.data.crms

		let currentLeads: Lead[] = []

		const columns = crms[0].pageWithIndex.map((page: any) => {
			currentLeads = [...currentLeads, ...page.leads]
			return {
				id: page.pageId,
				pageId: page.pageId,
				name: page.page.name,
				index: page.index,
				managerId: page.page.assistantManagerId
			}
		})

		setColumns(columns)
		setCrmId(crms[0]._id)

		setLeads(currentLeads)
		setFilteredData(currentLeads)
		setCurrentAssistantsManagers(response.data.assistantManagers)

		setLoadingLeads(false)
	}

	async function fetchFunnels() {
		setLoadingFunnels(true)
		const response = await getFunnels()

		if (
			response.funnels.filter(
				(funnel: FunnelType) => funnel.status === 'published'
			).length <= 0
		) {
			setLoadingFunnels(false)
			setDialogFunnelOpen(true)
			setLeads([])
			setColumns([])
			setFunnelToLead('')
			return
		}

		setFunnels(
			response.funnels
				.filter((funnel: FunnelType) => funnel.status === 'published')
				.map((funnel: FunnelType) => ({
					funnelName: funnel.name,
					funnelId: funnel._id
				}))
		)

		if (!funnelToLead) {
			setDialogFunnelOpen(true)
			setLoadingFunnels(false)
		} else {
			const funnel = response.funnels.find(
				(item: FunnelType) => item._id === funnelToLead
			)?._id

			if (!funnel) {
				setFunnelToLead(response.funnels[0]._id)

				fetchCrm(response.funnels[0]._id)

				setLoadingFunnels(false)
				return
			}

			setSelectedFunnel(funnel)

			fetchCrm(funnel)
		}
	}

	const reset = () => {
		setCurrentFunnel({} as FunnelType)
		fetchFunnels()
	}

	useEffect(() => {
		setCurrentFunnel({} as FunnelType)
		fetchFunnels()
	}, [])

	async function fetchFunnelById(value: string) {
		setLoadingLeads(true)
		const response = await getFunnelByID(value)

		if (!response) return toast.error('Erro ao buscar funil', errorToast)

		setCurrentFunnel(response)

		fetchCrm(response._id!)
	}

	const [leadToSearch, setLeadToSearch] = useState('')
	const [filteredData, setFilteredData] = useState<Lead[]>([])

	const debouncedFilter = useCallback(
		debounce((value) => {
			const filtered = leads.filter(
				(item) => item.name?.toLowerCase().startsWith(value)
			)
			setFilteredData(filtered)
		}, 300),
		[leads]
	)

	function handleInputChange(data: string) {
		setLeadToSearch(data)
		debouncedFilter(data)
	}

	function handleLeadDetailAction() {
		const leadId = Object.keys(selectedLeadsInList)[0]
		const lead = leads.find((lead) => lead._id === leadId)
		if (!lead) return
		dispatch({
			type: 'leadToHandle',
			payload: lead
		})
		dispatch({ type: 'dialogDetails' })
	}

	const confirmDeleteAssistant = async () => {
		if (deleteAssistantId) {
			await deleteLead(deleteAssistantId)
				.then(async (res) => {
					const { status } = res
					if (status === 204) {
						toast.success('Excluido com sucesso!')
						reset()
					} else {
						throw new Error('Não foi possível excluir')
					}
				})
				.catch((err) => {
					const { status } = err.response
					toast.error(`Erro ao excluir - ${status}`)
				})
			setModalDeleteOpen(false)
		}
	}

	const handleDeleteBtn = () => {
		const leadId = Object.keys(selectedLeadsInList)[0]
		const lead = leads.find((lead) => lead._id === leadId)
		if (!lead) return

		handleDeleteClick(leadId)
	}

	const handleDeleteClick = (id: string) => {
		setDeleteAssistantId(id)
		setModalDeleteOpen(true)
	}

	return (
		<MainTemplate>
			<S.Container>
				<S.Header>
					<div className="subHeader">
						<h1>Leads</h1>
						{!dialogFunnelOpen && (
							<Select
								items={
									funnels?.map((funnel) => ({
										id: funnel.funnelId,
										name: funnel.funnelName,
										value: funnel.funnelId
									})) ?? []
								}
								defaultValue={funnelToLead ?? ''}
								currentValue={selectedFunnel}
								handleChange={async (value) => {
									setLeads([])
									setSelectedFunnel(value)
									setFunnelToLead(value)
									fetchFunnelById(value)
								}}
								placeholder="-"
							/>
						)}
					</div>
				</S.Header>
				<div
					style={{
						width: '100%',
						boxShadow: '0px 8px 24px 0px rgba(149, 157, 165, 0.2)',
						padding: '1rem',
						overflow: 'hidden',
						borderRadius: '8px'
					}}
				>
					{!dialogFunnelOpen && (
						<S.FilterContainer>
							<TextFieldNatty
								placeholder="Buscar um lead"
								name="searchLead"
								$fullwidth
								iconPosition="left"
								value={leadToSearch}
								onChange={(event) => handleInputChange(event.target.value)}
								icon={<Search strokeWidth={1} />}
							/>
							<PopOver
								offset={6}
								side="bottom"
								content={
									<S.ActionsWrapper>
										<RadioGroup
											defaultValue={visualization}
											options={[
												{ value: 'board', label: 'Quadro' },
												{ value: 'list', label: 'Lista' }
											]}
											currentValue={visualization}
											handleChange={(value) => setVisualization(value)}
										/>
									</S.ActionsWrapper>
								}
								trigger={
									<S.ButtonActions>
										{visualization === 'list' && <AlignLeft strokeWidth={1} />}
										{visualization === 'board' && (
											<SquareKanbanDashed strokeWidth={1} />
										)}
										Visualização:
										{visualization === 'list' && ' Lista'}
										{visualization === 'board' && ' Quadro'}
									</S.ButtonActions>
								}
							/>
							{visualization === 'list' && (
								<>
									<PopOver
										offset={6}
										content={
											<S.ActionsWrapper>
												<Checkbox
													label="Nome"
													onChange={() =>
														dispatchLeadsColumnsState({ type: 'name' })
													}
													check={leadsColumnsState.name}
												/>
												<Checkbox
													label="Sobrenome"
													onChange={() =>
														dispatchLeadsColumnsState({ type: 'surname' })
													}
													check={leadsColumnsState.surname}
												/>
												<Checkbox
													label="Email"
													onChange={() =>
														dispatchLeadsColumnsState({ type: 'email' })
													}
													check={leadsColumnsState.email}
												/>
												<Checkbox
													label="Telefone"
													onChange={() =>
														dispatchLeadsColumnsState({ type: 'telephone' })
													}
													check={leadsColumnsState.telephone}
												/>
												<Checkbox
													label="Funil"
													onChange={() =>
														dispatchLeadsColumnsState({ type: 'funnelName' })
													}
													check={leadsColumnsState.funnelName}
												/>
												<Checkbox
													label="Página"
													onChange={() =>
														dispatchLeadsColumnsState({ type: 'pageName' })
													}
													check={leadsColumnsState.pageName}
												/>
											</S.ActionsWrapper>
										}
										trigger={
											<S.ButtonActions>
												<Kanban strokeWidth={1} />
												Colunas
											</S.ButtonActions>
										}
										align="end"
										side="bottom"
									/>
									<PopOver
										offset={6}
										align="end"
										side="bottom"
										content={
											<S.ActionsWrapper>
												<PopoverClose asChild>
													<button
														className="customButton"
														disabled={
															Object.keys(selectedLeadsInList).length > 1
														}
														onClick={() => handleLeadDetailAction()}
													>
														<LayoutList strokeWidth={1} />
														Ver detalhes
													</button>
												</PopoverClose>
												<PopoverClose asChild>
													<button
														className="customButton"
														disabled={
															Object.keys(selectedLeadsInList).length > 1
														}
														onClick={() => handleDeleteBtn()}
													>
														<Trash2 strokeWidth={1} />
														Excluir
													</button>
                        </PopoverClose>
											</S.ActionsWrapper>
										}
										trigger={
											<S.ButtonActions
												disabled={Object.keys(selectedLeadsInList).length <= 0}
											>
												<Pen strokeWidth={1} />
												Ações
											</S.ButtonActions>
										}
									/>
								</>
							)}
						</S.FilterContainer>
					)}
					{!dialogFunnelOpen && visualization === 'board' && !loadingLeads && (
						<LeadsBoard
							handleFetchFunnel={(funnelId) => fetchFunnelById(funnelId)}
							leads={leads}
							columns={columns}
							crmId={crmId}
							setColumns={setColumns}
							setLeads={setLeads}
							filteredData={filteredData}
							currentAssistantsManagers={currentAssistantsManagers}
						/>
					)}
					{!dialogFunnelOpen &&
						visualization === 'list' &&
						leads.length > 0 && (
							<>
								<S.Divider />
								<LeadsList
									leads={filteredData}
									selectedLeadsInList={selectedLeadsInList}
									setSelectedLeadsInList={setSelectedLeadsInList}
									leadsColumnsState={leadsColumnsState}
									managers={currentAssistantsManagers}
								/>
							</>
						)}
					{!dialogFunnelOpen && loadingLeads && (
						<EmptyWrapper>
							<Loader2 strokeWidth={1} />
							<span>Carregando leads</span>
						</EmptyWrapper>
					)}
					{!funnelToLead &&
						!dialogFunnelOpen &&
						leads.length <= 0 &&
						!loadingLeads && (
							<EmptyWrapper style={{ opacity: 0.4 }}>
								<CircleSlash2 strokeWidth={1} data-type="fixed" />
								<span>Nenhum lead encontrado</span>
							</EmptyWrapper>
						)}
					{dialogFunnelOpen && (
						<>
							{loadingFunnels && (
								<EmptyWrapper>
									<Loader2 strokeWidth={1} />
									<span>Carregando funis</span>
								</EmptyWrapper>
							)}
							{!loadingFunnels && funnels && funnels.length > 0 && (
								<S.SelectFunnelWrapper>
									<h3>Selecione um funil para visualizar os leads</h3>
									<Select
										currentValue={selectedFunnel}
										handleChange={(value) => {
											setLeads([])
											setSelectedFunnel(value)
											setFunnelToLead(value)
											fetchFunnelById(value)
											setDialogFunnelOpen(false)
										}}
										items={funnels.map((funnel) => ({
											id: funnel.funnelId,
											name: funnel.funnelName,
											value: funnel.funnelId
										}))}
										placeholder="Selecione um funil"
									/>
								</S.SelectFunnelWrapper>
							)}
							{!loadingFunnels && !funnels && (
								<NoContentCard
									message="Não conseguimos encontrar funis publicados, certifique-se de
								que você tenha um funil publicado."
								/>
							)}
						</>
					)}
				</div>
			</S.Container>
			<DialogRoot
				title="Detalhes do lead"
				isOpen={leadsState.dialogDetails}
				setIsOpen={() => dispatch({ type: 'dialogDetails' })}
				maxwidth={850}
			>
				<EditLeadForm
					leadId={leadsState.leadToHandle._id}
					lead={leadsState.leadToHandle}
				/>
			</DialogRoot>
			<DialogRoot
				className="dialog-modal-delete-ia"
				setIsOpen={() => setModalDeleteOpen(!modalDeleteOpen)}
				title="Excluir assistente"
				isOpen={modalDeleteOpen}
				maxwidth={720}
			>
				<ModalDeleteLead
					handleClose={() => setModalDeleteOpen(false)}
					handleDelete={confirmDeleteAssistant}
				/>
			</DialogRoot>
		</MainTemplate>
	)
}
