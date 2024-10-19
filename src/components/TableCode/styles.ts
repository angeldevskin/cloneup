import styled from 'styled-components'

export const Table = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
	border-top: 1px solid #f4f4f4;
	margin-top: 20px;
`

export const Header = styled.thead`
	text-align: left;
	border-bottom: 1px solid #f2f2f3;

	th {
		padding: 0 0.4rem;
		color: #444f55;
		font-size: 16px;
		font-weight: 600;
		position: relative;
		svg {
			width: 14px;
			height: 14px;
			margin-left: 5px;
			top: 4px;
			position: absolute;
			right: 10px;
		}

		button[role='checkbox'] {
			position: relative;
		}
	}

	&::before {
		content: '';
		display: table;
		height: 2rem;
	}

	&::after {
		content: '';
		display: table;
		height: 0.7rem;
	}

	.header-container {
		display: flex;
		justify-content: space-between; /* Alinha os elementos um no início e outro no final */
		width: 100%;
	}
`

export const Row = styled.tr`
	&:hover {
		border-radius: 8px;
		background: #f2f2f3;
	}
`

export const Body = styled.tbody`
	border-top: 1px solid #f2f2f3;
	padding: 0.5rem 0;

	&::before {
		content: '';
		display: table;
		height: 0.5rem;
	}
`

export const Cell = styled.td`
	padding: 0.4rem;
	font-size: 14px !important;
	color: #444f55;

	&:first-child {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	&:last-child {
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}
`

export const ActionsContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: end;
	justify-content: flex-end;
	gap: 0.5rem;

	svg {
		&:hover {
			opacity: 0.6;
		}
	}
`

export const ActionButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: center;
`
