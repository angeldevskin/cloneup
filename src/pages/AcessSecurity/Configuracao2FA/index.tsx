/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import celular2fa from '../../../assets/images/celular2FA.png'
import playstore from '../../../assets/images/playstore.png'
import applestore from '../../../assets/images/applestore.png'
import './style.css'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { useForm } from 'react-hook-form'
import { getQRCodeMFA, turnOnMFA } from '../../../services/auth.service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface QRCodeForm {
	name: string
}

export function AcessoSegurancaModal() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { register, handleSubmit } = useForm<any>()
	const [, setVerifyPopup] = useState(false)
	const [, setConfigurationPopup] = useState(false)
	const [, setQrCodeLoaded] = useState(false)
	const [qrcodeImg, setQrcodeImg] = useState('')
	const navigate = useNavigate()
	const fetchQRCode = async () => {
		try {
			const res = await getQRCodeMFA()
			setQrCodeLoaded(true)
			if (res?.status === 200) {
				setQrcodeImg(res?.img)
				setConfigurationPopup(true)
			} else if (res?.status === 202) {
				setVerifyPopup(true)
			}
		} catch (error) {
			console.log('Erro:', error)
		}
	}
	useEffect(() => {
		fetchQRCode()
	}, [])

	const onSubmit = async (fields: QRCodeForm) => {
		try {
			const { status } = await turnOnMFA(fields.name)
			if (status == 200) {
				toast.success('Sucesso ao verificar o 2fa')
				setTimeout(() => {
					navigate('/')
				}, 2000)
			}
			if (status >= 500 && status < 600) {
				toast.error('Erro ao realizar a chamada')
				return
			}
			if (status != 200) {
				toast.error('Código inválido')
				return
			}
		} catch (error) {
			console.log('Erro:', error)
		}
	}

	return (
		<div className="container">
			<div className="container-autentica">
				<div className="img">
					<img src={celular2fa} alt="" />
				</div>
				<div className="info-2fa">
					<h2 className="title">Configuração 2FA</h2>
					<div className="tutorial-2fa">
						<p>
							Baixe o aplicativo do Google Authenticator em sua loja de
							aplicativo <br />e escaneie o código ao lado e informe o PIN
							gerado.
						</p>
						<div className="img-acess-store">
							<img src={playstore} alt="" />
							<img src={applestore} alt="" />
						</div>
						<div className="pin-code">
							<p>Digite o pin gerado</p>
							<div className="input">
								<form onSubmit={handleSubmit(onSubmit)}>
									<TextField
										placeholder="Digite o pin"
										type="text"
										required
										register={register}
										name="name"
									/>
									<Button type={'submit'}>Entrar</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="qr-code">
					<img src={qrcodeImg} alt="" />
				</div>
			</div>
		</div>
	)
}
