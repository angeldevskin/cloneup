import { useState } from 'react'
import { Select } from '../../../../components/Select'
import { PrimaryArchetypes } from '../../../Codes/configs/Archetypes'
import { SecondaryArchetypes } from '../../../Codes/configs/Archetypes'
import * as S from './styles'
// src\pages\AudienceBrand\components\Archetype\styles.ts

export function Archetype() {
	const [selectArchetypePrimary, setSelectArchetypePrimary] =
		useState<string>('')
	const [selectArchetypeSecondary, setSelectArchetypeSecondary] =
		useState<string>('')

	function handleIdChangePrimary(id: string) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		PrimaryArchetypes.find((item: any) => {
			if (item.id == id) {
				//Recuperar a opção selecionada
				setSelectArchetypePrimary(item.name)
				console.log(item.name)
				return item.name
			}
		})
	}

	function handleIdChangeSecondary(id: string) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		SecondaryArchetypes.find((item: any) => {
			if (item.id == id) {
				//Recuperar a opção selecionada
				console.log(item.name)
				setSelectArchetypeSecondary(item.name)
				return item.name
			}
		})
	}

	return (
		<S.Container>
			<h1>Arquétipos</h1>
			<S.Select>
				<Select
					items={PrimaryArchetypes}
					withIdValue={true}
					label="Arquétipo principal"
					placeholder={
						selectArchetypePrimary
							? selectArchetypePrimary
							: 'Escolha seu arquétipo'
					}
					currentValue={''}
					handleChange={(id) => handleIdChangePrimary(id)}
				/>
				<Select
					items={SecondaryArchetypes}
					withIdValue={true}
					label="Arquétipo secundário"
					placeholder={
						selectArchetypeSecondary
							? selectArchetypeSecondary
							: 'Escolha seu arquétipo'
					}
					currentValue={''}
					handleChange={(id) => handleIdChangeSecondary(id)}
				/>
			</S.Select>
		</S.Container>
	)
}
