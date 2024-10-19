import { zodResolver } from '@hookform/resolvers/zod'
import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'

import { Page } from '../../../../models/page.model'

import { Button } from '../../../../components/Button'
import * as S from '../../../../components/Funnels/FormWrapper/styles'
import { TextField } from '../../../../components/TextField'
import { errorToast, successToast } from '../../../../components/Toast/types'

import { Tooltip } from '../../../../components/Tooltip'
import { updatePage } from '../../../../services/editor.service'

const formSchema = z.object({
	pageName: z.string().max(20, {
		message: 'Nome da página muito longo'
	}),
	pagePath: z.string().regex(/^[A-Za-z0-9-]+$/, {
		message: 'Apenas letras são permitidas'
	})
})

export function PageInfo({
	pageId,
	page,
	domainName,
	closeDialog,
	showName = true
}: {
	pageId: string
	domainName: string
	page: Partial<Page>
	showName: boolean
	closeDialog: () => void
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<{
		pageName: string
		pagePath: string
	}>({
		resolver: zodResolver(formSchema),
		values: {
			pageName: page.name ?? '',
			pagePath: page.path?.split('/')[1] ?? ''
		}
	})

	async function onHadleSubmit(fields: {
		pageName?: string
		pagePath: string
	}) {
		if (!fields.pagePath.startsWith('/'))
			fields.pagePath = `/${fields.pagePath}`

		if (
			fields.pagePath.startsWith('/blank-page') ||
			fields.pagePath.startsWith('/nova-pagina')
		) {
			toast.error('Escolha uma nova url válida', errorToast)

			return
		}

		let changes
		if (showName) {
			changes = {
				name: fields.pageName,
				path: fields.pagePath
			}
		} else {
			changes = {
				path: fields.pagePath
			}
		}

		const response = await updatePage(changes, pageId)

		if (response.status === 200) {
			toast.success('Página atualizada', successToast)

			closeDialog()
		}
	}

	return (
		<S.FormWrapper onSubmit={handleSubmit(onHadleSubmit)}>
			{showName && (
				<>
					<TextField
						$fullwidth
						name="pageName"
						register={register}
						label="Nome da página"
						errorMessage={errors.pageName?.message}
					/>
				</>
			)}

			<TextField
				$fullwidth
				name="pagePath"
				register={register}
				label="URL"
				onChange={(event) => {
					const regex = /^[A-Za-z0-9-]+$/
					if (!regex.test(event.target.value)) {
						setValue('pagePath', event.target.value.replace(/ /g, ''))
					}
				}}
				errorMessage={errors.pagePath?.message}
				icon={
					<Tooltip
						trigger={
							<div
								style={{
									width: '100%',
									maxWidth: '12rem',
									overflow: 'hidden',
									fontSize: '0.875rem',
									height: '100%',
									color: '#d7d5dd',
									paddingRight: '0.5rem'
								}}
							>
								{domainName}/
							</div>
						}
						content={`${domainName}/`}
					/>
				}
			/>

			<S.ConfirmationWrapper>
				<Close asChild>
					<Button $fullwidth shape="ghost">
						Cancelar
					</Button>
				</Close>
				<Button $fullwidth type="submit">
					Salvar
				</Button>
			</S.ConfirmationWrapper>
		</S.FormWrapper>
	)
}
