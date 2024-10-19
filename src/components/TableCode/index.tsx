import { ChevronsUpDown } from 'lucide-react'
import * as S from './styles'
import './styles.css'
import { ReactNode } from 'react'

export type TableProps = {
	columns: Array<{
		name: string
		identifier: string
		class?: string
		width?: string
	}>
	columnsStatus: Array<{
		name: string
		identifier: string
		class?: string
	}>
	items: Array<unknown> | null
	actions?: Array<{
		icon: JSX.Element
		onClick: (itemId: string) => void
	}>
	moreActions?: (itemId: string) => ReactNode
}

export function TableCode({ columns, items }: TableProps) {
	return (
		<S.Table align="left">
			<S.Header>
				<tr>
					{columns.map((column, index) => (
						<th
							style={{ width: column.width }}
							className={column.class}
							key={index}
						>
							{column.name}
							<ChevronsUpDown />
						</th>
					))}
					<th></th>
				</tr>
			</S.Header>
			<S.Body>
				{items &&
					items.length > 0 &&
					/* eslint-disable @typescript-eslint/no-explicit-any */
					items.map((item: any, rowIndex: number) => (
						<S.Row key={rowIndex} className="cell-table">
							{columns.map((column, colIndex) => (
								<S.Cell
									style={{ width: column.width }}
									className={'row-field ' + column.class}
									key={colIndex}
								>
									<div className="box-domain-status">
										<div className="field-line">
											{column.identifier == 'associateFunnel' ? (
												item[column.identifier] == '' ? (
													<span style={{ color: '#D25004' }}>
														Não associado
													</span>
												) : (
													item[column.identifier]
												)
											) : (
												item[column.identifier]
											)}
										</div>
									</div>
								</S.Cell>
							))}
							<td></td>
						</S.Row>
					))}
			</S.Body>
		</S.Table>
	)
}
