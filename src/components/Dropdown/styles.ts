import { Content, Item, Trigger } from '@radix-ui/react-dropdown-menu'
import styled, { css } from 'styled-components'

export const DropdownItem = styled(Item)<{ $actionType: 'danger' | 'default' }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	user-select: none;
	width: 100%;
	overflow: hidden;

	outline: none;
	cursor: pointer;

	padding: 0.5rem;
	gap: 0.5rem;

	svg {
		width: 1rem;
		height: 1rem;
	}

	&[data-highlighted] {
		background: #e9e9e9;
	}

	${({ $actionType }) => css`
		${$actionType === 'danger' &&
		css`
			color: #ff0000;
		`}

		${$actionType === 'default' &&
		css`
			color: #212121;
		`}
	`}
`

export const DropdownTrigger = styled(Trigger)`
	border: none;
	outline: none;
	background: transparent;

	border-radius: 8px;

	&[data-state='open'] {
		svg {
			transform: rotate(180deg);
		}
	}
`

export const DropdownContent = styled(Content)`
	min-width: 200px;
	background: #ffffff;
	overflow: hidden;

	border-radius: 8px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

	display: flex;
	flex-direction: column;

	z-index: 20;
`
