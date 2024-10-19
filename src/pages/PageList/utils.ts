export function typeResolver(type: string): string {
	switch (type) {
		case 'sales':
			return 'Vendas'
		case 'checkout':
			return 'Checkout'
		case 'upsell':
			return 'Upsell'
		case 'downsell':
			return 'Downsell'
		case 'crossell':
			return 'Crossell'
		case 'capture':
			return 'Captura'
		case 'acknowledgment':
			return 'Obrigado'
		default:
			return 'Página'
	}
}
