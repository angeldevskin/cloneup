import { Kanban, Loader2, Pen, PenLine, Plus, Trash } from 'lucide-react'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import alertNoContent from '../../assets/images/alert-no-content.svg'
import { Button } from '../../components/Button'
import { DialogRoot } from '../../components/Dialog'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'
import { TableCore } from '../../components/TableCore'
import { AssistantResponse } from '../../models/assitantResponse'
import {
	deleteAssistant,
	getAllAssistant
} from '../../services/intelligenceAssistant.service'
import { MainTemplate } from '../../templates/MainTemplate'
import { ModalConfigKeyIA } from './components/modalKey/ModalConfigKeyIA'
import { ModalNewIA } from './components/ModalNewIA/ModalNewIA'
import * as S from './styles'
import { ModalDeleteAssistant } from './components/ModalDelete/ModalDeleteAssistant'
import { ColumnsAssistantFilterProps } from '../../models/assistant.model'
import { RowSelectionState, SortingState } from '@tanstack/react-table'
import { assistantColumnsReducer } from './utils'
import { PopOver } from '../../components/PopOver'
import { Checkbox } from '../../components/Checkbox'
import { TableCheck } from '../../components/TableCheck'
import { PopoverClose } from '@radix-ui/react-popover'

const initialColumns: ColumnsAssistantFilterProps = {
	assistantId: true,
	name: true,
	gptVersion: true,
	createdAt: true
}

export function Assistant() {
	const navigate = useNavigate()
	const [assistants, setAssistants] = useState(
		[] as Partial<AssistantResponse>[]
	)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEndRequest, setIsEndRequest] = useState<boolean>(false)
	const [modalConfigKeyIAOpen, setModalConfigKeyIAOpen] =
		useState<boolean>(false)
	const [modalNewIA, setModalNewIA] = useState<boolean>(false)
	const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false)
	const [deleteAssistantId, setDeleteAssistantId] = useState<string | null>(
		null
	)
	const [sorting, setSorting] = useState<SortingState>([])

	const [assistantColumnsState, dispatchAssistant] = useReducer(
		assistantColumnsReducer,
		initialColumns
	)
	const [selectedAssistantInList, setSelectedAssistantInList] =
		useState<RowSelectionState>({})

	useEffect(() => {
		const fetchAssistants = async () => {
			setIsLoading(true)
			try {
				const data = await getAllAssistant()
				setAssistants(data)
				setIsLoading(false)
				setIsEndRequest(true)
			} catch (error) {
				setIsLoading(false)
				setIsEndRequest(true)
			}
		}

		fetchAssistants()
	}, [])

	const openModal = (type: string) => {
		if (type === 'configKeyIA') {
			setModalConfigKeyIAOpen(true)
		}
		if (type === 'closeConfig') {
			setModalConfigKeyIAOpen(false)
		}
		if (type === 'newIA') {
			setModalNewIA(true)
		}
	}

	const confirmDeleteAssistant = async () => {
		if (deleteAssistantId) {
			await deleteAssistant(deleteAssistantId)
				.then(async (res) => {
					const { status } = res
					if (status === 204) {
						toast.success('Excluido com sucesso!')
						const data = await getAllAssistant()
						setAssistants(data)
						setSelectedAssistantInList({})
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

	const handleDeleteClick = (id: string) => {
		setDeleteAssistantId(id)
		setModalDeleteOpen(true)
	}

	const redirectToNew = (id: string | null = null) => {
		if (id) {
			navigate(`/new-ia/${id}`, { state: { action: 'edit' } })
			return
		}
		navigate(`/new-ia`, { state: { action: 'add' } })
	}

	const handleButtonClick = (action: string) => {
		const selectedId = Object.keys(selectedAssistantInList)[0]
		if (selectedId) {
			if (action === 'edit') {
				redirectToNew(selectedId)
			} else if (action === 'delete') {
				handleDeleteClick(selectedId)
			}
		}
	}

	function resolverClickCell(assistantId: string, event: React.MouseEvent) {
		const targetElement = event.target as HTMLElement
		if (targetElement.localName === 'td') {
			navigate(`/new-ia/${assistantId}`, { state: { action: 'edit' } })
		}
	}

	return (
		<MainTemplate>
			<S.Section>
				<S.ContainerAssistant>
					<S.HeaderPage>
						<span className="title-domain">Assistentes de IA</span>
						<Button onClick={() => setModalNewIA(true)}>
							<Plus />
							Adicionar assistente
						</Button>
					</S.HeaderPage>
					{isLoading && (
						<EmptyWrapper>
							<Loader2 strokeWidth={1}></Loader2>
							<span>Carregando assistentes</span>
						</EmptyWrapper>
					)}
					{!isLoading && assistants.length > 0 && (
						<S.AssistantCard $shadow="false">
							<S.HeaderAssistant>
								<S.InfoContainer>
									<S.SubTitleTable>
										Configure novos assistentes de inteligência artificial
									</S.SubTitleTable>
								</S.InfoContainer>
								<S.FiltersWrapper>
									<PopOver
										offset={6}
										trigger={
											<S.ButtonActions>
												<Kanban strokeWidth={1} />
												Colunas
											</S.ButtonActions>
										}
										content={
											<S.AssistantFilter>
												<strong>Adicionar colunas</strong>
												<Checkbox
													label="Nome"
													onChange={() => dispatchAssistant({ type: 'name' })}
													check={assistantColumnsState.name}
												/>
												<Checkbox
													label="Modelo"
													onChange={() =>
														dispatchAssistant({ type: 'gptVersion' })
													}
													check={assistantColumnsState.gptVersion}
												/>
												<Checkbox
													label="Criado em"
													onChange={() =>
														dispatchAssistant({ type: 'createdAt' })
													}
													check={assistantColumnsState.createdAt}
												/>
											</S.AssistantFilter>
										}
										side="bottom"
										align="end"
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
															Object.keys(selectedAssistantInList).length !== 1
														}
														onClick={() => handleButtonClick('edit')}
													>
														<PenLine strokeWidth={1} />
														Editar informações
													</button>
												</PopoverClose>
												<PopoverClose asChild>
													<button
														className="customButton"
														disabled={
															Object.keys(selectedAssistantInList).length !== 1
														}
														onClick={() => handleButtonClick('delete')}
													>
														<Trash strokeWidth={1} />
														Excluir assistente
													</button>
												</PopoverClose>
											</S.ActionsWrapper>
										}
										trigger={
											<S.ButtonActions
												disabled={
													Object.keys(selectedAssistantInList).length !== 1
												}
											>
												<Pen strokeWidth={1} />
												Ações
											</S.ButtonActions>
										}
									/>
								</S.FiltersWrapper>
							</S.HeaderAssistant>
							<S.Divider />
							<TableCore
								filter={''}
								handleClickOnCell={(assistantId, event) => {
									resolverClickCell(assistantId, event)
								}}
								visibleColumns={assistantColumnsState}
								rowSelection={selectedAssistantInList}
								getRowId={(row) => row?.assistantId ?? ''}
								setRowSelection={setSelectedAssistantInList}
								columns={[
									{
										accessorKey: 'assistantId',
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
										accessorKey: 'name',
										header: 'Nome do assistente'
									},
									{
										accessorKey: 'gptVersion',
										header: 'Versão do GPT'
									},
									{
										accessorKey: 'createdAt',
										header: 'Data de criação',
										cell: ({ row }) => {
											const createdAt = row.getValue('createdAt') as string
											const date = new Date(createdAt)
											const pad = (num: number) => String(num).padStart(2, '0')
											const formattedDate = `${pad(date.getUTCDate())}/${pad(
												date.getUTCMonth() + 1
											)}/${date.getUTCFullYear()}`
											return formattedDate
										}
									}
								]}
								data={assistants}
								sortingData={{ sorting, setSorting }}
							/>
						</S.AssistantCard>
					)}
					{!assistants.length && isEndRequest && (
						<S.NoContentCard>
							<img src={alertNoContent} />
							<strong>Nada aqui</strong>
							<p>Adicione um novo assistente para visualizá-lo aqui.</p>
							<Button onClick={() => setModalNewIA(true)}>
								Adicionar assistente
							</Button>
						</S.NoContentCard>
					)}
				</S.ContainerAssistant>
			</S.Section>
			<DialogRoot
				className="dialog-modal-config-key-ia"
				setIsOpen={() => setModalConfigKeyIAOpen(!modalConfigKeyIAOpen)}
				title="Adicionar chave OpenAI"
				isOpen={modalConfigKeyIAOpen}
				maxwidth={1500}
			>
				<ModalConfigKeyIA openModal={openModal} />
			</DialogRoot>
			<DialogRoot
				className="dialog-modal-config-key-ia"
				setIsOpen={() => setModalNewIA(!modalNewIA)}
				title="Criar assistente"
				isOpen={modalNewIA}
				maxwidth={720}
			>
				<ModalNewIA closeDialog={() => setModalNewIA(false)} />
			</DialogRoot>
			<DialogRoot
				className="dialog-modal-delete-ia"
				setIsOpen={() => setModalDeleteOpen(!modalDeleteOpen)}
				title="Excluir assistente"
				isOpen={modalDeleteOpen}
				maxwidth={720}
			>
				<ModalDeleteAssistant
					handleClose={() => setModalDeleteOpen(false)}
					handleDelete={confirmDeleteAssistant}
				/>
			</DialogRoot>
		</MainTemplate>
	)
}
