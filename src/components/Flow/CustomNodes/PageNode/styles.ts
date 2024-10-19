import { Handle } from 'reactflow'
import styled, { css } from 'styled-components'

export const PlaceholderName = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	position: fixed;
	bottom: 0;
	right: 0;

	margin-bottom: -2rem;

	width: 100%;
`

export const ActionsFooter = styled.div`
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;

	position: fixed;
	bottom: 0;

	gap: 0.5rem;
	margin-bottom: -4rem;

	input {
		width: 130%;
		appearance: none;
		resize: none;

		background: transparent;

		border: none;
		border-radius: 4px;

		outline: none;

		font-size: 0.875rem;
		text-align: center;

		&:focus {
			background: #ffffff;
		}
	}
`

export const MetricsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;

	background: #101828;
	color: #ffffff;
	opacity: 0.5;

	width: 100%;

	padding: 0.5rem 1rem;
	border-radius: 8px;

	strong {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	strong:first-of-type {
		&::before {
			content: '';
			display: block;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin-right: 0.5rem;

			border: 1px solid #ffffff;
		}
	}

	strong:last-of-type {
		&::before {
			content: '';
			display: block;
			text-align: center;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin-right: 0.5rem;

			background: #ffffff;
		}
	}
`

export const MetricsInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: 0.5rem;
	background: #101828;
	width: 100%;
	color: #ffffff;

	padding: 0.5rem;
	border-radius: 8px;

	font-size: 0.7rem;

	span {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	span:first-of-type {
		&::before {
			content: '';
			display: block;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin-right: 0.5rem;

			border: 1px solid #ffffff;
		}
	}

	span:last-of-type {
		&::before {
			content: '';
			display: block;
			text-align: center;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin-right: 0.5rem;

			background: #ffffff;
			border: 1px solid #ffffff;
		}
	}
`

export const Wrapper = styled.div`
	border: 1px solid #d9d9d9;
	overflow: hidden;

	border-radius: 8px;
	background: #ffffff;

	transition: border 0.3s ease-in-out;
	&:hover {
		border: 1px solid #009ef7;

		${ActionsFooter} {
			display: flex;
		}
	}
`

export const Container = styled.div<{ $hasimage: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 150px;
	height: 200px;

	${({ $hasimage }) => css`
		${$hasimage &&
		css`
			width: 250px;
			height: 150px;
		`}
	`}
	background: #ffffff;

	font-size: 0.5rem;
`

export const Body = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.unavailablePreview {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;

		margin-top: 55px;
	}
`

export const Actions = styled.div<{ $disablePointer: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	position: fixed;
	top: 0;

	margin-top: -2.5rem;
	border: none;

	.nodeAction {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ffffff;
		outline: none;
		border: none;
		width: 40px;
		height: 40px;

		border-radius: 8px;

		padding: 0.5rem;

		svg {
			width: 20px;
			height: 20px;
		}

		${({ $disablePointer }) => css`
			pointer-events: ${$disablePointer ? 'none' : 'alto'};
		`}

		:hover {
			opacity: 0.7;
		}

		&[data-state='model'] {
			background: #009ef7;
			color: #ffffff;
		}

		&[data-state='desctruction'] {
			background: #ffbea8;
			color: #fe2f11;
		}
	}
`

export const CustomHandle = styled(Handle)`
	width: 10px;
	height: 10px;
	background: #009ef7;
	border: none;
`

export const TemplateModelsWrapper = styled.div`
	display: flex;
	margin-bottom: 2rem;
	width: 100%;
`

export const TemplateModelsContainer = styled.div`
	display: flex;
	align-items: start;
	justify-content: start;
	flex-wrap: wrap;
	width: 100%;
	gap: 1rem;
`
