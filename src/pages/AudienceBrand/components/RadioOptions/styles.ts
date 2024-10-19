import styled, { css } from 'styled-components'

interface ContainerProps {
	isFlexRadios?: boolean
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: column;

	background: #ffffff;

	width: 15rem;
	padding: 1rem;

	border-radius: 8px;

	${(props) =>
		props.isFlexRadios &&
		css`
			width: inherit !important;
			padding: 12px 0px;
			[role='radiogroup'] {
				> div {
					justify-content: flex-start;
					width: auto;
					align-items: center;
					gap: 10px;
					padding-right: 18px;
				}
			}
		`}

	/* Adicionando estilização para os itens do RadioGroup */
	.radio-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem; /* Espaço entre os itens */

		.radio-option {
			display: flex;
			align-items: center;
			gap: 0.5rem; /* Espaço entre o botão e o label */
		}
	}
`
