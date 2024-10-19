import styled from 'styled-components'

export const Wrapper = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;

	align-items: start;
	justify-content: center;

	gap: 1.8rem;

	header {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.62rem;

		h1 {
			font-size: 2.6rem;
			font-weight: 300;
		}
	}

	form {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;

		input {
			text-align: center;

			border-radius: 8px;
			border: 1px solid #d7d5dd;
			max-width: 2rem;
			padding: 0.3rem 0.2rem;
		}
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
