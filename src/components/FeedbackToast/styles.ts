import * as Toast from '@radix-ui/react-toast'
import styled from 'styled-components'

export const CustomViewport = styled(Toast.Viewport)`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	z-index: 1;
	outline: none;
`

export const CustomRoot = styled(Toast.Root)`
	background-color: #ffffff;
	border-radius: 8px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	padding: 0.5rem 1rem;
	margin: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;

	&[data-state='open'] {
		animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	&[data-state='closed'] {
		animation: hide 100ms ease-in;
	}

	&[data-swipe='move'] {
		transform: translateX(var(--radix-toast-swipe-move-x));
	}

	&[data-swipe='end'] {
		animation: swipeOut 100ms ease-out;
	}

	@keyframes hide {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateX(calc(100% + var(--viewport-padding)));
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes swipeOut {
		from {
			transform: translateX(var(--radix-toast-swipe-end-x));
		}
		to {
			transform: translateX(calc(100% + var(--viewport-padding)));
		}
	}

	svg {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

export const CustomTitle = styled(Toast.Title)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	gap: 0.5rem;
`
