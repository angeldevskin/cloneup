/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import * as S from './styles'
import { Select } from '../../../../components/Select'

export function Age() {
	const [selectAgePrimary, setSelectAgePrimary] = useState<string>('')
	const [selectAgeSecondary, setSelectAgeSecondary] = useState<string>('')

	function handleAgeChange(id: string) {
		setSelectAgePrimary(id)
	}

	function handleAgeChange2(id: string) {
		setSelectAgeSecondary(id)
	}
	const ageOptions = Array.from({ length: 65 }, (_, i) => ({
		id: (i + 1).toString(),
		name: (i + 1).toString(),
		value: (i + 1).toString()
	}))

	const ageOptions2 = Array.from({ length: 65 }, (_, i) => ({
		id: (i + 1).toString(),
		name: (i + 1).toString(),
		value: (i + 1).toString()
	}))

	return (
		<S.Container>
			<h2>Idade</h2>
			<>
				<S.Select>
					<Select
						items={ageOptions}
						withIdValue={true}
						placeholder={selectAgePrimary ? selectAgePrimary : '18'}
						currentValue={''}
						handleChange={handleAgeChange}
					/>
					<Select
						items={ageOptions2}
						withIdValue={true}
						placeholder={selectAgeSecondary ? selectAgeSecondary : '65+'}
						currentValue={''}
						handleChange={handleAgeChange2}
					/>
				</S.Select>
			</>
		</S.Container>
	)
}
