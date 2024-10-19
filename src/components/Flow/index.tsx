import 'reactflow/dist/style.css'

import { DragEvent, useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import ReactFlow, {
	Background,
	BackgroundVariant,
	Connection,
	MarkerType,
	Node,
	ReactFlowInstance,
	XYPosition,
	addEdge,
	useEdgesState,
	useNodesState
} from 'reactflow'
import { v4 as uuidv4 } from 'uuid'

import { ComponentsType } from './ComponentsTypes'
import { CheckoutForm } from './components/CheckoutForm'
import { SourceForm } from './components/SourceForm'

import * as S from './styles'

import pageBlank from '../../assets/images/blank-page.svg'
import globe from '../../assets/images/globe.svg'
import captureTemplate from '../../assets/images/capture-template.svg'
import checkoutTemplate from '../../assets/images/checkout-template.svg'
import crossellTemplate from '../../assets/images/crossellTemplate.svg'
import downsellTemplate from '../../assets/images/donwsell-template.svg'
import downloadTemplate from '../../assets/images/download-template.svg'
import leadsTemplate from '../../assets/images/leadsTemplate.svg'
import organic from '../../assets/images/organic.svg'
import salesTemplate from '../../assets/images/sales-template.svg'
import source from '../../assets/images/source.svg'
import sourcePaid from '../../assets/images/sourcePaid.svg'
import sourceTrigger from '../../assets/images/sourceTrigger.svg'
import thanksTemplate from '../../assets/images/thanks-template.svg'
import upsellTemplate from '../../assets/images/upsellTemplate.svg'
import vslTemplate from '../../assets/images/vslTemplate.svg'
import webnarTemplate from '../../assets/images/webnarTemplate.svg'
import mailtemplate from '../../assets/images/mailtemplate.svg'

import { getCategories } from '../../services/categories.service'
import { createPage } from '../../services/editor.service'
import { useFunnels } from '../../services/store/funnels'
import { FunnelDialog } from '../Funnels/FunnelDialog'
import { HoverCard } from '../HoverCard'
import { EmailForm } from './components/EmailForm'
import { edgeTypes, nodeTypes } from './utils/types'
import { ExternalPageForm } from './CustomNodes/ExternalPage/components/ExternalPageForm'
import { axiosRoot } from '../../http/axios'
import { errorToast, successToast } from '../Toast/types'
import { useUtils } from '../../services/store/utils-store'
import { Check, Copy, Hand, MousePointer2 } from 'lucide-react'
import { Button } from '../Button'
import {
	dinamicHtml,
	dinamicJS
} from './CustomNodes/ExternalPage/components/ExternalPageForm/utils'
import { DialogRoot } from '../Dialog'
import { Tooltip } from '../Tooltip'

interface ExternalPageProps {
	page: {
		name: string
		fullPath: string
	}
	form?: {
		buttonColor: string
		buttonText: string
		buttonRedirect: string
		buttonBorderRadius: string
		html?: string
		js?: string
	}
}

export function Flow({
	readOnly = false,
	setReadOnly
}: {
	readOnly?: boolean
	setReadOnly: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const {
		currentFunnel,
		currentNodes,
		currentEdges,
		setCurrentNodes,
		setCurrentEdges,
		setSavingFunnel,
		setReadOnly: setReadOnlyStore
	} = useFunnels((state) => state)

	const [chooseExternalPage, setChooseExternalPage] = useState(false)
	const [chooseSource, setChooseSource] = useState(false)
	const [selectedSource, setSelectedSource] = useState<
		'paid' | 'organic' | 'trigger'
	>()
	const [openCheckout, setOpenCheckout] = useState(false)
	const [openEmail, setOpenEmail] = useState(false)
	const [openToCopy, setOpenToCopy] = useState(false)
	const [formValues, setFormValues] = useState<{
		html: string
		js: string
		buttonColor?: string
		buttonText?: string
		buttonRedirect?: string
		buttonBorderRadius?: string
	}>()
	const [currentPageToHandle, setCurrentPageToHandle] = useState<string>('')
	const [htmlCopied, setHtmlCopied] = useState(false)
	const [jsCopied, setJsCopied] = useState(false)

	const [nodes, setNodes, onNodesChange] = useNodesState(currentNodes || [])
	const [edges, setEdges, onEdgesChange] = useEdgesState(currentEdges || [])

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentNodes(nodes)
			setCurrentEdges(edges)
		}, 1000)

		return () => clearInterval(interval)
	}, [nodes, edges])

	useEffect(() => {
		setNodes(currentNodes)
		setEdges(currentEdges)
	}, [currentNodes, currentEdges])

	const onConnect = useCallback(
		(connection: Connection) =>
			setEdges((eds) =>
				addEdge(
					{
						id: `rf-edge-${uuidv4()}`,
						source: connection.source ?? '',
						target: connection.target ?? '',
						type: 'deletableEdge',
						animated: true,
						markerEnd: {
							type: MarkerType.ArrowClosed,
							width: 20,
							height: 20
						}
					},
					eds
				)
			),
		[]
	)

	const reactFlowWrapper = useRef(null)
	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance>()

	const { setLoading } = useUtils((state) => state)

	const addExternalPage = async ({ page, form }: ExternalPageProps) => {
		setLoading(true)

		await createPage({
			funnelId: currentFunnel._id!,
			name: page.name,
			fullPath: page.fullPath,
			html: 'html',
			css: 'css',
			js: 'js',
			external: true,
			description: 'Página externa',
			enable: true
		})
			.then(async (response) => {
				setCurrentPageToHandle(response.data.page._id)
				if (form) {
					await axiosRoot()
						.post('/external-form', {
							buttonText: form.buttonText,
							buttonColor: form.buttonColor,
							redirectUrl: form.buttonRedirect,
							borderRadius: form.buttonBorderRadius.toString(),
							pageId: response.data.page._id
						})
						.then(() => {
							setFormValues({
								html: form.html ?? '',
								js: form.js ?? '',
								buttonBorderRadius: form.buttonBorderRadius,
								buttonRedirect: form.buttonRedirect,
								buttonColor: form.buttonColor,
								buttonText: form.buttonText
							})

							setOpenToCopy(true)
						})
						.catch(() => {
							toast.error('Erro ao criar formulário', errorToast)
							setLoading(false)
						})
				}

				const newNode: Node = {
					id: uuidv4(),
					type: 'externalPage',
					position: {
						x: 0,
						y: 0
					},
					data: {
						type: 'externalPage',
						pageId: response.data.page._id
					}
				}

				setSavingFunnel(true)
				setNodes((state) => [...state, newNode])

				toast.success('Página externa criada com sucesso')
				setChooseExternalPage(false)
				setLoading(false)
			})
			.catch((data) => {
				console.log(data)
				if (data.response.data.error.includes('Full path already exists')) {
					toast.error('URL enviada já existe no funil', errorToast)
					setLoading(false)
					return
				}

				setLoading(false)
				return data
			})
	}

	const addSourceNode = ({ trafficSourceId }: { trafficSourceId: string }) => {
		setNodes((state) => [
			...state,
			{
				id: uuidv4(),
				type: 'source',
				position: {
					x: 0,
					y: 0
				},
				data: {
					trafficSourceId
				}
			}
		])

		setChooseSource(false)
	}

	const addEmailNode = ({
		pos,
		fields
	}: {
		fields: {
			platform: string
			listName: string
			listId: string
			tags: Array<{ id: string; value: string }>
		}
		pos: XYPosition
	}) => {
		console.log('tags', fields.tags)
		const newNode: Node = {
			id: uuidv4(),
			type: 'email',
			position: pos,
			data: {
				platform: fields.platform,
				tags: fields.tags,
				list: {
					listName: fields.listName,
					listId: fields.listId
				}
			}
		}
		setNodes((state) => [...state, newNode])
		setOpenEmail(false)
	}

	const addBlankPage = async ({ pos }: { pos: XYPosition }) => {
		const category = await (
			await getCategories({ type: 'page' })
		).data.categories[0]._id

		const { data, status } = await createPage({
			funnelId: currentFunnel._id!,
			name: 'Página em branco',
			category: category,
			pageTemplateId: '65eb3e43465bea853ba34a0d',
			path: '/blank-page' + uuidv4(),
			css: 'css',
			html: 'html',
			description: 'Página em branco',
			enable: true,
			js: 'js'
		})

		if (status === 201) {
			const newNode: Node = {
				id: uuidv4(),
				type: 'blankPage',
				position: pos,
				data: {
					type: 'blankPage',
					pageId: data.page._id
				}
			}

			setSavingFunnel(true)
			setNodes((state) => [...state, newNode])

			toast.success('Página criada com sucesso')
		}
	}

	const addCheckoutNode = ({
		productId,
		pos
	}: {
		productId: string
		pos: XYPosition
	}) => {
		const newNode: Node = {
			id: uuidv4(),
			type: 'checkout',
			position: pos,
			data: {
				productId,
				type: 'checkout'
			}
		}
		setNodes((state) => [...state, newNode])
		setOpenCheckout(false)
	}

	const onDragOver = useCallback(
		(event: {
			preventDefault: () => void
			dataTransfer: { dropEffect: string }
		}) => {
			event.preventDefault()
			event.dataTransfer.dropEffect = 'move'
		},
		[]
	)

	const onDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()

			const type = event.dataTransfer.getData('application/reactflow')

			if (typeof type === 'undefined' || !type) {
				return
			}

			const pos = reactFlowInstance!.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY
			})

			switch (type) {
				case 'blankPage':
					return addBlankPage({ pos })
				case 'capture':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'capture'
							}
						}
					])

					return
				case 'download':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'download'
							}
						}
					])
					return
				case 'sales':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'sales'
							}
						}
					])
					return
				case 'upsell':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'upsell'
							}
						}
					])
					return
				case 'downsell':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'downsell'
							}
						}
					])
					return
				case 'crossell':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'crossell'
							}
						}
					])
					return
				case 'vsl':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'vsl'
							}
						}
					])
					return
				case 'webnar':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'webnar'
							}
						}
					])
					return
				case 'leads':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'leads'
							}
						}
					])
					return
				case 'acknowledgment':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'acknowledgment'
							}
						}
					])
					return
				case 'checkout':
					setOpenCheckout(true)
					return
				case 'whatsappGroup':
					setNodes((state) => [
						...state,
						{
							id: uuidv4(),
							type,
							position: pos,
							data: {
								type: 'whatsappGroup'
							}
						}
					])
					return
				case 'email':
					setOpenEmail(true)
					return
				case 'externalPage':
					setChooseExternalPage(true)
					return
				case 'sourcePaid':
					setSelectedSource('paid')
					setChooseSource(true)
					return
				case 'sourceOrganic':
					setSelectedSource('organic')
					setChooseSource(true)
					return
				case 'sourceTrigger':
					setSelectedSource('trigger')
					setChooseSource(true)
					return
				default:
					break
			}
		},
		[reactFlowInstance]
	)

	const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
		event.dataTransfer.setData('application/reactflow', nodeType)
		event.dataTransfer.effectAllowed = 'move'
	}

	function CardLabel() {
		return (
			<span
				style={{
					background: '#915EC7',
					borderRadius: '8px',
					padding: '0.25rem 0.5rem',
					color: '#ffffff',
					position: 'absolute',
					top: 0,
					right: 0,
					zIndex: 9999
				}}
			>
				EM BREVE
			</span>
		)
	}

	return (
		<>
			{currentFunnel.props && (
				<>
					<S.Wrapper ref={reactFlowWrapper}>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							defaultViewport={{ x: 0, y: 0, zoom: 1.1 }}
							onConnect={onConnect}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							fitView
							onLoad={() => reactFlowInstance?.fitView({ duration: 800 })}
							maxZoom={1.5}
							minZoom={0.2}
							nodeTypes={nodeTypes}
							edgeTypes={edgeTypes}
							onDrop={onDrop}
							onDragOver={onDragOver}
							onInit={setReactFlowInstance}
							elementsSelectable={!readOnly}
							nodesConnectable={!readOnly}
							nodesDraggable={!readOnly}
							panOnScroll={!readOnly}
							zoomOnDoubleClick={!readOnly}
						>
							<S.CustomControls
								position="bottom-left"
								showInteractive={false}
								fitViewOptions={{ duration: 800 }}
							/>
							<Background variant={BackgroundVariant.Dots} />
						</ReactFlow>
					</S.Wrapper>
					<S.InternControls>
						<Tooltip
							side="right"
							trigger={
								<button
									onClick={() => {
										setReadOnly(false)
										setReadOnlyStore(false)
									}}
								>
									<MousePointer2
										strokeWidth={1}
										fill={!readOnly ? '#444F55' : 'white'}
									/>
								</button>
							}
							content="Modo de edição"
						/>
						<Tooltip
							side="right"
							trigger={
								<button
									onClick={() => {
										setReadOnly(true)
										setReadOnlyStore(true)
									}}
								>
									<Hand strokeWidth={1} fill={readOnly ? '#444F55' : 'white'} />
								</button>
							}
							content="Modo de visualização"
						/>
					</S.InternControls>
					{!readOnly && currentFunnel.status !== 'published' && (
						<S.ComponentsCollection>
							<HoverCard
								side="top"
								align="start"
								trigger={
									<S.ContentComponent style={{ cursor: 'pointer' }}>
										<ComponentsType>
											<img
												src={source}
												alt="entrada de tráfego"
												style={{
													width: '100%',
													height: '100%',
													objectFit: 'cover'
												}}
											/>
										</ComponentsType>
										<strong>Entrada de tráfego</strong>
										<div className="badge">3</div>
									</S.ContentComponent>
								}
								content={
									<S.SubComponentsWrapper>
										<S.ContentComponent style={{ cursor: 'pointer' }}>
											<ComponentsType
												onDragStart={(event) =>
													onDragStart(event, 'sourceOrganic')
												}
												draggable
												onClick={() => {
													setSelectedSource('organic')
													setChooseSource(true)
												}}
											>
												<img
													src={organic}
													alt="organic"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Orgânico</strong>
										</S.ContentComponent>
										<S.ContentComponent style={{ cursor: 'pointer' }}>
											<ComponentsType
												onDragStart={(event) =>
													onDragStart(event, 'sourcePaid')
												}
												draggable
												onClick={() => {
													setSelectedSource('paid')
													setChooseSource(true)
												}}
											>
												<img
													src={sourcePaid}
													alt="source paid"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Pago</strong>
										</S.ContentComponent>
										<S.ContentComponent style={{ cursor: 'pointer' }}>
											<ComponentsType
												onDragStart={(event) =>
													onDragStart(event, 'sourceTrigger')
												}
												draggable
												onClick={() => {
													setSelectedSource('trigger')
													setChooseSource(true)
												}}
											>
												<img
													src={sourceTrigger}
													alt="sourceTrigger"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Disparos</strong>
										</S.ContentComponent>
									</S.SubComponentsWrapper>
								}
							/>
							<S.ContentComponent>
								<ComponentsType
									onClick={() => setChooseExternalPage(true)}
									onDragStart={(event) => onDragStart(event, 'externalPage')}
									draggable
								>
									<img
										src={globe}
										alt="Página Externa"
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover'
										}}
									/>
								</ComponentsType>
								<strong>Página Externa</strong>
							</S.ContentComponent>
							<S.ContentComponent>
								<ComponentsType
									onClick={() => addBlankPage({ pos: { x: 0, y: 0 } })}
									onDragStart={(event) => onDragStart(event, 'blankPage')}
									draggable
									style={{ pointerEvents: 'none', cursor: 'not-allowed' }}
									hasLabel
									label={<CardLabel />}
								>
									<img
										src={pageBlank}
										alt="Página em branco"
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
											opacity: 0.5,
											pointerEvents: 'none',
											cursor: 'not-allowed'
										}}
									/>
								</ComponentsType>
								<strong>Página em branco</strong>
							</S.ContentComponent>
							<HoverCard
								side="top"
								trigger={
									<S.ContentComponent
										style={{ cursor: 'not-allowed', pointerEvents: 'none' }}
									>
										<CardLabel />
										<img
											src={captureTemplate}
											alt="Template de captura"
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
												opacity: 0.5,
												pointerEvents: 'none',
												cursor: 'not-allowed'
											}}
										/>
										<strong>Captura</strong>
										{/* <div className="badge">3</div> */}
									</S.ContentComponent>
								}
								content={
									<S.SubComponentsWrapper>
										<S.ContentComponent style={{ cursor: 'pointer' }}>
											<ComponentsType
												onClick={() => {
													setNodes((state) => [
														...state,
														{
															id: uuidv4(),
															type: 'leads',
															position: {
																x: 0,
																y: 0
															},
															data: {
																type: 'leads'
															}
														}
													])
												}}
												onDragStart={(event) => onDragStart(event, 'leads')}
												draggable
											>
												<img
													src={leadsTemplate}
													alt="Template de leads"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Leads</strong>
										</S.ContentComponent>
										<S.ContentComponent style={{ cursor: 'pointer' }}>
											<ComponentsType
												onClick={() => {
													setNodes((state) => [
														...state,
														{
															id: uuidv4(),
															type: 'download',
															position: {
																x: 0,
																y: 0
															},
															data: {
																type: 'download'
															}
														}
													])
												}}
												onDragStart={(event) => onDragStart(event, 'download')}
												draggable
											>
												<img
													src={downloadTemplate}
													alt="Template de download"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Download</strong>
										</S.ContentComponent>
										<S.ContentComponent>
											<ComponentsType
												onClick={() => {
													setNodes((state) => [
														...state,
														{
															id: uuidv4(),
															type: 'webnar',
															position: {
																x: 0,
																y: 0
															},
															data: {
																type: 'webnar'
															}
														}
													])
												}}
												onDragStart={(event) => onDragStart(event, 'webnar')}
												draggable
											>
												<img
													src={webnarTemplate}
													alt="Template de webnar"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Webnar</strong>
										</S.ContentComponent>
									</S.SubComponentsWrapper>
								}
							/>
							<HoverCard
								side="top"
								trigger={
									<S.ContentComponent
										style={{ cursor: 'not-allowed', pointerEvents: 'none' }}
									>
										<CardLabel />
										<img
											src={salesTemplate}
											alt="Template de vendas"
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
												opacity: 0.5,
												pointerEvents: 'none',
												cursor: 'not-allowed'
											}}
										/>
										<strong>Vendas</strong>
										{/* <div className="badge">5</div> */}
									</S.ContentComponent>
								}
								content={
									<S.SubComponentsWrapper>
										<S.ContentComponent>
											<ComponentsType
												onClick={() => {
													setNodes((state) => [
														...state,
														{
															id: uuidv4(),
															type: 'sales',
															position: {
																x: 0,
																y: 0
															},
															data: {
																type: 'sales'
															}
														}
													])
												}}
												onDragStart={(event) => onDragStart(event, 'sales')}
												draggable
											>
												<img
													src={salesTemplate}
													alt="Template de vendas"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Vendas</strong>
										</S.ContentComponent>
										<S.ContentComponent>
											<ComponentsType
												onClick={() => {
													setNodes((state) => [
														...state,
														{
															id: uuidv4(),
															type: 'vsl',
															position: {
																x: 0,
																y: 0
															},
															data: {
																type: 'vsl'
															}
														}
													])
												}}
												onDragStart={(event) => onDragStart(event, 'vsl')}
												draggable
											>
												<img
													src={vslTemplate}
													alt="Template de vendas"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>VSL</strong>
										</S.ContentComponent>
										<S.ContentComponent>
											<ComponentsType
												onClick={() => {
													setNodes((state) => [
														...state,
														{
															id: uuidv4(),
															type: 'upsell',
															position: {
																x: 0,
																y: 0
															},
															data: {
																type: 'upsell'
															}
														}
													])
												}}
												onDragStart={(event) => onDragStart(event, 'upsell')}
												draggable
											>
												<img
													src={upsellTemplate}
													alt="Template de upsell"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Upsell</strong>
										</S.ContentComponent>
										<S.ContentComponent>
											<ComponentsType
												onClick={() => {
													setNodes((state) => [
														...state,
														{
															id: uuidv4(),
															type: 'downsell',
															position: {
																x: 0,
																y: 0
															},
															data: {
																type: 'downsell'
															}
														}
													])
												}}
												onDragStart={(event) => onDragStart(event, 'downsell')}
												draggable
											>
												<img
													src={downsellTemplate}
													alt="Template de Downsell"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Downsell</strong>
										</S.ContentComponent>
										<S.ContentComponent>
											<ComponentsType
												onClick={() => {
													setNodes((state) => [
														...state,
														{
															id: uuidv4(),
															type: 'crossell',
															position: {
																x: 0,
																y: 0
															},
															data: {
																type: 'crossell'
															}
														}
													])
												}}
												onDragStart={(event) => onDragStart(event, 'crossell')}
												draggable
											>
												<img
													src={crossellTemplate}
													alt="Template de Crossell"
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											</ComponentsType>
											<strong>Crossell</strong>
										</S.ContentComponent>
									</S.SubComponentsWrapper>
								}
							/>
							{currentFunnel.checkoutPlatform &&
								currentFunnel.checkoutPlatform !== 'manual' &&
								currentFunnel.checkoutPlatform !== 'none' && (
									<S.ContentComponent>
										<ComponentsType
											onClick={() => {
												setOpenCheckout(true)
											}}
											onDragStart={(event) => onDragStart(event, 'checkout')}
											draggable
										>
											<img
												src={checkoutTemplate}
												alt="Template de Checkout"
												style={{
													width: '100%',
													height: '100%',
													objectFit: 'cover'
												}}
											/>
										</ComponentsType>
										<strong>Checkout</strong>
										<FunnelDialog
											title={`Checkout: ${
												currentFunnel.checkoutPlatform ?? 'none'
											}`}
											isOpen={openCheckout}
											setIsOpen={() => setOpenCheckout(!openCheckout)}
										>
											<CheckoutForm
												addCheckoutNode={(productId: string) =>
													addCheckoutNode({ productId, pos: { x: 0, y: 0 } })
												}
											/>
										</FunnelDialog>
									</S.ContentComponent>
								)}
							<S.ContentComponent>
								<ComponentsType
									onClick={() => {
										setNodes((state) => [
											...state,
											{
												id: uuidv4(),
												type: 'acknowledgment',
												position: {
													x: 0,
													y: 0
												},
												data: {
													type: 'acknowledgment'
												}
											}
										])
									}}
									onDragStart={(event) => onDragStart(event, 'acknowledgment')}
									draggable
									hasLabel
									label={<CardLabel />}
									style={{ pointerEvents: 'none', cursor: 'not-allowed' }}
								>
									<img
										src={thanksTemplate}
										alt="Template de obrigado"
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
											opacity: 0.5,
											pointerEvents: 'none',
											cursor: 'not-allowed'
										}}
									/>
								</ComponentsType>
								<strong>Obrigado</strong>
							</S.ContentComponent>
							<S.ContentComponent>
								<ComponentsType
									onClick={() => setOpenEmail(true)}
									onDragStart={(event) => onDragStart(event, 'email')}
									draggable
								>
									<img
										src={mailtemplate}
										alt="Template de email"
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover'
										}}
									/>
								</ComponentsType>
								<strong>Email</strong>
							</S.ContentComponent>
							<FunnelDialog
								title="Email"
								isOpen={openEmail}
								setIsOpen={() => setOpenEmail(!openEmail)}
							>
								<EmailForm
									newEmailNode={(platform, listName, listId, tags) =>
										addEmailNode({
											pos: { x: 0, y: 0 },
											fields: { platform, listName, listId, tags }
										})
									}
								/>
							</FunnelDialog>
							<FunnelDialog
								title="Página Externa"
								isOpen={chooseExternalPage}
								setIsOpen={() => setChooseExternalPage(!chooseExternalPage)}
							>
								<ExternalPageForm
									handleAddNode={({ page, form }) =>
										addExternalPage({ page, form })
									}
								/>
							</FunnelDialog>
							<FunnelDialog
								title="Entrada de dados"
								isOpen={chooseSource}
								setIsOpen={() => setChooseSource(!chooseSource)}
							>
								<SourceForm
									selectedSource={selectedSource ?? 'paid'}
									addSourceNode={(trafficSourceId) =>
										addSourceNode({
											trafficSourceId
										})
									}
								/>
							</FunnelDialog>
							<DialogRoot
								title="Copiar código"
								isOpen={openToCopy}
								maxwidth={800}
								setIsOpen={() => setOpenToCopy(!openToCopy)}
								preventClose
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem'
									}}
								>
									<span style={{ fontSize: '0.875rem' }}>
										Copie os códigos abaixo e utilize-os no seu construtor de
										páginas para que a UPFunnels possa receber seus Leads
									</span>
									<S.CopyContainer>
										<button
											data-state={htmlCopied ? 'copied' : ''}
											onClick={() => {
												if (!formValues?.html) return
												setHtmlCopied(true)

												navigator.clipboard.writeText(
													dinamicHtml(
														formValues.buttonColor!,
														formValues.buttonText!,
														formValues.buttonBorderRadius!,
														currentFunnel._id!,
														currentPageToHandle
													)
												)
												toast.success('Copiado com sucesso', successToast)

												setTimeout(() => {
													setHtmlCopied(false)
												}, 1000)
											}}
										>
											{htmlCopied ? <Check /> : <Copy />}
										</button>
										<span>Copiar HTML</span>
									</S.CopyContainer>
									<S.CopyContainer>
										<button
											data-state={jsCopied ? 'copied' : ''}
											onClick={() => {
												if (!formValues?.js) return

												setJsCopied(true)
												navigator.clipboard.writeText(
													dinamicJS(formValues.buttonRedirect)
												)
												toast.success('Copiado com sucesso', successToast)
												setTimeout(() => {
													setJsCopied(false)
												}, 1000)
											}}
										>
											{jsCopied ? <Check /> : <Copy />}
										</button>
										<span>Copiar Código Javascript</span>
									</S.CopyContainer>
									<span style={{ fontSize: '0.875rem' }}>
										Caso não queira copiar nesse momento, poderá realizar a ação
										quando editar as informações dessa página
									</span>
									<Button $fullwidth onClick={() => setOpenToCopy(false)}>
										Fechar
									</Button>
								</div>
							</DialogRoot>
						</S.ComponentsCollection>
					)}
				</>
			)}
		</>
	)
}
