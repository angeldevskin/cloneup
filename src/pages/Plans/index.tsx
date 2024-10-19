/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Heart, Info, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DialogRoot } from '../../components/Dialog'
import { getPlans } from '../../services/plans.service'
import { ModalPlans } from './components/modal-plans'
import { Plan } from './components/plan'
import {
	ActivePlan,
	ActivePlanDetails,
	PlanModel,
	Usage
} from './model/plan.model'
import { axiosRoot } from '../../http/axios'
import { MeData } from '../../models/me.model'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'

export function Plans() {
	const [chooseSource, setChooseSource] = useState(false)
	const [itemsPlan, setItemsPlan] = useState<Usage>()
	const [me, setMe] = useState<Partial<MeData>>({})
	const [myPlan, setMyPlan] = useState<ActivePlanDetails>()
	const [isPending, setIsPending] = useState(false)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [planosAPI, setPlans] = useState<any>()
	const [allPlans, setAllPlans] = useState<PlanModel[]>()
	const [planosToShow, setPlanosToShow] = useState<PlanModel[]>()
	useEffect(() => {
		getMe()
		fetchPlans()
	}, [])

	useEffect(() => {
		if (me.productName) {
			activePlan()
		}
	}, [me])

	useEffect(() => {
		if (myPlan?.name) {
			montarPlanos()
		}
	}, [myPlan])

	const fetchPlans = async () => {
		setIsPending(true)
		try {
			const planLimitResponse: Usage = await getPlans()
			setItemsPlan(planLimitResponse)
			setIsPending(false)
		} catch (error) {
			setIsPending(false)
			console.error(error)
		}
	}

	async function getMe(): Promise<void> {
		try {
			const response = await axiosRoot().get('/user/me/')
			setMe(response.data || {})
		} catch (error) {
			console.error(error)
		}
	}

	async function activePlan(): Promise<void> {
		try {
			const response: ActivePlan = await axiosRoot().get('/plans')
			const foundPlan = response.data.plans.find(
				(item) => item.productName === me.productName
			)
			setPlans(response.data.plans)
			if (foundPlan) {
				setMyPlan(foundPlan)
			}
		} catch (error) {
			console.error(error)
		}
	}

	function montarPlanos(): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const planosPivot = planosAPI
			.sort(
				(a: ActivePlanDetails, b: ActivePlanDetails) =>
					a.productPriceMonthly - b.productPriceMonthly
			)
			.map((plan: any) => {
				return {
					name: plan.name,
					activePlan: myPlan?.name == plan.name ? true : false,
					classe: myPlan?.name == plan.name ? 'atual' : 'next',
					title:
						myPlan?.name == plan.name ? 'Seu plano atual' : 'Seu próximo nível',
					badgeTitle: checkPlan(plan.productName),
					badgeClass: myPlan?.name == plan.name ? 'info' : 'error',
					value: `$${plan.productPriceMonthly}`,
					recorrencia: 'mensal',
					anual: `$${plan.productPriceYearly}`,
					infoHTML:
						myPlan?.productName == plan.productoName ? (
							<>
								<Calendar />
								<p>
									Próximo pagamento: <strong>20/02/2024</strong>
								</p>
							</>
						) : (
							<>
								<Heart />
								<p>
									<strong>Com $50 off no upgrade</strong>
								</p>
							</>
						),
					infoHTMLClass: myPlan?.name == plan.name ? 'warning' : 'info',
					details: montarDetalhes(plan.name),
					footer:
						myPlan?.name == plan.name ? (
							<>
								<Info /> <span>Assinatura ativa</span>
							</>
						) : (
							<>
								<button
									onClick={() => setChooseSource(true)}
									className="primary-btn"
								>
									Fazer upgrade
								</button>
								<button className="primary-default">Ver mais planos</button>
							</>
						),
					footerClass:
						myPlan?.name == plan.name ? 'plan__footer' : 'btn__footer',
					modal: montarModal(plan.name),
					showOutside: true
				}
			})

		if (myPlan?.name == 'plan1') {
			setPlanosToShow(
				planosPivot.filter((item: ActivePlanDetails) => {
					return item.name == 'plan1' || item.name == 'plan2'
				})
			)
		}
		if (myPlan?.name == 'plan2') {
			setPlanosToShow(
				planosPivot.filter((item: ActivePlanDetails) => {
					return item.name == 'plan2' || item.name == 'plan3'
				})
			)
		}
		if (myPlan?.name == 'plan3') {
			setPlanosToShow(
				planosPivot.filter((item: ActivePlanDetails) => {
					return item.name == 'plan3'
				})
			)
		}

		setAllPlans(planosPivot)
	}

	function montarModal(planid: string) {
		if (planid == 'plan1') {
			return {
				infos: [
					{
						title: 'Cotas do plano',
						content: [
							'3/3 domínios próprios',
							'10.000 visitas mensais',
							'1.000 Contatos de CRM',
							'5 Funis'
						]
					},
					{
						title: 'Recursos',
						content: [
							'Hospedagem inclusa',
							'UpFunnelytics métricas completas',
							'Páginas Ilimitadas em cada Funil',
							'SSL incluso',
							'Métricas de funis',
							'Encher Grupos de WhatsApp',
							'Animação de elementos nas páginas',
							'Compartilhar Funis',
							'Integrações e API'
						]
					}
				]
			}
		}
		if (planid == 'plan2') {
			return {
				infos: [
					{
						title: 'Cotas do plano',
						content: [
							'10 domínios próprios',
							'40.000 visitas mensais',
							'10.000 Contatos de CRM',
							'20 Funis'
						]
					},
					{
						title: 'Todos os recursos do Lite, mais:',
						content: ['Gerador de públicos com IA']
					}
				]
			}
		}
		if (planid == 'plan3') {
			return {
				infos: [
					{
						title: 'Cotas do plano',
						content: [
							'40 domínios próprios',
							'<strong>Visitas ilimitados</strong>',
							'120.000 Contatos de CRM',
							'<strong>Funis ilimitados</strong>'
						]
					},
					{
						title: 'Todos os recursos do Pro, mais:',
						content: [
							'Gerador de conteúdo com IA',
							'Criador de Funis e Páginas com IA ⭐',
							'Análise de funis com IA ⭐'
						]
					}
				]
			}
		}
	}

	function montarDetalhes(planid: string) {
		if (planid == 'plan1') {
			return [
				{
					name: 'Domínios',
					value:
						itemsPlan?.domains.current != null
							? `${itemsPlan?.domains.current}/3`
							: '0/3',
					width: itemsPlan?.domains.percentage
						? `${itemsPlan?.domains.percentage}%`
						: ''
				},
				{
					name: 'Visitas',
					value: '0/10.000',
					width: '50%'
				},
				{
					name: 'Contatos',
					value:
						itemsPlan?.leads.current != null
							? `${itemsPlan?.leads.current}/1.000`
							: '0/1.000',
					width: itemsPlan?.leads.percentage
						? `${itemsPlan?.leads.percentage}%`
						: ''
				},
				{
					name: 'Funis',
					value:
						itemsPlan?.funnels.current != null
							? `${itemsPlan?.funnels.current}/5`
							: '0/5',
					width: itemsPlan?.funnels.percentage
						? `${itemsPlan?.funnels.percentage}%`
						: ''
				}
			]
		}

		if (planid == 'plan2') {
			return [
				{
					name: 'Domínios',
					value:
						itemsPlan?.domains.current != null
							? `${itemsPlan?.domains.current}/10`
							: '0%',
					width: itemsPlan?.domains.percentage
						? `${itemsPlan?.domains.percentage}%`
						: '0%'
				},
				{
					name: 'Visitas',
					value: '0/40.000',
					width: '0%'
				},
				{
					name: 'Contatos',
					value:
						itemsPlan?.leads.current != null
							? `${itemsPlan?.leads.current}/10.000`
							: '0/10.000',
					width: itemsPlan?.leads.percentage
						? `${itemsPlan?.leads.percentage}%`
						: ''
				},
				{
					name: 'Funis',
					value: itemsPlan?.funnels.current
						? `${itemsPlan?.funnels.current}/40`
						: '0/40',
					width: itemsPlan?.funnels.percentage
						? `${itemsPlan?.funnels.percentage}%`
						: ''
				}
			]
		}
		if (planid == 'plan3') {
			return [
				{
					name: 'Domínios',
					value:
						itemsPlan?.domains.current != null
							? `${itemsPlan?.domains.current}/40`
							: '',
					width: itemsPlan?.domains.percentage
						? `${itemsPlan?.domains.percentage}%`
						: '0%'
				},
				{
					name: 'Visitas',
					value: 'Ilimitadas',
					width: '100%'
				},
				{
					name: 'Contatos',
					value:
						itemsPlan?.leads.current != null
							? `${itemsPlan?.leads.current}/120.000`
							: '0/120.000',
					width: itemsPlan?.leads.percentage
						? `${itemsPlan?.leads.percentage}%`
						: '0%'
				},
				{
					name: 'Funis',
					value: itemsPlan?.funnels.current
						? `${itemsPlan?.funnels.current}/Ilimitados`
						: 'Ilimitados',
					width: itemsPlan?.funnels.percentage
						? `${itemsPlan?.funnels.percentage}%`
						: '100%'
				}
			]
		}
	}

	function checkPlan(plan: string | undefined): string {
		if (plan === 'Assinatura Upfunnels - Lite') {
			return 'Lite'
		} else if (plan === 'Assinatura Upfunnels - Pro') {
			return 'Pro'
		} else {
			return 'Pro Max'
		}
	}

	return (
		<>
			{isPending && (
				<EmptyWrapper>
					<Loader2 strokeWidth={1}></Loader2>
					<span>Carregando planos</span>
				</EmptyWrapper>
			)}
			{planosToShow && myPlan && (
				<div
					className={'planos ' + (myPlan?.name == 'plan3' ? 'lastPlan' : '')}
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					{planosToShow
						.filter((item) => item.showOutside)
						.map((item, i) => (
							<Plan key={i} items={item} />
						))}
				</div>
			)}
			{allPlans && (
				<DialogRoot
					title="Trocar planos"
					isOpen={chooseSource}
					setIsOpen={() => setChooseSource(!chooseSource)}
					maxwidth={996}
				>
					<ModalPlans planos={allPlans} />
				</DialogRoot>
			)}
		</>
	)
}
