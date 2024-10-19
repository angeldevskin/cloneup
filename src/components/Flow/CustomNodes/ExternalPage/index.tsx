import {
	ExternalLink,
	Globe,
	ImageOff,
	Link,
	PencilLine,
	Trash,
	Unplug
} from 'lucide-react'
import { HoverCard } from '../../../HoverCard'
import { Tooltip } from '../../../Tooltip'
import * as S from './styles'

import { NodeProps, Position } from 'reactflow'
import { DialogRoot } from '../../../Dialog'
import { DeleteConfirmation } from '../../../DeleteConfirmation'
import { useFunnels } from '../../../../services/store/funnels'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Page } from '../../../../models/page.model'

import {
	deletePage,
	getPageById,
	updatePage
} from '../../../../services/editor.service'
import { genericBackgroundResolver } from '../PageNode/utils'
import { FunnelDialog } from '../../../Funnels/FunnelDialog'
import { UpdateExternalPageForm } from './components/UdpateExternalPageForm'
import { errorToast, successToast } from '../../../Toast/types'

interface ExternalPageNodeProps {
	pageId: string
}

export function ExternalPage({
	data,
	...rest
}: NodeProps<ExternalPageNodeProps>) {
	const {
		savingFunnel,
		currentNodes,
		currentEdges,
		setCurrentEdges,
		setCurrentNodes
	} = useFunnels((state) => state)

	const [removeNodeDialog, setRemoveNodeDialog] = useState(false)
	const [currentPage, setCurrentPage] = useState<Partial<Page>>()
	const [currentPageName, setCurrentPageName] = useState('')
	const [updatePageDialog, setUpdatePageDialog] = useState(false)

	async function fetchCurrentPage() {
		const response = await getPageById({
			pageId: data.pageId!,
			showHTMLCSSJS: false
		})

		setCurrentPage({
			name: response.name,
			fullPath: response.fullPath,
			visits: response.visits,
			preview: response.preview,
			_id: response._id,
			isScriptRunning: response.isScriptRunning
		})
		setCurrentPageName(response.name ?? '-')
	}

	function handleGetPageURL() {
		console.log(currentPage)
		if (!currentPage?.fullPath) {
			return
		}

		return navigator.clipboard.writeText(currentPage?.fullPath).then(() => {
			toast.success('URL copiada para área de transferência.')
		})
	}

	function handleAccessPageURL() {
		if (!currentPage?.fullPath) {
			return
		}

		return window.open(currentPage?.fullPath, '_blank')
	}

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
			await deletePage(data.pageId!)
				.then(() => {
					toast.success('Página excluída com sucesso!', successToast)
				})
				.catch(() => {
					toast.error(
						'Erro ao excluir página, tente novamente mais tarde.',
						errorToast
					)
				})
		}
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

	useEffect(() => {
		fetchCurrentPage()
	}, [])

	useEffect(() => {
		fetchCurrentPage()
	}, [currentPage?.name])

	return (
		<S.Wrapper>
			<S.CustomHandle type="target" position={Position.Left} />
			<HoverCard
				hasArrow={false}
				side="top"
				trigger={
					<S.Container $hasimage={!!currentPage?.name}>
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
						{currentPage?.isScriptRunning && (
							<Tooltip
								trigger={
									<div
										style={{
											background: '#62C75E',
											color: '#ffffff',
											position: 'absolute',
											right: 0,
											top: 0,
											padding: '0.2rem',
											display: 'flex',
											zIndex: 9999,
											marginRight: '-5px',
											marginTop: '-5px',
											alignItems: 'center',
											borderRadius: '8px'
										}}
									>
										<Globe size={14} />
									</div>
								}
								content="Pixel de monitoramento encontrado na página."
							/>
						)}
						{!currentPage?.isScriptRunning && (
							<Tooltip
								content="O pixel de monitoramento não foi encontrado na página."
								trigger={
									<div
										style={{
											background: '#FA8E14',
											color: '#ffffff',
											position: 'absolute',
											right: 0,
											top: 0,
											padding: '0.2rem',
											display: 'flex',
											zIndex: 9999,
											marginRight: '-5px',
											marginTop: '-5px',
											alignItems: 'center',
											borderRadius: '8px'
										}}
									>
										<Unplug size={14} />
									</div>
								}
							/>
						)}
						{data.pageId &&
							currentPage &&
							currentPage?.path !== '/nova-pagina' &&
							currentPage?.path !== '/blank-page' && (
								<S.ActionsFooter>
									<input
										maxLength={25}
										onBlur={handleUpdatePageName}
										defaultValue={currentPageName ?? ''}
										value={currentPageName ?? ''}
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
						<S.Actions $disablePointer={savingFunnel}>
							{currentPage?.fullPath && (
								<>
									<Tooltip
										disable={savingFunnel}
										trigger={
											<button
												disabled={savingFunnel}
												className="nodeAction"
												onClick={() => handleAccessPageURL()}
											>
												<ExternalLink strokeWidth={1} />
											</button>
										}
										content="Acessar página"
									/>
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
								</>
							)}
							<Tooltip
								disable={savingFunnel}
								trigger={
									<button
										disabled={savingFunnel}
										className="nodeAction"
										onClick={() => setUpdatePageDialog(!updatePageDialog)}
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
					</S.Actions>
				}
			/>

			<S.CustomHandle type="source" position={Position.Right} />
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
			<FunnelDialog
				isOpen={updatePageDialog}
				setIsOpen={() => setUpdatePageDialog(!updatePageDialog)}
				title="Editar página"
			>
				<UpdateExternalPageForm
					handleResponse={(response) => {
						setUpdatePageDialog(false)
						setCurrentPage({
							name: response.name,
							fullPath: response.fullPath,
							visits: response.visits,
							preview: response.preview
						})
						setCurrentPageName(response.name ?? '-')
					}}
					pageId={data.pageId}
				/>
			</FunnelDialog>
		</S.Wrapper>
	)
}
