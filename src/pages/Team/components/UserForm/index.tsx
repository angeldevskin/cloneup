/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../../../../components/Button'
import { Select } from '../../../../components/Select'
import { SwitchInput } from '../../../../components/Switch'
import { Table } from '../../../../components/Table'
import { TextField } from '../../../../components/TextField'
import { errorToast, successToast } from '../../../../components/Toast/types'
import { createUser, updateUser } from '../../../../services/user.service'
import '../../style.css'

type FormType = {
	name: string
	email: string
	role: string
}

type SelectItemsType = {
	id: string
	name: string
	value: string
}[]

export function UserForm({
	closeDialog,
	isEditOperation = false,
	userInfo = null
}: {
	closeDialog: () => void
	isEditOperation?: boolean
	userInfo?: { id: string; name: string; email: string; role: string } | null
}) {
	const { register, handleSubmit, setValue, reset } = useForm<FormType>()
	const [selectedRole, setSelectedRole] = useState<string>('')
	const [showRoles, setShowRoles] = useState<boolean>(false)
	const [roles, setRoles] = useState<SelectItemsType>()

	const mapRole = (role: string) => {
		const roleResult = roles?.find((r) => r.id === role)
		return roleResult ? roleResult.name : ''
	}

	useEffect(() => {
		mapRole('sales_acess')
		setRoles([
			{
				id: 'admin_client',
				name: 'Administrador',
				value: 'admin_client'
			},
			{
				id: 'sales_access',
				name: 'Vendas',
				value: 'sales_access'
			},
			{
				id: 'funnel_access',
				name: 'Gestor de funis',
				value: 'funnel_access'
			}
		])
		if (isEditOperation && userInfo) {
			setValue('name', userInfo.name)
			setValue('email', userInfo.email)
			setValue('role', userInfo.role)
			setSelectedRole(userInfo.role)
		} else {
			reset()
		}
	}, [isEditOperation, userInfo, reset, setValue])

	const validateField = (fieldValue: string, fieldName: string) => {
		if (!fieldValue || !fieldValue.trim()) {
			toast.error(
				`O campo ${fieldName} não pode ser vazio ou conter apenas espaços em branco!`
			)
			return false
		}
		return true
	}

	async function onSubmit(fields: FormType) {
		try {
			if (
				!validateField(fields.name, 'nome') ||
				!validateField(fields.role, 'função') ||
				!validateField(fields.email, 'email')
			) {
				return
			}
			const { name, role, email } = fields
			if (isEditOperation) {
				await updateUser(userInfo.id, {
					name,
					role,
					email,
					password: ''
				})
			} else {
				await createUser({
					name,
					role,
					email,
					password: ''
				})
			}
			toast.success(
				`Usuário ${isEditOperation ? 'Editado' : 'Criado'} com sucesso!`,
				successToast
			)

			closeDialog()
		} catch (error: any) {
			toast.error(error.message, errorToast)
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem'
				}}
			>
				<TextField
					placeholder="insira o nome do usuário"
					name="name"
					required
					className="fullWidth"
					label="Nome"
					$fullwidth={true}
					register={register}
				/>
				<TextField
					placeholder="usuario@exemplo.com"
					name="email"
					required
					className="fullWidth"
					label="Email"
					$fullwidth={true}
					register={register}
				/>
				<Select
					items={roles}
					label="Função"
					placeholder={
						userInfo && isEditOperation
							? mapRole(userInfo.role)
							: 'Selecione a função do usuário'
					}
					handleChange={(value) => {
						setValue('role', value)
						setSelectedRole(value)
					}}
					currentValue={selectedRole}
				/>
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<Close asChild>
						<Button
							shape="ghost"
							$fullwidth
							onClick={() => {
								closeDialog()
							}}
						>
							Cancelar
						</Button>
					</Close>
					<Button $fullwidth type="submit">
						Salvar
					</Button>
				</div>
			</form>
			<div
				style={{ display: 'flex', justifyContent: 'start', marginTop: '20px' }}
			>
				<SwitchInput
					checked={showRoles}
					onChange={() => setShowRoles(!showRoles)}
				/>

				<label htmlFor="" style={{ marginLeft: '20px' }}>
					Exibir permissões
				</label>
			</div>

			{showRoles && (
				<Table
					columns={[
						{ identifier: 'pages', name: '' },
						{ identifier: 'sales_access', name: 'Vendas' },
						{ identifier: 'funnel_access', name: 'Gestor de funis' },
						{ identifier: 'admin_client', name: 'Administrador' }
					]}
					items={[
						{
							pages: 'Funis e Páginas',
							sales_access: '-',
							funnel_access: 'check',
							admin_client: 'check'
						},
						{
							pages: 'Leads (CRM e Chat)',
							sales_access: 'check',
							funnel_access: '-',
							admin_client: 'check'
						},
						{
							pages: 'Pixeis e Códigos',
							sales_access: '-',
							funnel_access: 'check',
							admin_client: 'check'
						},
						{
							pages: 'Integrações',
							sales_access: '-',
							funnel_access: 'check',
							admin_client: 'check'
						},
						{
							pages: 'Público e marca',
							sales_access: '-',
							funnel_access: '-',
							admin_client: 'check'
						},
						{
							pages: 'Assistente de IA',
							sales_access: '-',
							funnel_access: '-',
							admin_client: 'check'
						},
						{
							pages: 'Equipe',
							sales_access: '-',
							funnel_access: '-',
							admin_client: 'check'
						}
					]}
				></Table>
			)}
		</div>
	)
}
