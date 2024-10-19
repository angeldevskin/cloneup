import styled from 'styled-components'

export const Wrapper = styled.section`
	display: flex;
	flex-direction: column;

	padding: 2rem;
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;

	align-items: flex-end;
	justify-content: center;

	margin: 1rem 0;
	border-radius: 8px;
	padding: 0.5rem;

	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
`

export const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
`

export const NewFunnelTrigger = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	background: #009ef7;
	color: #ffffff;

	padding: 0.5rem 2rem;
	cursor: pointer;

	border-radius: 8px;

	transition: background-color 0.5s color 0.5s;
	&:hover {
		opacity: 0.9;
	}
`
