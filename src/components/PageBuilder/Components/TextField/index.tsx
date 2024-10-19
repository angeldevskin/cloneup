import { TextFieldTypeEditor } from '../../../../@types/components/textfieldeditor'
import * as S from './styles'

export function TextField({
	icon,
	iconPosition = 'left',
	$fullwidth: $fullwidth = false,
	$borderPrompt: $borderPrompt = false,
	...props
}: TextFieldTypeEditor) {
	return (
		<S.Wrapper>
			<S.TextFieldWrapper $fullwidth={$fullwidth} $borderPrompt={$borderPrompt}>
				{!!icon && <S.Icon $iconPosition={iconPosition}>{icon}</S.Icon>}
				<S.Input defaultValue={props.defaultValue || ''} {...props} />
			</S.TextFieldWrapper>
		</S.Wrapper>
	)
}
