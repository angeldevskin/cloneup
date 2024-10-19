import { Check } from 'lucide-react'

import * as S from './styles'

type TableCheckProps = {
	check?: boolean
	onChange: (event: unknown) => void
	onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

export function TableCheck({ check, onChange, onClick }: TableCheckProps) {
	return (
		<S.Wrapper>
			<S.CheckBoxRoot
				checked={check}
				onCheckedChange={onChange}
				onClick={() => onClick}
			>
				<S.CheckBoxIndicator>
					<Check />
				</S.CheckBoxIndicator>
			</S.CheckBoxRoot>
		</S.Wrapper>
	)
}
