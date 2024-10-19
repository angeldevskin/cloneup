import { Close } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { Button } from '../../../../components/Button'
import { TextField } from '../../../../components/TextField'
import { errorToast, successToast } from '../../../../components/Toast/types'

import { Lead, NewLead } from '../../../../models/leads.model'
import { deleteLead, updateLead } from '../../../../services/leads.service'

import { useNavigate } from 'react-router-dom'
import { axiosRoot } from '../../../../http/axios'
import * as S from './styles'
import { ModalDeleteLead } from '../ModalDelete/ModalDeleteLead'
import { DialogRoot } from '../../../../components/Dialog'

interface ModalDeleteProps {
	leadId: string
	lead: Lead
}

export function EditLeadForm({ leadId, lead }: ModalDeleteProps) {
	const { register, handleSubmit } = useForm<NewLead>()
	const navigate = useNavigate()
	const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false)
	const confirmDeleteAssistant = async () => {
		if (leadId) {
			await deleteLead(leadId)
				.then(async (res) => {
					const { status } = res
					if (status === 204) {
						toast.success('Excluido com sucesso!')
						setTimeout(() => {
							window.location.reload()
						}, 1000)
					} else {
						throw new Error('Não foi possível excluir')
					}
				})
				.catch(() => {
					toast.error(`Erro ao excluir o lead`)
					setModalDeleteOpen(false)
				})
			setModalDeleteOpen(false)
		}
	}

	const handleDeleteClick = () => {
		setModalDeleteOpen(true)
	}

	const [editMode, setEditMode] = useState(false)

	async function onSubmit(fields: NewLead) {
		const newData: NewLead = {
			name: fields.name,
			surname: fields.surname,
			telephone: fields.telephone,
			email: fields.email.replace(' ', ''),
			leadRef: lead.leadRef,
			pageId: lead.pageId,
			funnelId: lead.funnelId
		}

		const response = await updateLead(leadId, newData)

		if (response.status === 200) {
			toast.success('Lead atualizado com sucesso!', successToast)
		} else {
			toast.success('Projeto não salvo com sucesso!', errorToast)
		}
	}

	async function createChat(phone: string) {
		const instance = await axiosRoot()
			.get(`/integrations/whatsapp/instance/verify`)
			.then((res) => res.data)

		if (!instance || lead.assistantManagerType.toLowerCase() === 'ia') return

		await axiosRoot().post('/whatsapp/createChatLeadAssistent', {
			phone,
			leadId: lead._id
		})

		navigate('/chats')
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'start',
				justifyContent: 'center',
				width: '100%',
				gap: '1rem',
				zIndex: 9999
			}}
		>
			{!editMode && (
				<>
					<strong>Informações de contato</strong>
					<S.LeadInfosWrapper>
						<div className="leadInfo">
							<strong>Nome</strong>
							<span>{lead.name}</span>
						</div>
						<div className="leadInfo">
							<strong>Telefone</strong>
							<S.PhoneAction
								onClick={() =>
									createChat(`55${lead.telephone.replace(/\D/g, '')}`)
								}
							>
								<span>{lead.telephone}</span>
								<FaWhatsapp />
							</S.PhoneAction>
						</div>
						<div className="leadInfo">
							<strong>Email</strong>
							<span>{lead.email}</span>
						</div>
					</S.LeadInfosWrapper>
					<strong>Dados do lead</strong>
					<S.LeadInfosWrapper>
						<div className="leadInfo">
							<strong>Data de cadastro</strong>
							<span>
								{format(lead.createdAt, 'Pp', {
									locale: ptBR
								})}
							</span>
						</div>
					</S.LeadInfosWrapper>
					<S.FooterActions>
						<span>
							Última edição manual realizada em{' '}
							{format(lead.updatedAt, 'Pp', { locale: ptBR })}
						</span>
						<Button shape="danger" onClick={() => handleDeleteClick()}>
							Excluir lead
						</Button>
						<Button onClick={() => setEditMode(true)} shape="ghost">
							Editar lead manualmente
						</Button>
					</S.FooterActions>
				</>
			)}

			{editMode && (
				<S.FormWrapper id="newLead" onSubmit={handleSubmit(onSubmit)}>
					<strong>Informações de contato</strong>
					<S.LeadInfosWrapper>
						<TextField
							label="Nome"
							name="name"
							type="text"
							required
							placeholder="Insira o nome"
							defaultValue={lead.name!}
							register={register}
							$fullwidth
						/>
						<TextField
							label="Sobrenome"
							name="surname"
							type="text"
							required
							placeholder="Insira o nome"
							defaultValue={lead.surname}
							register={register}
							$fullwidth
						/>
						<TextField
							label="Telefone"
							name="telephone"
							type="tel"
							required
							placeholder="Ex: +55 31 91234-5678"
							defaultValue={lead.telephone}
							register={register}
							$fullwidth
						/>
						<TextField
							label="E-mail"
							name="email"
							type="email"
							required
							placeholder="Insira o e-mail"
							defaultValue={lead.email}
							register={register}
							$fullwidth
						/>
					</S.LeadInfosWrapper>
					<strong>Dados do lead</strong>
					<S.LeadInfosWrapper>
						<div className="leadInfo">
							<strong>Data de Cadastro</strong>
							<span>
								{format(lead.createdAt, 'Pp', {
									locale: ptBR
								})}
							</span>
						</div>
					</S.LeadInfosWrapper>
					<S.FooterActions>
						<Button shape="text" onClick={() => setEditMode(false)}>
							<ChevronLeft strokeWidth={1} />
							Voltar
						</Button>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
								gap: '0.5rem'
							}}
						>
							<Close asChild>
								<Button shape="text">Cancelar</Button>
							</Close>
							<Button type="submit" $fullwidth>
								Atualizar lead
							</Button>
						</div>
					</S.FooterActions>
				</S.FormWrapper>
			)}
			<DialogRoot
				className="dialog-modal-delete-ia"
				setIsOpen={() => setModalDeleteOpen(!modalDeleteOpen)}
				title="Excluir assistente"
				isOpen={modalDeleteOpen}
				maxwidth={720}
			>
				<ModalDeleteLead
					handleClose={() => setModalDeleteOpen(false)}
					handleDelete={confirmDeleteAssistant}
				/>
			</DialogRoot>
		</div>
	)
}
