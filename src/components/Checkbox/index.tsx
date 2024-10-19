import { Check } from 'lucide-react'

import * as S from './styles'

type CheckboxProps = {
	label?: string
	defaultChecked?: boolean
	check?: boolean
	onChange: () => void
}

export function Checkbox({
	label,
	defaultChecked = false,
	check = false,
	onChange
}: CheckboxProps) {
	return (
		<S.Wrapper>
			<S.CheckBoxRoot
				id={label}
				defaultChecked={defaultChecked}
				checked={check}
				onCheckedChange={onChange}
			>
				<S.CheckBoxIndicator>
					<Check />
				</S.CheckBoxIndicator>
			</S.CheckBoxRoot>
			<label htmlFor={label}>{label}</label>
		</S.Wrapper>
	)
}
