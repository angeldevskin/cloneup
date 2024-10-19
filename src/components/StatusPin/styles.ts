import styled, { css } from 'styled-components'

const statusPinModifiers = {
	success: () => css`
		background: #e5f6de;

		span {
			&::before {
				display: inline-flex;
				content: '';

				border-radius: 50%;

				width: 10px;
				height: 10px;
				margin-right: 0.5rem;

				background: #8bca79;
			}
		}
	`,
	advice: () => css`
		background: #fce0c0;

		span {
			&::before {
				display: inline-flex;
				content: '';

				border-radius: 50%;

				width: 10px;
				height: 10px;
				margin-right: 0.5rem;

				background: #faa647;
			}
		}
	`,
	inProgress: () => css`
		background: #d2efff;

		span {
			&::before {
				display: inline-flex;
				content: '';

				border-radius: 50%;
				margin-right: 0.5rem;

				width: 10px;
				height: 10px;

				background: #009ef7;
			}
		}
	`,
	ia: () => css`
		background: #ffffff;
		border: 1px solid #cdd2d5;
	`
}

export const Container = styled.div<{
	type: 'success' | 'advice' | 'inProgress' | 'ia'
}>`
	${({ type }) => css`
		display: inline-flex;
		align-items: center;
		justify-content: center;

		border-radius: 8px;
		font-size: 0.875rem;

		padding: 0 0.5rem;

		color: #212121;

		span {
			align-items: center;
			justify-content: center;
			display: flex;
		}

		${!!type && statusPinModifiers[type]}
	`}
`
