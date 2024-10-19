import { Handle } from 'reactflow'
import styled from 'styled-components'

export const Wrapper = styled.div`
	width: 100px;
	height: 100px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	border-radius: 50%;
	border: 1px solid #d9d9d9;

	transition: border 0.3s ease-in-out;
	&:hover {
		border: 1px solid #009ef7;
	}

	&[data-state='mailchimp'] {
		background: #ffe01b;
	}

	&[data-state='active-campaign'] {
		background: #004cff;
	}

	&[data-state='placeholder'] {
		background: #d6d6d6;
		color: #85959e;
	}

	img {
		width: 3rem;
		height: 3rem;
	}
`

export const CustomHandle = styled(Handle)`
	width: 10px;
	height: 10px;
	background: #009ef7;
	border: none;
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

	font-size: 0.5rem;

	width: 100%;

	margin-bottom: -3rem;

	color: #212121;

	span {
		font-size: 0.5rem;
		font-weight: bold;
	}
`

export const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	position: fixed;
	top: 0;

	width: 100%;

	margin-top: -2rem;

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ffffff;
		outline: none;
		border: none;
		width: 30px;
		height: 30px;

		border-radius: 8px;

		padding: 0.5rem;

		svg {
			width: 20px;
			height: 20px;
		}

		:hover {
			opacity: 0.7;
		}

		&[data-state='regular'] {
			background: #009ef7;
			color: #ffffff;
		}

		&[data-state='desctruction'] {
			background: #ffbea8;
			color: #fe2f11;
		}

		&[data-state='copied'] {
			background: #b8fadd;
			color: #1acd81;
		}
	}
`
