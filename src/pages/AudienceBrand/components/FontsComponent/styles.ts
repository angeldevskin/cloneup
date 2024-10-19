import styled from 'styled-components'

export const FontsWrapper = styled.section`
	width: 100%;
	margin-top: 32px;

	h2 {
		font-size: 24px;
		color: #14252f;
		font-weight: 600;
		margin-bottom: 24px;
	}

	.fonts {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;

		.font {
			position: relative;
			padding: 12px 16px;
			background: #fbfbfb;
			border: 1px solid #f2f2f3;
			border-radius: 8px;

			&.hovered {
				border: 1px solid #009ef7;
				transition: 0.3s all;
				.dropdown-icon.finished {
					background-image: url('data:image/svg+xml,<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2.49966C16.2547 2.19869 16.5697 1.95372 16.925 1.78034C17.2803 1.60697 17.6681 1.509 18.0636 1.49267C18.4592 1.47635 18.8538 1.54204 19.2224 1.68555C19.5909 1.82905 19.9254 2.04723 20.2043 2.32618C20.4833 2.60513 20.7006 2.93872 20.8425 3.3057C20.9845 3.67268 21.0478 4.06499 21.0286 4.45764C21.0094 4.85028 20.908 5.23465 20.7309 5.58623C20.5538 5.93781 20.3049 6.24889 20 6.49966L6.5 19.9997L1 21.4997L2.5 15.9997L16 2.49966Z" stroke="%23009ef7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>') !important;
				}
			}

			.dropdown-icon.finished {
				background-image: url('data:image/svg+xml,<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2.49966C16.2547 2.19869 16.5697 1.95372 16.925 1.78034C17.2803 1.60697 17.6681 1.509 18.0636 1.49267C18.4592 1.47635 18.8538 1.54204 19.2224 1.68555C19.5909 1.82905 19.9254 2.04723 20.2043 2.32618C20.4833 2.60513 20.7006 2.93872 20.8425 3.3057C20.9845 3.67268 21.0478 4.06499 21.0286 4.45764C21.0094 4.85028 20.908 5.23465 20.7309 5.58623C20.5538 5.93781 20.3049 6.24889 20 6.49966L6.5 19.9997L1 21.4997L2.5 15.9997L16 2.49966Z" stroke="%23444F55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				width: 20px;
				height: 20px;
			}

			.dropdown-icon.finished:before {
				display: none;
			}

			[id^='font-picker'] {
				position: absolute;
				font-size: 0;
				right: 0;
				top: 0;
				bottom: 0;
				box-shadow: none;
				background: transparent;

				ul {
					top: 70px;
				}

				&.expanded {
					.font-list {
						visibility: visible;
						opacity: 1;
					}

					ul {
						height: 350px;
						max-height: 350px;
					}
				}

				.font-list {
					background: white;
					padding: 16px;
					width: 350px;
					right: 0;
					opacity: 0;
					visibility: hidden;
					border-radius: 8px;
					padding: 12px 8px;
					box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.2) !important;

					& * {
						color: #444f55 !important;
					}

					&:before {
						color: #444f55 !important;
						content: 'Fontes';
						display: block;
						font-size: 14px;
						font-weight: 700;
						padding: 0 10px;
					}

					li {
						height: 31px !important;
					}
				}

				.dropdown-button {
					font-size: 0;
					text-align: right;
					display: flex;
					position: absolute;
					top: 0;
					bottom: 0;
					margin: auto;
					right: 16px;
				}

				button {
					font-size: 16px;
					background: transparent;
					width: 100%;
					display: block;
					text-align: left;
					justify-content: space-between;
					display: flex;
					font-size: 14px;

					&:before {
						font-size: 14px;
						font-family: 'Nunito Sans', sans-serif;
						content: attr(data-text);
						display: block;
					}
				}
			}
		}

		.fallback {
			height: 52px;
			font-size: 34px;
		}

		span {
			display: block;
			margin-top: 8px;
			color: #14252f;
			font-size: 16px;
			font-weight: 400;
		}
	}
`
