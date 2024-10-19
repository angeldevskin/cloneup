import styled, { css } from 'styled-components'

export const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
`

export const PageHeader = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
`

export const ConfirmEditWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	gap: 1rem;

	width: 100%;

	span {
		opacity: 0.5;
		text-align: center;
	}

	footer {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		width: 100%;
	}
`

export const BrainHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	> svg {
		width: 1rem;
		height: 1rem;
		cursor: pointer;

		transition: color 0.5s;
		&:hover {
			color: #009ef7;
		}
	}
`

export const NoContent = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;

	gap: 1rem;

	svg {
		width: 3rem;
		height: 3rem;
	}
`

export const FixedHeader = styled.div<{ $position: 'right' | 'left' }>`
	display: flex;
	align-items: center;
	gap: 1rem;

	max-width: 500px;

	padding: 0.5rem 1rem;
	margin: 0.5rem;

	position: absolute;
	z-index: 10;
	top: 0;

	${({ $position }) => css`
		${$position === 'right'
			? css`
					right: 0;
			  `
			: css`
					left: auto;
			  `}
	`}

	background: #ffffff;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	border-radius: 8px;
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
export const PublishFunnel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;

	span {
		padding: 0 1rem;
		font-size: 0.875rem;
		text-align: left;
	}

	footer {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		width: 100%;
	}
`
