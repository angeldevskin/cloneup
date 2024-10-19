import { Cloud, PenLine } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../../../../components/Button'
import { DialogRoot } from '../../../../components/Dialog'
import { DropdownRoot } from '../../../../components/Dropdown'
import { EditFunnelForm } from '../../EditFunnelForm'

import { useFunnels } from '../../../../services/store/funnels'

export type FunnelActionsProps = {
	handleSaveFunnel: () => void
}

export function FunnelActions({ handleSaveFunnel }: FunnelActionsProps) {
	const [menuOpen, setMenuOpen] = useState(false)

	const { currentFunnel } = useFunnels((state) => state)

	return (
		<>
			<DropdownRoot
				items={[
					{
						title: 'Editar funil',
						icon: <PenLine />,
						action: () => setMenuOpen(true),
						$actionType: 'default'
					}
				]}
			/>
			<DialogRoot
				isOpen={menuOpen}
				setIsOpen={() => setMenuOpen(!menuOpen)}
				title="Editar funil"
			>
				<EditFunnelForm
					funnelId={currentFunnel._id!}
					closeDialog={() => setMenuOpen(false)}
				/>
			</DialogRoot>
			<Button shape="success" onClick={() => handleSaveFunnel()}>
				<Cloud />
				Salvar
			</Button>
		</>
	)
}
