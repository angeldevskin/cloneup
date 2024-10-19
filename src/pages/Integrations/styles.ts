import styled from 'styled-components'

const borderRadius = '8px'
const boxShadow = '0 2px 4px 0 rgba(165, 163, 174, 0.3)'
const borderColor = '#d0d5dd'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 0 2rem 2rem 2rem;
`

export const Label = styled.p`
	padding-left: 0.4rem;
`

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;

	input {
		margin-top: 2rem;
	}

	gap: 1rem;
`
export const Article = styled.article`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 2rem;

	.painel {
		width: 100%;
		margin-bottom: 2rem;

		.search {
			display: flex;
			max-width: 20rem;
			flex-direction: row;
			align-items: flex-start;
			gap: ${borderRadius};
			flex-shrink: 0;
			border-radius: ${borderRadius};
			border: 1px solid ${borderColor};
			background: #fff;
			box-shadow: ${boxShadow};
			padding: 0.62rem 0.88rem;
			margin-right: 2rem;
			color: #667085;

			input,
			input:focus {
				border: none;
				outline: none;
				width: 20rem;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 1rem;
				font-weight: 400;
				line-height: 1.5rem;
			}
		}
	}

	li {
		width: 100%;
		max-width: 1920px;
		height: 4.5rem;
		flex-shrink: 0;
		margin-bottom: 2rem;
		display: flex;
		align-items: center;
		flex-direction: row;
		border-radius: 8px;
		border: 0.5px solid #e2e0e6;
		background: #fdfdfd;

		.ico {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 1rem 0 1rem;
			width: 2rem;
			height: 2rem;
		}

		h1 {
			flex: 1;
			margin: 0.5rem;
			color: #6c6685;
			font-size: 0.875rem;
			font-weight: 600;
			line-height: normal;

			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.button {
			display: flex;
			align-items: center;
			margin-left: auto;
			margin-right: 2rem;
		}
	}
`
