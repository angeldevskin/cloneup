/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowSelectionState, SortingState } from '@tanstack/react-table'
import { Code2, Kanban, Loader2, Pen, PenLine, Trash } from 'lucide-react'
import { useEffect, useReducer, useState } from 'react'
import alertNoContent from '../../assets/images/alert-no-content.svg'
import { Button } from '../../components/Button'
import { DialogRoot } from '../../components/Dialog'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'
import { TableCore } from '../../components/TableCore'
import { ColumnsFilterPropsCode } from '../../models/code.model'
import { PixelCodeResponseWithFunnelPage } from '../../services/models/pixel-code'
import {
	deletePixelCodeSource,
	getPixelCodeWithFunnelPage
} from '../../services/pixel-code.service'
import { ModalDelete } from './components/ModalDelete'
import { ModalIntegration } from './components/ModalIntegration'
import { ModalManual } from './components/ModalManual'
import { ModalNewCode } from './components/ModalNewCode'
import { ModalSucces } from './components/ModalSuccess'
import { Plataforms } from './configs/Platforms'
import './style.css'
import * as S from './styles'
import { codeColumnsReducer } from './utils'
import { Checkbox } from '../../components/Checkbox'
import { PopOver } from '../../components/PopOver'
import { TableCheck } from '../../components/TableCheck'
import { PopoverClose } from '@radix-ui/react-popover'
import { useNavigate } from 'react-router-dom'

export function Codes() {
	const [modalNewCodeOpen, setModalNewCodeOpen] = useState<boolean>(false)
	const [modalSuccess, setModalSuccess] = useState<boolean>(false)
	const [modalDelete, setModalDelete] = useState<boolean>(false)
	const [isPending, setIsPending] = useState(false)
	const [modalIntegrationOpen, setModalIntegrationOpen] =
		useState<boolean>(false)
	const [isUpdate, setIsUpdate] = useState<boolean>(false)
	const [modalManualOpen, setModalManualOpen] = useState<boolean>(false)
	const [modalDeletelOpen, setModalDeleteOpen] = useState<boolean>(false)
	const [modalIdDeletel, setIdModalDelete] = useState<string>('')
	const [pixelResult, setPixelResult] = useState<
		PixelCodeResponseWithFunnelPage[] | null
	>(null)
	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState('all')
	const [editCode, setEditCode] =
		useState<PixelCodeResponseWithFunnelPage | null>()
	const [isEndRequest, setIsEndRequest] = useState<boolean>(false)
	const [selectedCodeInList, setSelectedCodeInList] =
		useState<RowSelectionState>({})

	const navigate = useNavigate()

	const initialColumns: ColumnsFilterPropsCode = {
		_id: true,
		name: true,
		platform: true,
		funnelName: true,
		pageName: true,
		bodyPage: true,
		footerPage: true,
		funnelIds: true,
		headerPage: true,
		isManual: true,
		createdAt: true
	}

	const [codeColumnsState, dispatchCode] = useReducer(
		codeColumnsReducer,
		initialColumns
	)

	async function deletePixelCode() {
		if (modalIdDeletel != '') {
			try {
				await deletePixelCodeSource(modalIdDeletel)
				const updatedPixelResponse = await getPixelCodeWithFunnelPage()
				setPixelResult(updatedPixelResponse)
				setSelectedCodeInList({})
			} catch (error) {
				setPixelResult(null)
			}
		}
	}

	async function updatePixelCodes() {
		const updatedPixelResponse = await getPixelCodeWithFunnelPage()
		setPixelResult(updatedPixelResponse)
		setSelectedCodeInList({})
	}

	function getCodeById(id: string): Promise<PixelCodeResponseWithFunnelPage> {
		return new Promise((resolve, reject) => {
			const item = pixelResult?.find((code) => code._id === id)
			if (item) {
				setEditCode(item)
				resolve(item)
			} else {
				reject(new Error('Item not found'))
			}
		})
	}

	useEffect(() => {
		navigate('/')
		setIsPending(true)
		const fetchData = async () => {
			try {
				const pixelResponse = await getPixelCodeWithFunnelPage()
				setPixelResult(pixelResponse)
				setIsEndRequest(true)
				setIsPending(false)
			} catch (error) {
				setIsEndRequest(true)
				setIsPending(false)
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	function handleChange(modal: string): void {
		setModalNewCodeOpen(!modalNewCodeOpen)
		if (modal == 'integration') {
			setModalIntegrationOpen(true)
		}
		if (modal == 'manual') {
			setModalManualOpen(true)
		}
	}

	return (
		<>
			<div id="code-page">
				<div className="header">
					<Button
						onClick={() => {
							setEditCode(null)
							setModalNewCodeOpen(true)
							setIsUpdate(false)
						}}
					>
						<Code2 />
						Novo código
					</Button>
				</div>

				{isPending && (
					<EmptyWrapper>
						<Loader2 strokeWidth={1}></Loader2>
						<span>Carregando códigos externos</span>
					</EmptyWrapper>
				)}

				{!isPending && !!pixelResult && pixelResult?.length > 0 && (
					<div className="card-main">
						<S.Actions></S.Actions>
						<S.CodeCard $shadow="false">
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
										<S.CodeFilter>
											<strong>Adicionar colunas</strong>
											<Checkbox
												label="Nome"
												onChange={() => dispatchCode({ type: 'name' })}
												check={codeColumnsState.name}
											/>
											<Checkbox
												label="Modelo"
												onChange={() => dispatchCode({ type: 'platform' })}
												check={codeColumnsState.platform}
											/>
											<Checkbox
												label="Criado em"
												onChange={() => dispatchCode({ type: 'createdAt' })}
												check={codeColumnsState.createdAt}
											/>
										</S.CodeFilter>
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
													disabled={Object.keys(selectedCodeInList).length > 1}
													onClick={() => {
														const selectedId =
															Object.keys(selectedCodeInList)[0]
														console.log(selectedId)
														if (selectedId) {
															getCodeById(selectedId).then((res) => {
																if (res.isManual) {
																	setModalManualOpen(true)
																} else {
																	setModalIntegrationOpen(true)
																}
																setIsUpdate(true)
															})
														}
													}}
												>
													<PenLine strokeWidth={1} />
													Editar informações
												</button>
											</PopoverClose>
											<PopoverClose asChild>
												<button
													className="customButton"
													disabled={Object.keys(selectedCodeInList).length > 1}
													onClick={() => {
														const selectedId =
															Object.keys(selectedCodeInList)[0]
														if (selectedId) {
															setModalDeleteOpen(true)
															setIdModalDelete(selectedId)
														}
													}}
												>
													<Trash strokeWidth={1} />
													Excluir pixel/código
												</button>
											</PopoverClose>
										</S.ActionsWrapper>
									}
									trigger={
										<S.ButtonActions
											disabled={Object.keys(selectedCodeInList).length <= 0}
										>
											<Pen strokeWidth={1} />
											Ações
										</S.ButtonActions>
									}
								/>
							</S.FiltersWrapper>

							<S.Divider />
							<TableCore
								handleClickOnCell={() => {}}
								filter={globalFilter === 'all' ? '' : globalFilter}
								setFilter={setGlobalFilter}
								rowSelection={selectedCodeInList}
								getRowId={(row) => row?._id ?? ''}
								setRowSelection={setSelectedCodeInList}
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
										header: 'Nome do código'
									},
									{
										accessorKey: 'platform',
										header: 'Plataforma',
										cell: ({ row }) => {
											const platform = row.getValue('platform')
											let mapedPlatform = row.getValue('platform')
											if (platform) {
												const founded = Plataforms.find(
													(plat: any) => plat.id == platform
												)
												if (founded) {
													mapedPlatform = founded.name
												}
											}
											return platform && platform != 'CUSTOM' ? (
												mapedPlatform
											) : (
												<span style={{ color: '#444f55' }}>Personalizado</span>
											)
										}
									},
									{
										accessorKey: 'createdAt',
										header: 'Criado em',
										cell: ({ row }) => {
											const createdAt = row.getValue('createdAt') as string
											const date = new Date(createdAt)
											const pad = (num: any) => String(num).padStart(2, '0')
											const formattedDate = `${pad(date.getUTCDate())}/${pad(
												date.getUTCMonth() + 1
											)}/${date.getUTCFullYear()}`
											return `${formattedDate}`
										}
									}
								]}
								data={pixelResult || []}
								sortingData={{ sorting, setSorting }}
								visibleColumns={codeColumnsState}
							/>
						</S.CodeCard>
					</div>
				)}
				{!pixelResult && isEndRequest && (
					<S.NoContentCard>
						<img src={alertNoContent} />
						<strong>Nada aqui</strong>
						<p>
							Crie um novo código para visualizar e associá-lo a um funil ou
							página.
						</p>
						<Button onClick={() => setModalNewCodeOpen(true)}>
							Novo código
						</Button>
					</S.NoContentCard>
				)}
			</div>
			<DialogRoot
				className="dialog-modal-code"
				setIsOpen={() => setModalNewCodeOpen(!modalNewCodeOpen)}
				title="Novo código"
				isOpen={modalNewCodeOpen}
				maxwidth={720}
			>
				<ModalNewCode openModal={(modal: string) => handleChange(modal)} />
			</DialogRoot>
			<DialogRoot
				className="dialog-modal-integration"
				setIsOpen={() => setModalIntegrationOpen(!modalIntegrationOpen)}
				title={editCode ? 'Editar código' : 'Novo código'}
				isOpen={modalIntegrationOpen}
				maxwidth={720}
			>
				<ModalIntegration
					onCloseModal={() => {
						setModalSuccess(true)
						setModalIntegrationOpen(false)
						updatePixelCodes()
					}}
					info={editCode}
					isUpdate={isUpdate}
				/>
			</DialogRoot>
			<DialogRoot
				className="dialog-modal-manual"
				setIsOpen={() => setModalManualOpen(!modalManualOpen)}
				title={editCode ? 'Editar código' : 'Novo código'}
				isOpen={modalManualOpen}
				maxwidth={720}
			>
				<ModalManual
					onCloseModal={() => {
						setModalManualOpen(false)
						setModalSuccess(true)
						updatePixelCodes()
					}}
					info={editCode}
				/>
			</DialogRoot>
			<DialogRoot
				className="dialog-modal-success"
				setIsOpen={() => setModalSuccess(!modalSuccess)}
				title=""
				isOpen={modalSuccess}
				maxwidth={460}
			>
				<ModalSucces handleClose={() => setModalSuccess(false)} />
			</DialogRoot>
			<DialogRoot
				className="dialog-modal-delete"
				setIsOpen={() => setModalDelete(!modalDelete)}
				title=""
				isOpen={modalDeletelOpen}
				maxwidth={720}
				hasCloseButton={false}
			>
				<ModalDelete
					handleClose={() => setModalDeleteOpen(false)}
					deletePixelCode={() => deletePixelCode()}
				/>
			</DialogRoot>
		</>
	)
}
