import styled from 'styled-components'

export const Container = styled.section`
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;
	overflow: hidden;

	padding: 0 2rem 2rem 2rem;
`

export const Header = styled.header`
	width: 100%;
	margin-bottom: 1rem;

	.subHeader {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		width: 30%;
	}
`

export const FilterContainer = styled.div`
	width: 100%;

	margin-bottom: 2rem;

	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 1rem;
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;

	min-height: 75dvh;
	overflow: hidden;

	border-radius: 8px;

	.buttonNavigate {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: #009ef7;
		outline: none;
		border: none;
		background: transparent;
	}
`

export const BoardWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
	height: 100%;

	border: 1px 0 1px 0 solid #d9d9d9;

	border-radius: 8px;
`

export const NoContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;

	gap: 1rem;

	text-align: center;

	button {
		color: #009ef7;
	}
`

export const Divider = styled.div`
	display: block;
	width: 100%;
	margin: 0.5rem 0 1rem 0;
	height: 1px;
	background: #f2f2f3;
`

export const ActionsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	gap: 1rem;

	background: #ffffff;

	width: 15rem;
	padding: 0.5rem;

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

export const ButtonActions = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	background: #f1f1f1;

	min-width: 15rem;

	border: none;
	outline: none;

	padding: 0.5rem 1rem;
	border-radius: 8px;

	&:hover {
		opacity: 0.7;
	}
`

export const PhoneAction = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	gap: 0.5rem;
	padding: 0.5rem;

	border: none;

	background: transparent;

	svg {
		width: 1.5rem;
		height: 1.5rem;
		color: #f1f1f1;

		padding: 0.2rem;
		border-radius: 4px;
		background: #25d366;

		transition: opacity 0.2s ease-in-out;
		&:hover {
			opacity: 0.7;
		}
	}
`
export const SelectFunnelWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;

	gap: 1rem;

	padding: 2rem 20%;

	> span {
		margin-bottom: 1rem;
		button {
			color: #009ef7;
			background: transparent;
			border: none;
			outline: none;
		}
	}
`
