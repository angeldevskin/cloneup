import styled from 'styled-components'

export const MainContainer = styled.section`
	display: flex;

	.switch {
		appearance: none;
		width: 48px;
		height: 24px;
		background-color: #9fb3c8;
		border-radius: 50px;
		position: absolute;
		cursor: pointer;
		transition: 0.3s;
	}

	.switch::before {
		content: '';
		position: absolute;
		width: 20px;
		height: 20px;
		background-color: #ffffff;
		border-radius: 50%;
		left: 2px;
		top: 2px;
		transition: 0.3s;
	}

	input[type='checkbox'].switch:checked {
		background: #009ef7;
	}

	input[type='checkbox'].switch:checked::before {
		background: #ffffff;
		left: 26px;
	}

	.gjs-cv-canvas__frames {
		height: 98%;
	}

	.gjs-toolbar {
		display: block !important;
		left: 0;
		padding-top: 2px;
		padding-bottom: 2px;
		border-radius: 4px;
	}

	.gjs-toolbar-item {
		padding-left: 6px;
		padding-right: 25px;
		padding-top: 5px;
		padding-bottom: 5px;

		svg {
			stroke: #fff;
			fill: #3b97e3;
			width: 17px;
			height: 17px;
		}

		&.gjs-toolbar-item__tip-video-image,
		&.gjs-toolbar-item__edit-component,
		&.gjs-no-touch-actions {
			border-right: 1px solid rgba(255, 255, 255, 0.1);
		}
	}

	.manager-container {
		transition: transform 0.3s ease;
		transform: translateX(100%);

		&.visible {
			transform: translateX(0%);
		}

		.gjs-pn-title-style-content {
			width: 100%;
			padding: 16px;

			.gjs-pn-buttons {
				padding-left: 0px;
				width: 100%;

				.gjs-pn-btn.title-style-content {
					text-align: left;
					margin-right: 0px;
					cursor: default;
					font-size: 24px;
					font-weight: 600;
					padding: 0px;
					padding-top: 4px;

					&:hover {
						background-color: transparent !important;
					}
				}

				.gjs-pn-btn.stop-edit-component {
					padding: 0px;
					margin-right: 0px;
					cursor: pointer;
				}
			}
		}
	}

	.gjs-cv-canvas.gjs-no-touch-actions.gjs-cv-canvas-bg {
		width: 100%;
		transition: width 0.3s ease;
	}

	//color picker
	.sp-container.sp-light.sp-input-disabled.sp-alpha-enabled.sp-palette-buttons-disabled.sp-initial-disabled.gjs-one-bg.gjs-two-color {
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
		border-radius: 3px;

		.sp-palette-container {
			display: none;
		}

		.sp-picker-container {
			padding-top: 10px;
			padding-left: 18px;
			padding-right: 18px;

			.sp-top.sp-cf {
				margin-bottom: 5px;
			}

			.sp-dragger {
				background: rgba(0, 0, 0, 0);
				box-shadow: 0 0 0 1px #111;
				border-radius: 5px;
				height: 5px;
				width: 5px;
				border: 1px solid #fff;
				cursor: crosshair;
			}

			.sp-hue {
				left: 90%;

				.sp-slider {
					background-color: #ccc;
					border: 1px solid #555;
					height: 3px;
					width: 22px;
					left: -4px;
					cursor: row-resize;
					background: #fff;
					opacity: 0.8;
				}
			}

			.sp-button-container {
				float: none;
				width: 100%;
				position: relative;
				text-align: right;

				.sp-choose {
					width: 100%;
					background: #009ef7 !important;
					color: #ffffff;
					border: none;
					outline: none;
				}
			}
		}
	}
	//end color picker

	.gjs-editor {
		height: 100vh;
		width: 100%;
		border: 1px solid #e0e0e0;
	}

	.gjs-rte-toolbar.gjs-one-bg.gjs-rte-toolbar-ui {
		display: none;
	}

	// useless menus
	.gjs-sm-sector__general,
	.gjs-sm-sector__flex,
	.gjs-sm-sector__dimension,
	.gjs-sm-sector__typography,
	.gjs-sm-sector__decorations,
	.gjs-sm-sector__extra {
		display: none;
	}
	// useless menus

	.gjs-pn-panels {
		position: fixed;
		left: 4%;
		top: 0;
		width: 100%;
		box-shadow: none;
		border-bottom: 1px solid #f2f2f3;
		box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);

		.container-panel {
			display: flex;
			align-items: center;
			justify-content: start;
			width: 100%;

			.preview-enabled.gjs-pn-panel {
				padding-left: 0px;
			}

			img {
				cursor: pointer;
				padding: 10px;
				margin-left: 14px;
				margin-right: 28px;

				&:hover {
					background-color: #f2f2f3;
					border-radius: 8px;
				}
			}

			.content-device-basic-actions {
				display: flex;
				justify-content: start;
				align-items: center;

				#panel__devices {
					margin-right: 28px;
					.gjs-pn-panel {
						padding: 0px;

						.gjs-pn-buttons {
							padding-left: 0px;

							.gjs-pn-btn.custom__btn.device {
								border-color: #f2f2f3;
								font-size: 0.875rem;

								&:hover {
									background-color: #f2f2f3;
								}

								&.device_desktop {
									border-top-left-radius: 4px;
									border-bottom-left-radius: 4px;
								}

								&.device_mobile {
									border-top-right-radius: 4px;
									border-bottom-right-radius: 4px;
								}

								&.gjs-pn-active {
									background-color: #d2efff !important;
								}
							}

							.gjs-pn-btn.arrow-back {
								margin-left: 14px;
								margin-right: 28px;

								&.gjs-pn-active {
									background-color: transparent !important;
								}
							}
						}
					}
				}

				#panel__basic-actions {
					.gjs-pn-panel {
						padding: 0px;

						.gjs-pn-buttons {
							gap: 8px;
							padding: 0px;

							.gjs-pn-btn {
								height: 32px;
								width: 32px;
								margin: 0px;

								&.sw-visibility {
									justify-content: center;
								}

								&.config-page {
									justify-content: center;
								}

								&:hover {
									background: #f2f2f3;
									border-radius: 8px;
								}

								&.gjs-pn-active {
									background: #f2f2f3;
								}
							}
						}
					}
				}
			}

			.content-input-buttons {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;

				.panel__url {
					width: 100%;
				}

				.divider {
					height: 40px;
					width: 1px;
					border: 1px solid #f2f2f3;
				}

				#panel__config-page {
					.gjs-pn-panel {
						padding-left: 0px;

						.gjs-pn-buttons {
							padding-left: 16px;

							.gjs-pn-btn {
								&:hover {
									background-color: #f2f2f3;
								}

								&.gjs-pn-active {
									background-color: #f2f2f3;
								}
							}
						}
					}
				}

				#panel__buttons {
					.gjs-pn-buttons {
						padding-left: 0px;
						gap: 16px;
						width: max-content;

						.gjs-pn-btn {
							margin-right: 0px;

							&.preview {
								padding: 8px 16px;

								&:hover {
									background-color: #f2f2f3;
								}

								&.gjs-pn-active {
									background-color: #f2f2f3;
								}
							}

							&.save-template {
								padding: 8px 16px;
							}
						}

						span:last-child {
							margin-right: 14px;
						}
					}
				}
			}
		}
	}

	.gjs-one-bg {
		background-color: #ffffff;
		color: #212121;

		.gjs-pn-views {
			border: none;
		}

		.gjs-clm-tags {
			display: none;
		}

		.gjs-sm-clear {
			display: none;
		}

		.gjs-field-color-picker {
			border-radius: 8px;
		}

		.sp-palette {
			display: none;
		}

		.sp-alpha {
			display: none;
		}

		.sp-picker-container {
			.sp-top {
			}
			.sp-cancel {
				display: none;
			}

			button {
				width: 100%;
				background-color: #009ef7;
				color: #ffffff;

				border: none;
				outline: none;
			}
		}
		// end color picker

		.gjs-radio-item-label {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			padding: 0.5rem;
		}

		.gjs-radio-item input:checked + .gjs-radio-item-label.active {
			background-color: #bfbfbf;
			overflow: hidden;
		}

		.gjs-field:has(input[type='radio']) {
			background: transparent;
		}

		.gjs-radio-items {
			gap: 0.5rem;
		}

		.gjs-radio-item {
			background: #f2f2f3;
			border-radius: 4px;

			overflow: hidden;
			border: none;
			box-shadow: none;

			display: flex;
			align-items: center;
			justify-content: center;

			width: 100%;
			height: 100%;
		}
	}

	.gjs-sm-label {
		margin-bottom: 15rem;
	}

	.gjs-field-range {
		input[type='range']::-webkit-slider-thumb {
			-webkit-appearance: none;
			appearance: none;
			background: #fff;
			cursor: pointer;
			border: 1.5px solid #009ef7;
			border-radius: 50%;
			height: 24px;
			width: 24px;
			margin-top: -8px;
		}

		input[type='range']::-webkit-slider-runnable-track {
			height: 8px;
			background: #009ef7;
			border-radius: 4px;
		}
	}

	.gjs-fields {
		border-radius: 8px !important;
	}

	.gjs-field {
		width: 100%;
	}

	.gjs-field-integer {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
	}

	.gjs-input-holder {
		border-radius: 8px;
		border: none;
		width: 100%;

		::placeholder {
			color: inherit;
		}

		input {
			background: #f2f3f6;

			&::placeholder {
				font-size: 1rem;
			}
		}
	}

	.gjs-field-color {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 100%;
		margin-bottom: 1rem;
		background: transparent;
		cursor: pointer;
		border-radius: 8px;

		.gjs-field-colorp {
			border-radius: 50%;
			border: none;
			height: 42px;
			width: 42px;
			padding: 0px;

			.gjs-field-colorp-c {
				border-radius: 50%;
			}

			.gjs-checker-bg {
				border-radius: 50%;
			}

			.gjs-field-color-picker {
				border: 1px solid #cdd2d5;
			}
		}

		.gjs-input-holder {
			display: flex;
			width: 100%;

			input {
				height: 42px;
				padding-top: 9px;
				width: 84%;
				background: #f2f3f6;
				border: 1px solid #f2f2f3;
				border-radius: 8px;
			}
		}
	}

	.gjs-select {
		display: flex;
		border: 1px solid #f2f2f3;
		border-radius: 4px;
		color: #212121;
		width: 100%;
		background-color: transparent;

		.gjs-field .gjs-sm-input-holder {
			width: 100%;
		}

		#gjs-sm-input-holder {
			width: 100%;

			select {
				option {
					width: 100%;
					background-color: #ffffff;
					color: #212121;
				}
			}
		}
	}

	// properties

	// background color block property
	.gjs-sm-property__background-color {
		width: 100%;
	}

	// divider property
	.gjs-sm-property__divider {
		width: 100%;
		height: 1px;
		border-radius: 50%;

		margin: 1rem;
		background-color: #f2f2f3;
		.gjs-sm-icon {
			display: none;
		}
		.gjs-fields {
			display: none;
		}
	}

	// system border property
	.gjs-sm-property__system-border {
		width: 100%;
		margin-bottom: 21px;

		.gjs-field {
			border-radius: 8px;

			input {
				height: 42px;
				padding-top: 9px;
				background: #f2f3f6;
				border: 1px solid #f2f2f3;
				border-radius: 8px;
			}
		}
	}

	.gjs-sm-property__system-border-type {
		width: 100%;
		margin-bottom: 25px;

		.gjs-fields {
			.gjs-field {
				background-color: transparent;
				color: #212121;
			}

			select {
				cursor: pointer;
				padding: 0.5rem;
				appearance: auto;
				background-color: #f2f3f6;
				height: 42px;
			}
		}
	}

	// border radius
	.gjs-sm-property__border-radius {
		margin-bottom: 25px;

		.gjs-field-integer {
			width: 70px;
			height: 42px;
			background-color: #f2f3f6 !important;
			border-radius: 8px;

			.gjs-input-holder {
				width: 70px;
			}

			.gjs-field-units {
				top: 10px;

				.gjs-input-unit {
					padding-top: 3px;
				}

				select {
					color: #85959e;
					font-size: 14px;
				}
			}
		}
	}

	// title property
	.gjs-sm-property__title,
	.gjs-sm-property__title-font-size {
		width: 100%;

		&.d-none {
			display: none;
		}

		.gjs-sm-icon {
			color: #e0e0e0;
			font-size: 0.875rem;
			font-weight: 400;
		}

		.gjs-field {
			display: none;
		}

		margin: 1rem 0;
	}

	.gjs-sm-property__info {
		width: 100%;

		.gjs-fields {
			border-radius: 8px;

			.gjs-field {
				border: 1px solid #f2f2f3;
				border-radius: 8px;
				width: 100%;

				input {
					height: 42px;
					padding-top: 9px;
					background: #f2f2f3;
					border: 1px solid #f2f2f3;
				}
			}
		}
	}

	.gjs-sm-property__title-visibility-block {
		.gjs-sm-label {
			margin-top: -30px !important;
		}

		.gjs-field {
			display: none;
		}
	}

	.gjs-sm-property__title-visibility-geometric-shapes {
		margin-bottom: 16px;
		margin-top: -5px;

		.gjs-field {
			display: none;
		}
	}

	// icon button property
	.gjs-sm-property__icon-button {
		margin-right: 0.5rem;
		padding: 0;
		width: 23.1%;

		&.gjs-sm-icon-checkbox-bold {
			padding-left: 5px;
		}

		&.gjs-sm-icon-checkbox-strikethrough {
			margin-right: 0px;
		}

		.gjs-sm-icon {
			display: none;
		}

		.gjs-fields {
			border-radius: 4px;
			background: #f2f2f3;
			display: flex;
			align-items: center;
			justify-content: center;
			color: rgba(0, 0, 0, 0.74);
			overflow: hidden;
			width: 84.75px;

			&:nth-child(1) {
				margin-left: 8px;
			}
		}
	}

	.gjs-sm-property--full {
		.gjs-radio-item {
			border-radius: 8px;
		}
	}

	// background image property
	.gjs-sm-property__Image-de-fundo {
		background-color: transparent;
		margin-bottom: 0px;
		.gjs-sm-label {
			display: none;
		}
		.gjs-sm-field {
			position: relative;
			top: -3.6rem;
			font-size: 0px;
			height: 28px;

			.gjs-sm-btn {
				padding: 0.6rem 0;
				width: 10%;
				margin: 0;
				background-color: transparent;
				border: none;
				color: transparent;
				box-shadow: none;
				font-size: 0px;
			}
		}

		.gjs-sm-preview-file {
			margin-top: 12px;
			position: relative;
			top: -38px;

			.gjs-sm-preview-file-close {
				width: auto;
				font-size: 16px;
			}
		}
	}

	// text align property
	.gjs-sm-property__text-align-text {
		.gjs-sm-label {
			display: none;
		}
	}

	// typography property
	.gjs-sm-property__font-family {
		width: 50%;
		color: #212121;
		margin-bottom: 6px;

		.gjs-fields {
			select {
				cursor: pointer;
				padding: 0.5rem;
				appearance: auto;
				background-color: #f2f3f6;
				height: 42px;
			}
		}
	}

	.gjs-sm-property__font-size-button {
		width: 100%;

		.gjs-fields {
			border: 1px solid #f2f2f3;
			border-radius: 8px;

			.gjs-field.gjs-field-integer {
				input {
					height: 42px;
				}

				input::placeholder {
					font-size: 1rem;
				}

				.gjs-field-units {
					display: none;
				}
			}
		}
	}

	.gjs-sm-property__font-family-form {
		width: 100%;

		.gjs-fields {
			select {
				cursor: pointer;
				padding: 0.5rem;
				appearance: auto;
				background-color: #f2f3f6;
				height: 42px;
			}
		}
	}

	.gjs-sm-property__font-size {
		width: 50%;

		.gjs-fields {
			border: 1px solid #f2f2f3;
			border-radius: 8px;

			.gjs-field.gjs-field-integer {
				input {
					height: 42px;
				}

				input::placeholder {
					font-size: 1rem;
				}

				.gjs-field-units {
					display: none;
				}
			}
		}
	}

	// line height property
	.gjs-sm-property__line-height {
		.gjs-field-integer {
			width: 70px;
			height: 42px;
			background-color: #f2f3f6 !important;
			border-radius: 8px;

			.gjs-input-holder {
				width: 70px;
			}

			.gjs-field-units {
				top: 10px;

				.gjs-input-unit {
					padding-top: 3px;
				}

				select {
					color: #85959e;
					font-size: 14px;
				}
			}
		}

		.gjs-sm-label {
			.gjs-sm-icon {
				display: none;
			}
		}

		.gjs-fields {
			select {
				appearance: none;
			}
		}
	}

	// letter spacing property
	.gjs-sm-property__letter-spacing {
		.gjs-field-integer {
			width: 70px;
			height: 42px;
			background-color: #f2f3f6 !important;
			border-radius: 8px;

			.gjs-input-holder {
				width: 70px;
			}

			.gjs-field-units {
				top: 10px;

				.gjs-input-unit {
					padding-top: 3px;
				}

				select {
					color: #85959e;
					font-size: 14px;
				}
			}
		}

		.gjs-sm-label {
			.gjs-sm-icon {
				display: none;
			}
		}

		.gjs-fields {
			select {
				appearance: none;
			}
		}
	}

	// button properties
	.gjs-sm-property__target {
		width: 100%;
		margin-bottom: 16px;

		.gjs-fields {
			select {
				cursor: pointer;
				padding: 0.5rem;
				appearance: auto;
				background-color: #f2f3f6;
				height: 42px;
			}
		}
	}

	.gjs-sm-property__href {
		width: 100%;
		margin-bottom: 0px;

		.gjs-field {
			border: 1px solid #f2f2f3;
			border-radius: 8px;
			width: 100%;
			display: flex;
			width: 100%;

			input {
				height: 42px;
				padding-top: 9px;
				background: #f2f3f6;
				border: 1px solid #f2f2f3;
			}
		}
	}
	.gjs-sm-property__button-text,
	.gjs-sm-property__form-redirect {
		width: 100%;
		margin-bottom: 16px;

		.gjs-field {
			border: 1px solid #f2f2f3;
			border-radius: 8px;
			width: 100%;

			input {
				height: 42px;
				padding-top: 9px;
				background: #f2f2f3;
				border: 1px solid #f2f2f3;
			}
		}
	}
	// end button properties

	// form properties
	.gjs-sm-property__font-size-label,
	.gjs-sm-property__height-input,
	.gjs-sm-property__border-radius-input,
	.gjs-sm-property__border-radius-button {
		.gjs-field-integer {
			width: 70px;
			height: 42px;
			background-color: #f2f3f6 !important;
			border-radius: 8px;

			.gjs-input-holder {
				width: 70px;
			}

			.gjs-field-units {
				top: 10px;

				.gjs-input-unit {
					padding-top: 3px;
				}

				select {
					color: #85959e;
					font-size: 14px;
				}
			}
		}

		.gjs-sm-label {
			.gjs-sm-icon {
				display: none;
			}
		}

		&.d-none {
			display: none;
		}
	}

	.gjs-sm-property__button-text {
		margin-top: 20px;
	}
	// end form properties

	// start visibility properties
	.gjs-sm-switch {
		display: flex;
		justify-content: space-between;
		width: 87%;
		margin-bottom: 8px !important;

		.gjs-sm-label {
			margin-top: 2px !important;
		}
	}
	// end visibility properties
	// end properties

	.gjs-sm-sectors {
		width: 100%;

		.gjs-sm-sector__editor {
			width: 100%;
		}

		.gjs-sm-sector__configuracao-pagina {
			display: block !important;

			.gjs-sm-property {
				display: block !important;
			}
		}

		.gjs-sm-sector {
			.gjs-sm-sector-title {
				background-color: transparent;
				color: #424242;
				font-size: 1rem;
				font-weight: bold;
				padding: 16px 10px 11px 20px;
			}

			.gjs-sm-properties {
				.gjs-sm-property__decoration {
					.gjs-sm-label {
						.gjs-sm-clear {
							color: #444f55 !important;
							display: block;
							width: auto;
							font-size: 16px;
							margin-left: 0px;
							margin-right: 13px;
							margin-bottom: 8px;
						}
					}
				}

				.gjs-sm-icon {
					color: #444f55;
					font-weight: 700;
					font-size: 0.8rem;
					width: 100%;
				}

				.gjs-fields {
					.gjs-field-integer {
						color: #212121;
						background: transparent;
						box-shadow: none;

						.gjs-field-arrows {
							display: none;
						}
					}
				}
			}

			.gjs-sm-label {
				margin: 0;
			}

			.gjs-field-radio {
				display: auto;
			}

			.gjs-sm-property__color {
				width: 100%;
			}

			.gjs-sm-property__link-video {
				width: 100%;

				.gjs-fields {
					display: grid;
					border: 1px solid #f2f2f3;
					border-radius: 8px;

					input {
						height: 42px;
						padding-top: 9px;
						background: #f2f3f6;
						border: 1px solid #f2f2f3;
					}
				}
			}

			.gjs-sm-property__title-cor-texto-back-img {
				margin-bottom: 0px;
				height: 53px;

				.gjs-field {
					display: none;
				}
			}

			.gjs-sm-property__title-cor-texto-icon {
				width: min-content;
				margin-bottom: 32px;

				.fa.fa-image {
					font-size: 27px;
				}

				.gjs-field {
					display: none;
				}
			}

			.gjs-sm-property__title-cor-texto-back-color {
				height: 42px;
			}

			.gjs-sm-property__title-cor-texto-sem-recuo-min-content {
				width: min-content;
				height: 40px;
			}

			.gjs-sm-property__title-cor-texto-sem-recuo-px {
				width: min-content;
				height: 45px;
			}

			.gjs-sm-property__autoplay,
			.gjs-sm-property__controls {
				display: flex;
				justify-content: space-between;
				width: 87%;

				.gjs-field.gjs-field-range {
					width: 32px;
				}

				.gjs-field.gjs-field-integer {
					display: none;
				}

				.gjs-sm-clear {
					display: none;
				}
			}
			.gjs-sm-property__position-titles {
				width: 100%;

				.gjs-fields {
					select {
						cursor: pointer;
						padding: 0.5rem;
						appearance: auto;
						background-color: #f2f3f6;
						height: 42px;
					}
				}

				.gjs-sm-clear {
					display: none;
				}
			}
			.gjs-sm-property__opacity,
			.gjs-sm-property__text-shadow-h,
			.gjs-sm-property__text-shadow-v,
			.gjs-sm-property__text-shadow-b,
			.gjs-sm-property__tone-effect,
			.gjs-sm-property__saturation-effect,
			.gjs-sm-property__brightness-effect,
			.gjs-sm-property__contrast-effect,
			.gjs-sm-property__reverse-effect,
			.gjs-sm-property__sepia-effect,
			.gjs-sm-property__blur-effect,
			.gjs-sm-property__shadesGray-effect {
				width: 100%;

				.gjs-field-integer {
					width: 70px;
					height: 42px;
					background-color: #f2f3f6 !important;
					border-radius: 8px;

					.gjs-input-holder {
						width: 70px;
					}

					.gjs-field-units {
						top: 10px;

						.gjs-input-unit {
							padding-top: 3px;
						}

						select {
							color: #85959e;
							font-size: 14px;
						}
					}
				}
			}
			.gjs-sm-property__ico-line,
			.gjs-sm-property__ico-line-font-size {
				width: 100%;
				.gjs-fields {
					display: none !important;
				}
				&.d-none {
					display: none;
				}
			}
		}
	}

	.gjs-mdl-dialog {
		background-color: #ffffff;
		.gjs-mdl-header {
			color: #212121;
			font-weight: 700;
		}
		.gjs-mdl-content {
			background-color: #fafafa;
		}
		.gjs-asset-manager {
			.gjs-am-file-uploader {
				form {
					background-color: #fafafa;
					color: #1f1f1f;
				}
			}
			.gjs-am-assets-cont {
				background-color: #fafafa;
				.gjs-am-assets-header {
					form {
						display: none !important;
					}
				}
			}
		}
	}
`

export const Sidebar = styled.aside`
	position: fixed;
	top: 48px;
	left: 0;
	width: 76px;
	height: 100dvh;
	z-index: 1000;
	overflow: auto;
	scrollbar-width: none;
	background: #ffffff;
	border-right: 1px solid #ddd;
	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);

	.gjs-blocks-c {
		display: flex;
		gap: 6px;
		margin-top: 1rem;
		flex-direction: column-reverse;
		flex-wrap: wrap;
	}

	.gjs-block {
		display: flex;
		align-items: center;
		justify-content: center;
		align-self: center;
		padding: 0px;
		width: 32px;
		min-height: 32px;
		border: none;
		box-shadow: none;
		margin: 0px;
		cursor: pointer;

		&:hover {
			background: #f2f2f3;
			border-radius: 8px;
		}

		.gjs-block-label {
			display: none;
		}
	}

	.gjs-block__media {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #212121;
		margin: 0;
		padding: 8px;

		svg {
			fill: none;
		}
	}
`

export const Managerbar = styled.aside`
	position: fixed;
	right: 0;
	top: 0;
	min-height: 100vh;
	overflow: auto;
	width: 20%;
	height: 100%;
	padding: 0px;
	z-index: 9999;
	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
	background: #ffffff;
	border-left: 1px solid #e0e0e0;
`

export const ContainerWriteWithAI = styled.div`
	position: absolute;
	z-index: 1;
`

export const ContentNewPromptCommand = styled.div`
	max-width: 354px;
	padding: 8px 16px;
	background-color: #fff;
	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
	margin-top: 8px;
	border-radius: 8px;
	display: none;

	span {
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 8px;
	}

	input {
		padding-right: 0px;

		&::placeholder {
			font-size: 12px;
			color: #afb7bb;
		}
	}
`
