import { Loader2, Plus, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DialogRoot } from '../../components/Dialog'
import { EmptyWrapper } from '../../components/EmptyWrapper/styles'
import { TableDomain } from '../../components/TableDomain'
import { DomainItem } from '../../models/domain.model'
import { getDomains } from '../../services/domain.service'
import { NewsBondDomainForm } from './NewsBondDomain'
import './style.css'
import * as S from './styles'
import { domainListColumn, statusDomainColumn } from './utils'

export function Domain() {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [items, setItems] = useState<DomainItem[]>([])
	const [domainUpfunnel, setDomainUpFunnel] = useState<DomainItem[]>([])
	const [idFunnel, setIdFunnel] = useState('')
	const [isPending, setIsPending] = useState(false)
	const navigate = useNavigate()

	const fetchDomains = async () => {
		setIsPending(true)
		try {
			const domainsResponse: DomainItem[] = await getDomains()
			const domainsWithId = domainsResponse.map((e) => ({ ...e, id: e._id }))
			setItems(domainsWithId)
			const filteredUpfunnel = domainsWithId.filter((e) =>
				e.domainName.includes('.upfunnels.')
			)
			setDomainUpFunnel(filteredUpfunnel)
			const filteredDomains = domainsWithId.filter(
				(e) => !e.domainName.includes('.upfunnels.')
			)
			setItems(filteredDomains)
			filteredUpfunnel.forEach((e) => {
				setIdFunnel(e.funnelId)
			})
			setIsPending(false)
		} catch (error) {
			setIsPending(false)
			console.log(error)
		}
	}

	useEffect(() => {
		fetchDomains()

		navigate('/')
	}, [])

	return (
		<S.Section>
			{isPending && (
				<EmptyWrapper>
					<Loader2 strokeWidth={1}></Loader2>
					<span>Carregando domínios</span>
				</EmptyWrapper>
			)}
			{!isPending && (
				<div className="card-main">
					<S.DomainCard $shadow="false">
						<h1>Domínio UpFunnels</h1>
						<TableDomain
							columns={domainListColumn}
							columnsStatus={statusDomainColumn}
							items={domainUpfunnel}
							actions={[]}
						></TableDomain>
					</S.DomainCard>
					<hr className="separator"></hr>
					<S.DomainCard $shadow="false">
						<header>
							<h1>Seus domínios</h1>
							<DialogRoot
								isOpen={dialogOpen}
								setIsOpen={() => setDialogOpen(!dialogOpen)}
								trigger={
									<S.NewsBondDomain>
										<Plus />
										<span>Vincular domínio</span>
									</S.NewsBondDomain>
								}
								title="Vincular domínio"
								maxwidth={600}
							>
								<NewsBondDomainForm
									closeDialog={() => {
										setDialogOpen(false)
										fetchDomains()
									}}
									funnelId={idFunnel}
								/>
							</DialogRoot>
						</header>
						{items.length > 0 ? (
							<TableDomain
								columns={domainListColumn}
								columnsStatus={statusDomainColumn}
								items={items}
								actions={[
									{
										icon: (
											<S.SettingButton>
												<Settings></Settings>
												<p>Configuração</p>
											</S.SettingButton>
										),
										onClick: (itemId: string) => {
											navigate(`/domain/configuration/${itemId}`)
										}
									}
								]}
							></TableDomain>
						) : (
							<S.Alert>
								Nenhum domínio a exibir. Vincule e configure seu domínio para
								utilizá-lo em seus funis.
							</S.Alert>
						)}
					</S.DomainCard>
				</div>
			)}
		</S.Section>
	)
}
