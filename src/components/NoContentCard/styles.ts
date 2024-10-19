import styled from 'styled-components'

export const NoContentCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;

	margin-top: 4rem;
	text-align: center;

	strong {
		font-size: 1.2rem;
		font-weight: bold;
		color: #444f55;
		margin-top: 1.5rem;
	}

	img {
		width: 10rem;
		height: 10rem;
	}

	p {
		font-size: 0.875rem;
		color: #14252f;
		margin-top: 0.6rem;
	}

	button {
		margin: 0 auto;
		margin-top: 1.2rem;
		padding: 0.5rem 1.3rem;
	}
`
