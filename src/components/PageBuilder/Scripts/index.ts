import { scriptForm } from './Form'

const baseUrl = import.meta.env.VITE_UPFUNNELS_API

export const script = `
	<script src="https://cdnjs.cloudflare.com/ajax/libs/cleave.js/1.6.0/cleave.min.js"></script>
	<script type="text/javascript">
		${scriptForm(baseUrl)}
	</script>
	<script>
		new Cleave("input[name='whatsApp']", {
			delimiters: ['(', ') ', '-'],
            blocks: [0, 2, 5, 4],
            numericOnly: true   
		});
	</script>
`
