import styled from 'styled-components'

export const ImportTemplateWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	padding: 1rem;
	margin-top: 1rem;

	.content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	textarea {
		resize: none;

		outline: none;
		border: 1px solid #e2e0e6;
		border-radius: 8px;
		padding: 0.5rem;
		min-height: 400px;
		max-height: 400px;

		&:focus-within {
			border: 1px solid #009ef7;
		}
	}
`
