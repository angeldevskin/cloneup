import { Content, List, Trigger } from '@radix-ui/react-tabs'
import styled from 'styled-components'

export const TabList = styled(List)`
	display: flex;
	flex-direction: column;

	gap: 1rem;

	padding-right: 1rem;
`

export const TabsTrigger = styled(Trigger)`
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;

	color: #009ef7;

	padding: 1rem;
	border-radius: 8px;
	border: none;

	cursor: pointer;

	transition: background 0.2s ease-in-out;
	&:hover {
		background: #f5f5f5;
	}

	&[data-state='active'] {
		background: #d2efff;

		color: #009ef7;
	}
`

export const TabsContent = styled(Content)`
	width: 100%;
`
