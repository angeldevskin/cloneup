import { DomainItemResponseById } from '../../models/domain.model'
import { StatusPin } from '../StatusPin'
import * as S from './styles'
import './styles.css'
import { ReactNode, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

export type TableProps = {
	columns: Array<{
		name: string
		identifier: string
		class?: string
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

export function TableDomain({
	columns,
	columnsStatus,
	items,
	actions,
	moreActions
}: TableProps) {
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

	const statusPin = (data: DomainItemResponseById) => {
		if (
			data.dnsStatusA == 'PROPAGATED' ||
			data.dnsStatusCNAME == 'PROPAGATED'
		) {
			return 'success'
		} else if (
			data.dnsStatusCNAME == 'NOT_PROPAGATED' ||
			data.dnsStatusA == 'NOT_PROPAGATED'
		) {
			return 'advice'
		} else {
			return 'inProgress'
		}
	}

	const statusMessage = (data: DomainItemResponseById) => {
		if (
			data.dnsStatusA == 'PROPAGATED' ||
			data.dnsStatusCNAME == 'PROPAGATED'
		) {
			return 'ativo'
		} else if (
			data.dnsStatusCNAME == 'NOT_PROPAGATED' ||
			data.dnsStatusA == 'NOT_PROPAGATED'
		) {
			return 'ação necessária'
		} else {
			return 'Propagando'
		}
	}

	return (
		<S.Table align="left">
			<S.Header>
				<div className="header-container">
					<tr>
						{columns.map((column, index) => (
							<th className={column.class} key={index}>
								{column.name}
							</th>
						))}
					</tr>
					<tr className="title-status">
						{columnsStatus.map((column, index) => (
							<th className={column.class} key={index}>
								{column.name}
							</th>
						))}
					</tr>
				</div>
			</S.Header>
			<S.Body>
				{items &&
					items.length > 0 &&
					/* eslint-disable @typescript-eslint/no-explicit-any */
					items.map((item: any, rowIndex: number) => (
						<S.Row key={rowIndex} className="cell-table">
							{columns.map((column, colIndex) => (
								<S.Cell className={'row-field ' + column.class} key={colIndex}>
									<div className="box-domain-status">
										<div className="field-line">
											<div>
												{column.identifier === 'telephone'
													? formatNumber(item[column.identifier])
													: item[column.identifier]
													  ? item[column.identifier]
													  : '-'}
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
										<div className="tag-status">
											<StatusPin
												type={statusPin(item)}
												message={statusMessage(item)}
											/>
										</div>
									</div>
								</S.Cell>
							))}
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
						</S.Row>
					))}
			</S.Body>
		</S.Table>
	)
}
