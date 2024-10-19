import { CSS } from '@dnd-kit/utilities'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
	Bot,
	CalendarClock,
	LayoutList,
	Mail,
	MoreVertical,
	Phone,
	User,
	User2Icon
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

import { Lead } from '../../../../models/leads.model'

import * as S from './styles'

import { DialogRoot } from '../../../../components/Dialog'
import { Tooltip } from '../../../../components/Tooltip'
import { EditLeadForm } from '../EditLeadForm'

import { useDraggable } from '@dnd-kit/core'
import { StatusPin } from '../../../../components/StatusPin'

import { useNavigate } from 'react-router-dom'
import stars from '../../../../assets/stars.svg'
import { axiosRoot } from '../../../../http/axios'
import { PhoneAction } from '../../styles'
import { PopOver } from '../../../../components/PopOver'
import { PopoverClose } from '@radix-ui/react-popover'

type ItemColumnProps = {
	dataitem: Lead
}

export function ItemColumn({ dataitem }: ItemColumnProps) {
	const navigate = useNavigate()

	const [dialogDetails, setDialogDetails] = useState(false)
	const { attributes, setNodeRef, listeners, transform, isDragging } =
		useDraggable({
			id: dataitem._id,
			data: {
				type: 'item',
				lead: dataitem
			},
			disabled: dialogDetails
		})
	const [instance, setInstance] = useState(false)

	async function hasInstance() {
		await axiosRoot()
			.get(`/integrations/whatsapp/instance/verify`)
			.then((res) => setInstance(res.data))
	}

	async function createChat(phone: string, leadId: string) {
		if (dataitem.chatId) {
			return navigate(`/chats/${dataitem.chatId}`)
		}

		if (dataitem.assistantManagerType.toLowerCase() === 'ia') {
			return navigate('/chats')
		}

		if (!dataitem.chatId) {
			await axiosRoot()
				.post('/whatsapp/createChatLeadAssistent', {
					phone,
					leadId
				})
				.then(() => navigate('/chats'))
		}
	}

	useEffect(() => {
		hasInstance()
	}, [])

	return (
		<S.Wrapper
			$isdragging={isDragging}
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			style={{ transform: CSS.Translate.toString(transform) }}
		>
			<S.ItemCard>
				<S.HeaderCard>
					<div>
						<User strokeWidth={1} />
						<strong>{dataitem.name}</strong>
					</div>
				</S.HeaderCard>
				<S.Divider />
				<span>
					<Phone strokeWidth={1} />
					{dataitem.telephone}
					{dataitem.assistantManagerType && instance && (
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
											`55${dataitem.telephone.replace(/\D/g, '')}`,
											dataitem._id
										)
									}
								>
									<FaWhatsapp strokeWidth={1} />
								</PhoneAction>
							}
						/>
					)}
				</span>
				<span>
					<Mail strokeWidth={1} />
					{dataitem.email}
				</span>
				<span>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '50%',
							padding: '0.1rem',
							fontSize: '0.5rem',
							background: '#009ef7',
							color: 'white',
							width: '1rem',
							height: '1rem'
						}}
					>
						{dataitem.assistantManagerType === 'ia' ? (
							<Bot strokeWidth={1} />
						) : (
							<User2Icon strokeWidth={1} />
						)}
					</div>
					<span>{dataitem.assistantManagerId?.name ?? 'Não atribuído'}</span>
					{dataitem.assistantManagerType &&
						dataitem.assistantManagerType.toLowerCase() === 'ia' && (
							<StatusPin type="ia" message="IA" icon={<img src={stars} />} />
						)}
				</span>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%'
					}}
				>
					<span>
						<CalendarClock strokeWidth={1} />
						há{' '}
						{formatDistance(new Date(), dataitem.createdAt, {
							locale: ptBR
						})}
					</span>
					<PopOver
						align="end"
						trigger={<MoreVertical cursor="pointer" />}
						content={
							<S.ActionsWrapper>
								<PopoverClose asChild>
									<button
										className="customButton"
										onClick={() => setDialogDetails(!dialogDetails)}
									>
										<LayoutList strokeWidth={1} />
										Ver detalhes
									</button>
								</PopoverClose>
							</S.ActionsWrapper>
						}
					/>
				</div>
			</S.ItemCard>
			<DialogRoot
				isOpen={dialogDetails}
				setIsOpen={() => setDialogDetails(!dialogDetails)}
				title="Detalhes do lead"
				maxwidth={850}
			>
				<EditLeadForm lead={dataitem} leadId={dataitem._id} />
			</DialogRoot>
		</S.Wrapper>
	)
}
