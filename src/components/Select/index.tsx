import { ItemText, Portal, Root, Value, Viewport } from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

import * as S from './styles'

type SelectType = {
	label?: string
	placeholder?: string
	width?: number
	handleChange: (value: string) => void
	currentValue?: string
	items?: Array<{
		name: string
		id: string
		value: string
	}>
	withIdValue?: boolean
	isDisabled?: boolean
	defaultValue?: string
}

export function Select({
	label = '',
	currentValue,
	placeholder = '',
	width,
	items,
	withIdValue = false,
	isDisabled = false,
	defaultValue = '',
	handleChange
}: SelectType) {
	return (
		<Root
			defaultValue={defaultValue}
			value={currentValue}
			onValueChange={handleChange}
		>
			<S.TriggerContainer>
				{!!label && <label>{label}</label>}
				<S.SelectTrigger
					className={isDisabled ? 'disabled' : ''}
					aria-label={label}
					width={width}
				>
					<Value placeholder={placeholder ?? ''} />
					<ChevronDown />
				</S.SelectTrigger>
			</S.TriggerContainer>
			<Portal>
				<S.SelectContent align="start" position="popper" width={width}>
					<Viewport
						style={{
							width: '95%',
							maxHeight: '300px',
							overflowY: 'scroll'
						}}
					>
						{items &&
							!withIdValue &&
							items.map(({ id, name, value }) => (
								<S.SelectItem
									key={id}
									value={value}
									disabled={currentValue === value}
								>
									<ItemText>{name}</ItemText>
								</S.SelectItem>
							))}
						{items &&
							withIdValue &&
							items.map(({ id, name, value }, i) => (
								<S.SelectItem
									key={i}
									value={id}
									disabled={currentValue === value}
								>
									<ItemText>{name}</ItemText>
								</S.SelectItem>
							))}
					</Viewport>
				</S.SelectContent>
			</Portal>
		</Root>
	)
}
