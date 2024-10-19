import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		define: {
			__APP_ENV__: env.APP_ENV
		},
		plugins: [react()],
		server: {
			port: 3000,
			host: '0.0.0.0'
		}
	}
})
