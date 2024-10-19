import styled from 'styled-components'

export const Container = styled.div`
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

		margin-top: 1rem;
	}
`

export const ExternalButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	font-size: 0.875rem;

	color: #009ef7;

	border: none;
	background: transparent;
	outline: none;
`

export const TagList = styled.div`
	width: 100%;
	gap: 10px;
	display: flex;
	flex-wrap: wrap;
	max-width: 380px;
`
