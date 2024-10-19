import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;
`

export const FormWrapper = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;

	flex-wrap: wrap;

	gap: 1rem;

	width: 100%;
`

export const LeadInfosWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 1rem;

	justify-content: space-between;

	width: 100%;

	&:first-of-type {
		border-bottom: 1px solid #d0d5dd;
	}

	padding: 1rem 0;

	.leadInfo {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 0.5rem;
	}
`

export const PhoneAction = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	gap: 0.5rem;
	padding: 0.5rem;

	background: transparent;

	border: 1px solid #e2e0e6;
	border-radius: 8px;

	span {
		border-right: 1px solid #e2e0e6;
		padding-right: 0.5rem;
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
		color: #25d366;
	}
`

export const FooterActions = styled.footer`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;

	span {
		color: #9797a5;
		font-size: 0.8rem;
	}
`
