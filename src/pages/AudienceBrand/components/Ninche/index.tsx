/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Select } from '../../../../components/Select'
import { Ninchos } from '../../../Codes/configs/NincheTypes'
import * as S from './styles'

export function Ninche() {
	const [selectNinche, setSelectNinche] = useState<string>('')
	const [selectSubninche, setSelectSubninche] = useState<string>('')
	const [subninches, setSubninches] = useState<any[]>([])
	const [isSubnincheDisabled, setIsSubnincheDisabled] = useState<boolean>(true)

	function handleIdChangePrimary(id: string) {
		const selectedNinche = Ninchos.find((item: any) => item.id === id)
		if (selectedNinche) {
			setSelectNinche(selectedNinche.name)
			setSubninches(selectedNinche.subNincho || [])
			setSelectSubninche('')
			setIsSubnincheDisabled(selectedNinche.subNincho.length === 0)
			console.log(selectedNinche.name)
		}
	}

	function handleIdChangeSecondary(id: string) {
		const selectedSubninche = subninches.find((item) => item.id === id)
		if (selectedSubninche) {
			setSelectSubninche(selectedSubninche.name)
			console.log(selectedSubninche.name)
		}
	}

	return (
		<S.Container>
			<S.Select>
				<Select
					items={Ninchos}
					withIdValue={true}
					label="Nincho"
					placeholder={selectNinche ? selectNinche : 'Escolha seu nincho'}
					currentValue={''}
					handleChange={handleIdChangePrimary}
				/>
				<Select
					items={subninches}
					withIdValue={true}
					label="Subnincho"
					placeholder={
						selectSubninche ? selectSubninche : 'Escolha seu subnincho'
					}
					currentValue={''}
					handleChange={handleIdChangeSecondary}
					isDisabled={isSubnincheDisabled}
				/>
			</S.Select>
		</S.Container>
	)
}
