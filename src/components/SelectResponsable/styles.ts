import { Content, SelectItem as Item, Trigger } from '@radix-ui/react-select'
import styled from 'styled-components'

export const TriggerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;
`

export const SelectTrigger = styled(Trigger)`
	gap: 0.5rem;
	padding: 0.5rem;

	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;

	background: transparent;
	border: 1px solid #cdd2d5;
	color: #85959e;

	cursor: pointer;
	outline: none;
	border-radius: 8px;

	&.disabled {
		pointer-events: none;
		background: #efefef;
	}
	transition: background-color color 0.3s ease-in-out;

	svg {
		color: #212121;
	}

	&[data-state='open'] {
		border: 1px solid #009ef7;

		svg {
			transform: rotate(180deg);
			transition-duration: 0.3s;
		}
	}
`

export const SelectContent = styled(Content)`
	overflow: hidden;
	background-color: #ffffff;
	border-radius: 8px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

	z-index: 1000;

	padding: 0 0.5rem;

	min-width: 250px;
	margin-top: 0.5rem;
`

export const SelectItem = styled(Item)`
	display: flex;
	align-items: center;

	font-size: 0.875rem;
	text-overflow: ellipsis;

	color: #212121;
	margin: 0.5rem 0;

	position: relative;

	overflow: hidden;
	cursor: pointer;

	padding: 0.5rem;

	border-radius: 8px;

	&[data-disabled] {
		background-color: #009ef7;
		color: #ffffff;
		pointer-events: none;
	}

	&[data-highlighted] {
		outline: none;
		background-color: #009ef7;
		color: #ffffff;
	}
`
