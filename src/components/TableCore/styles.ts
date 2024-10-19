import styled from 'styled-components'

export const TableWrapper = styled.table`
	width: 100%;

	border-spacing: 0;

	color: #444f55;
`

export const TableHeader = styled.thead``

export const TableHead = styled.th<{ width: number }>`
	${({ width }) => `width: ${width}px;`}
`

export const TableRow = styled.tr`
	text-align: left;

	&[data-state='selected'] {
		background: #d2efff;
	}
`

export const TableBody = styled.tbody`
	${TableRow}:hover {
		background: #f5f5f5;
	}
`

export const TableDataCell = styled.td`
	padding: 0.5rem;

	cursor: pointer;

	&:first-child {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}
	&:last-child {
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}
`

export const Actions = styled.div`
	display: flex;

	align-items: flex-end;
	justify-content: flex-end;

	gap: 1rem;

	svg {
		cursor: pointer;

		color: #444f55;

		transition: color 0.3s;
		&:hover {
			color: #009ef7;
		}
	}
`
