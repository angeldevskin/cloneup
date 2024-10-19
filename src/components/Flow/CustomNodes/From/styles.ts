import { Handle } from 'reactflow'
import styled from 'styled-components'

export const Wrapper = styled.div`
	width: 100px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #ffffff;
	border-radius: 50%;
	border: 1px solid #d9d9d9;

	transition: border 0.3s ease-in-out;
	&:hover {
		border: 1px solid #009ef7;
	}

	&[data-state='instagram'] {
		background: #c13584;
	}

	&[data-state='google-ads'] {
		background: #4f8ef5;
	}

	&[data-state='meta-ads'],
	&[data-state='facebook'] {
		background: #1877f2;
	}

	&[data-state='youtube'] {
		background: #e90000;
	}

	&[data-state='manual-ads'] {
		background: #444f55;
	}

	&[data-state='mailchimp'] {
		background: #ffe01b;
	}

	&[data-state='activeCampaign'] {
		background: #004cff;
	}

	&[data-state='whatsapp'] {
		background: #25d366;
	}

	&[data-state='telegram'] {
		background: #0088cc;
	}

	&[data-state='tiktok'],
	&[data-state='tiktok-ads'],
	&[data-state='x'] {
		background: #000000;
	}

	img {
		width: 3rem;
		height: 3rem;
		color: #ffffff;
	}
`

export const Ticket = styled.div`
	padding: 0.2rem 0.5rem;
	border-radius: 8px;

	&[data-state='google-ads'],
	&[data-state='meta-ads'],
	&[data-state='tiktok-ads'],
	&[data-state='manual-ads'] {
		background: #fce0c0;
	}

	&[data-state='facebook'],
	&[data-state='instagram'],
	&[data-state='youtube'],
	&[data-state='tiktok'],
	&[data-state='x'] {
		background: #d2efff;
	}

	&[data-state='mailchimp'],
	&[data-state='activeCampaign'],
	&[data-state='whatsapp'],
	&[data-state='telegram'] {
		background: #e2f7e5;
	}
`

export const CustomHandle = styled(Handle)`
	width: 15px;
	height: 15px;
	background: #009ef7;
`

export const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	position: fixed;
	top: 0;
	right: 0;

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

export const Infos = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 0;
	gap: 0.5rem;
	margin-bottom: -4rem;

	text-align: center;

	color: #212121;

	span {
		font-size: 0.8rem;
	}
`
