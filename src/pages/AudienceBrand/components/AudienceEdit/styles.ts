import styled from 'styled-components'

export const Section = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	.card-main {
		width: 100%;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		padding: 1rem;
		border-radius: 8px;
		margin-top: 1.5rem;
	}
	h1 {
		color: #14252f;
		font-size: 2rem;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		margin-top: 32px;
	}
}
`

export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0px;
	background-color: #f5f5f5;
	color: #000000;
	font-weight: 600;
	border-radius: 8px;
	padding: 0.5rem 1rem;
	cursor: pointer;
	transition:
		background-color 0.3s,
		color 0.3s;
	&:hover {
		background-color: #e0e0e0;
		color: #333;
	}
	svg {
		margin-right: 0.5rem;
	}
`

export const FormWrapper = styled.form`
	width: 100%;

	& > div:last-child {
		padding-top: 0 !important;
	}
`

export const FormItem = styled.div`
	label {
		font-size: 16px;
		font-weight: 600;
	}
	textarea {
		font-size: 16px;
		min-height: 125px;

		&::placeholder {
			font-size: 16px;
		}
	}
`

export const FormProduct = styled.div`
	label {
		font-size: 16px;
		font-weight: 600;
		margin-top: 24px;
	}
	textarea {
		font-size: 16px;
		min-height: 125px;

		&::placeholder {
			font-size: 16px;
		}
	}
`

export const FormTitle = styled.div`
	h2 {
		font-size: 24px;
		font-weight: 600;
	}

	p {
		margin-top: 4px;
		color: #444f55;
		padding: 0;
	}
`
export const ActionsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	gap: 1rem;

	background: #ffffff;

	width: 15rem;
	padding: 1rem;

	border-radius: 8px;

	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
`
export const ContainerOptions = styled.div`
	display: flex;
	width: 100%;
	gap: 10px;
`
export const SectionTitle = styled.div`
	h1 {
		font-size: 24px;
		font-weight: 600;
	}
`
export const Subtitle = styled.h2`
	h2 {
		font-size: 16px;
		font-weight: 600;
	}
`
export const SectionBox = styled.div`
	margin-top: 24px;
`
export const SectionProduct = styled.div`
	border: 1px solid;
`

export const RadioWrapper = styled.div`
	margin-right: 32px;
	.flexRadio {
		display: flex;
		align-items: center;

		> div {
			margin: 0;

			> label {
				width: inherit;
			}
		}
	}
`
