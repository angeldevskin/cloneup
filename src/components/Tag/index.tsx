/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from 'lucide-react'
import * as S from './styles'

type Item = {
	id: string
	value: string
	platform: string
	name?: string
}

type TagComponentProps = {
	item: Item
	icon?: string
	removeItem: (id: string) => void
}

export function TagComponent({ item, icon, removeItem }: TagComponentProps) {
	return (
		<S.Tags>
			{item && (
				<span className="tag" key={item.id}>
					{icon && typeof icon === 'string' && <img src={icon} />}
					<p>{item.name ?? item.value}</p>
					<X className="close" onClick={() => removeItem(item.id)} />
				</span>
			)}
		</S.Tags>
	)
}
