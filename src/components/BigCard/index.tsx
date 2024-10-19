import * as S from './styles'
import { MoveUp, MoveDown } from 'lucide-react'

interface BigCardProps {
	title: string
	subTitle: string
	$arrowDown: boolean
	value: string
}

export function BigCard({
	title,
	subTitle,
	$arrowDown,
	value,
	...props
}: BigCardProps) {
	return (
		<S.BigCardWrapper {...props} $arrowDown={$arrowDown}>
			<h5>{title}</h5>
			<h6>{subTitle}</h6>
			<div className="value">
				<div className="icon">
					{$arrowDown === true ? <MoveDown /> : <MoveUp />}
				</div>
				<h1>{value}</h1>
			</div>
		</S.BigCardWrapper>
	)
}
