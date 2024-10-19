import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
	Calendar,
	ExternalLink,
	Filter,
	Hand,
	Mail,
	Phone,
	User,
	X
} from 'lucide-react'
import { StatusPin } from '../../../components/StatusPin'

import * as S from './styles'
import { Lead } from '../../../services/store/chat-store'

export function LeadDetails({
	lead,
	leadAvatar,
	handleClose
}: {
	lead: Lead
	leadAvatar?: string
	handleClose: () => void
}) {
	return (
		<S.LeadDetailsWrapper>
			<div className="head">
				<X onClick={handleClose} cursor="pointer" />
				<strong>Dados do lead</strong>
			</div>
			<div className="content">
				{leadAvatar && (
					<img
						src={leadAvatar}
						alt=""
						style={{
							objectFit: 'cover',
							borderRadius: '50%',
							width: '8rem',
							height: '8rem'
						}}
					/>
				)}
				{!leadAvatar && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#F2F2F3',
							borderRadius: '50%',
							width: '8rem',
							height: '8rem'
						}}
					>
						<User />
					</div>
				)}
				<span>{lead.name}</span>
				<StatusPin message={lead.pageDetails?.name ?? '-'} type="inProgress" />
				<S.InlineWrapper>
					<div className="inline">
						<Mail strokeWidth={1} />
						<span>Email</span>
					</div>
					<span>{lead.name}</span>
				</S.InlineWrapper>
				<S.InlineWrapper>
					<div className="inline">
						<Phone strokeWidth={1} />
						<span>Telefone</span>
					</div>
					<span>{lead.telephone}</span>
				</S.InlineWrapper>
				<S.InlineWrapper>
					<div className="inline">
						<Hand strokeWidth={1} />
						<span>CPF</span>
					</div>
					<span>-</span>
				</S.InlineWrapper>
				<S.InlineWrapper>
					<div className="inline">
						<Filter strokeWidth={1} />
						<span>Funil</span>
					</div>
					<a className="linkTo" href={`/funnel-flow/${lead.funnelId}`}>
						{lead.funnelDetails?.name ?? 'Acessar funil'}
						<ExternalLink size={16} />
					</a>
				</S.InlineWrapper>
				<S.InlineWrapper>
					<div className="inline">
						<Calendar strokeWidth={1} />
						<span>Data de inscrição</span>
					</div>
					<span>{format(lead.createdAt, 'Pp', { locale: ptBR })}</span>
				</S.InlineWrapper>
			</div>
		</S.LeadDetailsWrapper>
	)
}
