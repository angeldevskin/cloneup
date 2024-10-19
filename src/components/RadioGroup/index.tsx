import * as RadixRadio from '@radix-ui/react-radio-group'

import { Close } from '@radix-ui/react-popover'
import * as S from './styles'

type RadioGroupProps = {
	defaultValue: string
	options: {
		value: string
		label: string
	}[]
	currentValue: string
	handleChange: (value: string) => void
	isFlex?: boolean
}

export function RadioGroup({
	defaultValue,
	options,
	currentValue,
	handleChange,
	isFlex = false
}: RadioGroupProps) {
	return (
		<RadixRadio.Root
			defaultValue={defaultValue}
			value={currentValue}
			onValueChange={handleChange}
			className={isFlex ? 'flexRadio' : ''}
		>
			{options.map((option, index) => (
				<Close asChild key={index}>
					<S.RadioWrapper onClick={() => handleChange(option.value)}>
						<S.CustomItem value={option.value} id={option.value}>
							<S.CustomIndicator />
						</S.CustomItem>
						<label htmlFor={option.value}>{option.label}</label>
					</S.RadioWrapper>
				</Close>
			))}
		</RadixRadio.Root>
	)
}
