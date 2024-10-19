import { Content } from '@radix-ui/react-select'
import styled from 'styled-components'

export const Tags = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;
	border: 1px solid #d0d5dd;
	border-radius: 6px;
	padding: 6px 5px 6px 15px;
	font-size: 16px;
	color: #444f55;
	font-size: 14.5px;
	text-align: center;

	.tag {
		cursor: pointer;
		position: relative;
		padding-right: 30px;
		display: flex;
		align-items: center;
		line-height: 1rem;

		img {
			width: 14px;
			height: 14px;
			margin-right: 5px;
		}

		p {
			line-height: 1rem;
			padding: 0;
		}

		svg.close {
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

export const SelectItem = styled.span`
	display: flex;
	align-items: center;

	font-size: 0.875rem;
	text-overflow: ellipsis;

	color: #212121;

	border-radius: 8px;
	margin: 0.3rem 0;

	position: relative;

	overflow: hidden;
	cursor: pointer;
	width: 100%;
	padding: 0.5rem;

	&:hover,
	&:first-of-type {
		outline: none;
		background-color: #009ef7;
		color: #ffffff;
	}
`
