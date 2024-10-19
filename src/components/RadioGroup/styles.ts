import { Indicator, Item } from '@radix-ui/react-radio-group'
import styled from 'styled-components'

export const CustomItem = styled(Item)`
	width: 20px;
	height: 20px;
	border-radius: 50%;

	background: #ffffff;
	border: 1px solid #d0d5dd;
`

export const RadioWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;

	margin: 0.5rem 0;
	padding: 0.5rem;

	border-radius: 8px;
	cursor: pointer;

	&:first-of-type {
		margin-top: 0;
	}

	&:last-of-type {
		margin-bottom: 0;
	}

	> label {
		width: 80%;
		text-align: right;

		cursor: pointer;
	}

	&:hover {
		background: #d2efff;
	}

	&:has(${CustomItem}[data-state='checked']) {
		background: #d2efff;
	}
`

export const CustomIndicator = styled(Indicator)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: relative;

	&::after {
		content: '';
		display: block;
		border: 5px solid #009ef7;
		border-radius: 50%;
	}
`
