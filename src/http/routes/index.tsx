import { Route, Routes } from 'react-router-dom'

import { ProtectedRoutes } from './ProtectedRoute'

import { RootComponent } from '../../components/PageBuilder/RootComponent'
import { Chat } from '../../pages/Chat'
import { Codes } from '../../pages/Codes'
import { Domain } from '../../pages/Domain'
import { ConfigDomain } from '../../pages/Domain/ConfigDomain'
import { FunnelFlow } from '../../pages/FunnelFlow'
import { Integrations } from '../../pages/Integrations'
import { Leads } from '../../pages/Leads'
import { Login } from '../../pages/Login'
import { PageList } from '../../pages/PageList'
import { Plans } from '../../pages/Plans'
import { ResetPassword } from '../../pages/ResetPassword'
import { Settings } from '../../pages/Settings'
import { Team } from '../../pages/Team'
import { AuthorizationRoute } from './AuthorizationRoute'
import { RenderDefaultRoute } from './RenderDefaultRoute'
// import { AudienceBrand } from '../../pages/AudienceBrand'
// import { BrandEdit } from '../../pages/AudienceBrand/components/BrandEdit'
// import { AudienceEdit } from '../../pages/AudienceBrand/components/AudienceEdit'
import { Assistant } from '../../pages/Assistant'
import { NewAIPage } from '../../pages/PagesAI/NewAI'
import { Templates } from '../../pages/Templates'
import { MonitoramentoPage } from '../../pages/Monitoramento'

export default function Router() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/reset-password" element={<ResetPassword />} />

			<Route element={<ProtectedRoutes />}>
				<Route path="/" element={<RenderDefaultRoute />} />
				{/* Admin only routes */}
				<Route element={<AuthorizationRoute routesPaths={[]} />}>
					<Route path="/plans" element={<Plans />} />
					<Route path="/domain" element={<Domain />} />
					<Route path="/templates" element={<Templates />} />

					{/* <Route path="/audience-brand" element={<AudienceBrand />} /> */}
					<Route path="/assistant" element={<Assistant />} />
					{/* <Route
						path="/audience-brand/BrandEdit/:brandId"
						element={<BrandEdit />}
					/>
					<Route
						path="/audience-brand/AudienceEdit/:audienceId"
						element={<AudienceEdit />}
					/> */}
					<Route
						path="/domain/configuration/:configId"
						element={<ConfigDomain />}
					/>
					{/* <Route
						path="/audience-brand/BrandEdit/:brandId"
						element={<BrandEdit />}
					/> */}
					{/* <Route path="/settings" element={<Settings />}></Route> */}

					<Route path="/new-ia/:iaId?" element={<NewAIPage />} />
					<Route path="/team" element={<Team />} />
					<Route path="/monitoring" element={<MonitoramentoPage />} />
				</Route>
				{/* Funnel Manager only routes */}
				<Route
					element={
						<AuthorizationRoute
							routesPaths={[
								'/funnel-flow',
								'/pages',
								'/editor',
								'/codes',
								'/integrations',
								'/settings'
							]}
						/>
					}
				>
					<Route path="/funnel-flow">
						<Route path=":funnelId" element={<FunnelFlow />} />
					</Route>
					<Route path="/pages/:funnelId" element={<PageList />} />
					<Route path="/editor" element={<RootComponent />} />
					<Route path="/codes" element={<Codes />} />
					<Route path="/integrations" element={<Integrations />} />
					<Route path="/settings" element={<Settings />} />
				</Route>
				{/* Sales only routes */}
				<Route
					element={<AuthorizationRoute routesPaths={['/leads', '/chats']} />}
				>
					<Route path="/leads" element={<Leads />} />
					<Route path="/chats/:chatId?" element={<Chat />} />
				</Route>
			</Route>
		</Routes>
	)
}
