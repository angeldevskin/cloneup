import { ComponentProps, ReactElement } from 'react'

import * as S from './styles'

export type TextFieldType = {
	label?: string
	icon?: ReactElement
	$fullwidth?: boolean
	iconPosition?: 'left' | 'right'
	errorMessage?: string
	name: string
	$smallText?: string
} & ComponentProps<'input'>

export function TextFieldNatty({
	label = '',
	errorMessage = '',
	icon,
	iconPosition = 'left',
	$fullwidth: $fullwidth = false,
	...props
}: TextFieldType) {
	return (
		<S.Wrapper>
			{!!label && <S.Label>{label}</S.Label>}
			<S.TextFieldWrapper $fullwidth={$fullwidth}>
				{!!icon && <S.Icon $iconPosition={iconPosition}>{icon}</S.Icon>}
				<S.Input {...props} />
			</S.TextFieldWrapper>
			{!!props.$smallText && <S.Small>{props.$smallText}</S.Small>}
			{!!errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
		</S.Wrapper>
	)
}
