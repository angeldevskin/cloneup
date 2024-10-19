import * as S from './styles'

import { ButtonType } from '../../@types/components/button'

export function Button({
	shape = 'filled',
	$fullwidth = false,
	...props
}: ButtonType) {
	return <S.ButtonWrapper {...props} shape={shape} $fullwidth={$fullwidth} />
}
