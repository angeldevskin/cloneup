import styled from 'styled-components'

interface LoginWrapperProps {
	step2?: boolean
}

export const LoginWrapper = styled.section<LoginWrapperProps>`
	@media (max-width: 768px) {
		padding: 0 2rem;
	}

	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	gap: 1rem;
	position: relative;
	padding: 0 10rem;

	/* Classe condicional */
	${({ step2 }) =>
		step2 &&
		`
		align-items: flex-start !important;
	`}

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
		flex-direction: column;

		gap: 1rem;
	}

	form.isLoading:before {
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.5);
		z-index: 9;
		left: 0;
		top: 0;
	}

	form.isLoading:after {
		border-radius: 30px;
		width: 30px;
		height: 30px;
		border: 4px solid transparent;
		border-left: 4px solid #009ef7;
		background: transparent;
		display: block;
		content: '';
		z-index: 999;
		position: absolute;
		left: 0;
		top: 0;
		margin: auto;
		bottom: 0;
		right: 0;
		transition: 0.3s all;
		animation: 800ms linear infinite loading;
	}

	@keyframes loading {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
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
