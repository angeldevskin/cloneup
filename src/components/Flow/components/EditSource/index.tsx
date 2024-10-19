import { Close } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../../Button'
import { Select } from '../../../Select'
import { TextField } from '../../../TextField'

import { toast } from 'react-toastify'
import { useFunnels } from '../../../../services/store/funnels'
import {
	getTrafficSourceById,
	updateTrafficSource
} from '../../../../services/traffic.service'
import { successToast } from '../../../Toast/types'
import * as S from './styles'

export type ITrafficSource = {
	utmSource: string
	utmMedium: string
	utmCampaign: string
	budgetType?: string
	budget?: number
}

export function EditSource({
	sourceId,
	handleResponse
}: {
	sourceId: string
	handleResponse: (
		newData: {
			name: string
			budgetType: string
		} & ITrafficSource
	) => void
}) {
	const { currentFunnel } = useFunnels((state) => state)

	const [currentPlatform, setCurrentPlatform] = useState<string>()
	const [budgetType, setBudgetType] = useState<string>()
	const [currentSource, setCurrentSource] = useState<ITrafficSource>(
		{} as ITrafficSource
	)

	const { register, handleSubmit, setValue, reset } = useForm<{
		utmSource: string
		utmMedium: string
		utmCampaign: string
		budget?: number
	}>({
		values: {
			utmSource: currentSource.utmSource,
			utmMedium: currentSource.utmMedium,
			utmCampaign: currentSource.utmCampaign,
			budget: currentSource?.budget
		}
	})

	async function onHandleSubmit(fields: {
		utmSource: string
		utmMedium: string
		utmCampaign: string
		budget?: number
	}) {
		const newData = {
			funnelId: currentFunnel._id!,
			name: currentPlatform!,
			UTMSource: fields.utmSource!,
			UTMMedium: fields.utmMedium!,
			UTMCampaign: fields.utmCampaign!,
			budget: fields.budget,
			budgetType
		}
		const response = await updateTrafficSource(sourceId, newData)

		if (response) {
			handleResponse({
				name: response.trafficSource.name,
				utmSource: response.trafficSource.UTMSource,
				utmMedium: response.trafficSource.UTMMedium,
				utmCampaign: response.trafficSource.UTMCampaign,
				budget: response.trafficSource.budget,
				budgetType: response.trafficSource.budgetType
			})

			toast.success('Fonte de tráfego atualizada com sucesso', successToast)
			reset()

			return
		}
	}

	async function fetchSource() {
		const response = await getTrafficSourceById(sourceId)

		if (response) {
			setCurrentPlatform(response.trafficSource.name)
			setBudgetType(response.trafficSource.budgetType)
			setCurrentSource({
				utmSource: response.trafficSource.UTMSource,
				utmMedium: response.trafficSource.UTMMedium,
				utmCampaign: response.trafficSource.UTMCampaign,
				budget: response.trafficSource.budget,
				budgetType: response.trafficSource.budgetType
			})
		}
	}

	useEffect(() => {
		fetchSource()
	}, [])

	return (
		<S.Form onSubmit={handleSubmit(onHandleSubmit)}>
			<Select
				placeholder="Selecione uma fonte de tráfego"
				label="Fonte de tráfego"
				handleChange={(value) => {
					setCurrentPlatform(value)
					setValue('utmSource', value)

					if (
						value === 'instagram' ||
						value === 'facebook' ||
						value === 'tiktok' ||
						value === 'youtube' ||
						value === 'x'
					) {
						setValue('utmMedium', 'social')
					} else if (
						value === 'google-ads' ||
						value === 'meta-ads' ||
						value === 'tiktok-ads'
					) {
						setValue('utmMedium', 'cpc')
					} else {
						setValue('utmMedium', '')
						setValue('utmSource', '')
					}
				}}
				currentValue={currentPlatform ?? ''}
				items={[
					{
						id: 'tiktok',
						name: 'Tiktok',
						value: 'tiktok'
					},
					{
						id: 'instagram',
						name: 'Instagram',
						value: 'instagram'
					},
					{
						id: 'facebook',
						name: 'Facebook',
						value: 'facebook'
					},
					{
						id: 'youtube',
						name: 'Youtube',
						value: 'youtube'
					},
					{
						id: 'x',
						name: 'X',
						value: 'x'
					},
					{
						id: 'google-ads',
						name: 'Google ADS',
						value: 'google-ads'
					},
					{
						id: 'meta-ads',
						name: 'Meta ADS',
						value: 'meta-ads'
					},
					{
						id: 'tiktok-ads',
						name: 'Tiktok ADS',
						value: 'tiktok-ads'
					},
					{
						id: 'instagram-ads',
						name: 'Manual ADS',
						value: 'manual-ads'
					}
				]}
			/>

			<TextField
				label="UTM Source"
				name="utmSource"
				placeholder="UTM Source"
				register={register}
				$fullwidth
				disabled={currentPlatform !== 'manual-ads'}
			/>
			<TextField
				label="UTM Medium"
				placeholder="UTM Medium"
				name="utmMedium"
				register={register}
				$fullwidth
				disabled={currentPlatform !== 'manual-ads'}
			/>
			<TextField
				label="UTM Campaign"
				name="utmCampaign"
				placeholder="UTM Campaign"
				register={register}
				$fullwidth
			/>

			{currentPlatform === 'manual-ads' && (
				<>
					<S.InlineContainer>
						<Select
							placeholder="Selecione um orçamento"
							currentValue={budgetType || ''}
							handleChange={(value) => setBudgetType(value)}
							label="Orçamento"
							items={[
								{
									name: 'Vitalício',
									id: 'lifetime',
									value: 'lifetime'
								},
								{
									name: 'Diário',
									id: 'daily',
									value: 'daily'
								}
							]}
						/>
						<TextField
							label="Valor"
							name="amount"
							register={register}
							iconPosition="right"
							type="number"
							icon={<span>BRL</span>}
						/>
					</S.InlineContainer>

					<S.Description>
						Digite o orçamento que você configurou na plataforma (ex: Meta,
						Google). Este campo é apenas informativo, nenhuma cobrança será
						realizada no seu plano Up Funnels.
					</S.Description>
				</>
			)}
			<div
				style={{
					display: 'flex',
					width: '100%',
					gap: '1rem',
					marginTop: '1rem'
				}}
			>
				<Close asChild>
					<Button shape="text" $fullwidth>
						Cancelar
					</Button>
				</Close>
				<Button disabled={!currentPlatform} $fullwidth type="submit">
					Confirmar
				</Button>
			</div>
		</S.Form>
	)
}
