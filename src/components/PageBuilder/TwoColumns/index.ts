export const html = `
<div
	data-gjs-draggable="
	#container,
	#template-container,
	#template-wrapper,
	[custom-id=column-template],
	[custom-id=main-wrapper]"
	id="two-divs"
		draggable="false"
		data-gjs-type="div"
	style="
		background: #fff;
		padding-bottom: 1px;
	"
>
	<div
		data-custom-id="container-column"
		data-gjs-name="Bloco"
		draggable="false"
		data-gjs-type="div"
		style="
			display: flex;
			justify-content: flex-start;
			align-items: stretch;
			border: 0px solid white !important;
			padding: 10px;
			max-width: 1200px;
			margin: 0 auto;"
	>
		<div
			id="column-2-1"
			data-custom-id="column-2-1"
			data-gjs-name="Bloco"
			draggable="false"
			resizable="true"
			data-gjs-type="div"
			style="
				flex: 1 1 0%;
				min-height: 60px;
				position: inherit;
			"
		></div>
		<div
			id="column-2-2"
			resizable="true"
			data-custom-id="column-2-2"
			data-gjs-name="Bloco"
			draggable="false"
			data-gjs-type="div"
			style="
				flex: 1 1 0%;
				min-height: 60px;
				position: inherit;
			"
		></div>
	</div>
</div>
`
