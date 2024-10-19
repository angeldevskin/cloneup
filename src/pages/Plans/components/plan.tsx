import { PlanModel } from '../model/plan.model'
import './style.css'

export function Plan({ items }: { items: PlanModel }) {
	return (
		<>
			<div className={'fixedPlan plan ' + items.classe}>
				<h2>{items.title}</h2>
				<div className="plan__content">
					<div className="plan__content__badge">
						<span className={items.badgeClass}>{items.badgeTitle}</span>
					</div>
					<div className="plan__content__value">
						<div className="title">
							<span>{items.value}</span>
							<small>/{items.recorrencia}</small>
						</div>

						<small className="anual">{items.anual} anual</small>
					</div>
					<div className={'plan__content__info ' + items.infoHTMLClass}>
						{items.infoHTML}
					</div>
					<div className="plan__content__details">
						{items.details.map((detail, i) => (
							<div key={i} className="plan__content__details__item">
								<label>
									{detail.name}
									<span>{detail.value}</span>
								</label>
								<div className="bar">
									<div style={{ width: detail.width }} className="inner"></div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className={items.footerClass}>{items.footer}</div>
			</div>
		</>
	)
}
