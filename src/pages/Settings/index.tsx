/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { AcessoSeguranca } from '../AcessSecurity'
import { Plans } from '../Plans'
import './style.css'
import * as S from './styles'
import { Integrations } from '../Integrations'
import { Codes } from '../Codes'
import { Domain } from '../Domain'
import { Team } from '../Team'
import { MonitoramentoPage } from '../Monitoramento'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { decodeJwt } from 'jose'

export function Settings() {
	const [active, setActive] = useState('acesso-seguranca')
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const token = localStorage.getItem('@upfunnels-access-token:1.0')

	const payload = decodeJwt(token!)
	const role = payload.role as string

	const menus = [
		{
			name: 'Acesso e segurança',
			slug: 'acesso-seguranca',
			description: '',
			active: true
		},
		{
			name: 'Assinatura',
			slug: 'assinatura',
			description: 'Plano X',
			active: role === 'admin_upfunnels' || role === 'admin_client'
		},
		{
			name: 'Equipe',
			slug: 'equipe',
			description: '',
			active: role === 'admin_upfunnels' || role === 'admin_client'
		},
		{
			name: 'Integrações',
			slug: 'integracoes',
			description: '',
			active:
				role === 'admin_upfunnels' ||
				role === 'admin_client' ||
				role === 'funnel_access'
		},
		{
			name: 'Pixel e códigos',
			slug: 'codes',
			description: '',
			active:
				role === 'admin_upfunnels' ||
				role === 'admin_client' ||
				role === 'funnel_access'
		},
		{
			name: 'Domínios',
			slug: 'dominios',
			description: '',
			active: role === 'admin_upfunnels' || role === 'admin_client'
		},
		{
			name: 'Monitorar',
			slug: 'monitoring',
			description: '',
			active: role === 'admin_upfunnels' || role === 'admin_client'
		}
	]

	const getActiveMenu = () => {
		return menus.find((menu) => menu.slug == active)
	}

	const setActiveMenu = (slug: string) => {
		setActive(slug)
		navigate(`/settings?active=${slug}`)
	}

	useEffect(() => {
		const activeRoute = searchParams.get('active')
		if (activeRoute) {
			setActive(activeRoute)
		}
	}, [searchParams])

	function CardLabel() {
		return (
			<span
				style={{
					background: '#915EC7',
					borderRadius: '8px',
					fontSize: '0.5rem',
					padding: '0.25rem 0.5rem',
					color: '#ffffff',
					position: 'absolute',
					top: 0,
					right: 0
				}}
			>
				EM BREVE
			</span>
		)
	}

	return (
		<MainTemplate>
			<S.Section>
				<div className="card-title-main">
					<span className="title-configuracoes">Configurações</span>
					<span className="breadcrumbs">
						Configurações - <span>{getActiveMenu()?.name}</span>
					</span>
				</div>
				<div className="card-main">
					<S.Aside>
						<ul>
							{menus
								.filter((item) => item.active)
								.map((menu, i) => (
									<li className={active == menu.slug ? 'active' : ''} key={i}>
										<button
											onClick={() => setActiveMenu(menu.slug)}
											disabled={
												menu.slug === 'codes' || menu.slug === 'dominios'
											}
											style={{
												position: 'relative'
											}}
										>
											{(menu.slug === 'codes' || menu.slug === 'dominios') && (
												<CardLabel />
											)}
											<div className="text-box">
												<h2>{menu.name}</h2>
											</div>
										</button>
									</li>
								))}
						</ul>
					</S.Aside>
					{active == 'assinatura' && <Plans />}
					{active == 'acesso-seguranca' && <AcessoSeguranca />}
					{active == 'integracoes' && <Integrations />}
					{active == 'codes' && <Codes />}
					{active == 'dominios' && <Domain />}
					{active == 'equipe' && <Team />}
					{active == 'monitoring' && <MonitoramentoPage />}
				</div>
			</S.Section>
		</MainTemplate>
	)
}
