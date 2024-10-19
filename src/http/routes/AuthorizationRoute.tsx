import { decodeJwt } from 'jose'
import { Outlet } from 'react-router-dom'
import { Button } from '../../components/Button'

const authTable: Record<string, Array<string>> = {
	admin_upfunnels: ['/*'],
	user_upfunnels: [],
	admin_client: ['/*'],
	user_client: [],
	sales_access: ['/chats', '/leads'],
	funnel_access: [
		'/funnel-flow',
		'/pages',
		'/editor',
		'/codes',
		'/integrations',
		'/settings'
	]
}

export function AuthorizationRoute({
	routesPaths
}: {
	routesPaths: Array<string>
}) {
	const token = localStorage.getItem('@upfunnels-access-token:1.0')

	if (token) {
		const payload = decodeJwt(token)
		const role = payload.role as string
		if (
			authTable[role].includes('/*') ||
			authTable[role].filter((pth) => routesPaths.includes(pth)).length > 0
		) {
			return <Outlet />
		} else {
			return (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						width: '100vw'
					}}
				>
					<h2>Você não possui permissão para visualizar esse conteúdo</h2>
					<Button onClick={() => window.location.replace('/')}>Voltar</Button>
				</div>
			)
		}
	}
}
