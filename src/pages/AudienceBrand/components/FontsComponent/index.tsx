/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import * as S from './styles'
import FontPicker from 'font-picker-react'

import 'swiper/css'

export function FontsComponent() {
	const [currentFonts, setFonts] = useState<any>([])
	//ALTERAR PARA A CHAVE DE PROD
	const KEY = 'AIzaSyAbvf0OywLAufhqSusAViJ8hPn_7QMADUg'
	useEffect(() => {
		setFonts([
			{
				position: 'title',
				title: 'Título',
				fontDefined: 'Open Sans'
			},
			{
				position: 'subtitle',
				title: 'Subtítulo',
				fontDefined: 'Open Sans'
			},
			{
				position: 'body',
				title: 'Corpo',
				fontDefined: 'Open Sans'
			}
		])
	}, [])

	useEffect(() => {
		setTimeout(() => {
			const buttons = document.querySelectorAll('.font ul li button')
			buttons.forEach((btn) =>
				btn.setAttribute('data-text', btn.textContent ?? '')
			)

			const dropdowns = document.querySelectorAll('.font .dropdown-button')
			dropdowns.forEach((drop) =>
				drop.addEventListener('mouseover', function () {
					drop.closest('.font')?.classList.add('hovered')
				})
			)
			dropdowns.forEach((drop) =>
				drop.addEventListener('mouseleave', function () {
					drop.closest('.font')?.classList.remove('hovered')
				})
			)
		}, 1000)
	}, [currentFonts])

	const applyFont = (selectFont: any, pos: string) => {
		console.log(selectFont)
		const newFontDefined = selectFont.family
		setFonts((prevFonts: any) =>
			prevFonts.map((font: any) =>
				font.position === pos ? { ...font, fontDefined: newFontDefined } : font
			)
		)
	}

	return (
		<S.FontsWrapper>
			<>
				<h2>Fontes</h2>
				<div className="fonts">
					{currentFonts.map((font: any, i: number) => (
						<div key={i} className="font">
							<FontPicker
								apiKey={KEY}
								activeFontFamily={font.fontDefined}
								onChange={(nextFont) => applyFont(nextFont, font.position)}
								pickerId={i.toString()}
							/>
							<div className={'fallback ' + `apply-font-${i}`}>
								{font.fontDefined}
							</div>
							<span>{font.title}</span>
						</div>
					))}
				</div>
			</>
		</S.FontsWrapper>
	)
}
