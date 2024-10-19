import {
	ColumnDef,
	RowSelectionState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import { MoveDown, MoveUp } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import * as S from './styles'

import { MetricsFilterProps } from '../../@types/pages/funnels'
import { TemplatesListFilterProps } from '../../@types/templates'
import { ColumnsAssistantFilterProps } from '../../models/assistant.model'
import { ColumnsFilterPropsCode } from '../../models/code.model'
import { ColumnsFilterProps } from '../../models/leads.model'
import { ColumnsTeamsFilterProps } from '../../models/teams.model'

type DataTableProps<TableCols, TableData> = {
	handleClickOnCell: (
		id: string,
		event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
	) => void
	columns: ColumnDef<TableData, TableCols>[]
	getRowId?: (row: TableData) => string
	data: TableData[]
	sortingData?: {
		sorting: SortingState
		setSorting: Dispatch<SetStateAction<SortingState>>
	}
	visibleColumns?:
		| MetricsFilterProps
		| ColumnsFilterProps
		| ColumnsFilterPropsCode
		| ColumnsAssistantFilterProps
		| ColumnsTeamsFilterProps
		| TemplatesListFilterProps
	filter?: string
	setFilter?: Dispatch<SetStateAction<string>>
	rowSelection?: RowSelectionState
	setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>
}

export function TableCore<TableCols, TableData>({
	handleClickOnCell,
	columns,
	data,
	sortingData,
	getRowId,
	visibleColumns,
	filter,
	setFilter,
	rowSelection,
	setRowSelection
}: DataTableProps<TableCols, TableData>) {
	const [columnVisibility, setColumnVisibility] = useState({})

	const table = useReactTable({
		getRowId,
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting: sortingData?.sorting,
			columnVisibility,
			globalFilter: filter,
			rowSelection
		},
		onSortingChange: sortingData?.setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		onGlobalFilterChange: setFilter,
		onRowSelectionChange: setRowSelection,
		enableMultiRowSelection: true
	})

	useEffect(() => {
		if (!visibleColumns) return
		setColumnVisibility(visibleColumns)
	}, [visibleColumns])

	return (
		<S.TableWrapper>
			<S.TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<S.TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<S.TableHead key={header.id} width={header.getSize()}>
									{header.isPlaceholder ? null : (
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												margin: '0 0 1rem 0.5rem',
												cursor: 'pointer'
											}}
											onClick={header.column.getToggleSortingHandler()}
											className={
												header.column.getCanSort() ? 'cursor-pointer' : ''
											}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{
												{
													asc: <MoveDown strokeWidth={1} size={16} />,
													desc: <MoveUp strokeWidth={1} size={16} />
												}[header.column.getIsSorted() as string]
											}
										</div>
									)}
								</S.TableHead>
							)
						})}
					</S.TableRow>
				))}
			</S.TableHeader>
			<S.TableBody>
				{table.getRowModel().rows.length ? (
					table.getRowModel().rows.map((row) => (
						<S.TableRow
							key={row.id}
							data-state={row.getIsSelected() ? 'selected' : 'unselected'}
							onClick={(event) =>
								handleClickOnCell(
									row.getValue('_id') || row.getValue('assistantId'),
									event
								)
							}
						>
							{row.getVisibleCells().map((cell) => (
								<S.TableDataCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</S.TableDataCell>
							))}
						</S.TableRow>
					))
				) : (
					<S.TableRow>
						<S.TableHead colSpan={columns.length} width={100}>
							{' '}
						</S.TableHead>
					</S.TableRow>
				)}
			</S.TableBody>
		</S.TableWrapper>
	)
}
