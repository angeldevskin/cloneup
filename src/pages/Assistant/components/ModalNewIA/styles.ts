import styled from 'styled-components'

export const FormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`
export const InfoContainer = styled.div`
	width: 100%;
	padding-bottom: 5px;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`
export const BanerContainer = styled.div`
	width: 40%;
	border: 1px solid;
	background-color: #1e1e1e;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
export const CenteredContent = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`
export const SVGImage = styled.img`
	width: 60px;
	height: 60px;
`
export const OverlayText = styled.div`
	color: black;
	font-size: 24px;
	font-weight: bold;
	margin-left: 10px;
`
export const Description = styled.div`
	color: #d4c9c9;
	font-size: 14px;
	margin: 10px;
	text-align: center;
`
export const ContainerInfo = styled.div`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	align-items: stretch;

	.version label {
		margin-bottom: 15px;
		display: block;
	}
`
export const InfoItem = styled.div`
	span {
		display: block;
		color: #444f55;
		font-weight: 600;
		font-size: 15px;
	}
`
export const Title = styled.p`
	font-size: 14px;
	font-weight: 400;
	color: #444f55;
	margin-top: 12px;
`
export const AlertCard = styled.div`
	display: flex;
	padding: 1rem;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	align-self: stretch;
	border-radius: 8px;
	background: #fef5ec;
`
export const InputKey = styled.div`
	padding-bottom: 14px;
`

export const Link = styled.a`
	color: blue;
	text-decoration: underline;
	cursor: pointer;
`

export const AssistantFooter = styled.div`
	display: flex;
	gap: 16px;
	justify-content: end;
`

export const RadioWrapper = styled.div`
	position: relative;
	display: block;
	padding: 15px 30px 0px 40px;
	border-radius: 8px;
	cursor: pointer;

	&.active {
		background-color: #f0f8fd;
	}
	input {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		opacity: 0;
		z-index: 999;
		cursor: pointer;

		& + label:before {
			position: absolute;
			border: 1px solid #d0d5dd;
			display: inline-block;
			height: 16px;
			width: 16px;
			left: 10px;
			content: '';
			margin: 0 12px 0 0;
			padding: 0;
			width: 16px;
			border-radius: 50%;
		}

		&:checked {
			& + label:before {
				content: '';
				box-shadow: inset 0px 0px 0px 5px #1781cd;
			}
		}
	}

	label {
		color: #444f55;
		font-weight: 700;
	}

	.text p {
		margin-top: 10px;
		color: #444f55;
		font-weight: 400;
	}
`

export const RadioButton = styled.input`
	display: block;
`
