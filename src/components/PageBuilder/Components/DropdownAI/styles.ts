import { Content, Separator, Trigger } from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px 16px;
	background-color: #fff;
	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
	max-height: 40px;
	border: 2px solid #8fd7ff;
	border-radius: 8px;

	.AccordionRoot {
		.AccordionItem {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row-reverse;

			button[data-orientation='horizontal'] {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: transparent;
				border: none;
				outline: none;
				padding-left: 8px;

				.chevrons-right {
					transition: transform 300ms;
				}

				&[data-state='open'] {
					.chevrons-right {
						transform: rotate(180deg);
					}
				}

				&[data-state='closed'] {
					padding-left: 0px;
				}
			}

			.accordion-content {
				overflow: hidden;
			}

			.accordion-content[data-state='open'] {
				animation: slideRight 300ms ease-out;
			}

			.accordion-content[data-state='closed'] {
				animation: slideLeft 300ms ease-out;
			}

			@keyframes slideRight {
				from {
					width: 0;
				}

				to {
					width: var(--radix-accordion-content-width);
				}
			}

			@keyframes slideLeft {
				from {
					width: var(--radix-accordion-content-width);
				}

				to {
					width: 0;
				}
			}
		}
	}
`

export const DropdownTrigger = styled(Trigger)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	background-color: #fff;
	border: none;
	outline: none;
	padding-right: 8px;
	border-right: 1px solid #cdd2d5;

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	span {
		font-size: 14px;
		font-weight: bold;
		white-space: nowrap;
	}

	.spinner {
		animation: rotate 1s linear infinite;
	}
`

export const DropdownContent = styled(Content)`
	position: relative;
	background-color: #fff;
	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
	top: 8px;
	padding: 8px;
	border-radius: 8px;
	left: 33px;

	[role='menuitem'] {
		display: flex;
		align-items: center;
		justify-content: start;
		padding: 4px 8px;
		font-size: 14px;
		font-weight: bold;
		cursor: pointer;
		border-radius: 8px;
		outline: none;

		span {
			margin-left: 8px;
			margin-right: 16px;
		}

		&:hover {
			background-color: #d2efff;
			outline: none;
		}
	}

	[role='menu'] {
		background-color: #fff;
		box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
		margin-left: 8px;
		border-radius: 8px;
		padding: 8px;
		outline: none;

		[role='menuitem'] {
			min-width: 250px;

			&:hover {
				background-color: #d2efff;
				outline: none;

				span {
					margin-left: 8px;
				}
			}
		}
	}
`

export const ContainerItem = styled.div``

export const DropdownSeparator = styled(Separator)`
	background-color: #f2f2f3;
	width: 100%;
	height: 1px;
	margin-top: 8px;
	margin-bottom: 8px;
`

export const ContentGrammarCorrect = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	cursor: pointer;

	span {
		font-size: 14px;
		font-weight: bold;
	}
`

export const ContentChevronsRight = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`

export const ContentNewPromptCommand = styled.div`
	max-width: 242px;
	padding: 8px 16px;
	background-color: #fff;
	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
	margin-top: 8px;
	border-radius: 8px;

	span {
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 8px;
	}

	input {
		padding-right: 0px;

		&::placeholder {
			font-size: 12px;
			color: #afb7bb;
		}
	}
`
