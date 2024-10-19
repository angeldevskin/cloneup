import { memo, useEffect, useState } from 'react'
import { NodeProps, Position } from 'reactflow'

import activeCampaign from '../../../../assets/images/activeCampaign.svg'
import mailChimp from '../../../../assets/images/mailchimpSvg.svg'

import { AlertTriangle, PencilLine, Plus, Trash } from 'lucide-react'
import { useFunnels } from '../../../../services/store/funnels'
import { DeleteConfirmation } from '../../../DeleteConfirmation'
import { DialogRoot } from '../../../Dialog'
import { FunnelDialog } from '../../../Funnels/FunnelDialog'
import { StatusPin } from '../../../StatusPin'
import { Tooltip } from '../../../Tooltip'
import { EditEmail } from '../../components/EditEmail'
import { EmailForm } from '../../components/EmailForm'
import * as S from './styles'
import { toast } from 'react-toastify'
import { successToast } from '../../../Toast/types'
import {
	getActiveCampaignNew,
	getMailchimp
} from '../../../../services/setting'

function EmailNode({
	data,
	...rest
}: NodeProps<{
	platform?: string
	list?: { listName: string; listId: string }
	tags?: Array<{ id: string; name: string; value: string }>
}>) {
	const [isOpenToEdit, setIsOpenToEdit] = useState(false)
	const [isOpenToDelete, setIsOpenToDelete] = useState(false)
	const [newEmail, setNewEmail] = useState(false)
	const [openEmail, setOpenEmail] = useState(false)

	const { currentNodes, setCurrentNodes, setCurrentEdges } = useFunnels(
		(state) => state
	)
	const [platformAvailable, setPlatformAvailable] = useState(false)

	function iconResolver() {
		switch (data.platform) {
			case 'mailchimp':
				return mailChimp
			case 'active-campaign':
				return activeCampaign
			default:
				return ''
		}
	}

	async function removeNode() {
		const newNodes = currentNodes.filter((node) => {
			return node.id !== rest.id
		})

		if (newNodes.length === 0) {
			setCurrentEdges([])
		}

		setCurrentNodes(newNodes)
	}

	function addNewEmailNode({
		platform,
		list,
		tags
	}: {
		platform: string
		list: { listName: string; listId: string }
		tags: Array<{
			id: string
			name: string
			value: string
		}>
	}) {
		data.platform = platform
		data.list = list
		data.tags = tags
		setOpenEmail(false)
	}

	async function verifyIntegrations() {
		if (data.platform === 'to-config') return

		if (data.platform === 'mailchimp') {
			const hasMailChimp = await getMailchimp()
				.then((res) => {
					return res
				})
				.catch(() => {
					return undefined
				})

			if (hasMailChimp !== undefined) {
				setPlatformAvailable(true)

				return
			}
		}

		if (data.platform === 'active-campaign') {
			const hasActiveCampaign = await getActiveCampaignNew()
				.then((res) => {
					return res
				})
				.catch(() => {
					return undefined
				})

			if (hasActiveCampaign !== undefined) {
				setPlatformAvailable(true)
			}
		}
	}

	useEffect(() => {
		verifyIntegrations()
	}, [data])

	console.log(platformAvailable)

	return (
		<S.Wrapper
			data-state={
				data?.platform !== 'to-config' ? data.platform : 'placeholder'
			}
		>
			<S.CustomHandle type="target" position={Position.Left} />
			{data.platform === 'to-config' && (
				<>
					<S.Actions style={{ marginTop: '-3rem' }}>
						<button
							data-state="regular"
							onClick={() => setOpenEmail(!openEmail)}
						>
							Selecione
						</button>
						<Tooltip
							trigger={
								<button
									data-state="desctruction"
									onClick={() => setIsOpenToDelete(!isOpenToDelete)}
								>
									<Trash strokeWidth={1} />
								</button>
							}
							content="Excluir email"
						/>
					</S.Actions>
					<Plus size={40} strokeWidth={1.5} />
					<S.Infos style={{ marginBottom: '-2rem' }}>
						<span>Email</span>
					</S.Infos>
					<FunnelDialog
						title="Email"
						isOpen={openEmail}
						setIsOpen={() => setOpenEmail(!openEmail)}
					>
						<EmailForm
							newEmailNode={(platform, listName, listId, tags) =>
								addNewEmailNode({ platform, list: { listName, listId }, tags })
							}
						/>
					</FunnelDialog>
				</>
			)}
			{data.platform !== 'to-config' && (
				<>
					<S.Actions>
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
							content="Excluir email"
						/>
					</S.Actions>
					<img src={iconResolver()} alt={data.platform} />
					<S.Infos
						style={{ marginBottom: !platformAvailable ? '-4rem' : '-3rem' }}
					>
						{!platformAvailable && (
							<Tooltip
								trigger={<AlertTriangle size={16} color="#FAA647" />}
								content="Plataforma não configurada, verifique suas integrações"
							/>
						)}
						<span>Lista: {data.list?.listName ?? ''}</span>
						<StatusPin type="success" message="Email" />
					</S.Infos>
					{data.list?.listName && data.platform && (
						<FunnelDialog
							title="Editar email"
							setIsOpen={() => setIsOpenToEdit(!isOpenToEdit)}
							isOpen={isOpenToEdit}
						>
							<EditEmail
								platform={data.platform}
								list={data.list.listId}
								tags={data.tags ?? []}
								handleResponse={(platform, listName, listId, tags) => {
									data.platform = platform
									if (data.list) {
										data.list.listName = listName
										data.list.listId = listId
										data.tags = tags
									}

									setIsOpenToEdit(!isOpenToEdit)
									toast.success('Email salvo com sucesso', successToast)
								}}
							/>
						</FunnelDialog>
					)}
				</>
			)}
			<S.CustomHandle type="source" position={Position.Right} />
			<DialogRoot
				title="Excluir email"
				setIsOpen={() => setIsOpenToDelete(!isOpenToDelete)}
				isOpen={isOpenToDelete}
			>
				<DeleteConfirmation
					destructionFunction={() => removeNode()}
					message="Deseja realmente excluir esse email?"
				/>
			</DialogRoot>
			<FunnelDialog
				title="Adicionar email"
				setIsOpen={() => setNewEmail(!newEmail)}
				isOpen={newEmail}
			>
				<EmailForm
					newEmailNode={(platform, listName, listId) => {
						data.platform = platform

						if (data.list) {
							data.list.listName = listName
							data.list.listId = listId
						}
					}}
				/>
			</FunnelDialog>
		</S.Wrapper>
	)
}

export default memo(EmailNode)
