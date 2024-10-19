import * as S from './styles'
import { PenLine, PenSquare, Plus, Trash } from 'lucide-react'
import 'swiper/css'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

type PublicType = {
	addPublic: () => void
}

type PublicProps = {
	id: string
	name: string
}

export function Audience({ addPublic }: PublicType) {
	const navigate = useNavigate()
	const inputRef = useRef<HTMLInputElement>(null)

	const initialPublics: PublicProps[] = [
		{
			id: '001',
			name: 'Imersão 30 dias para emagrecer'
		},
		{
			id: '002',
			name: 'Mente bilionária'
		},
		{
			id: '003',
			name: 'Público do lançamento X (pesquisa stories)'
		}
	]

	const [publics, setPublics] = useState<PublicProps[]>(initialPublics)
	const [editedName, setEditedName] = useState<string>('')
	const [editingPublicId, setEditingPublicId] = useState<string | null>(null)

	const handleEdit = (publicId: string, name: string) => {
		setEditingPublicId(publicId)
		setEditedName(name)
		setTimeout(() => inputRef.current?.focus(), 0)
	}

	const handleSave = (publicId: string) => {
		const updatedPublics = publics.map((pub) =>
			pub.id === publicId ? { ...pub, name: editedName } : pub
		)
		setPublics(updatedPublics)
		setEditingPublicId(null)
	}

	const handleDelete = (publicId: string) => {
		const updatedPublics = publics.filter((pub) => pub.id !== publicId)
		setPublics(updatedPublics)
	}

	return (
		<S.PublicWrapper>
			<>
				<h2>Públicos</h2>
				<div className="flex">
					<div className="publics">
						<div className="newPublic" onClick={addPublic}>
							<div className="newPublic__grid">
								<div className="newPublic__title">Novo público</div>
								<div className="newPublic__icone">
									<Plus strokeWidth={1} />
								</div>
							</div>
						</div>
						{publics &&
							publics.map((pub) => (
								<div key={pub.id} className="public">
									<div className="public__content">
										<p className="public__name">
											{editingPublicId === pub.id ? (
												<input
													ref={inputRef}
													type="text"
													value={editedName}
													onChange={(e) => setEditedName(e.target.value)}
													onBlur={() => handleSave(pub.id)}
													onKeyDown={(e) => {
														if (e.key === 'Enter') handleSave(pub.id)
													}}
												/>
											) : (
												<>
													{pub.name}
													<PenLine
														className="public__edit-icon"
														strokeWidth={1}
														onClick={() => handleEdit(pub.id, pub.name)}
													/>
												</>
											)}
										</p>
									</div>
									<div className="options">
										<a
											onClick={() =>
												navigate(`/audience-brand/AudienceEdit/${pub.id}`)
											}
										>
											<PenSquare />
										</a>
										<a onClick={() => handleDelete(pub.id)}>
											<Trash />
										</a>
									</div>
								</div>
							))}
					</div>
				</div>
			</>
		</S.PublicWrapper>
	)
}
