import styled from 'styled-components'

export const PublicWrapper = styled.section`
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

	.newPublic {
		&__title {
			color: #14252f;
			font-weight: 600;
		}
		&__grid {
			padding: 16px;
			display: flex;
			cursor: pointer;
			transition: 0.3s all;
			display: flex;
			align-items: center;

			& svg {
				margin-top: 6px;
				width: 24px;
				margin-left: 8px;
				& > * {
					stroke: #444f55;
					stroke-width: 2;
				}
			}
		}
	}

	.publics {
		position: relative;
		padding-bottom: 30px;
		display: flex;
		width: 100%;
		gap: 16px;
		flex-wrap: wrap;

		& > div {
			width: 100%;
		}
		.brand {
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
				transition: 0.3s all;

				&:hover {
					cursor: pointer;
				}

				&:hover .brand__delete-icon {
					opacity: 1;
				}
			}

			&__image {
				height: auto;
				width: 100px;
				object-fit: scale-down;
				margin-right: 31px;
			}

			&__title {
				color: #14252f;
				font-weight: 600;
				font-size: 14px;

				.brand__edit-icon {
					margin-left: 8px;
					opacity: 0;
					transition: opacity 0.3s ease;
					cursor: pointer;
					stroke: #009ef7;
				}

				&:hover .brand__edit-icon {
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
				border-radius: 50%;
				background-color: red;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 30px;
				height: 30px;
			}
		}
	}

	.newPublic__grid {
		padding: 9px;
	}

	.newPublic__grid,
	.public {
		background-color: #fbfbfb;
		border: 1px solid #f2f2f3;
		border-radius: 8px;
		display: flex;
		justify-content: center;
	}

	.public {
		position: relative;
		justify-content: flex-start;
		&__content {
			width: 100%;
			p {
				padding: 16px;
				font-size: 16px;
				font-weight: 600;
				color: #14252f;
				display: flex;
				align-items: center;

				.public__edit-icon {
					margin-left: 8px;
					opacity: 0;
					transition: opacity 0.3s ease;
					cursor: pointer;
					stroke: #009ef7;
				}

				&:hover .public__edit-icon {
					opacity: 1;
				}
			}
		}

		.options {
			position: absolute;
			right: 16px;
			bottom: 0;
			top: 0;
			margin: auto;
			display: flex;
			align-items: center;
			gap: 16px;

			a {
				cursor: pointer;
			}
		}
	}
`
