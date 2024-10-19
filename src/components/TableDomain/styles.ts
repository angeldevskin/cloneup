import styled from 'styled-components'

export const Table = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
`

export const Header = styled.thead`
	padding: 1rem 0.5rem;
	text-align: left;

	border-bottom: 1px solid #f2f2f3;

	th {
		padding: 0 0.5rem;
		color: #444f55;
	}

	&::before {
		content: '';
		display: table;
		height: 2rem;
	}

	&::after {
		content: '';
		display: table;
		height: 1rem;
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
		height: 1rem;
	}
`

export const Cell = styled.td`
	padding: 0.5rem;

	max-width: 10rem;
	min-width: 10rem;

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
