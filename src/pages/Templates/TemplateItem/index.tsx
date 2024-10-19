import { ExternalLink, ImageOff, PenSquare, Trash2 } from 'lucide-react'

import { Tooltip } from '../../../components/Tooltip'

import { useState } from 'react'
import { PageTemplateResponse } from '../../../@types/pages/templates'
import { DeleteConfirmation } from '../../../components/DeleteConfirmation'
import { DialogRoot } from '../../../components/Dialog'
import { deletePageTemplate } from '../../../services/editor.service'
import { useEditorStore } from '../../../services/store/editor-store'
import { UpdateTemplateForm } from '../UpdaTemplateForm'
import * as S from './styles'
import { useNavigate } from 'react-router-dom'

interface TemplateItemProps {
	template: PageTemplateResponse
	handleDelete: () => void
}

export function TemplateItem({ template, handleDelete }: TemplateItemProps) {
	const [editOpen, setEditOpen] = useState(false)
	const [deleteTemplateOpen, setDeleteTemplateOpen] = useState(false)
	const { setState } = useEditorStore((state) => state)

	const navigate = useNavigate()

	async function handleDeleteTemplate() {
		await deletePageTemplate(template._id).finally(() => {
			handleDelete()
		})

		return
	}

	function handleAccessTemplate() {
		if (!template) return

		setState({
			pageId: undefined,
			funnelId: undefined,
			pageTemplateId: template._id,
			from: 'template'
		})

		navigate(`/editor`)
	}

	return (
		<S.BoardItem>
			{template.preview ? (
				<img src={template.preview} alt="" />
			) : (
				<span className="previewOff">
					<ImageOff strokeWidth={1} />
					Preview indisponível
				</span>
			)}
			<div className="header">
				<span>{template.name}</span>
				<div className="status">
					<Tooltip
						trigger={
							<PenSquare strokeWidth={1} onClick={() => setEditOpen(true)} />
						}
						content="Editar"
					/>
					<Tooltip
						trigger={
							<ExternalLink
								strokeWidth={1}
								onClick={() => handleAccessTemplate()}
							/>
						}
						content="Editar"
					/>
					<Tooltip
						trigger={
							<Trash2
								strokeWidth={1}
								onClick={() => setDeleteTemplateOpen(true)}
							/>
						}
						content="Excluir"
					/>
				</div>
			</div>
			<span className="category">Captura</span>
			<DialogRoot
				title="Editar informações"
				isOpen={editOpen}
				setIsOpen={() => setEditOpen(!editOpen)}
			>
				<UpdateTemplateForm
					handleClose={() => setEditOpen(!editOpen)}
					template={template}
				/>
			</DialogRoot>
			<DialogRoot
				isOpen={deleteTemplateOpen}
				setIsOpen={() => setDeleteTemplateOpen(!deleteTemplateOpen)}
				title="Excluir template"
			>
				<DeleteConfirmation
					destructionFunction={handleDeleteTemplate}
					message="Deseja realmente excluir esse template?"
				/>
			</DialogRoot>
		</S.BoardItem>
	)
}
