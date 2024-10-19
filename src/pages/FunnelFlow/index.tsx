import { ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Flow } from '../../components/Flow'

import { getFunnelByID, updateFunnel } from '../../services/funnels.service'
import { useFunnels } from '../../services/store/funnels'

import up from '../../assets/images/short-up.svg'

import { FunnelCreationType } from '../../@types/pages/funnels'

import { Close } from '@radix-ui/react-dialog'
import { Check, Filter, Loader2, Menu, Pencil } from 'lucide-react'
import { Button } from '../../components/Button'
import { DialogRoot } from '../../components/Dialog'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'
import { FeedbackToast } from '../../components/FeedbackToast'

import { ReactFlowProvider } from 'reactflow'
import { FunnelFlowTemplate } from '../../templates/FunnelFlowTemplate'
import * as S from './styles'
import { FunnelSidebar } from '../../components/FunnelSidebar'
import { Tooltip } from '../../components/Tooltip'

export function FunnelFlow() {
	const { funnelId } = useParams()

	const [showSidebar, setShowSidebar] = useState(false)
	const [isReadOnly, setIsReadOnly] = useState(false)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [feedbackInfo, setFeedbackInfo] = useState<{
		message: string
		icon?: ReactNode
	}>({
		message: '',
		icon: null
	})

	const {
		currentFunnel,
		setCurrentFunnel,
		currentNodes,
		currentEdges,
		setCurrentNodes,
		setCurrentEdges,
		savingFunnel,
		setSavingFunnel,
		setReadOnly
	} = useFunnels((state) => state)

	async function fetchFunnel() {
		await getFunnelByID(funnelId!).then((response) => {
			if (response) {
				delete response.domainId

				setCurrentFunnel({
					...response,
					domain: response.domain
				})
				setCurrentNodes(response.props.nodes)
				setCurrentEdges(response.props.edges)
			}
		})
	}

	async function handlePublishFunnel() {
		const response = await updateFunnel(
			{ status: 'published' },
			currentFunnel._id!
		)

		if (response.status === 200) {
			toast.success('Funil publicado com sucesso')

			const domain = response.data.funnel.domainId
			delete response.data.funnel.domainId

			setCurrentFunnel({
				...response.data.funnel,
				domain: domain
			})
			setIsReadOnly(true)
			setReadOnly(true)
			setDialogOpen(false)
		}
	}

	async function handleUnpublishFunnel() {
		const response = await updateFunnel({ status: 'draft' }, currentFunnel._id!)

		if (response.status === 200) {
			toast.success('Funil despublicado com sucesso')

			const domain = response.data.funnel.domainId
			delete response.data.funnel.domainId

			setCurrentFunnel({
				...response.data.funnel,
				domain: domain
			})
			setIsReadOnly(false)
			setReadOnly(false)
			setDialogOpen(false)
		}
	}

	async function handleSaveFunnel() {
		// if (currentNodes.length <= 0 && currentEdges.length <= 0) return

		try {
			setSavingFunnel(true)
			setFeedbackInfo({
				message: '',
				icon: <Loader2 strokeWidth={1} />
			})

			const newData: FunnelCreationType = {
				props: {
					nodes: currentNodes,
					edges: currentEdges,
					viewport: currentFunnel.props.viewport
				}
			}

			const response = await updateFunnel(newData, currentFunnel._id!)

			if (response.status === 200) {
				setFeedbackInfo({
					message: 'Funil salvo com sucesso',
					icon: (
						<Check
							strokeWidth={1}
							style={{ animation: 'none', color: '#0ACF1E' }}
						/>
					)
				})
			}
		} finally {
			setTimeout(() => {
				setSavingFunnel(false)
				setFeedbackInfo({
					message: '',
					icon: null
				})
			}, 2000)
		}
	}

	useEffect(() => {
		if (currentFunnel.status !== 'published') {
			handleSaveFunnel()
		} else {
			// setConfirmEdition(true)
			setIsReadOnly(true)
			setReadOnly(true)
		}
	}, [currentNodes, currentEdges])

	useEffect(() => {
		fetchFunnel()
	}, [])

	return (
		<FunnelFlowTemplate>
			{!currentFunnel._id && (
				<EmptyWrapper>
					<Loader2 strokeWidth={1} />
					<span>Carregando funil</span>
				</EmptyWrapper>
			)}
			{currentFunnel && (
				<S.Wrapper>
					<>
						<FeedbackToast
							open={savingFunnel}
							handleOpen={() => setSavingFunnel(!savingFunnel)}
							icon={feedbackInfo.icon!}
							message={feedbackInfo.message}
						/>
						{showSidebar && (
							<FunnelSidebar open={showSidebar} setOpen={setShowSidebar} />
						)}
						<S.FixedHeader $position="left">
							<S.BrainHeader>
								<img src={up} />
								<Tooltip
									content="Abrir Menu"
									trigger={<Menu onClick={() => setShowSidebar(true)} />}
								/>
								<div
									style={{
										display: 'flex',
										height: '25px',
										width: '1px',
										background: '#c4c4c4'
									}}
								/>
								<Filter strokeWidth={1} size={14} />
								<span>{currentFunnel.name}</span>
							</S.BrainHeader>
						</S.FixedHeader>
						<S.FixedHeader $position="right">
							{currentFunnel.status === 'published' && (
								<DialogRoot
									isOpen={dialogOpen}
									setIsOpen={() => setDialogOpen(!dialogOpen)}
									trigger={
										<S.NewFunnelTrigger>
											<Pencil strokeWidth={1} />
											<span>Editar funil</span>
										</S.NewFunnelTrigger>
									}
									title="Editar funil"
								>
									<S.PublishFunnel>
										<span>
											Ao editar o seu funil ele será despublicado e será
											necessário publicá-lo novamente.
										</span>
										<footer>
											<Close asChild>
												<Button $fullwidth shape="text">
													Cancelar
												</Button>
											</Close>
											<Button
												$fullwidth
												onClick={() => handleUnpublishFunnel()}
											>
												Editar
											</Button>
										</footer>
									</S.PublishFunnel>
								</DialogRoot>
							)}
							{currentFunnel.status !== 'published' && (
								<DialogRoot
									isOpen={dialogOpen}
									setIsOpen={() => setDialogOpen(!dialogOpen)}
									trigger={
										<S.NewFunnelTrigger>
											<Filter strokeWidth={1} />
											<span>Publicar Funil</span>
										</S.NewFunnelTrigger>
									}
									title="Publicar funil"
								>
									<S.PublishFunnel>
										<span>
											Ao publicar o seu funil ficará ativo e não será mais
											possível editar as informações de objetivo ou domínio.
											Certifique-se de que as informações estão corretas antes
											de publicar.
										</span>

										<footer>
											<Close asChild>
												<Button $fullwidth shape="text">
													Cancelar
												</Button>
											</Close>
											<Button $fullwidth onClick={() => handlePublishFunnel()}>
												Publicar
											</Button>
										</footer>
									</S.PublishFunnel>
								</DialogRoot>
							)}
						</S.FixedHeader>
					</>
					<ReactFlowProvider>
						<Flow readOnly={isReadOnly} setReadOnly={setIsReadOnly} />
					</ReactFlowProvider>
				</S.Wrapper>
			)}
		</FunnelFlowTemplate>
	)
}
