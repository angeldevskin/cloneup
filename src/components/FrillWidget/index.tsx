import { Lightbulb } from 'lucide-react'
import { FC } from 'react'

export const FrillWidget: FC = () => {
	return (
		<button
			type="button"
			className="upfunnels-frill btn"
			style={{ alignSelf: 'center' }}
			data-state={'closed'}
		>
			<Lightbulb strokeWidth={1} />
		</button>
	)
}
