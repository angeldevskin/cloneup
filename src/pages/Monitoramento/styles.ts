import styled from 'styled-components'

export const Monitoramento = styled.section`
	display: block;
	width: 100%;

	[readonly] {
		color: #999;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}

	.content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 40px;
		.left {
			width: 20%;

			max-width: 260px;

			p {
				margin-top: 16px;
				font-size: 14px;
				color: #444f55;
				padding-right: 40px;
			}
		}

		.right {
			width: 83%;

			.steps {
				.step {
					padding: 32px;
					border-radius: 8px;
					box-shadow: 0px 0px 18px -1px #dfdfdf;
					margin-bottom: 32px;

					textarea {
						height: 100%;
						min-height: 300px;
					}

					h3 {
						font-weight: 600;
						margin-bottom: 32px;
						font-size: 20px;
					}

					button {
						margin-top: 32px;
						padding: 0.5rem 1rem;
						margin-left: auto;
					}

					p {
						font-size: 14px;
					}

					input {
						padding: 0.2rem 0.5rem;
					}
				}
			}
		}
	}
`
export const Section = styled.div`
	padding: 0 2rem 2rem 2rem;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	.card-main {
		width: 100%;
		border-radius: 8px;
		margin-top: 40px;
	}
	h1 {
		color: #14252f;
		font-size: 32px !important;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	h2 {
		color: #14252f;
		font-size: 20px;
		font-weight: 600;
		line-height: normal;
		margin-top: 0.5rem;
	}
`
export const Container = styled.div`
	display: flex;
	align-items: center;
	margin: 16px;
`
interface AlertContainerProps {
	type: 'success' | 'error'
}

export const AlertContainer = styled.div<AlertContainerProps>`
	display: flex;
	align-items: center;
	background-color: ${({ type }) =>
		type === 'success'
			? 'rgba(97, 199, 94, 0.20)'
			: 'rgba(250, 166, 71, 0.20)'};
	padding: 0.5rem;
	border-radius: 8px;
	margin: 16px 0 32px 0;
`

export const IconConfigSucess = styled.div`
	padding-right: 8px;
	display: flex;

	svg {
		stroke-width: 1px;
		stroke: #62c75e;
		fill: #62c75e;
		path {
			stroke: white;
			transform: scale(1.7);
			transform-origin: center;
		}
	}
`
export const IconConfig = styled.div`
	padding-right: 8px;
	display: flex;

	svg {
		stroke-width: 1px;
		stroke: #faa647;
		fill: #faa647;
		line {
			stroke: white;
			transform: scale(1.2);
			transform-origin: center;
		}
	}
`
export const LabelInfo = styled.span`
	color: #444f55;
	font-family: 'Nunito sans', sans-serif;
	font-size: 14px;
`
