import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;

	align-items: center;
	justify-content: flex-end;
	gap: 0.5rem;

	margin-top: 1rem;
`

export const PageContainer = styled.div`
	border: 1px solid #d2efff;
	border-radius: 8px;

	display: flex;
	align-items: center;
	justify-content: center;

	background: #d2efff;
	color: #009ef7;

	padding: 0.25rem 0.65rem;
`

export const SetPageButton = styled.button`
	border: 1px solid #f2f2f3;
	border-radius: 8px;

	display: flex;
	align-items: center;
	justify-content: center;

	background: #f2f2f3;
	color: #212121;

	padding: 0.25rem;

	&:hover {
		opacity: 0.7;
	}

	&:disabled {
		opacity: 0.5;
	}
`
