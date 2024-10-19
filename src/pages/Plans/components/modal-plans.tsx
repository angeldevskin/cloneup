/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle } from 'lucide-react'
import { PlanModel } from '../model/plan.model'
import './style.css'

export function ModalPlans({ planos }: { planos: PlanModel[] }) {
	return (
		<div className="modal_inside">
			{planos.map((plano: PlanModel, i) => (
				<div className={'modal_plan plan ' + plano.classe} key={i}>
					<div className="plan__content">
						<div className="plan__content__badge">
							<h2 className={plano.badgeClass}>{plano.badgeTitle}</h2>
						</div>
						<div className="plan__content__value">
							<div className="title">
								<span>{plano.value}</span>
								<small>/{plano.recorrencia}</small>
							</div>
							<small className="anual">{plano.anual} anual</small>
						</div>
						<div className="actions">
							{plano.activePlan && (
								<button className="btn_actions atual">Plano atual</button>
							)}
							{!plano.activePlan && (
								<button className="btn_actions next">Contratar plano</button>
							)}
						</div>

						<div className="plan__content__modal_info">
							{plano.modal.infos.map((item: any, i: any) => (
								<ul key={i}>
									<h3>{item.title}</h3>
									{item.content.map((li: any, k: any) => (
										<li key={k}>
											<CheckCircle />
											<span dangerouslySetInnerHTML={{ __html: li }} />
										</li>
									))}
								</ul>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
