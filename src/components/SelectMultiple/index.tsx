/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, X } from 'lucide-react'

import * as S from './styles'
import { useState } from 'react'

type SelectType = {
	label?: string
	placeholder?: string
	width?: number
	handleChange: (value: TypePages) => void
	removeItem?: (value: TypePages) => void
	currentValue: string
	items?: Items[]
	multiple?: boolean
	selectedItems?: TypePages[]
}

type Items = {
	name: string
	id: string
	value: string
}

type TypePages = {
	id: string
	value: string
}

export function SelectMultiple({
	label = '',
	placeholder = '',
	width,
	items,
	selectedItems,
	handleChange,
	removeItem
}: SelectType) {
	const [open, setOpen] = useState<boolean>(false)

	function handleOpen(e: React.MouseEvent<HTMLDivElement | HTMLSpanElement>) {
		const target = e.target as HTMLElement
		if (!target.classList.contains('tag')) {
			setOpen(!open)
		}
	}

	function handleSelectChange(item: TypePages) {
		setOpen(false)
		handleChange(item)
	}

	function hasUnselectedItems(items: Items[] | undefined): boolean {
		if (!items) {
			return false
		}
		return items.some(
			(item) => !selectedItems?.find((selected) => selected.id === item.id)
		)
	}

	function onRemove(
		item: TypePages,
		e: React.MouseEvent<HTMLDivElement | HTMLSpanElement>
	) {
		e.stopPropagation()
		setOpen(false)
		if (removeItem && selectedItems) removeItem(item)
	}

	return (
		<S.Container>
			{!!label && <label>{label}</label>}
			<S.SelectTrigger
				className={'multiple'}
				aria-label={label}
				width={width}
				onClick={(e) => handleOpen(e)}
			>
				{!selectedItems?.length && <span>{placeholder}</span>}
				<ChevronDown />
				{selectedItems && removeItem && (
					<div className="selected-tags">
						{selectedItems?.length
							? selectedItems.map((item, index) => (
									<span
										onClick={(e) => onRemove(item, e)}
										className="tag"
										key={index}
									>
										{item.value}
										<X />
									</span>
							  ))
							: null}
					</div>
				)}
			</S.SelectTrigger>
			{open && hasUnselectedItems(items) && (
				<S.SelectDiv>
					{items &&
						items
							.filter(
								(item) =>
									!selectedItems?.find((selected) => selected.id === item.id)
							)
							.map((item, i) => (
								<S.SelectItem onClick={() => handleSelectChange(item)} key={i}>
									{item.value}
								</S.SelectItem>
							))}
				</S.SelectDiv>
			)}
		</S.Container>
	)
}
