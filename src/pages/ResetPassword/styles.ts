import styled from 'styled-components'

export const Wrapper = styled.section`
	@media (max-width: 768px) {
		padding: 0 2rem;
	}

	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;

	gap: 1.8rem;

	padding: 0 10rem;

	header {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.62rem;

		h1 {
			font-size: 2.6rem;
			font-weight: 300;
		}
		p {
			color: var(--neutral-black, #141522);
			font-family: Nunito Sans;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: 200%;
		}
	}

	form {
		width: 100%;
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

export const TextConfirm = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 18px;
	align-self: stretch;
`

export const Box = styled.section`
	display: flex;
	width: 49px;
	height: 50px;
	padding: 5px 11px;
	justify-content: space-between;
	align-items: center;
	border-radius: 10px;
	border: 1px solid #d7d5dd;
	input {
		color: #9797a5;
		font-family: Nunito Sans;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		width: 10px;
		margin: 5px 6px;
		border: none;
	}
	input:focus {
		outline: none;
	}
`
