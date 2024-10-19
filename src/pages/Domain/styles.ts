import styled, { css } from 'styled-components'

export const Section = styled.div`
	padding: 0 2rem 2rem 2rem;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;

	.backWrapper {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
	}

	.card-main {
		width: 100%;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		padding: 1rem;
		border-radius: 8px;
		margin-top: 1.5rem;
	}
	h1 {
		color: #14252f;
		font-size: 1.5rem;
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

export const DomainCard = styled.div<{ $shadow: 'true' | 'false' }>`
	padding: 2rem;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
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

export const SettingButton = styled.span`
	display: flex;
	p {
		margin-left: 0.5rem;
	}
`

export const NewsBondDomain = styled.div`
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

export const Alert = styled.div`
	margin: 1rem;
	display: flex;
	padding: 1rem;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	align-self: stretch;
	border-radius: 8px;
	background: #fef5ec;
`

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem 2rem;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 1rem;
	align-self: stretch;
	background-color: #fef5ec;
	margin: 1rem 0;
	.step {
		display: flex;
		label {
			color: #444f55;
			font-size: 0.875rem;
			font-weight: 700;
			line-height: normal;
			width: 3rem;
		}
		span {
			color: #444f55;
			text-align: center;
			font-size: 0.875rem;
			font-weight: 400;
			line-height: normal;
		}
		button {
			color: #009ef7;
			text-align: center;
			font-size: 0.875rem;
			font-weight: 600;
			line-height: normal;
			border: none;
			padding: 0;
			margin-left: 1rem;
		}
	}
	.alert {
		display: flex;
		.icon {
			color: #a53903;
			margin-right: 6px;
		}
		span {
			display: block;
			margin: 0.2rem;
			color: #a53903;
			text-align: center;
			font-size: 0.875rem;
			font-weight: 400;
			line-height: normal;
		}
	}
`
