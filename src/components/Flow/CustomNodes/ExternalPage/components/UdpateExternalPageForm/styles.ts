import styled from 'styled-components'

export const Form = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
	height: 100%;

	.error {
		color: red;
		font-size: 0.875rem;
	}

	footer {
		display: flex;
		gap: 0.5rem;
		margin-top: 2rem;
	}

	.loader {
		svg {
			animation: spin 2s linear infinite;
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
`

export const FormBuilderContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	::-webkit-color-swatch {
		border: none;
		border-radius: 8px;
	}

	::-webkit-color-swatch-wrapper {
		border: none;
		border-radius: 8px;
	}

	.buttonColor {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: space-between;
		margin-bottom: 0.5rem;
		margin-top: 0.5rem;

		.colorContainer {
			overflow: hidden;
			border-radius: 10px;
			width: 36px;
			height: 36px;
		}
	}

	.buttonRadius {
		display: grid;
		align-items: center;
		grid-template-columns: 70% 20%;
		gap: 0.5rem;
		width: 100%;
		justify-content: space-between;

		input[type='range'] {
			appearance: none;
			-webkit-appearance: none;
			width: 100%;
			height: 10px;
			background: #f2f3f6;
			border-radius: 5px;
			outline: none;
			padding: 0;
			margin: 0;
		}

		input[type='range']::-webkit-slider-runnable-track {
			width: 100%;
			height: 10px;
			cursor: pointer;
			background: #f2f3f6;
			border-radius: 5px;
		}

		input[type='range']::-webkit-slider-thumb {
			-webkit-appearance: none;
			appearance: none;
			height: 24px;
			width: 24px;
			border-radius: 50%;
			background: #ffffff;
			border: 2px solid #009ef7;
			cursor: pointer;
			margin-top: -7px;
		}

		input[type='range']::-ms-thumb {
			appearance: none;
			height: 24px;
			width: 24px;
			border-radius: 50%;
			background: #ffffff;
			border: 3px solid #3b82f6;
			cursor: pointer;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
		}

		.inputManual {
			background: #f2f3f6;
			border-radius: 10px;
			border: none;
			padding: 0.5rem;
			display: flex;
			align-items: center;
			justify-content: space-between;

			input {
				border: none;
				outline: none;
				background: transparent;
				max-width: 50%;
			}

			input::-webkit-outer-spin-button,
			input::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}
`

export const FormButtonColor = styled.input`
	outline: none;
	border: none;
	background: transparent;
	width: 100%;
	height: 100%;
	padding: 0;
`

export const ScriptContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	gap: 1rem;
	border-radius: 10px;
	background: #fef5ec;
	padding: 1rem;

	margin-top: 1rem;

	> span {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border-radius: 50%;
		background: #fa8e14;
	}

	.description {
		max-width: 250px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: column;
		gap: 1rem;
		font-size: 0.875rem;
	}

	p {
		button {
			color: #009ef7;
			text-decoration: none;
			margin-right: 0.5rem;
			outline: none;
			border: none;
			background: transparent;
			cursor: pointer;
			font-size: 0.875rem;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`
