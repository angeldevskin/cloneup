import { Editor } from 'grapesjs'
import { useEditor } from '@grapesjs/react'
import {
	Root,
	Sub,
	SubTrigger,
	SubContent,
	Item
} from '@radix-ui/react-dropdown-menu'
import {
	Root as AccordionRoot,
	Item as AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '@radix-ui/react-accordion'
import { TextField } from '../TextField'
import { Tooltip } from '../../../Tooltip'
import {
	ChevronDown,
	ChevronRight,
	Terminal,
	ChevronsRight
} from 'lucide-react'
import AI from '../../../../assets/images/AI.svg'
import brain from '../../../../assets/images/brain.svg'
import spinner from '../../../../assets/images/spinner.svg'

import * as S from './styles'

export type ItemsType = {
	title: string
	icon: JSX.Element
}

export type SubItemsType = {
	title: string
}

export type DropdownAI = {
	items: ItemsType[]
	subItems: SubItemsType[]
	handleClickMentalTrigger: (title: string, editor: Editor) => void
	hadleClickMainOptions: (title: string, editor: Editor) => void
	handleClickNewPromptCommand: () => void
	handleClickDropdown: (open: boolean) => void
	handleClickAccordion: () => void
	newPromptCommand: boolean
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onKeyDown: (
		event: React.KeyboardEvent<HTMLInputElement>,
		editor: Editor
	) => void
	value: string
	loading: boolean
}

export function DropDownAI({
	items,
	subItems,
	handleClickDropdown,
	hadleClickMainOptions,
	handleClickMentalTrigger,
	handleClickAccordion,
	handleClickNewPromptCommand,
	newPromptCommand,
	onChange,
	onKeyDown,
	value,
	loading
}: DropdownAI) {
	const editor = useEditor()

	return (
		<>
			<S.Container>
				<AccordionRoot
					className="AccordionRoot"
					type="single"
					defaultValue="item-1"
					collapsible
					orientation="horizontal"
				>
					<AccordionItem className="AccordionItem" value="item-1">
						<AccordionTrigger onClick={handleClickAccordion}>
							<ChevronsRight
								strokeWidth={2}
								color="#444F55"
								className="chevrons-right"
							/>
						</AccordionTrigger>

						<AccordionContent className="accordion-content">
							<Root onOpenChange={(open) => handleClickDropdown(open)}>
								<S.DropdownTrigger>
									<span>Dar um Up!</span>
									<img
										src={loading ? spinner : AI}
										className={loading ? 'spinner' : ''}
									/>
									<ChevronDown strokeWidth={2} color="#444F55" />
								</S.DropdownTrigger>

								<S.DropdownContent>
									<Sub>
										<SubTrigger>
											<img src={brain} />
											<span>Aplicar gatilho mental</span>
											<ChevronRight strokeWidth={2} color="#444F55" />
										</SubTrigger>

										<SubContent>
											{subItems.map((item, index) => (
												<Item
													key={index}
													onClick={() =>
														handleClickMentalTrigger(item.title, editor)
													}
												>
													{item.title}
												</Item>
											))}
										</SubContent>
									</Sub>
									{items.map((item, index) => (
										<S.ContainerItem key={index}>
											<Item>
												{item.icon}
												<span
													onClick={() =>
														hadleClickMainOptions(item.title, editor)
													}
												>
													{item.title}
												</span>
											</Item>
										</S.ContainerItem>
									))}

									<S.DropdownSeparator />

									<Item onClick={handleClickNewPromptCommand}>
										<Terminal strokeWidth={2} color="#444F55" />
										<span>Novo prompt</span>
									</Item>
								</S.DropdownContent>
							</Root>
						</AccordionContent>
					</AccordionItem>
				</AccordionRoot>
			</S.Container>
			{newPromptCommand && (
				<S.ContentNewPromptCommand>
					<span>Novo Prompt</span>
					<TextField
						$fullwidth={true}
						$borderPrompt={true}
						placeholder="Digite um comando personalizado"
						icon={
							<Tooltip
								trigger={
									<div
										style={{
											width: '100%',
											overflow: 'hidden',
											fontSize: '0.875rem',
											height: '24px',
											color: '#d7d5dd',
											paddingRight: '8px'
										}}
									>
										<Terminal strokeWidth={1} color="#444F55" />
									</div>
								}
								content={''}
							/>
						}
						onChange={onChange}
						onKeyDown={(event) => onKeyDown(event, editor)}
						value={value}
					/>
				</S.ContentNewPromptCommand>
			)}
		</>
	)
}
