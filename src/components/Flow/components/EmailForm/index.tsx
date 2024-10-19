/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { Button } from '../../../Button'
import { Select } from '../../../Select'

import { ExternalLink, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
	getActiveCampaignLists,
	getActiveCampaignNew,
	getActiveCampaignTags,
	getMailChimpLists,
	getMailchimp,
	getMailchimpTags
} from '../../../../services/setting'
import { EmptyWrapper } from '../../../EmptyWrapper/styles'
import * as S from './styles'
import { TagComponent } from '../../../Tag'

type Tags = {
	id: string
	name: string
	value: string
}

export function EmailForm({
	newEmailNode
}: {
	newEmailNode: (
		platform: string,
		listName: string,
		listId: string,
		tags: Tags[]
	) => void
}) {
	const [emailPlatform, setEmailPlatform] = useState<string>('')
	const [platformsIntegrated, setPlatformsIntegrated] = useState<string[]>([])
	const [emailList, setEmailList] =
		useState<{ listName: string; listId: string }[]>()
	const [selectedList, setSelectedList] = useState<string>('')
	const [currentTags, setCurrentTags] = useState<Tags[]>([])
	const [selectedTags, setSelectedTags] = useState<Tags[]>([])
	const [selectTags, setSelectTags] = useState<string>('')
	const [insertError, setInsertError] = useState<string>('')
	const [toRemove, setToRemove] = useState<string[]>([])
	const [toSelectedTag, setToSelectedTag] = useState<string | null>(null)

	const [loading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	async function verifyIntegrations() {
		try {
			setIsLoading(true)
			const hasMailChimp = await getMailchimp()
				.then((res) => {
					return res
				})
				.catch(() => {
					return undefined
				})
			const hasActiveCampaign = await getActiveCampaignNew()
				.then((res) => {
					return res
				})
				.catch(() => {
					return undefined
				})

			if (hasMailChimp !== undefined) {
				setPlatformsIntegrated((state) => {
					const newState = [...state, 'mailchimp']
					return [...new Set(newState)]
				})
			}

			if (hasActiveCampaign !== undefined) {
				setPlatformsIntegrated((state) => {
					const newState = [...state, 'active-campaign']
					return [...new Set(newState)]
				})
			}

			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

	async function onHandleSubmit() {
		const getListName = emailList!.find((list) => list.listId === selectedList)

		newEmailNode(
			emailPlatform,
			getListName!.listName,
			selectedList,
			selectedTags
		)
	}

	async function fetchLists(value: string) {
		if (value === 'active-campaign') {
			const lists = await getActiveCampaignLists()
			if (lists.length > 0) {
				setEmailList(
					lists.map((list: { name: string; id: string }) => {
						return {
							listName: `${list.name}`,
							listId: list.id
						}
					})
				)
			} else {
				setEmailList([])
			}

			return
		}

		if (value === 'mailchimp') {
			const lists = await getMailChimpLists()
			if (lists.length > 0) {
				setEmailList(
					lists.map((list: { name: string; id: string }) => {
						return {
							listName: `${list.name}`,
							listId: list.id
						}
					})
				)
			} else {
				setEmailList([])
			}
		}
	}

	function onRemoveTag(item: string) {
		setSelectedTags((prevItems) =>
			prevItems.filter((selected) => selected.id !== item)
		)
	}

	async function handleChangeList(value: string) {
		setSelectedList(value)

		if (emailPlatform === 'mailchimp') {
			const response = await getMailchimpTags(value)
			setCurrentTags(response)
			return
		}

		if (emailPlatform === 'active-campaign') {
			const response = await getActiveCampaignTags()
			setCurrentTags(response)
		}
	}

	const existsTagInList = (id: string): boolean => {
		if (selectedTags?.length) {
			return selectedTags.find((tag) => tag.id == id) ? true : false
		}
		return false
	}

	const insertTag = (id: string) => {
		const findTag = currentTags?.find((tag) => tag.id == id)
		setInsertError('')
		if (findTag) {
			if (toRemove.includes(id)) {
				setToRemove(toRemove.filter((r) => r !== id))
			}
			if (!existsTagInList(findTag.id)) {
				setSelectedTags((state) => [...state, findTag])
			} else {
				setInsertError('Essa tag já foi adicionada.')
			}
		}
	}

	function handleIdChange(id: string) {
		setSelectTags(id)
		setToSelectedTag(id)
	}

	useEffect(() => {
		verifyIntegrations()
	}, [])

	return (
		<S.Container>
			{platformsIntegrated.length <= 0 && !loading && (
				<EmptyWrapper style={{ marginTop: 0 }}>
					<span style={{ fontSize: '0.6rem' }}>
						Nenhuma plataforma integrada, verifique suas integrações
					</span>
					<S.ExternalButton
						onClick={() => navigate('/settings?active=integracoes')}
					>
						<ExternalLink strokeWidth={1} />
						Realize a integração por aqui!!
					</S.ExternalButton>
				</EmptyWrapper>
			)}
			{platformsIntegrated.length <= 0 && loading && (
				<EmptyWrapper>
					<Loader2 strokeWidth={1} />
					<span style={{ fontSize: '0.6rem' }}>Carregando plataformas</span>
				</EmptyWrapper>
			)}
			{platformsIntegrated.length > 0 && !loading && (
				<>
					<Select
						label="Plataforma de email"
						placeholder="Selecione a plataforma de email"
						currentValue={emailPlatform}
						handleChange={(value) => {
							setEmailList([])
							setSelectedList('')
							setEmailPlatform(value)
							fetchLists(value)
						}}
						items={platformsIntegrated.map((platform) => ({
							name: platform,
							value: platform,
							id: platform
						}))}
					/>
					{emailPlatform ? (
						<>
							<Select
								label="Lista desejada"
								placeholder="Selecione a lista desejada"
								currentValue={selectedList}
								handleChange={(value) => handleChangeList(value)}
								items={emailList?.map((list) => ({
									name: list.listName,
									value: list.listId,
									id: list.listId
								}))}
							/>
							{selectedList && (
								<>
									<Select
										label="Escolha as tags"
										placeholder="Clique para escolher as tags"
										items={currentTags}
										currentValue={selectTags}
										handleChange={(id) => handleIdChange(id)}
									/>
									{insertError && <span>{insertError}</span>}
									<Button
										onClick={() => insertTag(toSelectedTag!)}
										className="add"
										shape="grey"
										style={{ marginLeft: 'auto' }}
										type="button"
									>
										Adicionar
									</Button>
								</>
							)}
						</>
					) : (
						<span style={{ fontSize: '0.8rem', opacity: 0.5 }}>
							Selecione um plataforma
						</span>
					)}

					<span style={{ fontSize: '12px' }}>Tags selecionadas</span>
					<S.TagList>
						{selectedTags.map((tag) =>
							!toRemove.includes(tag.id) ? (
								<TagComponent
									removeItem={(id) => onRemoveTag(id)}
									key={tag.id}
									item={{
										id: tag.id,
										name: tag.name,
										value: tag.value,
										platform: ''
									}}
								/>
							) : null
						)}
					</S.TagList>

					<footer>
						<Close asChild>
							<Button shape="text" $fullwidth>
								Cancelar
							</Button>
						</Close>
						<Button
							onClick={() => onHandleSubmit()}
							$fullwidth
							disabled={!emailPlatform}
						>
							Confirmar
						</Button>
					</footer>
				</>
			)}
		</S.Container>
	)
}
