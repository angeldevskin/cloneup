import { Indicator, Root } from '@radix-ui/react-checkbox'
import styled from 'styled-components'

export const CheckBoxRoot = styled(Root)`
	background: #ffffff;
	width: 20px;
	height: 20px;
	border-radius: 6px;
	padding: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	overflow: hidden;

	border: 1px solid #d0d5dd;

	&:hover {
		background: #d0d5dd;
	}
`

export const CheckBoxIndicator = styled(Indicator)`
	/* color: #009ef7; */

	display: flex;
	align-items: center;
	justify-content: center;

	overflow: hidden;

	svg {
		width: 16px;
		height: 16px;
	}

	button[data-state='checked'] & {
		color: #009ef7;
	}
`

export const Wrapper = styled.div`
	display: flex;
	align-items: center;

	gap: 0.5rem;

	label {
		color: #444f55;
	}
`
export const CheckBox = styled.input`
	&:checked {
		background-color: red;
	}
`
