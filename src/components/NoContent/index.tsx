import { Info } from 'lucide-react'

import * as S from './styles'

export function NoContent({ message }: { message: string }) {
	return (
		<S.Wrapper>
			<Info />
			<span>{message}</span>
		</S.Wrapper>
	)
}
