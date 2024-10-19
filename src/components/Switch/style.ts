import styled from 'styled-components'

export const SwitchContainer = styled.label`
	position: relative;
	display: inline-block;
	width: 47px;
	height: 24px;
`

export const HiddenInput = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`

export const Slider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #9fb3c8;
	transition: 0.4s;

	&.round {
		border-radius: 24px;

		span {
			border-radius: 24px;
		}
	}
`

export const SliderHandle = styled.span`
	position: absolute;
	content: '';
	height: 16px;
	width: 16px;
	left: 4px;
	bottom: 4px;
	background-color: white;
	transition: 0.4s;
`

export const StyledSwitch = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
	&:checked + ${Slider} {
		background-color: #2196f3;
	}

	&:focus + ${Slider} {
		box-shadow: 0 0 1px #2196f3;
	}

	&:checked + ${Slider} ${SliderHandle} {
		transform: translateX(24px);
	}
`
