/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import {
	deleteIntegration,
	getActiveCampaignList,
	getActiveCampaignOld,
	getHotmart,
	getHotmartSubscriptions,
	getKiwify,
	getMailChimpListsIntegration,
	getMailchimp,
	getProductsKiwify
} from '../../services/setting'
import { ActiveCampaignForm } from './ActiveCampaign'
import { FacebookForm } from './Facebook'
import { GoogleADSForm } from './GoogleADS'
import { GoogleAnalyticsForm } from './GoogleAnalytics'
import { HotmartForm } from './Hotmart'
import { KiwifyForm } from './Kiwify'
import { MailchimpForm } from './Mailchimp'

import hotmartIcon from '../../assets/images/hotmart.svg'
import kiwifyIcon from '../../assets/images/kiwify.svg'
import mailchimpIcon from '../../assets/images/mailchimpSvg.svg'
import Facebook from '../../assets/images/facebook.png'
import ActiveCampaign from '../../assets/images/activeCampaign.png'
import Google_Analytics from '../../assets/images/Google_Analytics.png'
import google_ads from '../../assets/images/google_ads.png'

import { Loader2, Search } from 'lucide-react'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { DialogRoot } from '../../components/Dialog'
import { StatusPin } from '../../components/StatusPin'
import * as S from './styles'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'

interface Integrations {
	id: string
	title: string
	describe: string
	active: boolean | undefined
	activeBtn: boolean | undefined
	img: any
	component?: JSX.Element
}

export function Integrations() {
	const [dialogOpen, setDialogOpen] = useState('')
	const [hotmart, setHotmart] = useState<boolean>()
	const [hotmartBtn, setHotmartBtn] = useState<boolean>()
	const [kiwify, setKiwify] = useState<boolean>()
	const [kiwifyBtn, setKiwifyBtn] = useState<boolean>()
	const [mailchimp, setEmailchimp] = useState<boolean>()
	const [mailchimpBtn, setEmailchimpBtn] = useState<boolean>()
	const [activeCampaign, setActiveCampaign] = useState<boolean>()
	const [activeCampaignBtn, setActiveCampaignBtn] = useState<boolean>()
	const [, setType] = useState('')
	const [selectedProduct, setSelectedProduct] = useState<Integrations>()
	const [searchResults, setSearchResults] = useState<Integrations[]>([])
	const [isPending, setIsPending] = useState(false)
	const [integrationsList, setIntegrationsList] = useState<Integrations[]>([])

	useEffect(() => {
		const fetchData = async () => {
			setIsPending(true)
			await Promise.all([
				fetchHotmart(),
				fetchHotmartCrendential(),
				fetchActiveCampaign(),
				fetchActiveCampaignCrendential(),
				fetchKiwify(),
				fetchKiwifyCrendential(),
				fetchMailchimp(),
				fetchMailchimpCrendential()
			])
			setIsPending(false)
		}
		fetchData()
	}, [])

	useEffect(() => {
		setSearchResults(integrationsList)
	}, [integrationsList])

	function handleUpdateBtn(
		target: string,
		active: boolean | undefined,
		activeBtn: boolean | undefined
	) {
		setIntegrationsList((prevList) => {
			const updatedSearchResults = prevList.map((item) =>
				item.id === target ? { ...item, active, activeBtn } : item
			)
			return updatedSearchResults
		})
		window.scrollTo(0, 0)
	}

	async function callDeleteIntegration(data: Integrations) {
		try {
			await deleteIntegration(data.title)
			toast.success('Integração desconectada com sucesso!')
			setTimeout(() => {
				handleDialogClose()
				handleUpdateBtn(data.id, false, false)
			}, 300)
		} catch (error) {
			toast.error('Erro ao desconectar a integração')
		}
	}

	async function fetchMailchimp() {
		try {
			const res = await getMailChimpListsIntegration()
			if (res.total_items > 0) {
				setEmailchimp(true)
			} else {
				setEmailchimp(false)
			}
		} catch (error) {
			console.error('Error fetching Mailchimp data:', error)
			setEmailchimp(false)
		}
	}

	async function fetchMailchimpCrendential() {
		try {
			await getMailchimp()
			setEmailchimpBtn(true)
		} catch (error) {
			console.error('Error fetching Mailchimp data:', error)
			setEmailchimpBtn(false)
		}
	}

	async function fetchKiwifyCrendential() {
		try {
			await getKiwify()
			setKiwifyBtn(true)
		} catch (error) {
			console.error('Error fetching Mailchimp data:', error)
			setKiwifyBtn(false)
		}
	}
	async function fetchKiwify() {
		try {
			await getProductsKiwify()
			setKiwify(true)
		} catch (error) {
			console.error('Error fetching Kiwify data:', error)
			setKiwify(false)
		}
	}

	async function fetchHotmartCrendential() {
		try {
			await getHotmart()
			setHotmartBtn(true)
		} catch (error) {
			console.error('Error fetching Mailchimp data:', error)
			setHotmartBtn(false)
		}
	}

	async function fetchHotmart() {
		try {
			await getHotmartSubscriptions()
			setHotmart(true)
		} catch (error) {
			console.error('Error fetching Hotmart data:', error)
			setHotmart(false)
		}
	}

	async function fetchActiveCampaignCrendential() {
		try {
			await getActiveCampaignOld()
			setActiveCampaignBtn(true)
		} catch (error) {
			console.error('Error fetching Mailchimp data:', error)
			setActiveCampaignBtn(false)
		}
	}

	async function fetchActiveCampaign() {
		try {
			await getActiveCampaignList()
			setActiveCampaign(true)
		} catch (error) {
			console.error('Error fetching ActiveCampaign data:', error)
			setActiveCampaign(false)
		}
	}

	function handleDialogClose() {
		setDialogOpen('')
	}

	function initializeList() {
		setIntegrationsList([
			{
				id: 'hotmart-key',
				title: 'Hotmart',
				describe:
					' Criação, venda e distribuição de produtos digitais, como cursos online, e-books e softwares.',
				active: hotmart,
				activeBtn: hotmartBtn,
				img: hotmartIcon,
				component: (
					<HotmartForm
						onUpdateBtn={handleUpdateBtn}
						onClose={handleDialogClose}
					/>
				)
			},
			{
				id: 'kiwify-key',
				title: 'Kiwify',
				describe: ' Plataforma de e-commerce simplificada. ',
				active: kiwify,
				activeBtn: kiwifyBtn,
				img: kiwifyIcon,
				component: (
					<KiwifyForm
						onClose={handleDialogClose}
						onUpdateBtn={handleUpdateBtn}
					/>
				)
			},
			{
				id: 'active-campaign-key',
				title: 'Active Campaign',
				describe: ' Plataforma de automação de marketing por e-mail. ',
				active: activeCampaign,
				activeBtn: activeCampaignBtn,
				img: ActiveCampaign,
				component: (
					<ActiveCampaignForm
						onClose={handleDialogClose}
						onUpdateBtn={handleUpdateBtn}
					/>
				)
			},
			{
				id: 'mailchimp-key',
				title: 'Mailchimp',
				describe:
					' Plataforma de marketing por e-mail e automação de marketing. ',
				active: mailchimp,
				activeBtn: mailchimpBtn,
				img: mailchimpIcon,
				component: (
					<MailchimpForm
						onClose={handleDialogClose}
						onUpdateBtn={handleUpdateBtn}
					/>
				)
			},
			{
				id: 'ga-key',
				title: 'Google Analytics',
				describe:
					' Ferramenta de análise de dados para websites e aplicativos. ',
				active: false,
				activeBtn: true,
				img: Google_Analytics,
				component: <GoogleAnalyticsForm />
			},
			{
				id: 'ga-ads-key',
				title: 'Google Ads',
				describe: ' Plataforma de publicidade do Google. ',
				active: false,
				activeBtn: true,
				img: google_ads,
				component: <GoogleADSForm />
			},
			{
				id: 'fb-key',
				title: 'Facebook',
				describe: ' Rede social que conecta usuários em todo o mundo. ',
				active: false,
				activeBtn: true,
				img: Facebook,
				component: <FacebookForm />
			}
		])
	}

	useEffect(() => {
		initializeList()
	}, [
		hotmart,
		hotmartBtn,
		kiwify,
		kiwifyBtn,
		mailchimp,
		mailchimpBtn,
		activeCampaign,
		activeCampaignBtn
	])

	const handleSearch = (e: { target: { value: any } }) => {
		const searchTerm = e.target.value.toLowerCase()
		if (searchTerm.length > 0) {
			const results = integrationsList.filter((item) => {
				return item.title.toLowerCase().startsWith(searchTerm)
			})
			setSearchResults(results)
		} else {
			setSearchResults(integrationsList)
		}
	}

	const statusPin = (data: boolean | undefined) => {
		return data ? 'success' : 'advice'
	}

	const statusMessage = (data: boolean | undefined) => {
		return data ? 'ativo' : 'não conectado'
	}

	const shouldDisplayStatusPin = (title: string) => {
		return (
			title !== 'Google Analytics' &&
			title !== 'Google Ads' &&
			title !== 'Facebook'
		)
	}

	const isComingSoon = (title: string) => {
		return (
			title === 'Google Analytics' ||
			title === 'Google Ads' ||
			title === 'Facebook'
		)
	}

	useEffect(() => {
		console.log(dialogOpen)
	}, [dialogOpen])

	return (
		<S.Container>
			{isPending && (
				<EmptyWrapper>
					<Loader2 strokeWidth={1}></Loader2>
					<span>Carregando integrações</span>
				</EmptyWrapper>
			)}
			{!isPending && (
				<S.Article>
					<div className="painel">
						<div className="search">
							<Search />
							<input onChange={handleSearch} placeholder="Pesquisar"></input>
						</div>
					</div>
					<ul>
						{searchResults.map((item) => (
							<li key={item.id}>
								<div className="ico">
									<img
										src={item.img}
										style={{
											width: item.title === 'Hotmart' ? 'auto' : '2rem',
											height: '2rem'
										}}
									></img>
								</div>
								<h1>
									<strong>{item.title}</strong>
									{item.describe}
								</h1>
								<div className="button">
									<div className="status">
										{shouldDisplayStatusPin(item.title) && (
											<StatusPin
												type={statusPin(item.active)}
												message={statusMessage(item.active)}
											/>
										)}
									</div>
									{isComingSoon(item.title) ? (
										<Button disabled>Em breve</Button>
									) : !item.activeBtn ? (
										<DialogRoot
											title="Adicionar integração"
											isOpen={dialogOpen == item.title}
											setIsOpen={() => {
												setDialogOpen(dialogOpen == '' ? item.title : '')
											}}
											trigger={
												<>
													<Button
														onClick={() => {
															setDialogOpen(item.title)
															setType(item.title)
															setSelectedProduct(item)
															console.log(item)
														}}
													>
														Adicionar
													</Button>
												</>
											}
										>
											{selectedProduct && selectedProduct.component}
										</DialogRoot>
									) : (
										<Button
											onClick={() => callDeleteIntegration(item)}
											shape="danger"
										>
											Desconectar
										</Button>
									)}
								</div>
							</li>
						))}
					</ul>
				</S.Article>
			)}
			{searchResults.length === 0 && (
				<S.Label>Nenhuma integração encontrada.</S.Label>
			)}
		</S.Container>
	)
}
