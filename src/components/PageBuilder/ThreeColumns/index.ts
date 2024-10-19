export const html = `
<div
	data-gjs-draggable="
		#container,
		#template-container,
		#template-wrapper,
		[custom-id=column-template],
		[custom-id=main-wrapper]"
	id="three-divs"
	data-gjs-type="div"
	draggable="false"
	style="
		background: #fff;
		padding-bottom: 1px;
	"
	>
	<div
		data-custom-id="container-column"
		data-gjs-type="div"
		draggable="false"
		data-gjs-name="Bloco"
		style="
			display: flex;
			justify-content: center;
			align-items: stretch;
			max-width: 1200px;
			border: 0px solid white !important;
			padding: 10px;
			margin: 0 auto;"
	>
		<div
			id="column-3-1"
			data-gjs-name="Bloco"
			data-custom-id="column-3-1"
			data-gjs-type="div"
			draggable="false"
			style="
				flex: 1 1 0%;
				min-height: 60px;
				position: inherit;
			"
		></div>
		<div
			id="column-3-2"
			data-gjs-name="Bloco"
			data-custom-id="column-3-2"
			data-gjs-type="div"
			draggable="false"
			style="
				flex: 1 1 0%;
				min-height: 60px;
				position: inherit;
			"
		></div>
		<div
			id="column-3-3"
			data-gjs-name="Bloco"
			data-custom-id="column-3-3"
			data-gjs-type="div"
			draggable="false"
			style="
				flex: 1 1 0%;
				min-height: 60px;
				position: inherit;
			"
		></div>
	</div>
</div>
`
