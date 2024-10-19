import {
	Content,
	Item,
	Separator,
	Trigger
} from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;

	width: 100%;

	background: #ffffff;

	padding: 1rem 2rem;
	height: 5rem;
`

export const ContentWrapper = styled(Content)`
	background: #ffffff;
	border-radius: 8px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	padding: 0.5rem;
	min-width: 18rem;
`

export const SeparatorWrapper = styled(Separator)`
	height: 1px;
	background: #d0d5dd;
	margin: 0.5rem 0;
`

export const ProfileWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 0.5rem;

	.profile {
		background: #009ef7;
		border-radius: 50%;
		text-align: center;
		color: #ffffff;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`

export const DropdownTrigger = styled(Trigger)`
	display: flex;
	align-items: center;
	cursor: pointer;
	border: none;

	background: transparent;
	outline: none;

	transition: opacity 0.2s ease-in-out;
	&:hover {
		opacity: 0.5;
	}

	&[data-state='open'] {
		svg {
			transform: rotate(180deg);
		}
	}
`

export const DropdownItem = styled(Item)`
	display: flex;
	align-items: center;
	padding: 0.5rem;
	gap: 0.5rem;
	border-radius: 8px;
	cursor: pointer;
	outline: none;

	position: relative;

	transition: background-color 0.2s ease-in-out;
	&:hover {
		background: #d2efff;
	}

	span {
		font-size: 0.875rem;
		font-weight: lighter;
	}

	&[data-state='disabled'] {
		opacity: 0.5;
		cursor: not-allowed;
	}
`
