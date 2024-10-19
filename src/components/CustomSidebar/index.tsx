import {
	Bot,
	Filter,
	KanbanSquare,
	LayoutPanelTop,
	MessagesSquare,
	Settings
} from 'lucide-react'
import { useLocation } from 'react-router-dom'

import upLogo from '../../assets/images/up.svg'
import * as S from './styles'

import { decodeJwt } from 'jose'
import { useEffect, useState } from 'react'
import { NavItem } from './NavItem'

type ROLES =
	| 'admin_upfunnels'
	| 'admin_client'
	| 'funnel_access'
	| 'sales_access'

export function CustomSidebar() {
	const location = useLocation()
	const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [isSales, setIsSales] = useState<boolean>(false)
	const [isFunnelManager, setIsFunnelManager] = useState<boolean>(false)
	useEffect(() => {
		const token = localStorage.getItem('@upfunnels-access-token:1.0')
		if (token) {
			const payload = decodeJwt(token)
			const role = payload.role as ROLES
			setIsSuperAdmin(role === 'admin_upfunnels')
			setIsAdmin(role === 'admin_client')
			setIsFunnelManager(role === 'funnel_access')
			setIsSales(role === 'sales_access')
		}
	}, [])

	return (
		<S.SidebarWrapper>
			<S.Header>
				<img src={upLogo} alt="Logomarca upFunnels" />
			</S.Header>
			<S.MainNavigation>
				{(isAdmin || isFunnelManager || isSuperAdmin) && (
					<>
						<NavItem
							icon={<Filter strokeWidth={1} />}
							path="/"
							$isSelected={location.pathname === '/'}
							title="Funis"
						/>
					</>
				)}

				{(isAdmin || isSales || isSuperAdmin) && (
					<>
						<NavItem
							icon={<KanbanSquare strokeWidth={1} />}
							path="/leads"
							title="Leads"
							$isSelected={location.pathname.startsWith('/leads')}
						/>

						<NavItem
							icon={<MessagesSquare strokeWidth={1} />}
							path="/chats"
							title="Chat"
							$isSelected={location.pathname.startsWith('/chats')}
						/>
					</>
				)}

				{(isAdmin || isSuperAdmin) && (
					<>
						<NavItem
							title={'Assistente IA'}
							icon={<Bot strokeWidth={1} />}
							path="/assistant"
							$isSelected={location.pathname.startsWith('/assistant')}
						/>
					</>
				)}
				{isSuperAdmin && (
					<>
						<NavItem
							title="Templates"
							icon={<LayoutPanelTop strokeWidth={1} />}
							path="/templates"
							$isSelected={location.pathname.startsWith('/templates')}
						/>
					</>
				)}
				<footer>
					<NavItem
						icon={<Settings strokeWidth={1} />}
						path="/settings"
						$isSelected={location.pathname.startsWith('/settings')}
						title="Configurações"
					/>
				</footer>
			</S.MainNavigation>
		</S.SidebarWrapper>
	)
}
