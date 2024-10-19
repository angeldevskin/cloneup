/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'

import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select'
import { EmptyWrapper } from '../../../../src/components/EmptyWrapper/styles'

import * as S from '../../../components/Funnels/FormWrapper/styles'

import { FormType, FunnelType } from '../../../@types/pages/funnels'
import { useEffect, useState } from 'react'
import { getAllFunnel } from '../../../services/funnels.service'
import {
	getAllExternalCodes,
	updatePixelCodeSourceFunnel
} from '../../../services/pixel-code.service'
import { toast } from 'react-toastify'
import { errorToast } from '../../../components/Toast/types'
import { PlataformsFunnel } from '../../Codes/configs/PlatformsFunnel'
import { Loader2 } from 'lucide-react'
import * as E from './style'
import faceIcon from '../../../assets/images/icons-platforms/face.svg'
import X from '../../../assets/images/icons-platforms/X.svg'
import taboola from '../../../assets/images/icons-platforms/taboola.svg'
import custom from '../../../assets/images/icons-platforms/custom.svg'
import gads from '../../../assets/images/icons-platforms/gads.svg'
import gtagIcon from '../../../assets/images/icons-platforms/gtag.svg'
import { PixelCode } from '../../../services/models/pixel-code'
import { TagComponent } from '../../../components/Tag'
import { useNavigate } from 'react-router-dom'

type TypeCodes = {
	id: string
	value: string
	platform: string
	funnelIds: string[]
}

export function ExternalCodeFunnel({ funnelId, onCloseModal }: any) {
	const navigate = useNavigate()
	const { handleSubmit } = useForm<FormType>()
	const [, setFunnels] = useState<FunnelType[]>([])
	const [platformHasPixels, setPlatformHasPixels] = useState<
		boolean | undefined
	>(false)
	const [selectOptionService, setSelectOptionService] = useState<string>('')
	const [selectedCode, setSelectedCode] = useState<any>()
	const [, setPlaceholderID] = useState<string>('Digite o ID')

	const [isPending, setIsPending] = useState<boolean>(false)
	const [, setBtndisabled] = useState<any>(false)
	const [externalCodeList, setExternaCodeList] = useState<TypeCodes[]>()
	const [filteredCodes, setFilteredCodes] = useState<TypeCodes[] | undefined>(
		[]
	)
	const [codeLists, setListCodes] = useState<TypeCodes[]>([])
	const [insertError, setInsertError] = useState<string>('')
	const [toRemove, setToRemove] = useState<string[]>([])

	async function onSubmit() {
		const codeToUpdate = JSON.parse(JSON.stringify(codeLists))
		setBtndisabled(true)
		setIsPending(true)

		try {
			for (const code of codeToUpdate) {
				const actualFunnels: string[] = code.funnelIds ?? []
				actualFunnels.push(funnelId)

				let filteredArray = Array.from(new Set(actualFunnels))
				if (toRemove.includes(code.id)) {
					filteredArray = filteredArray.filter((f) => f !== funnelId)
				}
				try {
					await updatePixelCodeSourceFunnel(code.id, {
						funnelIds: filteredArray
					})
				} catch (error) {
					toast.error(`Erro ao atrelar o código ${code.name}`)
				}
			}
			onCloseModal(true)
			setIsPending(false)
			toast.success('Funil atualizado com sucesso!')
		} catch (error) {
			setIsPending(false)
			console.error(error)
			toast.error('Erro ao salvar o funil.', errorToast)
		}
	}

	async function fetchFunnel() {
		try {
			const response = await getAllFunnel()
			setFunnels(response)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	const fetchExternalCodes = async (): Promise<void> => {
		try {
			const pixelCodeSource: PixelCode[] = await getAllExternalCodes()
			setExternaCodeList(mapExternalCodes(pixelCodeSource))
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	const mapExternalCodes = (codes: PixelCode[]): TypeCodes[] => {
		return codes.map((code) => ({
			id: code._id,
			value: code.name,
			platform: code.platform,
			funnelIds: code.funnelIds
		}))
	}

	function handleIdChange(id: string) {
		setSelectOptionService(id)
		if (id == 'META_ADS') {
			setPlaceholderID('Ex.: 467919022149332')
		} else if (id == 'GOOGLE_TAG_MANAGER') {
			setPlaceholderID('Ex.: GTM-FCH5PKG')
		} else if (id == 'GOOGLE_ADS') {
			setPlaceholderID('Ex.: AW-12208310814')
		} else if (id == 'TIKTOK_ADS') {
			setPlaceholderID('Ex.: CEJ60CJC77UA31R53D1G')
		} else if (id == 'Taboola') {
			setPlaceholderID('Ex.: 3482734623987')
		} else if (id == 'X') {
			setPlaceholderID('Ex.: tw-ntggz-u3dkv ')
		}

		const funnelExists = externalCodeList?.some((code) => code.platform === id)
		if (!funnelExists) {
			setSelectedCode(null)
			setFilteredCodes([])
			setInsertError(
				'Não existe nenhum código externo cadastrado para essa plataforma.'
			)
		} else {
			setInsertError('')
		}
	}

	const populateExternalCodes = () => {
		setFilteredCodes(
			externalCodeList?.filter((code) => code.platform == selectOptionService)
		)
	}

	const existsCodeInList = (id: string): boolean => {
		if (codeLists?.length) {
			return codeLists.find((code) => code.id == id) ? true : false
		}

		return false
	}

	const insertCode = (id: string) => {
		const findCode = externalCodeList?.find((code) => code.id == id)
		setInsertError('')
		setSelectedCode(null)
		if (findCode) {
			if (toRemove.includes(id)) {
				setToRemove(toRemove.filter((r) => r !== id))
			}
			setTimeout(() => {
				if (!existsCodeInList(findCode.id)) {
					setListCodes((state) => [...state, findCode])
				} else {
					setInsertError('Esse código já foi adicionado.')
				}
			}, 1)
		}
	}

	const onRemoveItem = (id: string) => {
		const filterToRemove = Array.from(new Set(toRemove))
		filterToRemove.push(id)
		setToRemove(filterToRemove)
	}

	useEffect(() => {
		fetchFunnel()
		fetchExternalCodes()
	}, [])

	useEffect(() => {
		populateExternalCodes()
	}, [selectOptionService])

	useEffect(() => {
		if (externalCodeList) {
			setListCodes(
				externalCodeList?.filter((code) => code.funnelIds?.includes(funnelId))
			)
		}
	}, [externalCodeList])

	useEffect(() => {
		const hasPixels = externalCodeList?.some(
			(code) => code.platform === selectOptionService
		)
		setPlatformHasPixels(hasPixels)
	}, [selectOptionService, externalCodeList])

	const platFormsIcons: { [key: string]: string } = {
		META_ADS: faceIcon,
		GOOGLE_TAG_MANAGER: gtagIcon,
		GOOGLE_ADS: gads,
		TABOOLA: taboola,
		X: X,
		CUSTOM: custom
	}

	return (
		<E.CodeFieldWrapper>
			<>
				{isPending && (
					<EmptyWrapper>
						<Loader2 strokeWidth={1} />
						<span>Salvando código</span>
					</EmptyWrapper>
				)}
				{!isPending && (
					<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
						<E.CodeFieldWrapperTitle>
							Selecione um código cadastrado. Você também pode{' '}
							<a
								style={{ cursor: 'pointer' }}
								onClick={() => navigate('/codes')}
							>
								cadastrar um novo código.
							</a>
						</E.CodeFieldWrapperTitle>
						<E.CodeField>
							<div className="servico">
								<Select
									items={PlataformsFunnel}
									withIdValue={true}
									label="Escolha o serviço"
									placeholder={
										selectOptionService
											? selectOptionService
											: 'Escolha o serviço'
									}
									currentValue={selectOptionService}
									handleChange={(id) => handleIdChange(id)}
								/>
							</div>

							<Select
								isDisabled={!filteredCodes || !filteredCodes?.length}
								items={filteredCodes?.map((externalCode: TypeCodes) => ({
									id: externalCode?.id ?? '',
									name: externalCode?.value ?? '',
									value: externalCode?.value ?? ''
								}))}
								label="Escolha o código"
								withIdValue={true}
								placeholder={selectedCode ? selectedCode : 'Escolha o código'}
								currentValue={selectedCode}
								handleChange={(id) => setSelectedCode(id)}
							/>
							{insertError && <E.InsertError>{insertError}</E.InsertError>}
							<Button
								onClick={() => insertCode(selectedCode)}
								className="add"
								shape="grey"
								style={{ marginLeft: 'auto' }}
								type="button"
								disabled={!platformHasPixels}
							>
								Adicionar
							</Button>
						</E.CodeField>

						<E.ExternalCodeWrapper>
							<div className="footer">
								<label className="footer__title">
									Este funil possui os seguintes códigos:
								</label>
							</div>
							<div className="current-codes">
								{codeLists &&
									codeLists.map((tab, i) =>
										!toRemove.includes(tab.id) ? (
											<TagComponent
												removeItem={(id) => onRemoveItem(id)}
												icon={platFormsIcons[tab.platform]}
												key={i}
												item={tab}
											/>
										) : null
									)}
							</div>
						</E.ExternalCodeWrapper>

						<S.ConfirmationWrapper className="confirmation_form">
							<>
								<Button style={{ marginLeft: 'auto' }} type="submit">
									Salvar alterações
								</Button>
							</>
						</S.ConfirmationWrapper>
					</S.FormWrapper>
				)}
			</>
		</E.CodeFieldWrapper>
	)
}
