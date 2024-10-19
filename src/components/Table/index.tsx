import { ReactNode, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import * as S from './styles'
import './styles.css'
import { Check } from 'lucide-react'

export type TableProps = {
	columns: Array<{
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

export function Table({ columns, items, actions, moreActions }: TableProps) {
	const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null)

	const handleMouseEnter = (index: number) => {
		setHoveredItemIndex(index)
	}

	const handleMouseLeave = () => {
		setHoveredItemIndex(null)
	}

	const direcionaWhatsApp = (numeroUser: string) => {
		const whatsappLink = `https://api.whatsapp.com/send?phone=55${numeroUser
			.replace(' ', '')
			.replace(/[^\w\s]/gi, '')}`
		window.open(whatsappLink, '_blank')
	}

	const formatNumber = (numeroUser: string) => {
		numeroUser = numeroUser.replace(/\D/g, '')
		return `+55 ${numeroUser.slice(0, 2)} ${numeroUser.slice(
			2,
			7
		)}-${numeroUser.slice(7, 11)}`
	}

	return (
		<S.Table>
			<S.Header>
				<tr>
					{columns.map((column, index) => (
						<th className={column.class} key={index}>
							{column.name}
						</th>
					))}
				</tr>
			</S.Header>
			<S.Body>
				{items &&
					items.length > 0 &&
					/* eslint-disable @typescript-eslint/no-explicit-any */
					items.map((item: any, rowIndex: number) => (
						<S.Row key={rowIndex} className="cell-table">
							{columns.map((column, colIndex) => (
								<S.Cell className={'row-field ' + column.class} key={colIndex}>
									<div className="field-line">
										<div>
											{column.identifier === 'telephone' ? (
												formatNumber(item[column.identifier])
											) : item[column.identifier] ? (
												item[column.identifier] === 'check' ? (
													<Check />
												) : item[column.identifier] ? (
													item[column.identifier]
												) : (
													'-'
												)
											) : (
												'-'
											)}
										</div>
										{column.identifier === 'telephone' ? (
											<div
												className="whats-icon"
												style={{
													backgroundColor:
														hoveredItemIndex === rowIndex
															? '#25D366'
															: '#F2F2F3'
												}}
												onMouseEnter={() => handleMouseEnter(rowIndex)}
												onMouseLeave={handleMouseLeave}
												onClick={() =>
													direcionaWhatsApp(item ? item['telephone'] : '')
												}
											>
												<FaWhatsapp
													size="20px"
													color={
														hoveredItemIndex === rowIndex
															? '#FFFFFF'
															: '#25D366'
													}
												/>
											</div>
										) : null}
									</div>
								</S.Cell>
							))}
							{actions && (
								<S.Cell>
									<S.ActionsContainer>
										{actions &&
											actions.map((action, index) => (
												<S.ActionButton
													key={index}
													// className="details-button-leads"
													onClick={() =>
														action.onClick(
															item
																? (item['id' as keyof typeof item] as string)
																	? (item['id' as keyof typeof item] as string)
																	: (item['_id' as keyof typeof item] as string)
																: ''
														)
													}
												>
													{action.icon}
												</S.ActionButton>
											))}
										{moreActions &&
											moreActions(
												item
													? (item['id' as keyof typeof item] as string)
														? (item['id' as keyof typeof item] as string)
														: (item['_id' as keyof typeof item] as string)
													: ''
											)}
									</S.ActionsContainer>
								</S.Cell>
							)}
						</S.Row>
					))}
			</S.Body>
		</S.Table>
	)
}
