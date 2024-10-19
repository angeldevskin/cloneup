import styled from 'styled-components'

export const InlineContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;

	width: 100%;
`

export const Description = styled.span`
	font-size: 0.8rem;
	color: #85959e;
`

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;

	gap: 1rem;

	footer {
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 0.5rem;
		width: 100%;
	}
`
