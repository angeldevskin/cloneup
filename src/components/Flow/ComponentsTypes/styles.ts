import styled from 'styled-components'

export const Wrapper = styled.div`
	border-radius: 8px;

	overflow: hidden;

	position: relative;

	transition: opacity 0.2s ease-in-out;
	&:hover {
		opacity: 0.6;
	}
`

export const Body = styled.div`
	display: flex;

	align-items: center;
	justify-content: center;

	svg {
		color: #009ef7;
		width: 2.5rem;
		height: 2.5rem;
	}
`
