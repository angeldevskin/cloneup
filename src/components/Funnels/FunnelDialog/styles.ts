import { Content } from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const DialogContent = styled(Content)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;

	padding: 1rem;
	border-radius: 8px;

	margin: 0.5rem;
	z-index: 1000;

	position: absolute;
	right: 0;
	top: 0;

	overflow: auto;

	min-width: 25rem;
	max-height: 98vh;

	background: #ffffff;

	[aria-label='title'] {
		margin: 0;
		font-weight: bold;
		font-size: 1.25rem;
	}

	[aria-label='close'] {
		border: none;
		background: transparent;
		outline: none;

		display: inline-flex;

		cursor: pointer;

		transition: opacity 0.3s ease-in-out;
		&:hover {
			opacity: 0.7;
		}
	}
`
