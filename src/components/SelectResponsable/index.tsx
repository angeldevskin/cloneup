import { ItemText, Portal, Root, Value, Viewport } from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

import stars from '../../assets/stars.svg'

import { StatusPin } from '../StatusPin'
import * as S from './styles'

type SelectType = {
	handleChange: (value: string) => void
	defaultValue?: string
	currentValue?: string
	items?: Array<{
		name: string
		_id: string
		assistantManagerType: 'human' | 'ia'
	}>
}

export function SelectResponsable({
	items,
	handleChange,
	defaultValue,
	currentValue
}: SelectType) {
	return (
		<Root
			defaultValue={defaultValue}
			value={currentValue}
			onValueChange={handleChange}
		>
			<S.TriggerContainer>
				<S.SelectTrigger>
					<Value placeholder={'Não atribuído'} />
					<ChevronDown />
				</S.SelectTrigger>
			</S.TriggerContainer>
			<Portal>
				<S.SelectContent align="end" position="popper">
					<Viewport>
						{items &&
							items.map(({ _id, name, assistantManagerType }) => (
								<S.SelectItem key={_id} value={name}>
									<ItemText>
										{name}{' '}
										{assistantManagerType.toLowerCase() === 'ia' && (
											<StatusPin
												type="ia"
												message="IA"
												icon={<img src={stars} />}
											/>
										)}
									</ItemText>
								</S.SelectItem>
							))}
					</Viewport>
				</S.SelectContent>
			</Portal>
		</Root>
	)
}
