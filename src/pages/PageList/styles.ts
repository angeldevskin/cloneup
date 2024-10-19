import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;

	padding: 2rem;
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;

	align-items: flex-end;
	justify-content: center;

	width: 100%;

	margin: 1rem 0;
	border-radius: 8px;
	padding: 0.5rem;
`

export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 4rem;
	width: 100%;
`

export const BrainHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	svg {
		width: 2rem;
		height: 2rem;
		cursor: pointer;

		transition: color 0.5s;
		&:hover {
			color: #009ef7;
		}
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
`
