import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;

	footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		margin-top: 1rem;

		gap: 0.5rem;

		width: 100%;
	}
`

export const FormWrapper = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;

	flex-wrap: wrap;

	gap: 1rem;

	width: 100%;
`
