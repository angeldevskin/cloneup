import { ReactNode } from 'react'

import * as S from './styles'

import { CustomSidebar } from '../../components/CustomSidebar'
import { Header } from '../../components/Header'

export function MainTemplate({ children }: { children: ReactNode }) {
	return (
		<S.Wrapper>
			<CustomSidebar />
			<div>
				<Header />
				{children}
			</div>
		</S.Wrapper>
	)
}
