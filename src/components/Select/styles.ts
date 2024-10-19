import { Content, SelectItem as Item, Trigger } from '@radix-ui/react-select'
import styled from 'styled-components'

export const TriggerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;

	label {
		margin-bottom: 0.5rem;
	}
`

export const SelectTrigger = styled(Trigger)<{ width?: number }>`
	gap: 0.5rem;
	padding: 0.5rem;
	width: ${({ width }) => (width ? `${width}%` : '100%')};
	min-width: 200px;

	background: #ffffff;
	border: 1px solid #d9d9d9;
	color: #85959e;

	cursor: pointer;
	outline: none;
	border-radius: 8px;

	&.disabled {
		pointer-events: none;
		background: #efefef;
	}

	&:not(.multiple) {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&:hover {
			opacity: 0.7;
		}
	}

	&.multiple {
		text-align: left;
		position: relative;
		cursor: inherit;

		svg {
			position: absolute;
			right: 10px;
		}

		.selected-tags {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			width: 90%;
			gap: 8px;

			.tag {
				cursor: pointer;
				position: relative;
				padding-right: 30px;

				svg {
					transform: none !important;
					color: #85959e;
					width: 14px;
					height: 14px;
					stroke-width: 3px;
					position: absolute;
					right: 8px;
					top: 0;
					bottom: 0;
					margin: auto;
				}
			}
		}
	}

	transition: background-color color 0.3s ease-in-out;

	svg {
		color: #212121;
	}

	&[data-state='open'] {
		border: 1px solid #009ef7;

		svg {
			transform: rotate(180deg);
			transition-duration: 0.3s;
		}
	}

	.tag {
		border: 1px solid #d0d5dd;
		border-radius: 6px;
		padding: 3px 13px;
		font-size: 16px;
		color: #444f55;
		font-size: 15px;
	}
`

export const SelectContent = styled(Content)<{ width?: number }>`
	overflow: hidden;
	background-color: #ffffff;
	border-radius: 8px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

	z-index: 1000;

	padding: 0 0.5rem;

	width: ${({ width }) => (width ? `${width}%` : 'auto')};

	min-width: 200px;
	margin-top: 0.5rem;
`

export const SelectItem = styled(Item)`
	display: flex;
	align-items: center;

	font-size: 0.875rem;
	text-overflow: ellipsis;

	color: #212121;

	border-radius: 8px;
	margin: 0.5rem 0;

	position: relative;

	overflow: hidden;
	cursor: pointer;

	padding: 0.5rem;

	&[data-disabled] {
		background-color: #009ef7;
		color: #ffffff;
		pointer-events: none;
	}

	&[data-highlighted] {
		outline: none;
		background-color: #009ef7;
		color: #ffffff;
	}
`
