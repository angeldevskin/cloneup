/* eslint-disable @typescript-eslint/no-explicit-any */
import * as S from './styles'
import { Sketch } from '@uiw/react-color'
import { useEffect, useState, useRef } from 'react'
import { HelpCircle, Plus } from 'lucide-react'
import './style.css'
import { Tooltip } from '../../../../components/Tooltip'

type LogoTypes = {
	outSideColors: ColorsProps[]
}

type ColorsProps = {
	position: string
	hex: string
}

export function Colors({ outSideColors }: LogoTypes) {
	const [currentColors, setCurrentColors] = useState(outSideColors)
	const [, setColor] = useState('')
	const [positionColor, setPositionColor] = useState<string | null>(null)
	const colorPickerRef = useRef<HTMLDivElement>(null)
	const [otherColors, setOtherColors] = useState<ColorsProps[]>([])
	const [inative, setInative] = useState<string>('')
	const [defaultColor, setDefaultColor] = useState<string>('#C2BFBF')

	const verifyHasClass = (path: any, className: any) => {
		return path.some((element: any) => {
			return element.classList && element.classList.contains(className)
		})
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const path = event.composedPath()

			if (colorPickerRef.current && !verifyHasClass(path, 'w-color-sketch')) {
				setInative('')
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleColorClick = (position: string = 'custom') => {
		if (position.includes('custom')) {
			setPositionColor(position)
			setInative(position)
		}
		setPositionColor(positionColor === position ? null : position)
	}

	const handleColorChange = (color: any, isCustom: boolean = false) => {
		setColor(color.hex)
		setDefaultColor(color.hex)
		if (isCustom) {
			setOtherColors((prevColors) =>
				prevColors.map((c) =>
					c.position === positionColor ? { ...c, hex: color.hex } : c
				)
			)
		} else {
			setCurrentColors((prevColors) =>
				prevColors.map((c) =>
					c.position === positionColor ? { ...c, hex: color.hex } : c
				)
			)
		}
	}

	function translatePosition(position: string): string {
		switch (position) {
			case 'primary':
				return 'Primária'
			case 'secondary':
				return 'Secundária'
			default:
				return 'Terceária'
		}
	}

	const addNewCustomColor = () => {
		const size = otherColors.length + 1
		const newPosition = `custom_${size}`
		setOtherColors((prev: ColorsProps[]) => [
			{
				position: newPosition,
				hex: defaultColor
			} as ColorsProps,
			...prev
		])
		setPositionColor(newPosition)
		setInative(newPosition)
	}

	return (
		<S.ColorsTypes>
			<>
				<div className="header">
					<h2>Cores</h2>
				</div>

				<div className="flex">
					<div className="principal">
						{currentColors.map((color, index) => (
							<div key={index} className="color_block_wrapper">
								<div
									className="color_block"
									onClick={() => handleColorClick(color.position)}
								>
									<div className="title">
										<S.Header>
											<h3>{translatePosition(color.position)}</h3>
											<div className="tooltip">
												<Tooltip
													trigger={<HelpCircle strokeWidth={1} />}
													content={`Texto de apoio para a cor ${translatePosition(
														color.position
													)}`}
												/>
											</div>
										</S.Header>
									</div>
									<div className="flex">
										<div
											className="content"
											style={{
												backgroundColor: color.hex,
												borderRadius: '8px'
											}}
										>
											{!color.hex && (
												<>
													<Plus />
													<p className="label-start">Nova cor</p>
												</>
											)}
										</div>
									</div>
									<span className="footerColor">{color.hex}</span>

									{positionColor === color.position && (
										<div ref={colorPickerRef}>
											<Sketch color={color.hex} onChange={handleColorChange} />
										</div>
									)}
								</div>
							</div>
						))}
					</div>
					<div className="outras">
						<div className="header">
							<S.Header>
								<h4>Outras cores da marca</h4>
								<div className="tooltip">
									<Tooltip
										trigger={<HelpCircle strokeWidth={1} />}
										content="Texto de apoio"
									/>
								</div>
							</S.Header>
						</div>
						<div className="outras_block">
							<div
								onClick={() => addNewCustomColor()}
								className="custom_color_block"
							>
								<div className="content">
									<div className="title">
										<Plus strokeWidth={1} />
										<p>Nova cor</p>
									</div>
								</div>
								<span className="footerColor"></span>
							</div>
							{otherColors.length != 0 &&
								otherColors.map((color, index) => (
									<div
										id={`color_${color.position}`}
										key={index}
										className={`${color.position} color_block`}
										onClick={() => handleColorClick(color.position)}
									>
										<div className="flex">
											<div
												className="content"
												style={{
													backgroundColor: color.hex,
													borderRadius: '8px'
												}}
											>
												{!color.hex && (
													<>
														<Plus />
														<p className="label-start">Nova cor</p>
													</>
												)}
											</div>
										</div>
										{inative == color.position && (
											<div ref={colorPickerRef}>
												<Sketch
													color={color.hex}
													onChange={(color) => handleColorChange(color, true)}
												/>
											</div>
										)}
										<span className="footerColor">{color.hex}</span>
									</div>
								))}
						</div>
					</div>
				</div>
			</>
		</S.ColorsTypes>
	)
}
