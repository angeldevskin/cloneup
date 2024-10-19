/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { RadioGroup } from '../../../../components/RadioGroup'
import * as S from './styles'

interface Option {
	value: string
	label: string
}

interface RadioOptionsProps {
	options: Option[]
	defaultValue: string
	onChange: (value: string) => void
	isFlex?: boolean
}

export function RadioOptions({
	options,
	defaultValue,
	onChange,
	isFlex = false
}: RadioOptionsProps) {
	const [visualization, setVisualization] = useState(defaultValue)

	const handleChange = (value: string) => {
		setVisualization(value)
		onChange(value)
	}

	return (
		<S.Container isFlexRadios={isFlex}>
			<RadioGroup
				isFlex={isFlex}
				defaultValue={visualization}
				options={options}
				currentValue={visualization}
				handleChange={handleChange}
			/>
		</S.Container>
	)
}
