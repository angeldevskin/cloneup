import { Handle } from 'reactflow'
import styled from 'styled-components'

export const Wrapper = styled.div`
	width: 100px;
	height: 100px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background: #ffffff;
	border-radius: 50%;

	border: 1px solid #d9d9d9;

	span {
		font-size: 0.875rem;
		color: #dadadd;
	}

	img {
		width: 3rem;
		height: 3rem;
	}

	transition: border 0.3s ease-in-out;
	&:hover {
		border: 1px solid #009ef7;
	}

	&[data-state='placeholder'] {
		background: #d6d6d6;
		color: #85959e;
	}
`

export const CustomHandle = styled(Handle)`
	width: 10px;
	height: 10px;
	background: #009ef7;
	border: none;
`

export const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	gap: 0.5rem;

	position: fixed;
	top: 0;
	right: 0;

	margin-top: -3rem;
	border: none;

	.checkoutAction {
		display: flex;
		background: #ffffff;
		outline: none;
		border: none;

		border-radius: 8px;

		padding: 0.5rem;

		svg {
			width: 20px;
			height: 20px;

			margin: 0;
			padding: 0;
		}

		:hover {
			opacity: 0.7;
		}

		&[data-state='desctruction'] {
			background: #ffbea8;
			color: #fe2f11;

			svg {
				color: #fe2f11;
			}
		}

		&[data-state='regular'] {
			background: #009ef7;
			color: #ffffff;
			font-weight: normal;
		}
	}
`

export const Infos = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	position: fixed;
	bottom: 0;
	right: 0;

	font-size: 0.8rem;

	width: 100%;

	margin-bottom: -2rem;

	span {
		color: #212121;
		font-weight: bold;
	}
`
