import styled from 'styled-components'

const borderRadius = '8px'
const boxShadow = '0 2px 4px 0 rgba(165, 163, 174, 0.3)'
const borderColor = '#d0d5dd'

export const Section = styled.section`
	display: flex;
	li {
		list-style: none;
		flex-direction: column;
	}
	button {
		cursor: pointer;
	}
	display: flex;
	flex-direction: column;
	padding: 0 2rem;

	.card-title-main {
		> span {
			display: block;
		}

		.breadcrumbs {
			color: #444f55;
			font-size: 14px;
			margin-top: 8px;
		}

		h1 {
			color: #969696;
			font-size: 2rem;
			font-weight: 400;
			line-height: normal;
		}
		h2 {
			font-size: 2rem;
			font-weight: 400;
			line-height: normal;
		}
	}

	.card-main {
		flex-direction: row;
		margin-top: 4rem;
	}
`

export const Aside = styled.aside`
	ul {
		display: flex;
		margin-bottom: 32px;
		border-bottom: 1px solid #eee;
		li {
			text-align: center;

			&.active {
				border-bottom: 2px solid #009ef7;

				h2 {
					color: #009ef7 !important;
				}
			}
		}
		button {
			display: flex;
			border: none;
			background-color: transparent;
			padding: 14px 16px;
			.image-box {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 20%;
				background: #f1f1f2;
				border-radius: 6px;
				color: #333333;
				font-size: 1.125rem;
				font-weight: 400;
				line-height: normal;
				height: 2.6rem;
				margin-right: 18px;
			}
			.image-box.active {
				background: #ccecfd;
				color: #009ef7;
			}
			.text-box {
				display: flex;
				flex-direction: column;
				width: 100%;
				h2 {
					color: #212121;
					font-size: 1rem;
					font-weight: 600;
					text-align: center;
					line-height: normal;
				}
			}
		}
	}
`

export const Article = styled.article`
	margin: 0rem 2rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	.painel {
		width: 100%;
		margin-bottom: 2rem;
		width: 51.6875rem;
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
		width: 51.6875rem;
		height: 3.5rem;
		flex-shrink: 0;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: row;
		border-radius: 8px;
		border: 0.5px solid #e2e0e6;
		background: #fdfdfd;
		.ico {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0.5rem 1rem 0 1rem;
			width: 2rem;
			height: 2rem;
		}
		h1 {
			display: -webkit-box;
			width: 15.6875rem;
			-webkit-line-clamp: 2;
			text-align: justify;
			text-overflow: ellipsis;
			font-weight: 800;
			overflow: hidden;
			-webkit-box-orient: vertical;
			color: #6c6685;
			font-size: 0.875rem;
			font-weight: 600;
			line-height: normal;
			margin: 0.5rem;
		}
		.button {
			display: flex;
			align-items: center;
			margin-left: auto;
			margin-right: 2rem;
		}
	}
`
export const ConfirmationWrapper = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;

	svg {
		border: 0;
		margin: 0;
	}

	svg {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`
