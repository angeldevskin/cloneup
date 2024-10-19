import { useState } from 'react'
import { Select } from '../../../../components/Select'
import * as S from './styles'
import {
	EducationLevels,
	MaritalStatuses
} from '../../../Codes/configs/EducationTypes'

export function Education() {
	const [selectEducationLevel, setSelectEducationLevel] = useState<string>('')
	const [selectCivilStatus, setSelectCivilStatus] = useState<string>('')

	function handleEducationLevelChange(id: string) {
		const educationLevel = EducationLevels.find((item) => item.id === id)
		if (educationLevel) {
			setSelectEducationLevel(educationLevel.name)
		}
	}

	function handleCivilStatusChange(id: string) {
		const civilStatus = MaritalStatuses.find((item) => item.id === id)
		if (civilStatus) {
			setSelectCivilStatus(civilStatus.name)
		}
	}

	return (
		<S.Container>
			<S.Select>
				<Select
					items={EducationLevels}
					withIdValue={true}
					label="Escolaridade"
					placeholder={
						selectEducationLevel
							? selectEducationLevel
							: 'Escolha sua escolaridade'
					}
					currentValue={''}
					handleChange={handleEducationLevelChange}
				/>
				<Select
					items={MaritalStatuses}
					withIdValue={true}
					label="Estado Civil"
					placeholder={
						selectCivilStatus ? selectCivilStatus : 'Escolha seu estado civil'
					}
					currentValue={''}
					handleChange={handleCivilStatusChange}
				/>
			</S.Select>
		</S.Container>
	)
}
