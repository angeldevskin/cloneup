import styled, { css } from 'styled-components'

type IconPositionProps = { $iconPosition: 'left' | 'right' }

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;

	width: 100%;

	gap: 0.5rem;
	svg {
		cursor: default;
	}
`

export const Icon = styled.div<IconPositionProps>`
	${({ $iconPosition }) => css`
		display: flex;
		width: auto;
		height: 100%;
		order: ${$iconPosition === 'left' ? 0 : 1};

		cursor: pointer;

		svg {
			width: 100%;
			color: #667085;

			transition: color 0.5s;
			&:hover {
				opacity: 0.9;
			}
		}
	`}
`

export const TextFieldWrapper = styled.div<{
	$fullwidth: boolean
	$borderPrompt: boolean
}>`
	display: flex;
	width: ${({ $fullwidth }) => $fullwidth && '100%'};
	align-items: center;
	justify-content: center;
	background: transparent;
	border-radius: 8px;
	border: ${({ $borderPrompt }) =>
		$borderPrompt ? '1px solid #F2F2F3' : '1px solid #cdd2d5'};

	padding: 0.5rem;

	&:focus-within {
		border: 1px solid #009ef7;
	}

	&:has(input:disabled) {
		background: #f5f5f5;
	}
`

export const Input = styled.input`
	background: transparent;
	border: 0;
	outline: none;
	width: 100%;
	padding-left: 0px !important;

	padding: 0 0.5rem;
	color: #212121;

	&:disabled {
		color: #667085;
		cursor: not-allowed;
	}
`
