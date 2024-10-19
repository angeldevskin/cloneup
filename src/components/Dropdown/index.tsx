import { Portal, Root } from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'

import * as S from './styles'

export type DropdownType = {
	triggerIcon?: JSX.Element
	items: Array<{
		title: string
		icon?: JSX.Element
		action: () => void
		$actionType: 'danger' | 'default'
	}>
}

export function DropdownRoot({ triggerIcon, items }: DropdownType) {
	return (
		<Root>
			<S.DropdownTrigger>
				<div style={{ display: 'flex', alignContent: 'center' }}>
					{triggerIcon ? triggerIcon : <ChevronDown strokeWidth={1} />}
				</div>
			</S.DropdownTrigger>
			<Portal>
				<S.DropdownContent align="end">
					{items.map(({ title, action, icon, $actionType }) => (
						<S.DropdownItem
							key={title}
							onClick={action}
							$actionType={$actionType}
						>
							{!!icon && icon}
							<span>{title}</span>
						</S.DropdownItem>
					))}
				</S.DropdownContent>
			</Portal>
		</Root>
	)
}
