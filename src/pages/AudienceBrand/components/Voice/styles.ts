import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
`
export const FormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 25px;

	height: 100%;

	textarea {
		min-height: 105px;
	}
`
export const TextInfo = styled.span`
	color: #444f55;
	font-size: 14px;
`
