/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogInType } from '../@types/auth/logIn'

import { axiosRoot } from '../http/axios'
import { clearStorage } from '../http/utils/clear-storage'
import { AcessoFator } from '../pages/AcessSecurity/models/twoFactor.model'

export async function logIn({ email, password }: LogInType) {
	try {
		const response = await axiosRoot().post('/auth/login', {
			email,
			password
		})

		localStorage.setItem(
			'@upfunnels-access-token:1.0',
			response?.data.accessToken
		)
		localStorage.setItem(
			'@upfunnels-refresh-token:1.0',
			response?.data.refreshToken
		)

		await getMe()
			.then((res) => {
				const { data } = res
				const me = {
					name: data.name,
					email: data.email,
					productName: data.productName
				}
				localStorage.setItem('@upfunnels-me', JSON.stringify(me))
			})
			.catch((err) => {
				console.error(err)
			})

		return response?.data
	} catch (error) {
		throw error
	}
}

async function getMe(): Promise<any> {
	try {
		const response = await axiosRoot().get('/user/me/')
		return response
	} catch (error) {
		throw error
	}
}

export async function twoFactor({ nome, email, senhaAtual }: AcessoFator) {
	try {
		const { data } = await axiosRoot().post('ENDPOINT DOIS FATORES AQUI', {
			nome,
			email,
			senhaAtual
		})

		localStorage.setItem('@upfunnels-access-token:1.0', data.accessToken)
		localStorage.setItem('@upfunnels-refresh-token:1.0', data.refreshToken)

		return data
	} catch (error) {
		return error
	}
}

export const logOut = () => {
	clearStorage()

	window.location.href = '/login'

	return
}

export async function sendEmailToResetPassword({
	email
}: Pick<LogInType, 'email'>) {
	try {
		const { data } = await axiosRoot().post('/auth/forgot-password', {
			email
		})

		return data
	} catch (error) {
		throw error
	}
}

export async function sendCodeToResetPassword({
	email,
	newPassword,
	code
}: {
	email: string
	newPassword: string
	code: string
}): Promise<any> {
	const data = await axiosRoot()
		.post(`/auth/forgot-password/${code}`, {
			email,
			newPassword
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})

	return data
}

export async function turnOnMFA(code: string): Promise<any> {
	const data = await axiosRoot()
		.put('/auth/mfa', { code })
		.then((res) => {
			return res
		})
		.catch((err) => {
			return err
		})
	return data
}

export async function getQRCodeMFA() {
	try {
		const { data } = await axiosRoot().get('/auth/mfa')

		return data
	} catch (error) {
		return error
	}
}

export async function verifyMFA(code: string): Promise<any> {
	const data = await axiosRoot()
		.post('/auth/mfa', { code })
		.then((res) => {
			return res
		})
		.catch((err) => {
			return err
		})

	return data
}

export async function mfaEnable(): Promise<any> {
	try {
		const data = await axiosRoot().get('/user/mfa-enabled')
		return data
	} catch (error) {
		console.log(error)
		return error
	}
}

export async function updatePassword(password: string): Promise<any> {
	const data = await axiosRoot()
		.put('/user/update', { password })
		.then((res) => {
			return res
		})
		.catch((err) => {
			return err
		})
	return data
}
