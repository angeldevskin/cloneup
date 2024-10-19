import * as S from './style'

interface Props {
	checked: boolean
	onChange: () => void
}

export const SwitchInput = ({ checked, onChange }: Props) => {
	return (
		<S.SwitchContainer>
			<S.StyledSwitch type="checkbox" checked={checked} onChange={onChange} />
			<S.Slider className="slider round">
				<S.SliderHandle />
			</S.Slider>
		</S.SwitchContainer>
	)
}
