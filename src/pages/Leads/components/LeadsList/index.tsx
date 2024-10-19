import { RowSelectionState } from '@tanstack/react-table'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { TableCore } from '../../../../components/TableCore'
import { ColumnsFilterProps } from '../../../../models/leads.model'
import { Lead } from '../../../../services/store/chat-store'

import { FaWhatsapp } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TableCheck } from '../../../../components/TableCheck'
import { errorToast } from '../../../../components/Toast/types'
import { Tooltip } from '../../../../components/Tooltip'
import { axiosRoot } from '../../../../http/axios'
import { PhoneAction } from '../../styles'

import * as S from './styles'

interface LeadsListProps {
	leads: Lead[]
	leadsColumnsState: ColumnsFilterProps
	setSelectedLeadsInList: Dispatch<SetStateAction<RowSelectionState>>
	selectedLeadsInList: RowSelectionState
	managers: Array<{
		name: string
		_id: string
		assistantManagerType: 'ia' | 'human'
	}>
}

export function LeadsList({
	leads,
	leadsColumnsState,
	selectedLeadsInList,
	setSelectedLeadsInList
}: LeadsListProps) {
	const navigate = useNavigate()

	const [instance, setInstance] = useState(false)

	async function hasInstance() {
		await axiosRoot()
			.get(`/integrations/whatsapp/instance/verify`)
			.then((res) => setInstance(res.data))
	}

	async function createChat(
		phone: string,
		leadId: string,
		assistantManagerType: string
	) {
		if (!instance || assistantManagerType.toLowerCase() === 'ia') return
		await axiosRoot()
			.post('/whatsapp/createChatLeadAssistent', {
				phone: phone.replace(/\D/g, ''),
				leadId
			})
			.then(() => navigate('/chats'))
			.catch(() => {
				toast.error(
					'Erro ao criar o chat, tente novamente mais tarde.',
					errorToast
				)
			})
	}

	// async function changeAssistant(assistantName: string, leadRef: string) {
	// 	const managerToSet = managers.find(
	// 		(assistant) => assistant.name === assistantName
	// 	)

	// 	if (!managerToSet) return

	// 	if (managerToSet.assistantManagerType.toLowerCase() === 'ia') {
	// 		await axiosRoot().patch(`/leads/external/${leadRef}`, {
	// 			assistantManagerId: managerToSet?._id,
	// 			assistantManagerType: managerToSet?.assistantManagerType.toLowerCase()
	// 		})
	// 		return
	// 	}

	// 	if (managerToSet.assistantManagerType.toLowerCase() === 'human') {
	// 		return await axiosRoot().patch(`/leads/external/${leadRef}`, {
	// 			assistantManagerId: managerToSet?._id,
	// 			assistantManagerType: managerToSet?.assistantManagerType.toLowerCase()
	// 		})
	// 	}
	// }

	useEffect(() => {
		hasInstance()
	}, [])

	return (
		<TableCore
			handleClickOnCell={() => {}}
			rowSelection={selectedLeadsInList}
			getRowId={(row) => row._id}
			setRowSelection={setSelectedLeadsInList}
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
					cell: ({ row }) => <span>{row.getValue('name') ?? '-'}</span>
				},
				{
					header: 'Sobrenome',
					accessorKey: 'surname',
					cell: ({ row }) => <span>{row.getValue('surname') ?? '-'}</span>
				},
				{
					header: 'Email',
					accessorKey: 'email',
					cell: ({ row }) => <span>{row.getValue('email') ?? '-'}</span>
				},
				{
					header: 'Telefone',
					accessorKey: 'telephone',
					cell: ({ row }) => (
						<S.Inline>
							<span>{row.getValue('telephone')}</span>
							{row.original.assistantManagerType === 'human' && (
								<Tooltip
									content={
										instance
											? 'Enviar mensagem via whatsapp'
											: 'Instância do WhatsApp não configurada'
									}
									trigger={
										<PhoneAction
											style={{
												cursor: !instance ? 'not-allowed' : 'pointer'
											}}
											onClick={() =>
												createChat(
													row.getValue('telephone'),
													row.getValue('_id'),
													row.original.assistantManagerType
												)
											}
										>
											<FaWhatsapp />
										</PhoneAction>
									}
								/>
							)}
						</S.Inline>
					)
				},
				{
					header: 'Funil',
					accessorKey: 'funnelName',
					cell: ({ row }) => <span>{row.getValue('funnelName') ?? '-'}</span>
				},
				{
					header: 'Página',
					accessorKey: 'pageName',
					cell: ({ row }) => <span>{row.getValue('pageName') ?? '-'}</span>
				}
				// {
				// 	header: 'Responsável',
				// 	accessorKey: 'assistantManagerId',
				// 	minSize: 100,
				// 	size: 280,
				// 	cell: ({ row }) => (
				// 		<SelectResponsable
				// 			defaultValue={
				// 				typeof row.original.assistantManagerId !== 'string'
				// 					? row.original.assistantManagerId.name
				// 					: 'Não atribuído'
				// 			}
				// 			handleChange={(value) =>
				// 				changeAssistant(value, row.original.leadRef)
				// 			}
				// 			items={managers}
				// 		/>
				// 	)
				// }
			]}
			data={leads}
			visibleColumns={leadsColumnsState}
		/>
	)
}
