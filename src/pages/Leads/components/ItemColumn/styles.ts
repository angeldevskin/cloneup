import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ $isdragging: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	border-radius: 8px;
	background: #ffffff;
	padding: 1rem 0.5rem;
	border: 1px solid #cdd2d5;

	width: 100%;

	cursor: grab;

	${({ $isdragging }) =>
		$isdragging &&
		css`
			opacity: 0.5;
		`}
`

export const HeaderCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	margin-bottom: 0.5rem;

	div {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.5rem;

		width: 100%;

		strong {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	button {
		background: #f2f2f3;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.2rem;
		border-radius: 8px;
		border: none;
		cursor: pointer;

		transition: background 0.2s ease-in-out;
		&:hover {
			opacity: 0.7;
		}
	}
`

export const ItemCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 0.5rem;
	background: transparent;

	font-size: 0.8rem;
	color: #444f55;

	width: 100%;
	height: 100%;

	svg {
		width: 0.875rem;
		height: 0.875rem;
	}

	span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;
		gap: 0.5rem;

		.whatsappbutton {
			display: flex;
			align-items: center;
			justify-content: center;
			border: none;
			border-radius: 8px;
			width: 1.5rem;
			height: 1.5rem;
			cursor: pointer;
			background: #f2f2f3;

			&:disabled {
				cursor: not-allowed;
			}

			svg {
				width: 1rem;
				height: 1rem;
				color: #25d366;
			}
		}
	}
`

export const Divider = styled.div`
	display: block;
	width: 100%;
	height: 1px;
	background: #f2f2f3;
`

export const ActionsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	gap: 1rem;

	background: #ffffff;

	width: 10rem;
	padding: 0.5rem;

	border-radius: 8px;

	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);

	.customButton {
		border: none;
		outline: none;
		background: transparent;
		align-items: center;
		display: flex;
		justify-content: flex-start;
		gap: 0.5rem;

		&:disabled {
			cursor: not-allowed;
			pointer-events: none;

			opacity: 0.5;
		}

		transition: opacity 0.2s ease-in-out;
		&:hover {
			opacity: 0.5;
		}
	}
`
