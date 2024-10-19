/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kanban, Loader2, Pen, PenLine, Plus, Trash } from 'lucide-react'
import { useEffect, useReducer, useState } from 'react'
import { toast } from 'react-toastify'
import { DeleteConfirmation } from '../../components/DeleteConfirmation'
import { DialogRoot } from '../../components/Dialog'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'
import { TableCore } from '../../components/TableCore'
import { errorToast, successToast } from '../../components/Toast/types'
import { deleteUser, getUsers } from '../../services/user.service'
import { UserForm } from './components/UserForm'
import * as S from './styles'

import alertNoContent from '../../assets/images/alert-no-content.svg'
import { RowSelectionState, SortingState } from '@tanstack/react-table'
import { teamsColumnsReducer } from './utils'
import {
	ColumnsTeamsFilterProps,
	TeamsResponse
} from '../../models/teams.model'
import { PopOver } from '../../components/PopOver'
import { Checkbox } from '../../components/Checkbox'
import { TableCheck } from '../../components/TableCheck'
import { PopoverClose } from '@radix-ui/react-popover'

type user = {
	id: string
	name: string
	email: string
	role: string
}

const roleLabels: Record<string, string> = {
	admin_upfunnels: 'Administrador',
	admin_client: 'Administrador',
	sales_access: 'Vendas',
	funnel_access: 'Gestor de funís'
}

const initialColumns: ColumnsTeamsFilterProps = {
	_id: true,
	name: true,
	email: true,
	role: true
}

export function Team() {
	const [team, setTeam] = useState([] as Partial<TeamsResponse>[])
	const [user, setUser] = useState<user>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEditOperation, setIsEditOperation] = useState<boolean>(false)
	const [isOpenToDelete, setIsOpenToDelete] = useState(false)
	const [dialogOpen, setDialogOpen] = useState<boolean>(false)
	const [sorting, setSorting] = useState<SortingState>([])
	const [teamsColumnsState, dispatchTeams] = useReducer(
		teamsColumnsReducer,
		initialColumns
	)
	const [selectedTeamsInList, setSelectedTeamsInList] =
		useState<RowSelectionState>({})

	const fetchTeam = async () => {
		setIsLoading(true)
		try {
			const data: Partial<TeamsResponse>[] = await getUsers()
			setTeam(data)
			setIsLoading(false)
			//setIsEndRequest(true)
		} catch (error) {
			console.error('Failed to fetch assistants:', error)
			setIsLoading(false)
			//setIsEndRequest(true)
		}
	}
	useEffect(() => {
		fetchTeam()
	}, [])
	const removeUser = async () => {
		try {
			if (user) {
				await deleteUser(user.email)
				setIsOpenToDelete(false)
				toast.success(`Usuário excluido com sucesso!`, successToast)
				await fetchTeam()
			}
		} catch (error: any) {
			toast.error(error.message, errorToast)
		}
	}

	const findTeam = async (id: string) => {
		return await team.find((t) => t._id == id)
	}

	const handleDeleteClick = async (id: string) => {
		const item = await findTeam(id)
		if (item) {
			const userToDelete = {
				id: item._id!,
				name: item.name!,
				role: item.role!,
				email: item.email!
			}
			setUser(userToDelete)
			setIsOpenToDelete(true)
		}
	}

	const handleEdit = async (id: string) => {
		const item = await findTeam(id)
		if (item) {
			const userToEdit = {
				id: item._id!,
				name: item.name!,
				role: item.role!,
				email: item.email!
			}
			setDialogOpen(true)
			setIsEditOperation(true)
			setUser(userToEdit)
		}
	}

	function resolverClickCell(id: string, event: React.MouseEvent) {
		if ((event.target as HTMLElement).localName === 'td') {
			handleEdit(id)
		}

		if ((event.target as HTMLElement).attributes[1].localName === 'checkbox') {
			return
		}
	}

	const handleButtonClick = (action: string) => {
		const selectedId = Object.keys(selectedTeamsInList)[0]
		if (selectedId) {
			if (action === 'edit') {
				handleEdit(selectedId)
			} else if (action === 'delete') {
				handleDeleteClick(selectedId)
			}
		}
	}

	return (
		<S.Wrapper>
			<S.Header>
				<DialogRoot
					isOpen={dialogOpen}
					setIsOpen={() => {
						setDialogOpen(!dialogOpen)
						setIsEditOperation(false)
					}}
					trigger={
						<S.NewUserTrigger>
							<Plus />
							<span>Novo usuário</span>
						</S.NewUserTrigger>
					}
					title={`${isEditOperation ? 'Editar' : 'Adicionar'} usuário`}
					maxwidth={800}
				>
					<UserForm
						closeDialog={() => {
							setDialogOpen(false)
							setIsEditOperation(false)
							fetchTeam().then()
						}}
						isEditOperation={isEditOperation}
						userInfo={user}
					/>
				</DialogRoot>
			</S.Header>
			{isLoading && (
				<EmptyWrapper>
					<Loader2 strokeWidth={1}></Loader2>
					<span>Carregando equipe</span>
				</EmptyWrapper>
			)}
			{!isLoading && team.length <= 0 && (
				<S.NoContentCard>
					<img src={alertNoContent} />
					<strong>Nada aqui</strong>
					<p>
						Crie um novo usuário para visualizar e associá-lo a um lead ou crm.
					</p>
				</S.NoContentCard>
			)}
			{!isLoading && team.length > 0 && (
				<S.TeamCard $shadow="false">
					<S.HeaderAssistant>
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
											onChange={() => dispatchTeams({ type: 'name' })}
											check={teamsColumnsState.name}
										/>
										<Checkbox
											label="Email"
											onChange={() => dispatchTeams({ type: 'email' })}
											check={teamsColumnsState.email}
										/>
										<Checkbox
											label="Função"
											onChange={() => dispatchTeams({ type: 'role' })}
											check={teamsColumnsState.role}
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
												disabled={Object.keys(selectedTeamsInList).length !== 1}
												onClick={() => handleButtonClick('edit')}
											>
												<PenLine strokeWidth={1} />
												Editar informações
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedTeamsInList).length !== 1}
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
										disabled={Object.keys(selectedTeamsInList).length !== 1}
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
						handleClickOnCell={(id, event) => resolverClickCell(id, event)}
						visibleColumns={teamsColumnsState}
						rowSelection={selectedTeamsInList}
						getRowId={(row) => row?._id ?? ''}
						setRowSelection={setSelectedTeamsInList}
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
								accessorKey: 'name',
								header: 'Nome'
							},
							{
								accessorKey: 'email',
								header: 'Email'
							},
							{
								accessorKey: 'role',
								header: 'Nível de Acesso',
								cell: ({ row }) => {
									const role = row.getValue('role') as string
									return roleLabels[role]
								}
							}
						]}
						data={team}
						sortingData={{ sorting, setSorting }}
					/>
				</S.TeamCard>
			)}

			<DialogRoot
				title="Excluir usuário"
				setIsOpen={() => setIsOpenToDelete(!isOpenToDelete)}
				isOpen={isOpenToDelete}
				maxwidth={800}
			>
				<DeleteConfirmation
					destructionFunction={() => removeUser()}
					message="Você tem certeza que deseja excluir este usuário? Todas as funções desempenhadas por ele precisam ser redirecionadas para um novo usuário. Esta ação não pode ser desfeita."
				/>
			</DialogRoot>
		</S.Wrapper>
	)
}
