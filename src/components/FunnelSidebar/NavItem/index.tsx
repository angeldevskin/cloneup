import { ReactNode } from 'react'

import * as S from './styles'

export type NavItemType = {
	icon: ReactNode
	path: string
	$isSelected: boolean
	title: string
}

export function NavItem({ title, icon, path, $isSelected }: NavItemType) {
	return (
		<S.NavItem to={path} $isSelected={$isSelected}>
			{icon}
			<span>{title}</span>
		</S.NavItem>
	)
}
