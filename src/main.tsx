import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App.tsx'
import { ResetPasswordProvider } from './contexts/auth/ResetPassword/steps.tsx'

const productionMode = import.meta.env.PROD

console.log(productionMode, 'productionMode')

if (productionMode) {
	Sentry.init({
		dsn: 'https://a9b6f022cbca71c719f92fff8d6a2b38@o4507805257564160.ingest.us.sentry.io/4507822867939328',
		integrations: [
			Sentry.browserTracingIntegration(),
			Sentry.browserProfilingIntegration(),
			Sentry.replayIntegration()
		],
		// Tracing
		tracesSampleRate: 1.0, //  Capture 100% of the transactions
		tracePropagationTargets: [
			'https://dev.upfunnels.com/',
			'https://hmg.upfunnels.com/',
			'https://app.upfunnels.com/'
		],
		profilesSampleRate: 1.0,
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0
	})
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ResetPasswordProvider>
			<App />
		</ResetPasswordProvider>
	</React.StrictMode>
)
