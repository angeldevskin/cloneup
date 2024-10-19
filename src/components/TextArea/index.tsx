import { FormEvent } from 'react'
import { TextFieldType } from '../../@types/components/textfield'

import * as S from './styles'

export function TextArea({
	label = '',
	icon,
	iconPosition = 'left',
	$fullwidth: $fullwidth = false,
	register,
	name,
	...props
}: TextFieldType) {
	function grow(event: FormEvent<HTMLTextAreaElement>) {
		const element = event?.target as HTMLElement
		element.style.height = '5px'
		element.style.height = element.scrollHeight + 'px'
	}

	return (
		<S.Wrapper>
			{!!label && <S.Label>{label}</S.Label>}
			<S.TextFieldWrapper $fullwidth={$fullwidth}>
				{!!icon && <S.Icon $iconPosition={iconPosition}>{icon}</S.Icon>}
				<S.Textarea
					readOnly={props.readOnly ? true : false}
					defaultValue={props.defaultValue ? props.defaultValue : ''}
					onInput={grow}
					{...register(name)}
					placeholder={props.placeholder}
				>
					{props.value}
				</S.Textarea>
			</S.TextFieldWrapper>
		</S.Wrapper>
	)
}
