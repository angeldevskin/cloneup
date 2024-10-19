import { Content } from '@radix-ui/react-tooltip'
import styled from 'styled-components'

export const TooltipContent = styled(Content)`
	display: flex;
	align-items: center;
	justify-content: center;

	background: #ffffff;
	padding: 0.3rem;
	border-radius: 5px;
	font-size: 0.7rem;

	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

	z-index: 9999;

	&[data-state='delayed-open'][data-side='top'] {
		animation-name: slideDownAndFade;
	}
	&[data-state='delayed-open'][data-side='right'] {
		animation-name: slideLeftAndFade;
	}
	&[data-state='delayed-open'][data-side='bottom'] {
		animation-name: slideUpAndFade;
	}
	&[data-state='delayed-open'][data-side='left'] {
		animation-name: slideRightAndFade;
	}
`
