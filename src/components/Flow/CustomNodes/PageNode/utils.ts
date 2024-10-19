import captureTemplate from '../../../../assets/images/capture-template.svg'
import checkoutTemplate from '../../../../assets/images/checkout-template.svg'
import crossellTemplate from '../../../../assets/images/crossellTemplate.svg'
import downsellTemplate from '../../../../assets/images/donwsell-template.svg'
import downloadTemplate from '../../../../assets/images/download-template.svg'
import leadsTemplate from '../../../../assets/images/leadsTemplate.svg'
import salesTemplate from '../../../../assets/images/sales-template.svg'
import thanksTemplate from '../../../../assets/images/thanks-template.svg'
import upsellTemplate from '../../../../assets/images/upsellTemplate.svg'
import vslTemplate from '../../../../assets/images/vslTemplate.svg'
import webnarTemplate from '../../../../assets/images/webnarTemplate.svg'
import whatsappTemplate from '../../../../assets/images/whatsappGroupTemplate.svg'

export function genericBackgroundResolver(type: string) {
	switch (type) {
		case 'capture':
			return captureTemplate
		case 'acknowledgment':
			return thanksTemplate
		case 'checkout':
			return checkoutTemplate
		case 'downsell':
			return downsellTemplate
		case 'download':
			return downloadTemplate
		case 'sales':
			return salesTemplate
		case 'upsell':
			return upsellTemplate
		case 'vsl':
			return vslTemplate
		case 'crossell':
			return crossellTemplate
		case 'leads':
			return leadsTemplate
		case 'webnar':
			return webnarTemplate
		case 'whatsappGroup':
			return whatsappTemplate
		default:
			return ''
	}
}

export function resolvePlaceholderNames(type: string) {
	switch (type) {
		case 'capture':
			return 'Captura'
		case 'acknowledgment':
			return 'Agradecimento'
		case 'checkout':
			return 'Checkout'
		case 'downsell':
			return 'Downsell'
		case 'download':
			return 'Download'
		case 'sales':
			return 'Vendas'
		case 'upsell':
			return 'Upsell'
		case 'vsl':
			return 'VSL'
		case 'crossell':
			return 'Crossell'
		case 'leads':
			return 'Leads'
		case 'webnar':
			return 'Webnar'
		case 'whatsappGroup':
			return 'Grupo de Whatsapp'
		default:
			return ''
	}
}
