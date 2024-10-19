import styled from 'styled-components'

export const logotypesWrapper = styled.section`
	width: 100%;
	margin-top: 32px;

	.flex {
		display: flex;
		position: relative;
	}

	h2 {
		font-size: 24px;
		color: #14252f;
		font-weight: 600;
		margin-bottom: 24px;
	}

	.newLogo {
		margin-right: 16px;
		text-align: center;
		&__grid {
			position: relative;
			cursor: pointer;
			transition: 0.3s all;
			flex-direction: column;
			width: 180px;
			height: 150px;

			&.dragging {
				transition: 0.3s all;
				border: 1px dashed #009ef7;
			}

			.dropzone {
				position: absolute;
				opacity: 0;
				height: 100%;
				width: 100%;

				> * {
					height: 100%;
					min-width: 1px;
				}
			}

			&:hover {
				border: 1px solid #009ef7 !important;

				svg {
					& > * {
						stroke: #009ef7;
					}
				}
			}

			& svg {
				width: 60px;
				height: 60px;
				& > * {
					stroke: #85959e;
					stroke-width: 0.7;
				}
			}
		}
	}

	.logotypes {
		position: relative;
		width: calc(calc(100vw - 25rem) - 170px) !important;

		.logotype {
			&__content {
				width: 100%;
				height: 150px;
				background-color: #fbfbfb;
				border: 1px solid #f2f2f3;
				border-radius: 8px;
				display: flex;
				position: relative;
				align-items: center;
				justify-content: center;
				overflow: hidden;

				&:hover .logotype__delete-icon {
					opacity: 1;
				}
			}

			&__image {
				img {
					height: auto;
					width: 100px;
					object-fit: scale-down;
				}
			}

			&__title {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #14252f;
				font-weight: 600;
				font-size: 16px;
				margin-top: 8px;
				display: flex;
				align-items: center;

				.logotype__edit-icon {
					margin-left: 8px;
					opacity: 0;
					transition: opacity 0.3s ease;
					cursor: pointer;
					stroke: #009ef7;
				}

				&:hover .logotype__edit-icon {
					opacity: 1;
				}
			}

			&__colors {
				position: absolute;
				display: flex;
				flex-direction: column;
				right: 0;
				top: 0;
				height: 100%;

				&__color {
					width: 31px;
					flex: auto;
				}
			}

			&__delete-icon {
				position: absolute;
				top: 8px;
				left: 8px;
				cursor: pointer;
				opacity: 0;
				transition: opacity 0.3s ease;
				stroke: #f05151;
			}
		}
	}

	.newLogo__grid,
	.logotype__content {
		background-color: #fbfbfb;
		border: 1px solid #f2f2f3;
		border-radius: 8px;
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.swiper-pagination {
		height: 30px;
		z-index: 99;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 0;
		left: 0;

		&-lock {
			display: none;
		}
	}

	.swiper-pagination-bullet {
		cursor: pointer;
		opacity: 0.8;
		width: 50px;
		height: 5px;
		background: #dddddd;
		display: flex;
		z-index: 999;
		border-radius: 5px;
		position: relative;
		margin: 0 5px;
		bottom: -10px;

		&-active {
			background: #009ef7;
		}
	}

	.logotype__delete-icon {
		position: absolute;
		top: 8px;
		left: 8px;
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.3s ease;
		border-radius: 50%;
		background-color: #f05151;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
		color: #ffffff;
	}
`
