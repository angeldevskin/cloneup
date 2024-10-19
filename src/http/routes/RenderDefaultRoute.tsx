import { decodeJwt } from 'jose'
import { Leads } from '../../pages/Leads'
import { Funnels } from '../../pages/Funnels'

export function RenderDefaultRoute() {
	const token = localStorage.getItem('@upfunnels-access-token:1.0')

	if (token) {
		const payload = decodeJwt(token)
		const role = payload.role as string
		if (role === 'sales_access') {
			return <Leads />
		}
	}

	return <Funnels />
}
