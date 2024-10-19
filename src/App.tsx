import TagManager from 'react-gtm-module'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Router from './http/routes'
import { GlobalStyle } from './styles/global'

const tagManagerArgs = {
	gtmId: 'GTM-KL9TH72Q'
}
TagManager.initialize(tagManagerArgs)

function App() {
	window.dataLayer.push({
		event: 'pageview'
	})
	return (
		<BrowserRouter>
			<Router />
			<GlobalStyle />
			<ToastContainer
				style={{
					pointerEvents: 'none'
				}}
			/>
		</BrowserRouter>
	)
}

export default App
