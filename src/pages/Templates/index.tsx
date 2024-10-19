import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { PopOver } from '../../components/PopOver'
import { MainTemplate } from '../../templates/MainTemplate'

import { PopoverClose } from '@radix-ui/react-popover'
import { RowSelectionState } from '@tanstack/react-table'
import {
	Archive,
	BookCheck,
	ExternalLink,
	Loader2,
	Pen,
	PenLine,
	SquareKanbanDashed,
	Table
} from 'lucide-react'
import { PageTemplateResponse } from '../../@types/pages/templates'
import { PaginationType } from '../../@types/pagination'
import { DialogRoot } from '../../components/Dialog'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'
import { NoContentCard } from '../../components/NoContentCard'
import { Pagination } from '../../components/Pagination'
import { RadioGroup } from '../../components/RadioGroup'
import { StatusPin } from '../../components/StatusPin'
import { TableCheck } from '../../components/TableCheck'
import { TableCore } from '../../components/TableCore'
import {
	getPageTemplate,
	updatePageTemplate
} from '../../services/editor.service'
import { useEditorStore } from '../../services/store/editor-store'
import { CreateTemplateForm } from './CreateTemplateForm'
import * as S from './styles'
import { TemplateItem } from './TemplateItem'
import { UpdateTemplateForm } from './UpdaTemplateForm'
import { toast } from 'react-toastify'
import { successToast } from '../../components/Toast/types'
import { useNavigate } from 'react-router-dom'

interface CategoryProps {
	category: string
	createdAt: string
	deletedAt: string | null
	isDefault: boolean
	ownerId: string
	type: string
	updatedAt: string
	__v: number
	_id: string
}

type TEMPLATE_STATUS = 'draft' | 'published' | 'inactive'

export function Templates() {
	const navigate = useNavigate()
	const { setState } = useEditorStore((state) => state)

	const [pagination, setPagination] = useState<PaginationType>(
		{} as PaginationType
	)
	const [visualization, setVisualization] = useState('list')
	const [templates, setTemplates] = useState<PageTemplateResponse[]>([])
	const [toRefresh, setToRefresh] = useState(false)

	const [selectedLeadsInList, setSelectedLeadsInList] =
		useState<RowSelectionState>({})

	const [createOpen, setCreateOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [pending, setPending] = useState(false)

	function statusResolver(status: TEMPLATE_STATUS) {
		switch (status) {
			case 'draft':
				return <StatusPin type="inProgress" message="rascunho" />
			case 'published':
				return <StatusPin type="success" message="publicado" />
			case 'inactive':
				return <StatusPin type="advice" message="desativado" />
			default:
				return null
		}
	}

	async function fetchTemplates() {
		setPending(true)
		const result = await getPageTemplate().finally(() => setPending(false))

		setTemplates(result.data.pages)
		setPagination({
			totalPages: result.data.totalPages,
			currentPage: result.data.currentPage
		})
	}

	async function handleInactiveTemplate() {
		const template = templates.find(
			(item) => item._id === Object.keys(selectedLeadsInList)[0]
		)

		if (!template) return

		await updatePageTemplate(
			{
				category: template.category._id,
				js: template.js ?? 'js',
				name: template.name,
				css: template.css,
				html: template.html,
				props: template.props ?? {},
				status: 'inactive'
			},
			Object.keys(selectedLeadsInList)[0]
		).then(() => {
			setToRefresh(true)
			toast.success('Template inativado com sucesso', successToast)
		})

		return
	}

	function handleAccessTemplate(id: string) {
		const template = templates.find((item) => item._id === id)

		if (!template) return

		setState({
			pageId: undefined,
			funnelId: undefined,
			pageTemplateId: id,
			from: 'template'
		})

		navigate('/editor')
	}

	async function handlePublishTemplate() {
		const template = templates.find(
			(item) => item._id === Object.keys(selectedLeadsInList)[0]
		)

		if (!template) return

		await updatePageTemplate(
			{
				category: template.category._id,
				js: template.js ?? 'js',
				name: template.name,
				css: template.css,
				html: template.html,
				props: template.props ?? {},
				status: 'published'
			},
			Object.keys(selectedLeadsInList)[0]
		).then(() => {
			setToRefresh(true)
			toast.success('Template publicado com sucesso', successToast)
		})
	}

	useEffect(() => {
		fetchTemplates()

		return () => {
			setToRefresh(false)
		}
	}, [createOpen, editOpen, toRefresh])

	return (
		<MainTemplate>
			<S.Wrapper>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<h1>Templates</h1>
					<DialogRoot
						isOpen={createOpen}
						setIsOpen={() => setCreateOpen(!createOpen)}
						trigger={<Button>Adicionar Template</Button>}
						title="Criar template"
					>
						<CreateTemplateForm
							handleClose={() => setCreateOpen(!createOpen)}
						/>
					</DialogRoot>
				</div>
				<S.FiltersWrapper>
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
								{visualization === 'list' && <Table strokeWidth={1} />}
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
								align="end"
								side="bottom"
								content={
									<S.ActionsWrapper>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedLeadsInList).length > 1}
												onClick={() => handlePublishTemplate()}
											>
												<BookCheck strokeWidth={1} />
												Publicar template
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedLeadsInList).length > 1}
												onClick={() => setEditOpen(!editOpen)}
											>
												<PenLine strokeWidth={1} />
												Editar informações
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedLeadsInList).length > 1}
												onClick={() =>
													handleAccessTemplate(
														Object.keys(selectedLeadsInList)[0]
													)
												}
											>
												<ExternalLink strokeWidth={1} />
												Visualizar template
											</button>
										</PopoverClose>
										<PopoverClose asChild>
											<button
												className="customButton"
												disabled={Object.keys(selectedLeadsInList).length > 1}
												onClick={() => handleInactiveTemplate()}
											>
												<Archive strokeWidth={1} />
												Inativar
											</button>
										</PopoverClose>
									</S.ActionsWrapper>
								}
								trigger={
									<S.ButtonActions>
										<Pen strokeWidth={1} />
										Ações
									</S.ButtonActions>
								}
							/>
						</>
					)}
				</S.FiltersWrapper>
				{visualization === 'list' && (
					<TableCore
						rowSelection={selectedLeadsInList}
						getRowId={(row) => row._id}
						setRowSelection={setSelectedLeadsInList}
						visibleColumns={{
							_id: true,
							name: true,
							category: true,
							status: true
						}}
						data={templates}
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
								header: 'Nome',
								accessorKey: 'name',
								size: 500,
								cell: ({ row }) => <span>{row.getValue('name') ?? '-'}</span>
							},
							{
								header: 'Categoria',
								accessorKey: 'category',
								size: 50,
								cell: ({ row }) => (
									<span>
										{(row.getValue('category') as CategoryProps)?.category ??
											'-'}
									</span>
								)
							},
							{
								header: 'Status',
								size: 50,
								accessorKey: 'status',
								cell: ({ row }) => (
									<>
										{row.getValue('status')
											? statusResolver(row.getValue('status'))
											: '-'}
									</>
								)
							}
						]}
						handleClickOnCell={() => {}}
					/>
				)}
				{visualization === 'board' && (
					<S.BoardWrapper>
						{templates.map((template) => (
							<TemplateItem
								key={template._id}
								template={template}
								handleDelete={() => {
									setToRefresh(true)
								}}
							/>
						))}
					</S.BoardWrapper>
				)}
				{templates.length > 0 && !!pagination && (
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
				)}
				{templates.length === 0 && pending && (
					<EmptyWrapper>
						<Loader2 strokeWidth={1} />
						<span>Carregando templates</span>
					</EmptyWrapper>
				)}
				{templates.length === 0 && !pending && (
					<NoContentCard message="Nenhum template encontrado" />
				)}
			</S.Wrapper>
			<DialogRoot
				title="Editar informações"
				isOpen={editOpen}
				setIsOpen={() => setEditOpen(!editOpen)}
			>
				<UpdateTemplateForm
					handleClose={() => setEditOpen(!editOpen)}
					template={
						templates.find(
							(item) => item._id === Object.keys(selectedLeadsInList)[0]
						)!
					}
				/>
			</DialogRoot>
		</MainTemplate>
	)
}
