/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { SelectMultiple } from '../../../../components/SelectMultiple'
import * as S from './styles'
import { Triggers } from '../../../Codes/configs/TriggerEmotion'
import { useState } from 'react'

export function Trigger() {
	const [selectOptionService, setSelectOptionService] = useState<string>('')
	const [selectedItems, setSelectedItems] = useState<any[]>([])

	function onRemoveItemPage(item: any) {
		setSelectedItems((prevItems) =>
			prevItems.filter((selected) => selected.id !== item.id)
		)
	}

	function handleIdChange(item: any) {
		setSelectedItems((prevItems) => [...prevItems, item])
		setSelectOptionService(item.value)
	}

	return (
		<S.Container>
			<h1>Gatilho</h1>
			<S.SelectableItem>
				<SelectMultiple
					items={Triggers}
					label="Escolha uma ou mais gatilhos"
					placeholder={'Clique para escolher os gatilhos'}
					currentValue={selectOptionService}
					selectedItems={selectedItems}
					multiple={true}
					removeItem={onRemoveItemPage}
					handleChange={handleIdChange}
				/>
			</S.SelectableItem>
		</S.Container>
	)
}
