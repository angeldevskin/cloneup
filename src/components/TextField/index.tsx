import { TextFieldType } from '../../@types/components/textfield'

import * as S from './styles'

export function TextField({
	label = '',
	errorMessage = '',
	icon,
	iconPosition = 'left',
	$fullwidth: $fullwidth = false,
	register,
	name,
	...props
}: TextFieldType) {
	return (
		<S.Wrapper>
			{!!label && <S.Label>{label}</S.Label>}
			<S.TextFieldWrapper $fullwidth={$fullwidth}>
				{!!icon && <S.Icon $iconPosition={iconPosition}>{icon}</S.Icon>}
				<S.Input
					defaultValue={props.defaultValue || ''}
					{...register(name)}
					{...props}
				/>
			</S.TextFieldWrapper>
			{!!props.$smallText && <S.Small>{props.$smallText}</S.Small>}
			{!!errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
		</S.Wrapper>
	)
}
