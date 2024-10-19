import styled from 'styled-components'

export const CodeFieldWrapper = styled.div`
	padding: 0 12px;
	.confirmation_form {
		padding: 0;
		padding-top: 20px;
		margin: 0;
	}
`

export const CodeField = styled.div`
	button.add {
		margin-left: auto;
		padding: 12px 22px;
		margin-top: 20px;
	}

	label {
		font-size: 14px;
		margin-top: 14px;
		font-weight: 400;
		color: #14252f;
		margin-bottom: 6px;
	}
`

export const CodeFieldWrapperTitle = styled.div`
	padding: 20px 0;
	font-size: 14px;
	color: #444f55;

	a {
		color: #009ef7;
	}
`

export const ExternalCodeWrapper = styled.div`
	padding-top: 15px;

	.footer {
		&__title {
			font-size: 14px;
			color: #14252f;
		}
	}

	.current-codes {
		margin-top: 16px;
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
`

export const InsertError = styled.small`
	margin-top: 8px;
	display: block;
	color: #f05151;
	font-size: 12px;
`
