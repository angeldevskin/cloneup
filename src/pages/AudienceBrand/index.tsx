import { useState } from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { Brands } from './components/Brands/Brands'
import * as S from './styles'
import { DialogRoot } from '../../components/Dialog'
import { NewBrand } from './components/NewBrand'
import { Audience } from './components/Audience'
import { NewPublic } from './components/NewPublic'

export function AudienceBrand() {
	const [modalNewBrand, setModalNewBrand] = useState<boolean>()
	const [modalNewPublic, setModalNewPublic] = useState<boolean>()

	return (
		<MainTemplate>
			<S.Section>
				<div className="title">
					<h1>Público e marca</h1>
				</div>
				<Brands addBrand={() => setModalNewBrand(true)} />
				<Audience addPublic={() => setModalNewPublic(true)} />
			</S.Section>
			<DialogRoot
				title="Criar uma nova marca"
				isOpen={modalNewBrand}
				setIsOpen={() => setModalNewBrand(!modalNewBrand)}
			>
				<NewBrand />
			</DialogRoot>
			<DialogRoot
				title="Criar um novo público"
				isOpen={modalNewPublic}
				maxwidth={720}
				setIsOpen={() => setModalNewPublic(!modalNewPublic)}
			>
				<NewPublic />
			</DialogRoot>
		</MainTemplate>
	)
}
