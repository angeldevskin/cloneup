import styled from 'styled-components'

export const NewAssistant = styled.section`
	display: flex;

	> div {
		width: 50%;

		&.left {
			padding: 15px;
			max-height: 100vh;
			overflow-y: auto;
			textarea {
				height: 45vh !important;
			}

			label {
				margin-bottom: 0;
				font-size: 14px;
				color: #14252f;
			}

			.header {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding-left: 19px;
				button {
					padding: 5px 8px;
				}

				.badge {
					background: #00ff7f;
					border-radius: 30px;
					font-size: 9px;
					height: max-content;
					padding: 4px 9px;
					font-weight: 600;
					margin-left: 10px;
				}
			}

			.content {
				margin-top: 35px;
				& > p {
					padding-bottom: 5px;
				}

				.dropdown {
					overflow: hidden;
					border-radius: 20px;
					.dropdown_header {
						padding: 0 20px;

						h3 {
							font-weight: 600;
							font-size: 20px;
							display: flex;

							svg {
								margin-right: 10px;
							}
						}
					}
					.dropdown_content {
						padding: 25px;
					}
				}
			}

			textarea {
				font-size: 14px !important;
			}

			.row {
				display: flex;
				margin-top: 15px;
				gap: 10px;
				align-items: center;
				width: 100%;

				.slider-grid {
					display: flex;
					align-items: center;

					.labelTemp {
						padding: 9px 14px;
						border-radius: 8px;
						border: 1px solid #e2e0e6;
						font-size: 14px;
						margin-top: 5px;
					}
				}

				.field {
					& > div {
						gap: 5px;
					}

					button {
						padding: 6.8px;
					}

					&.field-12 {
						flex: 100%;
					}

					&.upload-box {
						display: flex;
						justify-content: space-between;
					}

					&.field-10 {
						flex: 83.33%;
					}
					&.field-3 {
						position: relative;
						flex: 25%;

						&.idleType {
							button {
								white-space: nowrap;
								min-width: inherit !important;
							}
						}
					}
					&.field-2 {
						flex: 16.66%;
					}
					&.field-5 {
						flex: 41.666%;
					}
					&.field-9 {
						flex: 75%;
					}
					&.field-6 {
						flex: 50%;
					}
					&.field-8 {
						flex: 75%;
					}
					&.field-2 {
						flex: 16.66%;
						position: relative;
					}
					&.field-4 {
						flex: 25%;

						&.time {
							label {
								font-size: 12px;
							}
						}
					}
				}
			}
		}

		&.right {
			/* background: #009ef725; */
			position: relative;
			margin-top: 60px;
			margin-right: 30px;
			padding: 15px;
			height: calc(100dvh - 90px);
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.3);
			justify-content: center;

			.actions {
				h3 {
					padding-top: 10px;
					font-size: 20px;
					font-weight: 600;
				}
			}

			#content_msg {
				height: calc(100% - 100px);
				overflow: auto;
				.scroll {
					overflow: auto;
					display: flex;
					flex-direction: column;
					justify-content: end;

					.baloon {
						border-radius: 8px;
						background: white;
						padding: 10px 15px 10px 10px;
						font-size: 14px;
						max-width: 100%;
						min-width: 80px;
						word-break: break-all;

						.title {
							display: flex;
							align-items: center;
							margin-bottom: -8px;

							img {
								width: 30px;
								height: 30px;
								margin-right: 5px;
							}
						}

						.text {
							padding-left: 35px;
							word-break: break-word;

							h2 {
								margin-top: 15px;
								margin-bottom: 5px;
							}

							p {
								padding: 10px 0;
							}

							ul,
							ol {
								padding: 0 30px;
							}

							.contains-task-list {
								list-style: none;
								padding: 0 !important;
							}

							table {
								--tw-border-spacing-x: 0px;
								--tw-border-spacing-y: 0px;
								border-collapse: separate;
								border-spacing: var(--tw-border-spacing-x)
									var(--tw-border-spacing-y);
								margin-bottom: 0.25rem;
								margin-top: 0.25rem;
								width: auto;
								border-left: 1px solid rgba(0, 0, 0, 0.15);

								thead {
									border-bottom-color: #d1d5db;
									border-bottom-width: 1px;

									th {
										border-right: 1px solid rgba(0, 0, 0, 0.15);
										background-color: rgba(0, 0, 0, 0.1);
										border-bottom-width: 1px;
										border-color: rgba(0, 0, 0, 0.15);
										border-top-width: 1px;
										padding: 0.25rem 0.75rem;
									}
								}

								tbody {
									td {
										border-right: 1px solid rgba(0, 0, 0, 0.15);
										border-bottom: 1px solid rgba(0, 0, 0, 0.15);
										padding: 0.25rem 0.75rem;
									}
								}
							}

							pre {
								background-color: #1e1e1e;
								border-radius: 4px;
								overflow: auto;
								padding: 16px;
								margin: 16px 0;
								max-width: 600px;
								width: 100%;
							}

							code {
								color: #d4d4d4;
							}

							.language-js .keyword {
								color: #569cd6;
							}

							.language-js .string {
								color: #ce9178;
							}

							.language-js .variable {
								color: #9cdcfe;
							}

							.language-js .comment {
								color: #6a9955;
								font-style: italic;
							}
						}

						.name {
							font-weight: 600;
							font-size: 14px;
						}

						&.assistant {
							align-self: flex-start;
						}
						&.me {
							/* align-self: flex-end; */
							/* background-color: #009ef770; */
						}
					}
				}
			}
			.conversation {
				width: calc(100% - 30px);
				position: absolute;
				bottom: 15px;
				display: flex;
				gap: 10px;
				.sendMsg {
					width: 100%;
					background-color: white;
					overflow: hidden;
					border-radius: 3px;
					div {
						border-radius: 0;
						border: none;

						> div {
							padding-right: 45px;
							border-radius: 8px;
							border: 1px solid #e2e0e6;
						}

						input {
							padding: 3px;
						}
					}
				}

				&.conversation.blocked {
					opacity: 0.5;
					pointer-events: none;
					cursor: not-allowed !important;

					& * {
						cursor: not-allowed !important;
					}
				}

				.sendBtn {
					width: calc(15% - 20px);

					button {
						width: 100%;
						border-radius: 3px;
						padding: 8.8px;
						position: absolute;
						width: auto;
						right: 5px;
						top: 0;
						bottom: 0;
						border: none;
						transform: rotate(-90deg);
						background-color: transparent;

						svg {
							stroke: #009ef7;
						}
					}
				}
			}

			.actions {
				display: flex;
				align-items: center;
				position: absolute;
				top: 15px;
				gap: 10px;

				button {
					font-size: 13px;
					max-width: max-content;
					padding: 5px 8px;
				}
			}
		}
	}
`
export const AssistantFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 16px;
	padding-top: 10px;
`
export const CreativeLevel = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`

export const IsTyping = styled.div`
	width: 5em;
	height: 2em;
	position: relative;
	padding: 10px;
	margin-left: 5px;
	border-radius: 20px;

	.typing__dot {
		float: left;
		width: 8px;
		height: 8px;
		margin: 0 4px;
		background: #009ef7;
		border-radius: 50%;
		opacity: 0;
		animation: loadingFade 1s infinite;
	}

	.typing__dot:nth-child(1) {
		animation-delay: 0s;
	}

	.typing__dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.typing__dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes loadingFade {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0.8;
		}
		100% {
			opacity: 0;
		}
	}
`

export const FilePreviewList = styled.ul`
	list-style-type: none;
	padding: 0;
`

export const FilePreviewItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	background-color: #ececec;
	padding: 10px;
	border-radius: 8px;
`

export const PreviewImage = styled.img`
	max-width: 100px;
	max-height: 100px;
	border-radius: 5px;
`

export const FileInfo = styled.div`
	display: flex;
	align-items: center;
`

export const FileName = styled.div`
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 450px;
	width: 80%;
	margin-right: 10px;
`

export const RemoveButton = styled.button`
	background-color: #f44336;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: #d32f2f;
	}
	type: button;
`
export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0px;
	background-color: #f5f5f5;
	color: #000000;
	font-weight: 600;
	border-radius: 8px;
	padding: 0.5rem 1rem;
	margin-bottom: 32px;
	cursor: pointer;
	transition:
		background-color 0.3s,
		color 0.3s;
	&:hover {
		background-color: #e0e0e0;
		color: #333;
	}
	svg {
		margin-right: 0.5rem;
	}
`
export const ButtonDeleteFile = styled.div`
	padding-top: 5px;
	cursor: pointer;
	transition: color 0.3s ease;
	color: #f05151;
	padding-left: 12px;
`
export const BannerInfoTemplate = styled.div`
	display: flex;
	height: 4.375rem;
	width: 100%;
	align-items: center;
	margin-top: 16px;
	border-radius: 8px;
	background-color: #d2efff;
`
export const LabelInfoTemplate = styled.span`
	padding-left: 8px;
`
export const BannerInfoTemplateContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`
export const SwitchBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: start;
	margin-top: 20px;
	align-items: center;
`

export const UploadHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	label > div {
		margin-top: 0;
	}

	button {
		margin-bottom: 0 !important;
	}
`

export const IcoBox = styled.a`
	padding-right: 8px;
`
