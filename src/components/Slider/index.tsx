/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Slider from '@radix-ui/react-slider'
import './styles.css'

type SliderProps = {
	inicialInfo?: string
	finalInfo?: string
	defaultValue?: any
	handleChange: (value: number | number[]) => void
	step?: number
	max?: number
}

export const SliderCommon = ({
	inicialInfo,
	finalInfo,
	handleChange,
	defaultValue,
	step,
	max
}: SliderProps) => (
	<Slider.Root
		onValueChange={handleChange}
		className="SliderRoot"
		defaultValue={defaultValue ? defaultValue : undefined}
		max={max}
		step={step ? step : 1}
	>
		<Slider.Track className="SliderTrack">
			<Slider.Range className="SliderRange" />
			<div className="flex">
				<span className="infos">{inicialInfo}</span>
				<span className="infos">{finalInfo}</span>
			</div>
		</Slider.Track>
		<Slider.Thumb className="SliderThumb" aria-label="Valor" />
	</Slider.Root>
)
