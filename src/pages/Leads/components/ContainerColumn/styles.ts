import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;

	min-width: 24rem;
	min-height: 70dvh;
	max-height: 70dvh;

	background: #f2f2f3;

	border-right: 1px solid #cdd2d5;

	&:first-of-type {
		border-radius: 0 0 0 8px;
	}

	&:last-of-type {
		border-radius: 0 0 8px 0;
		border: none;
		border-right: none;
	}

	> div {
		display: flex;
		align-items: 'center';
		gap: 1rem;
		width: 100%;
		background: #ffffff;
		padding: 0.5rem;
	}
`

export const EmptyPageLeads = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;

	width: 100%;

	color: #d4d4d4;
	background: #f2f2f3;
`
