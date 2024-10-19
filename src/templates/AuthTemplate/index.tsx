import { ReactElement } from 'react'
import './styles.css'
import upFunnelsLogo from '../../assets/images/up-funnels.svg'
import upLogo from '../../assets/images/up-logo.svg'
import * as S from './styles'

export function AuthTemplate({ children }: { children: ReactElement }) {
	return (
		<S.Wrapper>
			<S.Aside className="aside-class" id="login-block">
				<div className="container">
					<div className="image-login">
						<div className="login-text">
							<div className="logo-login">
								<img src={upFunnelsLogo} alt="upFunnels logo" />
							</div>
							<div className="container-text">
								<h3 className="login-title">
									Melhore sua <br />
									presença online
								</h3>
								<p>
									Crie e otimize seu funil de vendas de forma prática e
									assertiva, com métricas em tempo real e recursos de AI.
								</p>
							</div>
						</div>
					</div>
				</div>
			</S.Aside>
			<S.Main className="form-login-tela">{children}</S.Main>
			<div className="additional-content">
				<img src={upLogo} alt="up logo" />
			</div>
		</S.Wrapper>
	)
}
