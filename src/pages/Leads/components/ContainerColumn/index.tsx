import {
	useSortable,
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { GripVertical } from 'lucide-react'
import { useState } from 'react'
import { SelectResponsable } from '../../../../components/SelectResponsable'
import { axiosRoot } from '../../../../http/axios'
import { Lead } from '../../../../models/leads.model'
import { ItemColumn } from '../ItemColumn'
import * as S from './styles'

type ContainerColumnProps = {
	columnData: {
		id: string
		name: string
		pageId: string
		managerId: string
	}
	isOver: boolean
	items: Lead[]
	title: string
	shouldReload: (funnelId: string) => void
	assistantsManagers: {
		_id: string
		name: string
		assistantManagerType: 'human' | 'ia'
	}[]
}

export function ContainerColumn({
	items,
	title,
	columnData,
	assistantsManagers,
	shouldReload,
	isOver
}: ContainerColumnProps) {
	const { setNodeRef, transform, listeners, attributes, isDragging } =
		useSortable({
			id: columnData.id,
			data: {
				type: 'column',
				column: columnData
			}
		})

	const style = {
		transform: isDragging
			? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
			: undefined,
		transition: 'margin 0.2s ease, transform 0.2s ease',
		marginLeft: isOver ? '30px' : '0px',
		marginRight: isOver ? '30px' : '0px',
		flex: '0 0 auto',
		cursor: 'grab'
	}

	async function handleChangeManager(value: string) {
		setCurrentManager(value)
		const manager = assistantsManagers.find((item) => item.name === value)

		await axiosRoot().put(`/crm/pageAssistant/${columnData.pageId}`, {
			assistantManagerId: manager?._id,
			assistantManagerType: manager?.assistantManagerType.toLowerCase()
		})

		shouldReload(items[0].funnelId)
	}

	const [currentManager, setCurrentManager] = useState(
		assistantsManagers.find((item) => item._id === columnData.managerId)?.name
	)

	return (
		<S.Wrapper ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<GripVertical />
				{title}
			</div>
			<SelectResponsable
				items={assistantsManagers}
				currentValue={currentManager}
				defaultValue={
					assistantsManagers.find((item) => item._id === columnData.managerId)
						?.name
				}
				handleChange={(value) => handleChangeManager(value)}
			/>

			<div
				style={{
					background: '#f2f2f3',
					padding: '0.5rem',
					flexDirection: 'column',
					display: 'flex',
					gap: '1rem',
					overflowY: 'scroll',
					borderTop: '1px solid #cdd2d5'
				}}
			>
				<SortableContext
					items={items.map((item) => item._id)}
					strategy={verticalListSortingStrategy}
				>
					{items.map((item) => (
						<ItemColumn key={item._id} dataitem={item} />
					))}
				</SortableContext>
			</div>
		</S.Wrapper>
	)
}
