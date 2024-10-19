import styled from 'styled-components'

export const Wrapper = styled.section`
	display: flex;
	flex-direction: column;

	padding: 0 2rem 2rem 2rem;
`

export const NoContentCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	margin-top: 4rem;
	text-align: center;

	strong {
		font-size: 1.2rem;
		font-weight: bold;
		color: #444f55;
		margin-top: 1.5rem;
	}

	img {
		width: 10rem;
		height: 10rem;
	}

	p {
		font-size: 0.875rem;
		color: #14252f;
		margin-top: 0.6rem;
	}

	button {
		margin: 0 auto;
		margin-top: 1.2rem;
		padding: 0.5rem 1.3rem;
	}
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;

	align-items: flex-end;
	justify-content: center;

	margin: 1rem 0;
	border-radius: 8px;
	padding: 0.5rem;
`

export const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
`

export const NewFunnelTrigger = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	background: #009ef7;
	color: #ffffff;

	padding: 0.5rem 2rem;
	cursor: pointer;

	border-radius: 8px;

	transition: background-color 0.5s color 0.5s;
	&:hover {
		opacity: 0.9;
	}
`

export const ButtonActions = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	min-width: 15rem;

	background: #f1f1f1;

	border: none;
	outline: none;

	padding: 0.5rem 1rem;
	border-radius: 8px;

	&:hover {
		opacity: 0.7;
	}
`

export const Divider = styled.div`
	display: block;
	width: 100%;
	margin: 0.5rem 0 1rem 0;
	height: 1px;
	background: #f2f2f3;
`

export const FiltersWrapper = styled.div`
	display: flex;
	flex-direction: row-reverse;

	gap: 1rem;
	align-items: center;
	width: 100%;
	margin-top: 2rem;
`

export const ActionsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	background: #ffffff;

	min-width: 15rem;
	padding: 1rem;

	gap: 1rem;

	border-radius: 8px;

	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);

	.customButton {
		border: none;
		outline: none;
		background: transparent;
		align-items: center;
		display: flex;
		justify-content: flex-start;
		gap: 0.5rem;

		font-weight: lighter;

		&:disabled {
			cursor: not-allowed;
			pointer-events: none;

			opacity: 0.5;
		}

		transition: opacity 0.2s ease-in-out;
		&:hover {
			opacity: 0.5;
		}
	}
`

export const MetricsFilter = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	background: #ffffff;

	gap: 1rem;

	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	border-radius: 8px;

	padding: 1rem;

	width: 100%;
`

export const EmptyFunnelsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	gap: 2rem;

	width: 40%;
	height: 100%;

	margin-top: 5rem;

	padding: 2rem;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

	svg {
		width: 4rem;
		height: 4rem;

		color: #009ef7;
		opacity: 0.4;
	}
`
