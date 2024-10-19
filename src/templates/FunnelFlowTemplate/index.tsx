import { ReactNode } from 'react'

// import { CustomSidebar } from '../../components/CustomSidebar'
import * as S from './styles'

export function FunnelFlowTemplate({ children }: { children: ReactNode }) {
	return (
		<S.Wrapper>
			{/* <CustomSidebar /> */}
			<div>{children}</div>
		</S.Wrapper>
	)
}
