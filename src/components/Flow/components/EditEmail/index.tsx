import { Close } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { Button } from '../../../Button'
import { Select } from '../../../Select'

import { ExternalLink, Loader2 } from 'lucide-react'
import {
	getActiveCampaignLists,
	getActiveCampaignNew,
	getActiveCampaignTags,
	getMailchimp,
	getMailChimpLists,
	getMailchimpTags
} from '../../../../services/setting'
import { EmptyWrapper } from '../../../EmptyWrapper/styles'
import * as S from './styles'
import { TagComponent } from '../../../Tag'
import { useNavigate } from 'react-router-dom'

type Tags = {
	id: string
	name: string
	value: string
}

export function EditEmail({
	platform,
	list,
	tags,
	handleResponse
}: {
	platform: string
	list: string
	tags: Array<Tags>
	handleResponse: (
		platform: string,
		listName: string,
		listId: string,
		tags: Tags[]
	) => void
}) {
	const [emailList, setEmailList] =
		useState<{ listName: string; listId: string }[]>()
	const [selectedList, setSelectedList] = useState<string>(list)
	const [currentTags, setCurrentTags] = useState<Tags[]>()
	const [insertError, setInsertError] = useState<string>('')
	const [toRemove, setToRemove] = useState<string[]>()
	const [tagLists, setListTags] = useState<Tags[]>(tags)
	const [toSelectedTag, setToSelectedTag] = useState<string | null>()
	const [selectOptionService, setSelectOptionService] = useState<string>('')
	const [platformsIntegrated, setPlatformsIntegrated] = useState<string[]>([])

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
		handleResponse(platform, getListName!.listName, selectedList, tagLists)
	}

	async function fetchTags() {
		if (platform === 'mailchimp') {
			const response = await getMailchimpTags(list)
			setCurrentTags(response)

			return
		}

		if (platform === 'active-campaign') {
			const response = await getActiveCampaignTags()
			setCurrentTags(response)
		}
	}

	async function fetchLists(value: string) {
		setIsLoading(true)
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

				await fetchTags()

				setIsLoading(false)
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

				await fetchTags()

				setIsLoading(false)
			} else {
				setEmailList([])
			}
		}
	}

	function onRemoveTag(item: string) {
		setListTags((prevItems) =>
			prevItems.filter((selected) => selected.id !== item)
		)
	}
	function handleIdChange(id: string) {
		setSelectOptionService(id)
		setToSelectedTag(id)
	}

	const existsTagInList = (id: string): boolean => {
		if (tagLists?.length) {
			return tagLists.find((tag) => tag.id == id) ? true : false
		}

		return false
	}

	const insertTag = (id: string) => {
		const findTag = currentTags?.find((tag) => tag.id == id)
		setInsertError('')
		if (findTag) {
			if (toRemove?.includes(id)) {
				setToRemove(toRemove.filter((r) => r !== id))
			}
			if (!existsTagInList(findTag.id)) {
				setListTags((state) => [...state, findTag])
			} else {
				setInsertError('Essa tag já foi adicionada.')
			}
		}
	}

	async function handleChangeList(value: string) {
		setSelectedList(value)

		if (platform === 'mailchimp') {
			const response = await getMailchimpTags(value)
			setCurrentTags(response)

			return
		}

		if (platform === 'active-campaign') {
			const response = await getActiveCampaignTags()
			setCurrentTags(response)
		}
	}

	useEffect(() => {
		verifyIntegrations()
		fetchLists(platform)
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
			{!loading && platformsIntegrated.length > 0 && (
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
					<Select
						label="Escolha as tags"
						placeholder="Clique para escolher as tags"
						items={currentTags}
						currentValue={selectOptionService}
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

					<span style={{ fontSize: '12px' }}>Tags selecionadas</span>
					<S.TagList>
						{tagLists.map((tag) =>
							!toRemove?.includes(tag.id) ? (
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
						<Button onClick={() => onHandleSubmit()} $fullwidth>
							Confirmar
						</Button>
					</footer>
				</>
			)}
		</S.Container>
	)
}
