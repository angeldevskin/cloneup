import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { decodeJwt } from 'jose'
import {
	Code,
	Code2,
	CreditCardIcon,
	Globe,
	KeyRound,
	LogOut,
	SquareDashedBottomCode,
	UsersRound
} from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { logOut } from '../../../services/auth.service'

import * as S from './styles'

export function Actions({ trigger }: { trigger: ReactNode }) {
	const navigate = useNavigate()

	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [isFunnelManager, setIsFunnelManager] = useState<boolean>(false)

	useEffect(() => {
		const token = localStorage.getItem('@upfunnels-access-token:1.0')
		if (token) {
			const payload = decodeJwt(token)
			const role = payload.role as string
			setIsAdmin(role === 'admin_upfunnels' || role === 'admin_client')
			setIsFunnelManager(role === 'funnel_access')
		}
	}, [])

	function CardLabel() {
		return (
			<span
				style={{
					background: '#915EC7',
					borderRadius: '8px',
					fontSize: '0.75rem',
					padding: '0.25rem 0.5rem',
					color: '#ffffff',
					position: 'absolute',
					right: 0,
					zIndex: 99999
				}}
			>
				EM BREVE
			</span>
		)
	}

	return (
		<RadixDropdownMenu.Root>
			<S.DropdownTrigger>{trigger}</S.DropdownTrigger>
			<RadixDropdownMenu.Portal>
				<S.ContentWrapper align="end" sideOffset={6}>
					<RadixDropdownMenu.Group>
						{isAdmin && (
							<>
								<S.DropdownItem
									onClick={() => navigate('/settings?active=acesso-seguranca')}
								>
									<KeyRound strokeWidth={1} />
									<span>Acesso e segurança</span>
								</S.DropdownItem>
								<S.DropdownItem
									onClick={() => navigate('/settings?active=assinatura')}
								>
									<CreditCardIcon strokeWidth={1} />
									<span>Assinatura</span>
								</S.DropdownItem>
							</>
						)}
						{isAdmin && (
							<>
								<S.DropdownItem
									onClick={() => navigate('/settings?active=equipe')}
								>
									<UsersRound strokeWidth={1} />
									<span>Equipe</span>
								</S.DropdownItem>
							</>
						)}
					</RadixDropdownMenu.Group>
					<S.SeparatorWrapper />
					<RadixDropdownMenu.Group>
						{(isAdmin || isFunnelManager) && (
							<>
								<S.DropdownItem
									onClick={() => navigate('/settings?active=integracoes')}
								>
									<SquareDashedBottomCode strokeWidth={1} />
									<span>Integrações</span>
								</S.DropdownItem>
							</>
						)}
						{isAdmin && (
							<>
								<S.DropdownItem
									// onClick={() => navigate('/settings?active=dominios')}
									data-state="disabled"
								>
									<Globe strokeWidth={1} />
									<span>Domínios</span>
									<CardLabel />
								</S.DropdownItem>
								<S.DropdownItem
									// onClick={() => navigate('/settings?active=codes')}
									data-state="disabled"
								>
									<Code2 strokeWidth={1} />
									<span>Pixel e Códigos</span>
									<CardLabel />
								</S.DropdownItem>
								<S.DropdownItem
									onClick={() => navigate('/settings?active=monitoring')}
								>
									<Code strokeWidth={1} />
									<span>Monitoramento</span>
								</S.DropdownItem>
							</>
						)}
					</RadixDropdownMenu.Group>
					<S.SeparatorWrapper />
					<S.DropdownItem onClick={() => logOut()}>
						<LogOut strokeWidth={1} />
						<span>Sair</span>
					</S.DropdownItem>
				</S.ContentWrapper>
			</RadixDropdownMenu.Portal>
		</RadixDropdownMenu.Root>
	)
}
