import activeCampaign from '../../../assets/images/activeCampaign.svg'
import facebook from '../../../assets/images/facebook.svg'
import googleAds from '../../../assets/images/googleads.svg'
import instagram from '../../../assets/images/instagram.svg'
import link from '../../../assets/images/link.svg'
import mailChimp from '../../../assets/images/mailchimpSvg.svg'
import manualAds from '../../../assets/images/manualAds.svg'
import metaAds from '../../../assets/images/meta.svg'
import tiktok from '../../../assets/images/tiktokads.svg'
import x from '../../../assets/images/x.svg'
import youtube from '../../../assets/images/youtube.svg'
import whatsapp from '../../../assets/images/whatsapp.svg'
import telegram from '../../../assets/images/telegram.svg'

export function iconResolver(source: string) {
	switch (source) {
		case 'google-ads':
			return googleAds
		case 'meta-ads':
			return metaAds
		case 'tiktok-ads':
			return tiktok
		case 'youtube':
			return youtube
		case 'instagram':
			return instagram
		case 'facebook':
			return facebook
		case 'tiktok':
			return tiktok
		case 'x':
			return x
		case 'custom':
			return link
		case 'manual-ads':
			return manualAds
		case 'mailchimp':
			return mailChimp
		case 'activecampaign':
			return activeCampaign
		case 'whatsapp':
			return whatsapp
		case 'telegram':
			return telegram
		default:
			return ''
	}
}
