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
		position: absolute;
		height: 100%;
		${$iconPosition}: 5px;
		cursor: pointer;
		top: 5px;

		svg {
			width: 100%;
			color: #85959e;
			stroke-width: 1px;
			transition: color 0.5s;
			&:hover {
				opacity: 0.9;
			}
		}
	`}
`

export const TextFieldWrapper = styled.div<{ $fullwidth: boolean }>`
	display: flex;
	width: ${({ $fullwidth }) => $fullwidth && '100%'};
	align-items: center;
	justify-content: center;
	background: transparent;
	border-radius: 8px;
	border: 1px solid #d7d5dd;
	position: relative;
	padding: 0.5rem;

	&:focus-within {
		border: 1px solid #009ef7;
	}

	&:has(input:disabled) {
		background: #f5f5f5;
	}
`

export const Textarea = styled.textarea`
	background: transparent;
	border: 0;
	outline: none;
	width: 100%;
	resize: none;
	padding: 0 0.5rem;
	color: #212121;
	font-size: 12px;
	min-height: 33px;
	&:disabled {
		color: #667085;
		cursor: not-allowed;
	}

	&::placeholder {
		font-size: 12px;
	}
`

export const Label = styled.label`
	color: #212121;
`

export const ErrorMessage = styled.span`
	font-size: 0.8rem;
	color: #ff6969;
`
