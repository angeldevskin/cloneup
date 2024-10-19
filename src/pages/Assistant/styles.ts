import styled, { css } from 'styled-components'

export const Section = styled.div`
	padding: 0 2rem 2rem 2rem;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	.card-main {
		width: 100%;
		border-radius: 8px;
		margin-top: 40px;
	}
	h1 {
		color: #14252f;
		font-size: 1rem !important;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	h2 {
		color: #444f55;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: normal;
		margin-top: 0.5rem;
	}
	.instructions {
		margin-top: 2rem;
		width: 15%;
		align-items: center;
		justify-content: center;
		h1 {
			color: #14252f;
			font-size: 1.25rem;
			font-weight: 600;
			line-height: normal;
		}
		h2 {
			align-self: stretch;
			color: #444f55;
			font-size: 0.875rem;
			font-weight: 400;
			line-height: normal;
			margin-top: 1rem;
			.arrow {
				font-size: 2rem;
			}
		}
	}
	.steps {
		width: 85%;
		margin-left: 2rem;
	}
`
export const HeaderAssistant = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
`
export const Divider = styled.div`
	display: block;
	width: 100%;
	margin: 0.5rem 0 1rem 0;
	height: 1px;
	background: #f2f2f3;
	margin: 20px 0 20px 0;
`

export const InfosAssistant = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
`

export const ContainerAssistant = styled.div`
	width: 100%;
`
export const HeaderPage = styled.div`
	display: flex;
	justify-content: space-between;
`
export const AssistantCard = styled.div<{ $shadow: 'true' | 'false' }>`
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	padding-top: 32px;
	${({ $shadow }) => css`
		${$shadow === 'true'
			? css`
					box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
					margin-bottom: 2rem;
			  `
			: css`
					margin-bottom: 8rem;
			  `}
	`}
	header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	h1 {
		color: #14252f;
		font-size: 1.25rem;
		font-weight: 600;
		line-height: normal;
	}
	h2 {
		align-self: stretch;
		color: #444f55;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: normal;
		margin-top: 1rem;
		.arrow {
			position: relative;
			top: 0.5rem;
			color: #444f55;
		}
	}
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
export const SubTitleTable = styled.h1`
	font-weight: 600;
	font-size: 16px;
	margin-top: 10px;
`

export const FiltersWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
`

export const InfoContainer = styled.div`
	display: flex;
	align-items: center;
	width: 50%;
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

export const AssistantFilter = styled.div`
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
export const ActionsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	gap: 1rem;

	background: #ffffff;

	width: 15rem;
	padding: 1rem;

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
