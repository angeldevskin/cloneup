import styled from 'styled-components'

export const AcessWrapper = styled.section`
	@media (max-width: 768px) {
		padding: 0 2rem;
	}

	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;

	gap: 1rem;

	form {
		width: 100%;
		display: flex;
		flex-direction: column;

		gap: 1rem;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
	}

	a {
		text-decoration: none;
		color: #009ef7;

		transition: background-color 0.5s;
		&:hover {
			opacity: 0.9;
		}
	}
`
