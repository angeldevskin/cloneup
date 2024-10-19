import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select'
import { TextField } from '../../../components/TextField'

import { useEffect, useState } from 'react'
import { CategoriesType } from '../../../@types/categories'
import { PageTemplateResponse } from '../../../@types/pages/templates'
import * as S from '../../../components/Funnels/FormWrapper/styles'
import { getCategories } from '../../../services/categories.service'
import { updatePageTemplate } from '../../../services/editor.service'

export type SelectItemsType = {
	id: string
	name: string
	value: string
}[]

export function UpdateTemplateForm({
	handleClose,
	template
}: {
	handleClose: () => void
	template: PageTemplateResponse
}) {
	const [categories, setCategories] = useState<SelectItemsType>()

	const { register, handleSubmit, reset } = useForm<{ name: string }>({
		values: {
			name: template.name
		}
	})

	const [selectedCategory, setSelectedCategory] = useState(
		template.category._id
	)

	async function fetchCategories() {
		const responseCategories = await getCategories({ type: 'page' })

		if (responseCategories.data) {
			const myCategories = responseCategories.data.categories.map(
				(item: CategoriesType) => ({
					name: item.category,
					id: item._id,
					value: item._id
				})
			)

			setCategories(myCategories)
		}
	}

	const onSubmit = async (data: { name: string }) => {
		await updatePageTemplate(
			{
				name: data.name,
				category: selectedCategory,
				css: template.css,
				html: template.html,
				js: template.js ?? {},
				status: template.status,
				props: template.props ?? {}
			},
			template._id
		).finally(() => {
			handleClose()
			reset()
		})
	}

	useEffect(() => {
		fetchCategories()
	}, [])

	return (
		<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
			<TextField
				placeholder="Digite o nome do template"
				label="Nome do template"
				name="name"
				required
				register={register}
				minLength={4}
				maxLength={50}
				$fullwidth
			/>
			<Select
				items={categories}
				label="Categoria"
				placeholder="Selecione a categoria do funil"
				handleChange={(value) => setSelectedCategory(value)}
				currentValue={selectedCategory}
			/>

			<S.ConfirmationWrapper>
				<Close asChild>
					<Button shape="ghost" $fullwidth>
						Cancelar
					</Button>
				</Close>
				<Button $fullwidth type="submit">
					Atualizar
				</Button>
			</S.ConfirmationWrapper>
		</S.FormWrapper>
	)
}
