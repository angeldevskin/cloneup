import * as RadixHoverCard from '@radix-ui/react-hover-card'
import styled from 'styled-components'

export const Content = styled(RadixHoverCard.Content)`
	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
	border-radius: 8px;
	position: relative;
`

export const Arrow = styled(RadixHoverCard.Arrow)<{ background: string }>`
	fill: ${({ background }) => background};
`
