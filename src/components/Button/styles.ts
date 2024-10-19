import styled, { css } from 'styled-components'
import { ButtonType } from '../../@types/components/button'

const buttonModifiers = {
	fit: () => css`
		background: #009ef7;
		border: 1px solid #009ef7;
		color: #ffffff;
		width: max-content;
		padding: 0.5rem 1rem;
		margin-left: auto;
	`,
	filled: () => css`
		background: #009ef7;
		border: 1px solid #009ef7;
		color: #ffffff;
	`,
	secondary: () => css`
		background: #009ef7;
		border: 1px solid #009ef7;
		color: #ffffff;

		opacity: 0.5;
	`,
	ghost: () => css`
		background: #ffffff;
		border: 1px solid #cdd2d5;
		color: #212121;

		&:hover {
			opacity: 0.7;
		}
	`,
	text: () => css`
		background: transparent;
		border: transparent;
		color: #212121;
		padding: 0.5rem 0.5rem;
		border: 1px solid transparent;

		transition: background-color color 0.3s ease-in-out;
		&:hover {
			background: #f5f5f5;
			border: 1px solid #f5f5f5;
			opacity: 0.9;
		}
	`,
	success: () => css`
		color: #ffffff;
		background: #29cb39;

		border: 1px solid #29cb39;
	`,
	danger: () => css`
		border: 1px solid #ffc7c7;
		background: transparent;
		color: #ff6969;
		background: #ffc7c7;
	`,
	grey: () => css`
		background: #f2f2f3;
		border: none !important;
		font-size: 14px !important;
		font-weight: 400 !important;
		padding: 0.4em;
		padding-left: 20px;
		padding-right: 15px;
	`,
	fullwidth: () => css`
		width: 100%;
	`
}

type ButtonPropsRequired = Pick<ButtonType, 'shape' | '$fullwidth'>
export const ButtonWrapper = styled.button<ButtonPropsRequired>`
	${({ shape, $fullwidth }) => css`
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 0.5rem;

		padding: 0.5rem 2rem;
		cursor: pointer;

		border-radius: 8px;

		transition: background-color 0.5s color 0.5s;
		&:hover {
			opacity: 0.9;
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		${!!shape && buttonModifiers[shape]};
		${!!$fullwidth && buttonModifiers.fullwidth};
	`}
`
