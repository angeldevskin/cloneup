/* eslint-disable react/no-unescaped-entities */
import { useForm } from 'react-hook-form'
import { FormType } from '../../../../@types/pages/funnels'
import * as S from './styles'
import { TextArea } from '../../../../components/TextArea'
import { useEffect } from 'react'

export function Voice() {
	const { register, handleSubmit } = useForm<FormType>()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async function onSubmit(fields: any) {
		console.log('fields', fields)
	}

	useEffect(() => {
		document
			.querySelector('[name="instructions_voice"]')
			?.addEventListener('blur', (e) => {
				console.log(e)
			})
	}, [])

	return (
		<S.Container>
			<h1>Tom de voz</h1>
			<S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
				<TextArea
					className="tom-de-voz-textarea"
					placeholder={
						'Escreva diretrizes ou instruções de como nossa IA deve escrever com tom de voz da sua marca.'
					}
					label=""
					onBlur={(e) => console.log(e)}
					name="instructions_voice"
					required
					//Chamando onSubmit clicando fora da div
					onInvalid={(e) => {
						const target = e.target as HTMLInputElement
						target.setCustomValidity('Preencha o campo nome da sua marca')
					}}
					onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
					register={register}
					minLength={4}
					maxLength={500}
					$fullwidth
				/>
				<S.TextInfo>
					Descreva a personalidade que sua marca incorpora ao se comunicar com
					seu público. Essa personalidade será uma constante em todos os pontos
					de contato com seu público, fundamental para construir confiança e
					inspiração. Por exemplo: 'Nossa marca adota uma abordagem moderna e
					contraintuitiva, constantemente inovando e cultivando um senso de
					comunidade.'
				</S.TextInfo>
			</S.FormWrapper>
		</S.Container>
	)
}
