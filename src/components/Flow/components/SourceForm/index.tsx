import { Close } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '../../../Button'
import { Select } from '../../../Select'
import { TextField } from '../../../TextField'

import { useFunnels } from '../../../../services/store/funnels'
import { createTrafficSource } from '../../../../services/traffic.service'

import { successToast } from '../../../Toast/types'
import * as S from './styles'
import { trafficSources } from './utils'

type IFieldsProps = {
	utmSource: string
	utmMedium: string
	utmCampaign: string
	budget?: number
}

export function SourceForm({
	selectedSource,
	addSourceNode
}: {
	selectedSource: 'paid' | 'organic' | 'trigger'
	addSourceNode: (trafficSourceId: string) => void
}) {
	const [sourceSelected, setSourceSelected] = useState('')
	const [bugdetType, setBudgetType] = useState('')

	const { currentFunnel } = useFunnels((state) => state)

	const { register, handleSubmit, reset, setValue, getValues } =
		useForm<IFieldsProps>()

	function blockSubmitCases() {
		if (!sourceSelected) return true

		if (
			sourceSelected === 'manual-ads' &&
			(!bugdetType ||
				!getValues('budget') ||
				!getValues('utmSource') ||
				!getValues('utmMedium') ||
				!getValues('utmCampaign'))
		)
			return true

		return false
	}

	function onChangeValidation(value: string) {
		setSourceSelected(value)
		setValue('utmSource', value)

		if (value !== 'manual-ads') {
			setValue('budget', undefined)
			setBudgetType('')
		}

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
		} else if (
			value === 'mailchimp' ||
			value === 'activeCampaign' ||
			value === 'whatsapp' ||
			value === 'telegram'
		) {
			setValue('utmMedium', 'disparos')
		} else {
			setValue('utmMedium', '')
			setValue('utmSource', '')
		}
	}

	async function onHandleSubmit(fields: IFieldsProps) {
		const response = await createTrafficSource({
			funnelId: currentFunnel._id!,
			name: sourceSelected,
			UTMSource: fields.utmSource,
			UTMMedium: fields.utmMedium,
			UTMCampaign: !fields.utmCampaign
				? currentFunnel.name
				: fields.utmCampaign,
			budget: fields.budget,
			budgetType: bugdetType
		})

		if (response) {
			toast.success('Entrada de tráfego adicionada com sucesso', successToast)

			addSourceNode(response.trafficSource._id)
		}

		reset()
	}

	return (
		<S.Form onSubmit={handleSubmit(onHandleSubmit)}>
			<Select
				placeholder="Selecione uma fonte de tráfego"
				label="Fonte de tráfego"
				handleChange={(value) => onChangeValidation(value)}
				currentValue={sourceSelected}
				items={trafficSources.filter(
					(source) => source.type === selectedSource
				)}
			/>

			<TextField
				label="UTM Source"
				name="utmSource"
				placeholder="UTM Source"
				register={register}
				$fullwidth
				disabled={sourceSelected !== 'manual-ads'}
			/>
			<TextField
				label="UTM Medium"
				placeholder="UTM Medium"
				name="utmMedium"
				register={register}
				$fullwidth
				disabled={sourceSelected !== 'manual-ads'}
			/>
			<TextField
				label="UTM Campaign"
				name="utmCampaign"
				placeholder="UTM Campaign"
				register={register}
				$fullwidth
			/>

			{sourceSelected === 'manual-ads' && (
				<>
					<S.InlineContainer>
						<Select
							placeholder="Selecione um orçamento"
							currentValue={bugdetType}
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
							name="budget"
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
				<Button disabled={blockSubmitCases()} $fullwidth type="submit">
					Confirmar
				</Button>
			</div>
		</S.Form>
	)
}
