/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { clearStorage } from './utils/clear-storage'

export const axiosRoot = () => {
	const instance = axios.create({
		baseURL: import.meta.env.VITE_UPFUNNELS_API,
		headers: {
			'Content-Type': 'application/json'
		}
	})

	instance.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem('@upfunnels-access-token:1.0')

			config.headers['Authorization'] = `Bearer ${token}`

			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalConfig = error.config

			if (originalConfig.url.includes('/auth/mfa')) {
				return Promise.reject(error)
			}

			//Token expirou
			if (
				(error.response.status === 403 || error.response.status === 401) &&
				!originalConfig._retry &&
				!originalConfig.url.includes('/auth/mfa')
			) {
				//Para tratar o loop infinito, caso retorne 401 ou 403 novamente
				originalConfig._retry = true

				const refreshToken = localStorage.getItem(
					'@upfunnels-refresh-token:1.0'
				)

				try {
					const { data } = await axiosRoot().post('/auth/refresh', {
						refreshToken
					})

					localStorage.setItem('@upfunnels-access-token:1.0', data.accessToken)

					return instance({
						...originalConfig,
						headers: {
							...originalConfig.headers,
							Authorization: `Bearer ${data.accessToken}`
						}
					})
				} catch (refreshError: any) {
					clearStorage()

					window.location.href = '/login'

					return Promise.reject(refreshError)
				}
			}

			return Promise.reject(error)
		}
	)

	return instance
}
