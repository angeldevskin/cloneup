import styled, { css } from 'styled-components'

export const FormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	height: 100%;
`

export const ConfirmationWrapper = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;

	margin-top: 1rem;

	svg {
		border: 0;
		margin: 0;
	}

	svg {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

export const TemplateWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	gap: 0.5rem;

	flex-wrap: wrap;
	margin-top: 1rem;

	width: 100%;
`

export const TemplateContainer = styled.div<{ $isSelected: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	gap: 1rem;

	max-width: 150px;
	min-width: 150px;

	border: 1px solid #ccc;
	border-radius: 8px;

	padding: 0.5rem;

	cursor: pointer;

	span {
		font-size: 0.8rem;
		text-align: center;
	}

	transition: opacity 0.2s;
	&:hover {
		opacity: 0.7;
	}

	${({ $isSelected }) =>
		$isSelected &&
		css`
			border-color: #009ef7;
		`}
`
