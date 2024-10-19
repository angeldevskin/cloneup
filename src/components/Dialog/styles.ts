import { Content, Overlay, Trigger } from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const DialogOverlay = styled(Overlay)`
	position: fixed;
	inset: 0;
	background: rgba(0 0 0 / 0.5);

	z-index: 1000;

	overflow: auto;
`

export const DialogTrigger = styled(Trigger)`
	border: none;
	background: transparent;
`

export const DialogContent = styled(Content)<{ maxwidth?: number }>`
	background: #ffffff;
	border-radius: 8px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	max-width: ${({ maxwidth }) => (maxwidth ? `${maxwidth}px` : '500px')};
	max-height: 85vh;

	z-index: 1001;

	overflow: auto;

	outline: none;

	padding: 1.5rem;

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
