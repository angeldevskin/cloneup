import styled from 'styled-components'

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	max-width: 400px;

	gap: 1rem;

	footer {
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 0.5rem;
		width: 100%;
	}
`

export const InlineContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	width: 100%;
`

export const NoContent = styled.span`
	font-size: 0.875rem;

	color: #dadadd;
`
