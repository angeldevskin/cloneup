import {
	closestCenter,
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext
} from '@dnd-kit/sortable'
import { ContainerColumn } from '../ContainerColumn'
import { axiosRoot } from '../../../../http/axios'
import { useState } from 'react'
import { Lead } from '../../../../models/leads.model'

import * as S from './styles'

interface Column {
	id: string
	pageId: string
	index: number
	name: string
	managerId: string
}

export interface LeadsBoardProps {
	handleFetchFunnel: (funnelId: string) => void
	leads: Lead[]
	setLeads: React.Dispatch<React.SetStateAction<Lead[]>>
	crmId: string
	currentAssistantsManagers: never[]
	columns: Column[]
	setColumns: React.Dispatch<React.SetStateAction<Column[]>>
	filteredData: Lead[]
}

export function LeadsBoard({
	handleFetchFunnel,
	columns,
	leads,
	crmId,
	currentAssistantsManagers,
	setColumns,
	setLeads,
	filteredData
}: LeadsBoardProps) {
	const [leadToHandle, setLeadToHandle] = useState<Lead>({} as Lead)
	const [activeOverColumn, setActiveOverColumn] = useState<string | null>(null)

	async function handleShouldReload(funnelId: string) {
		return await handleFetchFunnel(funnelId)
	}

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10
			}
		})
	)

	function handleDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === 'item') {
			return
		}
	}

	function handleDragOver(event: DragOverEvent) {
		const { active, over } = event
		if (!over) return

		const activeId = active.id
		const overId = over.id

		// Verifica se o item ativo é uma coluna ou um item
		const isActiveAColumn = active.data.current?.type === 'column'
		const isActiveAItem = active.data.current?.type === 'item'
		const isOverAColumn = over.data.current?.type === 'column'

		if (isActiveAColumn && isOverAColumn) {
			setActiveOverColumn(String(over.id))
			return
		}

		if (isActiveAItem && isOverAColumn) {
			const activeIndex = columns.findIndex((column) => column.id === active.id)

			const activeLeadIndex = leads.findIndex((lead) => lead._id === activeId)

			leads[activeLeadIndex].pageId = overId.toString()
			setLeads(arrayMove(leads, activeIndex, activeIndex))

			setLeadToHandle(leads[activeLeadIndex])
		}
	}

	async function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (!over) {
			setActiveOverColumn(null)
			return
		}

		const isActiveAColumn = active.data.current?.type === 'column'
		const isOverAColumn = over.data.current?.type === 'column'

		if (isActiveAColumn && isOverAColumn) {
			const activeIndex = columns.findIndex((column) => column.id === active.id)
			const overIndex = columns.findIndex((column) => column.id === over.id)

			if (activeIndex !== overIndex) {
				const newColumns = arrayMove(columns, activeIndex, overIndex)
				setColumns(newColumns)

				const pageWithIndex = newColumns.map((column, index) => ({
					pageId: column.id,
					index: index
				}))

				await axiosRoot().patch(`/crm/${crmId}`, {
					pageWithIndex: pageWithIndex
				})
			}
		}

		const isActiveAItem = active.data.current?.type === 'item'

		if (isActiveAItem && isOverAColumn) {
			const activeLeadIndex = leads.findIndex((lead) => lead._id === active.id)
			leads[activeLeadIndex].pageId = over.id.toString()
			setLeads([...leads])

			setLeadToHandle(leads[activeLeadIndex])

			await axiosRoot().patch(
				`/leads/external/${leadToHandle.leadRef}?validateVisitedPagesIds=false`,
				{
					pageId: leadToHandle.pageId
				} as Lead
			)
		}

		setActiveOverColumn(null)
	}

	return (
		<S.BoardWrapper>
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				collisionDetection={closestCenter}
			>
				<SortableContext
					items={columns}
					strategy={horizontalListSortingStrategy}
				>
					{columns.map((column) => (
						<ContainerColumn
							key={column.id}
							title={column.name}
							columnData={column}
							items={filteredData.filter(
								(lead) => lead.pageId === column.pageId
							)}
							shouldReload={handleShouldReload}
							assistantsManagers={currentAssistantsManagers}
							isOver={activeOverColumn === column.id}
						/>
					))}
				</SortableContext>
			</DndContext>
		</S.BoardWrapper>
	)
}
