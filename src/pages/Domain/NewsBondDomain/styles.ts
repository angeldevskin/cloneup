import styled from 'styled-components'

export const Form = styled.div`
	span.tip {
		align-self: stretch;
		color: #85959e;
		font-size: 0.75rem;
		font-weight: 400;
		line-height: normal;
		display: block;
		margin-top: 6px;
	}
`

export const Card = styled.div`
	padding: 1rem;
	display: flex;
	background: #fef5ec;
	margin-top: 16px;
	margin-bottom: 32px;
	p {
		margin-left: 0.5rem;
		flex: 1 0 0;
		color: #444f55;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: normal;
	}
`

export const Button = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	button:first-child {
		margin-right: 0.5rem;
	}

	button:last-child {
		margin-left: 0.5rem;
	}
`
