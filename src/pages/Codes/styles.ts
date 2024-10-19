import styled, { css } from 'styled-components'

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

export const Actions = styled.div`
	justify-content: end;
	display: flex;
	gap: 8px;
	transition: 0.3s all;
	margin-bottom: 24px;
	div[class^='action_'] {
		transition: 0.3s all;
		position: relative;
		z-index: 9;

		.context_menu {
			transition: 0.3s all;
			border-radius: 8px;
			background-color: white;
			width: 320px;
			position: absolute;
			padding: 20px 22px;
			padding-top: 0;
			box-shadow: 0px 10px 15px 0px rgb(0 0 0 / 7%);
			transform: translate(0px, -10px);
			opacity: 0;
			pointer-events: none;
			right: 0;

			.item {
				margin: 20px 0;

				label {
					color: #444f55;
					font-size: 14px;
				}
			}

			&.actions {
				width: 230px;
				padding-top: 20px;

				button {
					color: #444f55;
					font-size: 14px;
				}
			}
		}

		.footer {
			display: flex;
			gap: 8px;
			margin-top: 30px;
			justify-content: flex-end;

			button {
				transition: 0.3s all;
				padding: 0.5rem 1rem;
			}
		}

		&.active {
			button {
				&::after {
					transform: rotate(180deg) translate(0px, 3px);
				}
			}

			.context_menu {
				transform: translate(0px, 0px);
				opacity: 1;
				pointer-events: all;
			}
		}
	}

	button {
		&.action-btn {
			position: relative;
			display: flex;
			align-items: center;

			svg {
				stroke-width: 1px !important;
				width: 22px;
				height: 22px;
			}

			&::after {
				transition: 0.3s all;
				position: relative;
				content: '';
				width: 0px;
				height: 0px;
				border-top: 4px solid #444f55;
				border-right: 4px solid transparent;
				border-bottom: 4px solid transparent;
				border-left: 4px solid transparent;
				margin: 10px;
				right: -2px;
				top: 2px;
			}
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

export const Section = styled.div`
	padding: 2rem;
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
		font-size: 2rem;
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

export const CodeCard = styled.div<{ $shadow: 'true' | 'false' }>`
	border-radius: 8px;
	width: 100%;
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
export const CodeFilter = styled.div`
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
export const FiltersWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
`
export const Divider = styled.div`
	display: block;
	width: 100%;
	margin: 0.5rem 0 1rem 0;
	height: 1px;
	background: #f2f2f3;
	margin: 20px 0 20px 0;
`

export const CustomTextAreaAria = styled.div`
	position: relative;
	textarea {
		min-height: 160px;
		font-size: 14px;
		height: auto !important;
	}
`

export const Copy = styled.div`
	position: absolute;
	cursor: pointer;
	display: flex;
	gap: 7px;
	color: #009ef7;
	right: 0;
`
