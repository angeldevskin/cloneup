import { Controls } from 'reactflow'
import styled from 'styled-components'

export const Wrapper = styled.div`
	height: 100dvh;
	background: #f5f5f5;

	.react-flow__edge-path,
	.react-flow__connection-path {
		stroke: #9797a5;
		stroke-width: 2;
	}
`

export const InternControls = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin: 1rem;

	position: fixed;
	top: 50vh;
	left: 0;

	background: #ffffff;
	border-radius: 8px;
	padding: 0.5rem;

	button {
		border: none;
		cursor: pointer;
		outline: none;
		background: transparent;

		transition: opacity 0.2s ease-in-out;
		&:hover {
			opacity: 0.5;
		}
	}
`

export const CustomControls = styled(Controls)`
	/* margin-top: 50vh; */
	border-radius: 8px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 1rem;
	padding: 0.5rem;
	background: #ffffff;

	button {
		border: none;
		border-radius: 8px;
	}
`

export const ComponentsCollection = styled.footer`
	display: flex;
	gap: 1rem;

	background: #ffffff;
	padding: 1rem;
	margin: 1rem;

	border-radius: 8px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	position: fixed;
	margin-left: 50vh;
	margin-right: 50vh;
	bottom: 0;
`

export const ContentComponent = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;

	align-items: center;
	justify-content: start;
	gap: 0.5rem;

	font-size: 0.7rem;

	width: 100%;
	text-align: center;

	cursor: grab;

	.badge {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.2rem 0.5rem;
		border-radius: 50%;
		border: 1px solid #212121;
		background: #ffffff;

		position: absolute;
		top: 0;
		right: 0;
		margin: 0.5rem;
	}
`

export const SubPageTypes = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 0.7rem;
`

export const SubComponentsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	background: #ffffff;

	padding: 1rem;
	border-radius: 8px;
`

export const CopyContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	font-size: 0.875rem;
	gap: 1rem;

	button {
		border: none;
		cursor: pointer;
		outline: none;
		background: #f5f5f5;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 1rem;

		&:hover {
			opacity: 0.5;
		}

		&[data-state='copied'] {
			background: #b8fadd;
			color: #1acd81;
		}
	}
`
