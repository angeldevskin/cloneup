import { memo, useEffect, useState } from 'react'
import {
	NodeProps,
	Position,
	ReactFlowState,
	getConnectedEdges,
	useNodeId,
	useStore
} from 'reactflow'

import { iconResolver } from '../../utils/iconResolver'

import { Check, Link, PencilLine, Plus, Trash } from 'lucide-react'
import { toast } from 'react-toastify'
import { getPageById } from '../../../../services/editor.service'
import { useFunnels } from '../../../../services/store/funnels'
import {
	deleteTrafficSource,
	getTrafficSourceById
} from '../../../../services/traffic.service'
import { DeleteConfirmation } from '../../../DeleteConfirmation'
import { DialogRoot } from '../../../Dialog'
import { FunnelDialog } from '../../../Funnels/FunnelDialog'
import { errorToast, successToast } from '../../../Toast/types'
import { Tooltip } from '../../../Tooltip'
import { EditSource, ITrafficSource } from '../../components/EditSource'
import { SourceForm } from '../../components/SourceForm'
import * as S from './styles'

function From({
	data,
	...rest
}: NodeProps<{
	type: 'paid' | 'organic' | 'trigger'
	trafficSourceId?: string
}>) {
	const [isOpenToEdit, setIsOpenToEdit] = useState(false)
	const [isOpenToDelete, setIsOpenToDelete] = useState(false)

	const [selectSource, setSelectSource] = useState(false)

	const addSourceNode = ({ trafficSourceId }: { trafficSourceId: string }) => {
		data.trafficSourceId = trafficSourceId

		setSelectSource(false)
	}

	const {
		currentFunnel,
		currentNodes,
		currentEdges,
		setCurrentNodes,
		setCurrentEdges
	} = useFunnels((state) => state)
	const [pagePath, setPagePath] = useState<string | null>(null)
	const [fullPath, setFullPath] = useState<string | null>(null)
	const [trafficSource, setTrafficSource] = useState<{
		source: string
		utmSource: string
		utmMedium: string
		utmCampaign: string
	}>()
	const [urlCopied, setUrlCopied] = useState(false)

	const selector = (state: ReactFlowState) => ({
		nodeInternals: state.nodeInternals,
		edges: state.edges
	})

	const { nodeInternals, edges } = useStore(selector)
	const nodeId = useNodeId()

	async function fetchTrafficSource() {
		const response = await getTrafficSourceById(data.trafficSourceId!)

		if (response) {
			setTrafficSource({
				source: response.trafficSource.name,
				utmSource: response.trafficSource.UTMSource,
				utmMedium: response.trafficSource.UTMMedium,
				utmCampaign: response.trafficSource.UTMCampaign
			})
		}
	}

	async function checkConnections() {
		const getSource = currentEdges.filter((edge) => edge.source === rest.id)

		if (getSource.length <= 0) {
			setPagePath('')

			return
		}

		const getPage = currentNodes.filter(
			(node) => node.id === getSource[0].target && node.data.pageId
		)

		if (getPage) {
			const pageSearched = getPage[0]
			const response = await getPageById({
				pageId: pageSearched.data.pageId,
				showHTMLCSSJS: false
			})

			if (!response) {
				toast.error('Erro ao buscar páginas', errorToast)

				return
			}

			if (response.path) {
				setPagePath(response.path)

				return
			}

			if (response.fullPath) {
				setFullPath(response.fullPath)

				return
			}
		}
	}

	function connectable() {
		const node = nodeInternals.get(nodeId!)
		const connectedEdges = getConnectedEdges([node!], edges)

		if (connectedEdges.length < 1) return true

		return false
	}

	async function removeSource() {
		const newNodes = currentNodes.filter((node) => {
			return node.id !== rest.id
		})

		if (newNodes.length === 0) {
			setCurrentEdges([])
		}

		setCurrentNodes(newNodes)

		if (data.trafficSourceId) {
			await deleteTrafficSource(data.trafficSourceId)
		}
	}

	useEffect(() => {
		if (data.trafficSourceId) {
			fetchTrafficSource()
		}
	}, [data.trafficSourceId])

	useEffect(() => {
		connectable()
		checkConnections()
	}, [currentEdges])

	function copyToClipboard(path: string) {
		setUrlCopied(true)
		navigator.clipboard.writeText(path)

		toast.success(
			'URL da página copiada para a área de transferência',
			successToast
		)

		setTimeout(() => {
			setUrlCopied(false)
		}, 1000)
	}

	function resolverCopyURL() {
		if (pagePath) {
			return copyToClipboard(
				`https://${
					currentFunnel.domain!.domainName
				}${pagePath}?utm_source=${trafficSource?.utmSource.replace(
					' ',
					'+'
				)}&utm_medium=${trafficSource?.utmMedium.replace(
					' ',
					'+'
				)}&utm_campaign=${trafficSource?.utmCampaign.replace(' ', '+')}`
			)
		}

		if (fullPath) {
			return copyToClipboard(
				`${fullPath}?utm_source=${trafficSource?.utmSource.replace(
					' ',
					'+'
				)}&utm_medium=${trafficSource?.utmMedium.replace(
					' ',
					'+'
				)}&utm_campaign=${trafficSource?.utmCampaign.replace(' ', '+')}`
			)
		}
	}

	return (
		<>
			{!data.trafficSourceId && (
				<S.Wrapper
					style={{
						background: '#D6D6D6',
						color: '#85959E'
					}}
				>
					<S.CustomHandle type="target" position={Position.Left} />
					<S.Actions style={{ marginTop: '-3rem' }}>
						<Tooltip
							content="Selecionar fonte de tráfego"
							trigger={
								<button
									data-state="regular"
									onClick={() => setSelectSource(true)}
								>
									Selecionar
								</button>
							}
						/>
						<Tooltip
							trigger={
								<button
									data-state="desctruction"
									onClick={() => setIsOpenToDelete(!isOpenToDelete)}
								>
									<Trash strokeWidth={1} />
								</button>
							}
							content="Excluir entrada de tráfego"
						/>
					</S.Actions>
					<Plus strokeWidth={1.5} size={40} />
					<S.Infos style={{ marginBottom: '-2rem' }}>
						<span>Fonte de tráfego</span>
					</S.Infos>
					<S.CustomHandle
						type="source"
						position={Position.Right}
						isConnectable={connectable()}
					/>
					<FunnelDialog
						title="Entrada de tráfego"
						isOpen={selectSource}
						setIsOpen={() => setSelectSource(!selectSource)}
					>
						<SourceForm
							selectedSource={data.type}
							addSourceNode={(trafficSourceId) =>
								addSourceNode({
									trafficSourceId
								})
							}
						/>
					</FunnelDialog>
				</S.Wrapper>
			)}
			{data.trafficSourceId && trafficSource && (
				<S.Wrapper data-state={trafficSource?.source ?? ''}>
					<S.CustomHandle type="target" position={Position.Left} />
					<S.Actions>
						{(!!pagePath || !!fullPath) && (
							<Tooltip
								trigger={
									<button
										style={{
											pointerEvents: 'all'
										}}
										data-state={urlCopied ? 'copied' : ''}
										onClick={() => resolverCopyURL()}
									>
										{!urlCopied ? (
											<Link strokeWidth={1} />
										) : (
											<Check strokeWidth={1} />
										)}
									</button>
								}
								content="Acessar página com UTMs"
							/>
						)}
						<Tooltip
							trigger={
								<button onClick={() => setIsOpenToEdit(!isOpenToEdit)}>
									<PencilLine strokeWidth={1} />
								</button>
							}
							content="Editar"
						/>
						<Tooltip
							trigger={
								<button
									data-state="desctruction"
									onClick={() => setIsOpenToDelete(!isOpenToDelete)}
								>
									<Trash strokeWidth={1} />
								</button>
							}
							content="Excluir entrada de tráfego"
						/>
					</S.Actions>
					<img
						src={iconResolver(trafficSource.source.toLowerCase()) || ''}
						alt={trafficSource!.source}
					/>
					<S.Infos>
						<strong>{trafficSource!.source.replace('-', ' ')}</strong>

						<S.Ticket data-state={trafficSource!.source}>
							<span>
								{(trafficSource.source === 'google-ads' ||
									trafficSource.source === 'meta-ads' ||
									trafficSource.source === 'tiktok-ads' ||
									trafficSource.source === 'manual-ads') &&
									'Pago'}

								{(trafficSource.source === 'mailchimp' ||
									trafficSource.source === 'activeCampaign' ||
									trafficSource.source === 'whatsapp' ||
									trafficSource.source === 'telegram') &&
									'Disparo'}

								{(trafficSource.source === 'instagram' ||
									trafficSource.source === 'facebook' ||
									trafficSource.source === 'tiktok' ||
									trafficSource.source === 'youtube' ||
									trafficSource.source === 'x') &&
									'Orgânico'}
							</span>
						</S.Ticket>
					</S.Infos>
					<S.CustomHandle
						type="source"
						position={Position.Right}
						isConnectable={connectable()}
					/>
					<FunnelDialog
						title="Editar entrada de tráfego"
						setIsOpen={() => setIsOpenToEdit(!isOpenToEdit)}
						isOpen={isOpenToEdit}
					>
						<EditSource
							sourceId={data.trafficSourceId}
							handleResponse={(
								data: {
									name: string
									budgetType: string
								} & ITrafficSource
							) => {
								setTrafficSource({
									source: data.name,
									utmSource: data.utmSource,
									utmMedium: data.utmMedium,
									utmCampaign: data.utmCampaign
								})
								setIsOpenToEdit(!isOpenToEdit)
							}}
						/>
					</FunnelDialog>
					<DialogRoot
						title="Excluir entrada de tráfego"
						setIsOpen={() => setIsOpenToDelete(!isOpenToDelete)}
						isOpen={isOpenToDelete}
					>
						<DeleteConfirmation
							destructionFunction={() => removeSource()}
							message="Deseja realmente excluir essa entrada de tráfego?"
						/>
					</DialogRoot>
				</S.Wrapper>
			)}
		</>
	)
}

export default memo(From)
