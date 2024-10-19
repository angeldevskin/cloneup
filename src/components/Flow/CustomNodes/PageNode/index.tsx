import {
	ImageOff,
	Link,
	Loader2,
	Paintbrush2,
	PencilLine,
	Search,
	Trash
} from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { NodeProps, Position } from 'reactflow'
import { v4 as uuidv4 } from 'uuid'

import * as S from './styles'

import { ListPageTemplate, Page } from '../../../../models/page.model'
import {
	createPage,
	deletePage,
	getPageById,
	getPageTemplate,
	updatePage
} from '../../../../services/editor.service'
import { DialogRoot } from '../../../Dialog'
import { TextField } from '../../../TextField'
import { Tooltip } from '../../../Tooltip'
import { NewModelCard } from './NewModelCard'
import { genericBackgroundResolver, resolvePlaceholderNames } from './utils'

import { PageInfo } from '../../../../pages/PageList/components/PageInfo'
import { getCategories } from '../../../../services/categories.service'
import { useEditorStore } from '../../../../services/store/editor-store'
import { useFunnels } from '../../../../services/store/funnels'
import { DeleteConfirmation } from '../../../DeleteConfirmation'
import { EmptyWrapper } from '../../../EmptyWrapper/styles'
import { HoverCard } from '../../../HoverCard'
import { errorToast } from '../../../Toast/types'
import { useNavigate } from 'react-router-dom'

type PageNodeProps = {
	type?: string
	pageId?: string
}

function PageNode({ data, ...rest }: NodeProps<PageNodeProps>) {
	const { setState } = useEditorStore((state) => state)
	const [newModelDialog, setNewModelDialog] = useState(false)
	const [removeNodeDialog, setRemoveNodeDialog] = useState(false)
	const [pagePreviewDialog, setPagePreviewDialog] = useState(false)
	const [configPageDialog, setConfigPageDialog] = useState(false)
	const [pageTemplates, setPageTemplates] = useState<ListPageTemplate>([])
	const [currentCat, setCurrentCat] = useState('')
	const [currentPage, setCurrentPage] = useState<Partial<Page>>()
	const [currentPageName, setCurrentPageName] = useState('')

	const [isLoading, setIsLoading] = useState(false)
	const [applyingModel, setApplyingModel] = useState(false)

	const { register } = useForm()
	const {
		currentFunnel,
		currentNodes,
		currentEdges,
		setCurrentNodes,
		setCurrentEdges,
		savingFunnel
	} = useFunnels((state) => state)
	const navigate = useNavigate()

	async function fetchCurrentPage() {
		const response = await getPageById({
			pageId: data.pageId!,
			showHTMLCSSJS: false
		})

		setCurrentPage(response)
		setCurrentPageName(response.name ?? '-')
	}

	async function fetchPageTemplates() {
		await getPageTemplate('published')
			.then((response) => {
				setPageTemplates(response.data.pages)
				setIsLoading(false)
			})
			.catch(() => {
				toast.error(
					'Erro ao buscar modelos de página, tente novamente mais tarde.',
					errorToast
				)
			})
	}

	async function fetchCategoryPage() {
		const category = await getCategories({ type: 'page' })

		setCurrentCat(category.data.categories[0]._id)
	}

	async function applyModel(selectedModel: {
		id: string
		css: string
		html: string
		props: object
		js: string
	}) {
		setApplyingModel(true)

		await createPage({
			funnelId: currentFunnel._id!,
			name: 'Nova Página',
			category: currentCat,
			pageTemplateId: selectedModel.id,
			css: selectedModel.css,
			path: '/nova-pagina' + uuidv4(),
			html: selectedModel.html,
			js: selectedModel.js || 'js',
			description: 'Nova página',
			props: selectedModel.props || {},
			enable: true
		})
			.then((response) => {
				data.pageId = response.data.page._id

				setCurrentPage(response.data.page)

				const updateFunnel = currentFunnel.props.nodes.find(
					(node) => node.id === rest.id
				)

				if (updateFunnel) {
					updateFunnel.data.pageId = response.data.page._id
				}

				setNewModelDialog(!newModelDialog)
				setApplyingModel(false)
				toast.success('Modelo aplicado com sucesso')
			})
			.catch(() => {
				toast.error('Erro ao aplicar modelo de página', errorToast)
				setApplyingModel(false)
				setNewModelDialog(false)
			})
	}

	useEffect(() => {
		fetchCategoryPage()
		if (data.pageId) {
			fetchCurrentPage()
		}
	}, [data, newModelDialog, configPageDialog])

	async function removeNode() {
		const newNodes = currentNodes.filter((node) => {
			return node.id !== rest.id
		})

		const newEdges = currentEdges.filter(
			(edge) => (edge.target || edge.source) !== rest.id
		)

		if (newNodes.length === 0) {
			setCurrentEdges([])
		}

		setCurrentNodes(newNodes)
		setCurrentEdges(newEdges)

		if (data.pageId) {
			await deletePage(data.pageId!).catch(() => {
				toast.error(
					'Erro ao excluir página, tente novamente mais tarde.',
					errorToast
				)
			})
		}
	}

	function handleGetPageURL() {
		return navigator.clipboard
			.writeText(
				`https://${currentFunnel.domain?.domainName}${currentPage?.path}`
			)
			.then(() => {
				toast.success('URL copiada para área de transferência.')
			})
	}

	async function handleUpdatePageName() {
		if (currentPage?._id) {
			const response = await updatePage(
				{
					name: currentPageName
				},
				currentPage._id
			)

			if (response.status === 200) {
				setCurrentPage(response.data.page)

				setCurrentPageName(response.data.page.name)
			} else {
				toast.error(
					'Erro ao atualizar nome da página, tente novamente mais tarde.'
				)
			}
		}
	}

	async function handleAccessPage() {
		setState({
			pageId: currentPage?._id,
			funnelId: currentPage?.funnelId,
			from: 'funnel'
		})

		navigate(`/editor`)
	}

	return (
		<S.Wrapper>
			<S.CustomHandle type="target" position={Position.Left} />
			<HoverCard
				hasArrow={false}
				side="top"
				trigger={
					<S.Container $hasimage={!!currentPage?._id}>
						<S.Body>
							{data && !data.pageId ? (
								<img src={genericBackgroundResolver(rest.type)} alt="" />
							) : (
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										width: '100%'
									}}
								>
									{currentPage?.preview ? (
										<img
											src={currentPage.preview}
											alt=""
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover'
											}}
										/>
									) : (
										<div className="unavailablePreview">
											{!currentPage?.deployed && (
												<>
													<ImageOff strokeWidth={1} />
													<span>
														Página não publicada, preview indisponível
													</span>
												</>
											)}
										</div>
									)}
								</div>
							)}
						</S.Body>
						{!data.pageId && (
							<S.PlaceholderName>
								<span
									style={{
										width: '100%',
										textAlign: 'center',
										fontSize: '1rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									{resolvePlaceholderNames(data.type!) ?? ''}
								</span>
							</S.PlaceholderName>
						)}
						{data.pageId &&
							currentPage &&
							currentPage?.path !== '/nova-pagina' &&
							currentPage?.path !== '/blank-page' && (
								<S.ActionsFooter>
									<input
										maxLength={25}
										onBlur={handleUpdatePageName}
										defaultValue={currentPageName}
										onChange={(event) => {
											setCurrentPageName(event.target.value)
										}}
									/>

									<HoverCard
										side="bottom"
										trigger={
											<S.MetricsWrapper>
												<strong>
													{currentPage.visits?.totalVisits ?? '-'}
												</strong>
												<strong>
													{currentPage.visits?.uniqueVisits ?? '-'}
												</strong>
											</S.MetricsWrapper>
										}
										content={
											<S.MetricsInfo>
												<span>Visitas totais</span>
												<span>Visitas únicas</span>
											</S.MetricsInfo>
										}
									/>
								</S.ActionsFooter>
							)}
					</S.Container>
				}
				content={
					<S.Actions $disablePointer={savingFunnel}>
						{data && !data.pageId && !currentPage ? (
							<S.Actions $disablePointer={savingFunnel}>
								<Tooltip
									disable={savingFunnel}
									trigger={
										<button
											className="nodeAction"
											data-state="model"
											disabled={savingFunnel}
											onClick={() => {
												setNewModelDialog(!newModelDialog)
												fetchPageTemplates()
												setIsLoading(true)
											}}
										>
											<Paintbrush2 strokeWidth={1} />
										</button>
									}
									content="Atribuir modelo"
								/>
								<Tooltip
									disable={savingFunnel}
									trigger={
										<button
											disabled={savingFunnel}
											className="nodeAction"
											data-state="desctruction"
											onClick={() => removeNode()}
										>
											<Trash strokeWidth={1} />
										</button>
									}
									content="Remover página"
								/>
							</S.Actions>
						) : (
							<S.Actions $disablePointer={savingFunnel}>
								<Tooltip
									disable={savingFunnel}
									trigger={
										<button
											disabled={savingFunnel}
											className="nodeAction"
											onClick={() => handleGetPageURL()}
										>
											<Link strokeWidth={1} />
										</button>
									}
									content="Copiar URL da página"
								/>
								<Tooltip
									disable={savingFunnel}
									trigger={
										<button
											disabled={savingFunnel}
											className="nodeAction"
											onClick={() => handleAccessPage()}
										>
											<PencilLine strokeWidth={1} />
										</button>
									}
									content="Editar página"
								/>
								<Tooltip
									disable={savingFunnel}
									trigger={
										<button
											disabled={savingFunnel}
											className="nodeAction"
											data-state="desctruction"
											onClick={() => setRemoveNodeDialog(!removeNodeDialog)}
										>
											<Trash strokeWidth={1} />
										</button>
									}
									content="Remover página"
								/>
							</S.Actions>
						)}
					</S.Actions>
				}
			/>

			<S.CustomHandle type="source" position={Position.Right} />
			<DialogRoot
				isOpen={pagePreviewDialog}
				setIsOpen={() => setPagePreviewDialog(!pagePreviewDialog)}
				title="Preview de página"
				maxwidth={1380}
			>
				{currentFunnel.domain && currentPage?.path && (
					<iframe
						src={`https://${currentFunnel.domain.domainName}${currentPage?.path}?preview=true`}
						style={{ width: '100%', height: '90dvh', display: 'flex' }}
					/>
				)}
			</DialogRoot>
			<DialogRoot
				isOpen={newModelDialog}
				setIsOpen={() => setNewModelDialog(!newModelDialog)}
				title="Atribuir modelo"
				maxwidth={1380}
			>
				<>
					{!applyingModel && !isLoading && pageTemplates.length > 0 && (
						<S.TemplateModelsWrapper>
							<TextField
								placeholder="Pesquisar"
								name="search"
								type="text"
								register={register}
								icon={<Search />}
								$fullwidth
							/>
						</S.TemplateModelsWrapper>
					)}

					<S.TemplateModelsContainer>
						{!applyingModel && !isLoading && pageTemplates.length <= 0 && (
							<span>Nenhum template encontrado</span>
						)}
						{!applyingModel && isLoading && (
							<EmptyWrapper>
								<Loader2 strokeWidth={1} />
								<span>Carregando templates de páginas</span>
							</EmptyWrapper>
						)}
						{pageTemplates &&
							!applyingModel &&
							!isLoading &&
							pageTemplates.map((template, index) => (
								<NewModelCard
									key={index}
									preview={template.preview}
									name={template.name}
									apply={() =>
										applyModel({
											id: template._id,
											css: template.css,
											html: template.html,
											props: template.props,
											js: template.js
										})
									}
								/>
							))}
						{applyingModel && (
							<EmptyWrapper>
								<Loader2 strokeWidth={1} />
								<span>Aplicando modelo de página</span>
							</EmptyWrapper>
						)}
					</S.TemplateModelsContainer>
				</>
			</DialogRoot>
			<DialogRoot
				isOpen={removeNodeDialog}
				setIsOpen={() => setRemoveNodeDialog(!removeNodeDialog)}
				title="Excluir página"
			>
				<DeleteConfirmation
					destructionFunction={removeNode}
					message="Deseja realmente excluir essa página?"
				/>
			</DialogRoot>
			{currentPage && currentFunnel.domainName && (
				<DialogRoot
					setIsOpen={() => setConfigPageDialog(!configPageDialog)}
					title="Editar informações da página"
					isOpen={configPageDialog}
				>
					<PageInfo
						domainName={currentFunnel.domain?.domainName ?? ''}
						page={currentPage!}
						pageId={currentPage!._id!}
						closeDialog={() => setConfigPageDialog(!configPageDialog)}
						showName={false}
					/>
				</DialogRoot>
			)}
		</S.Wrapper>
	)
}

export default memo(PageNode)
